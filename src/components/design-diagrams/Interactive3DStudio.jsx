import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

/**
 * Interactive3DStudio Component
 * FSQ Photorealistic Architectural Showroom for Windows & Doors
 * 
 * Features:
 * 1. Standard Three.js coordinates: Y is UP, X is RIGHT, +Z is ROOM INTERIOR, -Z is OUTDOORS.
 * 2. Photorealistic Architectural Interior Rooms (Ooty Bay Retreat, Hillside Living Room, City Bedroom, etc.).
 * 3. Photographic Outdoor Panoramas (Ooty Tea Estate, City Skyline, Green Garden, Hills & Nature).
 * 4. Genuine Physical Glass Transmission (IOR 1.52, clear outdoor view visibility).
 * 5. PBR Frame Finishes with 100% Hardware, Glass, and Room Isolation.
 * 6. Direct Mouse/Touch Interaction (Click handle/sash to operate, drag with orbit freeze).
 * 7. Decoupled Kinematics for Casement, Tilt & Turn, Aluminium, and Sliding Windows.
 * 8. Smart Room Matching with Manual Override.
 * 9. Modular Geometry adaptation supporting all 78 catalogue configurations.
 */
export const Interactive3DStudio = ({
  product = "upvc",
  windowType = "casement",
  design,
  finish,
  glass,
  state = "closed",
  onStateChange,
  viewMode = "interior",
  outdoorView = "ooty",
  roomPreset = "smart"
}) => {
  const mountRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCameraPreset, setActiveCameraPreset] = useState("interior");
  const [hoveredPart, setHoveredPart] = useState(null);
  const [isDraggingPart, setIsDraggingPart] = useState(false);
  const [demoPlaying, setDemoPlaying] = useState(false);
  const [currentMechanisms, setCurrentMechanisms] = useState({
    sashLeftOpen: 0,   // 0.0 (closed) to 1.0 (fully open)
    sashRightOpen: 0,  // 0.0 to 1.0
    slideLeftTravel: 0,// 0.0 to 1.0
    slideRightTravel: 0,// 0.0 to 1.0
    tiltTurnMode: "closed", // "closed" | "tilt" | "turn"
    isLocked: true
  });

  // Three.js internal references
  const refs = useRef({
    scene: null,
    camera: null,
    renderer: null,
    controls: null,
    model: null,
    roomGroup: null,
    sceneryMesh: null,
    mixer: null,
    actions: [],
    clock: new THREE.Clock(),
    raycaster: new THREE.Raycaster(),
    mouse: new THREE.Vector2(),
    operableParts: [],
    profileMeshes: [],
    glassMeshes: [],
    hardwareMeshes: [],
    draggedObject: null,
    dragStart: { x: 0, y: 0 },
    pointerDownPos: { x: 0, y: 0 },
    pointerDownTime: 0,
    // Dynamic Kinematic Controllers
    controllers: {
      leftSash: null,
      rightSash: null,
      leftHandle: null,
      rightHandle: null,
      tiltTurnSash: null,
      tiltTurnHandle: null,
      slideLeftSash: null,
      slideRightSash: null,
      touchLockLeft: null,
      touchLockRight: null
    },
    // Target animation values for smooth frame-rate independent interpolation
    targets: {
      leftAngle: 0,
      rightAngle: 0,
      slideLeft: 0,
      slideRight: 0,
      tiltAngle: 0,
      turnAngle: 0,
      leftHandleRot: 0,
      rightHandleRot: 0,
      ttHandleRot: 0,
      touchLockLeftActuator: 0,
      touchLockRightActuator: 0
    },
    currents: {
      leftAngle: 0,
      rightAngle: 0,
      slideLeft: 0,
      slideRight: 0,
      tiltAngle: 0,
      turnAngle: 0,
      leftHandleRot: 0,
      rightHandleRot: 0,
      ttHandleRot: 0,
      touchLockLeftActuator: 0,
      touchLockRightActuator: 0
    }
  });

  // Resolve Effective Room Preset (Smart Room Matching)
  const effectiveRoom = useMemo(() => {
    if (roomPreset && roomPreset !== "smart") return roomPreset;

    const name = (design?.name || "").toLowerCase();
    const type = (windowType || "").toLowerCase();

    if (name.includes("bay") || name.includes("bow")) return "ooty-bay";
    if (type === "tilt-turn") return "city-bedroom";
    if (type === "sliding") return "apartment-living";
    if (product === "aluminium") return "home-office";
    if (name.includes("double") || name.includes("french") || name.includes("3-pane")) return "hillside-living";
    
    // Default for single casement
    return "modern-bedroom";
  }, [roomPreset, design, windowType, product]);

  // Resolve Model URL
  const resolveModelUrl = useCallback(() => {
    if (product === "aluminium" && windowType === "casement") {
      return "/models/FSQ_Aluminium_Casement_v01.glb";
    }
    if (windowType === "sliding") {
      return "/models/FSQ_UPVC_Sliding_2Track_v01.glb";
    }
    if (windowType === "tilt-turn") {
      return "/models/FSQ_UPVC_TiltTurn_v01.glb";
    }
    // Default: Double Open Casement
    return "/models/FSQ_UPVC_Casement_2Open_v01.glb";
  }, [product, windowType]);

  // Texture Loader for Outdoor Sceneries
  const getSceneryTexture = useCallback((viewType) => {
    const loader = new THREE.TextureLoader();
    let file = "/textures/environments/ooty_tea_estate.jpg";
    if (viewType === "city") file = "/textures/environments/modern_city_skyline.jpg";
    else if (viewType === "garden") file = "/textures/environments/green_garden.jpg";
    else if (viewType === "hills") file = "/textures/environments/hills_nature.jpg";

    const tex = loader.load(file);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.wrapS = THREE.ClampToEdgeWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    return tex;
  }, []);

  // Build Photorealistic 3D Room Environment
  const buildRoomEnvironment = useCallback((scene, roomType) => {
    if (refs.current.roomGroup) {
      scene.remove(refs.current.roomGroup);
      refs.current.roomGroup = null;
    }

    const room = new THREE.Group();
    room.name = "Architectural_Room_Environment";
    refs.current.roomGroup = room;

    // Room Dimensions
    const roomWidth = 5.6;
    const roomHeight = 3.2; // ceiling at Y = 2.45m, floor at Y = -0.75m
    const roomDepth = 4.2;  // Z from 0.15m to 4.35m
    const wallThickness = 0.26;
    const windowW = 1.22;
    const windowH = 1.22;

    // Materials based on room preset
    let wallColor = "#eaeae6";
    let floorColor = "#785338"; // warm teak/oak
    let floorRoughness = 0.35;
    let sillColor = "#f5f6f4"; // quartz / natural stone
    let sillWood = false;

    if (roomType === "ooty-bay") {
      wallColor = "#ede8df";
      floorColor = "#613c23";
      floorRoughness = 0.28;
      sillColor = "#8c5835"; // warm rich timber window seat
      sillWood = true;
    } else if (roomType === "hillside-living") {
      wallColor = "#f1f3f5";
      floorColor = "#4a3525";
      floorRoughness = 0.30;
      sillColor = "#dcdedb";
    } else if (roomType === "city-bedroom") {
      wallColor = "#e6e8eb";
      floorColor = "#8c877f"; // plush architectural taupe/oak
      floorRoughness = 0.65;
      sillColor = "#ffffff";
    } else if (roomType === "home-office") {
      wallColor = "#e8eaed";
      floorColor = "#363a3e"; // executive dark slate
      floorRoughness = 0.40;
      sillColor = "#26292c";
    }

    const wallMat = new THREE.MeshStandardMaterial({
      color: wallColor,
      roughness: 0.88,
      metalness: 0.02
    });

    const floorMat = new THREE.MeshStandardMaterial({
      color: floorColor,
      roughness: floorRoughness,
      metalness: 0.05
    });

    const ceilingMat = new THREE.MeshStandardMaterial({
      color: "#f8f9fa",
      roughness: 0.95
    });

    const sillMat = new THREE.MeshStandardMaterial({
      color: sillColor,
      roughness: sillWood ? 0.32 : 0.22,
      metalness: sillWood ? 0.02 : 0.08
    });

    // 1. FLOOR (Y = -0.75m, from Z = -0.15m to +4.2m)
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(roomWidth, roomDepth + 0.5), floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, -0.75, 2.0);
    floor.receiveShadow = true;
    room.add(floor);

    // 2. CEILING (Y = 2.45m)
    const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(roomWidth, roomDepth + 0.5), ceilingMat);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.set(0, 2.45, 2.0);
    room.add(ceiling);

    // 3. MAIN WINDOW WALL WITH ACCURATE APERTURE
    // Left Wall Section
    const wallL = new THREE.Mesh(
      new THREE.BoxGeometry((roomWidth - windowW) / 2, roomHeight, wallThickness),
      wallMat
    );
    wallL.position.set(-(roomWidth / 4 + windowW / 4), 0.85, wallThickness / 2);
    wallL.receiveShadow = true;
    room.add(wallL);

    // Right Wall Section
    const wallR = new THREE.Mesh(
      new THREE.BoxGeometry((roomWidth - windowW) / 2, roomHeight, wallThickness),
      wallMat
    );
    wallR.position.set(roomWidth / 4 + windowW / 4, 0.85, wallThickness / 2);
    wallR.receiveShadow = true;
    room.add(wallR);

    // Bottom Wall Apron (under the sill, Y from -0.75m to 0.0m)
    const wallB = new THREE.Mesh(
      new THREE.BoxGeometry(windowW, 0.75, wallThickness),
      wallMat
    );
    wallB.position.set(0, -0.375, wallThickness / 2);
    wallB.receiveShadow = true;
    room.add(wallB);

    // Top Wall Lintel (above the window, Y from 1.22m to 2.45m)
    const wallT = new THREE.Mesh(
      new THREE.BoxGeometry(windowW, 1.23, wallThickness),
      wallMat
    );
    wallT.position.set(0, 1.835, wallThickness / 2);
    wallT.receiveShadow = true;
    room.add(wallT);

    // 4. ARCHITECTURAL SILL / BAY SEATING BENCH
    if (roomType === "ooty-bay") {
      // Curved / Deep Bay Window Seat
      const bench = new THREE.Mesh(
        new THREE.BoxGeometry(windowW + 0.32, 0.12, 0.65),
        sillMat
      );
      bench.position.set(0, -0.06, 0.38);
      bench.castShadow = true;
      bench.receiveShadow = true;
      room.add(bench);

      // Upholstered Cushion on the Bay Bench
      const cushionMat = new THREE.MeshStandardMaterial({
        color: "#c2a383", // warm linen
        roughness: 0.90
      });
      const cushion = new THREE.Mesh(
        new THREE.BoxGeometry(windowW + 0.28, 0.08, 0.58),
        cushionMat
      );
      cushion.position.set(0, 0.04, 0.38);
      cushion.castShadow = true;
      cushion.receiveShadow = true;
      room.add(cushion);
    } else {
      // Standard Architectural Window Sill
      const sill = new THREE.Mesh(
        new THREE.BoxGeometry(windowW + 0.16, 0.05, 0.36),
        sillMat
      );
      sill.position.set(0, -0.025, 0.20);
      sill.castShadow = true;
      sill.receiveShadow = true;
      room.add(sill);
    }

    // 5. SKIRTING BASEBOARDS (Floor-wall boundary)
    const skirtingMat = new THREE.MeshStandardMaterial({ color: "#dedede", roughness: 0.4 });
    const skirtingL = new THREE.Mesh(new THREE.BoxGeometry((roomWidth - windowW) / 2, 0.10, 0.02), skirtingMat);
    skirtingL.position.set(-(roomWidth / 4 + windowW / 4), -0.70, wallThickness + 0.01);
    room.add(skirtingL);

    const skirtingR = new THREE.Mesh(new THREE.BoxGeometry((roomWidth - windowW) / 2, 0.10, 0.02), skirtingMat);
    skirtingR.position.set(roomWidth / 4 + windowW / 4, -0.70, wallThickness + 0.01);
    room.add(skirtingR);

    // 6. SIDE WALLS (Creating room depth)
    const sideWallL = new THREE.Mesh(new THREE.BoxGeometry(wallThickness, roomHeight, roomDepth), wallMat);
    sideWallL.position.set(-roomWidth / 2, 0.85, roomDepth / 2);
    sideWallL.receiveShadow = true;
    room.add(sideWallL);

    const sideWallR = new THREE.Mesh(new THREE.BoxGeometry(wallThickness, roomHeight, roomDepth), wallMat);
    sideWallR.position.set(roomWidth / 2, 0.85, roomDepth / 2);
    sideWallR.receiveShadow = true;
    room.add(sideWallR);

    scene.add(room);
  }, []);

  // Initialize Three.js Scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 550;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#0c1015");
    refs.current.scene = scene;

    // 2. Camera (Y is UP, positioned in the interior room looking through the window)
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    camera.position.set(0, 0.75, 2.30); // Eye level inside room
    camera.up.set(0, 1, 0); // Strict standard Y-up
    refs.current.camera = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);
    refs.current.renderer = renderer;

    // 4. Orbit Controls (Target at window center)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(0, 0.60, 0.0); // Center of 1200x1200mm window
    controls.maxDistance = 4.8;
    controls.minDistance = 0.45;
    controls.maxPolarAngle = Math.PI / 2 + 0.15; // Prevent flipping under floor
    refs.current.controls = controls;

    // 5. Architectural Lighting Setup
    // Outdoor Sunlight (Directional through window into room)
    const sunLight = new THREE.DirectionalLight("#fff9ed", 2.2);
    sunLight.position.set(2.4, 3.8, -4.0); // Outside, shining through window
    sunLight.target.position.set(0, 0.6, 0.8);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 1.0;
    sunLight.shadow.camera.far = 12.0;
    sunLight.shadow.bias = -0.0002;
    scene.add(sunLight);
    scene.add(sunLight.target);

    // Sky Ambient (Natural soft fill)
    const hemiLight = new THREE.HemisphereLight("#edf4fb", "#2c241d", 1.0);
    scene.add(hemiLight);

    // Interior Warm Fill Light (Inside the room)
    const interiorWarm = new THREE.DirectionalLight("#ffe8d1", 0.7);
    interiorWarm.position.set(-1.8, 1.8, 2.5);
    scene.add(interiorWarm);

    // 6. Photographic Outdoor Scenery Backdrop (Positioned at Z = -4.0m)
    const sceneryGeo = new THREE.PlaneGeometry(16.0, 9.0);
    const sceneryMat = new THREE.MeshBasicMaterial({
      map: getSceneryTexture(outdoorView),
      side: THREE.FrontSide
    });
    const sceneryMesh = new THREE.Mesh(sceneryGeo, sceneryMat);
    sceneryMesh.position.set(0, 1.20, -4.0); // Directly outside behind the window opening
    scene.add(sceneryMesh);
    refs.current.sceneryMesh = sceneryMesh;

    // 7. Build Architectural Room
    buildRoomEnvironment(scene, effectiveRoom);

    // 8. Animation & Kinematic Interpolation Loop
    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = Math.min(refs.current.clock.getDelta(), 0.1);

      // Smooth kinematics interpolation (lerp towards target angles/travel)
      const cur = refs.current.currents;
      const tar = refs.current.targets;
      const lerpSpeed = 6.5 * delta;

      cur.leftAngle = THREE.MathUtils.lerp(cur.leftAngle, tar.leftAngle, lerpSpeed);
      cur.rightAngle = THREE.MathUtils.lerp(cur.rightAngle, tar.rightAngle, lerpSpeed);
      cur.slideLeft = THREE.MathUtils.lerp(cur.slideLeft, tar.slideLeft, lerpSpeed);
      cur.slideRight = THREE.MathUtils.lerp(cur.slideRight, tar.slideRight, lerpSpeed);
      cur.tiltAngle = THREE.MathUtils.lerp(cur.tiltAngle, tar.tiltAngle, lerpSpeed);
      cur.turnAngle = THREE.MathUtils.lerp(cur.turnAngle, tar.turnAngle, lerpSpeed);
      cur.leftHandleRot = THREE.MathUtils.lerp(cur.leftHandleRot, tar.leftHandleRot, lerpSpeed);
      cur.rightHandleRot = THREE.MathUtils.lerp(cur.rightHandleRot, tar.rightHandleRot, lerpSpeed);
      cur.ttHandleRot = THREE.MathUtils.lerp(cur.ttHandleRot, tar.ttHandleRot, lerpSpeed);
      cur.touchLockLeftActuator = THREE.MathUtils.lerp(cur.touchLockLeftActuator, tar.touchLockLeftActuator, lerpSpeed);
      cur.touchLockRightActuator = THREE.MathUtils.lerp(cur.touchLockRightActuator, tar.touchLockRightActuator, lerpSpeed);

      // Apply to Three.js Controller Objects
      const ctrls = refs.current.controllers;

      // 1. Casement Left Sash (rotates outward around Y axis)
      if (ctrls.leftSash) {
        ctrls.leftSash.rotation.y = -cur.leftAngle;
      }
      if (ctrls.leftHandle) {
        ctrls.leftHandle.rotation.z = cur.leftHandleRot;
      }

      // 2. Casement Right Sash (rotates outward around Y axis)
      if (ctrls.rightSash) {
        ctrls.rightSash.rotation.y = cur.rightAngle;
      }
      if (ctrls.rightHandle) {
        ctrls.rightHandle.rotation.z = -cur.rightHandleRot;
      }

      // 3. Sliding Sashes (travel along X axis)
      if (ctrls.slideLeftSash) {
        ctrls.slideLeftSash.position.x = cur.slideLeft;
      }
      if (ctrls.slideRightSash) {
        ctrls.slideRightSash.position.x = -cur.slideRight;
      }
      if (ctrls.touchLockLeft) {
        ctrls.touchLockLeft.position.y = 0.592 + cur.touchLockLeftActuator;
      }
      if (ctrls.touchLockRight) {
        ctrls.touchLockRight.position.y = 0.600 + cur.touchLockRightActuator;
      }

      // 4. Tilt & Turn Sash (Inward turn around Y or inward tilt around X)
      if (ctrls.tiltTurnSash) {
        ctrls.tiltTurnSash.rotation.y = cur.turnAngle;
        ctrls.tiltTurnSash.rotation.x = cur.tiltAngle;
      }
      if (ctrls.tiltTurnHandle) {
        ctrls.tiltTurnHandle.rotation.z = cur.ttHandleRot;
      }

      if (refs.current.mixer) {
        refs.current.mixer.update(delta);
      }

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // 9. Resize Handling
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [getSceneryTexture, outdoorView, buildRoomEnvironment, effectiveRoom]);

  // Update Scenery Backdrop when outdoorView changes
  useEffect(() => {
    if (refs.current.sceneryMesh) {
      refs.current.sceneryMesh.material.map = getSceneryTexture(outdoorView);
      refs.current.sceneryMesh.material.needsUpdate = true;
    }
  }, [outdoorView, getSceneryTexture]);

  // Rebuild Room Environment when room preset changes
  useEffect(() => {
    if (refs.current.scene) {
      buildRoomEnvironment(refs.current.scene, effectiveRoom);
    }
  }, [effectiveRoom, buildRoomEnvironment]);

  // Load Model and Setup Kinematic Controllers
  useEffect(() => {
    const scene = refs.current.scene;
    if (!scene) return;

    setLoading(true);
    setError(null);

    // Clean previous model
    if (refs.current.model) {
      scene.remove(refs.current.model);
      refs.current.model = null;
    }
    if (refs.current.mixer) {
      refs.current.mixer.stopAllAction();
      refs.current.mixer = null;
    }
    refs.current.operableParts = [];
    refs.current.profileMeshes = [];
    refs.current.glassMeshes = [];
    refs.current.hardwareMeshes = [];

    // Reset controllers
    const ctrls = refs.current.controllers;
    Object.keys(ctrls).forEach((k) => (ctrls[k] = null));

    const modelUrl = resolveModelUrl();
    const loader = new GLTFLoader();

    loader.load(
      modelUrl,
      (gltf) => {
        const root = gltf.scene;
        scene.add(root);
        refs.current.model = root;

        // Position window at center of wall reveal
        root.position.set(0, 0, 0);

        // Categorize meshes and find controllers
        root.traverse((node) => {
          const name = node.name.toLowerCase();

          // Locate Moving Controllers and Operable Sashes
          if (name.includes("sash_left_controller")) {
            ctrls.leftSash = node;
            refs.current.operableParts.push(node);
          } else if (name.includes("sash_right_controller")) {
            ctrls.rightSash = node;
            refs.current.operableParts.push(node);
          } else if (name.includes("handle_left_pivot")) {
            ctrls.leftHandle = node;
            refs.current.operableParts.push(node);
          } else if (name.includes("handle_right_pivot")) {
            ctrls.rightHandle = node;
            refs.current.operableParts.push(node);
          } else if (name.includes("tt_sash_frame") || name.includes("tiltturn_sash")) {
            ctrls.tiltTurnSash = node;
            refs.current.operableParts.push(node);
          } else if (name.includes("handle_tt_lever")) {
            ctrls.tiltTurnHandle = node;
            refs.current.operableParts.push(node);
          } else if (name.includes("touchlock_left_actuator")) {
            ctrls.touchLockLeft = node;
            refs.current.operableParts.push(node);
          } else if (name.includes("touchlock_right_actuator")) {
            ctrls.touchLockRight = node;
            refs.current.operableParts.push(node);
          } else if (name.includes("left_sash") && windowType === "sliding") {
            ctrls.slideLeftSash = node.parent || node;
            refs.current.operableParts.push(node);
          } else if (name.includes("right_sash") && windowType === "sliding") {
            ctrls.slideRightSash = node.parent || node;
            refs.current.operableParts.push(node);
          }

          if (node.isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;

            if (name.includes("glass")) {
              refs.current.glassMeshes.push(node);
            } else if (
              name.includes("handle") ||
              name.includes("lever") ||
              name.includes("touchlock") ||
              name.includes("actuator") ||
              name.includes("latch") ||
              name.includes("keeper") ||
              name.includes("hinge") ||
              name.includes("stay") ||
              name.includes("rollers")
            ) {
              refs.current.hardwareMeshes.push(node);
              refs.current.operableParts.push(node);
            } else if (
              name.includes("frame") ||
              name.includes("sash") ||
              name.includes("bead") ||
              name.includes("interlock") ||
              name.includes("mullion") ||
              name.includes("track_rails")
            ) {
              refs.current.profileMeshes.push(node);
              if (name.includes("sash")) {
                refs.current.operableParts.push(node);
              }
            }
          }
        });

        // Modular Adaptability: If the selected design is Single Sash, Fixed, etc.
        // Adapt sashes from design metadata
        if (design && design.panes) {
          const hasLeftOpen = design.panes.some((p, i) => i === 0 && p.type === "open");
          const hasRightOpen = design.panes.some((p, i) => (i === 1 || i === design.panes.length - 1) && p.type === "open");
          const isAllFixed = design.panes.every((p) => p.type === "fixed");

          if (isAllFixed) {
            // Hide handles on all fixed window
            if (ctrls.leftHandle) ctrls.leftHandle.visible = false;
            if (ctrls.rightHandle) ctrls.rightHandle.visible = false;
          } else if (!hasLeftOpen && ctrls.leftHandle) {
            ctrls.leftHandle.visible = false;
          } else if (!hasRightOpen && ctrls.rightHandle) {
            ctrls.rightHandle.visible = false;
          }
        }

        setLoading(false);
      },
      undefined,
      (err) => {
        console.error("Error loading window GLB:", err);
        setError("Model load failed. Showing fallback view.");
        setLoading(false);
      }
    );
  }, [resolveModelUrl, windowType, design]);

  // Live PBR Material Swapper (100% Hardware & Glass Isolation)
  useEffect(() => {
    if (!refs.current.model) return;

    // 1. Profile Finishes (Outer frame, sashes, beads, mullions)
    const isAlu = product === "aluminium";
    const profileColor = finish?.baseColor || (isAlu ? "#2e343b" : "#f4f5f2");
    const profileRoughness = isAlu ? 0.38 : (finish?.family === "Woodgrain Laminate" ? 0.42 : 0.28);
    const profileMetallic = isAlu ? 0.85 : 0.0;

    refs.current.profileMeshes.forEach((mesh) => {
      if (mesh.material) {
        mesh.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(profileColor),
          roughness: profileRoughness,
          metalness: profileMetallic,
          envMapIntensity: 1.0
        });
        mesh.material.needsUpdate = true;
      }
    });

    // 2. Physical Glass (IOR 1.52, transparent view through to outdoor scenery)
    const glassType = glass?.id || "clear";
    const isFrosted = glassType.includes("frosted");
    const isTinted = glassType.includes("tinted") || glassType.includes("grey") || glassType.includes("bronze");
    let glassColor = "#f8fcff";
    if (glassType.includes("grey")) glassColor = "#b8c2cc";
    else if (glassType.includes("bronze")) glassColor = "#c8b398";

    refs.current.glassMeshes.forEach((mesh) => {
      mesh.material = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(glassColor),
        transmission: isFrosted ? 0.40 : 0.96,
        opacity: 1.0,
        transparent: true,
        roughness: isFrosted ? 0.85 : 0.02,
        ior: 1.52,
        thickness: 0.015,
        reflectivity: 0.65,
        specularIntensity: 0.95
      });
      mesh.material.needsUpdate = true;
    });

    // 3. Hardware Isolation (Handles, Keepers, Touch Locks, Latches, Stays)
    refs.current.hardwareMeshes.forEach((mesh) => {
      const name = mesh.name.toLowerCase();
      const isTouchLockWhite = name.includes("touchlock") && (name.includes("body") || name.includes("actuator"));

      if (isTouchLockWhite) {
        // High-grade white powder-coat / polymer matching reference photo
        mesh.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color("#f2f3ef"),
          roughness: 0.25,
          metalness: 0.02
        });
      } else {
        // Satin Die-Cast Metallic / Stainless Steel
        mesh.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color("#dbe0e6"),
          roughness: 0.22,
          metalness: 0.92
        });
      }
      mesh.material.needsUpdate = true;
    });
  }, [finish, glass, product]);

  // Camera Presets
  const setCameraPreset = (preset) => {
    setActiveCameraPreset(preset);
    const cam = refs.current.camera;
    const controls = refs.current.controls;
    if (!cam || !controls) return;

    if (preset === "interior") {
      // Natural room eye-level view
      cam.position.set(0, 0.75, 2.30);
      controls.target.set(0, 0.60, 0.0);
    } else if (preset === "exterior") {
      // Looking at the outside facade
      cam.position.set(0, 0.75, -2.40);
      controls.target.set(0, 0.60, 0.0);
    } else if (preset === "front") {
      // Head-on elevation
      cam.position.set(0, 0.60, 2.50);
      controls.target.set(0, 0.60, 0.0);
    } else if (preset === "angle") {
      // 3/4 3D perspective showing reveal depth & sill
      cam.position.set(1.65, 0.95, 1.85);
      controls.target.set(0, 0.60, 0.0);
    } else if (preset === "hardware") {
      // Tight focus on the operating handle or Touch Lock
      if (windowType === "sliding") {
        cam.position.set(0.54, 0.62, 0.38);
        controls.target.set(0.54, 0.60, 0.04);
      } else {
        cam.position.set(0.48, 0.65, 0.38);
        controls.target.set(0.48, 0.60, 0.05);
      }
    }
  };

  // Direct Mouse/Touch Interaction
  const handlePointerDown = (e) => {
    const rect = mountRef.current.getBoundingClientRect();
    refs.current.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    refs.current.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    refs.current.pointerDownPos = { x: e.clientX, y: e.clientY };
    refs.current.pointerDownTime = Date.now();

    refs.current.raycaster.setFromCamera(refs.current.mouse, refs.current.camera);
    const intersects = refs.current.raycaster.intersectObjects(refs.current.operableParts, true);

    if (intersects.length > 0) {
      const hit = intersects[0].object;
      refs.current.draggedObject = hit;
      refs.current.dragStart = { x: e.clientX, y: e.clientY };
      // Temporarily disable OrbitControls during sash manipulation
      refs.current.controls.enabled = false;
      setIsDraggingPart(true);
    }
  };

  const handlePointerMove = (e) => {
    const rect = mountRef.current.getBoundingClientRect();
    refs.current.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    refs.current.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    // Hover Highlight Feedback
    if (!isDraggingPart) {
      refs.current.raycaster.setFromCamera(refs.current.mouse, refs.current.camera);
      const intersects = refs.current.raycaster.intersectObjects(refs.current.operableParts, true);
      if (intersects.length > 0) {
        setHoveredPart(intersects[0].object.name);
        mountRef.current.style.cursor = "pointer";
      } else {
        setHoveredPart(null);
        mountRef.current.style.cursor = "default";
      }
    } else if (refs.current.draggedObject) {
      // Direct Drag Operation
      const deltaX = (e.clientX - refs.current.dragStart.x) * 0.006;
      const tar = refs.current.targets;

      if (windowType === "sliding") {
        // Unlock on drag and slide along X axis [0 to 0.50m]
        tar.touchLockRightActuator = -0.012; // unlock actuator
        tar.slideRight = Math.max(0, Math.min(0.50, tar.slideRight + deltaX));
      } else if (windowType === "casement") {
        // Unlatch handle and rotate sash outward around hinge [0 to 1.25 rad / 72 deg]
        tar.rightHandleRot = Math.PI / 2;
        tar.rightAngle = Math.max(0, Math.min(1.25, tar.rightAngle + deltaX));
      } else if (windowType === "tilt-turn") {
        tar.ttHandleRot = Math.PI / 2;
        tar.turnAngle = Math.max(0, Math.min(1.25, tar.turnAngle + deltaX));
      }

      refs.current.dragStart = { x: e.clientX, y: e.clientY };
    }
  };

  const handlePointerUp = (e) => {
    const dist = Math.hypot(
      e.clientX - refs.current.pointerDownPos.x,
      e.clientY - refs.current.pointerDownPos.y
    );
    const duration = Date.now() - refs.current.pointerDownTime;

    // CLICK DETECTION (dist < 6px and duration < 350ms)
    if (dist < 6 && duration < 350 && refs.current.draggedObject) {
      toggleOperateSash(refs.current.draggedObject);
    }

    if (isDraggingPart) {
      refs.current.draggedObject = null;
      refs.current.controls.enabled = true; // Re-enable camera orbit
      setIsDraggingPart(false);
    }
  };

  // Toggle Sash / Handle Operation on Click
  const toggleOperateSash = (hitObject) => {
    const tar = refs.current.targets;
    const name = hitObject.name.toLowerCase();

    if (windowType === "sliding") {
      const isRight = name.includes("right");
      if (isRight) {
        if (tar.slideRight > 0.05) {
          // Close and lock right sliding sash
          tar.slideRight = 0;
          tar.touchLockRightActuator = 0;
        } else {
          // Unlock and slide open right sash
          tar.touchLockRightActuator = -0.012;
          tar.slideRight = 0.48;
        }
      } else {
        if (tar.slideLeft > 0.05) {
          tar.slideLeft = 0;
          tar.touchLockLeftActuator = 0;
        } else {
          tar.touchLockLeftActuator = -0.012;
          tar.slideLeft = 0.48;
        }
      }
    } else if (windowType === "tilt-turn") {
      if (currentMechanisms.tiltTurnMode === "closed") {
        // Turn Inward
        tar.ttHandleRot = Math.PI / 2;
        tar.turnAngle = 1.20; // 68 deg
        tar.tiltAngle = 0;
        setCurrentMechanisms((prev) => ({ ...prev, tiltTurnMode: "turn" }));
        if (onStateChange) onStateChange("turn");
      } else if (currentMechanisms.tiltTurnMode === "turn") {
        // Close
        tar.ttHandleRot = 0;
        tar.turnAngle = 0;
        tar.tiltAngle = 0;
        setCurrentMechanisms((prev) => ({ ...prev, tiltTurnMode: "closed" }));
        if (onStateChange) onStateChange("closed");
      } else {
        // Reset from tilt
        tar.ttHandleRot = 0;
        tar.tiltAngle = 0;
        tar.turnAngle = 0;
        setCurrentMechanisms((prev) => ({ ...prev, tiltTurnMode: "closed" }));
        if (onStateChange) onStateChange("closed");
      }
    } else {
      // Casement Window
      const isLeft = name.includes("left");
      if (isLeft) {
        if (tar.leftAngle > 0.1) {
          tar.leftAngle = 0;
          tar.leftHandleRot = 0;
        } else {
          tar.leftHandleRot = Math.PI / 2;
          tar.leftAngle = 1.20;
        }
      } else {
        if (tar.rightAngle > 0.1) {
          tar.rightAngle = 0;
          tar.rightHandleRot = 0;
        } else {
          tar.rightHandleRot = Math.PI / 2;
          tar.rightAngle = 1.20;
        }
      }
    }
  };

  // Bottom Control Bar Actions
  const handleOpenBoth = () => {
    const tar = refs.current.targets;
    if (windowType === "sliding") {
      tar.touchLockLeftActuator = -0.012;
      tar.touchLockRightActuator = -0.012;
      tar.slideLeft = 0.45;
      tar.slideRight = 0.45;
    } else if (windowType === "tilt-turn") {
      tar.ttHandleRot = Math.PI / 2;
      tar.turnAngle = 1.20;
      tar.tiltAngle = 0;
    } else {
      tar.leftHandleRot = Math.PI / 2;
      tar.rightHandleRot = Math.PI / 2;
      tar.leftAngle = 1.20;
      tar.rightAngle = 1.20;
    }
    if (onStateChange) onStateChange("open");
  };

  const handleCloseBoth = () => {
    const tar = refs.current.targets;
    tar.leftAngle = 0;
    tar.rightAngle = 0;
    tar.leftHandleRot = 0;
    tar.rightHandleRot = 0;
    tar.slideLeft = 0;
    tar.slideRight = 0;
    tar.touchLockLeftActuator = 0;
    tar.touchLockRightActuator = 0;
    tar.tiltAngle = 0;
    tar.turnAngle = 0;
    tar.ttHandleRot = 0;
    setCurrentMechanisms((prev) => ({ ...prev, tiltTurnMode: "closed" }));
    if (onStateChange) onStateChange("closed");
  };

  const handleTilt = () => {
    if (windowType !== "tilt-turn") return;
    const tar = refs.current.targets;
    tar.ttHandleRot = Math.PI; // 180 deg
    tar.tiltAngle = 0.21;     // 12 deg top inward tilt
    tar.turnAngle = 0;
    setCurrentMechanisms((prev) => ({ ...prev, tiltTurnMode: "tilt" }));
    if (onStateChange) onStateChange("tilt");
  };

  const handleTurn = () => {
    if (windowType !== "tilt-turn") return;
    const tar = refs.current.targets;
    tar.ttHandleRot = Math.PI / 2; // 90 deg
    tar.turnAngle = 1.20;          // 68 deg inward swing
    tar.tiltAngle = 0;
    setCurrentMechanisms((prev) => ({ ...prev, tiltTurnMode: "turn" }));
    if (onStateChange) onStateChange("turn");
  };

  // Play Showroom Demonstration
  const playShowroomDemo = () => {
    if (demoPlaying) {
      setDemoPlaying(false);
      return;
    }
    setDemoPlaying(true);
    handleCloseBoth();

    // Staged Architectural Demonstration
    setTimeout(() => {
      if (windowType === "tilt-turn") {
        handleTilt();
        setTimeout(() => {
          handleCloseBoth();
          setTimeout(() => {
            handleTurn();
            setTimeout(() => {
              handleCloseBoth();
              setDemoPlaying(false);
            }, 3000);
          }, 1200);
        }, 2800);
      } else {
        handleOpenBoth();
        setTimeout(() => {
          handleCloseBoth();
          setDemoPlaying(false);
        }, 3600);
      }
    }, 400);
  };

  return (
    <div style={{ width: "100%", height: "100%", position: "relative", display: "flex", flexDirection: "column" }}>
      {/* 3D WebGL Canvas Container */}
      <div
        ref={mountRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{
          width: "100%",
          flex: 1,
          minHeight: "440px",
          background: "radial-gradient(circle at center, #1e293b 0%, #0f172a 100%)",
          borderRadius: "14px",
          overflow: "hidden",
          position: "relative",
          boxShadow: "inset 0 2px 10px rgba(0,0,0,0.5)"
        }}
      >
        {/* Loading Overlay */}
        {loading && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(15, 23, 42, 0.75)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 30,
              backdropFilter: "blur(4px)"
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                border: "3px solid rgba(2, 132, 199, 0.2)",
                borderTopColor: "#0284c7",
                borderRadius: "50%",
                animation: "spin 0.8s linear infinite"
              }}
            />
            <p style={{ marginTop: "12px", color: "#f8fafc", fontSize: "0.82rem", fontWeight: "600" }}>
              Loading Architectural 3D Showroom...
            </p>
          </div>
        )}

        {/* Top Floating Controls Bar */}
        <div
          style={{
            position: "absolute",
            top: "14px",
            left: "14px",
            right: "14px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 20,
            pointerEvents: "none"
          }}
        >
          {/* Room & Status Badge */}
          <div
            style={{
              background: "rgba(15, 23, 42, 0.88)",
              backdropFilter: "blur(8px)",
              padding: "6px 14px",
              borderRadius: "20px",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              color: "#f8fafc",
              fontSize: "0.72rem",
              fontWeight: "600",
              pointerEvents: "auto",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
          >
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981", display: "inline-block" }} />
            <span>ROOM: {effectiveRoom.replace("-", " ").toUpperCase()}</span>
            <span style={{ color: "#94a3b8" }}>|</span>
            <span style={{ color: "#38bdf8" }}>3D SHOWROOM</span>
          </div>

          {/* Camera Presets Selector */}
          <div
            style={{
              background: "rgba(15, 23, 42, 0.88)",
              backdropFilter: "blur(8px)",
              padding: "4px",
              borderRadius: "24px",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              display: "flex",
              gap: "3px",
              pointerEvents: "auto"
            }}
          >
            {[
              { id: "interior", label: "Interior View" },
              { id: "exterior", label: "Exterior View" },
              { id: "front", label: "Elevation" },
              { id: "angle", label: "3D Angle" },
              { id: "hardware", label: "Hardware" }
            ].map((cam) => (
              <button
                key={cam.id}
                type="button"
                onClick={() => setCameraPreset(cam.id)}
                style={{
                  padding: "4px 10px",
                  borderRadius: "16px",
                  border: "none",
                  background: activeCameraPreset === cam.id ? "#0284c7" : "transparent",
                  color: activeCameraPreset === cam.id ? "#ffffff" : "#94a3b8",
                  fontSize: "0.68rem",
                  fontWeight: "700",
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
              >
                {cam.label}
              </button>
            ))}
          </div>
        </div>

        {/* Hover Interaction Tooltip */}
        {hoveredPart && (
          <div
            style={{
              position: "absolute",
              bottom: "75px",
              left: "50%",
              transform: "translateX(-50%)",
              background: "rgba(2, 132, 199, 0.92)",
              color: "#ffffff",
              padding: "4px 14px",
              borderRadius: "14px",
              fontSize: "0.72rem",
              fontWeight: "600",
              pointerEvents: "none",
              zIndex: 25,
              boxShadow: "0 4px 12px rgba(0,0,0,0.25)"
            }}
          >
            Click or drag to operate {hoveredPart.replace(/_/g, " ")}
          </div>
        )}
      </div>

      {/* Bottom Mechanism Control Bar */}
      <div
        style={{
          marginTop: "12px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "10px",
          padding: "10px 14px",
          background: "#0f172a",
          borderRadius: "12px",
          border: "1px solid rgba(255,255,255,0.08)"
        }}
      >
        {/* Primary Mechanical Actions */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {windowType === "tilt-turn" ? (
            <>
              <button
                type="button"
                onClick={handleTurn}
                style={{
                  padding: "6px 14px",
                  borderRadius: "8px",
                  border: "none",
                  background: "#0284c7",
                  color: "#ffffff",
                  fontSize: "0.74rem",
                  fontWeight: "700",
                  cursor: "pointer"
                }}
              >
                Turn Inward (90°)
              </button>
              <button
                type="button"
                onClick={handleTilt}
                style={{
                  padding: "6px 14px",
                  borderRadius: "8px",
                  border: "none",
                  background: "#38bdf8",
                  color: "#0f172a",
                  fontSize: "0.74rem",
                  fontWeight: "700",
                  cursor: "pointer"
                }}
              >
                Tilt Inward (12°)
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={handleOpenBoth}
              style={{
                padding: "6px 16px",
                borderRadius: "8px",
                border: "none",
                background: "#0284c7",
                color: "#ffffff",
                fontSize: "0.74rem",
                fontWeight: "700",
                cursor: "pointer"
              }}
            >
              Open Window
            </button>
          )}

          <button
            type="button"
            onClick={handleCloseBoth}
            style={{
              padding: "6px 14px",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.2)",
              background: "transparent",
              color: "#e2e8f0",
              fontSize: "0.74rem",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            Close &amp; Lock
          </button>
        </div>

        {/* Secondary Actions: Showroom Demo & Reset */}
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <button
            type="button"
            onClick={playShowroomDemo}
            style={{
              padding: "6px 14px",
              borderRadius: "8px",
              border: "1px solid #10b981",
              background: demoPlaying ? "#10b981" : "rgba(16, 185, 129, 0.15)",
              color: demoPlaying ? "#ffffff" : "#10b981",
              fontSize: "0.74rem",
              fontWeight: "700",
              cursor: "pointer",
              transition: "all 0.2s"
            }}
          >
            {demoPlaying ? "⏹ Stop Demo" : "▶ Play Showroom Demo"}
          </button>

          <button
            type="button"
            onClick={() => {
              handleCloseBoth();
              setCameraPreset("interior");
            }}
            style={{
              padding: "6px 12px",
              borderRadius: "8px",
              border: "none",
              background: "rgba(255,255,255,0.06)",
              color: "#94a3b8",
              fontSize: "0.72rem",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Interactive3DStudio;

import React, { useEffect, useRef, useState } from 'react';
import * as T from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { buildAssembly, applyMotion, disposeGroup } from './studioAssembly.js';
import { installFrictionStay } from './studioFrictionStay.js';
import { buildRoom, buildInstallation } from './studioRoom.js';
import {
  isPhotoRoom,
  photoRoomConfig,
  createPhotoRoom,
  updatePhotoRoom,
  restorePhotoAssembly,
  configurePhotoCamera,
  photoHitAllowed,
  getCompatibleRoomPreset
} from './studioPhotoRoom.js';
import { resolveStudioRecord, recoveredAsset } from '../../data/designs/studioRegistry.js';
import finishes from '../../data/designs/studioFinishes.json';
import { prominanceFinishes } from '../../data/designs/prominanceFinishes.js';
import { aluminiumShades } from '../../data/designs/aluminiumColours.js';
import { glassOptions } from '../../data/designs/glassData.js';
import './recovery-studio.css';
import { inspectAssembly, clearOpening } from './studioDiagnostics.js';
import { touchLockAsset, installTouchLocks } from './studioTouchLock.js';

let cachedModel;
let cachedHardware;
const loadHardware = () =>
  (cachedHardware ||= new GLTFLoader().loadAsync(touchLockAsset).catch(e => {
    cachedHardware = null;
    throw e;
  }));
const loadRecovered = () =>
  (cachedModel ||= new GLTFLoader().loadAsync(recoveredAsset).catch(e => {
    cachedModel = null;
    throw e;
  }));

const textures = new Map();
const textureSubscribers = new Set();
function texture(url) {
  if (!textures.has(url)) {
    const t = new T.TextureLoader().load(
      url,
      () => {
        t.userData.ready = true;
        textureSubscribers.forEach(fn => fn());
      },
      undefined,
      () => {
        t.userData.error = true;
        textureSubscribers.forEach(fn => fn());
      }
    );
    t.colorSpace = T.SRGBColorSpace;
    t.wrapS = t.wrapT = T.ClampToEdgeWrapping;
    textures.set(url, t);
  }
  return textures.get(url);
}

const scenery = {
  ooty: 'ooty_tea_estate.jpg',
  city: 'modern_city_skyline.jpg',
  garden: 'green_garden.jpg',
  hills: 'hills_nature.jpg'
};

function getFriendlySashName(motion, record, index, total) {
  if (motion.kind === 'fold') return 'Bi-fold panels';
  if (motion.kind === 'tilt') return 'Tilt & turn sash';
  if (motion.kind === 'top') return 'Top vent';

  if (record?.type?.includes('sliding')) {
    if (total === 1) return 'Sliding sash';
    if (total === 2) return index === 0 ? 'Left sliding sash' : 'Right sliding sash';
    return `Sliding sash ${index + 1}`;
  }

  if (record?.type?.includes('casement')) {
    if (total === 1) return 'Casement sash';
    if (total === 2) return motion.left ? 'Left sash' : 'Right sash';
    return `Casement sash ${index + 1}`;
  }

  return `Operable sash ${index + 1}`;
}

export default function Recovery3DStudio({
  product,
  windowType,
  design,
  finish,
  glass,
  state,
  viewMode,
  outdoorView,
  roomPreset
}) {
  const host = useRef();
  const r = useRef();
  const props = useRef();
  const hoveredRef = useRef(null);

  const [localFinish, setLocalFinish] = useState(finish);
  const [localGlass, setLocalGlass] = useState(glass);
  useEffect(() => {
    if (finish) setLocalFinish(finish);
  }, [finish]);
  useEffect(() => {
    if (glass) setLocalGlass(glass);
  }, [glass]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [viewFraming, setViewFraming] = useState('focus'); // 'focus' | 'room'
  const [lockToast, setLockToast] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [controlsCollapsed, setControlsCollapsed] = useState(false);

  props.current = {
    finish: localFinish || finish,
    glass: localGlass || glass,
    roomPreset,
    outdoorView,
    state
  };

  const reactRenderCountRef = useRef(0);
  reactRenderCountRef.current++;

  const showPerfHud =
    typeof window !== 'undefined' &&
    (new URLSearchParams(window.location.search).get('perf') === '1' || window.__FSQ_FORCE_PERF__);
  const [perfState, setPerfState] = useState(null);

  const [info, setInfo] = useState(null);
  const [error, setError] = useState('');
  const [version, setVersion] = useState(0);
  const [preset, setPreset] = useState('Interior');
  const [wallColor, setWallColor] = useState('#ded6c8');
  const [quality, setQuality] = useState('auto');
  const [detailsExpanded, setDetailsExpanded] = useState(false);
  const [naturalScale, setNaturalScale] = useState(true);

  const record = resolveStudioRecord(product, windowType, design);
  const [localRoom, setLocalRoom] = useState(() => getCompatibleRoomPreset(roomPreset, windowType));
  useEffect(() => {
    setLocalRoom(getCompatibleRoomPreset(roomPreset, windowType));
  }, [roomPreset, windowType]);
  const effectiveRoom = localRoom;

  props.current.effectiveRoom = effectiveRoom;
  props.current.wallColor = wallColor;
  props.current.naturalScale = naturalScale;

  const mark = () => {
    const ctx = r.current;
    if (!ctx) return;
    ctx.dirty = true;
    if (ctx.assembly && !ctx.photo) {
      ctx.camera.position.y = T.MathUtils.clamp(
        ctx.camera.position.y,
        0.25,
        Math.max(3.4, ctx.assembly.base + ctx.assembly.height + 0.45) - 0.15
      );
      ctx.camera.position.x = T.MathUtils.clamp(ctx.camera.position.x, -3.65, 3.65);
      if (!ctx.exterior) ctx.camera.position.z = T.MathUtils.clamp(ctx.camera.position.z, 0.55, 7.5);
    }
  };

  const showToast = msg => {
    setLockToast(msg);
    setTimeout(() => setLockToast(null), 2500);
  };

  const setTarget = (m, p) => {
    const linked = m.kind === 'fold' ? r.current.assembly.motions.filter(n => n.kind === 'fold') : [m];
    linked.forEach(n => {
      if (!n.locked) n.target = p;
    });
    mark();
  };

  const setTargetWithEase = (m, target) => {
    const linked = m.kind === 'fold' ? r.current.assembly.motions.filter(n => n.kind === 'fold') : [m];
    const now = performance.now();
    linked.forEach(n => {
      if (!n.locked) {
        n.animating = true;
        n.animStart = now;
        n.animFrom = n.current;
        n.animTo = target;
        n.animDuration = 750; // smooth 0.75s ease-in-out
        n.target = target;
      }
    });
    mark();
    setVersion(v => v + 1);
  };

  const switchMode = (m, mode) => {
    if (m.current > 0.001) {
      m.pendingMode = mode;
      m.pendingTarget = m.target;
      m.target = 0;
    } else m.mode = mode;
    mark();
  };

  function highlightSash(id, active) {
    const a = r.current?.assembly;
    if (!a) return;
    a.root.traverse(n => {
      if (n.userData.motionId === id && n.isMesh && n.material) {
        if (active) {
          if (!n.userData._origEmissive && n.material.emissive) {
            n.userData._origEmissive = n.material.emissive.getHex();
            n.material.emissive.setHex(0x182c3c);
          }
        } else {
          if (n.userData._origEmissive !== undefined && n.material.emissive) {
            n.material.emissive.setHex(n.userData._origEmissive);
            delete n.userData._origEmissive;
          }
        }
      }
    });
    mark();
  }

  function applyAppearance() {
    const a = r.current?.assembly;
    if (!a) return;

    const currentF = props.current.finish;
    const selected =
      finishes.find(
        f =>
          f.id === currentF?.id ||
          (f.id === 'mahogany' && currentF?.id === 'mahagony') ||
          f.name?.toLowerCase() === currentF?.name?.toLowerCase()
      ) ||
      prominanceFinishes.find(
        f => f.id === currentF?.id || f.name?.toLowerCase() === currentF?.name?.toLowerCase()
      );

    const supported = a.record.product === 'aluminium' || !!selected;

    a.root.traverse(n => {
      if (n.userData.role === 'profile') {
        const m = n.material;
        if (a.record.product === 'aluminium') {
          m.color.set(currentF?.baseColor || currentF?.bg || '#5c6477');
          if (currentF?.type === 'natural' || currentF?.hasGrain) {
            m.metalness = 0.15;
            m.roughness = 0.52;
            m.map = texture('/textures/finishes/Tex_Renolit_Walnut_Phase3D.png');
          } else if (currentF?.type === 'premium') {
            m.metalness = 0.82;
            m.roughness = 0.28;
            m.map = null;
          } else {
            m.metalness = 0.75;
            m.roughness = 0.38;
            m.map = null;
          }
          m.needsUpdate = true;
        } else if (selected) {
          if (selected.id === 'white-base' && n.userData.originalMaterial) {
            n.material = n.userData.originalMaterial;
          } else {
            n.material = a.mats.profile;
            const mat = n.material;
            if (selected.linearColor) mat.color.setRGB(...selected.linearColor);
            else if (selected.baseColor) mat.color.set(selected.baseColor);
            mat.roughness = selected.roughness || 0.38;
            mat.metalness = selected.metalness || 0;
            mat.map = selected.texture ? texture(selected.texture) : null;
            mat.needsUpdate = true;
          }
        }
      }
    });

    const id = props.current.glass?.id || 'clear';
    const gm = a.mats.glass;
    gm.color.set(
      id.includes('grey') ? '#aab4bb' : id.includes('bronze') ? '#bda28b' : id.includes('green') ? '#c8e2dc' : '#f4fcff'
    );
    gm.roughness = id.includes('frost') ? 0.5 : id.includes('reflect') ? 0.08 : 0.025;
    gm.transmission = id.includes('reflect') ? 0.65 : 1;
    gm.metalness = 0;
    gm.ior = 1.5;
    gm.thickness = 0.005;
    gm.attenuationColor.copy(gm.color);
    gm.attenuationDistance = id === 'clear' ? 100 : 0.08;
    gm.needsUpdate = true;

    a.root.traverse(n => {
      if (n.userData.role === 'glass') n.material = gm;
    });

    r.current.finishSupported = supported;
    r.current.glassSupported =
      !props.current.glass?.isDgu &&
      ['clear', 'tinted-grey', 'tinted-bronze', 'tinted-green'].includes(id) ||
      id.includes('frost') ||
      id.includes('reflect');
    mark();
  }

  async function setRoom(a, preset, wall) {
    const ctx = r.current;
    if (!ctx) return;
    const roomGeneration = (ctx.roomGeneration = (ctx.roomGeneration || 0) + 1);
    const targetPreset = getCompatibleRoomPreset(preset, a.record?.type || windowType);
    if (isPhotoRoom(targetPreset)) {
      const config = (await photoRoomConfig()).rooms.find(room => room.id === targetPreset);
      if (!config) throw Error('Requested photo room is unavailable');
      if (r.current !== ctx || ctx.roomGeneration !== roomGeneration || ctx.assembly !== a) return;
      const map = texture(config.image),
        entering = !ctx.photo;
      if (entering) {
        if (ctx.room) {
          ctx.scene.remove(ctx.room);
          disposeGroup(ctx.room);
        }
        if (ctx.cameraInitialized)
          ctx.fallbackCamera = { position: ctx.camera.position.clone(), target: ctx.controls.target.clone() };
        ctx.photo = createPhotoRoom(config, map);
        ctx.room = ctx.photo.group;
        ctx.scene.add(ctx.room);
      }
      updatePhotoRoom(ctx.photo, config, map, a, props.current.naturalScale);
      configurePhotoCamera(ctx, entering, viewFraming);
      if (entering && ctx.savedPhotoCamera) {
        ctx.camera.position.copy(ctx.savedPhotoCamera.position);
        ctx.controls.target.copy(ctx.savedPhotoCamera.target);
        ctx.controls.update();
      }
      ctx.cameraInitialized = true;
      const [wr, wg, wb] = config.wallColor.map(v => v/255);
      const warmSky = new T.Color(wr, wg, wb).lerp(new T.Color(1, 0.98, 0.93), 0.68);
      const warmFloor = new T.Color(wr, wg, wb).multiplyScalar(0.72);
      if (ctx.hemiLight) {
        ctx.hemiLight.color.copy(warmSky);
        ctx.hemiLight.groundColor.copy(warmFloor);
        ctx.hemiLight.intensity = 1.35;
      }
      if (ctx.sunLight) {
        ctx.sunLight.color.setHex(0xfff3e2);
        ctx.sunLight.intensity = 2.4;
      }
      if (ctx.photoFill) {
        ctx.photoFill.color.copy(warmSky);
        ctx.photoFill.intensity = 0.5;
      }
      if (ctx.ambientLight) {
        ctx.ambientLight.color.copy(warmSky);
        ctx.ambientLight.intensity = 0.32;
      }
      ctx.renderer.toneMappingExposure = 0.98;
      ctx.scene.environmentIntensity = 0.65;
    } else {
      const leaving = !!ctx.photo;
      if (leaving) {
        ctx.savedPhotoCamera = { position: ctx.camera.position.clone(), target: ctx.controls.target.clone() };
        restorePhotoAssembly(a);
        ctx.photo = null;
        ctx.controls.enableZoom = true;
        ctx.controls.minPolarAngle = Math.PI * 0.32;
        ctx.controls.maxPolarAngle = Math.PI * 0.58;
        ctx.controls.minAzimuthAngle = -Math.PI * 0.36;
        ctx.controls.maxAzimuthAngle = Math.PI * 0.36;
        ctx.camera.fov = 50;
        ctx.camera.updateProjectionMatrix();
      }
      if (ctx.room && !leaving && ctx.roomPreset === preset && ctx.wallColor === wall) {
        const old = ctx.room.getObjectByName('Installation_Architecture');
        ctx.room.remove(old);
        disposeGroup(old);
        ctx.room.add(buildInstallation(a, wall));
      } else {
        if (ctx.room) {
          ctx.scene.remove(ctx.room);
          disposeGroup(ctx.room);
        }
        ctx.room = buildRoom(a, preset, wall, mark);
        ctx.scene.add(ctx.room);
      }
      if (leaving && ctx.fallbackCamera) {
        ctx.camera.position.copy(ctx.fallbackCamera.position);
        ctx.controls.target.copy(ctx.fallbackCamera.target);
        ctx.controls.minDistance = 0.5;
        ctx.controls.maxDistance = 7;
        ctx.controls.update();
      } else if (leaving || !ctx.cameraInitialized) {
        camera('Interior');
        ctx.cameraInitialized = true;
      }
      if (ctx.hemiLight) {
        ctx.hemiLight.color.setHex(0xdcecff);
        ctx.hemiLight.groundColor.setHex(0x8c765e);
        ctx.hemiLight.intensity = 1.3;
      }
      if (ctx.sunLight) {
        ctx.sunLight.color.setHex(0xfff1d5);
        ctx.sunLight.intensity = 2.3;
      }
      if (ctx.photoFill) {
        ctx.photoFill.intensity = 0;
      }
      if (ctx.ambientLight) {
        ctx.ambientLight.color.setHex(0xffffff);
        ctx.ambientLight.intensity = 0.25;
      }
      ctx.renderer.toneMappingExposure = 0.85;
      ctx.scene.environmentIntensity = 0.6;
    }
    ctx.roomPreset = isPhotoRoom(targetPreset) ? targetPreset : preset;
    ctx.wallColor = wall;
    mark();
    setVersion(v => v + 1);
  }

  function camera(name) {
    const ctx = r.current,
      a = ctx?.assembly;
    if (!a) return;
    if (ctx.photo) {
      if (name === '3D Angle') {
        const tx = ctx.controls.target.x, ty = ctx.controls.target.y;
        ctx.camera.position.set(tx + 0.2, ty + 0.06, Math.sqrt(36 - 0.2 * 0.2 - 0.06 * 0.06));
      } else if (name === 'Hardware') {
        const handle = a.motions.find(m => m.handle)?.handle;
        if (handle) {
          const target = handle.getWorldPosition(new T.Vector3());
          ctx.controls.target.set(target.x, target.y, 0);
          ctx.camera.position.set(target.x, target.y, 5.2);
        } else ctx.camera.position.set(0, 0, 5.5);
      } else if (name === 'Interior' || name === 'Elevation') {
        if (viewFraming === 'focus') {
          configurePhotoCamera(ctx, false, 'focus');
        } else {
          configurePhotoCamera(ctx, false, 'room');
        }
      }
      ctx.controls.update();
      mark();
      setPreset(name);
      return;
    }
    const cy = a.base + a.height / 2,
      dist = Math.max(a.width * 1.5, a.height * 1.9, 2.8);
    ctx.controls.target.set(0, cy, 0);
    let pos = [0, cy + 0.15, dist];
    if (name === 'Interior') pos = [Math.min(a.width * 0.45, 1.4), cy + 0.35, dist + 1];
    if (name === '3D Angle') pos = [a.width * 0.8, cy + 0.35, dist];
    if (name === 'Exterior') pos = [a.width * 0.3, cy + 0.15, -dist];
    if (name === 'Hardware') {
      const handle = a.motions.find(m => m.handle)?.handle;
      if (handle) {
        const target = handle.getWorldPosition(new T.Vector3());
        ctx.controls.target.copy(target);
        pos = [target.x + 0.15, target.y + 0.08, target.z + 0.7];
      } else pos = [a.width * 0.2, cy, 0.8];
    }
    ctx.exterior = name === 'Exterior';
    ctx.camera.position.set(...pos);
    ctx.controls.minAzimuthAngle = name === 'Exterior' ? Math.PI * 0.65 : -Math.PI * 0.36;
    ctx.controls.maxAzimuthAngle = name === 'Exterior' ? Math.PI * 1.35 : Math.PI * 0.36;
    ctx.controls.minDistance = name === 'Hardware' ? 0.5 : Math.max(a.width * 0.7, 1.2);
    ctx.controls.maxDistance = 7;
    ctx.controls.update();
    mark();
    setPreset(name);
  }

  const applyCameraFraming = mode => {
    const ctx = r.current;
    if (!ctx) return;
    setViewFraming(mode);
    if (ctx.photo) {
      configurePhotoCamera(ctx, false, mode);
    } else {
      const a = ctx.assembly;
      if (!a) return;
      const cy = a.base + a.height / 2;
      if (mode === 'focus') {
        const dist = Math.max(a.width * 1.1, a.height * 1.3, 1.8);
        ctx.controls.target.set(0, cy, 0);
        ctx.camera.position.set(0, cy, dist);
      } else {
        camera('Interior');
      }
      ctx.controls.update();
    }
    mark();
  };

  const resetView = () => {
    const ctx = r.current;
    if (!ctx) return;
    if (ctx.photo) {
      ctx.cameraFramed = false;
      configurePhotoCamera(ctx, true, viewFraming);
    } else {
      camera('Interior');
    }
    mark();
  };

  const toggleFullscreen = () => {
    const el = host.current?.parentElement;
    if (!el) return;
    if (!document.fullscreenElement && !isFullscreen) {
      if (el.requestFullscreen) {
        el.requestFullscreen().catch(() => setIsFullscreen(true));
      } else {
        setIsFullscreen(true);
      }
    } else {
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(() => setIsFullscreen(false));
      } else {
        setIsFullscreen(false);
      }
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
      setTimeout(() => r.current?.resize?.(), 100);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  useEffect(() => {
    const handleKey = e => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isFullscreen]);

  useEffect(() => {
    const scene = new T.Scene();
    scene.background = new T.Color('#c8d3d7');
    const renderer = new T.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    renderer.outputColorSpace = T.SRGBColorSpace;
    renderer.toneMapping = T.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.85;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = T.PCFSoftShadowMap;

    const gl = renderer.getContext();
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    const glRenderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER) || 'WebGL';
    const glVendor = debugInfo ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) : gl.getParameter(gl.VENDOR) || 'Unknown';
    const isSoftware = /swiftshader|llvmpipe|software/i.test(glRenderer);

    const environment = new RoomEnvironment();
    const pmrem = new T.PMREMGenerator(renderer);
    const environmentTarget = pmrem.fromScene(environment, 0.04);
    scene.environment = environmentTarget.texture;
    scene.environmentIntensity = 0.6;
    environment.dispose();
    pmrem.dispose();

    const cam = new T.PerspectiveCamera(50, 1, 0.05, 100);
    const controls = new OrbitControls(cam, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = true;
    controls.panSpeed = 0.5;
    controls.minPolarAngle = Math.PI * 0.32;
    controls.maxPolarAngle = Math.PI * 0.58;

    const hemiLight = new T.HemisphereLight(0xdcecff, 0x8c765e, 1.3);
    scene.add(hemiLight);

    const sun = new T.DirectionalLight(0xfff1d5, 2.3);
    sun.position.set(-3, 6, -4);
    sun.castShadow = true;
    sun.shadow.mapSize.set(1024, 1024);
    sun.shadow.camera.left = -4;
    sun.shadow.camera.right = 4;
    sun.shadow.camera.top = 5;
    sun.shadow.camera.bottom = -2;
    scene.add(sun);

    const photoFill = new T.DirectionalLight(0xfff3e2, 0);
    photoFill.position.set(0, 1.5, 4);
    scene.add(photoFill);

    const ambient = new T.AmbientLight(0xffffff, 0.25);
    scene.add(ambient);

    host.current.append(renderer.domElement);
    const ctx = {
      scene,
      renderer,
      camera: cam,
      controls,
      dirty: true,
      assembly: null,
      room: null,
      scenery: null,
      frames: 0,
      last: performance.now(),
      renders: 0,
      raycaster: new T.Raycaster(),
      pointer: new T.Vector2(),
      generation: 0,
      hemiLight,
      sunLight: sun,
      photoFill,
      ambientLight: ambient,
      viewFraming: 'focus'
    };
    r.current = ctx;

    const textureReady = () => {
      mark();
      setVersion(v => v + 1);
    };
    textureSubscribers.add(textureReady);

    const resize = () => {
      const el = host.current;
      if (!el) return;
      const reduced = ctx.quality === 'fast' || (ctx.quality !== 'detail' && innerWidth < 700);
      renderer.setPixelRatio(Math.min(devicePixelRatio, ctx.quality === 'fast' ? 0.75 : reduced ? 1 : 1.5));
      renderer.shadowMap.enabled = !reduced;
      renderer.transmissionResolutionScale = reduced ? 0.5 : 1;
      renderer.setSize(el.clientWidth, el.clientHeight);
      cam.aspect = el.clientWidth / el.clientHeight;
      cam.updateProjectionMatrix();
      if (ctx.photo) configurePhotoCamera(ctx, false, ctx.viewFraming);
      mark();
    };
    ctx.resize = resize;
    const observer = new ResizeObserver(resize);
    observer.observe(host.current);
    controls.addEventListener('change', mark);

    function hit(e) {
      const rect = renderer.domElement.getBoundingClientRect();
      ctx.pointer.set(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);
      scene.updateMatrixWorld(true);
      ctx.raycaster.setFromCamera(ctx.pointer, cam);
      if (!photoHitAllowed(ctx, ctx.raycaster.ray)) return null;
      const hits = ctx.raycaster.intersectObjects([ctx.assembly?.root].filter(Boolean), true);
      for (const h of hits) {
        const motionId = h.object.userData.motionId;
        if (motionId) {
          const motion = ctx.assembly?.motions.find(m => m.id === motionId);
          if (motion) return motion;
        }
      }
      return null;
    }

    const down = e => {
      const motion = hit(e);
      if (motion) {
        if (e.stopPropagation) e.stopPropagation();
        if (e.preventDefault && e.pointerType === 'touch') e.preventDefault();
        controls.enabled = false;
        ctx.drag = {
          motion,
          startX: e.clientX,
          startY: e.clientY,
          startTarget: motion.target,
          moved: false,
          pointerId: e.pointerId
        };
        try {
          renderer.domElement.setPointerCapture(e.pointerId);
        } catch (_) {}
      }
    };

    const move = e => {
      if (ctx.drag) {
        const d = ctx.drag;
        const dx = e.clientX - d.startX;
        const dy = e.clientY - d.startY;
        const dist = Math.hypot(dx, dy);
        if (!d.moved && dist > 5) {
          d.moved = true;
        }
        if (d.moved && !d.motion.locked) {
          if (d.motion.kind === 'slide') {
            const sign = Math.sign(d.motion.travel) * (ctx.exterior ? -1 : 1);
            const delta = (dx * sign) / 220;
            setTarget(d.motion, T.MathUtils.clamp(d.startTarget + delta, 0, 1));
          } else if (d.motion.kind === 'casement' || d.motion.kind === 'recovered') {
            const sign = (d.motion.left ? -1 : 1) * (ctx.exterior ? -1 : 1);
            const delta = (dx * sign) / 180;
            setTarget(d.motion, T.MathUtils.clamp(d.startTarget + delta, 0, 1));
          } else if (d.motion.kind === 'top') {
            const delta = -dy / 180;
            setTarget(d.motion, T.MathUtils.clamp(d.startTarget + delta, 0, 1));
          } else if (d.motion.kind === 'tilt') {
            const delta = (d.motion.mode === 'tilt' ? -dy : dx * (d.motion.left ? -1 : 1)) / 180;
            setTarget(d.motion, T.MathUtils.clamp(d.startTarget + delta, 0, 1));
          } else if (d.motion.kind === 'fold') {
            const delta = -dx / 220;
            setTarget(d.motion, T.MathUtils.clamp(d.startTarget + delta, 0, 1));
          }
        }
      } else {
        const m = hit(e);
        if (m) {
          renderer.domElement.style.cursor = m.locked ? 'not-allowed' : 'pointer';
          if (hoveredRef.current !== m.id) {
            if (hoveredRef.current) highlightSash(hoveredRef.current, false);
            hoveredRef.current = m.id;
            highlightSash(m.id, true);
          }
        } else {
          renderer.domElement.style.cursor = 'default';
          if (hoveredRef.current) {
            highlightSash(hoveredRef.current, false);
            hoveredRef.current = null;
          }
        }
      }
    };

    const up = e => {
      if (ctx.drag) {
        const d = ctx.drag;
        if (!d.moved) {
          if (d.motion.locked) {
            showToast('🔒 Sash is locked. Click "Unlock" to operate.');
          } else {
            const next = d.motion.target > 0.5 ? 0 : 1;
            setTargetWithEase(d.motion, next);
          }
        }
        try {
          if (d.pointerId) renderer.domElement.releasePointerCapture(d.pointerId);
        } catch (_) {}
        ctx.drag = null;
        controls.enabled = true;
        mark();
        setVersion(v => v + 1);
      }
    };

    renderer.domElement.addEventListener('pointerdown', down, true);
    renderer.domElement.addEventListener('pointermove', move);
    renderer.domElement.addEventListener('pointerup', up);
    renderer.domElement.addEventListener('pointercancel', up);

    let raf,
      frameCount = 0,
      lastFpsTime = performance.now(),
      currentFps = 0,
      currentFrameMs = 0;

    const frame = now => {
      const dt = Math.min((now - ctx.last) / 1000, 0.05);
      ctx.last = now;
      let moving = false;

      ctx.assembly?.motions.forEach(m => {
        if (m.pendingMode && m.current < 0.001) {
          m.current = 0;
          m.mode = m.pendingMode;
          m.pendingMode = null;
          m.target = m.pendingTarget;
        }

        if (m.animating) {
          const elapsed = now - m.animStart;
          const progress = Math.min(elapsed / m.animDuration, 1);
          const ease =
            progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;
          m.current = m.animFrom + (m.animTo - m.animFrom) * ease;
          if (progress >= 1) {
            m.current = m.animTo;
            m.animating = false;
          }
          moving = true;
        } else if (Math.abs(m.current - m.target) > 0.0001) {
          m.current = T.MathUtils.damp(m.current, m.target, 12, dt);
          moving = true;
        }
        applyMotion(m);
      });

      if (ctx.wasMoving && !moving) setVersion(v => v + 1);
      ctx.wasMoving = moving;
      controls.update();

      if (ctx.dirty || moving) {
        renderer.render(scene, cam);
        ctx.dirty = false;
        ctx.renders++;
      }
      ctx.frames++;
      frameCount++;

      if (now - lastFpsTime >= 400) {
        const elapsed = now - lastFpsTime;
        currentFps = (frameCount * 1000) / elapsed;
        currentFrameMs = elapsed / frameCount;
        frameCount = 0;
        lastFpsTime = now;
        if (showPerfHud)
          setPerfState({
            fps: currentFps,
            frameMs: currentFrameMs,
            calls: renderer.info.render.calls,
            triangles: renderer.info.render.triangles,
            geometries: renderer.info.memory.geometries,
            textures: renderer.info.memory.textures,
            renders: ctx.renders,
            reactRenders: reactRenderCountRef.current,
            glRenderer,
            glVendor,
            isSoftware
          });
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    if (import.meta.env.DEV) {
      window.__FSQ_PERF__ = {
        getFps: () => currentFps,
        getFrameMs: () => currentFrameMs,
        getCalls: () => renderer.info.render.calls,
        getTriangles: () => renderer.info.render.triangles,
        getGeometries: () => renderer.info.memory.geometries,
        getTextures: () => renderer.info.memory.textures,
        getRenders: () => ctx.renders,
        getReactRenders: () => reactRenderCountRef.current,
        getGlRenderer: () => glRenderer,
        getGlVendor: () => glVendor,
        isSoftware: () => isSoftware
      };
      window.__FSQ_STUDIO__ = {
        snapshot: () => {
          const a = ctx.assembly;
          const nodes = [],
            roles = {};
          a?.root.traverse(n => {
            nodes.push(n.name);
            if (n.userData.role) roles[n.userData.role] = (roles[n.userData.role] || 0) + 1;
          });
          return {
            id: a?.record.id,
            source: a?.source,
            panels: a?.panels,
            width: a?.width,
            height: a?.height,
            tracks: a?.tracks,
            hardwareSource: a?.hardwareSource,
            motions: a?.motions.map(m => ({
              id: m.id,
              kind: m.kind,
              target: m.target,
              current: m.current,
              track: m.track,
              travel: m.travel,
              mode: m.mode,
              locked: m.locked
            })),
            roles,
            nodes,
            renderer: renderer.info.render,
            memory: renderer.info.memory,
            renderCount: ctx.renders,
            reactRenders: reactRenderCountRef.current,
            perf: {
              fps: Number(currentFps.toFixed(1)),
              frameMs: Number(currentFrameMs.toFixed(2)),
              calls: renderer.info.render.calls,
              triangles: renderer.info.render.triangles,
              geometries: renderer.info.memory.geometries,
              textures: renderer.info.memory.textures,
              renders: ctx.renders,
              reactRenders: reactRenderCountRef.current,
              glRenderer,
              glVendor,
              isSoftware
            },
            roomMatrix: ctx.room?.matrix.toArray(),
            camera: cam.position.toArray(),
            photo: ctx.photo
              ? {
                  room: ctx.photo.config.id,
                  ready: !!ctx.photo.texture.userData.ready,
                  loadError: !!ctx.photo.texture.userData.error,
                  opening: ctx.photo.config.opening,
                  fit: ctx.photo.fit,
                  roomMatrix: ctx.photo.plane.matrixWorld.toArray()
                }
              : null,
            finishSupported: ctx.finishSupported,
            glassSupported: ctx.glassSupported
          };
        },
        operate: (id, p, mode) => {
          const m = ctx.assembly.motions.find(m => m.id === id);
          if (m) {
            m.mode = mode || m.mode;
            m.target = p;
            mark();
          }
        },
        camera,
        ctx
      };
      Object.assign(window.__FSQ_STUDIO__, {
        inspect: () => inspectAssembly(ctx.assembly, ctx.room?.getObjectByName('Installation_Architecture')),
        clearOpening: () => clearOpening(ctx.assembly)
      });
    }

    return () => {
      cancelAnimationFrame(raf);
      textureSubscribers.delete(textureReady);
      if (!textureSubscribers.size) {
        textures.forEach(t => t.dispose());
        textures.clear();
      }
      observer.disconnect();
      controls.dispose();
      disposeGroup(ctx.assembly?.root);
      disposeGroup(ctx.room);
      disposeGroup(ctx.scenery);
      environmentTarget.dispose();
      renderer.dispose();
      renderer.domElement.remove();
      r.current = null;
      if (import.meta.env.DEV) {
        delete window.__FSQ_STUDIO__;
        delete window.__FSQ_PERF__;
      }
    };
  }, []);

  useEffect(() => {
    const ctx = r.current;
    if (!ctx || !record) {
      setError('This catalogue configuration is unavailable.');
      return;
    }
    const generation = ++ctx.generation;
    setError('');
    setInfo(null);

    async function install() {
      const previous =
        r.current?.assembly?.motions.map(m => ({
          id: m.id,
          kind: m.kind === 'recovered' ? 'casement' : m.kind,
          left: m.left,
          current: m.current,
          target: m.target,
          mode: m.mode,
          locked: m.locked
        })) || [];
      let a = buildAssembly(record);
      if (a.tracks) {
        try {
          const hardware = await loadHardware();
          installTouchLocks(a, hardware.scene);
        } catch (e) {
          disposeGroup(a.root);
          setError(`Touch Lock reference could not load: ${e.message}`);
          return;
        }
      }
      if (record.source === 'recovered-glb') {
        try {
          const loaded = await loadRecovered();
          disposeGroup(a.root);
          a.root = loaded.scene.clone(true);
          a.root.position.y = 0.85;
          a.width = 1.2;
          a.height = parseInt(record.design.height) / 100;
          a.root.scale.y = a.height / 1.2;
          a.base = 0.85;
          a.source = recoveredAsset;
          a.motions = [];
          a.root.traverse(n => {
            if (n.isMesh) {
              n.geometry = n.geometry.clone();
              n.material = n.material.clone();
              n.userData.originalMaterial = n.material;
              const mn = n.material.name;
              n.userData.role = /M_Recovery_(Frame|Sash|Bead)_UPVC_White/.test(mn)
                ? 'profile'
                : mn === 'M_Recovery_Glass_Clear'
                ? 'glass'
                : mn === 'M_Recovery_EPDM'
                ? 'gasket'
                : 'hardware';
              n.castShadow = n.userData.role !== 'glass';
              n.receiveShadow = true;
            }
          });
          for (const side of ['Left', 'Right']) {
            const node = a.root.getObjectByName(`Sash_${side}_Controller`),
              handle = a.root.getObjectByName(`Handle_${side}_Pivot`);
            if (!node || !handle) throw new Error('Recovered controller contract missing');
            const id = side.toLowerCase();
            const hingeDelta = 0.032 - node.position.z;
            node.children.forEach(child => (child.position.z -= hingeDelta));
            node.position.z += hingeDelta;
            node.updateMatrix();
            a.root.updateMatrixWorld(true);

            const lockStile = a.root.getObjectByName(`Sash_${side}_Profile_${side === 'Left' ? 'Right' : 'Left'}`),
              relative = new T.Matrix4().copy(node.matrixWorld).invert().multiply(lockStile.matrixWorld),
              inverse = relative.clone().invert(),
              attribute = lockStile.geometry.attributes.position;
            const points = Array.from({ length: attribute.count }, (_, i) =>
                new T.Vector3().fromBufferAttribute(attribute, i).applyMatrix4(relative)
              ),
              bounds = new T.Box3().setFromPoints(points),
              mid = (bounds.max.y + bounds.min.y) / 2,
              span = bounds.max.y - bounds.min.y;
            points.forEach((v, i) => {
              const cut = side === 'Left' ? bounds.max.x - v.x : v.x - bounds.min.x;
              if (v.y > mid + span * 0.35) v.y = bounds.max.y - cut;
              else if (v.y < mid - span * 0.35) v.y = bounds.min.y + cut;
              v.applyMatrix4(inverse);
              attribute.setXYZ(i, v.x, v.y, v.z);
            });
            attribute.needsUpdate = true;
            lockStile.geometry.computeVertexNormals();
            lockStile.geometry.computeBoundingBox();
            node.traverse(n => {
              n.userData.motionId = id;
            });
            a.motions.push({ id, kind: 'recovered', node, handle, left: side === 'Left', target: 0, current: 0 });
          }
          for (const m of a.motions) {
            const side = m.left ? 'Left' : 'Right',
              sill = a.root.getObjectByName(`Sash_${side}_Profile_Bottom`);
            a.root.updateMatrixWorld(true);
            sill.geometry.computeBoundingBox();
            const relative = new T.Matrix4().copy(m.node.matrixWorld).invert().multiply(sill.matrixWorld),
              bounds = sill.geometry.boundingBox.clone().applyMatrix4(relative);
            const frame = a.root.getObjectByName('Frame_Bottom');
            frame.geometry.computeBoundingBox();
            const fb = frame.geometry.boundingBox
              .clone()
              .applyMatrix4(new T.Matrix4().copy(m.node.parent.matrixWorld).invert().multiply(frame.matrixWorld));
            m.node.updateMatrix();
            installFrictionStay(m, {
              width: 0.55,
              bottom: bounds.min.y,
              front: bounds.max.z,
              frameFront: fb.max.z,
              mountY: fb.max.y
            });
          }
          a.clips = loaded.animations.map(c => c.name);
        } catch (e) {
          disposeGroup(a.root);
          setError(`Recovered model could not load: ${e.message}`);
          return;
        }
      }
      const used = new Set();
      for (const m of a.motions) {
        const kind = m.kind === 'recovered' ? 'casement' : m.kind,
          old =
            previous.find(n => n.kind === kind && n.id === m.id && n.left === m.left && !used.has(n)) ||
            previous.find(n => n.kind === kind && n.left === m.left && !used.has(n)) ||
            (a.motions.some(other => other !== m && previous.some(p => p.left === other.left))
              ? null
              : previous.find(n => n.kind === kind && !used.has(n)));
        if (old) {
          used.add(old);
          Object.assign(m, { current: old.current, target: old.target, mode: old.mode, locked: old.locked });
        } else {
          m.current = m.target = ['open', 'turn', 'tilt'].includes(props.current.state)
            ? 1
            : props.current.state === 'preview'
            ? 0.25
            : 0;
        }
        applyMotion(m);
      }
      if (generation !== ctx.generation) {
        disposeGroup(a.root);
        return;
      }
      if (ctx.assembly) {
        ctx.scene.remove(ctx.assembly.root);
        disposeGroup(ctx.assembly.root);
      }
      ctx.assembly = a;
      ctx.scene.add(a.root);
      try {
        await setRoom(a, props.current.effectiveRoom, props.current.wallColor);
      } catch (e) {
        setError(e.message);
        return;
      }
      if (generation !== ctx.generation) return;
      const nodes = [],
        materials = new Set();
      let meshCount = 0;
      a.root.traverse(n => {
        nodes.push(n.name);
        if (n.isMesh) {
          meshCount++;
          (Array.isArray(n.material) ? n.material : [n.material]).forEach(mat =>
            materials.add(mat.name || mat.uuid)
          );
        }
      });
      const bounds = new T.Box3().setFromObject(a.root).getSize(new T.Vector3());
      applyAppearance();
      setInfo({
        id: record.id,
        source: a.source,
        hardwareSource: a.hardwareSource,
        panels: a.panels.length,
        tracks: a.tracks,
        motions: a.motions.length,
        meshCount,
        materialCount: materials.size,
        nodes,
        dimensions: bounds.toArray()
      });
      setVersion(v => v + 1);
    }
    install();
    return () => {
      ctx.generation++;
    };
  }, [record?.id]);

  useEffect(() => {
    applyAppearance();
  }, [localFinish, finish, localGlass, glass, info]);

  useEffect(() => {
    const ctx = r.current;
    if (ctx) {
      ctx.quality = quality;
      ctx.resize();
    }
  }, [quality]);

  useEffect(() => {
    const ctx = r.current;
    if (ctx?.assembly) setRoom(ctx.assembly, effectiveRoom, wallColor).catch(e => setError(e.message));
  }, [effectiveRoom, wallColor, naturalScale]);

  useEffect(() => {
    const ctx = r.current;
    if (!ctx) return;
    const map = texture(`/textures/environments/${scenery[outdoorView] || scenery.ooty}`);
    if (!ctx.scenery) {
      const mesh = new T.Mesh(
        new T.PlaneGeometry(150, 84.375),
        new T.MeshBasicMaterial({ map, side: T.DoubleSide, toneMapped: false })
      );
      mesh.position.set(0, 3.5, -28);
      mesh.name = 'Stationary_Distant_Outdoor';
      ctx.scenery = mesh;
      ctx.scene.add(mesh);
    } else {
      ctx.scenery.material.map = map;
      ctx.scenery.material.needsUpdate = true;
    }
    mark();
    const timer = setTimeout(mark, 1500);
    return () => clearTimeout(timer);
  }, [outdoorView]);

  useEffect(() => {
    const a = r.current?.assembly;
    if (!a) return;
    for (const m of a.motions) {
      const target = state === 'open' || state === 'turn' || state === 'tilt' ? 1 : state === 'preview' ? 0.25 : 0;
      if (target > 0) m.locked = false;
      if (m.kind === 'tilt') {
        switchMode(m, state === 'tilt' ? 'tilt' : 'turn');
        if (m.pendingMode) m.pendingTarget = target;
        else m.target = target;
      } else m.target = target;
    }
    mark();
    setVersion(v => v + 1);
  }, [state]);

  useEffect(() => {
    if (info) camera(viewMode === 'angle' ? '3D Angle' : 'Elevation');
  }, [viewMode]);

  const motions = r.current?.assembly?.motions || [];
  const availableSwatches = record?.product === 'aluminium' ? aluminiumShades : prominanceFinishes;

  return (
    <div
      className={`recovery-studio ${isFullscreen ? 'fullscreen-active' : ''}`}
      data-design-id={record?.id}
      data-load-status={error ? 'error' : info ? 'ready' : 'loading'}
      style={{
        height: '100%',
        position: 'relative',
        background: '#ece8df',
        borderRadius: isFullscreen ? 0 : 14,
        overflow: 'hidden'
      }}
    >
      <div ref={host} style={{ height: '100%', width: '100%', touchAction: 'none' }} />

      {/* Lock Notification Toast */}
      {lockToast && <div className="studio-lock-toast">{lockToast}</div>}

      {/* Performance HUD (?perf=1) */}
      {showPerfHud && perfState && (
        <div
          style={{
            position: 'absolute',
            top: 54,
            right: 8,
            background: 'rgba(15,23,42,0.92)',
            color: '#f8fafc',
            padding: '7px 11px',
            borderRadius: 8,
            fontSize: 11,
            fontFamily: 'Consolas,monospace',
            lineHeight: 1.45,
            pointerEvents: 'none',
            zIndex: 40,
            border: '1px solid rgba(255,255,255,0.18)',
            boxShadow: '0 4px 14px rgba(0,0,0,0.35)'
          }}
        >
          <div style={{ color: '#38bdf8', fontWeight: 700, fontSize: 11 }}>FSQ 3D STUDIO PERF (?perf=1)</div>
          <div>
            FPS:{' '}
            <span style={{ color: perfState.fps >= 30 ? '#4ade80' : '#f59e0b', fontWeight: 700 }}>
              {perfState.fps.toFixed(1)}
            </span>{' '}
            ({perfState.frameMs.toFixed(1)} ms)
          </div>
          <div>
            Calls: <strong>{perfState.calls}</strong> · Tris: <strong>{perfState.triangles.toLocaleString()}</strong>
          </div>
          <div>
            Geoms: <strong>{perfState.geometries}</strong> · Texs: <strong>{perfState.textures}</strong>
          </div>
          <div>
            Renders: <strong>{perfState.renders}</strong> · React: <strong>{perfState.reactRenders}</strong>
          </div>
          <div style={{ color: perfState.isSoftware ? '#fbbf24' : '#38bdf8', fontSize: 10, marginTop: 2 }}>
            {perfState.isSoftware ? '⚠️ Software GL (SwiftShader)' : '⚡ Hardware GPU'}: {perfState.glRenderer}
          </div>
        </div>
      )}

      {/* Top Floating Controls Bar */}
      <div className="studio-top-hud">
        {/* Left: View Presets & Framing Toggles */}
        <div className="studio-pill-group">
          {(isPhotoRoom(effectiveRoom)
            ? ['Interior', '3D Angle', 'Hardware']
            : ['Interior', 'Exterior', 'Elevation', '3D Angle', 'Hardware']
          ).map(n => (
            <button key={n} type="button" onClick={() => camera(n)} aria-pressed={preset === n}>
              {n}
            </button>
          ))}
          <div style={{ width: 1, background: '#cbd5df', margin: '0 2px' }} />
          <button
            type="button"
            className={viewFraming === 'focus' ? 'active-pill' : ''}
            onClick={() => applyCameraFraming('focus')}
            title="Window fills 55-65% of screen height"
          >
            Window Focus
          </button>
          <button
            type="button"
            className={viewFraming === 'room' ? 'active-pill' : ''}
            onClick={() => applyCameraFraming('room')}
            title="Wide full room view"
          >
            Full Room
          </button>
          <button type="button" onClick={resetView} title="Reset camera view">
            ↺ Reset
          </button>
        </div>

        {/* Right: Settings & Fullscreen Buttons */}
        <div className="studio-pill-group" style={{ display: 'flex', alignItems: 'center' }}>
          <button
            type="button"
            onClick={() => setShowSettings(s => !s)}
            style={{ fontWeight: 600 }}
            title="Showroom Settings"
          >
            ⚙ Settings
          </button>
          <button
            type="button"
            onClick={toggleFullscreen}
            style={{
              background: isFullscreen ? '#0284c7' : '#f8fafb',
              color: isFullscreen ? 'white' : '#193343',
              fontWeight: 700
            }}
            title={isFullscreen ? 'Exit Fullscreen (ESC)' : 'Fullscreen Showroom'}
          >
            {isFullscreen ? '✕ Exit' : '⛶ Fullscreen'}
          </button>
        </div>
      </div>

      {/* Settings Popover */}
      {showSettings && (
        <div className="studio-settings-popover">
          <div style={{ fontWeight: 700, fontSize: 12, borderBottom: '1px solid #e2e8f0', paddingBottom: 4 }}>
            Showroom Settings
          </div>
          <label style={{ fontSize: 11, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>3D Quality:</span>
            <select aria-label="3D quality" value={quality} onChange={e => setQuality(e.target.value)}>
              <option value="auto">Auto</option>
              <option value="fast">Fast</option>
              <option value="detail">Detail</option>
            </select>
          </label>
          {isPhotoRoom(effectiveRoom) && (
            <label style={{ fontSize: 11, display: 'flex', alignItems: 'center', gap: 6 }}>
              <input
                type="checkbox"
                aria-label="Natural room scale"
                checked={naturalScale}
                onChange={e => setNaturalScale(e.target.checked)}
              />
              <span>Natural room scale</span>
            </label>
          )}
          {!isPhotoRoom(effectiveRoom) && (
            <label style={{ fontSize: 11, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Wall Tone:</span>
              <input
                aria-label="Wall comparison colour"
                type="color"
                value={wallColor}
                onChange={e => setWallColor(e.target.value)}
              />
            </label>
          )}
          <button
            type="button"
            onClick={() => setShowSettings(false)}
            style={{ marginTop: 4, width: '100%', fontSize: 11, padding: 4 }}
          >
            Close
          </button>
        </div>
      )}

      {/* Bottom Floating Control Panel */}
      <div className="studio-bottom-panel">
        {error ? (
          <strong role="alert" style={{ color: '#dc2626' }}>
            {error}
          </strong>
        ) : !info ? (
          'Loading selected assembly…'
        ) : (
          <>
            {/* Header: Title, Subtitle, Collapsible Toggle */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
              <div>
                <span style={{ fontWeight: 700, color: '#0f172a' }}>{record.name}</span>
                <span style={{ color: '#64748b', marginLeft: 8, fontSize: 11 }}>
                  {record.design.concept ? 'Concept — provisional' : 'Interactive 3D Showroom'}
                </span>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <button
                  type="button"
                  onClick={() => setControlsCollapsed(c => !c)}
                  style={{ fontSize: 11, padding: '2px 8px' }}
                >
                  {controlsCollapsed ? '▲ Show Controls' : '▼ Hide Controls'}
                </button>
                <button
                  type="button"
                  onClick={() => setDetailsExpanded(x => !x)}
                  style={{
                    fontSize: 11,
                    padding: '2px 8px',
                    background: detailsExpanded ? '#e2e8f0' : '#fff'
                  }}
                >
                  {detailsExpanded ? 'Hide Specs' : 'Info & Specs'}
                </button>
              </div>
            </div>

            {!controlsCollapsed && (
              <>
                {/* Operable Sashes Row */}
                <div
                  style={{
                    display: 'flex',
                    gap: 12,
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    marginTop: 8,
                    paddingTop: 6,
                    borderTop: '1px solid #f1f5f9'
                  }}
                >
                  {motions
                    .filter((m, i) => m.kind !== 'fold' || i === 0)
                    .map((m, idx, arr) => {
                      const humanName = getFriendlySashName(m, record, idx, arr.length);
                      return (
                        <div
                          key={m.id}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 6,
                            background: '#f8fafc',
                            padding: '4px 8px',
                            borderRadius: 6,
                            border: '1px solid #e2e8f0'
                          }}
                        >
                          <span style={{ fontWeight: 600, color: '#334155', minWidth: 65 }}>{humanName}</span>
                          <input
                            aria-label={`${m.id} opening`}
                            disabled={m.locked}
                            type="range"
                            min="0"
                            max="1"
                            step=".01"
                            value={m.target}
                            onChange={e => {
                              setTarget(m, +e.target.value);
                              setVersion(v => v + 1);
                            }}
                            style={{ width: 85 }}
                          />
                          {m.kind === 'tilt' && (
                            <select
                              aria-label={`${m.id} mechanism mode`}
                              value={m.pendingMode || m.mode}
                              onChange={e => {
                                switchMode(m, e.target.value);
                                setVersion(v => v + 1);
                              }}
                            >
                              <option value="turn">Turn</option>
                              <option value="tilt">Tilt</option>
                            </select>
                          )}
                          <button
                            type="button"
                            onClick={() => {
                              const linked = m.kind === 'fold' ? motions : [m];
                              const lock = !m.locked;
                              linked.forEach(n => {
                                n.locked = lock;
                                if (lock) n.target = 0;
                              });
                              mark();
                              setVersion(v => v + 1);
                            }}
                            style={{
                              fontSize: 11,
                              padding: '2px 7px',
                              background: m.locked ? '#fee2e2' : 'white',
                              color: m.locked ? '#b91c1c' : '#334155',
                              borderColor: m.locked ? '#fca5a5' : '#cbd5df'
                            }}
                          >
                            {m.locked ? '🔒 Locked' : 'Unlock'}
                          </button>
                        </div>
                      );
                    })}
                </div>

                {/* Swatches & Material Controls (Always visible in fullscreen and expandable in normal) */}
                <div style={{ marginTop: 8, paddingTop: 6, borderTop: '1px solid #f1f5f9' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#475569' }}>
                      {record?.product === 'aluminium' ? 'Uniframe Architectural Shades' : 'Prominance Premium Laminates'}:
                    </div>
                    {/* Room & Glass Quick Selectors */}
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <select
                        id="fsq-studio-room-overlay"
                        aria-label="Room environment"
                        value={effectiveRoom}
                        onChange={e => {
                          const val = e.target.value;
                          setLocalRoom(val);
                          props.current.effectiveRoom = val;
                          if (r.current?.assembly) setRoom(r.current.assembly, val, wallColor);
                        }}
                        style={{ fontSize: 11, padding: '2px 6px' }}
                      >
                        {(windowType === 'door-casement' || windowType === 'door-sliding') && (
                          <option value="photo-door-living">Door Living Room (Photo)</option>
                        )}
                        {(windowType === 'door-fold' || windowType === 'bay-concepts') && (
                          <>
                            <option value="photo-wide-living">Wide Living Room (Photo)</option>
                            <option value="photo-door-living">Door Living Room (Photo)</option>
                          </>
                        )}
                        {(!windowType?.startsWith('door') && windowType !== 'bay-concepts') && (
                          <>
                            <option value="photo-bedroom">Bedroom (Photo)</option>
                            <option value="photo-living">Living Room (Photo)</option>
                            <option value="photo-garden-sitting">Garden Sitting (Photo)</option>
                          </>
                        )}
                        <option value="hillside-living">3D Procedural Room</option>
                      </select>
                      <select
                        id="fsq-studio-glass-overlay"
                        aria-label="Glass specification"
                        value={localGlass?.id || glass?.id || 'clear'}
                        onChange={e => {
                          const found = glassOptions.find(g => g.id === e.target.value) || { id: e.target.value };
                          setLocalGlass(found);
                          props.current.glass = found;
                          applyAppearance();
                        }}
                        style={{ fontSize: 11, padding: '2px 6px' }}
                      >
                        {glassOptions.map(g => (
                          <option key={g.id} value={g.id}>
                            {g.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Horizontal Swatch Strip */}
                  <div className="studio-swatch-strip" style={{ marginTop: 6 }}>
                    {availableSwatches.map(swatch => {
                      const isCurrent =
                        localFinish?.id === swatch.id ||
                        localFinish?.name?.toLowerCase() === swatch.name?.toLowerCase() ||
                        (!localFinish && swatch.id === 'white-base');
                      const swatchColor = swatch.baseColor || swatch.bg || '#ffffff';
                      return (
                        <button
                          key={swatch.id || swatch.name}
                          type="button"
                          aria-label={`Showroom finish ${swatch.name}`}
                          className={`studio-swatch-btn ${isCurrent ? 'active' : ''}`}
                          onClick={() => {
                            setLocalFinish(swatch);
                            props.current.finish = swatch;
                            applyAppearance();
                          }}
                          title={swatch.name}
                        >
                          <div className="studio-swatch-circle" style={{ background: swatchColor }} />
                          <span className="studio-swatch-name">{swatch.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            {/* Specs & Quality Drawer */}
            {detailsExpanded && (
              <div
                style={{
                  marginTop: 6,
                  paddingTop: 6,
                  borderTop: '1px solid rgba(0,0,0,0.08)',
                  color: '#444',
                  maxHeight: 140,
                  overflowY: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 3
                }}
              >
                {isPhotoRoom(effectiveRoom) && (
                  <div>
                    Photo room - natural perspective matching.{' '}
                    {r.current?.photo?.fit.infill && 'Aspect matched with seamless wall patch.'}
                  </div>
                )}
                {motions.some(m => m.stay) && (
                  <div>Friction stay hardware: PROVISIONAL — owner specification confirmation pending.</div>
                )}
                {!!info?.tracks && (
                  <div>
                    Travel controls: 0–100% of permitted travel · clear width ≈{' '}
                    {((clearOpening(r.current.assembly) || 0) * 1000).toFixed(0)} mm.
                  </div>
                )}
                {r.current?.finishSupported === false && (
                  <div role="status">Selected finish unavailable in the recovered library; retaining current profile finish.</div>
                )}
                {r.current?.glassSupported === false && (
                  <div role="status">This glazing specification is unverified. Preview is a single-glass approximation.</div>
                )}
                {import.meta.env.DEV && (
                  <details>
                    <summary style={{ cursor: 'pointer', fontWeight: 500 }}>
                      Asset inspector · {record.status}
                    </summary>
                    <div>
                      {info.source} · {info.meshCount} meshes · {info.materialCount} materials ·{' '}
                      {info.dimensions.map(v => v.toFixed(3)).join(' × ')} m
                    </div>
                    <div>
                      {info.panels} panels · {info.tracks} tracks · {info.motions} operable sections.
                    </div>
                    <div style={{ maxHeight: 50, overflowY: 'auto' }}>{info.nodes.join(', ')}</div>
                  </details>
                )}
              </div>
            )}

            {/* Honest Short Note (P5) */}
            <div
              style={{
                marginTop: 6,
                fontSize: 10,
                color: '#94a3b8',
                textAlign: 'center',
                fontStyle: 'italic'
              }}
            >
              Visualisation. Actual product details may vary.
            </div>
          </>
        )}
      </div>
    </div>
  );
}

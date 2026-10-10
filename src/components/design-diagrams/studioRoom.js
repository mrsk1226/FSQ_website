import * as T from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const gltfLoader = new GLTFLoader();
const glbCache = new Map();
const textureCache = new Map();

function getTexture(path, rx = 1, ry = 1) {
  const key = `${path}:${rx}:${ry}`;
  if (!textureCache.has(key)) {
    const tex = new T.TextureLoader().load(path);
    tex.wrapS = T.RepeatWrapping;
    tex.wrapT = T.RepeatWrapping;
    tex.repeat.set(rx, ry);
    tex.colorSpace = T.SRGBColorSpace;
    textureCache.set(key, tex);
  }
  return textureCache.get(key);
}

const pbrMat = (params) => new T.MeshStandardMaterial(params);

function cube(g, name, x, y, z, w, h, d, mat) {
  const geom = new T.BoxGeometry(w, h, d);
  const m = new T.Mesh(geom, mat);
  m.position.set(x, y, z);
  m.name = name;
  m.receiveShadow = true;
  m.castShadow = true;
  g.add(m);
  return m;
}

export function buildInstallation(assembly, wallColor = '#ded6c8') {
  const group = new T.Group();
  group.name = 'Installation_Architecture';
  const { width: w, height: h, base: b } = assembly;

  const wallTex = getTexture('/textures/rooms/wall_plaster_warm.png', 4, 2);
  const wall = pbrMat({ color: wallColor, map: wallTex, roughness: 0.9, metalness: 0.0 });
  const trim = pbrMat({ color: 0xf4f0e6, roughness: 0.45, metalness: 0.02 });
  const wood = pbrMat({ color: 0x6e4b35, roughness: 0.48, metalness: 0.04 });

  const aperture = w - 0.012;
  const head = b + h - 0.006;
  const foot = b + 0.006;
  const span = 8;
  const ceiling = Math.max(3.4, b + h + 0.45);

  // Structural wall envelope
  cube(group, 'Wall_Left', -(span + aperture) / 4, ceiling / 2, 0.16, (span - aperture) / 2, ceiling, 0.34, wall);
  cube(group, 'Wall_Right', (span + aperture) / 4, ceiling / 2, 0.16, (span - aperture) / 2, ceiling, 0.34, wall);
  cube(group, 'Wall_Head', 0, (ceiling + head) / 2, 0.16, aperture, ceiling - head, 0.34, wall);
  if (foot > 0.03) {
    cube(group, 'Wall_Below', 0, foot / 2, 0.16, aperture, foot, 0.34, wall);
  }

  // Refined architectural reveals and sill
  for (const x of [-aperture / 2, aperture / 2]) {
    cube(group, 'Reveal_Jamb', x, b + h / 2, 0.06, 0.022, h, 0.42, trim);
  }
  cube(group, 'Reveal_Head', 0, head, 0.06, w, 0.022, 0.42, trim);
  cube(group, 'Sill', 0, b - 0.006, 0.16, w + 0.12, 0.036, 0.52, wood);

  return group;
}

const roomModelMap = {
  'ooty-bay': 'room_bay_seating',
  'bay-seating': 'room_bay_seating',
  'hillside-living': 'room_hillside_living',
  'modern-bedroom': 'room_modern_bedroom',
  'city-bedroom': 'room_modern_bedroom',
  'luxury-living': 'room_luxury_living',
  'apartment-living': 'room_apartment_living',
  'home-office': 'room_home_office',
  'garden-living': 'room_garden_living'
};

export function buildRoom(assembly, preset = 'hillside-living', wallColor = '#ded6c8', onLoaded = null) {
  const group = new T.Group();
  group.name = 'Stationary_Architecture';
  const { width: w, height: h, base: b } = assembly;
  const ceiling = Math.max(3.4, b + h + 0.45);

  // 1. Installation envelope
  group.add(buildInstallation(assembly, wallColor));

  // 2. Room floor with PBR texture
  const isStone = preset === 'luxury-living' || preset === 'garden-living';
  const isHerringbone = preset === 'home-office';
  const floorPath = isStone
    ? '/textures/rooms/floor_marble_stone.png'
    : isHerringbone
    ? '/textures/rooms/floor_dark_herringbone.png'
    : '/textures/rooms/floor_oak_parquet.png';

  const floorTex = getTexture(floorPath, isStone ? 4 : 6, isStone ? 4 : 6);
  const floorMat = pbrMat({
    map: floorTex,
    roughness: isStone ? 0.32 : 0.48,
    metalness: isStone ? 0.08 : 0.02
  });
  cube(group, 'Floor', 0, -0.05, 3.9, 8, 0.1, 8, floorMat);

  // 3. Ceiling with architectural plaster
  const ceilingMat = pbrMat({ color: 0xf7f5f0, roughness: 0.95 });
  cube(group, 'Ceiling', 0, ceiling + 0.025, 3.9, 8, 0.05, 8, ceilingMat);

  // 4. Side Walls & Skirting
  const wallTex = getTexture('/textures/rooms/wall_plaster_warm.png', 4, 2);
  const wallMat = pbrMat({ color: wallColor, map: wallTex, roughness: 0.92 });
  cube(group, 'Room_Left', -4, ceiling / 2, 3.9, 0.1, ceiling, 8, wallMat);
  cube(group, 'Room_Right', 4, ceiling / 2, 3.9, 0.1, ceiling, 8, wallMat);

  const skirtingMat = pbrMat({ color: 0xf4f0e6, roughness: 0.42 });
  for (const x of [-3.94, 3.94]) {
    cube(group, 'Skirting', x, 0.075, 3.9, 0.025, 0.15, 8, skirtingMat);
  }

  // 5. High-grade woven rug
  const rugTex = getTexture('/textures/rooms/rug_wool_weave.png', 3, 2);
  const rugMat = pbrMat({ map: rugTex, roughness: 0.96 });
  const rugMesh = cube(group, 'Rug', -0.5, 0.006, 1.8, 3.4, 0.012, 2.5, rugMat);

  // 6. Warm interior architectural downlights
  const spot1 = new T.SpotLight(0xfff2e0, 2.4, 7, Math.PI / 4, 0.5);
  spot1.position.set(0, ceiling - 0.1, 1.8);
  spot1.target.position.set(0, 0, 1.8);
  spot1.castShadow = true;
  group.add(spot1);
  group.add(spot1.target);

  const spot2 = new T.SpotLight(0xffedd2, 1.8, 7, Math.PI / 4, 0.5);
  spot2.position.set(-1.8, ceiling - 0.1, 2.2);
  spot2.target.position.set(-1.8, 0, 2.2);
  spot2.castShadow = true;
  group.add(spot2);
  group.add(spot2.target);

  const ambientWarm = new T.PointLight(0xffe8c8, 1.2, 4.5);
  ambientWarm.position.set(1.6, 1.5, 1.6);
  group.add(ambientWarm);

  // 7. Real furniture & decor GLB model (lazy loaded)
  const modelName = roomModelMap[preset] || 'room_hillside_living';
  const glbUrl = `/models/rooms/${modelName}.glb`;

  const furnitureContainer = new T.Group();
  furnitureContainer.name = `Furniture_${modelName}`;
  group.add(furnitureContainer);

  const attachFurniture = (gltfScene) => {
    const clone = gltfScene.clone(true);
    clone.traverse((n) => {
      if (n.isMesh) {
        n.castShadow = true;
        n.receiveShadow = true;
      }
    });
    furnitureContainer.add(clone);
  };

  if (glbCache.has(glbUrl)) {
    attachFurniture(glbCache.get(glbUrl));
  } else {
    gltfLoader.load(
      glbUrl,
      (gltf) => {
        glbCache.set(glbUrl, gltf.scene);
        attachFurniture(gltf.scene);
        if (typeof onLoaded === 'function') {
          onLoaded();
        }
      },
      undefined,
      (err) => {
        console.warn(`[studioRoom] Failed to load room asset ${glbUrl}:`, err);
      }
    );
  }

  return group;
}

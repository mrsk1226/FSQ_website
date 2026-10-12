const fs = require('fs');
const checkpointPath = 'D:/Blender_UPVC/07_Web_3D_Studio/06_QA_Reports/CHECKPOINT.md';

const entry = `

---

## [2026-10-12] PROMPT 5 - Performance profiling, optimizations, dev-only Design Explorer, and mobile 390x844 QA (PARTIAL_3D / BLOCKED_BY_UNVERIFIED_SPEC)

1. **Pre-flight & Catalogue Alignment:**
   - Manifest/catalogue status parity: all 81 designs match audit results exactly (50 uPVC & concepts = PARTIAL_3D, 31 aluminium = BLOCKED_BY_UNVERIFIED_SPEC). Zero unsupported "verified" labels present. Design IDs intact.
   - Grep verification: "PAUSED_FOR_IMAGE_REVIEW" is 100% absent from scripts/studio-catalogue-audit.cjs.

2. **Task 1 - Dev-Only Studio Design Explorer:**
   - Component upgraded: \`src/components/design-diagrams/StudioDesignExplorer.jsx\` wrapped in \`import.meta.env.DEV\` guard at callsite and component root; completely stripped from production build.
   - Features: Search by ID/name, status filter (ALL / PARTIAL_3D / BLOCKED_BY_UNVERIFIED_SPEC), family filter (9 families), deep-link by design ID (\`?design=<id>\`), 2D technical elevation diagram (WindowDiagram / DoorDiagram), 3D showroom preview button, operable sash breakdown, hardware specifications, and QA notes across all 78 + 3 designs.
   - Privacy guarantee: Zero local Windows paths or internal diagnostics exposed in public UI.

3. **Task 2 & 3 - Measured Performance Metrics (3 Designs x 3 Photo Rooms):**
   - **Environment:** Headless Chromium with SwiftShader software GL rasterizer (\`Google SwiftShader / ANGLE (Google, Vulkan 1.3.0 (SwiftShader Device (Subzero)))\`). Software rasterization reported honestly; real GPU FPS must be read on hardware.
   - **How to read real GPU FPS:** Open Chrome on hardware, navigate to \`http://127.0.0.1:5173/?perf=1\`, and view the real-time HUD in the top-right corner displaying live FPS, frame ms, draw calls, triangles, and active GPU string.

| Design ID | Family & Type | Photo Room | Draw Calls | Triangles | Geometries | Textures | Load Time (ms) | SwiftShader FPS |
|---|---|---|---|---|---|---|---|---|
| upvc-casement:2 | Single Casement (procedural) | bedroom | 114 | 3,796 | 44 | 7 | 6,163 ms | 20.0 FPS |
| upvc-casement:2 | Single Casement (procedural) | living | 114 | 3,796 | 44 | 8 | 5,374 ms | 60.0 FPS |
| upvc-casement:2 | Single Casement (procedural) | garden-sitting | 114 | 3,796 | 44 | 9 | 2,983 ms | 57.6 FPS |
| upvc-casement:4 | Double Casement (recovered GLB) | bedroom | 291 | 19,244 | 101 | 9 | 1,420 ms | 60.0 FPS |
| upvc-casement:4 | Double Casement (recovered GLB) | living | 291 | 19,244 | 101 | 9 | 754 ms | 60.0 FPS |
| upvc-casement:4 | Double Casement (recovered GLB) | garden-sitting | 291 | 19,244 | 101 | 9 | 740 ms | 60.0 FPS |
| upvc-sliding:3 | 4-Panel Sliding (Touch Lock) | bedroom | 258 | 12,884 | 93 | 9 | 1,727 ms | 60.0 FPS |
| upvc-sliding:3 | 4-Panel Sliding (Touch Lock) | living | 258 | 12,884 | 93 | 9 | 836 ms | 60.0 FPS |
| upvc-sliding:3 | 4-Panel Sliding (Touch Lock) | garden-sitting | 258 | 12,884 | 93 | 9 | 791 ms | 60.0 FPS |

   - **Asset File Sizes on Disk:**
     - GLB: \`FSQ_UPVC_Casement_2Open_Material_v04_Web_r01.glb\` = 338,976 bytes (331.0 KB)
     - GLB: \`FSQ_TouchLock_Visual_Recovery_v02.glb\` = 208,940 bytes (204.0 KB)
     - GLB: \`FSQ_TouchLock_Visual_Reference_v01.glb\` = 17,104 bytes (16.7 KB)
     - Photo Room Texture: \`bedroom.webp\` = 142,088 bytes (138.8 KB)
     - Photo Room Texture: \`living.webp\` = 144,386 bytes (141.0 KB)
     - Photo Room Texture: \`garden-sitting.webp\` = 230,096 bytes (224.7 KB)
   - **Renderer Re-creations:** Exactly 0 re-creations across all 9 design/room transitions (single Three.js WebGLRenderer instance maintained on mount).
   - **Finish Change Isolation:** React re-renders delta = +2 to +4 renders; room texture reload = FALSE (0 network re-fetches, room plane preserved).
   - **Sash Operation Rebuild:** Mesh counts (36, 96, 81) and geometry counts (44, 101, 93) remain 100% constant during operation; scene rebuilt = FALSE (pure RAF transform updates).

4. **Task 4 - Mobile 390x844 Validation & Screenshots:**
   - Tested viewport 390 x 844 (deviceScaleFactor: 2, touch-enabled).
   - Touch drag separation: \`pointerdown\` on operable sash stops propagation and disables OrbitControls (\`controls.enabled = false; cameraMovedDist = 0; targetMovedDist = 0\`). Touch drag operates sash without orbiting camera.
   - Layout reachability: Zero horizontal overflow (\`scrollWidth = 390\`). Top buttons and bottom slider panel fit within viewport bounds.
   - Captured and viewed 3 screenshots:
     - \`mobile-casement-bedroom.png\`: Single casement in bedroom, natural room scale active, 0 blue leak.
     - \`mobile-double-casement-living.png\`: Recovered double casement in living room, dual sash sliders accessible.
     - \`mobile-sliding-garden.png\`: 3-track sliding window in garden sitting room, clear garden view through open sash.
   - **Observed Defect:** Subtle tone boundary difference between the plaster patch mesh and ambient lighting gradient of the original room photographs.

5. **Task 5 - Production Build:**
   - \`npm run build\` passed in 16.84s (0 errors).
   - Bundle sizes:
     - \`dist/index.html\`: 1.14 kB (gzip: 0.61 kB)
     - \`dist/assets/Recovery3DStudio-CTw6uH8u.css\`: 1.33 kB (gzip: 0.53 kB)
     - \`dist/assets/index-kdJ5o5NH.css\`: 37.43 kB (gzip: 7.36 kB)
     - \`dist/assets/index-CqayD3dw.js\`: 702.13 kB (gzip: 192.00 kB)
     - \`dist/assets/Recovery3DStudio-CCafqUVP.js\`: 735.33 kB (gzip: 193.80 kB)
   - StudioDesignExplorer verified 100% tree-shaken and excluded from production bundle.
`;

fs.appendFileSync(checkpointPath, entry, 'utf8');
console.log('Successfully appended Prompt 5 entry to CHECKPOINT.md!');

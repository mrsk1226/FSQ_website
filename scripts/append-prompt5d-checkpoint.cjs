const fs = require('fs');
const file = 'D:/Blender_UPVC/07_Web_3D_Studio/06_QA_Reports/CHECKPOINT.md';

const appendText = `

---

## 2026-10-12 — PROMPT 5D: Door and Wide-Opening Photo Rooms

### Status: BROWSER_TESTED / VERIFIED_SHARED_MODULAR_3D
- **Scope**: Integration of owner-supplied photographic room backgrounds for full-height doors (\`door-living.png\` -> \`photo-door-living\`) and wide multi-panel openings (\`wide-living.png\` -> \`photo-wide-living\`).
- **Files Modified**:
  - \`public/textures/rooms-real/door-living.webp\` (converted from owner asset)
  - \`public/textures/rooms-real/wide-living.webp\` (converted from owner asset)
  - \`public/textures/rooms-real/rooms.json\` (version 2: added \`photo-door-living\` and \`photo-wide-living\` with real-world dimensions and green aperture rects)
  - \`src/components/design-diagrams/studioPhotoRoom.js\` (door floor anchoring, true scale, horizontal wall plaster sampling shader, outer frame overlap, window-focus framing for doors at 65% height, room routing validation)
  - \`src/components/design-diagrams/WindowExperienceConfigurator.jsx\` (strict category-based room routing and filtered room selector dropdown)
  - \`src/components/design-diagrams/Recovery3DStudio.jsx\` (overlay room selector filtering and synchronized category presets)

### Key Implementations & Root Cause Fixes
1. **Photo Room Ingestion & Detection**:
   - Processed \`door-living.png\` into WebP (\`photo-door-living\`), aperture: \`[350, 0, 774, 574]\` on 1024x576 image, assumed opening: 2.1 m wide x 2.2 m tall, reaching floor line at bottom.
   - Processed \`wide-living.png\` into WebP (\`photo-wide-living\`), aperture: \`[142, 63, 881, 483]\` on 1024x576 image, assumed opening: 3.6 m wide x 2.2 m tall.
2. **Product-to-Room Routing & Constraint Enforcement**:
   - Casement doors (\`door-casement\`) and sliding doors (\`door-sliding\`) default to \`photo-door-living\`.
   - Slide & fold doors (\`door-fold\`) and bay/bow concepts (\`bay-concepts\`) default to \`photo-wide-living\`.
   - Windows (\`casement\`, \`sliding\`, \`tilt-turn\`, \`fixed\`, \`combination\`, \`villa\`, \`arch\`) retain window photo rooms (\`photo-living\`, \`photo-bedroom\`, \`photo-garden-sitting\`).
   - Implemented \`getCompatibleRoomPreset(targetRoom, typeOrCategory)\`: guarantees a window is never placed in a door room, and a door is never placed in a window room. Incompatible rooms are filtered out from the room selector UI.
3. **Door Floor Anchoring & Plaster Patch Shader**:
   - **Floor Level Threshold**: Door bottom is pinned directly to the aperture floor coordinate (\`openBottomY\`), ensuring threshold rests naturally on the floor tiles.
   - **Green Sample Elimination**: For door rooms, the opening extends to the bottom of the photo. Added \`uniform float isDoorRoom\` in \`patchFragment\`. Door rooms sample horizontal plaster exclusively from side reveals (\`mix(cL, cR, tx)\`) instead of bottom aperture pixels, preventing any green chroma bleed into the wall patch.
   - **Outer Frame Overlap**: Frame bottom sill overlaps the plaster patch (\`winLoY = openBottomY + overlap\`), preventing outdoor gaps below the threshold.
   - **Window-Focus Framing**: Adjusted default camera framing for doors so door fills ~65% of the visible canvas height.

### Automated Verification Results
- \`node scripts/studio-geometry-check.mjs\`: 80 procedural designs tested across 21 poses — **0 collisions, 0 failures**.
- \`node scripts/studio-photo-room-contract.cjs\`: **7 checks passed, 0 errors, single request per texture verified**.
- \`node scripts/studio-browser-mechanics.cjs\`: **8 tests passed, 0 errors, 5 friction stay kinematics checked across 21 poses, 0 collisions**.
- \`node scripts/test-prompt5d.cjs\`: **12/12 end-to-end tests passed**:
  1. Single Casement Door closed in \`photo-door-living\` with 0 collisions.
  2. Single Casement Door open via canvas click (target: 1, current > 0.8).
  3. Double French Door closed with 0 collisions.
  4. Double French Door both sashes open (motions > 0.9).
  5. 2-Track Sliding Door closed in \`photo-door-living\` with 0 collisions.
  6. 2-Track Sliding Door half open (motion: 0.5) along track with 0 collisions.
  7. 3-Panel Slide & Fold door closed in \`photo-wide-living\` with 0 collisions.
  8. 3-Panel Slide & Fold door folded (motion: 1) along guide rails.
  9. 3-Panel Bay Window in \`photo-wide-living\` with 0 collisions.
  10. Curved / Bow 5-Panel Window in \`photo-wide-living\` with 0 collisions.
  11. Live colour change to Mahogany laminate without room reload, preserving camera and background.
  12. Room selector dropdown strict filtering verified for both door and window product families.
- \`npm run build\`: **Exit code 0** (17.57s production build).

### Screenshots Captured & Inspected (\`D:\\Blender_UPVC\\07_Web_3D_Studio\\06_QA_Reports\\Prompt_5D\\\`)
- \`01_casement_single_closed.png\`: Single casement door closed in \`photo-door-living\`; threshold resting on floor; seamless plaster patch on wide sides.
- \`02_casement_single_open.png\`: Single door sash swung open into room via canvas click; outdoor background visible through opening; handle rotated.
- \`03_casement_double_closed.png\`: Double French door closed; both handles aligned; threshold at floor level; 0 collisions.
- \`04_casement_double_open.png\`: Double French door with both sashes wide open into room.
- \`05_sliding_door_closed.png\`: 2-Track 2-Panel sliding door closed in \`photo-door-living\`; flush central interlock.
- \`06_sliding_door_half_open.png\`: Sliding door at 50% travel; clear opening view to landscape without mesh overlap.
- \`07_fold_door_closed.png\`: 3-panel slide & fold door closed in \`photo-wide-living\`; true scale fit in 3.6m wide aperture.
- \`08_fold_door_folded.png\`: Slide & fold panels folded open to the left along top/bottom tracks.
- \`09_bay_3panel.png\`: 3-panel angled bay concept in \`photo-wide-living\`; angled facets protruding into room.
- \`10_bow_style.png\`: Curved 5-panel bow window spanning the 3.6m wide aperture.
- \`11_colour_change_mahogany.png\`: Live Mahogany laminate woodgrain applied to double French door; zero room reload.

### Honest Defects & Observations
1. **Control Panel Overlap on Floor Threshold**: The bottom floating control panel overlays the bottom ~15% of the canvas in default Window Focus framing; users can collapse controls via 'Hide Controls' or toggle 'Full Room' to view the entire floor tile expanse.
2. **Plaster Patch Tone Matching**: For wide door openings with substantial leftover area, the side-sampled plaster patch has a very subtle linear gradient across the top reveal where the original room lighting has a slight shadow falloff.
3. **Fixed Photo Room Parallax**: The photographic room backplate is a 2D plane calibrated for the primary room view angle; free 3D rotation in '3D Angle' mode is restricted to a small arc (±3°) to prevent parallax separation between the 2D background and the 3D door frame.
`;

fs.appendFileSync(file, appendText, 'utf8');
console.log('Appended Prompt 5D section to CHECKPOINT.md successfully.');

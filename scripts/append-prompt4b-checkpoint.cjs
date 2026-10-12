const fs = require('fs');

const checkpointPath = 'D:/Blender_UPVC/07_Web_3D_Studio/06_QA_Reports/CHECKPOINT.md';

const entry = `

---

## [2026-10-12] PROMPT 4B - Catalogue audit completion & photo perimeter leak fix (PARTIAL_3D / BLOCKED_BY_UNVERIFIED_SPEC)

1. **Catalogue Audit & Status Alignment:**
   - Audit state verified: all 81 designs passed unattended in \`scripts/studio-catalogue-audit.cjs\` (removed \`PAUSED_FOR_IMAGE_REVIEW\`).
   - Manifest/registry statuses aligned: 50 uPVC & concept designs assigned \`PARTIAL_3D\`; 31 aluminium designs assigned \`BLOCKED_BY_UNVERIFIED_SPEC\` (generic slim 42mm profiles used for browser QA, blocked pending approved Uniframe extrusion drawings).
   - Removed any unsupported blanket "verified" claims; design IDs preserved exactly.
   - Per-family pass/fail matrix written: \`06_QA_Reports/Complete_Studio_Recovery/catalogue-audit/family-matrix.json\` and \`family-matrix.md\` covering all 9 families (all 81 designs passed; zero collisions across 21 controller poses per operable panel).

2. **Photo Perimeter Leak Fix:**
   - **Root Cause Identified**: Perspective parallax discrepancy between the plaster patch plane (\`z = 0.1205\`) and the window outer frame (\`z = -0.080\` to \`-0.030\`) viewed from camera at \`(0, 0, 6.0)\`. Because the opening is elevated (\`cy ≈ +0.96m\`), perspective foreshortening shifted the unprojected patch hole down and made it 20–52mm larger than the window frame behind it. Coupled with zero architectural reveal overlap and keyed wall transparency, the distant outdoor sky plane (\`z = -28\`) leaked through as a blue strip along the top and sides.
   - **Implementation**:
     - Applied camera perspective projection to patch hole: \`projScale = (6.0 - zPatch) / (6.0 - zFront)\` with center \`(cx_patch, cy_patch)\` and dimensions \`(w_patch, h_patch)\`.
     - Added 18mm architectural reveal overlap onto outer frame profile (\`holeW = w_patch - 2 * 0.018\`, \`holeH = h_patch - 2 * 0.018\`), guaranteeing solid plaster overlaps the frame with zero gap.
     - Synchronized matte discard hole and background wall tint to window aperture, eliminating background sky exposure behind plaster.
     - Plaster patch is now unconditionally generated in photo room mode to cleanly frame every assembly and mask chroma fringes.

3. **Size in Room / Natural Room Scale:**
   - Added \`naturalScale\` option (default ON) in \`studioPhotoRoom.js\` and \`Recovery3DStudio.jsx\` with UI checkbox toggle.
   - If a design is substantially smaller than the wide photographic aperture, the photo plane scales (\`roomScale = min(1.0, max(0.42, fitRatio * 1.22))\`) while the window strictly retains its 1:1 real-world physical scale (\`fw, fh\`). Camera FOV automatically recalculates so the room photo fills the viewport edge-to-edge without letterboxing.

4. **Friction Stay Clearance Fix:**
   - In \`studioFrictionStay.js\`, bounded jamb-stay sash standoff \`padDepth = Math.min(.012, Math.max(.004, z - front))\` to realistic bracket thickness (12mm max). This eliminates an oversized 94mm standoff on recovered double casements and provides 34mm clearance against fallback \`Reveal_Jamb\` at 70° max opening.

5. **Test Regressions (All Clean / Zero Collisions):**
   - \`node scripts/studio-geometry-check.mjs\`: 80/80 passed, 0 failures, 0 collisions.
   - \`node scripts/studio-photo-room-contract.cjs\`: 7/7 checks passed, 0 errors, single request per texture confirmed.
   - \`node scripts/studio-browser-mechanics.cjs\`: 8/8 mechanics checks passed, 5 stay cases across 21 poses passed, 0 errors, 0 collisions.
   - \`npm run build\`: Exit code 0 (14.07s).

6. **Viewed Screenshots & Evidence (9 Re-captured Images):**
   - Captured across Bedroom, Living Room, and Garden Sitting Room for single casement (\`upvc-casement:2\`), double casement (\`upvc-casement:4\`), and sliding (\`upvc-sliding:3\`):
     - \`D:/Blender_UPVC/07_Web_3D_Studio/06_QA_Reports/Complete_Studio_Recovery/photo-leak-qa/casement-photo-bedroom.png\`
     - \`D:/Blender_UPVC/07_Web_3D_Studio/06_QA_Reports/Complete_Studio_Recovery/photo-leak-qa/casement-photo-living.png\`
     - \`D:/Blender_UPVC/07_Web_3D_Studio/06_QA_Reports/Complete_Studio_Recovery/photo-leak-qa/casement-photo-garden-sitting.png\`
     - \`D:/Blender_UPVC/07_Web_3D_Studio/06_QA_Reports/Complete_Studio_Recovery/photo-leak-qa/double-casement-photo-bedroom.png\`
     - \`D:/Blender_UPVC/07_Web_3D_Studio/06_QA_Reports/Complete_Studio_Recovery/photo-leak-qa/double-casement-photo-living.png\`
     - \`D:/Blender_UPVC/07_Web_3D_Studio/06_QA_Reports/Complete_Studio_Recovery/photo-leak-qa/double-casement-photo-garden-sitting.png\`
     - \`D:/Blender_UPVC/07_Web_3D_Studio/06_QA_Reports/Complete_Studio_Recovery/photo-leak-qa/sliding-photo-bedroom.png\`
     - \`D:/Blender_UPVC/07_Web_3D_Studio/06_QA_Reports/Complete_Studio_Recovery/photo-leak-qa/sliding-photo-living.png\`
     - \`D:/Blender_UPVC/07_Web_3D_Studio/06_QA_Reports/Complete_Studio_Recovery/photo-leak-qa/sliding-photo-garden-sitting.png\`
   - **Perimeter Strip Verification**: In all 9 images, the thin blue exterior strip along the top/edges of the window frame is **completely gone**. The outer frame perimeter overlaps cleanly into the plaster reveal on all 4 sides.
   - **Honest Defects Observed**:
     - Faint rectangular boundary tone difference at the edge of the sampled plaster patch due to natural lighting gradient across the room wall in the photographs.
     - For narrow single casements (0.65m wide), a broad plaster patch area is required to span the bed/alcove opening.
`;

fs.appendFileSync(checkpointPath, entry, 'utf8');
console.log('Appended Prompt 4B entry to CHECKPOINT.md');

const fs = require('fs');

const checkpointPath = 'D:/Blender_UPVC/07_Web_3D_Studio/06_QA_Reports/CHECKPOINT.md';

const prompt3cContent = `

---

## [2026-10-12] PROMPT 3C — Photo-based Room Environments & Opening Integration (PROVISIONAL / BROWSER_TESTED)

Completed finish and polish of image-based photo rooms (Photo Bedroom, Photo Living Room, Photo Garden Sitting Room) in 3D Web Studio:

1. **Unattended Evidence Suite:**
   - Removed manual stdin pause (\`PAUSED_FOR_IMAGE_REVIEW\`) from \`scripts/studio-photo-room-evidence.cjs\`.
   - Script runs fully unattended across all 15 test targets (3 rooms × 5 configurations: casement 2 closed/open, casement 4 closed/open, sliding 3 closed).

2. **Opening Fit & Seamless Wall Patch (Owner Requirement):**
   - Windows kept at true 1:1 design scale and true proportions, centered in photo apertures (no artificial stretching).
   - In \`src/components/design-diagrams/studioPhotoRoom.js\`, generated \`Seamless_Sampled_Plaster_Patch\` surrounding the window when aperture exceeds window dimensions.
   - Fixed UV coordinate inversion between top-down image space and Three.js bottom-up texture V (\`vT = 1.0 - (minY - 35) / height\`, \`vB = 1.0 - (maxY + 40) / height\`), sampling true plaster pixels directly outside opening perimeter.
   - Bilinear corner interpolation + procedurally sampled plaster grain seamlessly matches wall color, illumination gradient, and plaster texture.
   - Feathered outer edge (\`smoothstep(0.0, 0.08, edgeDist)\`) covers original photo reveal/sill lines completely without seams or solid rectangles.
   - Believable reveal shadowing: feathered inner head/side shadows + contact sill shadow softly grounded at the frame boundary without corner ear lines.

3. **Color Matching & Photo-Room Tone Grading:**
   - In photo-room mode only, applied warm sky (\`0xffeedd\`) and warm floor (\`0xddccb5\`) hemispherical bounce, warm sunlight (\`0xfff3e2\`), and photo fill lighting in \`Recovery3DStudio.jsx\`.
   - Profile white appearance shifted from sterile cool blue-white to warm interior cream matching photographic ambient illumination.
   - Catalogue finishes (e.g. Mahogany woodgrain) and glass tints (e.g. tinted-grey) remain distinct and accurate.

4. **Sliding Window Track Outdoor Sliver Fix:**
   - Resolved bottom track outdoor view leakage on all sliding configurations (uPVC and aluminium, windows and doors) by adding continuous bottom track rails (\`role: 'hardware'\`), interior/exterior brush seals (\`role: 'gasket'\`), and bottom frame baffles in \`studioAssembly.js\`.
   - Re-verified \`scripts/studio-geometry-check.mjs\` (80 assemblies, 21 poses): 0 failures, 0 collisions.
   - Re-verified \`scripts/studio-browser-mechanics.cjs\`: 8 tests, 0 errors, 0 collisions.

5. **Control Overlay & Mobile Viewport:**
   - Minimized studio bottom bar height to compact ~48px strip with collapsible details toggle (\`detailsExpanded\`), leaving full room floor, rugs, furniture, and baseboards visible.
   - Verified on desktop (1440x1100) and mobile (390x844 viewport): full floor is unobstructed.

6. **Web Contracts & State Stability:**
   - Ran \`scripts/studio-photo-room-contract.cjs\`: 7/7 checks passed, 0 errors.
   - Verified that switching window design, finish, glass, or photo room does NOT re-fetch room textures (single WebP request each), does not reload the WebGL renderer, and preserves camera position (\`[0, 0, 6]\`).
   - Clear glass shows outdoor distant scenery; grey tinted glass darkens outside view without altering room interior.

7. **Visual Screenshot Inspection & Honest Defects:**
   - **Screenshots Viewed:**
     - \`D:/Blender_UPVC/07_Web_3D_Studio/06_QA_Reports/Complete_Studio_Recovery/photo-bedroom-casement-2-closed.png\`
     - \`D:/Blender_UPVC/07_Web_3D_Studio/06_QA_Reports/Complete_Studio_Recovery/photo-bedroom-casement-2-open.png\`
     - \`D:/Blender_UPVC/07_Web_3D_Studio/06_QA_Reports/Complete_Studio_Recovery/photo-bedroom-casement-4-closed.png\`
     - \`D:/Blender_UPVC/07_Web_3D_Studio/06_QA_Reports/Complete_Studio_Recovery/photo-bedroom-casement-4-open.png\`
     - \`D:/Blender_UPVC/07_Web_3D_Studio/06_QA_Reports/Complete_Studio_Recovery/photo-bedroom-sliding-3-closed.png\`
     - \`D:/Blender_UPVC/07_Web_3D_Studio/06_QA_Reports/Complete_Studio_Recovery/photo-living-casement-2-closed.png\`
     - \`D:/Blender_UPVC/07_Web_3D_Studio/06_QA_Reports/Complete_Studio_Recovery/photo-living-casement-2-open.png\`
     - \`D:/Blender_UPVC/07_Web_3D_Studio/06_QA_Reports/Complete_Studio_Recovery/photo-living-casement-4-closed.png\`
     - \`D:/Blender_UPVC/07_Web_3D_Studio/06_QA_Reports/Complete_Studio_Recovery/photo-living-casement-4-open.png\`
     - \`D:/Blender_UPVC/07_Web_3D_Studio/06_QA_Reports/Complete_Studio_Recovery/photo-living-sliding-3-closed.png\`
     - \`D:/Blender_UPVC/07_Web_3D_Studio/06_QA_Reports/Complete_Studio_Recovery/photo-garden-sitting-casement-2-closed.png\`
     - \`D:/Blender_UPVC/07_Web_3D_Studio/06_QA_Reports/Complete_Studio_Recovery/photo-garden-sitting-casement-2-open.png\`
     - \`D:/Blender_UPVC/07_Web_3D_Studio/06_QA_Reports/Complete_Studio_Recovery/photo-garden-sitting-casement-4-closed.png\`
     - \`D:/Blender_UPVC/07_Web_3D_Studio/06_QA_Reports/Complete_Studio_Recovery/photo-garden-sitting-casement-4-open.png\`
     - \`D:/Blender_UPVC/07_Web_3D_Studio/06_QA_Reports/Complete_Studio_Recovery/photo-garden-sitting-sliding-3-closed.png\`
     - \`D:/Blender_UPVC/07_Web_3D_Studio/06_QA_Reports/Complete_Studio_Recovery/photo-mobile-390x844.png\`
   - **Honest Defects Observed:**
     - Perspective Parallax: While 3-degree parallax rotation is bounded, the background photo is planar (2D). Extreme oblique camera angles reveal that the window sits planar against the photo wall rather than possessing deep 3D masonry jamb returns.
     - Glazing Reflections: Room environment reflects tea estate skybox rather than the interior room furnishings (bedroom bed, living couch) because photographic rooms lack 360-degree interior spherical HDR captures.
     - Contact Shadow Direction: Plaster patch reveal shadows assume a standardized diffuse overhead light, while specific photos (notably the garden sitting room with direct angled sunlight beams) exhibit strong directional sunbeams on the floor that do not cast dynamic angled cast shadows from the window jambs onto the side wall.
   - **Status:** BROWSER_TESTED (Automated test suite, contract validation, and visual capture complete; PROVISIONAL for owner visual sign-off).

8. **Build Verification:**
   - \`npm run build\`: Exit code 0 (21.35s, 0 errors).
`;

fs.appendFileSync(checkpointPath, prompt3cContent, 'utf8');
console.log('CHECKPOINT_APPENDED_PROMPT3C_SUCCESSFULLY');

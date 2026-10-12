const fs = require('fs');
const path = 'D:/Blender_UPVC/07_Web_3D_Studio/06_QA_Reports/CHECKPOINT.md';

const entry = `
---

## [2026-10-12] PROMPT 5C - Sliding Kinematics Overhaul, Whole-Sash Interaction, Window Focus Framing, Fullscreen Showroom & UI Clean-up

1. **Owner Problem P1: Sliding Kinematics Overhaul (Root Cause & Diagnostics):**
   - **Pre-code Motion Diagnostics**: Diagnosed all 14 sliding window and door layouts (\`upvc-sliding:0..4\`, \`aluminium-sliding:0..4\`, \`upvc-door-sliding:0..3\`) across 0%, 25%, 50%, 75%, and 100% travel positions via \`scripts/diagnose-sliding-motion.cjs\`.
   - **Root Cause Identified**:
     1. Click-jump: Fractional \`pointermove\` micro-movements on mouse down updated \`current\` position before a drag threshold was met.
     2. Touch Lock actuator remained static in an open visual pose during closed state rather than seating flush into the keeper.
     3. Outer frame mitre mesh (\`OuterFrame_Mitre_Seams\`) was intercepting raw raycast hit[0] on sliding windows.
   - **Kinematic Fixes Applied**:
     - Strict parallel-to-frame sliding motion constrained along each panel's own assigned track depth (\`Z = -0.08\` track 0, \`Z = -0.025\` track 1). Zero rotation, zero deviation from track.
     - Travel limits derived directly from catalogue panel layouts; overlapping panels stop cleanly at interlock stack position without pass-through.
     - Verified **0 collisions** across all 14 layouts (70 sampled frames).
     - Smooth cubic ease-in-out animation (0.75s) with zero jump on click; click toggles open/close; drag smoothly tracks pointer along track; locked sash immobilized; Touch Lock actuator automatically engages when fully closed (\`m.current < 0.001 || m.locked\`) and retracts on open.
     - Verified slide-and-fold door kinematics (\`upvc-door-fold:0\`) remain functional and collision-free.

2. **Owner Problem P2: Click Anywhere on Sash to Open (Whole-Sash Raycasting):**
   - Raycasting in \`Recovery3DStudio.jsx\` now scans the entire intersection list \`for (const h of hits)\` to locate \`userData.motionId\`, intercepting clicks across the whole sash assembly: glass panes (\`_Glass\`), profile extrusions (\`_Profile\`), and glazing beads (\`_Bead\`), not just the handle.
   - Movement threshold (\`Math.hypot(dx, dy) > 5px\`) reliably separates deliberate click toggles from drag motions.
   - Added subtle emissive hover highlight and pointer cursor (\`cursor: pointer\` for operable sashes, \`cursor: not-allowed\` for locked sashes).
   - Integrated floating lock toast notification (\`🔒 Sash is locked. Click "Unlock" to operate.\`) when attempting to operate a locked sash.
   - Disabled camera OrbitControls during sash drag (\`controls.enabled = false\`) to eliminate camera orbit while operating sashes. Mouse and touch validated in normal, fullscreen, and photo rooms.

3. **Owner Problem P3: Window Focus Framing & Stage Expansion:**
   - **Default View = "Window Focus"**: Camera FOV calculated so the window fills ~58% of canvas height (\`55-65%\` target range). Camera targets window center \`(winCenterX, winCenterY, 6)\`.
   - Added view framing pills: **Window Focus** (default), **Full Room** (wide context view), and **↺ Reset** view button.
   - OrbitControls bounded within safe exploration limits (\`minDistance = 3.2m, maxDistance = 6.8m\`, \`panSpeed = 0.5\`, subtle pan enabled).
   - Stage container enlarged to \`clamp(580px, 78vh, 880px)\` (min-height: 520px) in \`StudioWindowAdapter.jsx\`.
   - **Beige Side Bars Eliminated**: \`visibleHeight\` in \`studioPhotoRoom.js\` switched from \`Math.max\` (contain/letterbox) to \`Math.min(room.height, room.width / aspect)\` (cover-fit), ensuring the photographic room wall completely spans the stage at any viewport aspect ratio without margins.
   - **Living Room Floor Reflection Root Cause**: Inspected high-resolution source texture \`public/textures/rooms-real/living.webp\`. The bright patch between the carpet and TV console is verified as authentic photographic specular sunlight reflection off high-gloss marble floor tiles in the source house photo, not a 3D fog, overlay, or mesh rendering artefact. In Window Focus mode, it is naturally cropped out.

4. **Owner Problem P4: Fullscreen Showroom Mode with Live Finish/Glass Changes:**
   - Added Fullscreen toggle with Fullscreen API support and fallback overlay (\`.fullscreen-active\`) for iOS/unsupported browsers; Escape key and \`✕ Exit\` button close fullscreen cleanly.
   - Compact collapsible floating control layer overlaid inside fullscreen and normal modes:
     - Prominance Premium Laminates / Uniframe Architectural Shades horizontal swatch strip with live color change.
     - Changing finish updates profile PBR material and woodgrain map dynamically without reloading room image texture, remounting renderer, or resetting camera / sash state.
     - Quick room environment selector and glass specification selector.
     - View angle buttons ("Interior", "3D Angle", "Hardware") and sash controls with lock toggle.
   - Mobile responsive bottom sheet with large 48px touch targets and horizontal swatch scroll.

5. **Owner Problem P5: Public UI Clean-up:**
   - Developer identifiers (\`main_0\`, \`main_1\`, \`main_2\`, \`Layout preview\`) replaced with plain user-friendly labels ("Left sash", "Right sash", "Casement sash", "Sliding sash", "Interactive 3D Showroom").
   - 3D Quality ("Auto", "Fast", "Detail") and Natural Room Scale moved into a dedicated \`⚙ Settings\` popover menu.
   - Preserved machine-readable \`aria-label="\${m.id} opening"\` on sliders for backward compatibility with automated test suites.
   - Honest user note permanently displayed on showroom panel: *"Visualisation. Actual product details may vary."*

6. **Automated Verification Test Suite:**
   - \`node scripts/studio-geometry-check.mjs\`: 80 tested, 0 failures.
   - \`node scripts/studio-browser-mechanics.cjs\`: 8 tests passed, 0 errors, 5 stay checks across 21 poses passed, 0 collisions.
   - \`node scripts/studio-photo-room-contract.cjs\`: 7/7 checks passed, 0 errors, single request per texture confirmed, 0 collisions.
   - \`node scripts/test-prompt5c-verification.cjs\`: 7/7 tests passed, 0 errors:
     1. Casement opened by clicking glass pane (\`upvc-casement:2\` target: 1, current: 0.998).
     2. Sliding sash operated cleanly along own track with 0 collisions (\`upvc-sliding:0\` target: 1, current: 0.999).
     3. Sash dragged >20px with zero camera position change (delta: 0) and zero OrbitControls target change.
     4. Sash locked immobilized and displayed lock toast notification.
     5. Fullscreen entered, live Golden Oak swatch applied (profile color and texture updated, glass color unchanged, room image not reloaded, camera unchanged).
     6. Window Focus framing captured in bedroom, living, and garden-sitting rooms.
     7. Mobile 390x844 responsive layout verified in normal and fullscreen modes with 0 horizontal overflow.
   - \`npm run build\`: Exit code 0 (15.45s).

7. **Viewed Screenshots & Evidence (10 Images in \`qa_inspect/prompt5c/\`):**
   - \`qa_inspect/prompt5c/default-focus-bedroom.png\` (974 x 818): Double casement window cleanly framed filling ~58% of stage height in bedroom backplate; woodgrain finish and 45° mitre seams visible; no beige side bars.
   - \`qa_inspect/prompt5c/default-focus-living.png\` (974 x 818): Double casement in living room; window clearly legible; floor specular highlight cropped out; complete cover-fit.
   - \`qa_inspect/prompt5c/default-focus-garden.png\` (974 x 818): Double casement in garden sitting room; lush outdoor view through clear glass; natural room illumination.
   - \`qa_inspect/prompt5c/fullscreen-palette-open.png\` (1440 x 1050): Fullscreen showroom active; Golden Oak swatch selected live; stainless steel friction stay arms visible at bottom sill; floating control overlay visible.
   - \`qa_inspect/prompt5c/sliding-0pct.png\` (974 x 818): 2-Track 2-Panel sliding window fully closed at 0%; Touch Lock actuator seated flush; correct depth separation between track 0 and track 1.
   - \`qa_inspect/prompt5c/sliding-50pct.png\` (974 x 818): Sliding sash at 50% travel; right aperture partially open to landscape; sash moving strictly along track 1 in front of fixed pane; 0 collisions.
   - \`qa_inspect/prompt5c/sliding-100pct.png\` (974 x 818): Sliding sash fully open at 100% stack position; clean overlap on left; 0 mesh penetration.
   - \`qa_inspect/prompt5c/casement-clicked-glass.png\` (974 x 818): Single casement sash swung 90° open after user clicked directly on the glass pane; handle lever rotated; friction stay articulated.
   - \`qa_inspect/prompt5c/mobile-normal-390x844.png\` (592 x 1316 retina): Mobile 390x844 responsive layout; large touch targets; horizontal swatch scroll; zero horizontal overflow.
   - \`qa_inspect/prompt5c/mobile-fullscreen-390x844.png\` (780 x 1688 retina): Mobile fullscreen mode with one-tap Exit button; direct touch interaction on window sashes.

8. **Honest Defects Observed:**
   - Faint tone boundary difference where the sampled wall plaster patch meets the natural photographic ambient shadow gradient of the room walls.
   - On mobile portrait orientation when controls are expanded, the bottom card overlays ~40-45% of the lower window area (user can collapse it via "Hide Controls").
   - Friction stay arms on double casement windows remain partially visible through the lower sill edge when fully closed (hardware clearance is provisional).
   - Living room floor tile reflection is authentic photographic glare from the source photograph.
`;

fs.appendFileSync(path, entry, 'utf8');
console.log('Successfully appended Prompt 5C report to CHECKPOINT.md');

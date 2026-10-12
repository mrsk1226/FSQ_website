const fs = require('fs');
const filePath = 'D:/Blender_UPVC/07_Web_3D_Studio/06_QA_Reports/CHECKPOINT.md';

const textToAppend = `

---

## 2026-10-12 — PROMPT AL: Aluminium Accuracy from Uniframe Brochure

### Status: PARTIAL_3D
- **Scope**: Integration of genuine Uniframe aluminium brochure specifications (\`UNIFRAME Brochure.pdf\`, Pages 14–22 & 29) for all 31 aluminium catalogue configurations (26 casement + 5 sliding) and aluminium door systems.
- **Classification**: \`PARTIAL_3D\` (Note: "Dimensions from Uniframe brochure (Pages 14–22); exact extrusion cross-sections not supplied; simplified section with authentic sightlines, mitred corners, authentic hardware, and brochure finishes").
- **Files Modified**:
  - \`src/data/designs/aluminiumColours.js\` (rebuilt with exact 15 brochure swatch fan shades from Page 29: 5 Natural, 7 Solid, 3 Premium; purged uPVC wood laminates: Golden Oak, Mahogany, Black Cherry)
  - \`src/data/designs/windowSystems.js\` (updated aluminium finishes registry with categories 'Natural Timber', 'Solid Architectural', 'Premium Metallic', and hasGrain flag)
  - \`src/components/design-diagrams/AluminiumColoursSection.jsx\` (updated 4 filter tabs and sublimation display)
  - \`src/components/design-diagrams/studioAssembly.js\` (defined \`UNIFRAME_SYSTEMS\` with all 9 brochure systems, exact frameFace, sashFace, frameDepth, sashDepth, interlockFace, lock types; updated \`buildAssembly\` and \`resolveAluminiumSystem\`)
  - \`src/components/design-diagrams/studioTouchLock.js\` (added guard for missing TouchLock stub on sliding doors with multipoint lever handles)
  - \`src/components/design-diagrams/Recovery3DStudio.jsx\` (tuned PBR metalness/roughness for Natural sublimation, Solid architectural matte, and Premium metallic finishes; swatches bar integration)
  - \`src/data/designs/studioRegistry.js\` & \`src/data/designs/webStudioManifest.json\` (marked all 31 aluminium configurations as \`PARTIAL_3D\` with Uniframe brochure citation)
  - \`scripts/studio-catalogue-audit.cjs\` (updated photo room routing for door and bay designs, verified aluminium system attributes)

### Brochure Dimension & Specification Verification (UNIFRAME Brochure.pdf)
| System ID | Brochure System Name | Brochure PDF Page | Outer Frame Face (mm) | Sash Face (mm) | Frame Depth 2-Track/3-Track (mm) | Sash Depth (mm) | Interlock Stile (mm) | Hardware / Lock Type | Notes |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| \`graf-26-window\` | Graf 26 Sliding Window | 14 | 44.0 | 53.0 | 48.0 / 74.0 | 26.0 | 32.0 | Single Touch Lock | Standard interlock, slim window |
| \`graf-26-door\` | Graf 26 Sliding Door | 15 | 44.0 | 63.0 | 48.0 / 74.0 | 26.0 | 32.0 | Multipoint Lever | Heavy sash for patio doors |
| \`graf-32-window\` | Graf 32 Sliding Window | 16 | 44.0 | 55.0 | 83.5 / 131.0 | 32.0 | 20.0 (Slim) | Multipoint Concealed | 20mm slim interlock meeting stile |
| \`graf-32-door\` | Graf 32 Sliding Door | 17 | 44.0 | 65.0 | 83.5 / 131.0 | 32.0 | 20.0 (Slim) | Multipoint Lever | High wind load, grand openings |
| \`graf-45-door\` | Graf 45 Sliding Door | 18 | 25.0 (Ultra-Slim) | 85.0 | 132.0 / 195.0 | 45.0 | 20.0 (Slim) | Multipoint Concealed | Minimal 25mm visible outer perimeter |
| \`livio-minimal\` | Livio Minimal Casement Window | 19 | 54.0 | 52.0 (Slim) | 67.0 | 68.0 | N/A | Multipoint Concealed | Slim sash sightline, thermal break |
| \`robus-40-casement\` | Robus 40 Casement Window | 20 | 48.5 | 70.5 | 40.0 | 48.0 | N/A | Multipoint Concealed | Architectural standard casement |
| \`robus-40-door\` | Robus 40 Casement Door | 21 | 65.0 | 96.0 | 40.0 | 48.0 | N/A | Multipoint Lever | Heavy entrance/French door profile |
| \`robus-40-fold\` | Robus 40 Fold & Slide Door | 22 | 65.0 | 96.0 | 40.0 | 48.0 | N/A | Multipoint Concealed | Bi-fold top/bottom guide carriage |

### Catalogue Mapping Matrix (31 Aluminium Window Designs + Door Systems)
- **Aluminium Casement Windows (26 Designs, IDs 36–61)**:
  - Designs with minimal or slim notation map to \`livio-minimal\` (Frame 54mm / Sash 52mm).
  - All standard architectural casement window designs map to \`robus-40-casement\` (Frame 48.5mm / Sash 70.5mm).
- **Aluminium Sliding Windows (5 Designs, IDs 62–66)**:
  - 2-Track 2-Panel & 2-Track 2-Panel with Top Fixed map to \`graf-26-window\` (Frame 44mm / Sash 53mm / Interlock 32mm / Single lock).
  - 2-Track 3-Panel, 3-Track 3-Panel & 2-Track 4-Panel map to \`graf-32-window\` (Frame 44mm / Sash 55mm / Interlock 20mm slim / Multipoint lock).
- **Door Systems (Provisional Catalogue Mapping)**:
  - Casement doors (\`door-casement\`) map to \`robus-40-door\` (Frame 65mm / Sash 96mm / Multipoint).
  - Sliding doors (\`door-sliding\`) map to \`graf-32-door\` (Frame 44mm / Sash 65mm / Interlock 20mm) and panoramic to \`graf-45-door\` (Frame 25mm / Sash 85mm).
  - Slide & fold doors (\`door-fold\`) map to \`robus-40-fold\` (Frame 65mm / Sash 96mm / Guide rail).

### Finishes Verification (UNIFRAME Brochure Page 29 Swatch Fan)
- Replaced previous generic 18-shade list with authentic 15 shades directly sampled from swatch fan:
  - **Natural Timber Sublimation (5)**: \`Mystic Dark\` (#3a251e), \`Citrine\` (#783e20), \`Royal Chestnut\` (#5e341f), \`Rustic Charm\` (#b39282), \`Duke\` (#41241a). Treated with woodgrain PBR map and subtle sheen.
  - **Solid Architectural Powder Coat (7)**: \`Slate\` (#5c6477), \`Mocha\` (#8c6559), \`Urban Mist\` (#a4a9ad), \`Noir\` (#282b30), \`Frost\` (#dde4ec), \`Cedar\` (#4c4d47), \`Dew\` (#e3e8f0). Rendered with architectural matte finish (metalness: 0.75, roughness: 0.38).
  - **Premium Metallic (3)**: \`Urban Dusk\` (#5d5f47), \`Caramel\` (#ad7f63), \`Hazel\` (#9e9487). Rendered with metallic satin luster (metalness: 0.82, roughness: 0.28).
- Purged uPVC wood laminates (\`Golden Oak\`, \`Mahogany\`, \`Black Cherry\`) from aluminium data.

### Automated Test Suite Results
- \`node scripts/studio-geometry-check.mjs\`: **80/80 passed, 0 failures, 0 collisions across 21 poses**.
- \`node scripts/studio-browser-mechanics.cjs\`: **8/8 passed, 0 errors, 5 friction stay kinematics checked (including aluminium casement) across 21 poses, 0 collisions**.
- \`node scripts/studio-catalogue-audit.cjs\`: **Passed with 0 collisions and verified PARTIAL_3D profile sightlines**.
- \`npm run build\`: **Exit code 0** (built in 25.02s without errors).

### Visual Evidence & Slimness Inspection (\`D:\\FSQ_website\\qa_inspect\\prompt_al\\\` & \`06_QA_Reports\\Prompt_AL\\\`)
1. \`01_robus_40_casement_closed.png\`: Robus 40 Casement Window closed; authentic mitred 45° frame/sash corners; frame face 48.5mm, sash face 70.5mm; Slate finish.
2. \`01_robus_40_casement_open.png\`: Robus 40 sash open at 70°; friction stay articulated on sill; multipoint handle rotated 90° horizontally.
3. \`02_livio_minimal_closed.png\`: Livio Minimal Casement Window closed; visual slimness confirmed with 52mm slim sash face vs Robus 40's 70.5mm face.
4. \`02_livio_minimal_open.png\`: Livio Minimal sash swung open; slender frame profile matching brochure photo.
5. \`03_graf_26_window_closed.png\`: Graf 26 2-Track 2-Panel sliding window closed; standard 32mm interlock meeting stile.
6. \`03_graf_26_window_open.png\`: Graf 26 sliding sash glides open with single-action lock hardware; clear opening to garden.
7. \`04_graf_32_window_closed.png\`: Graf 32 3-Track 3-Panel sliding window closed; 20mm slim interlock meeting stile clearly visible compared to Graf 26's 32mm stile.
8. \`04_graf_32_window_open.png\`: Graf 32 left sliding sash slides over middle sash; stack alignment with 0 collision.
9. \`05_graf_32_door_closed.png\`: Graf 32 Sliding Door closed in \`photo-door-living\`; 65mm sash face, multipoint lock, 0 collisions.
10. \`05_graf_32_door_open.png\`: Graf 32 Sliding Door open; sliding panel glides behind fixed pane.
11. \`06_graf_45_door_closed.png\`: Graf 45 Sliding Door closed; 25mm ultra-slim perimeter outer frame matches panoramic minimal brochure aesthetic.
12. \`06_graf_45_door_open.png\`: Graf 45 Sliding Door open; expansive clear opening view.
13. \`07_robus_40_door_closed.png\`: Robus 40 Casement Door closed in \`photo-door-living\`; heavy-duty 65mm frame / 96mm sash stiles.
14. \`07_robus_40_door_open.png\`: Robus 40 Casement Door open; wide inward clearance.
15. \`08_robus_40_fold_closed.png\`: Robus 40 Slide & Fold door closed in \`photo-wide-living\`; 3-panel accordion configuration.
16. \`08_robus_40_fold_open.png\`: Robus 40 Slide & Fold door folded along top and bottom guide rails.
17. \`09_finish_natural_mystic_dark.png\`: Natural Timber Sublimation (\`Mystic Dark\`) applied to aluminium frame with woodgrain texture.
18. \`10_finish_solid_noir.png\`: Solid Architectural Powder Coat (\`Noir\`) with smooth architectural matte sheen.
19. \`11_finish_premium_caramel.png\`: Premium Metallic (\`Caramel\`) with metallic satin reflection.

### Honest Defects & Observations
1. **Extrusion Cross-Sections Simplified**: Profile sections are simplified rectangular solids with accurate outer sightlines and depths; internal multi-chamber cavities, thermal break polyamide strips, and screw-port details from brochure technical drawings are not modelled (marked \`simplified section\` / \`PARTIAL_3D\`).
2. **Sublimation Texture Resolution**: The woodgrain texture applied to the 5 Natural shades is mapped from an existing architectural woodgrain texture; manufacturer sublimation transfer films may exhibit unique grain patterns not captured in generic maps.
3. **Hardware Dimensions Provisional**: Multipoint lock levers and sliding rollers follow brochure reference silhouettes, but exact supplier CAD part geometries were not provided.
4. **Control Panel Overlap in Photo Room**: In default Window Focus framing, the bottom control card overlays ~15% of the lower frame/sill area; users can click 'Hide Controls' or 'Full Room' to view the entire window/door.
`;

fs.appendFileSync(filePath, textToAppend, 'utf8');
console.log('Successfully appended Prompt AL to CHECKPOINT.md');

# FSQ Website — Complete Project Memory & AI Handoff

**As of:** 10 October 2026  
**Project:** FSQ Website + Blender uPVC / Aluminium 3D Studio  
**Status:** Active implementation (Antigravity + Gemini 3.8 Flash since 10 Oct 2026). M0–M3 reported done by agent; owner REJECTED the M2 room realism and reported 3 open defects (mitred corners, friction stay, real-house look). Manufacturing verification outstanding.  
**Scope note:** Consolidated from available conversation history and reported Codex logs. This document is **not** a fresh filesystem, repository, Blender, or browser audit. Any claim not independently checked is labeled as reported.

## 1. Mandatory instructions for the next AI agent

1. Continue the existing work. **Do not rebuild, reset, or recreate completed modules.**
2. First inspect current repository, recovery assets, QA reports, and git status before modifying anything.
3. Preserve all approved Blender masters, previous validated recovery files, and backups. New revisions must have new versioned names.
4. Do **not** push to GitHub or deploy to Vercel without explicit owner authorization.
5. Do not confuse visual plausibility, browser layout passes, or provisional geometry with engineering/manufacturing approval.
6. Mark missing manufacturer-dependent details as `BLOCKED_BY_UNVERIFIED_SPEC` or clearly `PROVISIONAL` as appropriate.
7. Do not let unavailable technical documents block unrelated visual implementation and browser testing.
8. Keep application UI labels, code, reports, filenames, and formal deliverables in English. Explain progress conversationally in Tamil script.
9. Provide full ready-to-use files when the owner requests code changes; avoid fragmentary patches in user-facing delivery.
10. Avoid repeatedly asking for reference folders that were already searched; report specific missing documents instead.

## 2. Local project locations

| Purpose | Path |
|---|---|
| Website root | `D:\FSQ_website` |
| Blender work root | `D:\Blender_UPVC` |
| Reference search | `D:\FSQ_website\reference` |
| Design reference search | `D:\FSQ_website\design-references` |
| Website documentation | `D:\FSQ_website\docs` |
| Design data | `D:\FSQ_website\src\data\designs` |
| Blender reference drawings | `D:\Blender_UPVC\01_Reference_Drawings` |
| Blender tools | `D:\Blender_UPVC\06_Blender_Tools` |
| Studio working recovery | `D:\Blender_UPVC\07_Web_3D_Studio\01_Blender_Working\Studio_Recovery` |
| Studio QA / complete recovery | `D:\Blender_UPVC\07_Web_3D_Studio\06_QA_Reports\Complete_Studio_Recovery` |

These are Windows-local paths and cannot be read from a separate cloud environment without an attached copy or local agent.

## 3. Handoff precedence

When available, inspect the original handoff package in this order:

1. `START-HERE-OTHER-AI.md`
2. `00-AI-MEMORY-CURRENT.md`
3. Current live repository and actual file contents
4. Latest human-verified browser / Blender QA evidence
5. Latest recovery and deployment notes
6. Earlier planning documents and conversation summaries

Resolve disagreements by current verified files and newer owner instructions. Do not treat this memory as proof of the current filesystem state.

## 4. Project objective

Build the existing FSQ website's premium, realistic interactive architectural window-and-door 3D visualization system for **uPVC and Aluminium**. Each design should have its own correct sash layout and motion; realistic frames, glazing, hardware, materials, finishes, room/installation context; independent glass and frame finish controls; and reliable browser interaction. The target is a useful presentation and configuration experience, not a falsely certified fabrication model.

### Required product/design families

- uPVC casement windows and doors
- Aluminium casement windows and doors
- Sliding windows and sliding doors
- Tilt & Turn windows
- Slide & Fold / folding doors
- Bay and Bow window concepts
- Other catalogue-specific variations in the current design inventory

Both uPVC and Aluminium coverage must be verified rather than inferred from generic category names.

## 5. Latest reported progress (Codex output supplied by owner)

**Important:** These are statements from the prior Codex run, not independent checks by this handoff author.

| Work item | Reported result | Qualification |
|---|---|---|
| Recursive technical reference inventory | Executed across five requested roots | Inventory file generated; exact full contents not available here |
| Prominance brochure | Dimensioned Optima and Inventa sections located | Mapping to individual catalogue designs remains unresolved |
| Touch Lock owner photograph / Blender reference | Located | Not proof of production dimensions |
| Touch Lock GLB integration | Integrated into sliding visualization | Initial Vite public asset cache issue fixed after server restart |
| Five uPVC sliding layouts | Browser checks passed | Provisional hardware geometry |
| Tilt & Turn and casement layouts | Layout/endpoint checks passed for tested layouts | Full engineering clearance not proven |
| All 78 catalogue layouts | Browser layout, motion-count, stationary-frame checks reported passed | Still classified `PARTIAL_3D` |
| Three separate Bay/Bow concepts | Same browser checks reported passed | Still classified `PARTIAL_3D` |
| Sliding intermediate poses | Profile checks passed | Not manufacturing validation |
| Canvas casement handle | Clicking handle opened only left sash in reported test | Need repeatable QA evidence for all mechanisms |
| Browser interaction test | Reported no page errors across sliding, Tilt & Turn, folding, bay selections | Not equivalent to complete visual acceptance |
| Performance test | SwiftShader measurement occurred alongside another browser test | Cannot extrapolate to actual desktop/mobile GPU |
| Touch Lock close-up | Broken/faceted faceplate defect identified | Repair and retest pending at last observation |
| Final command observed | `node scripts/studio-browser-mechanics.cjs` | Exit status/result not present in available log |

**Latest known active task:** Create a **new recovery copy** of Touch Lock geometry, rebuild the defective faceplate using the owner's photo and documented provisional dimensions, preserve original assets, export/reintegrate as needed, and rerun targeted close-up and browser mechanics tests. Do not claim the repair completed without seeing output.

## 5A. Antigravity run results — M0 to M3 (agent-reported, owner-supplied log, 10 Oct 2026)

Tool/model: Antigravity, Gemini 3.8 Flash (Medium). Checkpoint file: `D:\Blender_UPVC\07_Web_3D_Studio\06_QA_Reports\CHECKPOINT.md` (append only). QA screenshots: `...\06_QA_Reports\Complete_Studio_Recovery\` and `D:\FSQ_website\room-screenshots\`.

| Milestone | Agent claim | Reality check / status |
|---|---|---|
| M0 | `studio-browser-mechanics.cjs`, fold-carriage check, geometry check, 14 sliding layouts (closed + sweep collisions 0), `npm run build` all passed | Accepted as reported. Scripts: `studio-fold-carriage-check.mjs`, `studio-geometry-check.mjs` |
| M1 Touch Lock v02 | `toCreasedNormals` (PI/4) + `flatShading=false` in `studioTouchLock.js`; GLB 200 OK, binary 208,940 bytes; faceting reported visibly gone after agent viewed `touchlock-v02-closeup.png` | Owner should still eyeball once. Dimensions PROVISIONAL |
| M2 Furnished house | 7 rooms via Blender-generated procedural GLBs (`scripts/studio-generate-room-models.py`) + 6 generated 1024px textures; `studioRoom.js` rewritten; room switch preserves window/renderer/camera; garden black-glass race fixed; vite.config.js watcher ignore added | **REJECTED BY OWNER (visual).** Garden screenshot shows tiny window on a flat wall, cylinder "plants", box armchairs. Not a real house. Status = PLACEHOLDER. Needs image-based approach (see 5B-3) |
| M3 Aluminium | Alu profile 42 mm vs uPVC 60 mm, metalness 0.75 / roughness 0.32, no wood map, 18 Uniframe shades, spec file kept `BLOCKED_BY_UNVERIFIED_SPEC`; casement + sliding screenshots viewed | Only 2 designs browser-tested (1 casement, 1 sliding). Geometry is still the same box-profile generator with a thinner width, so it is PROVISIONAL, not "verified aluminium". Real extrusion section shapes still missing |

Other changes made by this run: `Recovery3DStudio.jsx` (line endings normalised to LF, room callbacks, `needsUpdate` on alu material), `WindowExperienceConfigurator.jsx` (garden-living, bay-seating rooms), helper scripts `studio-touchlock-review.cjs`, `studio-m2-room-review.cjs`, `capture-garden-closed.cjs`, `test-m3-aluminium.cjs`, `append-m3-checkpoint.cjs`. Next milestone in checkpoint: M4 (78 + 3 audit) — put AFTER the defects in 5B.

## 5B. Owner-reported open defects (10 Oct 2026, after M3) — HIGHEST PRIORITY

Reference photos from a real Prominance uPVC window: `WhatsApp_Image_2026-10-10_at_3_54_59_PM.jpeg` and `..._PM__1_.jpeg`. Blender screenshot showing the defect: `1791628022768_image.png`.

1. **Corners are square (butt-jointed), real profiles are mitred.** In the Blender/Web model the outer frame and sash members meet at 90 deg butt joints (visible straight seam). Real uPVC frames are welded after cutting each end at 45 deg; the photos show the diagonal weld/mitre line on frame, sash and sill/reveal return. Required: 45 deg mitre cuts on all 4 corners of outer frame and every sash (and mullion/transom T-joints cut/seated correctly), visible thin mitre seam, no gaps/overlap. Check Prominance brochures for section shape and corner treatment before modelling; do not invent dimensions.
2. **Friction stay missing/invisible on open casement sashes.** When a casement sash opens, a steel friction stay arm must be visible between sash and frame (photos: flat arm running from the sash to a round rosette/cover on the frame side). It must move correctly with the sash through the whole swing, be attached at both ends, not clip through frame/glass, and exist on every opening casement (and where applicable casement doors/alu casement, if catalogue hardware says so). Mark stay geometry PROVISIONAL until owner confirms the hardware spec.
3. **Room must look like a real house.** Owner does not accept the procedural rooms (cubes/cylinders/flat walls). Wanted: realistic, photo-like interior so a website visitor feels the window is installed in a real home. Approach: use AI-generated or real photographic room images (owner will supply/approve them) as the room backplate, with the 3D window placed in the wall opening with matched perspective, scale, lighting and reveal so it reads as installed; view through glass shows real outdoor image. Keep the room stationary; only limited camera/parallax movement. Provide at least 3 rooms first (bedroom, living, bay/garden), then the rest.

## 6. Earlier Blender recovery milestones

### Double-casement geometry and mechanism

- Scene orientation observed: X = width, Z = height, Y = depth.
- Initial live Blender MCP audit only inspected the model and produced a Markdown report; it did **not** edit, save, or export geometry.
- Stage 2 recovery reportedly saved `FSQ_UPVC_Casement_2Open_Recovery_v02.blend` with hollow glazed sashes, articulated hinges, and independent collision-free animation.
- A GLB named `Recovery_v02_r02.glb` was reportedly validated structurally; website behavior was not established at that milestone.
- Stage 2.5 reportedly repaired 11 finish materials in a 21-object working file and saved `FSQ_UPVC_Casement_2Open_Material_Validation_v03.blend`.
- Aluminium finish variants, manufacturer references, and full browser material validation remained outstanding at that milestone.

Do not overwrite any of these recoveries. Find their actual current paths and check hashes/contents before reuse.

### Touch Lock recovery

- Report referenced: `D:\Blender_UPVC\06_Blender_Tools\FSQ_Phase3F_Dual_TouchLock_QA_Report.md`.
- Existing working file referenced: `D:\Blender_UPVC\07_Web_3D_Studio\01_Blender_Working\Studio_Recovery\FSQ_TouchLock_Visual_Reference_v01.blend`.
- Browser GLB referenced: `public/models/FSQ_TouchLock_Visual_Reference_v01.glb`.
- Existing report explicitly described estimated/provisional dimensions.
- A structural GLB inspection did not catch the visible faceting defect. Visual close-up review is therefore mandatory.

## 7. Technical reference audit

Previously searched recursively:

```powershell
$referenceRoots = @(
  'D:\FSQ_website\reference',
  'D:\FSQ_website\design-references',
  'D:\FSQ_website\docs',
  'D:\Blender_UPVC',
  'D:\FSQ_website\src\data\designs'
) | Where-Object { Test-Path -LiteralPath $_ }

$referenceFiles = rg --files -uuu $referenceRoots
$referenceFiles | Set-Content -LiteralPath 'D:\Blender_UPVC\07_Web_3D_Studio\06_QA_Reports\Complete_Studio_Recovery\reference-file-inventory.txt'
```

Look for `pdf`, `dwg`, `dxf`, `step`, `stp`, `iges`, `igs`, `ifc`, catalogue documents, CAD sections, hinge drawings, roller details, Touch Lock datasheets, and prior Blender models. Verify source authenticity and revision status.

### Found / partially usable

- Local Prominance brochure with dimensioned **Optima** and **Inventa** profile sections.
- Owner-supplied Touch Lock photo and provisional Phase 3F model/report.
- Existing Blender casement and Touch Lock recovery models.

### Still requiring owner/manufacturer verification

1. Exact mapping from each website design and frame/sash member to an approved Prominance Optima/Inventa profile ID and cross-section.
2. Approved Uniframe Aluminium system profile cross-sections and design-specific assignments.
3. Touch Lock manufacturer datasheet: body/faceplate dimensions, fixing holes, spindle, keeper/strike, travel, tolerances, installation location, and compatible profile series.
4. Slide & Fold hinges, carriers, top/bottom rollers, tracks, panel offsets, fold sequence, load ratings, clearances, and installation details.
5. Sliding roller, track, interlock, lock/keeper, drainage, and stop geometry for each applicable series.
6. Casement/Tilt & Turn hinges, espagnolette/locking hardware, opening constraints, and clearance details.
7. Manufacturer-approved glazing thickness ranges, gasket/bead compatibility, reinforcement, fabrication tolerances, and hardware clearances where manufacturing claims would require them.
8. Design-to-manufacturer catalogue approval and revision evidence.

This is a **requirements list**, not proof that every document is absent. Verify against inventory and owner files before issuing final missing-doc report.

## 8. Website implementation files mentioned in run

- `src/components/design-diagrams/StudioDesignExplorer.jsx`
- `src/components/design-diagrams/studioRoom.js`
- `src/components/design-diagrams/studioDiagnostics.js`
- `studioTouchLock.js` (resolve exact path via repository search)
- `studioSpecifications.json` (created during the run; resolve exact path and inspect contents)
- `scripts/studio-interaction-browser.cjs`
- `scripts/studio-browser-mechanics.cjs`
- `scripts/studio-swept-browser.cjs`
- `scripts/studio-geometry-check.mjs`
- `scripts/studio-read-brochure.py`
- `scripts/studio-hardware-inspect.mjs`
- `scripts/studio-hardware-inspect.py`
- `public/models/FSQ_TouchLock_Visual_Reference_v01.glb`
- `package.json`

The log mentioned Vite and Three.js, but this handoff does not establish the entire dependency stack. Inspect `package.json` and lockfile.

## 9. Specific incident: Touch Lock GLB not loading

- Symptom: after Touch Lock integration, the browser's sliding model initially failed to load.
- Reported cause: Vite had cached public-file inventory and served HTML in place of the new asset.
- Reported remedy: local server restart and removal of a public-folder watch exclusion.
- Outcome: sliding models reportedly loaded after restart.
- Regression checks: confirm the GLB request returns binary content, expected MIME/content signature, and successful loading in clean browser sessions and production-equivalent builds. Do not assume cache behavior is fixed everywhere.

## 10. QA strategy and evidence standards

For **every** catalogue design and Bay/Bow concept, record:

- Stable design ID, family, material, opening layout, sash count, fixed panels, and intended animation.
- Geometry file path/version/hash, GLB load result, frame stationary test, sash transforms, opening endpoints, and intermediate swept poses.
- Independent frame finish and glass finish selection behavior.
- Glass/frame/hardware alignment and realistic materials.
- Architectural interior/installation screenshot and close-up screenshot.
- Browser console/network errors and tested browser/device/GPU environment.
- Verified manufacturer profile/hardware documents where relevant.
- Human visual acceptance, automated test acceptance, and manufacturer approval as **separate** fields.

Suggested status vocabulary:

- `NOT_STARTED`
- `IN_PROGRESS`
- `PARTIAL_3D`
- `PROVISIONAL`
- `BROWSER_TESTED`
- `BLOCKED_BY_UNVERIFIED_SPEC`
- `VISUALLY_APPROVED`
- `MANUFACTURER_VERIFIED`

These statuses are not mutually exclusive unless the implementation schema requires otherwise. Never infer `MANUFACTURER_VERIFIED` from browser tests.

## 11. Next actions in priority order

**Update 10 Oct 2026 (after M3): do these first, before M4.**
A. Mitred 45 deg corners on frame + sash (5B-1), visually verified in close-up screenshots against the two photos.
B. Visible friction stay on every opening casement, animated with the sash (5B-2).
C. Real-house image-based room experience (5B-3). Owner supplies/approves generated house images; agent must not substitute procedural boxes.
D. Then M4 (78 + 3 audit) and M5 (performance). Re-view every screenshot yourself; saved file is not a verified result.

Older list (items 1-2 and 3 mostly done in M0/M1):

1. Inspect the latest Codex terminal output and check whether `node scripts/studio-browser-mechanics.cjs` finished; capture exit code, log path, failure list, and test duration. If still running, determine whether active or hung before terminating anything.
2. Inspect `git status --short`, running Vite process, recent file modifications, Blender working files, and QA output; do not discard local changes.
3. Repair Touch Lock faceted faceplate in a **new versioned recovery** file; preserve original Blender/GLB assets. Validate mesh normals, topology, shading, material assignment, exported GLB and browser close-up.
4. Rerun targeted sliding mechanism, interaction, intermediate-pose, and visual tests; then rerun the broad 78+3 regression suite.
5. Audit all designs for true geometry completeness rather than just selection/layout checks; prioritize missing 3D mechanisms and visual fidelity.
6. Check that independent frame/glass controls work on all families and both material systems.
7. Produce a precise manufacturer-document gap report, with provisional dimension assumptions isolated from approved values.
8. Provide a local preview URL only after checking the actual running server and port. Explain how to navigate and select each design family.
9. Deliver a concise evidence-backed completion matrix and next steps. **No GitHub push or Vercel deployment.**

## 12. Recommended first local commands (read-only)

Run in PowerShell from the correct workstation:

```powershell
Set-Location 'D:\FSQ_website'
git status --short
Get-Content package.json
Get-ChildItem 'D:\Blender_UPVC\07_Web_3D_Studio\06_QA_Reports\Complete_Studio_Recovery' -File | Sort-Object LastWriteTime -Descending | Select-Object -First 30 Name,LastWriteTime,Length
Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -match 'studio-browser-mechanics|vite|blender' } | Select-Object ProcessId,Name,CommandLine
rg -n 'PARTIAL_3D|BLOCKED_BY_UNVERIFIED_SPEC|TouchLock' src scripts
```

Do not automatically rerun long tests or alter assets until active process state and repository changes are understood.

## 13. Known gaps in this memory

Added 10 Oct 2026: the Antigravity M0-M3 results above are agent-reported from a pasted log; not independently re-run. Real house image assets, Prominance corner/stay hardware spec, and real aluminium extrusion sections are still missing.

Older gaps:

The conversation did not provide the full project ZIP, live repository tree, complete `studioSpecifications.json`, reference inventory contents, current browser screenshots, full 78-design ID matrix, server URL, all Blender filenames, or the final mechanics-test result. They must be obtained from the existing local project. **Never invent their contents or assert complete production readiness.**

## 14. Copy-ready resume prompt

> Read `FSQ_Website_COMPLETE_PROJECT_MEMORY_2026-10-10.md` (sections 5A, 5B, 11) and `06_QA_Reports\CHECKPOINT.md`. Resume, do not rebuild. Do ONE task at a time in this order: (A) 45 deg mitred corners on frame and sashes; (B) friction stay on open casements; (C) image-based real-house room. Run builds/tests in the foreground, never end a turn while waiting on a background task, VIEW every screenshot and describe what you see, append (never overwrite) to CHECKPOINT.md, no whole-file line-ending changes, no GitHub push, no Vercel deploy, do not overwrite approved Blender masters.

---

**Memory integrity:** Updated 10 Oct 2026 after Antigravity M0-M3 log. M2 (rooms) rejected by owner; mitre/friction-stay/real-house defects open. This document is a handoff snapshot, not a completion certificate.

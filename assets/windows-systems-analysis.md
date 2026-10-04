# Four Square Window Systems — Product, Specification & Motion Analysis

**Document version:** 2026-10-04  
**Purpose:** Implementation reference for the Four Square product pages. This document records the verified product families, the page information architecture, window-model dimensions, frame finishes, and the animation behaviour used in the website.

## 1. Verified source scope

### uPVC source
- Official range page: https://prominance.com/upvc-windows/
- Verified product families on the official page:
  - Inventa Casement uPVC Windows
  - Inventa Sliding uPVC Windows
  - Inventa Tilt & Turn uPVC Windows
  - Optima Casement uPVC Windows
  - Optima Sliding uPVC Windows
- The official source also documents multi-chamber profiles, weather seals, rollers, multipoint locking, drainage, SS 304 friction stays, 1.5 mm hot-dip galvanised reinforcement at 125 GSM, single/double/triple glazing and fusion-welded joints.

### Aluminium source
- Official sliding range: https://uniframe.com/sliding/
- Official casement range: https://uniframe.com/casement/
- Official Robus 30 details: https://uniframe.com/robus-30/
- Verified product families on the official range pages:
  - Graf 26 — sliding doors and windows
  - Graf 32 — sliding doors and windows
  - Graf 45 — sliding doors
  - Robus 30 — casement doors and windows
  - Robus 40 — casement doors and windows
  - Robus 40 — casement fold & slide
  - Livio Minimal — casement windows

> The website presents these systems under Four Square branding. Source-company logos and channel-partner branding are not used in the public UI.

---

## 2. Product-menu behaviour specification

### Required interaction
1. Selecting any product link immediately starts the menu-close animation.
2. The desktop mega menu fades and moves upward before the route changes.
3. The mobile full-screen menu slides out before the destination content becomes visible.
4. The current page fades down by 7 px and to zero opacity for 260 ms.
5. The destination renders in the same single-page shell, returns to the top, and fades in.
6. The route change must not expose an intermediate page or leave the product menu covering the destination.
7. The desktop menu stays suppressed until the pointer leaves the product trigger area, preventing the CSS `:hover` state from reopening it after selection.

### Motion tokens
| Purpose | Value |
|---|---|
| Page exit / entry | `260ms cubic-bezier(.65,0,.35,1)` |
| Mobile menu close | `340ms cubic-bezier(.22,.75,.2,1)` |
| Desktop mega menu | `200ms` |
| Window sash | `800ms cubic-bezier(.34,1.56,.64,1)` |
| Reduced motion | All route/menu/window transitions disabled |

---

## 3. uPVC product-page inventory

### 3.1 Inventa Casement uPVC Windows
**Verified characteristics**
- Twin-gasket sealing.
- Multipoint locking for close, even compression.
- Reinforced mullions and transoms for larger openings and wind-load resistance.
- Large fixed-glass combinations for wider views and daylight.
- Strong thermal and acoustic performance.

**Applications**
- Living rooms and bedrooms.
- Openings facing busy or noisy streets.
- Large fixed-and-openable combinations after wind-load review.

**Website design catalogue**
1. 3-Pane Side Hung
2. Fixed
3. Single Right
4. Single Left
5. Double Side Hung
6. Fixed & Right
7. Twin Left
8. Double French
9. Left & Fixed
10. Triple Open
11. Triple with Top Fixed
12. Left Fixed Right
13. Triple Left
14. Triple Alternate
15. Large 3-Pane
16. Top Hung & Fixed
17. 4-Pane Center Open
18. 5-Pane Wide
19. 6-Pane Extrawide
20. Door & Fixed
21. 4-Pane Top Fixed
22. 3-Pane Bottom Fixed
23. 2-Pane Bottom Fixed
24. Top Hung Combinations
25. Triple Combination
26. Single Bottom Fixed

**Website size table**
| Component | Minimum | Maximum |
|---|---:|---:|
| Window | 1350 × 900 mm | 4100 × 2400 mm |
| Sash | 450 × 450 mm | 850 × 1800 mm |

### 3.2 Inventa Sliding uPVC Windows
**Verified characteristics**
- Reinforcement space for larger windows and doors.
- Space-saving opening with up to 66% opening in supported layouts.
- Minimum vertical separator for wider views.
- Interlocking profiles and reinforcement/booster options for wind resistance.

**Website design catalogue**
1. 2-Track 2-Panel
2. 2-Track 3-Panel
3. 2-Track 4-Panel
4. 3-Track 3-Panel
5. Sliding with Top Fixed

**Website size table**
| Component | Minimum | Maximum |
|---|---:|---:|
| Window | 900 × 450 mm | 2400 × 2400 mm |
| Sash | 450 × 450 mm | 1200 × 2400 mm |

### 3.3 Inventa Tilt & Turn uPVC Windows
**Verified characteristics**
- Z-sash system supporting major tilt-and-turn hardware solutions.
- Inward tilt for controlled ventilation.
- Inward turn for full opening and cleaning access.
- Useful where privacy and ventilation are both important.
- Thermal and acoustic insulation.

**Website design catalogue**
1. Single Tilt & Turn
2. Double Tilt & Turn
3. Tilt & Turn + Fixed
4. With Bottom Fixed
5. With Top Fixed

**Website size table**
| Component | Minimum | Maximum |
|---|---:|---:|
| Window | 600 × 600 mm | 1500 × 2400 mm |
| Sash | 600 × 600 mm | 1500 × 2400 mm |

### 3.4 Optima Casement uPVC Windows
**Verified official scope**
- Small to medium openings.
- Residential and medium high-rise applications.
- Good thermal and acoustic efficiency.
- Full-opening possibility for daylight and ventilation.
- Final design must be checked against opening dimensions and project wind load.

**Website design catalogue**
1. Fixed
2. Single Right
3. Single Left
4. Double Side Hung
5. Fixed & Right
6. Left & Fixed
7. Double French
8. Triple Open
9. Left Fixed Right
10. Top Hung & Fixed
11. Single Bottom Fixed
12. Triple Combination

> The official range page does not publish one universal minimum/maximum schedule for every Optima casement configuration. The site therefore states the verified scope and requires project-specific wind-load validation instead of inventing a limit.

### 3.5 Optima Sliding uPVC Windows
**Verified official scope**
- Small to medium windows.
- Bedrooms, guest rooms, halls, walkways and staircases.
- Useful where swing space is constrained inside and outside.
- A 1500 × 1500 mm reference window is documented for 1500 Pa wind load with a Height/175 deflection limit and normal reinforcement.
- Booster profiles can be used when project engineering requires more strength.

**Website design catalogue**
1. 2-Track 2-Panel
2. 2-Track 3-Panel
3. 2-Track 4-Panel
4. 3-Track 3-Panel
5. Sliding with Top Fixed

### 3.6 uPVC door systems represented in the website
- Casement doors: single left, single right, double French, French with side fixed, French with top arch/fixed.
- Sliding doors: 2-panel left/right slide, 3-panel centre slide, 4-panel centre opening.
- Slide & fold: 3-panel and 4-panel configurations.

---

## 4. Aluminium product-page inventory

### 4.1 Sliding series
| Series | Official category | Website position |
|---|---|---|
| Graf 26 | Sliding doors & windows | Slimline residential system |
| Graf 32 | Sliding doors & windows | Balanced mid-range system |
| Graf 45 | Sliding doors | Large/heavy sliding panels |

**Website animated types**
1. 2-Panel Left Slide
2. 2-Panel Right Slide
3. 3-Panel Center Slide
4. 4-Panel Center Open
5. Corner Sliding Configuration

### 4.2 Casement series
| Series | Official category | Website position |
|---|---|---|
| Robus 30 | Casement doors & windows | Everyday casement range |
| Robus 40 | Casement doors & windows | Higher-duty casement range |
| Robus 40 | Casement fold & slide | Wide-opening folding configuration |
| Livio Minimal | Casement windows | Minimal sightline range |

**Robus 30 official details visible on the source page**
- Frame face width: 44 mm.
- Frame depth: 48 mm, 74 mm or 84 mm.
- Sash face width: 53 mm.
- Sash depth: 26 mm.
- Minimum wall thickness: 1.2 mm.
- Glass thickness: 5–8 mm.
- Interlock face width: 32 mm.
- Wind-load design: 1500 Pa.
- Air permeability design: 300 Pa.
- Water-tightness design: 200 Pa.
- Sash minimum: 600 mm (H) × 500 mm (W).
- Sash maximum: 1500 mm (H) × 800 mm (W).
- Maximum sash weight: 30 kg.

**Website casement design catalogue**
The aluminium casement page mirrors the complete 26-layout casement board listed in section 3.1, rendered with brushed-aluminium frame styling and aluminium hardware.

### 4.3 Additional aluminium categories represented in the website
- Fold & Slide: 3-panel and 4-panel.
- Facade & Skylight: automated skylight and facade-module visualisations.
- Colours & finishes: powder coating, anodized surfaces and wood-finish laminations.

---

## 5. Window-model visual system

### Reference dimensions
| Breakpoint | Grid | Model frame height |
|---|---:|---:|
| Desktop | 3 columns | 235 px |
| Tablet | 2 columns | 190 px |
| Mobile | 2 columns | 175 px |
| Door models | Same grid | 300 / 245 / 225 px |

All catalogue items—including the 26-item casement board—use the same reference model size. Dense catalogues no longer shrink to miniature 9-column cards.

### uPVC material treatment
- Outer frame: layered warm-white profile with light grey inner edge.
- Glass: transparent sky-blue gradient with highlight reflection.
- Divider: white/grey extruded profile gradient.
- Handle: dark graphite.
- Shadow: soft architectural depth rather than a flat icon.

### Aluminium material treatment
- Brushed-metal gradient from slate through pale silver.
- Darker aluminium sash edges.
- Dark hardware.
- Animated surface highlight on hover/open.

### Motion mapping
| Type | Transform |
|---|---|
| Left casement | `rotateY(-80deg)` from left hinge |
| Right casement | `rotateY(80deg)` from right hinge |
| Top hung | `rotateX(60deg)` from top hinge |
| Bottom hung | `rotateX(-60deg)` from bottom hinge |
| Sliding left | `translateZ(15px) translate(-60%)` |
| Sliding right | `translateZ(15px) translate(60%)` |
| Tilt | `rotateX(-15deg) translateZ(10px)` |
| Turn | `rotateY(75deg)` |
| Fold | Alternating left/right hinge rotations |

### Interaction rules
- Desktop: hover opens the model; moving away closes it.
- Touch/mobile: tap toggles the model.
- Keyboard: Enter or Space toggles the focused model.
- Only one tapped model stays open at a time.
- `prefers-reduced-motion` disables sash transitions.

---

## 6. Page information architecture for every window type

Every uPVC product route follows the same customer-readable order:
1. Product hero and exact system title.
2. Product specifications and key features.
3. Applications, advantages and design consideration.
4. Size or verified design-basis table.
5. Profile and hardware detail images.
6. Certification and test-results table.
7. Complete animated design catalogue.
8. Core profile breakdown.
9. Contact CTA.

Every aluminium product route follows this order:
1. Product hero.
2. Material/performance strip.
3. Series selection.
4. Size table.
5. Animated design catalogue.
6. Sliding, casement, fold/slide, facade and skylight categories.
7. Testing and fabrication details.
8. Colours, anodized finishes, wood finishes and surface warranties.
9. Premium add-ons and applications.
10. Contact CTA.

---

## 7. Accuracy and implementation rules

- Never merge two window keyframes into one visual sash.
- Fixed panels must never animate.
- Hinged panels must open from the hinge edge; handles appear on the opposite edge.
- Sliding panels must translate along the track, not rotate.
- Tilt panels must pivot from the bottom edge.
- Product limits not published by an official source must be labelled project-specific rather than guessed.
- Large opening sizes must be validated against wind load, glass weight, reinforcement and hardware capacity.
- Do not display source-company branding in the Four Square interface.
- Keep source URLs only in documentation or technical attribution, not as customer-facing partner promotion.

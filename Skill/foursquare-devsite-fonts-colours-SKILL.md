---
name: "foursquare-devsite-fonts-colours"
description: "Complete font and colour analysis of the Four Square development website (https://foursquares-six.vercel.app/). Every typeface, type-scale value, colour token (hex), gradient, and usage location — extracted from the site's real stylesheet (/assets/index-Bts8wwbJ.css). Use this to match or replicate the site's visual identity exactly."
---

# Four Square Dev Site — Fonts & Colours Skill

## 1. FONTS

### 1.1 Loaded typefaces (exact Google Fonts imports)
```css
@import "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap";
@import "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap";
```
- **Poppins** (300–800) = the ONLY font actually applied. Both `--font-heading` and
  `--font-body` resolve to `"Poppins", sans-serif`.
- **Outfit** (300–700) is imported but **never assigned** to any selector in this
  stylesheet — dead import (likely leftover or used by a JS-injected component).
- No other webfonts in this CSS. (An earlier audit noted "Inter" on the live site —
  it is NOT in this stylesheet; treat as unverified unless found in a JS bundle.)

### 1.2 Type scale (exact)
| Element | Size | Weight | Other |
|---|---|---|---|
| h1 | `clamp(2.5rem, 6vw, 4rem)` | 600 | `letter-spacing:-.02em`, `line-height:1.2` |
| h2 | `clamp(2rem, 4vw, 2.8rem)` | 600 | same |
| h3 | `clamp(1.5rem, 3vw, 1.8rem)` | 600 | same |
| h4 | `clamp(1.25rem, 2vw, 1.4rem)` | 600 | same |
| h5/h6 | inherited | 600 | same |
| body p | `1rem` | 400 | `line-height:1.7`, color `--text-light` |
| Buttons `.btn` | `.95rem` | 600 | — |
| Section badge | `.8rem` | 600 | `uppercase`, `letter-spacing:.1em` |

Mobile overrides: `@media(max-width:768px)` → h1 `2.22rem`, h2 `1.88rem`, h3 `1.44rem`;
`@media(max-width:480px)` → h1 `1.95rem`, h2 `1.65rem`.
Body: `-webkit-font-smoothing:antialiased`, `overflow-x:hidden`.

### 1.3 Numeric/tabular figures
`.counter-animate { font-variant-numeric: tabular-nums; font-feature-settings:"tnum"; }`
— used for stat count-ups so digits don't jitter.

---

## 2. COLOURS — complete design-token table (`:root`)

### Brand blues (primary identity)
| Token | Hex | Role |
|---|---|---|
| `--accent-red` | `#0d6eaa` | PRIMARY brand blue (buttons, links, icons, accents). Note: misleadingly named "red" |
| `--accent-red-light` | `#1a8fd1` | Lighter brand blue (hovers, highlights) |
| `--accent-red-dark` | `#0a5a8c` | Darker brand blue (button hover, headings accents) |
| `--accent-coral` | `#2196f3` | Bright blue (gradient end, badges) |
| `--accent-orange` | `#03a9f4` | Sky blue (gradient, highlights) |
| `--accent-teal` | `#16a085` | Teal (occasional accents) |
| `--accent-teal-light` | `#1abc9c` | Light teal |

### Text & neutrals
| Token | Hex | Role |
|---|---|---|
| `--text-dark` / `--neutral-charcoal` | `#1a2a3a` | Headings, dark text |
| `--text-light` | `#4a5c6a` | Body text |
| `--neutral-mid` | `#7a8b99` | Muted/secondary text |
| `--neutral-dark` | `#2c3e50` | Dark UI elements |
| `--primary-dark` | `#1a1a1a` | Near-black |
| `--neutral-light` | `#e8ecef` | Borders, dividers |
| `--neutral-off-white` | `#f8f9fa` | Subtle backgrounds |

### Backgrounds (warm family)
| Token | Hex | Role |
|---|---|---|
| `--primary-white` / `--neutral-white` / `--card-bg` | `#ffffff` | Page + card background |
| `--primary-light` / `--bg-warm` | `#FDF8F5` | Warm section background |
| `--primary-cream` / `--bg-linen` | `#FAF0E6` | Cream/linen sections |
| `--bg-biscuit` | `#F5E6D3` | Biscuit tint blocks |
| `--bg-coral-light` | `#FFF5F0` | Pale coral tint |

### Dark surfaces
| Token / usage | Value | Role |
|---|---|---|
| Utility top bar | `#0d2130` | Top info strip background |
| `--gradient-dark` | `linear-gradient(180deg,#1a3a52,#0d2a3d)` | Dark section backgrounds |
| Page header bg | `linear-gradient(135deg,#0d6eaa,#1a3a52,#0d2a3d)` | Inner-page hero bands |
| Footer | `linear-gradient(180deg,#0d1a25,#070f15)` | Footer background |

### Supporting / functional colours
| Usage | Value |
|---|---|
| Primary gradient `--gradient-primary` | `linear-gradient(135deg,#0d6eaa,#2196f3)` |
| Hero buttons | `#2b4c6f` (hover `#1e354f`) |
| Section badge bg tint | `#e74c3c1a` (red tint!) with `#0d6eaa` border/text |
| Card border | `rgba(13,110,170,.1)` |
| Card shadows | `rgba(13,110,170,.05 → .2)` scale |
| Scrollbar thumb | `#0d6eaa` (hover `#0a5a8c`), track `#e8ecef` |
| Text selection `::selection` | bg `#0d6eaa`, text `#ffffff` |
| Gradient text `.text-gradient` | `#0d6eaa → #2196f3` clipped to text |

### Social brand hover colours (footer icons)
Facebook `#1877f2` · Instagram gradient `#f09433,#e6683c,#dc2743,#cc2366,#bc1888` ·
LinkedIn `#0a66c2` · YouTube `red` · Twitter `#1da1f2` · WhatsApp `#25d366`.

### 3D window/door model colours
- uPVC outer frame: `6px solid #a0a0a0`, bg `#d9f0fa`; sash `4px solid #c0c0c0`
- Glass: `rgba(180,230,255,.45)` + gloss gradient overlay; handle `#666` (`4px×22px`)
- Aluminium: brushed metal `linear-gradient(135deg,#64748b,#94a3b8 20%,#f8fafc 40% 45%,#94a3b8 60%,#64748b)`;
  outer `#7f8c8d`, hover `#475569`; sash `rgba(195,235,255,.35)`; handle `#0f172a`

---

## 3. COLOUR USAGE MAP (where each colour lives)

- **Top utility bar:** `#0d2130` bg, white text (phone / email / tagline).
- **Navbar:** white bg; logo blue `#0d6eaa`; active link underline `#0d6eaa`.
- **Hero:** white headline over image; blue `#0d6eaa` accent words; `#2b4c6f` CTA buttons.
- **Section badges:** `#e74c3c1a` tint bg + `#0d6eaa` border/text (uppercase pill).
- **Section backgrounds alternate:** `#ffffff` → `#FDF8F5` → `#FAF0E6`.
- **Cards:** `#ffffff` bg, `rgba(13,110,170,.1)` border, blue-tinted shadows.
- **Stats band:** dark gradient bg, white numbers, `#2196f3` accents.
- **Footer:** near-black blue gradient `#0d1a25 → #070f15`, muted `#7a8b99` text.
- **Links/hovers:** `#0d6eaa` → `#0a5a8c`.

---

## 4. REPLICATION GUIDE (for ChatGPT / developer)

1. Load fonts: Poppins 300–800 (+ Outfit optional). Apply Poppins everywhere.
2. Set the `:root` tokens above verbatim — **do not rename** `--accent-red` (code depends on it).
3. Type scale: use the `clamp()` values; headings 600/`-.02em`.
4. Brand rule: primary actions = `#0d6eaa`, hover = `#0a5a8c`; gradients only
   `#0d6eaa → #2196f3` (135deg).
5. Warm neutrals for section alternation; dark blue-blacks (`#0d2130`, `#0d1a25`)
   only for utility bar / footer / dark bands.
6. Never introduce new hues — the palette is blue + warm neutrals + one red tint
   (`#e74c3c1a`) for badges.

## 5. Owner constraints (never violate)
- Colours and logo: **no compromise** — match hex values exactly.
- Only the Four Square logo/brand; no partner branding.
- When fixing anything visual, change ONLY the reported issue; keep every token above intact.

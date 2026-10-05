# Prominance uPVC — Stylesheet / Design-System Analysis

Source: prominance.com (captured Oct 2026). For an AI/developer comparing or borrowing patterns.

## Stack

- **Builder:** Mobirise / CustomDes landing-page builder output
- **CSS framework:** Bootstrap 4 (grid, utilities, components)
- **Animation:** animate.css + tether (tooltips/positioning)
- **Custom CSS:** one very large `mbr-additional.css` (~9,349 lines) holding nearly all
  bespoke styling — section backgrounds, typography scale, buttons, cards, galleries
- **JS:** jQuery-era stack (Bootstrap 4 JS, Mobirise theme scripts); no modern framework

## Typography

- **Display/headings:** Montserrat (700/800 weights for headlines)
- **Body:** Poppins (400/500)
- Fluid type scale via `calc()` inside media queries (classic Mobirise pattern:
  `font-size: calc( ... )` interpolated between breakpoints)

## Colours

| Token | Hex | Usage |
|---|---|---|
| Primary | `#005996` | Buttons, links, headings accents (hover: `#002c4a`) |
| Secondary | `#ff3366` | CTA highlights, badges |
| Text dark | near-black `#1a1a1a`-ish | Body copy |
| Backgrounds | white / light greys | Sections alternate white and `#f5f5f5`-type bands |

## Layout patterns

- Full-width hero with headline + CTA + trust badges
- Alternating content/image rows (Bootstrap grid)
- Certificate/test-result cards in bordered grid
- Colour swatch grids (square tiles + name labels)
- Sticky header with logo left, nav centre, CTA button right
- Footer: multi-column (company, products, contact, social)

## What the clone took from this (design-wise)

Almost nothing visual — the clone follows the **dev site's** design system
(`04-dev-site/`), not Prominance's. From Prominance only *content* was taken
(certificates, specs, colours, PDFs). The Mobirise/Bootstrap look was intentionally
NOT reproduced.

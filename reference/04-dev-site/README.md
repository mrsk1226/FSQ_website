# 04 — Dev Site: foursquares-six.vercel.app (the cloned site)

**This is the site the clone reproduces 1:1** — structure, design system, colours,
animations, and the interactive window/door models. Everything below is written so that
another AI (or a developer in VS Code) can understand and rebuild it without seeing the
live site.

## Stack (observed)

- **Vite + React** single-page application (SPA); client-side routing between
  homepage + 14 product pages (`/products/<division>/<type>`)
- Design tokens as CSS variables: `--accent-red` (actually the primary **blue**),
  `--accent-coral`, `--accent-orange` (naming is legacy; values are blues — see COLOURS.md)
- Fonts: **Poppins / Outfit / Inter** (Google Fonts)
- Stylesheet served as `/assets/index-<hash>.css` (e.g. `index-Bts8wwbJ.css`)

## Files in this folder

| File | What it holds |
|---|---|
| `SECTIONS.md` | Homepage: all 12 sections in order. Product pages: all 14 pages, section-by-section |
| `ANIMATIONS.md` | Every animation/motion spec: marquee, count-ups, scroll reveals, pinned tree, hovers |
| `WINDOW-MODELS.md` | **Exact CSS** of the interactive 3D window/door models (frame, glass, handles, motions) |
| `COLOURS.md` | Complete colour palette with hex values and usage |
| `screenshots/` | 48 local captures: 6 product pages top-to-bottom + hover/open states |
| `screenshots/owner-uploads/` | 15 owner phone screenshots: mobile menu + window-design sections |

## Page inventory

**Homepage** (`/`) — 12 sections: utility bar → sticky nav → hero → Vision/Mission →
Our Work (11-card marquee) → stats band → Interiors story → uPVC story → Aluminium story →
Green Energy (scroll-pinned tree, 5 chapters) → Why Choose Us (4 cards) →
Certifications → Testimonials → CTA band → footer.

**14 product pages** (`/products/...`):
- Interiors: `full-home`, `kitchen`, `living-room`, `bedroom`
- uPVC windows: `upvc/casement` (27 designs), `upvc/sliding` (5), `upvc/tilt-turn` (5), `upvc/colours` (20 swatches)
- uPVC doors: `upvc-doors/casement` (5), `upvc-doors/sliding` (4), `upvc-doors/slide-fold` (2), `upvc-doors/colours`
- Aluminium: `aluminium/sliding` (5 designs), `aluminium/casement` (26 designs)

## What was cloned 1:1 vs replaced

**Cloned exactly:** layout, section order, colours, typography, animations, window-model
CSS, nav/menu structure (Products dropdown + Downloads), footer structure.

**Replaced (fake placeholders → real data):**
Mumbai address → Erode/Trichy addresses · sample phone numbers → 96009 96002 / 96009 65722 ·
all-zero stats → verified figures (20-yr warranty, 25,000+ hrs testing, 2 showrooms, 3 divisions,
100+ colours, 1,00,000+ cycles) · 2 sample testimonials → 6 real customer reviews ·
hours → Mon–Sat 10 AM–7 PM, Sun closed.

**Changed per owner request:** Green Energy section re-themed from pink/sakura to GREEN;
production-section animated windows kept untouched.

# Dev Site — Sections (end-to-end)

Source: https://foursquares-six.vercel.app/ (captured Oct 2026).

## Homepage (12 sections, top to bottom)

### 1. Utility bar
Thin top strip, dark navy `#0d2130`: phone numbers, email, showroom hours, social icons.
Stays visible above the sticky nav.

### 2. Sticky nav / header
White background, shadow on scroll. Left: Four Square logo (blue). Centre/right nav:
Home · About · **Products** (mega dropdown) · **Downloads** · Gallery · Contact · CTA button
("Get a Quote", blue gradient pill). Products dropdown: three columns —
uPVC Windows (Casement / Sliding / Tilt & Turn / Colour Options),
uPVC Doors (Casement / Sliding / Slide & Fold / Colour Options),
Aluminium (Sliding Systems / Casement Systems); Interiors (Full Home / Kitchen /
Living Room / Bedroom). Downloads: 14-file library. Mobile: hamburger → full-screen
accordion menu (see `owner-uploads/owner-menu-*.jpg`).

### 3. Hero
Full-width banner: headline (premium uPVC + interiors positioning), sub-copy,
two CTAs (Explore Products / Book Free Consultation), hero image of windows/interiors,
trust chips (warranty, testing). Parallax-lite background drift on scroll.

### 4. Vision / Mission
Two-column: Vision card + Mission card, brand-blue icon chips, short statements.

### 5. Our Work — 11-card marquee
Infinite horizontal marquee of 11 project cards (image + location + tag).
40s linear loop, pauses on hover, cards scale 1.1 on hover.

### 6. Stats band
Dark/blue band with animated count-ups: 20-year warranty · 25,000+ hrs weather testing ·
2 showrooms · 3 divisions · 100+ colours · 1,00,000+ hardware cycles.
(Dev site showed zeros/placeholders — clone uses these real figures.)

### 7–9. Division stories (Interiors / uPVC / Aluminium)
Alternating image-text rows per division: premium gradient icon (window / sliding-door /
sofa-lamp), headline, paragraph, feature bullets, "Explore" link to the division's pages.

### 10. Green Energy — scroll-pinned tree
Pinned viewport (~4–5 screens tall): an animated tree grows as you scroll through
5 chapters (text panels cross-fade per chapter). Owner re-themed from pink/sakura to GREEN.

### 11. Why Choose Us — 4 cards
Certified Quality · In-house Manufacturing · End-to-end Service · Warranty Support.
Cards lift on hover (translateY −5px).

### 12. Certifications
SKZ-Germany (5 tests) · BSI-UK (5 tests) · SGS RoHS lead-free · CIPET (5 tests) ·
ISO 9001:2015 · 25-yr aluminium surface warranty · 5500 Pa wind-load.
Grid of certificate cards with test-standard details.

### 13. Testimonials
Carousel of customer reviews. Clone: 6 real reviews (Kathiresan Krishnasamy, Subash J,
Varadhu DVR, Navena B.N., Ramamurthy, Mohamed Musthafa) with star ratings.

### 14. CTA band
Blue gradient band: "Book your free consultation" + phone buttons + form link.

### 15. Footer
4 columns: brand + about, quick links, products links, contact (Erode/Trichy addresses,
phones, hours). Bottom bar: copyright + policy links.

## Product pages (14) — common anatomy

Every product page follows the same section order:

1. **Page hero** — division-tinted banner, breadcrumb, page title, intro line
2. **Design gallery** — grid of interactive 3D window/door models (see WINDOW-MODELS.md);
   each card: model + design name + code. Counts: uPVC casement 27 · uPVC sliding 5 ·
   uPVC tilt-turn 5 · uPVC door casement 5 · uPVC door sliding 4 · uPVC door slide-fold 2 ·
   aluminium sliding 5 · aluminium casement 26
3. **Colour Options pages** (`upvc/colours`, `upvc-doors/colours`) — 20 swatch tiles:
   12 European laminates + white + aluminium shades; click swatch → preview panel updates
4. **Specs strip** — profile/alloy specs, testing figures, warranty (per division)
5. **Features grid** — 4–6 feature cards (icons + text)
6. **Process / CTA** — consultation CTA band
7. **Footer** (same as homepage)

### Per-page notes
- `interiors/full-home` — hero + style gallery + 5-step journey + materials + CTA
- `interiors/kitchen` — 6 kitchen types + work-triangle/galley guidance + finishes + CTA
- `interiors/living-room` — TV units (floor-standing vs wall-hung), coffee tables, consoles, partitions
- `interiors/bedroom` — bedroom designs + material/finish specs
- `upvc/casement|sliding|tilt-turn` — design grids with hover open/close models + INVENTA/OPTIMA specs
- `upvc/colours` — 20 swatches, laminate names
- `upvc-doors/*` — door design grids + threshold/glass options
- `aluminium/sliding|casement` — Graf/Livio/Robus systems, brushed-metal model finish, 25-yr warranty ring

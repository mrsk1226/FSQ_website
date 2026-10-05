# Dev Site — Complete Animation Spec

Source: https://foursquares-six.vercel.app/ (stylesheet `/assets/index-Bts8wwbJ.css`, Oct 2026).

## 1. Our Work marquee (homepage §5)

- Track: `display:flex; gap:<card-gap>; animation: marquee 40s linear infinite;`
- `@keyframes marquee { to { transform: translateX(-50%); } }` (track duplicated 2× for seamless loop)
- Hover: `.marquee:hover .track { animation-play-state: paused; }`
- Cards: image zoom `transform: scale(1.1)` over `0.5s ease` on card hover; card lift
  `translateY(-5px)` + shadow deepen.

## 2. Stats band count-ups (homepage §6)

- Numbers animate 0 → target on entering viewport (IntersectionObserver), `ease-out`, ~2–3 s.
- Targets: 20 (yr warranty) · 25,000+ (hrs) · 2 (showrooms) · 3 (divisions) · 100+ (colours) · 1,00,000+ (cycles).

## 3. Scroll reveals (site-wide)

- Sections/cards: initial `opacity:0; transform: translateY(30px);`
- On intersect: `opacity:1; translateY(0)` with `transition: opacity .5s ease, transform .5s ease`.
- Stagger via incremental `transition-delay` on grid children.

## 4. Green Energy pinned tree (homepage §10)

- Container pinned for ~4–5 viewport heights (`position: sticky; top:0; height:100vh` inside a tall wrapper).
- 5 chapters: text panels cross-fade (`opacity` transitions) as scroll progress advances;
  tree SVG/CSS grows (scale/branch draw) with scroll progress.
- Owner change: re-themed from pink/sakura to GREEN (foliage/accents).

## 5. Nav / header

- Sticky; gains `box-shadow` after scroll threshold.
- Nav link underline: `::after` scaleX 0→1 on hover.
- Products mega-dropdown: fade+slide-down on hover (desktop); mobile = hamburger →
  full-screen accordion (see owner menu screenshots).

## 6. Buttons / CTAs

- Primary pill: blue gradient `linear-gradient(135deg,#0d6eaa,#2196f3)`; hover: darken /
  slight lift `translateY(-2px)` + shadow.
- Hero buttons `#2b4c6f` (hover `#1e354f`).

## 7. Window/door 3D models — motions

Full spec in `WINDOW-MODELS.md`. Summary:
- Transition: `transform .8s cubic-bezier(.34,1.56,.64,1)` (springy overshoot).
- Casement hinge: `rotateY(±80deg)`; top-hung/bottom-hung: `rotateX(60deg)`;
  sliding: `translateZ(15px) translateX(±60%)`; tilt: `rotateX(-15deg)`; turn: `rotateY(75deg)`.
- Trigger: hover on desktop (open), mouse-leave (close); tap toggles on touch.
- Aluminium models: same motions + brushed-metal gradient with a hover sheen sweep.

## 8. Production section — animated windows

Per owner instruction this section is **untouched**: animated window imagery plays as on
the dev site (subtle open/close loop), no restyle.

## 9. Testimonial carousel

- Auto-advance with fade/slide transition; manual dots/arrows; pause on hover.

## 10. Colour swatch preview (colour pages)

- Click swatch → preview panel cross-fades to the selected laminate/shade; active swatch
  gets a ring highlight.

## Timing/easing tokens

| Token | Value | Used for |
|---|---|---|
| Spring | `cubic-bezier(.34,1.56,.64,1)` .8s | Window/door open-close |
| Ease | `ease` .5s | Hovers, reveals |
| Linear loop | `linear` 40s infinite | Marquee |
| Count-up | `ease-out` 2–3s | Stats band |

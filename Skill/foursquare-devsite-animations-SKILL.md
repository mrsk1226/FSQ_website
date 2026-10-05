---
name: "foursquare-devsite-animations"
description: "Complete, code-level animation inventory of the Four Square development website (https://foursquares-six.vercel.app/). Use this to identify, understand, and replicate every animation on the site — including the hero text-reveal system that plays on page reload. All values were extracted from the site's real stylesheet (/assets/index-Bts8wwbJ.css)."
---

# Four Square Dev Site — Animation Skill

## 0. Architecture (how animations work on this site)

- **No animation library.** Everything is hand-written CSS `@keyframes` + utility classes.
- **Trigger pattern:** elements carry `data-animate`; they start `visibility:hidden` and JavaScript
  (IntersectionObserver, fires on scroll into view / on page load) adds the `.animated` class,
  which starts the CSS animation. This is why animations replay on **reload** or when you
  navigate back to Home — the observer re-fires.
- **Two easing signatures** used everywhere:
  - `--ease-reveal: cubic-bezier(.65,0,.35,1)` — the site's signature "smooth cinematic" ease,
    used for ALL text reveals, entrances, hovers. Durations .5s–.8s.
  - `--ease-spring: cubic-bezier(.34,1.56,.64,1)` — springy overshoot, used for scale-in
    effects and the 3D window/door open-close motions (.8s).
- **Timing tokens:** `--transition-fast: .15s ease` · `--transition-base: .3s ease` ·
  `--transition-slow: .5s ease`.

---

## 1. Hero text animation (plays on reload / returning Home)

This is the text animation you see when the page reloads. The site has **8 text-reveal
techniques**; the hero uses the masked slide-up family:

### 1a. `.text-reveal` — masked line slide-up (hero headline style)
```css
.text-reveal { overflow: hidden; }
.text-reveal-inner {
  display: inline-block;
  transform: translateY(100%);
  animation: slideUp .8s cubic-bezier(.65,0,.35,1) forwards;
}
@keyframes slideUp { to { transform: translateY(0); } }
```
How it works: each headline line sits inside an `overflow:hidden` mask, starts pushed 100%
down (invisible), then slides up into view. Clean, no fade — pure motion.

### 1b. `.word-reveal` — staggered word-by-word rise (hero sub-headline style)
Each word wrapped in `.word`, delays increase .05s per word (`.1s → .65s` for 12 words):
```css
.word-reveal { overflow: hidden; }
.word-reveal .word {
  display: inline-block; transform: translateY(100%);
  animation: slideUp .6s cubic-bezier(.65,0,.35,1) forwards;
}
.word-reveal .word:nth-child(1) { animation-delay: .1s; }
/* ... +0.05s per word ... */
.word-reveal .word:nth-child(12) { animation-delay: .65s; }
```

### 1c. `.char-reveal` — character-by-character cascade (20 chars, .05s steps)
Same mask principle per character: delays `.05s → 1s` across 20 spans, `.5s` duration.

### 1d. `.split-text-line` — multi-line block stagger
Lines rise with `.15s` gaps: line1 `0s`, line2 `.15s`, line3 `.3s` (`.8s` duration).

### 1e. `.clip-reveal` — clip-path wipe
```css
.clip-reveal { clip-path: inset(0 0 100% 0);
  animation: clipReveal .8s cubic-bezier(.65,0,.35,1) forwards; }
@keyframes clipReveal { to { clip-path: inset(0 0 0 0); } }
```
Element revealed by a top-to-bottom wipe instead of motion.

### 1f. `.mask-reveal` — color-block sweep (image/heading reveals)
A solid block in `--accent-red` (#0d6eaa) sweeps across via `scaleX`, then exits:
`maskSlide 1s cubic-bezier(.65,0,.35,1)` — 0–50% cover (origin left), 50–100% uncover (origin right).

### 1g. `.typewriter` — typing effect + blinking caret
`typing 3s steps(30,end)` (width 0→100%) + `blinkCaret .75s step-end infinite`
(2px solid `#0d6eaa` caret).

### 1h. `.line-reveal` — animated underline
`::after` gradient bar `scaleX(0→1)`, `.8s`, `.3s` delay, origin left.

**To replicate the hero:** wrap each headline line in `.text-reveal > .text-reveal-inner`,
sub-headline words in `.word-reveal > .word` spans, and add `data-animate` so the
IntersectionObserver triggers them on load.

---

## 2. Full animation inventory (where → what)

| # | Location | Animation | Classes / keyframes | Timing |
|---|---|---|---|---|
| 1 | Hero (Home) | Headline masked slide-up on load | `.text-reveal`, `slideUp` | .8s, `(.65,0,.35,1)` |
| 2 | Hero (Home) | Sub-headline word stagger | `.word-reveal .word` | .6s/word, +.05s stagger |
| 3 | Hero (Home) | CTA buttons rise | `.stagger-item` | .6s, .1s→.8s stagger |
| 4 | Hero (Home) | Badge pills pop | `.scale-in`, `scaleIn` | .6s spring |
| 5 | Navbar | Sticky + shadow on scroll | `.navbar-wrapper` | `all .3s` |
| 6 | Navbar | Link underline grow on hover | `::after scaleX` | .3s |
| 7 | Navbar | Products mega-dropdown fade+slide | hover transition | .3s |
| 8 | All sections | Scroll reveal (fade+rise) | `[data-animate]` → `.animated`, `fadeInUp` | .8s ease |
| 9 | Card grids | Staggered card entrances | `.stagger-item:nth-child(n)` | .6s, +.1s each |
| 10 | Our Work | Logo/project marquee loop | `marquee 40s linear infinite`, `translateX(-50%)` | 40s loop; pause on hover |
| 11 | Our Work cards | Image zoom + card lift on hover | `scale(1.1)`, `translateY(-5px)` | .5s ease |
| 12 | Stats band | Number count-ups 0→target | `.counter-animate` (`tnum`), JS rAF, `ease-out` | 2–3s |
| 13 | Stats band | Digit roll | `.number-flip`, `numberFlip` | .5s |
| 14 | Green Energy | Pinned tree, 5 scroll chapters | `position:sticky`, opacity cross-fade, SVG grow | scroll-driven |
| 15 | Product pages | 3D window hinge open (hover) | `rotateY(±80deg)` | .8s spring |
| 16 | Product pages | 3D top-hung/bottom-hung tilt | `rotateX(±60deg)` | .8s spring |
| 17 | Product pages | 3D sliding motion | `translateZ(15px) translateX(±60%)` | .8s spring |
| 18 | Product pages | 3D tilt-turn | `rotateX(-15deg)` / `rotateY(75deg)` | .8s spring |
| 19 | Product pages | Aluminium sheen sweep on hover | brushed-metal gradient position shift | .5s |
| 20 | Testimonials | Carousel auto-fade/slide | fade + translate, dots/arrows, pause on hover | .5s |
| 21 | Colour pages | Swatch preview cross-fade | opacity transition + active ring | .4s |
| 22 | Buttons (all) | Hover lift + darken | `translateY(-2px)`, bg darken | .3s |
| 23 | Cards (all) | Hover lift + shadow deepen | `translateY(-5px)`, `shadow-xl` | .3s |
| 24 | Section headers | Badge + underline draw | `.section-badge`, `.line-reveal` | .8s, .3s delay |
| 25 | Images | Mask-wipe reveal on scroll | `.mask-reveal`, `maskSlide` | 1s |
| 26 | Decorative | Floating elements | `float` (`translateY(-10px)` loop) | infinite |
| 27 | CTA sections | Glow pulse | `pulse-glow` (box-shadow 20px→40px) | infinite |
| 28 | Card hovers | Bottom panel slide-up | `.hover-reveal-content` `translateY(100%→0)` | .4s |
| 29 | Parallax zones | Scroll parallax | `.parallax-content` (`will-change:transform`, JS) | scroll-driven |
| 30 | Mobile menu | Hamburger → full-screen accordion | height/opacity transitions | .3s–.5s |

---

## 3. Exact keyframe library (copy-paste)

```css
/* Signature reveal ease */
--ease-reveal: cubic-bezier(.65,0,.35,1);
--ease-spring: cubic-bezier(.34,1.56,.64,1);

@keyframes slideUp   { to { transform: translateY(0); } }
@keyframes slideInLeft  { to { transform: translate(0); } }   /* from translate(-100%) */
@keyframes slideInRight { to { transform: translate(0); } }   /* from translate(100%) */
@keyframes slideInBottom{ to { transform: translateY(0); } }  /* from translateY(60px) */
@keyframes scaleIn   { to { transform: scale(1); } }          /* from scale(.8) */
@keyframes fadeInUp  { 0% { opacity:0; transform:translateY(30px);} to { opacity:1; transform:none;} }
@keyframes fadeIn    { 0% { opacity:0; } to { opacity:1; } }
@keyframes clipReveal{ to { clip-path: inset(0 0 0 0); } }     /* from inset(0 0 100% 0) */
@keyframes maskSlide { 0% { transform:scaleX(1); transform-origin:left; }
                        50%{ transform:scaleX(1); transform-origin:right; }
                        to { transform:scaleX(0); transform-origin:right; } }
@keyframes lineGrow  { to { transform: scaleX(1); } }         /* from scaleX(0), origin left */
@keyframes typing    { 0% { width:0; } to { width:100%; } }
@keyframes blinkCaret{ 0%,to { border-color:transparent; } 50% { border-color:#0d6eaa; } }
@keyframes numberFlip{ 0% { transform:translateY(-100%);} to { transform:translateY(0);} }
@keyframes float     { 0%,to { transform:translateY(0);} 50% { transform:translateY(-10px);} }
@keyframes pulse-glow{ 0%,to { box-shadow:0 0 20px #0d6eaa4d;} 50% { box-shadow:0 0 40px #0d6eaa80;} }
@keyframes marquee   { to { transform: translateX(-50%); } }  /* track duplicated 2x */
```

### 3D window/door motion values
- Outer frame: `6px solid #a0a0a0`, bg `#d9f0fa`; sash `4px solid #c0c0c0`
- Glass: `rgba(180,230,255,.45)` + gloss gradient overlay; handle `#666` `4px×22px`
- Motions: hinge `rotateY(±80deg)` · top/bottom hung `rotateX(±60deg)` ·
  sliding `translateZ(15px) translateX(±60%)` · tilt `rotateX(-15deg)` · turn `rotateY(75deg)`
- Transition: `transform .8s cubic-bezier(.34,1.56,.64,1)`; perspective `1200px`
- Trigger: hover opens / mouse-leave closes (desktop); tap toggles (touch)
- Aluminium: brushed-metal `linear-gradient(135deg,#64748b,#94a3b8 20%,#f8fafc 40% 45%,#94a3b8 60%,#64748b)`,
  hover border `#475569` + sheen sweep, handle `#0f172a`

---

## 4. JS trigger contract (for replication)

```js
// Elements to animate: <div data-animate class="text-reveal">...
// On intersect (or on load for hero):
//   el.classList.add('animated')   // flips visibility:hidden -> visible, starts keyframes
// Count-ups: requestAnimationFrame 0 -> target, ease-out, ~2.5s, tabular-nums
// Marquee: duplicate track content 2x in HTML for the -50% loop to be seamless
// Pinned tree: tall wrapper + position:sticky child; map scroll progress -> chapter opacity + tree scale
// Window models: mouseenter adds .open (target transform), mouseleave removes; touch toggles
```

## 5. Colour tokens referenced by animations
`--accent-red:#0d6eaa` (primary blue) · `--accent-red-dark:#0a5a8c` ·
`--accent-coral:#2196f3` · `--accent-orange:#03a9f4` · `--gradient-primary:linear-gradient(135deg,#0d6eaa,#2196f3)` ·
Headings `#1a2a3a` · body `#4a5c6a` · muted `#7a8b99`.

## 6. How to ask for changes (for the site owner)
When the owner asks for an animation fix, always reply with: (1) the exact element/class,
(2) the keyframe + timing values from this file, (3) a ready-to-paste CSS/JS snippet.
Never restyle colours or branding while fixing motion.

# Dev Site — Exact Window/Door Model CSS

Source: extracted from the dev site's own stylesheet (`/assets/index-Bts8wwbJ.css`), Oct 2026.
These values were applied 1:1 in the clone. An AI rebuilding the models needs exactly this.

## Model anatomy

Each model = `.model` (perspective stage) → `.frame` (outer) → `.glass` pane(s) →
`.handle`, `.divider`(s). Sashes that move are `.sash` children with `transform-style: preserve-3d`.

## Frame

```css
.frame {
  border: 6px solid #a0a0a0;      /* exact frame colour/width */
  background: #f4f4f4;            /* inner reveal */
  box-sizing: border-box;
}
```

## Glass

```css
.glass {
  background: rgba(180,230,255,.45);   /* exact glass tint */
  position: relative;
}
.glass::after {                        /* gloss overlay */
  content:"";
  position:absolute; inset:0;
  background: linear-gradient(115deg,
    rgba(255,255,255,.55) 0%,
    rgba(255,255,255,.12) 35%,
    rgba(255,255,255,0) 60%);
}
```

## Handle

```css
.handle {
  width: 4px; height: 22px;
  background: #666;
  border-radius: 2px;
  position: absolute;
}
```

## Dividers / mullions

```css
.divider { background: #a0a0a0; }   /* same grey as frame */
```

## Motions (hover open / leave close; tap toggles on touch)

```css
.sash { transition: transform .8s cubic-bezier(.34,1.56,.64,1); }  /* springy */
.model:hover .sash.hinge-left  { transform: rotateY(-80deg); }
.model:hover .sash.hinge-right { transform: rotateY(80deg); }
.model:hover .sash.top-hung    { transform: rotateX(60deg); }   /* opens outward at top */
.model:hover .sash.bottom-hung { transform: rotateX(-60deg); }
.model:hover .sash.slide-left  { transform: translateZ(15px) translateX(-60%); }
.model:hover .sash.slide-right { transform: translateZ(15px) translateX(60%); }
.model:hover .sash.tilt        { transform: rotateX(-15deg); }
.model:hover .sash.turn        { transform: rotateY(75deg); }
```

Hinge pivot: `transform-origin: left center` / `right center` / `top center` per sash.
Stage needs `perspective: 900px` on `.model` for the 3D to read.

## Aluminium models — brushed-metal finish

```css
.frame.alu {
  border: 6px solid transparent;
  background: linear-gradient(135deg,
    #64748b 0%, #94a3b8 20%, #f8fafc 40%, #f8fafc 45%,
    #94a3b8 60%, #64748b 100%);   /* brushed-metal gradient */
  background-clip: padding-box;
}
/* hover sheen sweep */
.model:hover .frame.alu::before {
  /* diagonal white gradient band translating across, .6s ease */
}
```

Aluminium models reuse the same motion classes (hinge/slide/tilt) as uPVC.

## Card layout (design gallery)

- Grid: responsive (4 cols desktop → 2 tablet → 1 mobile), gap ~24px.
- Card: white, rounded 12–16px, soft shadow; model area aspect ~4:3; below: design name
  (600 weight, `#1a2a3a`) + design code (muted `#7a8b99`).
- Card hover: `translateY(-5px)` + deeper shadow (`.5s ease`).

## Notes for rebuilders

- The 27/5/5/5/4/2/5/26 design counts per page are data, not CSS — keep the card counts.
- Colour pages (`upvc/colours`, `upvc-doors/colours`): 20 swatch tiles; clicking updates
  the model frame/glass tint in the preview panel (JS swaps CSS variables).
- Keep `prefers-reduced-motion` in mind if adding a global kill-switch (dev site has none).

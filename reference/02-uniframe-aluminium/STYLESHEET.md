# Uniframe Aluminium — Stylesheet / Design-System Analysis

Source: uniframe.prominance.com/best-aluminium-windows-and-doors-india/index.html (captured Oct 2026).

## Stack

- **Single hand-built static HTML file** — no framework, no builder output
- **One large inline `<style>` block** acting as the whole design system
  (custom properties, section styles, cards, swatches, forms, responsive rules)
- **Font:** Manrope (Google Fonts, multiple weights)
- **Icons:** Font Awesome 6.5.2 (CDN)
- **JS:** vanilla (accordion, carousels, form interactions); no jQuery-era stack

## Design language

- Premium dark + metallic aesthetic: deep charcoals/navy backgrounds, brushed-metal
  gradients on imagery, generous whitespace
- Cards with soft shadows and rounded corners; pill CTAs ("Get Brochure", "Get Quote")
- Colour swatch grid (named tiles with descriptors)
- Floating action buttons (WhatsApp / Call / Enquire) bottom-right
- Section rhythm: hero → strip CTA → overview accordions → feature cards → product
  range → finishes → applications → enquiry → add-ons → reach → galleries → footer

## Colours (observed)

- Dark navy/charcoal section backgrounds; white content bands
- Accent: metallic gold/bronze tones on premium cues; blue CTAs
- (Exact hex tokens live in the page's inline `<style>` — inspect the live page for the token list.)

## What the clone took from this (design-wise)

Content and specs only. The clone follows the **dev site's** design system
(`04-dev-site/`); Uniframe's dark-metallic look was intentionally NOT reproduced.
The aluminium *finish* visuals (brushed-metal gradient on window models, warranty rings)
were recreated to match the **dev site's** aluminium page, not Uniframe's page.

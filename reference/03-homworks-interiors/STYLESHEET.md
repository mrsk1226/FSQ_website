# Homworks Interiors — Stylesheet / Design-System Analysis

Source: homworks.com (captured Oct 2026). For an AI/developer comparing or borrowing patterns.

## Stack

- **CMS:** WordPress
- **Theme:** Service Finder (service-business theme) + child/custom styles
- **Page builder:** Elementor (most content sections are Elementor-built)
- **Commerce:** WooCommerce (installed; limited front-end use)
- **Stylesheets:** ~58 enqueued stylesheets, mostly plugin CSS (Elementor, WooCommerce,
  sliders, form plugins). Custom layers:
  - theme `style.css`
  - `layout-3.css` (theme layout variant)
  - Elementor per-post CSS (page-specific)
  - `wp-custom-css` block with custom font loading

## Typography

- Custom display font: **Roobert** (loaded via wp-custom-css)
- Fallback/system stack across plugins: **Raleway, Roboto, Open Sans, Poppins, Montserrat**
  (mixed usage — typical of a long-lived WordPress site with layered plugins)

## Design language (observed)

- Warm, homely interior-brand aesthetic: lifestyle photography-led, generous imagery
- "What We Do" / "How It Works" explainer sections; numbered process steps
- "Why Choose Us" comparison block; "See. Touch. Experience." showroom CTA
- Card grids for kitchen types / bedroom designs with image + spec text
- Footer with office-address columns

## Colours (observed)

- Warm neutrals, wood tones, white space; brand accent per theme customizer
  (exact hex tokens live in the theme customizer CSS — inspect the live page).

## What the clone took from this (design-wise)

Content and process only. The clone follows the **dev site's** design system
(`04-dev-site/`); Homworks' WordPress/Service-Finder look was intentionally
NOT reproduced. Gallery images were excluded (watermarked) and replaced with
fresh imagery.

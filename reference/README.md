# Website Reference Package — Four Square Clone

**Purpose.** This folder is the complete reference behind the Four Square website clone
(`four-square-website-clone` artifact). It documents, for each of the 3 source websites,
**what exists there section-by-section, what was USED in the clone vs what was NOT used**,
the stylesheets/design systems, videos, downloads, and — for the development site that was
cloned — an end-to-end technical record (sections, animations, window-model CSS, colours)
detailed enough for another AI (or developer in VS Code) to understand and reproduce it.

**How to use with an AI.** Open this folder in VS Code and point the AI at the relevant
subfolder. Every subfolder has its own `README.md` as an entry point. Screenshots are
copies (never hotlinks) renamed by page/section.

## Folder map

| Folder | Source | Contents |
|---|---|---|
| `01-prominance-upvc/` | prominance.com (uPVC) | Section-wise content inventory, exact certificate/test data, 12 laminate colours, profile specs, warranty, 14 PDF download URLs, videos, stylesheet analysis, screenshots |
| `02-uniframe-aluminium/` | uniframe.prominance.com (aluminium) | Testing figures, 25-yr warranty, 15 named swatches + 100+ shades, 6063-T6 specs, Graf/Livio/Robus systems, add-ons, applications, videos, stylesheet analysis, screenshots |
| `03-homworks-interiors/` | homworks.com (interiors) | Materials (BWP plywood), finishes, 100+ quality checks, 5-step order process, 6 kitchen types + buying guidance, bedroom/living designs, stylesheet analysis, screenshots |
| `04-dev-site/` | foursquares-six.vercel.app (the cloned dev site) | End-to-end documentation: all homepage sections, all 14 product pages section-wise, every animation spec, exact window-model CSS, colours, screenshots (incl. owner uploads) |
| `USED-IN-CLONE.md` | — | Complete inventory: every image/content element used in the clone → where it lives in the clone |
| `COLOURS-MASTER.md` | — | Every colour used, hex value, and where it is used |

## Used vs NOT used — summary

**Rule applied to the clone:** take the *content* (facts, specs, certificates, processes)
but **never** the partner brand names, logos, partner badges, or company contact details.
Everything is presented as Four Square's own.

| Source | USED in clone | NOT used (deliberately excluded) |
|---|---|---|
| Prominance uPVC | All certificate/test data (SKZ, BSI, SGS, CIPET, ISO 9001), quality claims, profile specs (INVENTA/OPTIMA), 12 laminate colours, 1500 Pa wind testing, 20-yr warranty, hardware info, 14 PDFs in Downloads library | "Prominance" brand name, partner badges, company address/phones |
| Uniframe aluminium | 5500 Pa testing, 1,00,000+ cycle testing, 25-yr surface warranty, 15 swatches + 100+ shades, 6063-T6 / 1.6 mm / dual-cleat specs, Graf/Livio/Robus systems, premium add-ons, applications, 21-day delivery | "Uniframe"/"Prominance" branding, partner counts (530+), company address/phones |
| Homworks interiors | BWP plywood material specs, finishes, 100+ quality checks, 5-step order journey (5%/45%/50%), 6 kitchen types + decision guidance, bedroom/living designs | "Homworks" branding, office addresses, enquiry email/phones |
| Dev site | Structure, design system, colours, animations, window-model CSS — cloned 1:1 | Fake placeholders were REPLACED: Mumbai address → Erode/Trichy, sample phones → 96009 96002 / 96009 65722, zero stats → real figures, 2 sample testimonials → 6 real reviews |

## Key reference facts

- Dev site: Vite + React SPA. Primary blue `#0d6eaa` (see `04-dev-site/COLOURS.md`).
- Window models: exact CSS in `04-dev-site/WINDOW-MODELS.md`.
- Animations: full spec in `04-dev-site/ANIMATIONS.md`.
- Videos: watermark-free mp4s + YouTube embeds listed in `01-prominance-upvc/VIDEOS.md` and `02-uniframe-aluminium/VIDEOS.md` (URLs only — not downloaded).
- Downloads: 14 PDF URLs in `01-prominance-upvc/DOWNLOADS.md`.

## Screenshots

All screenshots are local copies under each subfolder's `screenshots/` directory, renamed by
page/section (e.g. `devsite-products-upvc-casement-03.png`). Sources:
- 48 dev-site product-page captures (14 pages top-to-bottom + hover/open states)
- 43 captures across Prominance uPVC / downloads / Uniframe / Homworks kitchen / Homworks bedroom
- 11 Homworks homepage section captures
- 15 owner-uploaded phone screenshots (mobile menu + window-design sections)

*Compiled 2026-10-04. Sources verified live Oct 2026; page content may change on the live sites.*

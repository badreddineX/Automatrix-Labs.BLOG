# The Twice-a-Year Apartment Reset Kit (CAD)

**Product #1 built for the CAD/UK digital-products venture.** First product taken end-to-end
from concept to assembled PDF. Built for smallspacehome.ca. Target price: **$10–14 CAD**.

## What it is

A room-by-room apartment reset system done **twice a year** (January + spring). The hook —
and the reason it was picked over the Wall Art Bundle and Storage Kit — is the built-in
**annual re-launch**: it can be re-promoted every January and every spring, forever, and the
Reset Log page makes it a reusable product buyers return to, not a one-time read. Content is
repackaged from the blog's own January-reset, spring-cleaning, and IKEA-hacks articles (the
5 articles that were otherwise unmapped to any product).

## Final PDF — 15 pages, in order

| # | Page | Notes |
|---|------|-------|
| 1 | Front Cover | sage/tan/cream, Playfair title, shelf illustration |
| 2 | License | personal-use-only, © SmallSpace Home |
| 3 | Disclaimer | IKEA/Amazon/Canadian Tire trademark + price disclaimer |
| 4 | Start Here | how to use, time estimate, what you'll need |
| 5 | Roadmap ("Your Reset Journey") | 5-cubby shelf illustration, replaces a plain TOC |
| 6 | January Reset — Bedroom & Closet | sage season tag |
| 7 | January Reset — Kitchen & Pantry | sage; "kitchen tip" callout |
| 8 | January Reset — Living Room, Bathroom & Entryway | sage; renter tip |
| 9 | January Reset — Shopping List & The 3 Rules | summary page, no season tag |
| 10 | Spring Reset — Bedroom & Seasonal Swap | tan season tag |
| 11 | Spring Reset — Kitchen | tan; pantry-cabinet illustration |
| 12 | Spring Reset — Living Room, Bathroom & Entryway | tan; entryway illustration |
| 13 | The IKEA Essentials Blueprint | schematic KALLAX with dimension lines |
| 14 | Your Reset Log | open-journal illustration, reusable tracker |
| 15 | Back Cover | "Inside This Kit" list, no barcode |

Season color logic: **sage green = January, tan/terracotta = Spring** — makes the two halves
readable at a glance.

## Files in this folder

- `Twice-a-Year-Apartment-Reset-Kit.pdf` — full-quality master (~20 MB, built from Canva/GPT-image pages). Archive/print master.
- `Twice-a-Year-Apartment-Reset-Kit-web.pdf` — compressed flat version (~9.4 MB), print-and-pen only, no form fields. Superseded for selling by the fillable version below; keep as the print-friendly fallback.
- `Twice-a-Year-Apartment-Reset-Kit-web-fillable.pdf` — **the version to sell/upload** (~9.4 MB). Same compressed pages, now with a real digital layer added (2026-07-24): **52 interactive checkboxes** across all 6 room checklists (Jan + Spring) and **12 fillable text fields** on the Reset Log (Date Done + Notes, 2026–2028), plus a support/refund line on the license page. Checkbox marks are sage-green and land inside the drawn boxes; fields are borderless so the page still looks identical when blank. Fixes the #1 weakness (the "track every year, forever" log was previously a flat image you couldn't type into). Buyers can fill it in any PDF reader OR print and pen it. This is the file for the Fourthwall listing and buyer download.
- `Product Content.md` — was the earlier spec for the deleted structure; the live content is the 5 blog articles.
- `cover-assets/` — individual page images (front/back covers, license, disclaimer, start here, 3D mockups).
- `listing-assets/` — **real product screenshots for the Fourthwall gallery** (added 2026-07-24, revised same day after a content-leak review), rendered from the actual fillable PDF: `preview-all-15-pages.png` (honest "everything you get" grid, thumbnails too small to be usable — the strongest trust asset and it defuses the mockup's length overpromise), plus watermarked + partially faded single-page previews of the roadmap, a January content page (checklist visible, page fades out before "what to buy"), and the fillable Reset Log. Per `STRATEGY.md`, real page shots should carry the gallery over illustrated mockups — but full-resolution, un-faded previews of dense pages (the shopping-list table especially) were found to leak the actual usable content, so those are watermarked and faded rather than shown clean. A full shopping-list-page preview was tested and dropped entirely — even faded to 40% height it stayed mostly readable.
- `Fourthwall-Listing-Copy.md` — **ready-to-paste listing content** (title, tagline, full description, "what's inside" stating 15 pages, "is this for you", format/FAQ, image order, SEO tags). Length is stated plainly to pre-empt "felt short" refunds; the fillable feature is sold as the differentiator. Contains one marked TODO slot for your real first-hand authority line — left blank rather than faked.
- `reset-kit-content-pages.html` / `reset-kit-preview.html` — the HTML/CSS design template that
  defined the visual system (fonts, checkbox style, tables, season tags, roadmap). The AI-image
  pages were generated to match this. **This template is the reusable house style for all future
  ebooks** — see the UK Colour Scheme Kit, which reuses the same system in forest-green/gold.

## Known tradeoffs (decided deliberately)

- Pages are **baked-in images, not editable text** — gorgeous and cohesive, but the serif is an
  AI approximation of Playfair (not the literal font), and any content fix requires regenerating a page.
  Acceptable for a first $12 validation product. **Update (2026-07-24):** the "not digitally fillable"
  half of this tradeoff is now resolved — an AcroForm layer (checkboxes + Reset Log text fields) was added
  on top of the image pages in `-web-fillable.pdf` without regenerating anything. The images stay flat;
  the interactivity sits over them.
- **20 MB is heavy** for a digital download — worth a compression pass before the Fourthwall upload.
- **Proofread pages 1–5 at full zoom before selling** — AI image text can garble a word or a price;
  pages 6–9 were verified clean, 1–5 still need a human eye. A wrong retailer price is a trust/refund risk.

## Still open (not fixable in-file — need a human decision/asset)

- **3D mockups overpromise the length.** `cover-assets/06`/`07` render a thick hardcover with a spine,
  implying a fat book; the product is 15 pages (9 of them content). Either regenerate the mockups as a
  thinner/stapled-booklet or digital-device mockup, or make the listing copy explicit ("15-page printable
  kit") to pre-empt "felt short" refunds.
- **Content is competent-generic, not uniquely authoritative.** No first-hand renter story or real-apartment
  photo — the thing `STRATEGY.md`'s Hard Filters warn separates a product that survives real use from one that
  gets refunded. Adding one genuine "we did this in a 480 sq ft Toronto rental" anecdote/photo would lift it.

## Status / next steps

1. ✅ Full 15-page PDF assembled and filed here.
2. ✅ **All 15 pages proofread at full render (2026-07-24)** — every page rendered from the actual PDF and read: no text errors, no garbled AI type, all retailer prices correct, cover title present, no leftover barcode. Content is launch-ready.
3. ✅ Compressed `-web.pdf` created (20 MB → 9.4 MB, quality verified).
4. ✅ **Fillable layer added (2026-07-24)** — `-web-fillable.pdf`: 52 checkboxes + 12 Reset Log fields + license-page support line. Every page verified by rendering it filled/checked; all marks align inside the drawn boxes. This is now the sell file.
5. ✅ **Listing copy + real preview images prepared (2026-07-24)** — `Fourthwall-Listing-Copy.md` (paste-ready, states 15 pages, sells the fillable feature) and `listing-assets/` (real page screenshots + all-pages grid). Building the Fourthwall listing is now copy-paste + image-upload; attach `Twice-a-Year-Apartment-Reset-Kit-web-fillable.pdf` as the download. Two soft follow-ups still worth doing: (a) add your real first-hand authority line in the marked TODO slot, (b) optionally regenerate a thinner mockup for `cover-assets/06`.
6. 🔲 Gate publishing per the venture plan — hold live listing until Pinterest traffic is actually flowing (see repo-root `CLAUDE.md` and the 2026-08-24 analytics check-in).

### Note on the cover file
`cover-assets/01-front-cover.png` was briefly overwritten with a **title-less** version during an earlier
asset swap; restored 2026-07-24 to the correct titled cover. The title-less one is kept as
`cover-assets/_superseded-titleless-front-cover.png` (unused). The assembled PDF always used the correct
titled cover — only the loose asset file had drifted.

# Fourthwall Store Design Setup — CAD + UK

Both stores already exist on Fourthwall. This is the checklist to configure their design so each one matches its blog exactly — same colours, same fonts, same voice — so a visitor never feels like they left the site. Brand values pulled directly from each site's actual CSS, not invented.

---

## SmallSpaceHome (CAD) — smallspacehome.ca

### Brand values (from `src/styles/global.css`)

| Element | Value |
|---|---|
| Background | `#FAFAF7` (warm cream, not pure white) |
| Primary | `#8FAF8A` (sage green) / hover: `#6B8F66` |
| Accent | `#C4A882` (warm tan) / dark: `#8B6F47` |
| Ink / heading text | `#1C1917` |
| Body text | `#292524` |
| Border | `#E5DDD3` |
| Display font | Playfair Display (headings) |
| Body font | Inter (everything else) |

### Setup steps

1. **Store settings → Branding**
   - Upload logo: `blogs/canada-subn-1/smallspacehome/public/images/logo.png` — existing wordmark, ready to use as-is, no new design needed
   - Primary colour: `#8FAF8A`
   - Background: `#FAFAF7`, never pure white — matches the blog exactly
   - Heading font: Playfair Display · Body font: Inter (both are Google Fonts, available natively in Fourthwall's font picker)

2. **Store settings → Domain**
   - Point to a subdomain of smallspacehome.ca (e.g. `shop.smallspacehome.ca`) if Fourthwall's custom domain tier is active — keeps the buyer inside your own domain the whole way through checkout, which matters since Fourthwall is explicitly the "owned storefront" channel per `PRODUCT-PLAN.md`
   - If not on that tier yet, the default `smallspacehome.fourthwall.com`-style URL is fine to start

3. **Header/Footer Code** (already drafted, just needs real IDs)
   - Files exist at `blogs/canada-subn-1/smallspacehome/digital-products/first-apartment-checklist/fourthwall-header-code.html` and `-footer-code.html`
   - Header code box: paste the Pinterest Tag snippet, replace both `YOUR_TAG_ID` instances with the real ID from Pinterest Ads Manager → Ads → Conversions → Pinterest Tag
   - Footer code box: paste the GA4 snippet, replace `YOUR_MEASUREMENT_ID` with the real `G-XXXXXXX` ID from analytics.google.com → Admin → Data Streams
   - **These two are the only tracking you have right now** — without them, you can't measure whether blog traffic is converting on Fourthwall at all, which is the entire point of this being the "owned" channel

4. **Banner / hero image**
   - Use the same warm-cream + sage palette, Playfair Display headline
   - Suggested copy: *"Small-Space Living, Made Simple"* or reuse the blog's own tagline if one exists
   - Should feature (once built) the Wall Art Bundle prints or the Organization Suite cover, not a generic stock photo — the storefront's job is to look like an extension of the blog, not a separate business

5. **Navigation**
   - Keep it to 3 collections matching your 3 products: Organization, Wall Art, Storage & Budget — mirrors the blog's own category structure (Organization / Decor / Storage / Budget Tips) so a returning blog reader recognizes the grouping instantly

6. **Product page copy tone**
   - Match the blog's voice: direct, specific Canadian retailer references (IKEA Canada, Amazon.ca), no generic marketing fluff — the product content files already write in this voice, reuse that copy directly rather than writing new marketing copy from scratch

---

## British Home Interior (UK) — britishhomeinterior.co.uk

### Brand values (from `src/styles/global.css`)

| Element | Value |
|---|---|
| Background | `#F3F4EF` (soft sage-tinted white) |
| Primary | `#5B7A48` (forest green) / dark: `#47612F` |
| Gold accent | `#B89A6A` |
| Secondary accent | `#9FB88A` (sage) |
| Heading text | `#1A2318` |
| Body text | `#1E2420` |
| Border | `#D4D6CC` |
| Display font | Playfair Display (headings) |
| Body font | Lato (everything else) |

**Note:** UK's palette is a noticeably deeper, more saturated green than CAD's dusty sage — keep them visually distinct even though both use "green + gold/tan," since that distinction is already established across the two blogs and the two Wall Art Bundle product specs (CAD = warm neutral/terracotta-led, UK = forest green/period-property-led).

### Setup steps

1. **Store settings → Branding**
   - Primary colour: `#5B7A48`
   - Background: `#F3F4EF`
   - Heading font: Playfair Display · Body font: Lato
   - Upload logo: `blogs/uk-subn-1/britishhomeinterior/public/logo.svg` — existing square icon mark (200×200, dark bg + gold line art), ready to use as-is

2. **Store settings → Domain**
   - Subdomain of britishhomeinterior.co.uk once the custom-domain tier is active; default Fourthwall URL until then

3. **Header/Footer Code — does not exist yet, needs building**
   - CAD already has these two files; UK has no equivalent anywhere in the repo
   - **To do:** create a Pinterest Tag ID for the UK Pinterest account (separate from CAD's — different account, different tag) and a separate GA4 property/stream for britishhomeinterior.co.uk if one doesn't already exist
   - Copy the two CAD files as a template, swap only the IDs — the code itself is identical
   - This is a real gap right now: **UK has zero Fourthwall-side tracking**, so once the store goes live there's no way to measure blog→store conversion until this is done

4. **Banner / hero image**
   - Forest green + gold palette, Playfair Display headline
   - Suggested copy: *"Considered Interiors for British Homes"* or similar — should read period-appropriate and slightly more elevated in tone than CAD's, matching the UK blog's more editorial voice (visible in the Living Room Colour Schemes article's tone)
   - Feature the Colour Kit's palette cards or the Rented Flat Makeover Kit cover once built

5. **Navigation**
   - 3 collections: Rented Flat Makeover, Wall Art, Colour Schemes — mirrors the UK blog's actual categories (Room Makeovers / Living Room / Bedroom) more loosely since none of the 3 products map 1:1 to a UK blog category the way CAD's do

6. **Product page copy tone**
   - UK spelling throughout (colour, personalise, favourite) — this matters more here than it might seem, since US spelling on a "for British homes" storefront directly undercuts the products' own stated differentiator (see each Product Content.md's "differentiator" notes)
   - £ pricing displayed as primary currency, not converted from USD/CAD

---

## What's genuinely blocking either store from going live today

1. **UK has no tracking codes set up at all** — Pinterest Tag + GA4 need creating before the footer/header code can even be written
2. **No product images exist yet** — all 6 Product Content.md files are copy/content only; Fourthwall listings need a cover image and 2-4 preview images per product, which depends on the Wall Art Bundle art generation happening first (or at minimum a designed cover for the PDF products)
3. **CAD's own product plan says not to launch yet** — `PRODUCT-PLAN.md` explicitly sequences this as Phase 4, gated on the free lead magnet validating first. Setting up the store's *design* now is fine and doesn't conflict with that — actually publishing live product listings is the part that should wait

Logos are **not** a blocker — both exist and are ready to upload as-is (see each section above).

## Suggested order

1. Upload the existing logos and set brand colours + fonts in both stores' Branding settings (5 minutes each, values are all above)
2. Build UK's Pinterest Tag + GA4 the same way CAD's were built, using the CAD files as a template
3. Paste both stores' header/footer tracking code
4. Leave collections/navigation structured but products unpublished until the lead-magnet validation gate clears

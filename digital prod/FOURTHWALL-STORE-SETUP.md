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

3. **Header/Footer Code** (2026-07-31: rebuilt at `CAD dig prod/Fourthwall/` after the old `digital-products/first-apartment-checklist/` copy was lost with the rest of CAD dig prod)
   - Files: `CAD dig prod/Fourthwall/fourthwall-header-code.html` and `-footer-code.html`
   - Footer code is **done** — GA4 measurement ID `G-8RQLW4BWHR` is real, pulled directly from the live blog's `SEO.astro` (reuses the blog's own GA4 property rather than creating a second one, so blog + store traffic land in one property)
   - Header code still needs the Pinterest Tag ID pasted in — CAD has no Pinterest Tag set up yet at all (checked the blog's own code, nothing there either). Create one in Pinterest Ads Manager → Ads → Conversions → Pinterest Tag, then replace both `YOUR_TAG_ID` instances
   - **Pinterest Tag is the only tracking piece still missing** — GA4 is already wired

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

3. **Header/Footer Code** (2026-07-31: built at `UK dig prod/DIG PROD/Fourthwall/`)
   - Files: `UK dig prod/DIG PROD/Fourthwall/fourthwall-header-code.html` and `-footer-code.html`
   - Footer code is **done** — GA4 measurement ID `G-54RDJL98V9` is real, pulled directly from the live blog's `SEO.astro` (reuses the blog's own GA4 property, same approach as CAD)
   - Header code still needs the Pinterest Tag ID pasted in — needs its own UK Pinterest business account Tag (separate from CAD's, different account/ID). Create in Pinterest Ads Manager → Ads → Conversions → Pinterest Tag, then replace both `YOUR_TAG_ID` instances
   - **Pinterest Tag is the only tracking piece still missing** for UK too — GA4 is already wired

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

1. **Neither store has a Pinterest Tag yet** — both header code files are ready except for this one ID each (see above)
2. **CAD has zero products right now** — the entire `CAD dig prod/` product folder (Organization Suite, Wall Art Bundle, Storage Budget Kit, Seasonal Reset Kit) is gone from disk and git history as of 2026-07-31, cause not fully reconstructed. UK still has its 2 spec-only products (Wall Art Bundle, Colour Scheme Kit), neither built yet — no product images exist for either
3. **CAD's own product plan said not to launch yet** even when products existed — sequenced as Phase 4, gated on free lead magnet validation. That gate still applies once CAD has products again.

Logos are **not** a blocker — both exist and are ready to upload as-is (see each section above).

## Suggested order

1. Upload the existing logos and set brand colours + fonts in both stores' Branding settings (5 minutes each, values are all above)
2. Paste both stores' footer code now (GA4 is ready) — get Pinterest Tags created and paste the header code when that's done
3. Leave collections/navigation structured but products unpublished until CAD has products again and the lead-magnet validation gate clears for both

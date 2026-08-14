# SmallSpace Home — Pinterest SEO

Covers the 4 areas of Pinterest-platform SEO that can't be fixed from the codebase (unlike
Rich Pins, which are already correctly configured — verified 2026-07-28: `p:domain_verify`,
full Open Graph/`article:*` tags present in `src/components/SEO.astro`). Everything below is
a manual-apply brief — no Pinterest board-management API is connected, so these changes get
made by hand in the Pinterest dashboard.

**Source for keyword data:** Pinterest's own guided-search/board-search volume data (via web
research, 2026-07-28) plus this site's own GSC data (`CANADA-ANALYTICS.md`) and Pinterest
Analytics (per-board engagement, same file).

---

## 1. Keyword bank

Real Pinterest search terms in this niche (renter / small apartment / Canada), ranked by
relevance to existing content:

- small apartment storage, small apartment organization, apartment storage hacks, apartment
  storage solutions, small apartment hacks, organization ideas for renters
- rental friendly storage ideas, renter friendly house ideas, rental apartment hacks, rental
  must haves, small rental storage ideas, rent friendly storage
- small apartment solutions, styling a studio apartment, cute ideas for apartments, apartment
  tips and tricks
- apartment decor on a budget (matches the site's own top-selling angle already)

**Confirmed independently by this site's own GSC data:** "where can i buy bathroom storage
units that work in a rented flat?" (pos 4.7, see `CANADA-ANALYTICS.md`) — the words "storage,"
"rented," and "small/tiny" recur across every real signal this account has (GSC + Pinterest
board engagement rates). Board and pin copy should lean into these three words specifically,
not generic "home decor" language.

---

## 2. Board names & descriptions

**Current board names are too generic** — Pinterest's own 2026 SEO guidance is explicit that
vague board names ("Decor," "storage") rank worse than specific, niche ones ("Small Apartment
Storage Ideas" beats "Storage" the same way "Keto Meal Prep for Beginners" beats "Healthy
Food"). Current names (from board URLs in Pinterest Analytics): **Decor, Storage,
Organization, Budget Tips.**

| Current | Recommended new name | Recommended description (paste into board settings) |
|---|---|---|
| Decor | **Small Apartment Decor Ideas** | Renter-friendly small apartment decor ideas for Canadians — no-drill, deposit-safe styling for tiny living rooms, bedrooms, and studios. Real Canadian rentals, real prices. |
| Storage | **Small Apartment Storage Ideas** | Small apartment storage solutions for renters — bathroom, bedroom, kitchen, and closet storage that works in tiny Canadian rentals without permanent changes. |
| Organization | **Small Apartment Organization Ideas** | Room-by-room small apartment organization ideas for Canadian renters. Budget-friendly systems for kitchens, closets, and every tiny corner. |
| Budget Tips | **Apartment Decor on a Budget** | Budget apartment decor and organization ideas for Canadian renters — real CAD prices, dollar store and IKEA finds, no-reno makeovers. |

**Note on renaming:** renaming a Pinterest board does not reset its pin count, follower count,
or analytics history — it's a safe, reversible change. Board URL slugs may change on rename;
low risk since these aren't linked from the blog itself.

---

## 3. Profile bio & account settings

**Recommended bio** (Pinterest limit: 160 characters — this is 143):

> Small space living tips for Canadian renters 🏠 Storage, organization & budget decor for tiny apartments. New ideas weekly → smallspacehome.ca

**Settings checklist** (verify these — not yet confirmed done in this repo's history):
- [ ] Country/Region set to Canada
- [ ] Profile language set to English (Canada) if available, else English
- [ ] Website claimed and verified (should already be true — `p:domain_verify` meta tag is
      live on the site, which only works after claiming)
- [ ] All 4 boards are **Public** (secret boards get zero search visibility per Pinterest's own
      ranking rules — worth a quick check since this wasn't explicitly confirmed anywhere in
      the existing docs)

---

## 4. Pin title & description templates

The pin *images* already have headline text baked in (via `pin-generator`), but the separate
**title** and **description** fields entered when uploading to Pinterest are a distinct SEO
surface Pinterest actually indexes for search — these matter independently of the image text.

**Formula:** Title = keyword front-loaded, ≤100 characters. Description = 2-3 natural
sentences, keyword used once, soft CTA, ≤500 characters.

| Board | Example pin | Title | Description |
|---|---|---|---|
| Storage | small-apartment-bathroom-storage | Small Apartment Bathroom Storage Ideas | Small apartment storage solutions for tiny rental bathrooms — real products, real Canadian prices, nothing that needs drilling or losing your deposit. See the full guide. |
| Storage | small-apartment-laundry-storage-ideas | Small Apartment Laundry Storage Ideas | Renter-friendly laundry storage for small Canadian apartments — organize detergent, hampers, and drying racks without permanent fixtures. Full ideas inside. |
| Organization | small-apartment-organization | Small Apartment Organization Ideas | Room-by-room small apartment organization for Canadian renters — kitchen to closet, budget-friendly systems that actually stick. See the full plan. |
| Decor | apartment-decor-ideas | Apartment Decor Ideas for Renters | Renter-friendly apartment decor ideas that actually work in small Canadian rentals — no nails, no lost deposit. Full styling guide inside. |
| Budget Tips | apartment-decor-ideas-on-a-budget | Apartment Decor on a Budget (Under $200 CAD) | Style a whole room for under $200 CAD — real prices, real Canadian sources, no-reno apartment decor on a budget. Full breakdown inside. |

Apply this same formula to the rest of the 30+ published posts when scheduling new pins —
keyword first in the title, one natural keyword mention in the description, always link to
the specific post URL (never the homepage).

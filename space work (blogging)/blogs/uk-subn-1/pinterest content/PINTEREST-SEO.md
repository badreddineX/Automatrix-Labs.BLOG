# British Home Interior — Pinterest SEO

Covers the 4 areas of Pinterest-platform SEO that can't be fixed from the codebase (unlike
Rich Pins, which are already correctly configured — verified 2026-07-28: `p:domain_verify`,
full Open Graph/`article:*` tags present in `src/components/SEO.astro`). Everything below is
a manual-apply brief — no Pinterest board-management API is connected, so these changes get
made by hand in the Pinterest dashboard.

---

## 0. Priority fix, before anything else below: check the Kitchen board is public

`SOCIAL_STRATEGY.md` documents all 4 boards (Living Room, Bedroom, **Kitchen**, Room
Makeovers) starting **Secret**, switched to Public individually once each hits 10 pins. Every
Pinterest Analytics pull logged in `UK-ANALYTICS.md` so far (2026-07-26, 2026-07-28) shows
impression data for only **3 boards** — living-room-ideas-uk, bedroom-ideas-uk,
room-makeovers-uk. **Kitchen has never once shown up in the data.**

This matters far more than any keyword/description tweak below: **kitchen-on-a-budget-uk
alone is 48% of the site's entire GSC impression volume** (see `UK-ANALYTICS.md`), and the
site has 8 published kitchen posts (`kitchen-on-a-budget-uk`, `kitchen-decor-ideas-uk`,
`budget-kitchen-cabinet-makeover-uk`, `budget-kitchen-splashback-tile-ideas-uk`,
`budget-kitchen-worktop-makeover-uk`, `rental-kitchen-upgrade-ideas-uk`, and 2 more) — the
single best-performing content on the entire site may currently have **zero live Pinterest
presence**. Check whether the Kitchen board has 10+ pins and is set to Public; if not, that's
the single highest-value fix available anywhere in this document.

---

## 1. Keyword bank

Pinterest keyword research didn't return UK-specific search volume (most tools/data are
US-weighted), so this leans on general home-decor Pinterest search patterns plus this site's
own two independent trend confirmations already logged: (1) Pinterest's Spring 2026 Trend
Report's kitchen-color category (the largest, highest-growth category in that whole report —
see prior trend research, now reverted as a pin batch but the keyword data itself is still
valid), and (2) this site's own GSC data showing kitchen-on-a-budget as 48% of all impressions.

- kitchen ideas UK, kitchen on a budget UK, budget kitchen makeover, kitchen cabinet ideas,
  kitchen splashback tiles, kitchen worktop ideas
- living room ideas UK, small living room ideas, living room colour schemes, budget living
  room ideas
- bedroom ideas UK, bedroom colour ideas, cosy bedroom ideas, bedroom makeover UK
- budget home makeover UK, rented flat makeover, rental kitchen upgrade

Pattern to lean into: "UK," "budget," and specific room+element combos ("kitchen splashback,"
"kitchen worktop") outperform generic "home decor" phrasing — matches what already works in
this site's GSC data.

---

## 2. Board names & descriptions

Current board names (per `SOCIAL_STRATEGY.md`) are already reasonably specific — "Living Room
Ideas UK" etc. beat generic single-word names. Descriptions aren't documented anywhere yet;
recommendations below fill that gap.

| Board | Keep name as-is? | Recommended description (paste into board settings) |
|---|---|---|
| Living Room Ideas UK | Yes | Budget-friendly living room ideas for UK homes — colour schemes, small living room layouts, and styling tips for renters and homeowners. |
| Bedroom Ideas UK | Yes | UK bedroom decor and colour ideas — cosy, budget-friendly bedroom makeovers and styling for British homes. |
| Kitchen Ideas UK | Yes (**but see Section 0 — public status matters more than the name**) | Budget kitchen ideas for UK homes — cabinet makeovers, worktops, splashback tiles, and kitchen decor that doesn't need a full renovation. |
| Room Makeovers UK | Yes | Budget home makeovers for British homes — whole-room transformations on a real budget, before-and-afters, rental-friendly upgrades. |

---

## 3. Profile bio & account settings

**Recommended bio** (Pinterest limit: 160 characters — this is 148):

> Budget-friendly UK home decor 🇬🇧 Kitchen, living room & bedroom ideas that don't need a full reno. New ideas weekly → britishhomeinterior.co.uk

**Settings checklist** (verify these):
- [ ] **Kitchen board is Public with 10+ pins** (see Section 0 — top priority)
- [ ] Country/Region set to United Kingdom (per `SOCIAL_STRATEGY.md`'s own existing checklist
      — worth re-confirming, not known to be done)
- [ ] Profile language set to English (UK)
- [ ] Website claimed and verified (should already be true — `p:domain_verify` is live)

---

## 4. Pin title & description templates

`SOCIAL_STRATEGY.md` already documents a per-pin checklist (title ≤100 chars keyword-first,
description 2-3 sentences ≤500 chars). Applying that formula with the keyword bank above:

| Board | Example pin | Title | Description |
|---|---|---|---|
| Kitchen Ideas UK | kitchen-on-a-budget-uk | Kitchen on a Budget UK — 14 Upgrades | Budget kitchen ideas for UK homes — 14 upgrades that transform a kitchen without a full renovation. Real high-street prices, real British kitchens. See the full guide. |
| Kitchen Ideas UK | budget-kitchen-cabinet-makeover-uk | Budget Kitchen Cabinet Makeover UK | A budget kitchen cabinet makeover for UK homes — paint, hardware, and styling swaps that change the whole room without new cabinets. Full breakdown inside. |
| Living Room Ideas UK | living-room-colour-schemes-uk | Living Room Colour Schemes for UK Homes | 11 tested living room colour schemes for UK light and homes — pairings that actually work, not just look good in a photo. See all 11 inside. |
| Bedroom Ideas UK | bedroom-colour-ideas-uk | Bedroom Colour Ideas UK | The best bedroom paint colours for UK homes in 2026 — tester-pot-first picks that won't feel wrong once they're on the wall. Full colour guide inside. |
| Room Makeovers UK | budget-home-makeover-uk | Budget Home Makeover UK (Under £150) | Transform any room in a UK home for under £150 — a real-budget makeover guide, one weekend, no builders needed. See the full plan. |

Apply this same formula to the rest of the published posts when scheduling new pins — keyword
first in the title, one natural keyword mention in the description, always link to the
specific post URL (never the homepage).

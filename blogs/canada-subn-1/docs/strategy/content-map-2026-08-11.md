# Canada Content Map & Internal-Link Audit (2026-08-11)

Source of truth for cannibalization, orphan status, and internal-link planning before
resuming daily publishing. Built from `src/content/blog/*.md` frontmatter + a grep-based
inbound-link count (`/blog/<slug>` references in other articles' body/FAQ markdown).

**Correction (2026-08-11, later same day):** the "0 inbound" orphan counts above only
measured manual in-body markdown links. The site already had a build-time auto related-posts
algorithm (`[slug].astro`, category+tag scoring) rendering related-article cards regardless —
so no article was ever fully unlinked in production, just under-linked by editorial choice.
**Status: implemented.** Added an optional `relatedPosts` frontmatter field (content.config.ts)
that overrides the auto-scoring when set, falling back to it otherwise. Populated for the 22
articles flagged in this audit (11 new-batch orphans, 8 pre-existing orphans, the 3-article
budget-decor subset, and the how-to-decorate/small-space-living-room-ideas cross-link) — see
commit `e7c1a89`. Remaining ~35 articles still rely on the auto-fallback, which is fine for
well-behaved hub/spoke clusters (storage, organization) — only override where the auto-score
would pick a worse match than an editorial decision.

**Rubric used for cannibalization calls:** two articles compete only if they'd satisfy
the *same reader action* (same room/context + same budget tier + same next-step). Same
keyword phrase with a different room, different price point, or different constraint
(renter/no-drill vs. general) is differentiation, not cannibalization.

**Status legend:** 🟢 Keep as-is · 🟡 Review (borderline overlap, decide case-by-case) ·
🔴 Cannibalization risk (same intent, needs merge/differentiate/redirect decision)

## Orphan pages (0 inbound internal links) — 19 of 57

All 10 of yesterday's trend batch are here by definition (too new to have been linked
from elsewhere yet) — that's expected, not a defect, **as long as they get linked within
the next internal-linking pass**. The other 9 are older and genuinely under-linked.

| Slug | Title | Category | Note |
|---|---|---|---|
| budget-apartment-decor-under-50 | Budget Apartment Decor Ideas Under $50 CAD | Budget Tips | new batch |
| cheapest-ways-rental-feel-stylish | Cheapest Ways to Make a Rental Feel More Stylish | Budget Tips | new batch |
| dollarama-finds-look-expensive | Dollarama Finds That Actually Look Expensive | Budget Tips | new batch |
| renter-friendly-bike-storage-small-apartments | Renter-Friendly Bike Storage (No Garage) | Storage | new batch |
| small-apartment-beauty-skincare-storage | Small Apartment Beauty & Skincare Storage | Organization | new batch |
| small-apartment-home-gym-storage-setup | Small Apartment Home Gym Storage & Setup | Storage | new batch |
| small-apartment-pantry-organization-budget | Small Apartment Pantry Organization on a Budget | Storage | new batch |
| small-apartment-paperwork-mail-organization | Small Apartment Paperwork & Mail Organization | Organization | new batch |
| small-apartment-pet-supply-organization | Small Apartment Pet Supply Organization | Organization | new batch |
| small-apartment-shoe-storage-ideas | Small Apartment Shoe Storage Ideas | Storage | new batch (pushed) |
| small-apartment-storage-bins-baskets-guide | Storage Bins & Baskets Guide | Storage | new batch (pushed live) |
| command-strip-decorating-hacks-renters | 15 No-Damage Command Strip Hacks | Decor | pre-existing, unlinked |
| facebook-marketplace-furnishing-budget | Facebook Marketplace Finds for Furnishing | Budget Tips | pre-existing, unlinked |
| free-cheap-apartment-decor-diy-vs-buy | Free & Cheap Apartment Decor: DIY vs. Buy | Budget Tips | pre-existing, unlinked |
| renter-friendly-gallery-wall-ideas | 15 Renter-Friendly Gallery Wall Ideas | Decor | pre-existing, unlinked |
| small-apartment-coffee-corner-ideas | 15 Coffee/Cafe Corner Ideas | Decor | pre-existing, unlinked |
| small-apartment-plant-corner-ideas | 12 Plant Corner Ideas | Decor | pre-existing, unlinked |
| vertical-storage-ideas-small-apartment | 12 Vertical Storage Ideas (No Drilling) | Storage | pre-existing, unlinked |
| vibey-apartment-living-room-ideas | Vibey Apartment Living Room Ideas | Decor | pre-existing, unlinked |

## Cannibalization clusters

### 🔴 Budget decor cluster — highest risk, 6 articles
Same core intent ("decorate cheaply as a renter") published across multiple price
framings. Google may struggle to differentiate; likely to split ranking signal.

| Slug | Angle | Inbound |
|---|---|---|
| apartment-decor-ideas-on-a-budget | Under $200 CAD, general | 8 |
| budget-apartment-decor-under-50 | Under $50 CAD | 0 |
| cheapest-ways-rental-feel-stylish | "Cheapest ways," no price anchor | 0 |
| free-cheap-apartment-decor-diy-vs-buy | Free/DIY vs. buy decision framework | 0 |
| dollarama-finds-look-expensive | Single-retailer (Dollarama) angle | 0 |
| facebook-marketplace-furnishing-budget | Single-channel (FB Marketplace) angle | 0 |

**Recommended action:** designate `apartment-decor-ideas-on-a-budget` (highest existing
authority, 8 inbound) as the budget-decor hub. The retailer-specific ones (Dollarama,
Marketplace) and the DIY-vs-buy framework piece are genuinely distinct sub-intents —
keep, but link them all from the hub and from each other as siblings. **Reconsider**
whether `cheapest-ways-rental-feel-stylish` adds anything `apartment-decor-ideas-on-a-budget`
doesn't already cover — closest candidate for merge/redirect.

### 🟡 General decor cluster — review
| Slug | Angle | Inbound |
|---|---|---|
| apartment-decor-ideas | General decor, Canadian renters | 8 |
| renter-friendly-apartment-decor-ideas | No-damage/deposit-safe angle | 15 |
| minimalist-small-apartment-ideas | Minimalist style angle | 3 |
| small-space-decorating | "14 rules," principles-first | 3 |

Differentiated enough by style/constraint angle to keep separate — `renter-friendly-*`
is clearly the no-damage hub (already well-linked, 15 inbound). No action needed beyond
normal internal linking.

### 🟡 Small living room cluster — review
| Slug | Angle | Inbound |
|---|---|---|
| how-to-decorate-a-small-living-room | Decor-focused | 4 |
| small-space-living-room-ideas | General ideas listicle | 7 |
| small-living-room-storage-solutions | Storage-focused | 3 |

Storage one is clearly distinct (different intent: buying furniture vs. styling). The
decor vs. "ideas listicle" pair is the closest overlap in the whole site — same room,
same audience, similar framing. **Recommend differentiating explicitly**: keep
`how-to-decorate-a-small-living-room` as the how-to/process piece and reposition
`small-space-living-room-ideas` toward inspiration/gallery framing if it isn't already,
otherwise merge.

### 🟢 Room-specific storage — keep (hub-and-spoke working as intended)
`storage-ideas-for-small-places` (23-ideas roundup, 19 inbound) is functioning as the
storage hub. Room-specific spokes (bedroom, bathroom, closet, entryway, balcony,
laundry, kitchen/pantry, shoe, pet, beauty, home gym, paperwork, bins/baskets, under-bed,
vertical, seasonal) are genuinely differentiated by room/context — this is the cluster
model working correctly, not a risk. Action needed is linking, not differentiation:
11 of these spokes are still orphans (see table above) and need a link from the hub.

### 🟢 Organization cluster — keep
`small-apartment-organization` (25 inbound, clear hub) vs. budget variant (`-on-a-budget`,
14 inbound) vs. seasonal variants (`january-reset-organization-ideas`,
`spring-cleaning-organization-tips`) — differentiated by budget tier and season/timing.
No action needed.

## Bottom line before resuming publishing

1. Link the 19 orphans into their nearest hub — highest-leverage, lowest-risk fix.
2. Decide the 🔴 budget-decor cluster call (recommend: keep all 6, but merge
   `cheapest-ways-rental-feel-stylish` into `apartment-decor-ideas-on-a-budget` unless
   it's carrying meaningfully distinct GSC query data already).
3. Decide the 🟡 small-living-room decor-vs-ideas overlap.
4. Once 1–3 are resolved, define `relatedPosts:` frontmatter per article and build the
   Astro related-posts component off this map.
5. New articles going forward must have their hub + sibling links identified *before*
   publishing, not after.

## Maintenance rules (added 2026-08-11)

**Table schema, going forward:** every row added to this map from now on (new articles,
or existing ones as they get touched) should carry these fields, not just URL/category/
inbound-links:

| Field | Source |
|---|---|
| Primary query | GSC "queries" for that URL once it has impressions, or the target keyword at write-time if pre-launch |
| Secondary queries | Same, top 2-3 by impressions once available |
| Last updated | `dateModified` from frontmatter — already tracked per-post, just needs surfacing here |

Not backfilling this for all 57 existing rows in one pass — that requires real GSC query
data per URL, which is pull-as-you-go, not something to fabricate. Add it opportunistically
during the next GSC pull or whenever an article gets refreshed.

**Mandatory pre-publish check:** before any new Canada article gets written, check this
map (Ctrl+F the target keyword/topic) for an existing URL already covering the same
reader action. Same room + same budget tier + same next-step as an existing article means
update that article instead of publishing a new one. This applies on top of the existing
one-article/day rule from `SEO-GROWTH-PLAN-2026-2027.md` — the daily cadence rule says
*when* to publish, this rule says *whether* a new URL is warranted at all.

**Recurring orphan re-check:** after every published batch (including single-article days),
re-run the inbound-link count for any article published in the last 30 days. A `datePublished`
older than 30 days with 0 inbound links is a real orphan needing a fix, not just "too new to
be linked yet." This map's data is a point-in-time snapshot (2026-08-11) — don't treat it as
current beyond the next batch.

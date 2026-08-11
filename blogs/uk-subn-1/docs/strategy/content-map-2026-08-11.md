# UK Content Map & Internal-Link Audit (2026-08-11)

Companion to the Canada content map (same date). Same rubric: two articles compete only
if they satisfy the same reader action (same room/context + same budget tier + same
next step). Room-specific or style-specific differentiation is fine; same room + same
angle is not.

**Status legend:** 🟢 Keep as-is · 🟡 Review · 🔴 Cannibalization risk

## Orphan pages (0 inbound internal links) — 19 of 58

Only 1 of yesterday's 10 new UK drafts is actually live (`small-living-room-storage-ideas-uk`
— pushed 2026-08-11). The other 9 in this list are sitting locally, unpushed, restored to
disk after the revert (see prior session) — they show as orphans here because the audit
reads the working tree, not just what's live. Treat them as "not yet in scope" until pushed.

| Slug | Title | Category | Status |
|---|---|---|---|
| small-living-room-storage-ideas-uk | Small Living Room Storage Ideas UK | Living Room | **live**, orphan |
| bedroom-lighting-ideas-uk | Bedroom Lighting Ideas for UK Rentals | Bedroom | local only |
| funhaus-decor-ideas-uk | FunHaus Decor Ideas UK | Room Makeovers | local only |
| living-room-lighting-ideas-uk | Living Room Lighting Ideas for UK Rentals | Living Room | local only |
| renter-friendly-bedroom-ideas-uk | Renter-Friendly Bedroom Ideas UK | Bedroom | local only |
| scandi-living-room-ideas-uk | Scandi Living Room Ideas for UK Homes | Living Room | local only |
| small-bedroom-budget-uk | Small Bedroom on a Budget UK | Bedroom | local only |
| small-living-room-budget-uk | Small Living Room on a Budget UK | Living Room | local only |
| soft-minimalism-living-room-ideas-uk | Soft Minimalism Living Room Ideas | Living Room | local only |
| afrobohemian-decor-ideas-uk | Afrobohemian & Global Decor Ideas UK | Room Makeovers | live, unlinked |
| grandma-core-kitchen-ideas-uk | Grandma Core Kitchen Ideas UK 2026 | Kitchen | live, unlinked |
| hidden-pantry-ideas-uk | Hidden Pantry Ideas for Small UK Kitchens | Room Makeovers | live, unlinked |
| multifunctional-furniture-ideas-uk | Smart Multifunctional Furniture UK | Room Makeovers | live, unlinked |
| opera-inspired-living-room-ideas-uk | Opera-Inspired Living Room Ideas UK | Room Makeovers | live, unlinked |
| plant-styling-ideas-uk | Low-Light Apartment Plant Ideas UK | Room Makeovers | live, unlinked |
| small-kitchen-island-ideas-uk | Small Kitchen Island Ideas UK | Room Makeovers | live, unlinked |
| unfitted-kitchen-ideas-uk | Unfitted Kitchen Ideas UK | Room Makeovers | live, unlinked |
| vertical-storage-ideas-uk-flats | Vertical Storage Ideas for UK Flats | Room Makeovers | live, unlinked |
| renter-friendly-living-room-ideas-uk | Renter-Friendly Living Room Ideas UK | Living Room | local only, 1 inbound from another local file — treat as orphan for live purposes |

## Cannibalization clusters

### 🔴 "General home decor" pair — highest risk, 2 articles
Near-identical generic framing, both currently live:

| Slug | Angle | Inbound |
|---|---|---|
| home-decor-inspiration-uk | "Home Decor Inspiration UK" | 2 |
| home-interior-ideas-uk | "Home Interior Ideas UK" | 5 |

No differentiating angle visible from the titles alone — both read as generic
site-wide decor roundups. **Recommend reviewing both articles' actual content**: if they
cover different rooms/scope, retitle to make that explicit; if they genuinely overlap,
merge into whichever has stronger GSC performance (check before deciding — `home-interior-ideas-uk`
has more inbound links currently, but that's not the same as ranking performance).

### 🟡 Living room "general ideas" pair — review
| Slug | Angle | Inbound |
|---|---|---|
| small-living-room-ideas-uk | "11 Small Living Room Ideas" — listicle | 17 |
| how-to-style-a-living-room-uk | Process/how-to framing | 15 |

Both are the two highest-authority living-room pages on the site (17 and 15 inbound),
both non-style-specific. Framing (listicle vs. how-to process) is a real differentiator
if the content actually follows through on it — worth a quick read-through to confirm
they don't just restate the same 10 tips in different order. Do **not** merge without
checking GSC query data first — high combined authority suggests these may already be
ranking for different queries.

### 🟡 Bedroom "general ideas" trio — review
| Slug | Angle | Inbound |
|---|---|---|
| bedroom-decor-ideas-uk | "12 Bedroom Decor Ideas" | 7 |
| cosy-bedroom-ideas-uk | "14 Cosy Bedroom Ideas" — cosy angle | 7 |
| bedroom-makeover-uk | "13 Bedroom Makeover Ideas" — makeover/before-after framing | 5 |

"Cosy" and "makeover" are real angles if content commits to them; "decor ideas" is the
generic catch-all and is the one most likely to overlap with the other two piecemeal.
Lower priority than the two 🔴/🟡 items above — revisit after those are resolved.

### 🟢 Kitchen component cluster — keep (hub-and-spoke working as intended)
`kitchen-on-a-budget-uk` (13 inbound) functions as the budget-kitchen hub; component-specific
spokes (`budget-kitchen-cabinet-makeover-uk`, `-flooring-`, `-splashback-tile-`, `-worktop-`,
`small-kitchen-storage-ideas-budget-uk`) are genuinely differentiated by which part of the
kitchen they cover. Same pattern as Canada's storage cluster — no differentiation issue,
just needs the 2-inbound spokes linked more from the hub and each other.

### 🟢 Renter-friendly cluster — keep
`rented-flat-makeover-uk` (16 inbound, clear hub) vs. room-specific renter-friendly spokes
(bedroom, living room, gallery wall, kitchen) — differentiated by room. Working correctly.

### 🟢 Style-specific bedroom/living-room articles — keep
Scandi, cottagecore, maximalist, dark & moody, soft minimalism, afrobohemian, opera-inspired,
FunHaus — each targets a distinct aesthetic/style, not competing with each other or with
the general-ideas pages above (assuming the general pages don't lean into any one style).

## Bottom line before resuming UK publishing

1. Push or hold the 9 local-only drafts — they're not live yet, so no urgency, but they
   shouldn't go out without a linking plan (same rule as Canada going forward).
2. Resolve the 🔴 `home-decor-inspiration-uk` vs. `home-interior-ideas-uk` overlap —
   read both, check GSC, decide keep/retitle/merge.
3. Sanity-check the 🟡 living-room and bedroom "general ideas" clusters aren't just
   restating each other before assuming they're fine.
4. Link the 9 live orphans into their nearest hub (kitchen spokes → `kitchen-on-a-budget-uk`,
   room-makeover pieces → `rented-flat-makeover-uk` or a relevant style hub).
5. Feed into the same `relatedPosts:` frontmatter + Astro component work planned for Canada.

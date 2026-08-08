# UK (britishhomeinterior.co.uk) — Traffic Growth Plan

Written 2026-07-29, based on GSC (API pulls + raw `Graphique.csv`/`Pages.csv`/`Requêtes.csv`
exports), GA4, and Pinterest data logged in `../UK-ANALYTICS.md` through 2026-07-29. Site is
tracking Canada's launch curve almost exactly, roughly 1 week behind. This plan is scoped to what
the data actually supports, mirroring the equivalent Canada plan
(`../../canada-subn-1/docs/TRAFFIC-GROWTH-PLAN-2026-07-29.md`) where the same conclusion applies,
and calling out where UK's data diverges.

## Where the data says traffic is actually coming from

- **Organic Search:** 1 real lifetime click (`Graphique.csv`: 07-26=1, CTR 1.96%, pos 41.5), all
  other days 0. Impressions climbing fast (320 → 916+), best positions still 27-45. Same
  conclusion as Canada: too early for this channel to matter, not a defect.
- **Organic Social (Pinterest):** growing (0 → 25 GA4 sessions across pulls) but roughly half of
  Canada's current level — expected, since the UK Pinterest account started ~5 days later.
- One open anomaly: **07-27 had a 314-impression spike in GSC**, roughly 2-4x every other day
  (51-159 range), with 0 clicks. Not yet explained — worth checking again next pull rather than
  acting on now.

**Conclusion: same as Canada — for the next 3-4 weeks, traffic growth is a Pinterest problem, not
an SEO problem.** Hold on SEO changes through 2026-08-24 stands.

## Priority 1 — Diagnose the UK save-rate gap specifically (this week)

Canada recorded its first-ever Pinterest save on 2026-07-29 (budget-tips board). **UK is still at
zero saves across every board, every pull, with no exception yet.** Both accounts are otherwise
following the same growth curve, so if UK is still flat at zero next pull while Canada holds or
grows its save count, that's a real signal specific to UK's pin creative (not just "earlier in the
curve") — worth a direct side-by-side comparison against whichever Canada pin/board just earned
its save. UK's own outlier pin (`...137361624`, 119 impressions vs. 18 for #2) is the best
candidate to study and replicate first, same logic as Canada's Priority 1.

## Priority 2 — Close the monetization loop on the strongest UK content (this week)

Two facts point at where to start: `kitchen-on-a-budget-uk` is the dominant topic cluster (48% of
all GSC impressions), and `living-room-ideas-uk` is the clear Pinterest engagement/outbound-click
leader (6.5% engagement, both of the account's outbound clicks). The 3 storage articles ported
from Canada on 2026-07-25 (small-flat-storage-ideas-uk, small-bedroom-storage-uk,
bathroom-storage-ideas-uk) are too new to have data yet but are worth including too, since
storage is Canada's proven strongest angle and UK had none before. As with Canada, the `Store /
Product Matching` table in `UK-ANALYTICS.md` is empty — add tracked product links to the
kitchen-budget cluster and the new storage articles, and start logging clicks.

## Priority 3 — Keep doing what's already working, don't add scope

- Continue the internal-linking work already done (4 links added 07-25 to kitchen-on-a-budget-uk
  and bedroom-makeover-uk) — extend the same pass to the 3 new storage articles once they've had
  a week to get indexed.
- **Do not repeat the reverted trend-pin experiment** (2026-07-28): a 9-pin kitchen-color-trend
  batch was built, found to duplicate existing pin creative (including one identical photo reuse),
  and reverted. Same lesson as Canada — check `pinterest-pins/` for overlap before building new
  trend-aligned creative.
- 8 of the original 11 `BLOGS TO POST` topic stubs are still unwritten — reasonable to keep
  writing through that backlog, but same rule as Canada applies: don't add pure-decor duplicates,
  favor specific angles (room + constraint + UK-specific detail, as the storage articles did with
  real GBP pricing and UK tenancy framing).

## What NOT to do yet

- **Don't react to the 07-27 impression spike or to SEO position movement before 2026-08-24.**
  One anomalous day and normal position noise (27-45 range) aren't a trend at this volume.
- **Don't scale pin or content volume yet.** The constraint is pin creative (zero saves) and the
  missing monetization link, not output volume — more volume on top of those gaps just produces
  more non-converting traffic, same as Canada.

## Checkpoints

- **Weekly:** has UK's save rate moved off zero? Did the 07-27 impression spike repeat or was it
  one-off?
- **2026-08-24:** full SEO/GA4 re-evaluation, as already decided for both sites. Also the first
  fair point to judge whether the new product links (Priority 2) produced any clicks.

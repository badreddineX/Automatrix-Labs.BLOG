# Canada (smallspacehome.ca) — Traffic Growth Plan

Written 2026-07-29, based on GSC (API pulls + raw `Chart.csv`/`Pages.csv`/`Queries.csv` exports),
GA4, and Pinterest data logged in `../CANADA-ANALYTICS.md` through 2026-07-29. Site is 2 weeks
old (launched 2026-07-16). This plan is deliberately scoped to what the data actually supports —
no action here is justified by "it might help," only by a specific number logged in the analytics
file.

## Where the data says traffic is actually coming from

- **Organic Search:** 4 real lifetime clicks (`Chart.csv`: 07-17=2, 07-25=1, 07-27=1), impressions
  climbing steadily (211 → 486+ over the month) but average position still 30-45. This channel is
  not yet a real traffic source and won't be for weeks — normal for a 2-week-old domain, not a
  defect.
- **Organic Social (Pinterest):** the only channel producing real, growing sessions today (GA4:
  1 → 25 sessions across 5 pulls). This is the actual growth lever right now, not SEO.
- **Direct:** the largest GA4 channel by raw count, but this is mostly the user/team checking the
  site plus residual Pinterest app-to-browser handoff misattribution — not a channel to "grow."

**Conclusion: for the next 3-4 weeks, traffic growth = Pinterest growth.** SEO is a lagging
indicator to monitor, not a lever to pull yet (holding per the existing 2026-08-24 recheck date).

## Priority 1 — Diagnose and replicate the outlier pin (this week)

One pin (`...961418931`) is at 371 impressions; the next-best is 41. That's not noise, it's a
signal the algorithm found something it likes about that specific pin. Before creating more pin
volume, look at what that pin's image/title/board actually does differently (subject matter,
composition, text overlay, color) and deliberately replicate the pattern on 2-3 new pins for other
articles. This is cheap (no new content needed, just new pin creative for existing articles) and
has the best evidence behind it of anything in this plan.

## Priority 2 — Close the monetization loop on the two proven-strongest articles (this week)

Two independent signals — Pinterest board performance (storage: 17.1% engagement rate,
12.1% pin-click rate; budget-tips: 20% engagement, 14.5% pin-click, and the account's first-ever
save) and GSC position (bathroom-storage article, best-positioned page site-wide) — agree that
storage/budget-organization content is the strongest angle on the site. The `Store / Product
Matching` table in `CANADA-ANALYTICS.md` is currently empty: no article has a tracked product
link. Add one to the bathroom-storage article and 1-2 other storage/budget posts, and start
logging clicks in that table. Growing Pinterest reach further before this exists means more people
arrive with nothing to convert on.

## Priority 3 — Keep doing what's already working, don't add scope

- Continue the internal-linking passes already underway (13 links added 07-25, 9 more the same
  day, 6 more 07-25) — this is confirmed to be closing real gaps, keep going opportunistically as
  new posts are written, no new process needed.
- **Do not write more general decor/organization content** — 5 near-duplicate decor posts and 2
  near-duplicate organization posts were already identified and the decision was to stop adding to
  that lane (see Scaling Decisions Log, 2026-07-21). New content must have a specific angle (room,
  constraint, season, region).
- The two identified content gaps — Quebec "Moving Day" (July 1 lease turnover) and September
  student-lease wave — are still unwritten. These are still the two highest-evidence topics to
  write next, timed as already planned (May and early August respectively).
- **Do not repeat the reverted trend-pin experiment** (2026-07-28): a batch of 10 trend-aligned
  pins was built, then found to duplicate existing pin creative and was reverted. If revisiting
  Pinterest trend data, check the existing `pinterest-pins/` library first for overlap before
  building anything new.

## What NOT to do yet

- **Don't react to SEO position/click movement before 2026-08-24.** Every entry in the Scaling
  Decisions Log since 07-24 confirms this hold and nothing in this week's data changes that.
  Individual day swings (e.g. position hitting 24-30 on some days in the raw `Chart.csv`) are
  noise at this volume, not a trend.
- **Don't scale total content or pin volume yet.** The constraint right now isn't volume, it's
  (a) pin creative quality (save rate still near-zero) and (b) the missing monetization link — more
  volume on top of those gaps just produces more of the same non-converting traffic.

## Checkpoints

- **Weekly:** Pinterest save rate — is it moving off zero beyond the single 07-29 save? Is the
  outlier-pin pattern (once identified) reproducing on the new test pins?
- **2026-08-09:** did the bathroom-storage internal-link push (deployed 07-26) move that query's
  position, per the timeline already set in the Scaling Decisions Log?
- **2026-08-24:** full SEO/GA4 re-evaluation, as already decided. Also the first point at which
  it's fair to judge whether the new product links (Priority 2) produced any clicks.

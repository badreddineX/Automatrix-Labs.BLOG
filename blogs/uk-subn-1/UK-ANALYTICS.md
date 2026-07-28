# UK (britishhomeinterior) — Analytics & Scaling Log

Tracks Google Search Console + Pinterest data over time so we can spot what's working and decide where to double down.

## How to update
Add a new dated entry at the top of the relevant log each time you pull fresh data (weekly or biweekly recommended). Keep old entries — the trend matters more than any single snapshot.

---

## Google Search Console

| Date | Total Clicks | Total Impressions | Avg CTR | Avg Position | Notes |
|------|-------------|--------------------|---------|--------------|-------|
| 2026-07-28 | 0 | 865 | 0% | — | Pulled via `blog-google` API, 28-day window (2026-06-30 to 07-25, GSC's 2-3 day lag). Impressions up 615 → 865 (+41%), the biggest single-pull jump either site has had. Still 0 clicks. Top query by volume: "affordable kitchen" (26 impr, pos 69.1) — `kitchen-on-a-budget-uk` cluster still dominates as expected. |
| 2026-07-27 | 0 | 615 | 0% | 45.2 (impression-weighted) | Pulled via `blog-google` API, 28-day window. 329 rows, 325 distinct queries, 18 pages. Impressions up again (536 -> 615, +15%). **The 07-26 "british home interiors" pos-4 spike is now confirmed noise as flagged**: that query has moved to a different page (`/about/`, not `/blog/home-interior-ideas-uk/`), impressions grew 1 -> 3, and position dropped to 23 — treat as settling, not a page-1 near-miss. `/blog/kitchen-on-a-budget-uk/` still dominates, now 297 of 615 impressions (48%, was 47%) at pos 44.8, confirming kitchen-budget as the clear #1 topic cluster. Best real (2+ impr) position this pull: a GEO-style long query on `/blog/kitchen-decor-ideas-uk/` at pos 10 (2 impr) — worth a glance next pull, still low-volume/noisy. Still 0 clicks — normal, matches the hold through 2026-08-24. |
| 2026-07-26 | 0 | 536 | 0% | 44.7 (impression-weighted) | Pulled via `blog-google` API, window 2026-06-28 to 07-23. 301 rows, 297 distinct queries, 18 pages. Impressions up again (443 -> 536). Still 0 clicks -- expected, matches the hold through 2026-08-24. **New best-ranked query: "british home interiors" at position 4** (1 impression) on `/blog/home-interior-ideas-uk/` -- first UK query ever seen near page 1 (previous best was pos ~27). Only 1 impression so treat as noisy/early, not confirmed, but worth watching next pull. `/blog/kitchen-on-a-budget-uk/` still dominates by volume -- 253 of 536 impressions (47%), pos 43.8. |
| 2026-07-25 | 0 | 443 | 0% | 44.1 (impression-weighted) | Window 2026-06-27 to 07-22 (GSC lag). Impressions up 320 -> 443. Still 0 clicks, still nothing near page 1 -- best individual query is "kitchen makeover on a budget uk" at pos 27.3 (11 impr), worse than Canada's best (pos 4.9). `/blog/kitchen-on-a-budget-uk/` dominates -- 205 of the 443 impressions (46%), confirming kitchen-budget as the strongest UK topic. |
| 2026-07-24 | 0 | 320 | 0% | — | First real pull. Via `blog-google` API (service account, `sc-domain:britishhomeinterior.co.uk`), 28-day window. 195 distinct queries. Zero clicks is normal — best position is only ~28 ("kitchen makeover on a budget uk"), nothing near page 1 yet. |

**Top performing queries** (as of 2026-07-24):
- "budget kitchens" — 9 impressions, position 45.1
- "cheap kitchen" — 9 impressions, position 71.9
- "kitchen makeover on a budget uk" — 9 impressions, position 28.2 (best-ranked query so far)
- "affordable kitchen" / "affordable kitchen renovations" — 8 impressions each, position ~28-72
- Living-room queries ("living room colour schemes," "living room ideas uk," "paint colour ideas for living room uk") also showing 4-6 impressions each, position 33-51

**Top performing pages**: not yet broken out by page in this pull — re-check with `dimensions=page` on next pull.

**Issues found** (as of 2026-07-24):
- Site is indexed with real impression volume (320, more than Canada's 211) across many long-tail queries, but nothing is close to page 1 yet — best is position ~28. Expected for month 1, not a technical problem.
- Kitchen-budget content is clearly the strongest topic cluster right now (most queries, most impressions) — worth reinforcing with more kitchen-on-a-budget content or internal links.

---

## Google Analytics (GA4)

| Date | Sessions | Users | Pageviews | Top Channel | Notes |
|------|----------|-------|-----------|-------------|-------|
| 2026-07-28 | 23 total | — | — | Direct (18), Organic Social (4), Organic Search (1) | 28-day window, property `properties/546917739`, pulled via direct GA4 channel-breakdown query (same method as 07-27). Sessions up 20 → 23 (+15%). Organic Social (Pinterest) doubled 2 → 4. Organic Search holds at 1 session (same one first seen 07-27, not a new occurrence) — GSC still shows 0 clicks in the same window. |
| 2026-07-27 | 20 total | 13 | 49 | Direct (17), Organic Social (2), Organic Search (1) | 28-day window, property `properties/546917739`, pulled via direct GA4 Data API channel-breakdown query (same method as Canada this pull — the skill's built-in `ga4_report` only surfaces the Organic Search channel). Sessions up 12 -> 20. **First-ever Organic Search session recorded** (1 session, 7 pageviews) — note this is GA4's channel classification (any search engine referral, not Google-specific) so it doesn't necessarily mean a live GSC click; GSC still shows 0 clicks this same window. Treat as a single early data point, not yet a trend. Organic Social held flat at 2 sessions — Pinterest CSV wasn't re-pulled this session (GA4/GSC only), so no fresh Pinterest number to compare against; check together next pull. |
| 2026-07-26 | 12 total (0 organic search) | 8 | 18 | Direct (12) | 28-day window, property `properties/546917739`. Sessions up from 2 to 12, all still Direct -- unlike Canada, no Organic Social (Pinterest) sessions yet, consistent with UK's `pinterest content/` folder being empty in-repo (pins scheduled outside this repo, not yet reflected here). Top landing page is homepage (11 of 12 sessions). |
| 2026-07-24 | 2 total (0 organic search) | 2 | 2 | Direct (2) | GA4 only installed 2026-07-23 — this is day-1 data, expected near-zero. Property `properties/546917739`. Zero Pinterest-referral sessions recorded yet. |

---

## Pinterest

| Date | Impressions | Saves | Outbound Clicks | Engaged Audience | Notes |
|------|------------|-------|------------------|-------------------|-------|
| 2026-07-26 | 149 (sum of daily, 07-17 to 07-26 -- prior days blank/zero) | 0 | 2 (sum across top 3 boards) | 11 (sum of engagement across top 3 boards) | Source: `Pinterest Analytics overview 20260626-20260726 (1).csv` (Downloads) -- first real UK Pinterest data, confirms the scheduled pins went live. Daily impressions: 0,0,0,0,0,12,16,37,75,9 -- started 5 days later than Canada's account (first impressions 07-22 vs. Canada's 07-19) but ramping fast; 07-25 (75, estimate) is the single biggest day either account has had. 07-25/07-26 figures are still Pinterest estimates, will adjust. |

**Top performing pins** (as of 2026-07-26):
- Pin `...137361624` — 29 impressions (top performer)
- Pin `...137365314` — 25 impressions
- Pin `...137369534` — 24 impressions
- Pin `...137441796` / `...137437804` — 17 impressions each
- Pin `...137445192` — 15 impressions
- 3 more pins at 3-4 impressions. All organic/from-you.

**Top performing boards** (as of 2026-07-26):
| Board | Impressions | Engagement | Pin clicks | Outbound clicks | Saves |
|---|---|---|---|---|---|
| living-room-ideas-uk | 51 | 8 | 6 | 2 | 0 |
| bedroom-ideas-uk | 64 | 3 | 3 | 0 | 0 |
| room-makeovers-uk | 34 | 0 | 0 | 0 | 0 |

**bedroom-ideas-uk has the most impressions (64) but lowest engagement rate (~5%)** — opposite pattern from `living-room-ideas-uk`, which has fewer impressions (51) but the highest engagement (~16%) and all 2 of the account's outbound clicks. `room-makeovers-uk` has zero engagement of any kind despite 34 impressions — worth watching, could just be a slower-to-convert board this early or a weaker pin/board match.

**Issues found** (low CTR pins, stale boards, seasonal drop-off, etc.):
- Only 3 boards showing data vs. Canada's 4 — UK account may have fewer boards set up, or others just haven't started getting impressions yet (same pattern Canada saw in its first week). Not urgent, re-check next pull.
- 0 saves across all boards (same as Canada at this stage) — not a red flag yet, one pull isn't a trend.
- GA4 UK still shows 0 Organic Social sessions (see GA4 table above) despite these 149 impressions and 2 outbound clicks — worth checking again next pull now that real Pinterest traffic exists, since Canada's GA4 Organic Social sessions do track its Pinterest outbound clicks reasonably well.

---

## Store / Product Matching

Which articles are driving traffic to which store products, and whether that traffic converts. This is the real scale signal — traffic without store clicks means the article/product match needs work.

| Date | Article | Matched Product(s) | Product Clicks | Purchases | Notes |
|------|---------|---------------------|-----------------|-----------|-------|
|      |         |                     |                 |           |       |

---

## Scaling Decisions Log

Running log of decisions made based on the data above (e.g. "doubling down on X topic cluster", "killing Y pin format", "adding store link to Z article").

- **2026-07-28 — First formal trend-aligned Pinterest plan drafted for UK, pending user approval.** Matches the same method just applied to Canada (`pinterest content/TREND-STRATEGY-WEEK-2026-07-31.md`). UK's kitchen-on-a-budget cluster (48% of all GSC impressions, the site's dominant topic) lines up almost perfectly with the largest, highest-growth category in Pinterest's Spring 2026 Trend Report — cabinet/color searches like "Aubergine kitchen" (+495%), "Dark cottagecore kitchen" (+915%, highest-growth term in the whole report), "Grandma core kitchen" (+545%), each mapped to an already-published kitchen post (budget-kitchen-cabinet-makeover-uk, cottagecore-home-decor-uk, budget-kitchen-splashback-tile-ideas-uk, etc.). **Not yet executed** — no pins created or scheduled, awaiting user approval.

- **2026-07-25 — Completed the UK keyword/on-page audit (same method as Canada).** Checked all 33 posts' titles/descriptions -- 7 descriptions ran 1-4 chars over 160, trimmed to fit. GSC clustering flagged `kitchen-on-a-budget-uk` (5 related queries, 205 impr, only 2 inbound links) and `bedroom-makeover-uk` (real ranking data, only 1 inbound link) as thin high-value pages. Added 4 internal links across 4 posts to strengthen both. Also confirmed all 11 zero-impression evergreen UK pages are properly indexed (PASS via URL Inspection) -- normal early-stage quiet, not a defect.
- **2026-07-25 — Published 3 storage articles ported from Canada's proven storage angle.** UK had zero storage/organisation content (100% decor/style/colour) while storage is Canada's best-performing category by two independent signals (Pinterest engagement + GSC rankings, see `CANADA-ANALYTICS.md`). Published `small-flat-storage-ideas-uk`, `small-bedroom-storage-uk`, and `bathroom-storage-ideas-uk` (matches 2 of the pre-existing "BLOGS TO POST" stub topics plus bathroom as a new addition -- Canada's #1 article had no UK stub). Real localisation: GBP prices from actual UK retailers, London/Manchester geography, UK tenancy-law framing. Linked into 4 existing posts reciprocally. **Next check:** did these get indexed and pick up impressions by 2026-08-24.
- **2026-07-26 — Sunday check-in: strategy confirmed on track, no changes made.** GSC impressions up 443→536 (+21%), new query hit pos 4 (noisy, 1 impression, watch not act). GA4 sessions up 2→12 (6x). Pinterest went live for the first time this pull -- 149 impressions already, ramping as fast as Canada did in its first days. One open item: UK GA4 shows 0 Organic Social sessions despite real Pinterest outbound clicks existing now -- worth checking again next pull, not urgent yet. Zero GSC clicks is still expected (GA4 3 days old) -- nothing here suggests the strategy isn't working, UK is tracking Canada's trajectory almost exactly, just ~1 week behind on Pinterest. Hold stands, next real re-evaluation is 2026-08-24.
- **2026-07-27 — Routine check, no changes made, hold confirmed.** GSC impressions up 536→615 (+15%), still nothing near page 1 (the 07-26 "british home interiors" pos-4 hit was noise, now settled to pos 23 on a different page). GA4 sessions up 12→20, first-ever Organic Search session recorded (1) but GSC still shows 0 clicks in the same window — a single data point, not a trend yet. kitchen-on-a-budget-uk remains the dominant topic cluster (48% of all impressions). Hold stands, next real re-evaluation is 2026-08-24.
- **2026-07-24 — GSC/GA4 API access confirmed working, first real data pulled.** See root `CLAUDE.md` for credentials/property IDs. Both metrics show normal month-1 numbers (zero clicks, near-zero GA4 sessions). Decision: hold on SEO/content changes, re-check ~2026-08-24. Pins + meta content for both Canada and UK are scheduled for the following week (confirmed by user, handled outside this repo) — no additional Pinterest setup action needed right now.

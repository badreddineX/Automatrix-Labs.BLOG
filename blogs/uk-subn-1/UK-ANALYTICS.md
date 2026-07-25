# UK (britishhomeinterior) — Analytics & Scaling Log

Tracks Google Search Console + Pinterest data over time so we can spot what's working and decide where to double down.

## How to update
Add a new dated entry at the top of the relevant log each time you pull fresh data (weekly or biweekly recommended). Keep old entries — the trend matters more than any single snapshot.

---

## Google Search Console

| Date | Total Clicks | Total Impressions | Avg CTR | Avg Position | Notes |
|------|-------------|--------------------|---------|--------------|-------|
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
| 2026-07-24 | 2 total (0 organic search) | 2 | 2 | Direct (2) | GA4 only installed 2026-07-23 — this is day-1 data, expected near-zero. Property `properties/546917739`. Zero Pinterest-referral sessions recorded yet. |

---

## Pinterest

| Date | Impressions | Saves | Outbound Clicks | Engaged Audience | Notes |
|------|------------|-------|------------------|-------------------|-------|
|      |            |       |                  |                   |       |

**Top performing pins**:
-

**Top performing boards**:
-

**Issues found** (low CTR pins, stale boards, seasonal drop-off, etc.):
- `pinterest content/` folder is currently empty as a repo artifact, but per user (2026-07-24) pins + meta content for both Canada and UK are already scheduled for the coming week outside this repo (e.g. in a scheduler tool) — not actually a gap, just not reflected in this folder. Re-check impressions/saves after that week's pins go live.

---

## Store / Product Matching

Which articles are driving traffic to which store products, and whether that traffic converts. This is the real scale signal — traffic without store clicks means the article/product match needs work.

| Date | Article | Matched Product(s) | Product Clicks | Purchases | Notes |
|------|---------|---------------------|-----------------|-----------|-------|
|      |         |                     |                 |           |       |

---

## Scaling Decisions Log

Running log of decisions made based on the data above (e.g. "doubling down on X topic cluster", "killing Y pin format", "adding store link to Z article").

- **2026-07-25 — Completed the UK keyword/on-page audit (same method as Canada).** Checked all 33 posts' titles/descriptions -- 7 descriptions ran 1-4 chars over 160, trimmed to fit. GSC clustering flagged `kitchen-on-a-budget-uk` (5 related queries, 205 impr, only 2 inbound links) and `bedroom-makeover-uk` (real ranking data, only 1 inbound link) as thin high-value pages. Added 4 internal links across 4 posts to strengthen both. Also confirmed all 11 zero-impression evergreen UK pages are properly indexed (PASS via URL Inspection) -- normal early-stage quiet, not a defect.
- **2026-07-25 — Published 3 storage articles ported from Canada's proven storage angle.** UK had zero storage/organisation content (100% decor/style/colour) while storage is Canada's best-performing category by two independent signals (Pinterest engagement + GSC rankings, see `CANADA-ANALYTICS.md`). Published `small-flat-storage-ideas-uk`, `small-bedroom-storage-uk`, and `bathroom-storage-ideas-uk` (matches 2 of the pre-existing "BLOGS TO POST" stub topics plus bathroom as a new addition -- Canada's #1 article had no UK stub). Real localisation: GBP prices from actual UK retailers, London/Manchester geography, UK tenancy-law framing. Linked into 4 existing posts reciprocally. **Next check:** did these get indexed and pick up impressions by 2026-08-24.
- **2026-07-24 — GSC/GA4 API access confirmed working, first real data pulled.** See root `CLAUDE.md` for credentials/property IDs. Both metrics show normal month-1 numbers (zero clicks, near-zero GA4 sessions). Decision: hold on SEO/content changes, re-check ~2026-08-24. Pins + meta content for both Canada and UK are scheduled for the following week (confirmed by user, handled outside this repo) — no additional Pinterest setup action needed right now.

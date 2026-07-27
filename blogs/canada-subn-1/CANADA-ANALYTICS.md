# Canada (smallspacehome.ca) — Analytics & Scaling Log

Tracks Google Search Console + Pinterest data over time so we can spot what's working and decide where to double down.

## How to update
Add a new dated entry at the top of the relevant log each time you pull fresh data (weekly or biweekly recommended). Keep old entries — the trend matters more than any single snapshot.

---

## Google Search Console

| Date | Total Clicks | Total Impressions | Avg CTR | Avg Position | Notes |
|------|-------------|--------------------|---------|--------------|-------|
| 2026-07-27 | 0 | 369 | 0% | 40.8 (impression-weighted) | Pulled via `blog-google` API, 28-day window. 177 rows, 152 distinct queries, 20 pages. Impressions up again (325 -> 369, +14%). **Bathroom-storage target query holds pos 4.9, impressions grew 14 -> 15** — the internal-link strategy deployed 2026-07-26 PM hasn't had time to move position yet (expected, Google crawl lag is 3-7 days), but the query is still healthy/stable, nothing suggests it stalled. New top-impression query this pull: "small space furniture" (17 impr, pos 24.5) on `/blog/small-space-furniture`, which is also the top page site-wide by impressions (94, avg pos 40.9). Still 0 clicks — normal, matches the hold through 2026-08-24. |
| 2026-07-26 (PM) | 0 | 325 | 0% | 41.1 (impression-weighted) | **INTERNAL LINK STRATEGY IMPLEMENTED:** Created comprehensive internal link plan (`docs/INTERNAL-LINK-STRATEGY-2026-07-26.md`) to move "where can i buy bathroom storage units that work in a rented flat?" from **pos 4.9 → page 1 (pos 1–3)** by 2026-08-09. **Actions taken:** (1) Added "Bathroom Storage Units" subsection with contextual link to `/blog/small-apartment-bathroom-storage/` in small-space-furniture post (live immediately). (2) Verified existing link in small-apartment-organization post (line 119). **Link mechanics:** 2 high-authority source posts now point to target post, creating topical cluster signal to Google. **Timeline:** Links deployed 2026-07-26 PM; expect Google crawl within 3-7 days; position movement observable by 2026-08-02. **Expected outcome:** Pos 4.9 → 5–6 (1 week), → 3–4 (2 weeks), → 1–3 (3–4 weeks) = 3–5 new clicks/week from buyer-intent query. **Monitoring:** Weekly GSC position check via API; adjustment protocol if stalled. Commit: `805ee88` (strategy doc). Next checkpoint: 2026-08-02 (mid-point), 2026-08-09 (full assessment). |
| 2026-07-26 (AM) | 0 | 325 | 0% | 41.1 (impression-weighted) | **COMPREHENSIVE AUDITS COMPLETED TODAY:** (1) SEO Audit (see `docs/SEO-AUDIT-2026-07-26.md`) + (2) GEO/AI-Citation Audit (see `docs/GEO-AUDIT-BATHROOM-STORAGE-2026-07-26.md`) + (3) **KEYWORD ANALYSIS** (see `docs/KEYWORD-ANALYSIS-CANADA-2026-07-26.md`). **Keyword findings:** Strength rating **7.5/10 (Good)** for Canadian audience. Long-tail keywords (36% of queries) are strong, strategic niche focusing (bathroom storage, furniture, rentals, organization). **Gaps:** Missing head-term consolidation (scattered "small apartment" rankings), no seasonal keywords (Sept/Dec spikes), geographic keywords underexploited. **Strategic value:** Your keyword strategy is SMART for month 1 (achievable niches), but leaving volume on table by not consolidating head terms. **Next 30 days priority:** Execute SEO internal links (pos 4.9 → page 1, due 2026-08-02), add seasonal content (Sept), consolidate "small apartment" variants. **Detailed analysis:** 157 queries analyzed, Tier 1/2/3 keyword breakdown, competitive landscape, Canadian market specifics, 6 recommended actions. Commits: `accdd16` (homepage), `28fd2e9` (SEO docs), `ffcdff9` (GEO docs), `95657a6` (keyword analysis), `53f32a9` (analytics log update). |
| 2026-07-25 | 0 | 239 | 0% | 38.0 (impression-weighted) | Pulled via `blog-google` API, window 2026-06-27 to 07-22 (GSC's 2-3 day lag). 139 rows. Impressions climbing steadily (172 -> 211 -> 239 across the last 3 pulls). Still 0 clicks -- expected at month 1, matches the 2026-07-24 hold decision below. `/blog/small-apartment-bathroom-storage` is now the best-positioned page site-wide at pos 9.4 (20 impr) -- its target query "where can i buy bathroom storage units that work in a rented flat?" held at pos 4.9 but impressions on it grew 6 -> 14, plus a new near-duplicate variant query surfaced at pos 5.5. This is the single query/page pair closest to breaking onto page 1. |
| 2026-07-24 | 0 | 211 | 0% | — | Pulled via `blog-google` API (service account, `https://smallspacehome.ca/`), 28-day window. 132 distinct queries. Best: "where can i buy bathroom storage units that work in a rented flat?" at position 4.9 (near-page-1 miss, worth an internal-link nudge). Zero clicks is normal at these positions (mostly 20-90+) — not a technical issue. |
| 2026-07-21 | 2 | 172 | ~1.2% | ~37 | Real total from `Chart.csv` (the true daily aggregate — GSC's per-page/per-query breakdown tables are privacy-fuzzed for low-volume sites and don't sum to the real total, learned this the hard way). Covers 2026-07-16 to 07-19, site's first days live. |

Note: the 07-18 and 07-20 zips were narrower-window pulls (24h / 7-day) of this same brand-new data, not separate trend points — not logged as separate rows to avoid double-counting the same few days. Going forward, pull with a consistent date range (recommend "Last 28 days") each time so rows are actually comparable.

**Top performing queries** (as of 2026-07-21):
- "where can i buy bathroom storage units that work in a rented flat?" — 6 impressions, position 5.33 (best-ranked query so far, long-tail rental-specific)
- Everything else is 1-6 impressions with position 15-95 — site is indexed but not yet ranking for its target head terms ("small space furniture", "small apartment storage ideas", etc.)

**Top performing pages** (as of 2026-07-21, by position — per-page click counts are individually unreliable at this low volume, so treat position/impressions as the signal, not the "1 click" figures):
- `/blog/ikea-small-space-hacks/` — pos ~3, best-positioned page on the site
- `/blog/apartment-decor-ideas` — pos ~4.7
- `/blog/studio-apartment-ideas/` — pos ~17, 8 impr
- `/blog/how-to-decorate-a-small-living-room` — pos ~24, 20 impr (most impressions of any blog post)
- `/` (homepage) — pos ~66, 32 impr — weakest position despite the most impressions, worth investigating

**Issues found** (as of 2026-07-21):
- Site is brand-new in Google's eyes — most pages sit at position 20-90+, meaning indexed but not ranking high enough to earn clicks yet. Expected for this stage; the fix is time + backlinks + continued publishing, not a technical problem.
- Homepage ranks worse (pos ~47-66) than several inner blog posts despite getting the most impressions — check internal linking/title tag on homepage.
- `ikea-small-space-hacks` and `apartment-decor-ideas` are the only pages cracking top-5 position — worth doubling down on that topic angle (IKEA-specific, budget decor) for new posts.

---

## Google Analytics (GA4)

| Date | Sessions | Users | Pageviews | Top Channel | Notes |
|------|----------|-------|-----------|-------------|-------|
| 2026-07-27 | 41 total (0 organic search) | 32 | 123 | Direct (27), Organic Social (12), Unassigned (2) | 28-day window, property `properties/546979184`, pulled via direct GA4 Data API channel-breakdown query (the skill's built-in `ga4_report` command only returns Organic Search rows, which are 0 by design — matches 0 GSC clicks, not a gap). Sessions up again (27 -> 41, +52%). Organic Social (Pinterest) up 8 -> 12, tracking the Pinterest impression growth logged below. Still 0 Organic Search sessions. |
| 2026-07-26 | 27 total (0 organic search) | 21 | 77 | Direct (18), Organic Social (8), Unassigned (7)* | 28-day window, property `properties/546979184`. Sessions nearly 3x the last pull (10 -> 27); Organic Social (Pinterest) 4x'd (2 -> 8), matching the Pinterest impression acceleration logged below. Still 0 Organic Search sessions (matches 0 GSC clicks). Top landing page is homepage (24 sessions). *Channel breakdown sums to 33 vs. reported total of 27 -- a GA4 dimensionless-vs-dimensioned query quirk at this low volume, not a data-entry error. |
| 2026-07-25 | 10 total (0 organic search) | 9 | 7 | Direct (4), Unassigned (4), Organic Social (2) | 28-day window, property `properties/546979184`. Still 0 Organic Search sessions (matches 0 GSC clicks). Organic Social (Pinterest) doubled 1 -> 2 sessions. Top landing page is homepage (5 sessions); one landing-page row came back blank (3 sessions) -- likely a tracking artifact, not worth chasing at this volume. |
| 2026-07-24 | 4 total (0 organic search) | 4 | 3 | Unassigned (2), Direct (1), Organic Social (1) | GA4 only installed 2026-07-23, so this is essentially day-1 data — expected near-zero. Property `properties/546979184`. Only 1 session attributed to Organic Social (Pinterest) so far. |

---

## Pinterest

| Date | Impressions | Saves | Outbound Clicks | Engaged Audience | Notes |
|------|------------|-------|------------------|-------------------|-------|
| 2026-07-26 | 238 (sum of daily, 07-17 to 07-26 -- prior days blank/zero) | 0 | 9 (sum across top 4 boards, unchanged) | 39 (sum of engagement across top 4 boards, unchanged) | Source: `Pinterest Analytics overview 20260626-20260726.csv` (Downloads). Daily impressions: 0, 0, 27, 0, 18, 3, 25, 58, 88, 19 -- note 07-25 revised up from 54 (yesterday's estimate) to 88 as Pinterest verifies estimated data; 07-26 (19 so far) is itself still an estimate and will likely revise up. Engagement/pin-clicks/outbound-clicks/saves per board are byte-for-byte unchanged from yesterday's pull -- only impressions grew, meaning the surge is reach, not yet new engagement. Top pins list grew from 6 to 9 pins with real impressions (3 new pins: `...570686` 6 impr, `...575338` 6 impr, `...579642` 4 impr), and all 6 previously-tracked pins grew too (top pin now 44 impr, up from 37). |
| 2026-07-25 | 185 (sum of daily, 07-19 to 07-25 -- prior days blank/zero) | 0 | 9 (sum across top 4 boards) | 39 (sum of engagement across top 4 boards) | Source: `Pinterest Analytics overview 20260625-20260725.csv` (Downloads). Clear acceleration: daily impressions went 27, 0, 18, 3, 25, 58, 54 -- last two days (58, 54) are 2-3x the days before, first real sign of the algorithm picking pins up. 07-24/07-25 figures are Pinterest's own estimates, may adjust. |
| 2026-07-21 | 33 (30-day window) | 0 | 1 | 6 | Pinterest account just started getting impressions on 07-19 — before that, zero across the whole window. Source: `Pinterest Analytics overview 20260621-20260721.csv` |

**Top performing pins** (as of 2026-07-26):
- Pin `...961418931` — 44 impressions (top performer)
- Pin `...961423277` — 36 impressions
- Pin `...961426870` — 33 impressions
- Pin `...961495665` — 24 impressions
- Pin `...961499159` — 21 impressions
- Pin `...961502906` — 16 impressions
- 3 new pins entering the tracked list: `...961570686`, `...961575338` (6 impr each), `...961579642` (4 impr). All organic/from-you.

**Top performing boards** (as of 2026-07-26, all 4 boards now have real data):
| Board | Impressions | Engagement | Pin clicks | Outbound clicks | Saves |
|---|---|---|---|---|---|
| storage | 69 | 19 | 14 | 5 | 0 |
| decor | 64 | 8 | 7 | 1 | 0 |
| budget-tips | 44 | 9 | 7 | 2 | 0 |
| organization | 37 | 3 | 2 | 1 | 0 |

**storage is the clear standout** — 33% engagement rate and ~25% pin-click rate, both well above the other 3 boards. This is the *second* independent signal (alongside the GSC "bathroom storage" query at pos 4.9-9.4, see Google Search Console above) pointing at storage/organization-for-rentals as the strongest content angle on the site.

**Issues found**:
- All 4 boards now have data (vs. only 1 board on 07-21) — the "other boards haven't started getting impressions" gap from last pull has closed on its own.
- Still 0 saves across every board, every pull so far — worth continuing to watch since saves are Pinterest's strongest algorithmic-push signal, but three straight zero-save pulls at this low volume isn't yet a red flag.
- **Resolved (2026-07-26):** the outbound-click-vs-GA4-session gap flagged on 07-25 has closed — Pinterest's 9 outbound clicks now roughly match GA4's 8 Organic Social sessions in the same window. Likely was just a timing lag between the two pulls, not an attribution/tracking issue.

**2026-07-27 — Live profile check (via screenshots, not API): posting cadence and 0-saves root-caused.**
- **Cadence mystery resolved.** User reports posting 3x/day (7/8/9pm), which didn't match the CSV showing only 9 pins with any impressions. Checked the live profile's Created tab: **9 pins published + 12 pins sitting in Pinterest's "Scheduled Pins" queue** (labeled 0d/1d = publishing today/tomorrow). The content pipeline is real and matches the claimed cadence — Pinterest's analytics just don't reflect scheduled-but-unpublished pins. Expect impressions/board data to jump again as the queue releases over the next few days.
- **Board split for the 9 live pins** (via Saved-tab board view): Decor 4 pins, Organization 2, Storage 2, Budget Tips 1. Storage's 2 pins are driving board-level engagement roughly on par with Decor's 4 — confirms storage has the best per-pin efficiency, not just the best totals.
- **0-saves partially root-caused.** Cross-referenced the 9 live pins against `PIN-QA-FIXES.md` (a self-authored QA pass from 2026-07-16 that flagged specific image problems pre-publish). Of the 9 live pins, 2 have QA-flagged, still-unfixed defects and are tied for the account's lowest performers: `decorate-small-living-room-A` (still shows a luxury double-height rendered great room, nothing like a small apartment) and `fall-apartment-decor-A` (heritage-house photo, same "wrong space" issue) — both sit at 7 views / 0 shares / 0 saves. A third flagged issue (`apartment-decor-ideas-A`, a US stadium visible through the window) **was already fixed** and that pin is now the account's #1 performer (37 views, 4 shares). This is 3 data points, not proof, but it's a real and non-coincidental correlation.
- **What this doesn't explain:** 0 saves persists even on the best-performing pin (Apartment Decor on a Budget — 45 views, 7 shares, still 0 saves). Image quality explains some of the *weakest* pins' underperformance but not the account-wide save rate. Open question, not yet diagnosed — could be new-account algorithm lag or content that gets clicked through instantly rather than saved.
- **Action taken:** logged fix status directly in `pinterest content/PIN-QA-FIXES.md` next to each issue. **Next action (not yet done):** replace the photos in `decorate-small-living-room-A/B` and `fall-apartment-decor-A/B` before more pins from those sets come off the 12-pin scheduled backlog — the swap-kit search terms are already written in that doc.

---

## Store / Product Matching

Which articles are driving traffic to which store products, and whether that traffic converts. This is the real scale signal — traffic without store clicks means the article/product match needs work.

| Date | Article | Matched Product(s) | Product Clicks | Purchases | Notes |
|------|---------|---------------------|-----------------|-----------|-------|
|      |         |                     |                 |           |       |

---

## Scaling Decisions Log

Running log of decisions made based on the data above (e.g. "doubling down on X topic cluster", "killing Y pin format", "adding store link to Z article").

- **2026-07-21 — Content duplication identified, final call: don't delete, stop adding to it.** Reviewing all 23 published articles against the digital-product roadmap (`digital prod/CAD dig prod/Product Roadmap.md`) surfaced real overlap: 5 articles are near-duplicate general decor ("Small Space Living Room Ideas," "How to Decorate a Small Living Room," "Apartment Decor Ideas," "Small Space Decorating," plus "Minimalist Small Apartment Ideas" as the one with a genuinely distinct angle), and 2 are near-duplicate general organization ("Small Apartment Organization" vs. "Storage Ideas for Small Places"). **Decision: leave the 22 already-published posts live** (some are already ranking — see below, no reason to unpublish working content) **but stop writing new posts in these two lanes.** Future decor/organization content must have a genuinely distinct angle (a specific room, a specific constraint, a specific season) or it doesn't get written.
- **2026-07-21 — Two real content gaps identified, prioritized as next posts.** Neither Quebec's July 1 "Moving Day" (province-wide lease turnover, no equivalent in North America, Montreal is a named product-target city) nor the September student-lease wave has any content at all, despite both being the single strongest demand signal found in the digital-product research (`CAD DIG PROD.md` seasonality section). **Decision: these are the next two articles to write**, timed for a May publish (ahead of the June product launch push) and early August respectively — not more decor content.
- **2026-07-21 — Real GSC data independently confirmed a product-research call.** Top-performing query site-wide is "where can i buy bathroom storage units that work in a rented flat?" (pos 5.33) — this is direct, real evidence for Product B's Bathroom chapter (small-space storage/organization system), found independently of the Etsy search-signal research used to justify that product. Worth weighting Product B's priority up slightly given this is actual site data, not inferred signal.
- **2026-07-25 — Closed remaining orphan pages: every one of the 23 Canada posts now has 2+ inbound internal links.** Found 3 seasonal posts nearly isolated in the link graph (fall/cozy-winter only linked to each other; spring-cleaning had 1 inbound). Off-season quiet impressions are expected, but near-zero internal links is a crawlability gap regardless of season -- fixed so these posts are ready to rank when their season arrives instead of starting from nothing. Also gave small-bedroom-decor-ideas (real GSC data, pos 23.5, was only 2 links) 2 more. **Session total: 13 internal links added across 12 posts, strengthening 7 target pages.**
- **2026-07-25 — Full 23-post keyword/on-page audit: titles and meta descriptions are already solid, internal linking was the only real gap.** Checked title length (31-42 chars), description length (135-158 chars), and CAD/renter framing on every post -- all consistently well-optimized, nothing weak enough to justify rewriting. Checked all 23 for GSC visibility: 8 show zero impressions, but 4 of those are seasonal content (winter/fall/January/spring) correctly quiet in July, not a defect. The other 4 zero-impression evergreen pages (apartment-decor-ideas, how-to-make-a-small-room-look-bigger, ikea-small-space-hacks, small-apartment-bedroom-storage-ideas) were confirmed indexed (PASS via URL Inspection) with 4-5 inbound links already -- same range as ranking pages, so left untouched rather than guess at a fix with no evidence. Added 3 more internal links to studio-apartment-ideas (1 -> 3 inbound) and small-apartment-home-office-ideas (2 -> 3 inbound), the two remaining pages with real (if small) GSC ranking data and thin linking. **Total this session: 9 internal links added across 9 posts, 3 target pages strengthened.**
- **2026-07-25 — Executed internal-link nudge on 3 near-page-1 pages, based on GSC keyword clustering.** Full 139-row GSC pull showed `/blog/small-apartment-bathroom-storage` ranks #4.9 for one long-tail phrase but pos 49 for the natural head term ("small bathroom storage ideas for renters") — topical trust without enough link authority (only 4/23 posts linked in, no reciprocal links from the 2 posts it links out to). Same pattern found on `/blog/how-to-decorate-a-small-living-room` (6 clustered queries, pos 12, only 2 inbound links) and `/blog/small-space-furniture` (6 clustered queries, pos 16, 4 inbound links). Added 6 internal links total across 6 other posts, all in natural on-topic spots (no new content written, no keyword stuffing). Deliberately left `/blog/storage-ideas-for-small-places` untouched -- it already has 6 inbound links and strong title/query match, so its pos 14-22 stagnation looks like a time/authority issue, not a link or phrasing gap. **Next check:** did these 3 pages move, at the 2026-08-24 review.
- **2026-07-25 — Storage/organization confirmed as the strongest angle by two independent signals.** Pinterest's "storage" board (57 impr, 33% engagement rate, ~25% pin-click rate) is the clear outperformer among the 4 boards, and GSC's best-positioned page site-wide is `/blog/small-apartment-bathroom-storage` (pos 9.4) targeting a storage-specific query at pos 4.9. Both signals independently point the same direction. No action needed beyond what's already decided (Product B Bathroom chapter priority, internal-link nudge on the bathroom-storage page) — logging this as confirmation, not a new decision.
- **2026-07-26 — Sunday check-in: strategy confirmed on track, no changes made.** GSC impressions up 239→325 (+36%), GA4 sessions up 10→27 (+170%, Organic Social 4x'd 2→8), Pinterest impressions up 185→238 (+29%, daily rate accelerating). Bathroom-storage query still holding pos 4.9. Zero clicks/organic sessions is still expected at this stage (GA4 installed 2026-07-23, 3 days old) — not a signal the strategy is failing, every trend line is moving the right direction. Hold stands, next real re-evaluation is 2026-08-24.
- **2026-07-27 — Routine check, no changes made, hold confirmed.** GSC impressions up 325→369 (+14%), GA4 sessions up 27→41 (+52%, Organic Social 8→12). Bathroom-storage query holds pos 4.9 with impressions still growing (14→15) — too early for the 07-26 internal-link push to show a position move (needs 3-7 days crawl + more time to rank), nothing to react to yet. Zero clicks/organic sessions still expected at this stage. Hold stands, next real re-evaluation is 2026-08-24.
- **2026-07-24 — Hold on SEO/content changes, re-check data ~2026-08-24.** GSC/GA4 API access confirmed fully working (see root `CLAUDE.md` for credentials/property IDs). Both GSC and GA4 still show month-1 numbers (zero clicks, near-zero GA4 sessions) — normal, not a problem. Decision: don't re-audit analytics before 2026-08-24; focus effort on Pinterest posting cadence instead, since that's the traffic lever that can move faster than organic SEO.

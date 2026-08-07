# Australia (outdoorcoastalhome.com) — Analytics & Scaling Log

Tracks Google Search Console + GA4 + Pinterest data over time so we can spot what's
working and decide where to double down. Mirrors `CANADA-ANALYTICS.md` /
`UK-ANALYTICS.md` format — read this file before pulling new GSC/GA4/Pinterest data,
and add a new dated entry after every pull.

## How to update
Add a new dated entry at the top of the relevant log each time you pull fresh data
(weekly or biweekly recommended). Keep old entries — the trend matters more than any
single snapshot.

## Setup status (last updated 2026-08-07 — fully working)

**GSC/GA4 API access is confirmed and working, using a dedicated Australia-only
service account (no longer the shared Canada one).**

- Service account: `claude-blog-au@outdoorcoastal-home.iam.gserviceaccount.com`
  (own GCP project, `outdoorcoastal-home`, separate from Canada/UK's projects)
- Credentials file: `~/.config/claude-seo/service_account_au.json`
- Config: `~/.config/claude-seo/google-api-au.json`
- GSC property: `sc-domain:outdoorcoastalhome.com` — granted `siteFullUser`,
  verified via a real `sites().list()` API call (not just assumed from the UI).
- **GA4 property ID: `549096981`** — corrected 2026-08-07. An earlier session
  briefly used `15398993923` for this (wrong number, possibly a stream ID or a
  transcription error) which caused a real, confusing "permission denied" that
  looked like a missing grant but was actually just the wrong property being
  queried. Verified working: real GA4 data pulled successfully (4 sessions in a
  7-day test window).
- Australia also has its own dedicated PageSpeed/CrUX API key now, in the same
  `google-api-au.json` config, separate from Canada's and UK's keys.

Canada and UK were given the same treatment in this session — each site now has
its own fully separate service account + API key rather than sharing Canada's
original credentials:
- Canada: `claude-blog-ca@smallspace-home.iam.gserviceaccount.com`,
  `~/.config/claude-seo/service_account_ca.json` /
  `~/.config/claude-seo/google-api.json` (kept as the default/shared filename
  for backward compatibility with existing tooling, but now Canada-specific)
- UK: `claude-blog-uk@britishhome-interiro.iam.gserviceaccount.com`,
  `~/.config/claude-seo/service_account_uk.json` /
  `~/.config/claude-seo/google-api-uk.json`

All three: Search Console API + GA4 Data API had to be separately enabled per
GCP project (a one-time step distinct from granting property access) before
either would work — if setting up a 4th site later, don't forget this step,
it produces a "has not been used / disabled" error that looks unrelated to
permissions but is actually just this.

---

## Google Search Console

| Date | Total Clicks | Total Impressions | Avg CTR | Avg Position | Notes |
|------|-------------|--------------------|---------|--------------|-------|
| 2026-08-07 | 0 | 0 | 0% | — | First real pull, using AU's own dedicated service account. Genuinely zero, not a bug — confirmed via GSC URL Inspection the same day that no post has been crawled yet (sitemap only submitted a few hours prior). Expected to stay at zero until Google completes its first crawl pass; next pull should show the first real signal. |

---

## Google Analytics (GA4)

| Date | Sessions | Users | Pageviews | Top Channel | Notes |
|------|----------|-------|-----------|-------------|-------|
| 2026-08-07 | 4 total | 4 | 31 | Unassigned (3), Direct (1) | First real pull, 28-day window, property `properties/549096981`, AU's own dedicated service account. Thin, as expected — no organic search sessions yet since nothing's indexed. The "Unassigned" channel being dominant this early is normal (tracking hadn't been live long in this window) and should resolve to real channels as more sessions accumulate. |

---

## Pinterest

| Date | Impressions | Saves | Outbound Clicks | Notes |
|------|-------------|-------|------------------|-------|
| — | — | — | — | No data yet — Australia's `pin-generator/`/`pinterest-pins/` folders exist under `website/` but no posting cadence has been tracked yet. Confirm Pinterest business account is connected before logging. |

---

## Scaling Decisions Log

- **2026-08-07:** Reactivation kicked off. Site audited — content is solid (42 posts,
  ~85/100 avg quality, all previously-flagged bugs already fixed, build is clean). Gap
  closed today was purely structural (this file, `docs/SEO-GROWTH-PLAN-2026-2027.md`,
  `BLOGS TO POST/`, `pinterest content/` folders — created to match Canada/UK). Analytics
  access remains the open blocker before real data-driven decisions (Phase 7 in the
  growth plan) can start.
- **2026-08-07 (same day):** User asked to apply the same active strategy Canada/UK
  run, not just the scaffolding — daily trend-content loop started. Queued 3 stub
  topics in `BLOGS TO POST/` (outdoor kitchen, small courtyard garden, alfresco
  dining — all confirmed gaps against the existing 42-post/126-pin library). Added
  Australia to `blogs/check-posts.mjs` so drafted-vs-published status is tracked across
  all three countries the same way. Actual writing/publishing of the first article is
  the next step, not done yet.
- **2026-08-07 (later same day):** User asked to "rework all articles" per the
  CA/UK strategy. Confirmed with user this means targeted audit-driven fixes (not a
  full rewrite of already-good content). Applied against `blog-audit-report.md`'s
  prioritized action queue: diversified the repeated "**Key point:**" price callout
  (10-11x identical → 6 rotating variants) across `coastal-dining-room-australia`,
  `beach-house-furniture-australia`, `coastal-bedroom-decor-australia`,
  `coastal-kitchen-decor-australia`; reworded 5 of 6 identical fire-restriction
  sentences in `backyard-fire-pit-ideas-australia` while keeping the safety message.
  Committed in the `website/` repo (`af6f133`). Re-checked the audit's other flagged
  critical bugs (unrendered placeholders, mojibake, broken stub links, missing
  frontmatter) — **already resolved before this session**, no action needed.
  Title/H1 mismatch item checked — the Astro template renders H1 from the same
  frontmatter `title` field, so there's no real second source to diverge; audit
  flag was a false positive. Remaining open item: thin source diversity (most posts
  lean on 1-2 repeatedly-cited sources) — lower priority, not addressed this pass.
- **2026-08-07 (later still):** User caught a real miss — the earlier reactivation
  pass checked docs/analytics/content structure but never diffed individual site
  *pages* against CA/UK. Actual gap: AU was missing `/author`, `/contact` (had a
  form embedded in `/about` instead), `/editorial-policy`, and `/thank-you` — all
  four exist on both CA and UK. Built all four using AU's own design tokens (not
  copy-pasted UK styling), wired into `Footer.astro` nav, and pointed the existing
  `/about` contact form at the new `/thank-you` page. Also wrote and published the
  first daily-loop article, `outdoor-kitchen-ideas-australia` — caught and fixed a
  `[PERSONAL EXPERIENCE]`/`[UNIQUE INSIGHT]` unrendered-placeholder bug the writer
  agent introduced before it went live (same bug class as the original audit's
  critical #1). Site is now 53 pages, builds clean, both commits pushed to
  `origin/main` (`a944413`, `0f1985e` in the `website/` repo).
- **2026-08-07 (full-day wrap):** Analytics + indexing infrastructure fully stood
  up. GSC verified (DNS TXT method via Hostinger, `sc-domain:outdoorcoastalhome.com`,
  service account granted Full access, confirmed via API). GA4 property created
  and gtag snippet wired in; GA4 API Viewer access initially failed with
  "permission denied," which turned out to be caused by testing against the
  wrong property ID (`15398993923`, likely a stream ID) rather than a missing
  grant — **correct property ID is `549096981`**, confirmed working same day
  once corrected (see "Setup status" above for the full, current picture,
  including the later move to a dedicated Australia-only service account).
  GTM container `GTM-MC5RJFSF` added, combined with gtag per Canada's pattern.
  Google + Bing site-verification files/tags both live.

  **Major bug found and fixed:** `outdoorcoastalhome.com` was 308-redirecting to
  `coastal-home-au-blog.vercel.app` at the Vercel domain level — meant Google's last
  crawl (2026-07-20, weeks before this session) saw the site as a redirect, and
  every single post showed "URL is unknown to Google." User fixed the Vercel domain
  config (removed the redirect-to-.vercel.app setting) mid-session; confirmed via
  curl the apex domain now serves 200 OK directly. This likely explains most of
  Australia's total lack of indexing prior to today, independent of anything
  content/SEO-related.

  Sitemap submitted directly via Search Console API (0 errors, confirmed
  registered). Manual "Request Indexing" done by user for the homepage + 2 flagship
  posts via GSC URL Inspection; same requested via Bing Webmaster Tools URL
  submission. Indexing API (faster than sitemap crawl) needs Owner-level GSC access,
  not just Full — skipped as optional since sitemap + manual requests cover it.

  **Performance:** found and fixed real, measured issues, not guesses:
  - Render-blocking Pinyon Script font stylesheet → switched to `media=print`/
    `onload` swap pattern (~750ms saved per PSI).
  - `public/images/` had 12 files up to 1400x2489px despite nothing on the site
    displaying wider than 1600px — resized (max 1600px, no upscaling) + re-encoded
    mozjpeg q80. `outdoor-kitchen-ideas-australia` inline image: 356KB → 218KB.
  - Result, measured via PageSpeed on that same post: mobile performance 81 → 92,
    LCP 5.0s → 3.2s, CLS 0.024 → 0.
  - Also fixed: page-level horizontal-scrollbar bug (`overflow-x: hidden` missing
    on html/body), a WCAG contrast failure on homepage category badge numbers
    (dark backing pill added, verified 4.7-7:1 across all 4 card colors), and an
    accessible-name mismatch on pagination arrow buttons.

  **Content/UX tweaks per user request:** removed Reddit social icon (inactive
  channel), removed `/author` and `/contact` standalone pages (reverted to the
  `/about` page's embedded contact form), matched hero title font-family to
  subtitle, kept hero title white/bold/large per explicit instruction.

  **Status: technically ready for indexing.** No known blockers left on the site
  side. Real GSC/GA4 data still at zero — expected, given crawling has only just
  been requested. **Do not check again before ~2026-08-14** — nothing meaningful
  will have accumulated before then; earlier checks just re-confirm the same
  "too early" state already logged here.

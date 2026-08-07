# Australia (outdoorcoastalhome.com) — Analytics & Scaling Log

Tracks Google Search Console + GA4 + Pinterest data over time so we can spot what's
working and decide where to double down. Mirrors `CANADA-ANALYTICS.md` /
`UK-ANALYTICS.md` format — read this file before pulling new GSC/GA4/Pinterest data,
and add a new dated entry after every pull.

## How to update
Add a new dated entry at the top of the relevant log each time you pull fresh data
(weekly or biweekly recommended). Keep old entries — the trend matters more than any
single snapshot.

## Setup status (2026-08-07)

**GSC/GA4 API access is NOT yet confirmed for Australia.** The shared service account
(`claude-blog@smallspace-home.iam.gserviceaccount.com`, config at
`~/.config/claude-seo/google-api.json`) currently has no Australia GSC property or GA4
property ID recorded — only Canada's are configured (`default_property`,
`ga4_property_id`). Before the tables below can be filled with real data, someone with
Search Console/GA4 admin access to outdoorcoastalhome.com needs to:

1. Add `outdoorcoastalhome.com` as a property in Google Search Console (confirm
   domain vs. URL-prefix property type, matching how Canada/UK are each set up).
2. Grant `claude-blog@smallspace-home.iam.gserviceaccount.com` access to that property.
3. Confirm a GA4 property exists for the site and record its property ID.

Until this is done, do not assume Australia has the same "already live" analytics
status as Canada/UK — verify with a raw API call first (per root `CLAUDE.md`'s guidance
that "permission denied" is as likely to be a disabled API / wrong property format as
a real missing grant).

---

## Google Search Console

| Date | Total Clicks | Total Impressions | Avg CTR | Avg Position | Notes |
|------|-------------|--------------------|---------|--------------|-------|
| — | — | — | — | — | No data yet — awaiting GSC access setup, see Setup status above. |

---

## Google Analytics (GA4)

| Date | Sessions | Users | Pageviews | Top Channel | Notes |
|------|----------|-------|-----------|-------------|-------|
| — | — | — | — | — | No data yet — awaiting GA4 property setup, see Setup status above. |

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

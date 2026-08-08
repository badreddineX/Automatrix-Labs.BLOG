# SEO Growth Plan 2026–2027 — BritishHomeInterior.co.uk

Adopted 2026-07-30. **Update, same day: the original content hold below has been
overridden by explicit user request** — see "Daily Trend-Content Loop" note under
Phase 2. The 2026-08-24 date still stands as the analytics re-check checkpoint, it just
no longer blocks new content production. See `UK-ANALYTICS.md` for the data this plan
is built against, and root `CLAUDE.md` for the current-decision record.

~~Applies alongside the existing hold decision in root `CLAUDE.md`: no ranking-affecting
content/link changes before the 2026-08-24 GSC/GA4 checkpoint. Only Phase 1
foundational/technical fixes are being executed now; everything else is queued to start
once that checkpoint confirms the current approach is working.~~ (superseded 2026-07-30)

---

## Phase 1 – Foundations (in progress now, safe during the hold)

Status as of 2026-07-30 audit:

- [x] **Fixed 2026-07-30: 5 dead internal links from a content reorg.** Posts referenced
  `/blog/rented-home-decor-ideas-uk`, `/blog/maximalist-home-decor-uk`,
  `/blog/living-room-ideas-uk`, `/blog/living-room-budget-ideas-uk`, and
  `/blog/small-flat-storage-ideas-uk` — none of these slugs existed anymore (`dist/`
  still had them from a 2026-07-28 build, but `src/content/blog/` had moved on by
  2026-07-29). Repointed: `rented-home-decor-ideas-uk` → `rented-flat-makeover-uk`,
  `maximalist-home-decor-uk` → `maximalist-living-room-decor-uk` (clean 1:1 renames —
  also removed the resulting self-referential "Read more" links these two posts had
  gained). No exact-match post existed for the other 3, so per your call: `living-room-ideas-uk`
  → `small-living-room-ideas-uk`, `living-room-budget-ideas-uk` → `budget-home-makeover-uk`,
  `small-flat-storage-ideas-uk` → `small-bedroom-storage-uk`. All 34 posts' internal
  links verified resolving cleanly as of 2026-07-30. **Rebuild and redeploy before this
  matters live** — the fix is only in source until the next build ships.
- [x] Sitemap/indexing — confirmed clean via URL Inspection API, no action needed.
- [x] Title tags / meta descriptions — audited 2026-07-25, 7 descriptions trimmed to fit
  under 160 chars, rest already fine.
- [x] **Privacy Policy** exists (`privacy-policy.astro`) and **Terms of Use** exists —
  done.
- [ ] **About page** exists (`about.astro`, 638 lines, substantive) but contact form is
  embedded inside it rather than its own page — **gap: no standalone `/contact` route.**
  Same pattern as Canada.
- [ ] **Gap: no Editorial Policy page.**
- [ ] **Gap: no standalone Author bio page** (author only appears as a small card inside
  About).
- [ ] **Image compression**: `public/images/` totals 16 MB across 278 files, no file over
  ~372 KB (below 500 KB flag line), but several duplicate images exist in both root and
  `featured/` subfolder — worth a dedup + compression pass, not urgent.
- [ ] Core Web Vitals — not yet re-measured against this plan; check via `blog-google`
  PageSpeed/CrUX pull next.

**Next Phase 1 actions**: split `/contact` out of About into its own route, write an
Editorial Policy page, add a proper `/author` page — pure trust/EEAT additions, don't
touch rankings-sensitive content, safe to do before 08-24. Also worth a quick rebuild +
manual smoke-check that the 5 relinked URLs render correctly once deployed.

---

## Phase 2 – Topic Clusters (active, no longer gated on 08-24)

**Daily Trend-Content Loop (active 2026-07-30):** write one new article per day
targeting a genuine trending keyword (Pinterest trend data or GSC-adjacent demand),
paired with one new promotional pin for that specific article — on top of the existing
3 pins/day baseline. **Check the existing `pinterest-pins/` library for topical/photo
overlap before building each trend pin** — this was tried once already (2026-07-28) and
reverted because several trend pins duplicated existing pin wording/photos almost
exactly. New daily articles should default into whichever pillar below fits, with
Kitchen-on-a-Budget the priority lane given the data below — but a genuinely strong

**Hard rule, confirmed with user 2026-07-30: exactly ONE article per day, no more.**
Extra drafted articles get written ahead of time and queued in `BLOGS TO POST/`, but
only one moves into `src/content/blog/` (published) per calendar day — this is what
signals a consistent daily-posting pattern to Google, and publishing a backlog all at
once defeats that purpose. Before publishing a new article, check whether one has
already gone out today (see `git log --oneline -5` on the site repo, or the most recent
`datePublished` among posts) — if yes, hold the next one for tomorrow regardless of how
many drafts are sitting ready. This rule persists across sessions; it is not a one-time
instruction.
trend keyword outside that pillar is still worth writing, not forced into it.

Pillar pages planned for:
- Living Room Ideas
- Bedroom Ideas
- Kitchen Design
- Bathroom Inspiration
- Victorian Homes
- Modern British Homes
- Cottage Style
- Budget Home Makeovers

Each pillar to support 10–20 related articles. **Data already points at Kitchen-on-a-
Budget as the strongest existing pillar** — it dominates GSC impressions (44–48% of all
site impressions across every pull since 2026-07-24). Storage content was also
identified as a real content gap and 3 storage articles were already ported from
Canada's proven storage angle on 2026-07-25 (`small-flat-storage-ideas-uk`,
`small-bedroom-storage-uk`, `bathroom-storage-ideas-uk`) — worth checking those slugs
specifically at the 08-24 review since they're new and directly testing whether
Canada's storage-first thesis transfers to the UK market.

## Phase 3 – Internal Linking (ongoing discipline, not a one-time project)

Per new article: 5–10 internal links out, update 5–10 old articles to link back,
descriptive anchor text, link to pillar pages. Already the working pattern here — the
2026-07-30 dead-link fix above is a reminder to periodically re-verify internal links
after any post is renamed or removed, since that's exactly how this batch broke.

## Phase 4 – High Commercial Intent Content (queued)

Best/Top/Review/Comparison/Under £100/IKEA Alternatives/Amazon Finds/Before & After/
Buying Guides. Ties directly into the Fourthwall store's article-matching strategy per
root `CLAUDE.md` — when writing these, always decide which store product the article
should link to, not publish-and-forget.

## Phase 5 – EEAT (partially Phase 1, partially ongoing)

About/Contact/Editorial/Author/Privacy gaps tracked in Phase 1 above. Image credits and
sources/references should be spot-checked per-article as part of the next full content
audit (post-08-24).

## Phase 6 – Backlinks (queued, starts after 08-24 checkpoint)

Target 5–10 quality backlinks/month: guest posts, HARO-equivalent, home decor/interior
design blogs, UK sites specifically, resource pages, digital PR.

## Phase 7 – Topical Authority (queued — data already pointing toward kitchen-budget)

Kitchen-on-a-budget is the clear #1 cluster by GSC volume. Storage is the emerging
second bet, ported directly from Canada's proven angle. Decide at 08-24 which one to
concentrate deeper content investment in, based on which one is actually converting to
clicks by then.

## Phase 8 – User Experience (queued)

Comparison tables, FAQ sections, product boxes, TOC, short paragraphs, mobile check —
review against current post templates once Phase 2 content work starts.

## Phase 9 – Monetization (queued, needs a separate decision before starting)

Affiliate links (Amazon UK + others), comparison tables, newsletter signup, downloadable
guide, display ads once traffic justifies it. **Flag: affiliate monetization needs a
UK ASA/CAP-compliant disclosure page and legal review before going live — bigger than a
content tweak, decide deliberately when this phase starts, don't fold into Phase 1.**

## Phase 10 – Analytics (already running)

Already tracked monthly-plus in `UK-ANALYTICS.md`: organic traffic, impressions, CTR,
indexed pages, Pinterest engagement. Add keyword-ranking trend and backlink count once
Phase 6/7 are active; revenue/RPM/conversion once Phase 9 is active.

---

## Weekly Routine (starts after 2026-08-24, not during the hold)

2–3 articles/week, refresh 2 older articles/week, 2–3 backlinks/week, ongoing internal
linking, 20–30 keywords researched/week, GSC opportunity check, fix high-impression/
low-CTR pages. **This is a real time commitment for the user, not just Claude — confirm
cadence is actually sustainable before treating it as the standing plan**, rather than
assuming it by default.

## AI Workflow Note

Use AI for leverage on volume tasks (keyword research, content briefs, outlines,
internal-link suggestions, image prompts, outreach email drafts, article refreshes,
competitor analysis) — already how the blog skills in this repo work. Always review
delegated/generated output before publishing, same standard as any other draft.

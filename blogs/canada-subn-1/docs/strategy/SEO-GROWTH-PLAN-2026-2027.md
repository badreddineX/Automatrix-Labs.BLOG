# SEO Growth Plan 2026–2027 — SmallSpaceHome.ca

Adopted 2026-07-30. **Update, same day: the original content hold below has been
overridden by explicit user request** — see "Daily Trend-Content Loop" note under
Phase 2. The 2026-08-24 date still stands as the analytics re-check checkpoint, it just
no longer blocks new content production. See `CANADA-ANALYTICS.md` for the data this
plan is built against, and root `CLAUDE.md` for the current-decision record.

~~Applies alongside the existing hold decision in root `CLAUDE.md`: no ranking-affecting
content/link changes before the 2026-08-24 GSC/GA4 checkpoint. Only Phase 1
foundational/technical fixes are being executed now; everything else is queued to start
once that checkpoint confirms the current approach is working.~~ (superseded 2026-07-30)

---

## Phase 1 – Foundations (in progress now, safe during the hold)

Status as of 2026-07-30 audit:

- [x] Internal link audit/fixes — already done across three passes (2026-07-25/26), all
  23 posts have 2+ inbound links, no broken internal links found (verified 2026-07-30,
  all 32 current posts resolve cleanly).
- [x] Sitemap/indexing — confirmed clean via URL Inspection API, no action needed.
- [x] Title tags / meta descriptions — audited 2026-07-25, all within good length ranges,
  no rewrites needed.
- [ ] **Privacy Policy** exists (`privacy-policy.astro`) and **Terms** exists — done.
- [ ] **About page** exists (`about.astro`, 648 lines, substantive) but contact form is
  embedded inside it rather than its own page — **gap: no standalone `/contact` route.**
- [ ] **Gap: no Editorial Policy / "how we choose products" page.**
- [ ] **Gap: no standalone Author bio page** (author only appears as a small card inside
  About, no per-post bylines).
- [ ] **Image compression**: `public/images/` totals 23 MB, no single file over ~312 KB
  (below the 500 KB red-flag line), but a lot of files sit in the 150–300 KB range —
  worth a batch compression pass given the total volume, not urgent.
- [ ] Core Web Vitals — not yet re-measured against this plan; check via `blog-google`
  PageSpeed/CrUX pull next.

**Next Phase 1 actions**: split `/contact` out of About into its own route, write an
Editorial Policy page, add a proper `/author` page — these are pure trust/EEAT additions,
don't touch rankings-sensitive content, safe to do before 08-24.

---

## Phase 2 – Topic Clusters (active, no longer gated on 08-24)

**Daily Trend-Content Loop (active 2026-07-30):** write one new article per day
targeting a genuine trending keyword (Pinterest trend data or GSC-adjacent demand),
paired with one new promotional pin for that specific article — on top of the existing
3 pins/day baseline. **Check the existing `pinterest-pins/` library for topical/photo
overlap before building each trend pin** — this was tried once already (2026-07-28) and
reverted because several trend pins duplicated existing pin wording/photos almost
exactly. New daily articles should default into whichever pillar below fits, with
Storage Solutions the priority lane given the data below — but a genuinely strong trend

**Hard rule, confirmed with user 2026-07-30: exactly ONE article per day, no more.**
Extra drafted articles get written ahead of time and queued in `BLOGS TO POST/`, but
only one moves into `src/content/blog/` (published) per calendar day — this is what
signals a consistent daily-posting pattern to Google, and publishing a backlog all at
once defeats that purpose. Before publishing a new article, check whether one has
already gone out today (see `git log --oneline -5` on the site repo, or the most recent
`datePublished` among posts) — if yes, hold the next one for tomorrow regardless of how
many drafts are sitting ready. This rule persists across sessions; it is not a one-time
instruction.
keyword outside that pillar is still worth writing, not forced into it.

Pillar pages planned for:
- Small Apartment Living
- Storage Solutions
- Small Kitchen Ideas
- Small Bathroom Ideas
- Home Office Ideas
- Multifunctional Furniture
- Organization Tips
- Apartment Decorating

Each pillar to support 10–20 related articles. **Data already points at Storage
Solutions as the strongest pillar to build out first** — it's the #1 topic by two
independent signals (Pinterest "storage"/"budget-tips" board engagement, and GSC's
best-ranked query site-wide, "bathroom storage units... rented flat," pos 4.9). Content
duplication was already found and resolved in decor/organization lanes (2026-07-21 —
see `CANADA-ANALYTICS.md` Scaling Decisions Log); new pillar content must have a
genuinely distinct angle, not just refill an existing lane.

## Phase 3 – Internal Linking (ongoing discipline, not a one-time project)

Per new article: 5–10 internal links out, update 5–10 old articles to link back,
descriptive anchor text, link to pillar pages. Already the working pattern here (see
Phase 1 status above) — just needs to continue as new content ships in Phase 2+.

## Phase 4 – High Commercial Intent Content (queued)

Best/Top/Review/Comparison/Under $100/IKEA Alternatives/Amazon Finds/Before & After/
Buying Guides. Ties directly into the Fourthwall store's article-matching strategy per
root `CLAUDE.md` — when writing these, always decide which store product the article
should link to, not publish-and-forget.

## Phase 5 – EEAT (partially Phase 1, partially ongoing)

About/Contact/Editorial/Author/Privacy gaps tracked in Phase 1 above. Image credits and
sources/references should be spot-checked per-article as part of the next full content
audit (post-08-24).

## Phase 6 – Backlinks (queued, starts after 08-24 checkpoint)

Target 5–10 quality backlinks/month: guest posts, HARO-equivalent, home decor/interior
design blogs, Canadian sites specifically, resource pages, digital PR.

## Phase 7 – Topical Authority (queued — data-backed direction already set)

Dominate Storage Solutions (small apartment storage, rented-flat storage specifically)
rather than spreading across many unrelated topics — same conclusion as Phase 2, driven
by real GSC + Pinterest data, not a guess.

## Phase 8 – User Experience (queued)

Comparison tables, FAQ sections, product boxes, TOC, short paragraphs, mobile check —
review against current post templates once Phase 2 content work starts.

## Phase 9 – Monetization (queued, needs a separate decision before starting)

Affiliate links (Amazon + others), comparison tables, newsletter signup, downloadable
guide, display ads once traffic justifies it. **Flag: affiliate monetization needs an
FTC-equivalent disclosure page and legal review before going live — bigger than a
content tweak, decide deliberately when this phase starts, don't fold into Phase 1.**

## Phase 10 – Analytics (already running)

Already tracked monthly-plus in `CANADA-ANALYTICS.md`: organic traffic, impressions,
CTR, indexed pages, Pinterest engagement. Add keyword-ranking trend and backlink count
once Phase 6/7 are active; revenue/RPM/conversion once Phase 9 is active.

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

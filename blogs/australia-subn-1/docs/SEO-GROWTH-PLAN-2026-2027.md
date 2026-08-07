# SEO Growth Plan 2026–2027 — outdoorcoastalhome.com

Adopted 2026-08-07, as part of reactivating the Australia blog after a pause. This
mirrors the Canada/UK growth-plan structure (`blogs/canada-subn-1/docs/SEO-GROWTH-PLAN-2026-2027.md`
and the UK equivalent) so all three country blogs run the same operating model. See
`AUSTRALIA-ANALYTICS.md` (one level up) for the data this plan will be built against
once analytics access is confirmed — **that access is not yet verified for Australia,
see the note under Phase 1.**

---

## Starting position (2026-08-07 audit)

Unlike Canada/UK at their equivalent starting point, Australia is not starting from
zero — it already has 42 published posts (vs. Canada's 38, UK's 40) at an average
quality score of ~85/100 (per `website/blog-audit-report.md`, dated 2026-07-16). The
site builds clean with no errors. The gap closed by this plan is entirely
process/tracking infrastructure — analytics logging, a growth plan, drafting/pinning
folders — not content volume or code health.

## Phase 1 – Foundations

- [x] Site builds clean (`npm run build`, 48 pages, zero errors — verified 2026-08-07).
- [x] Content bugs from the 2026-07-16 audit (unrendered placeholders, mojibake
  encoding, broken stub links, missing tldr/faqs frontmatter) — re-checked 2026-08-07,
  **all already resolved**, no further action needed.
- [x] `/about` page exists (`src/pages/about.astro`).
- [ ] **Gap: GSC/GA4 API access not yet set up for outdoorcoastalhome.com.** Canada and
  UK both use the shared service account (`claude-blog@smallspace-home.iam.gserviceaccount.com`,
  config at `~/.config/claude-seo/google-api.json`) — that config currently has no
  Australia GSC property or GA4 property ID. Needs: (1) outdoorcoastalhome.com added as
  a property in Search Console with the service account granted access, (2) a GA4
  property created/linked and its property ID recorded. **Cannot start the analytics log
  below with real data until this is done** — flag to user before assuming parity with
  Canada/UK on the reporting side.
- [ ] Editorial Policy / Author bio page — same EEAT gap Canada/UK also have open,
  not Australia-specific.
- [ ] Core Web Vitals — not yet measured for this site.

## Phase 2 – Topic Clusters / Daily Content Loop

Once analytics access confirms which queries/pages are already getting traction,
apply the same daily-trend-content loop Canada/UK use: one new article per day
targeting a genuine trending keyword, paired with one new promotional Pinterest pin,
checked against the pin library first to avoid the topical/photo duplication mistake
already made once on Canada/UK (2026-07-28, reverted). **Do not start this loop for
Australia until the pause is formally lifted with the user** — this plan prepares the
infrastructure, it does not itself restart daily publishing.

Coastal/outdoor decor pillar candidates (from the existing 42-post base, to be
confirmed against real keyword data once GSC access exists):
- Coastal Home Decor
- Outdoor & Patio Living
- Coastal Bedroom/Living Room Styling
- Home Office (coastal)
- Budget/Kmart-Bunnings-IKEA Australia buying guides

## Phase 3 – Internal Linking

Same discipline as Canada/UK: 5–10 internal links out per new article, update 5–10
existing articles to link back, descriptive anchor text, link to pillar pages. Not yet
audited for Australia — first action once Phase 2 starts.

## Phase 4 – High Commercial Intent Content (queued)

Best/Top/Review/Comparison/Under $X/Buying Guides — tie to the Fourthwall AU store's
article-matching strategy per root `CLAUDE.md`, once that store exists/is confirmed
active for Australia.

## Phase 5 – EEAT (partially Phase 1, partially ongoing)

About page exists; Editorial Policy, standalone Author page, and per-post bylines are
open gaps (matches the same gap Canada/UK have).

## Phase 6 – Backlinks (queued)

Target 5–10 quality backlinks/month once Phase 2 content is active again.

## Phase 7 – Topical Authority (queued)

Once real GSC data exists, identify the single strongest-performing pillar (as Canada
did with Storage Solutions) and double down rather than spreading thin.

## Phase 8 – User Experience (queued)

Comparison tables, FAQ sections, product boxes, TOC, mobile check — review against
current post templates once Phase 2 restarts.

## Phase 9 – Monetization (queued)

Needs a separate decision before starting — mirrors Canada/UK's Phase 9 status.

## Phase 10 – Fourthwall Store Alignment (queued)

Confirm the Australia Fourthwall store status (per root `CLAUDE.md`, Australia was
paused/deprioritized — needs an explicit decision on whether the store side restarts
alongside the blog before Phase 4 content gets written).

# SEO Audit — britishhomeinterior.co.uk

Date: 2026-08-13
Scope: Homepage + sitemap (70 URLs, 64 posts) + repo source inspection (astro.config.mjs, vercel.json, package.json, SEO.astro, BlogPost.astro, scripts/). Live crawl sampled ~15-20 built pages from `dist/` plus curl checks of homepage/robots/sitemap/headers. No paid backlink/CWV field-data APIs used.

## Executive Summary

**Overall SEO Health Score: 84/100**

Business type: content blog (UK home-decor, Pinterest-driven, Astro on Vercel). This site is **not** a stale fork of the Canada site's earlier state — it appears to have received most of the same fixes already, and in some areas (FAQPage schema coverage, per-post lastmod) is further ahead. One real gap remains: **no CSP header**, matching what Canada had before its fix.

### Already fixed (verified in repo + built HTML, no work needed)
- WebP conversion pipeline (`scripts/to-webp.mjs`, `compress-new-images.mjs`) — card thumbnails ship as `.webp` with `srcset`/`sizes` for responsive delivery.
- `loading="lazy"` applied consistently across body/card images site-wide (hero images correctly use `loading="eager" fetchpriority="high"` instead, which is correct practice).
- `postbuild` script (`scripts/inject-image-dimensions.mjs`) patches width/height onto built HTML images to prevent CLS.
- FAQPage schema present on **58/58** individual blog posts (100% coverage), alongside BlogPosting, BreadcrumbList, Person, Organization, ImageObject schema.
- Per-post `dateModified` read from frontmatter and injected into sitemap `lastmod` (astro.config.mjs) — real freshness signals, not synthetic ones.
- Canonical tags correct and self-referencing on sampled posts.
- Security headers largely present: HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy (via `vercel.json`).
- No duplicate meta descriptions found across the sampled/checked posts.

### Still missing / needs work
1. **No Content-Security-Policy header** — `vercel.json` headers block has X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy but no CSP entry at all. (Critical/High — same class of fix as Canada.)
2. **No homepage FAQPage schema** — homepage JSON-LD only has Organization + WebSite; every blog post has FAQPage but the homepage (highest-authority page) doesn't. (Medium-High.)
3. **No llms.txt** — confirmed 404 at `/llms.txt`. AI-crawler-facing content guide absent (Medium, AI/GEO readiness).
4. **Over-length titles** — 15+ of 64 posts have a displayed title (incl. " | British Home Interior" suffix) over 70 characters (worst: 85 chars, "Afrobohemian & Global Decor Ideas for UK Homes on a Budget | British Home Interior"). Several truncate in SERPs. (Medium.)
5. **kitchen-on-a-budget-uk internal link coverage is moderate, not strong** — see dedicated section below. Only kitchen-cluster and a few cross-category posts link to it; bedroom/living-room-only posts largely don't, despite it driving 48% of GSC impressions per PINTEREST-SEO.md.

## Technical SEO (score: 90/100)
- `robots.txt`: `Allow: /` for all agents, correct sitemap reference to `sitemap-index.xml`. No crawl blocks found.
- `sitemap-index.xml` → `sitemap-0.xml`, 70 URLs, each carrying a real per-post `lastmod` (see astro.config.mjs logic) — genuinely useful freshness signal, better than a flat build-time timestamp.
- HTTPS enforced, HSTS present (`max-age=63072000`), served via Vercel edge cache (`X-Vercel-Cache: HIT`).
- Trailing slashes consistent (`trailingSlash: 'always'` in both astro.config.mjs and vercel.json).
- Redirects for consolidated/cannibalized posts are defined in `astro.config.mjs` (5 redirects), a clean pattern for content consolidation.
- Gap: **CSP header absent** (see above). No `Content-Security-Policy` key anywhere in `vercel.json`.
- Note: direct `curl https://.../sitemap.xml` (without `-index`) returns the site's custom 404 page (still HTTP 200, `noindex` meta) rather than a 404 status — the *correct* sitemap URL (`sitemap-index.xml`, as declared in robots.txt) works fine. Not a real bug, but if any tool/submission assumes the conventional `/sitemap.xml` path it will silently get the 404 page's HTML instead of an error — worth being aware of when submitting to other engines (Bing, IndexNow tools) that may guess the default path.

## Content Quality (score: 85/100)
- 64 posts live (58 with full FAQPage-schema coverage confirmed; the ~6 URL difference includes about/author/contact/policy pages, not additional undiscovered posts).
- Spot-checked word counts on 3 kitchen-cluster posts: ~4,500 words of rendered HTML each (this includes template chrome, not pure prose — treat as a rough floor, not exact word count) — no signs of thin content in the sample.
- No duplicate meta descriptions detected across checked posts — each is topically distinct with UK retailer/price specificity (Dulux, Farrow & Ball, IKEA, Dunelm, Amazon UK), a genuine E-E-A-T/specificity strength versus generic decor content.
- Redirect list shows active cannibalization cleanup discipline (5 merges as of 2026-07-29) — good ongoing hygiene.

## On-Page SEO (score: 78/100)
- Canonical tags correct on sampled pages.
- H1 present once per post; heading hierarchy present (multiple H2s per post, e.g. 15 on kitchen-on-a-budget-uk).
- **Title length issue**: 15+ posts exceed ~70 displayed characters; worst case 85 chars. Google typically truncates displayed titles around 55-60 characters / ~600px, so long titles risk truncation or a rewritten SERP title. Not urgent-critical but a real on-page quality gap, same category as Canada's finding.
- Meta descriptions present and unique; lengths not individually audited character-by-character in this pass but the sampled set reads as concise (under ~160 chars) and specific.

## Schema & Structured Data (score: 92/100)
- Homepage: Organization + WebSite JSON-LD present. **No FAQPage on homepage.**
- Blog posts: BlogPosting, FAQPage (Question/Answer), BreadcrumbList, Person, ImageObject, Organization — full stack, present on all 58 posts checked. This is stronger schema coverage than the Canada site had before its own fixes this session.
- No validation errors observed in the JSON-LD samples pulled.

## Performance (score: n/a — not independently lab-tested this pass)
- No Lighthouse/CWV field data pulled (no Google API credentials check run in this pass; out of the explicitly scoped process for this task). Vercel edge caching (`X-Vercel-Cache: HIT`), inlined stylesheets (`build: { inlineStylesheets: 'always' }` in astro.config.mjs, explicitly done to cut ~650ms of render-blocking CSS per an inline code comment), and postbuild image-dimension injection (CLS mitigation) are all structural positives already in place. Treat Performance as "likely good, not independently measured" rather than scored numerically — flagged as a scoping limitation.

## AI Search Readiness / GEO (score: 70/100)
- `llms.txt` absent (404 confirmed).
- FAQPage schema on every post is a real GEO asset (Q&A pairs are directly extractable by AI answer engines).
- No homepage FAQPage — a missed opportunity since the homepage is often the page AI crawlers use to understand site identity/scope.
- robots.txt has no explicit allow/disallow for AI user-agents (GPTBot, PerplexityBot, ClaudeBot, etc.) — the blanket `Allow: /` covers them by default, which is fine, but nothing proactively signals AI-friendliness the way an `llms.txt` would.

## Images (score: 90/100)
- WebP + responsive `srcset`/`sizes` on card thumbnails, confirmed in built HTML.
- `loading="lazy"` correctly applied to below-fold images; hero images correctly excluded (eager + fetchpriority=high, which is best practice, not a bug).
- Width/height attributes patched onto local images via postbuild script to prevent layout shift.
- Not verified: alt-text quality/coverage across all 64 posts (spot-checked posts had descriptive, keyword-relevant alt text, e.g. "Cheap Kitchen Makeover UK: 14 Affordable Ideas").

## kitchen-on-a-budget-uk internal link coverage (specific check requested)

Per `pinterest content/PINTEREST-SEO.md`, this page reportedly drives ~48% of all GSC impressions. Checked which built pages link to it:

**20 files reference `/blog/kitchen-on-a-budget-uk/`**, including:
- Homepage (`dist/index.html`)
- Blog index (`dist/blog/index.html`)
- Kitchen category page (`dist/blog/category/kitchen/index.html`)
- RSS feed and sitemap (expected, not editorial links)
- 13 individual blog posts: `budget-home-makeover-uk`, `budget-kitchen-cabinet-makeover-uk`, `budget-kitchen-flooring-ideas-uk`, `budget-kitchen-splashback-tile-ideas-uk`, `budget-kitchen-worktop-makeover-uk`, `grandma-core-kitchen-ideas-uk`, `hidden-pantry-ideas-uk`, `home-interior-ideas-uk`, `kitchen-decor-ideas-uk`, `rental-kitchen-upgrade-ideas-uk`, `rented-flat-makeover-uk`, `small-kitchen-island-ideas-uk`, `small-kitchen-storage-ideas-budget-uk`, `unfitted-kitchen-ideas-uk`.

**Assessment: moderate, not strong, coverage.** Of 64 posts, only ~13 (about 20%) link to it — and every one of them is already a kitchen-topic post, i.e. the page is well-linked *within its own cluster* but has almost no incoming links from the bedroom, living-room, seasonal, or renter-lifestyle post clusters (e.g. `cosy-bedroom-ideas-uk`, `small-living-room-ideas-uk`, `renter-friendly-living-room-ideas-uk`, `christmas-home-decor-ideas-uk` do not link to it, based on this check). For a page reportedly driving nearly half of all site impressions, cross-cluster internal links (e.g. "on a budget" mentions in bedroom/living-room posts linking through to the flagship budget-kitchen guide) would spread its authority further and is the same category of opportunity flagged for Canada's top query. This is a quick, low-risk content edit (add 1-2 contextual links per non-kitchen post), not a structural change.

## Scoping limitations
- Crawl sample: homepage + sitemap + ~15-20 built post pages inspected directly from local `dist/` build output (more reliable than re-crawling live, since the repo was just rebuilt) plus live curl checks for headers/robots/sitemap.
- No paid backlink API configured — backlink profile assumed near-zero for a young site, not independently verified (per task scope).
- No live Lighthouse/CWV/PageSpeed run in this pass.
- Alt-text and title-length were spot-checked, not audited on all 64 posts individually.

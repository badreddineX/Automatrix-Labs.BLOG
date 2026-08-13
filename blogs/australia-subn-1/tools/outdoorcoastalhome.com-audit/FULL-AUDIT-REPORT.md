# SEO / Technical / Content Audit — outdoorcoastalhome.com

**Date:** 2026-08-12
**Scope:** Live site only (https://outdoorcoastalhome.com). Homepage, /about, /blog listing, 3 legal pages, 1 category page, and 8 sampled blog posts fetched directly; full 56-URL sitemap enumerated. Google PageSpeed Insights (live, mobile) run against the homepage.
**Not covered:** GSC/GA4 for this domain — API credentials exist for the Google Cloud project but are not yet linked to the outdoorcoastalhome.com property (per project CLAUDE.md). All indexation/traffic figures below are inferred from sitemap + crawl behavior, not verified GSC data. CrUX field data unavailable (insufficient Chrome traffic volume — expected for a low-traffic, recently-reactivated site).

## Overall SEO Health Score: 68 / 100

| Category | Weight | Score |
|---|---|---|
| Technical SEO | 22% | 70 |
| Content Quality | 23% | 78 |
| On-Page SEO | 20% | 76 |
| Schema / Structured Data | 10% | 55 |
| Performance (CWV) | 10% | 65 |
| AI Search Readiness | 10% | 50 |
| Images | 5% | 55 |

Business type detected: content publisher / niche affiliate blog (Australian coastal/outdoor home decor), monetized via Pinterest-driven traffic to a matched Fourthwall print-on-demand store per article.

## Executive Summary

The site is technically sound at the infrastructure level (correct redirects, real 404s, clean canonical tags, strong Lighthouse Best-Practices/SEO/Accessibility scores) and the content itself is genuinely differentiated — long-form (3,000-4,500 words), first-person, specific (AUD prices, named Australian retailers, real timeframes) rather than generic AI filler. That's the right foundation for both Google rankings and AI citation.

The gaps are concentrated in three places: (1) structured data exists only on blog posts and is completely absent from every other page type, (2) images are unoptimized raw JPEGs with no modern formats or responsive sizing, which live PageSpeed data confirms is costing real LCP time (4.1s mobile, above the 2.5s "good" threshold), and (3) baseline security headers and a functioning /sitemap.xml path are missing — both cheap, mechanical fixes.

Given the site was only reactivated 2026-08-07, none of this is alarming for the stage it's at — it reads as a site where the content work has outpaced the technical polish, which is the right order of priorities but worth closing now.

## Technical SEO

- robots.txt: `Allow: /` for all agents, correctly references `Sitemap: https://outdoorcoastalhome.com/sitemap-index.xml`.
- Sitemap chain works: sitemap-index.xml → sitemap-0.xml → 56 URLs, all returning 200. However, the naive `/sitemap.xml` path (which many tools default to) resolves to the site's rendered 404 page instead of redirecting — a real discoverability trap for anything not reading robots.txt first.
- Canonical tags: present, self-referential, correct on every page sampled.
- Redirects: www→apex and http→https both correctly 308 to `https://outdoorcoastalhome.com/`.
- 404 handling: verified — a nonexistent blog slug returns a true 404 status.
- Security headers: only `Strict-Transport-Security` present. No `X-Content-Type-Options`, `X-Frame-Options`, `Content-Security-Policy`, `Referrer-Policy`, or `Permissions-Policy` on any page checked.
- Indexation risk: `/blog/category/hamptons-style` (thin listing) is in the sitemap; `/blog?tag=...` filter URLs are linked from posts but not canonicalized/noindexed.

## Content Quality

Sampled 8 blog posts (spread across the sitemap, old-numbered and newer un-numbered slugs):

| Post | Word count | Notes |
|---|---|---|
| Pergola Entertaining Ideas | 3,162 | first-person "4 years", AUD prices, local retailers |
| Australian Coastal Colour Palette | 4,490 | Dulux/Taubmans codes, room-by-room |
| Indoor Plants Coastal Home | 4,105 | Australian nursery pricing |

E-E-A-T signals present: named author (Badreddine Br) with Person schema linking to /about, an Editorial Policy page (uncommon for this niche — a genuine trust signal), consistent AUD pricing and named Australian retailers (Temple & Webster, Beacon Lighting, Dulux, Taubmans) throughout. This reads as experience-backed content suited to both ranking and AI citation, not generic AI filler.

Weak points: /about doesn't establish concrete author credentials beyond a name; category pages are thin auto-generated listings with minimal unique copy.

## On-Page SEO

Every page sampled has a unique title tag and meta description, a single H1, and correct self-referential canonicals. Internal linking is solid — ~9 contextual internal links per blog post plus category/tag links. Weakness: static/legal pages (home, about, blog, privacy, terms) all reuse the same generic Unsplash photo as their `og:image` instead of a purpose-built social card.

## Schema / Structured Data

Blog posts (8/8 sampled) carry a full, well-formed schema graph: `BlogPosting`, `FAQPage` with real `Question`/`Answer` entries tied to on-page content, `BreadcrumbList`, `Person` (author), `Organization` (publisher), `ImageObject`, `WebPage`. This is strong.

Every non-post page checked (homepage, /about, /blog, /editorial-policy, /privacy-policy, /terms-of-use) returned **zero** schema markup — no `WebSite`, no `Organization` on the homepage itself, nothing.

## Performance (Core Web Vitals)

Live Google PageSpeed Insights, mobile, homepage:

- Performance: 83/100, Accessibility: 96/100, Best Practices: 100/100, SEO: 100/100
- LCP: **4.1s** (needs-improvement; "good" is ≤2.5s)
- CLS: 0.002 (excellent)
- TBT: 150ms (good)
- Flagged: "Improve image delivery" — ~1,985 KiB potential savings; total page weight 2,875 KiB
- CrUX (real-world field data): not yet available for this origin — insufficient Chrome traffic, expected at this traffic stage

## Images

Alt text: present and descriptive on 100% of images sampled (0 missing across all pages checked) — genuinely good discipline. Hero images correctly use `loading="eager" fetchpriority="high"`; below-fold images use `loading="lazy"`.

Format/sizing: every image is a flat `.jpg` at 150-170KB+, no WebP/AVIF, no `srcset`/responsive sizing — this is the direct, measured cause of the LCP and page-weight findings above.

## AI Search Readiness (GEO)

FAQPage schema tied to genuine on-page Q&A content is already a strong structural asset for AI Overviews/Perplexity/ChatGPT citation, and the answer-first, specific (priced, sourced) writing style is exactly what these systems prefer to quote. The gap is purely mechanical: no `llms.txt`, no explicit AI-crawler guidance beyond the blanket `Allow: /` in robots.txt.

## Gaps in This Audit

- **GSC/GA4 not connected for this domain** — no real indexation status, click/impression data, or organic traffic trends. All findings above are inferred from live crawl + PageSpeed, not verified search performance data. Recommended as a Phase 3 action.
- Sample-based: 8 of 50 blog posts fetched directly (not all 45-50 individually re-verified); findings are representative given the consistent shared template observed across every post checked.

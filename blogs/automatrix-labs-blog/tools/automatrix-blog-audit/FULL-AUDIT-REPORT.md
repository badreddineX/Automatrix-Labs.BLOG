# AutoMatrix Labs — SEO & Content Quality Audit

**Site audited:** https://automatrix-blog.vercel.app
**Date:** 2026-08-12
**Method:** Live HTTP checks (curl/robots.txt/sitemap.xml/headers), WebFetch rendering of homepage + sample post pages, and full read of all 26 MDX post files + all relevant `app/` route/layout source files on disk. No browser automation was available — **real Core Web Vitals / Lighthouse scores were not measured and are not reported anywhere in this audit.**

## Overall SEO Health Score: 75 / 100

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 22% | 78 | 17.2 |
| Content Quality | 23% | 68 | 15.6 |
| On-Page SEO | 20% | 85 | 17.0 |
| Schema / Structured Data | 10% | 65 | 6.5 |
| Performance (structural signals only — no CWV) | 10% | 70 | 7.0 |
| AI Search Readiness (GEO/AEO) | 10% | 75 | 7.5 |
| Images | 5% | 88 | 4.4 |
| **Total** | | | **75.2 → 75** |

### Rationale
This is a technically well-built, above-average small blog: clean Next.js App Router metadata plumbing, working sitemap/robots, per-post canonical tags, FAQ schema on all 26 posts, healthy word counts, and genuinely descriptive image alt text. The score is held back not by broken infrastructure but by **content-trust and freshness gaps that are structural, not accidental**: every post shares one fictional-reading byline that contradicts the About page's real-person claim, every post has the identical publish date with a `dateModified` field that can never differ from `datePublished`, and the affiliate monetization component (the actual business model) is used in only 19% of posts. None of these block indexing, but they cap how far E-E-A-T, AI-citation trust, and revenue can go without changes.

## Business/site context
- Next.js 14 App Router, MDX posts, no custom domain live yet (`.vercel.app` subdomain only) — matches prior known status.
- 26 published posts found (sitemap + `content/posts/*.mdx` both agree), not 21 as stated in the repo's CLAUDE.md — the post count has grown since that doc was last updated.
- Monetized via SaaS affiliates + display ads (`<AffiliateLink>` component), not the Pinterest→Fourthwall product loop used by this monorepo's other blogs — content/CTAs were judged against that affiliate model per instructions.

## Crawl coverage
- Fetched: `robots.txt`, `sitemap.xml`, homepage, `/about`, `/privacy-policy`, `/terms-of-use`, a sample post (`/blog/claude-ai-review`), and a deliberately-invalid post URL (404 check).
- Read on disk: all 26 `content/posts/*.mdx` files (100% of published posts, not a sample), `layout.tsx`, `blog/[slug]/page.tsx`, `about/page.tsx`, `sitemap.ts`, `robots.ts`, `MDXComponents.tsx`.
- Full findings by category: `findings/technical.md`, `findings/content.md`, `findings/onpage.md`, `findings/schema.md`, `findings/images.md`.

## Top 5 Critical Issues
1. **Author identity contradiction (E-E-A-T).** All 26 posts are bylined "Alex Morgan" (generic title, picsum placeholder avatar, no bio page), while `/about` names a different real person ("Badreddine") who claims to have personally written every article. This is a direct, checkable inconsistency.
2. **`dateModified` can never be accurate.** It's hardcoded equal to `datePublished` in the JSON-LD for every post — freshness signals are structurally broken even if content is edited later.
3. **All 26 posts share one publish date** (2026-08-07) — reads as a single batch-publish, not an editorial cadence; weakens freshness/authority signal over time.
4. **No custom domain live.** Running only on `automatrix-blog.vercel.app` limits brand trust, and any future domain move requires re-verification and redirects.
5. **Affiliate CTAs present in only 5/26 posts (19%)** despite affiliate revenue being the stated business model — direct, fixable revenue leakage.

## Top 5 Quick Wins
1. Fix `dateModified` in `blog/[slug]/page.tsx` to track a real "last updated" value (even a manually-set frontmatter field) instead of reusing `date`.
2. Add `<AffiliateLink>` CTAs to the 21 posts currently missing one, especially the tool-comparison/review posts that already name specific paid products.
3. Add `X-Content-Type-Options: nosniff`, `Referrer-Policy`, and a basic `Content-Security-Policy`/`X-Frame-Options` via `next.config.js` headers — cheap, no content risk.
4. Add `/privacy-policy` and `/terms-of-use` to `sitemap.ts` — both already return 200 and are indexable, just missing from the sitemap.
5. Reconcile the author story: either give "Alex Morgan" a real author bio page linked from every post, or rename the byline to match the About page's real, named founder — pick one consistent identity.

## Full artifact list
- `automatrix-blog-audit/FULL-AUDIT-REPORT.md` (this file)
- `automatrix-blog-audit/ACTION-PLAN.md`
- `automatrix-blog-audit/audit-data.json`
- `automatrix-blog-audit/findings/technical.md`
- `automatrix-blog-audit/findings/content.md`
- `automatrix-blog-audit/findings/onpage.md`
- `automatrix-blog-audit/findings/schema.md`
- `automatrix-blog-audit/findings/images.md`

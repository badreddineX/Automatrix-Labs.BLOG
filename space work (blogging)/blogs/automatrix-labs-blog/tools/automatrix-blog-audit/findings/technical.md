# Technical SEO — Findings

**Score: 78/100**

## Method / limitations
Checked live via `curl` (robots.txt, sitemap.xml, response headers on `/`, `/blog/claude-ai-review`, `/about`, `/privacy-policy`, `/terms-of-use`, a 404 URL) and read `src/app/robots.ts`, `src/app/sitemap.ts` in source. No browser automation available in this environment — Lighthouse/PageSpeed/Core Web Vitals were **not measured** and are not reported; only structural/HTML signals visible via HTTP are covered.

## What works
- `robots.txt` (auto-generated via `robots.ts`): `Allow: /` for all user agents, correctly points to `Sitemap: https://automatrix-blog.vercel.app/sitemap.xml`. No accidental blocking.
- `sitemap.xml` is valid XML, auto-generated from `getAllPosts()`, contains all 26 published posts + home + `/blog` + `/about`, with `lastModified`/`changefreq`/`priority`.
- Root layout sets `robots: { index: true, follow: true }` — no sitewide noindex.
- 404 handling works correctly: a nonexistent post slug (`/blog/nonexistent-post-xyz`) returns a genuine HTTP 404, not a soft-404 200.
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` present on all responses (Vercel default) — HTTPS enforced.
- Canonical tags are set in source (`alternates: { canonical: ... } `in `blog/[slug]/page.tsx`) for every post.
- Page weight is reasonable: homepage HTML response `Content-Length: 116768` bytes (~114KB), a post page ~106KB — not bloated.
- Uses `next/font` (Inter, JetBrains Mono, Instrument Serif) — self-hosted Google Fonts, avoids a render-blocking third-party font request.

## Issues found

| Severity | Issue | Evidence |
|---|---|---|
| High | **No custom domain live** — site only resolves at `automatrix-blog.vercel.app`. A `.vercel.app` subdomain carries weaker trust/brand signal, cannot be the canonical long-term URL, and any link equity built now will need a domain migration later (301s, GSC re-verification). Matches known status in CLAUDE.md. | robots.txt/sitemap/headers all reference this URL as canonical |
| Medium | **Missing security headers**: no `X-Content-Type-Options`, no `X-Frame-Options`/`frame-ancestors`, no `Content-Security-Policy`, no `Referrer-Policy` on any response checked. | `curl -sI` output on `/` and `/blog/claude-ai-review` |
| Medium | **Sitemap omits indexable pages**: `/privacy-policy` and `/terms-of-use` both return HTTP 200 and are indexable, but neither appears in `sitemap.xml`. Category (`/category/[name]`) and tag (`/tags/[tag]`) pages are also absent. | curl status checks + sitemap.xml content |
| Low | `sitemap.ts` sets `lastModified: new Date()` (today, at build time) for home/blog/about instead of a real content-change date — cosmetically inflates freshness signal but not harmful. | `src/app/sitemap.ts` lines 17-19 |
| Info | No `llms.txt` file found (increasingly used as an AI-crawler discovery signal; not yet a standard, but a low-cost addition given this site explicitly targets AI/GEO topics). | not present in crawl |

## Not measurable in this environment
- Core Web Vitals (LCP/INP/CLS) — needs Lighthouse/CrUX field data, not available here.
- Render-blocking JS bundle size / hydration cost — would need a real browser trace.

# Action Plan — outdoorcoastalhome.com

## Phase 1: Critical Fixes (Week 1)
1. Fix `/sitemap.xml` — currently serves the site's 404 page instead of redirecting to `/sitemap-index.xml`. Add a redirect.
2. Add missing security headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, baseline `Content-Security-Policy`) via `vercel.json` `headers()` config.

## Phase 2: High-Impact Improvements (Weeks 2-3)
3. Convert hero/inline images to WebP/AVIF with responsive `srcset` — route through Astro's built-in `astro:assets` image pipeline instead of static files in `/public/images/`. Directly targets the measured ~1,985 KiB PageSpeed penalty and 4.1s mobile LCP.
4. Add `WebSite`/`Organization` JSON-LD to the homepage and `WebPage` schema to `/about`, `/blog`, and the three legal pages — currently zero schema outside blog posts.
5. Add a minimal `llms.txt` at the site root.

## Phase 3: Content & Authority (Month 2)
6. Expand `/about` with concrete author credentials/specifics (location, project history) to match the specificity already used inside the posts.
7. Add unique curatorial copy to category pages (e.g. `/blog/category/hamptons-style`) or exclude thin ones from the sitemap.
8. Canonicalize or `noindex` `/blog?tag=...` filter URLs to prevent index dilution.
9. Set up GSC + GA4 API access for outdoorcoastalhome.com (not yet configured) — unlocks real indexation/query/traffic data for the next audit cycle.

## Phase 4: Monitoring & Iteration (Ongoing)
10. Re-run PageSpeed Insights after image optimization ships; confirm LCP drops under 2.5s.
11. Re-check CrUX field data in 60-90 days once traffic accumulates.
12. Re-audit once GSC/GA4 access is live to replace lab estimates with real search performance data.

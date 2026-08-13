# Technical SEO — outdoorcoastalhome.com

Score: 70/100

## What works
- robots.txt: `Allow: /`, references `Sitemap: https://outdoorcoastalhome.com/sitemap-index.xml`
- sitemap-index.xml → sitemap-0.xml → 56 URLs, all 200
- www→apex and http→https both correctly 308-redirect
- Real 404s on nonexistent paths
- Canonical tags correct and self-referential everywhere checked
- HSTS present (max-age=63072000)

## Findings
1. **[Medium] `/sitemap.xml` serves the 404 page, not the sitemap.** Requesting it directly returns 200 with the rendered "Page Not Found" HTML (~37KB), not XML or a redirect. Fix: redirect `/sitemap.xml` → `/sitemap-index.xml`.
2. **[Medium] Missing security headers.** Only HSTS present. No X-Content-Type-Options, X-Frame-Options, CSP, Referrer-Policy, Permissions-Policy on homepage or any sampled page.
3. **[Low] No llms.txt.** 404 on `/llms.txt`.
4. **[Low] Category/tag URLs indexed with thin/duplicate risk.** `/blog/category/hamptons-style` is in the sitemap as a thin listing; `/blog?tag=...` filter URLs are linked but not canonicalized/noindexed.

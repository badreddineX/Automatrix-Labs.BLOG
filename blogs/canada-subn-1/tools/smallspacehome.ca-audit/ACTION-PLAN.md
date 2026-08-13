# Action Plan — smallspacehome.ca

Prioritized fixes from the FULL-AUDIT-REPORT.md, ordered Critical > High > Medium > Low.
No Critical (indexing-blocking) issues were found — this site's technical foundation is solid.

## Critical (fix immediately)
_None found._ Robots.txt, sitemap, canonical tags, and indexability are all correct.

## High (fix within 1 week)

1. **Add `loading="lazy"` to all in-article images except the hero.**
   Found: 3 of 9 images on the sampled post (`blog-02-img2/3/4.jpg`) have no `loading` attribute at all. Keep the hero as `loading="eager" fetchpriority="high"` (already correct) — only fix the mid-article images.
   File(s) likely affected: the blog post template/component that renders in-article images (check the Astro component used across all 57 posts, since this is templated, not hand-coded per post).

2. **Convert content images to WebP (with fallback) and add responsive `srcset`.**
   Currently all images are fixed-size JPG/PNG (hero ~149KB, served identically to mobile and desktop). If the site uses Astro, wire in `astro:assets`/`<Image>` for automatic WebP + responsive generation — this is the single biggest performance/LCP lever available and also fixes the "next-gen format" and "responsive images" findings in both the Performance and Images categories at once.

## Medium (fix within 1 month)

3. **Shorten the 10-15 worst over-length title tags** (currently up to 88 characters; Google truncates around 55-60). Priority candidates identified in this audit: "Small Apartment Paperwork & Mail Organization Ideas" (88), "15 Small Apartment Reading Nook Ideas That Actually Fit" (88), "Small Apartment Home Gym Storage & Setup Ideas" (83), "Renter-Friendly Bike Storage for Small Apartments" (82), "12 Vertical Storage Ideas (No Drilling Required)" (81). Full list of 35 over-60-char titles is derivable from `audit-scan.txt`/`pages_all/*.html` in this audit folder.

4. **Trim meta descriptions running past ~160 characters** — e.g. the bike-storage post's 205-char description is being truncated in SERPs today. Front-load the value proposition in the first ~150 characters.

5. **Add a Content-Security-Policy header** via `vercel.json` or Astro middleware. Start with `default-src 'self'; script-src 'self' 'unsafe-inline' www.googletagmanager.com www.clarity.ms; img-src 'self' data:; style-src 'self' 'unsafe-inline'` and test thoroughly (GTM/gtag/Clarity all need to keep working) before tightening further.

6. **Add FAQPage schema to the homepage** (currently only WebSite/Organization). 3-4 Q&As such as "Who is SmallSpace Home for," "Are prices shown in CAD," "Do these ideas work in a rental unit" — mirrors the pattern already used successfully on every blog post.

7. **Run a live PageSpeed Insights / CrUX check** on 2-3 representative URLs (homepage, a long post, a short post) to replace this audit's lab-estimated Performance score with real field data — the `blog-google` skill has PageSpeed integration already configured for this project if GA4/GSC credentials are set up for smallspacehome.ca.

## Low (backlog)

8. Add `includeSubDomains; preload` to the HSTS header and consider HSTS preload list submission.
9. Add `ai.txt` as a redundant AI-crawler signal alongside the already-solid `llms.txt` (low priority — llms.txt already covers this).
10. Validate JSON-LD on 2-3 URLs through Google's Rich Results Test (https://search.google.com/test/rich-results) to catch any property-level errors a text-pattern scan can't see.
11. Confirm `dateModified` in BlogPosting schema only changes on genuine content edits, not on every deploy.
12. Consider linking the author's Person schema `sameAs` to an external authority profile (e.g. Pinterest business profile, since that's the primary traffic channel).

## Not actionable via on-page work (context, not a task)

- **Backlink profile is ~zero.** Confirmed pre-existing knowledge, consistent with site age (~1 month). This is the largest score drag but resolves through the existing Pinterest-driven growth strategy and time, not through further on-page changes. No action item here beyond continuing current promotion work.

# AutoMatrix Labs — Action Plan

## Critical (fix immediately)
1. **Resolve the author-identity contradiction.** Decide on one real, consistent author identity across bylines and `/about`, then update either the 26 posts' `author.name` frontmatter or the About page copy so they agree. If keeping "Alex Morgan" as a house pen name, say so honestly and give it a real bio page with credentials — don't let the About page simultaneously claim a different named person wrote everything personally.
2. **Fix `dateModified` in `src/app/blog/[slug]/page.tsx`.** It currently reuses `post.date` for both `datePublished` and `dateModified`, so the freshness signal is structurally fake. Add a real `updated` field to frontmatter (optional, defaults to `date`) and wire it into the JSON-LD.

## High (fix within 1 week)
3. **Add `<AffiliateLink>` CTAs to the 21 posts currently without one** — prioritize the ones that already name specific paid tools (`chatgpt-vs-gemini-for-work.mdx`, `best-ai-tools-for-marketers-2026.mdx`, `best-ai-coding-assistants-2026.mdx`, etc.). This is the actual monetization mechanism for the site; low-effort, direct revenue impact.
4. **Stagger future publish/update dates** so the site stops looking like a single batch-publish. Going forward, genuinely update 2-3 older posts per week (fresh stat, new section) rather than only ever adding new ones — feeds both the freshness signal and #2 above.
5. **Add security response headers** (`X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: SAMEORIGIN`, a basic CSP) via `next.config.js` — no content change, no regression risk, closes an easy technical gap.

## Medium (fix within 1 month)
6. **Add `/privacy-policy` and `/terms-of-use` to `sitemap.ts`** (both already indexable, just missing from the sitemap entries array).
7. **Add `BreadcrumbList` JSON-LD** to match the visual breadcrumb UI already on every post page.
8. **Add sitewide `Organization`/`WebSite` schema** (homepage or root layout) with `sameAs` links to real social profiles, once those exist.
9. **Add `Review`/`AggregateRating` schema** to the `category: "review"` posts (`claude-ai-review`, `notion-ai-review`, `perplexity-ai-review`, etc.) — the `Rating`/`RatingCard` component already renders scores visually; mirror that data into structured data for rich-result eligibility.
10. **Add outbound citations** (vendor pricing pages, official docs) for specific factual claims like pricing ranges — strengthens both classic E-E-A-T and AI-citation trust.

## Long-term / ongoing
11. **Set up the custom domain and re-point DNS**, then update `SITE_URL` constants (`layout.tsx`, `sitemap.ts`, `robots.ts`, `blog/[slug]/page.tsx`) and re-verify in GSC. Flagged as a known open item in the repo's own CLAUDE.md — this audit doesn't change the priority, just reconfirms it's still outstanding.
12. **Set up GA4** for this blog (also a known open item) so future audits can incorporate real organic traffic and query data instead of structural signals only.
13. Consider a lightweight `llms.txt` given the site's own content is about AI/GEO — low cost, matches the site's stated expertise area.
14. Re-run this audit with a real Lighthouse/PageSpeed pass once tooling allows — Performance and Core Web Vitals were not measurable in this environment and the 70/100 performance score here is a structural-signals estimate only, not a lab or field measurement.

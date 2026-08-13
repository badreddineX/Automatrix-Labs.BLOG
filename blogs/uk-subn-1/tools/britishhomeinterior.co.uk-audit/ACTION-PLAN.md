# Action Plan — britishhomeinterior.co.uk

## Critical (fix immediately)
None identified. No indexing blockers, no penalty-risk issues found.

## High (fix within 1 week)
1. **Add a Content-Security-Policy header** in `vercel.json`'s headers block. Same gap Canada had. Start with a report-only or permissive policy allowing GTM/GA (`script-src`), Google Fonts (`style-src`/`font-src`), and self, then tighten. File: `vercel.json`.
2. **Add contextual internal links to `kitchen-on-a-budget-uk` from non-kitchen post clusters** (bedroom, living-room, renter-lifestyle, seasonal posts) — currently only ~13/64 posts (all kitchen-topic) link to it, despite it reportedly driving ~48% of GSC impressions. Add 1-2 natural contextual links per relevant non-kitchen post (e.g. from `small-living-room-budget-uk`, `renter-friendly-bedroom-ideas-uk`, `christmas-home-decor-ideas-uk`, `spring-home-refresh-ideas-uk`).

## Medium (fix within 1 month)
3. **Add FAQPage schema to the homepage.** Every blog post already has it; the homepage — the highest-authority page — doesn't. Reuse the existing FAQ component/pattern from `BlogPost.astro` or `src/components/FAQ.astro`.
4. **Shorten over-length titles.** 15+ of 64 posts exceed ~70 displayed characters (with the " | British Home Interior" suffix); worst case is 85 chars (`afrobohemian-decor-ideas-uk`). Target ≤60 chars for the page-level `<title>` before the site-name suffix where possible, prioritizing the worst offenders first: `afrobohemian-decor-ideas-uk` (85), `unfitted-kitchen-ideas-uk` (82), `renter-friendly-gallery-wall-ideas-uk` (82), `funhaus-decor-ideas-uk` (80), `budget-kitchen-cabinet-makeover-uk` (80).
5. **Add `llms.txt`.** Confirmed absent (404). Low effort, direct AI-crawler signal — list site purpose, key post categories, and link to sitemap.

## Low (backlog)
6. Full alt-text audit across all 64 posts (only spot-checked in this pass; no gaps found in the sample but not exhaustively verified).
7. Consider explicit AI-crawler mentions in `robots.txt` (GPTBot, PerplexityBot, ClaudeBot) even though the blanket `Allow: /` already covers them — purely a clarity/signal move, not functionally necessary.
8. Independently run Lighthouse/PageSpeed or CrUX field data once Google API access is confirmed for this property, to convert the structural performance positives (inlined CSS, image dimension injection, WebP) into a measured score.

## Notes
- No fixes required to image lazy-loading, WebP pipeline, per-post schema, or sitemap freshness — all already correctly implemented in this codebase and verified directly in `dist/` output, not inferred.
- This audit did not find evidence this codebase is a stale fork of Canada's pre-fix state — it looks like this UK site independently received (or already had) most of the same fixes, and is ahead of where Canada was on FAQPage coverage and sitemap lastmod logic. The CSP gap is the one true parity issue with Canada's pre-fix findings.

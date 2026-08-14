# Blogging Ressources

Central hub for every resource, repo, and skill used across the blog projects in `SPACE WORK/blogs/` (UK, Canada, Australia).

## Repositories

| Repo | Path | Purpose |
|------|------|---------|
| [claude-seo](https://github.com/AgriciDaniel/claude-seo) | `claude-seo/` | External SEO skill pack: audits, content briefs, technical SEO, schema, GEO/AEO, hreflang, sitemaps, and more (see `claude-seo/skills/`) |

## Skills already in use (Claude Code built-in `blog` suite)

- `blog-write` — writing new posts
- `blog-rewrite` — rewriting/optimizing existing posts
- `blog-analyze` — 100-point quality scoring
- `blog-audit` — full-site health checks
- `blog-brief` / `blog-outline` — content planning
- `blog-schema` — JSON-LD structured data
- `blog-chart` — inline SVG data visualizations
- `blog-image` — AI-generated hero/inline images
- `blog-seo-check` — on-page SEO validation
- `blog-strategy` / `blog-cluster` / `blog-calendar` — planning and topic clusters
- `blog-repurpose` — social/email/YouTube repurposing

## Skills newly available (from claude-seo)

- `seo-audit`, `seo-technical`, `seo-content`, `seo-content-brief`
- `seo-schema`, `seo-sitemap`, `seo-hreflang`
- `seo-competitor-pages`, `seo-cluster`, `seo-drift`
- `seo-geo` (AI citation optimization)
- `seo-local`, `seo-ecommerce`, `seo-programmatic`
- `seo-google` (Search Console / PageSpeed / GA4 integration)
- `seo-images`, `seo-image-gen`
- `seo-dataforseo`, `seo-backlinks`, `seo-maps`, `seo-plan`, `seo-page`, `seo-sxo`, `seo-flow`

Full list with descriptions: `claude-seo/skills/*/SKILL.md`

## Strategy references

Niche/keyword/audience research, now under `strategy/blogging-strategy/` (moved here from `SPACE WORK/strategy/`):
- Pinterest country studies (Canada, UK, Australia)
- Winning niches & keywords per country
- Subniche selector, content format guide

## Known stale asset

`SPACE WORK/graphify-out/` — a Graphify-generated knowledge graph of the whole repo, built 2026-07-11 (commit `b688a26f`). It predates this reorg (strategy moved, claude-seo added), so its file map no longer matches the current layout. The `graphify` CLI isn't installed in this environment, so it can't be regenerated here — treat `graph.html` / `GRAPH_REPORT.md` as a rough historical snapshot only, not a live map.

## Log

| Date | Action |
|------|--------|
| 2026-07-15 | Folder created; claude-seo repo cloned |
| 2026-07-15 | strategy/ moved here from SPACE WORK root |
| 2026-07-15 | Noted graphify-out/ is stale; graphify CLI unavailable to refresh |

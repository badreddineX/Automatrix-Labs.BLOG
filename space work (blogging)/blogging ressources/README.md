# Blogging Ressources

Central hub for every resource, repo, and skill used across the blog projects in `SPACE WORK/blogs/` (UK, Canada, Australia).

## Repositories

| Repo | Path | Purpose |
|------|------|---------|
| [claude-blog](https://github.com/AgriciDaniel/claude-blog) | `claude-blog/` | The full `blog` skill suite source (writing, rewriting, audits, SEO checks, Google API integration via `blog-google`, etc.) |
| [claude-seo](https://github.com/AgriciDaniel/claude-seo) | `claude-seo/` | External SEO skill pack: audits, content briefs, technical SEO, schema, GEO/AEO, hreflang, sitemaps, and more (see `claude-seo/skills/`) |
| [hormozi-skills](https://github.com/alexsmedile/hormozi-skills) | `hormozi-skills/` | Alex Hormozi-style offer/pricing/pitch skill pack (offer construction, bonus stacks, objection handling) |
| [marketingskills](https://github.com/coreyhaines31/marketingskills) | `marketingskills/` | General B2B/SaaS marketing skill pack (ads, CRO, email, positioning, etc.) |
| [ai-marketing-skills](https://github.com/ericosiu/ai-marketing-skills) | `ai-marketing-skills/` | AI/GEO-focused marketing skill pack |

Added 2026-08-13/15 (see [SPACE WORK Structure] memory for the reorg this was part of). All
five repos' skills are also mirrored into `space work (blogging)/.claude/skills/` (95
skills total) so they're available project-wide — see that folder for the active,
in-use copies; these are the source clones.

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

## Log

| Date | Action |
|------|--------|
| 2026-07-15 | Folder created; claude-seo repo cloned |
| 2026-07-15 | strategy/ moved here from SPACE WORK root |
| 2026-08-13/15 | claude-blog, hormozi-skills, marketingskills, ai-marketing-skills repos added |
| 2026-08-16 | README brought up to date (was only documenting claude-seo, missing 4 repos). Removed the graphify-out/ note — that folder no longer exists in the repo at all. Deleted a 289MB untracked/gitignored `.venv` inside `claude-blog/skills/blog-google/` — not needed to run its scripts, regenerates automatically if ever required. |

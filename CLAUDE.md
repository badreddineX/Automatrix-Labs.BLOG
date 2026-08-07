# SPACE WORK — Project Purpose & Current Focus

Read this first in any new session before doing anything else in this repo. Also read
`CLAUDE-WORKFLOW.md` (same folder) for token-economy habits and when to delegate tasks
outside Claude Code entirely (free OpenRouter/Cline setup, other free tools).

## What this is

A portfolio of niche home-decor blogs, each paired with a Fourthwall print-on-demand
store. The growth loop: **Pinterest → blog traffic → matched store product per article**
(not a generic storefront — products are meant to tie to specific articles).

## Current scope (as of 2026-08-07)

**Active: Canada + UK + Australia (reactivated).** Australia was paused/deprioritized
as of 2026-07-24; as of 2026-08-07 the user asked to rework it to match the Canada/UK
operating model. Structural scaffolding (`docs/SEO-GROWTH-PLAN-2026-2027.md`,
`AUSTRALIA-ANALYTICS.md`, `BLOGS TO POST/`, `pinterest content/`) is now in place to
match Canada/UK, but **GSC/GA4 API access is not yet set up for outdoorcoastalhome.com**
— see `blogs/australia-subn-1/AUSTRALIA-ANALYTICS.md` Setup status before assuming
analytics parity. The daily trend-content loop (below) has not been extended to
Australia yet — that's a separate decision from the scaffolding work.

| Country | Site | Live URL | Repo folder |
|---|---|---|---|
| Canada | SmallSpace Home | smallspacehome.ca | `blogs/canada-subn-1/smallspacehome/` |
| UK | British Home Interior | britishhomeinterior.co.uk | `blogs/uk-subn-1/britishhomeinterior/` |
| Australia | Outdoor & Coastal Home | outdoorcoastalhome.com | `blogs/australia-subn-1/website/` |

**Note (2026-08-07):** `blogs/automatrix-labs-blog/` was added — an AI/tech niche blog
(Next.js, not Astro), monetized via SaaS affiliates + display ads, not the
Pinterest→Fourthwall loop above. Separate stack and growth model; see its own
`CLAUDE.md` inside that folder before working on it.

## Folder map

- `blogs/<country>-subn-1/` — one per country: the live Astro site, a `pinterest content/`
  folder, a `BLOGS TO POST/` folder of drafted-unpublished posts, and (Canada/UK) a
  `<COUNTRY>-ANALYTICS.md` dated-snapshot log — **read that file before pulling new
  GSC/GA4/Pinterest data, and add a new dated entry after every pull.**
- `digital prod/` — the Fourthwall store side: `STRATEGY.md`, `FOURTHWALL-STORE-SETUP.md`,
  `TESTING-LOOP.md` at root, plus per-country `CAD dig prod/` / `UK dig prod/` product folders,
  plus `resources/` — reusable prompts (ebook/course/audiobook writing) and code snippets
  (WooCommerce/Gumroad checkout links) and an Elementor ebook-landing-page template,
  gathered from an external "Nid Academy" resource pack. Not tied to one country.
  `resources/ebook-pdf-builder/` builds the finished ebook PDFs from `rewritten/` (source
  manuscripts) via `build.mjs`; `design-references/` holds manual cover-design inspiration
  images (not read by the build script). Finished PDFs in `output/` are gitignored — they're
  regenerable and were bloating `.git` (~90MB) on every rebuild; keep them on disk, don't
  re-add to git.
- `blogging ressources/` — shared hub: cloned `claude-blog`/`claude-seo`/`hormozi-skills`
  skill packs, plus niche/keyword strategy docs used by all blogs.
- `docs/` (root) — cross-country planning docs that don't belong to one blog (e.g. a
  combined GSC+Bing plan). Country-specific docs still go in that country's own `docs/`.

## Analytics access — already set up, don't redo

Google Search Console + GA4 API access is live for both Canada and UK via a shared
Google Cloud service account (`claude-blog@smallspace-home.iam.gserviceaccount.com`,
key at `~/.config/claude-seo/service_account.json`). Use the `blog-google` skill to pull data:

- Canada GSC property: `https://smallspacehome.ca/` (URL-prefix property)
- Canada GA4 property: `properties/546979184`
- UK GSC property: `sc-domain:britishhomeinterior.co.uk` (domain property)
- UK GA4 property: `properties/546917739`

If a pull ever returns "permission denied," verify with a raw API call first — it's just
as likely to be a disabled API in the GCP project or a wrong property-URL format
(prefix vs. domain) as an actual missing dashboard grant.

## Current decision (2026-07-30) — supersedes the 2026-07-24 content hold

**The 2026-07-24 "hold on SEO/content changes until 2026-08-24" is now overridden by
explicit user request (2026-07-30).** The 2026-08-24 GSC/GA4 re-check date itself still
stands as an analytics checkpoint, but new content production is active again as of
today, via the daily trend-content loop below. See `SEO-GROWTH-PLAN-2026-2027.md` in
each country's `docs/` folder for the full 10-phase plan this sits inside of.

**Daily trend-content loop (active 2026-07-30 on both blogs):** each day, write one new
article targeting a genuine trending keyword (Pinterest trend data or GSC-adjacent
demand), and pair it with one new promotional Pinterest pin for that specific article —
on top of the existing 3 pins/day baseline cadence (so 4 pins/day total on days this
runs). **Before building each trend pin, check the existing `pinterest-pins/` library
for topical/photo overlap first** — this exact idea was tried once already (2026-07-28)
and reverted on both blogs because several trend pins duplicated existing pins almost
exactly (same wording, one identical photo reuse). Don't repeat that mistake.

One thing worth a small nudge (carried over, still valid): Canada's query "where can i
buy bathroom storage units that work in a rented flat?" sits near position 4.9-4.9 —
a near-page-1 miss. An internal link or content refresh on whichever page targets it
could push it onto page 1.

## Working conventions

- Never delete or restructure the three live site folders' framework paths (`src/`,
  `public/`, config files) without explicit confirmation — they're deployed on Vercel.
- New planning/strategy docs for a country blog go in that country's `docs/` folder,
  not loose at the country-folder root. Docs spanning both countries go in the root `docs/`.
- Don't commit generated ebook PDFs (`digital prod/resources/ebook-pdf-builder/output/*.pdf`)
  — gitignored on purpose, see Folder map above.
- When adding blog posts to Canada/UK, consider which Fourthwall store product it
  should link to, per the article-matching strategy — not just publish-and-forget.

# SPACE WORK — Project Purpose & Current Focus

Read this first in any new session before doing anything else in this repo. Also read
`CLAUDE-WORKFLOW.md` (same folder) for token-economy habits and when to delegate tasks
outside Claude Code entirely (free OpenRouter/Cline setup, other free tools).

## What this is

A portfolio of niche home-decor blogs, each paired with a Fourthwall print-on-demand
store. The growth loop: **Pinterest → blog traffic → matched store product per article**
(not a generic storefront — products are meant to tie to specific articles).

## Current scope (as of 2026-07-24)

**Active: Canada + UK only.** Australia is intentionally paused/deprioritized — do not
add work there unless explicitly asked.

| Country | Site | Live URL | Repo folder |
|---|---|---|---|
| Canada | SmallSpace Home | smallspacehome.ca | `blogs/canada-subn-1/smallspacehome/` |
| UK | British Home Interior | britishhomeinterior.co.uk | `blogs/uk-subn-1/britishhomeinterior/` |
| Australia (paused) | Outdoor & Coastal Home | outdoorcoastalhome.com | `blogs/australia-subn-1/website/` |

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
- `blogging ressources/` — shared hub: cloned `claude-blog`/`claude-seo` skill packs,
  plus niche/keyword strategy docs used by all blogs.

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

## Current decision (2026-07-24) — do not re-litigate before the date below

GA4 was only installed 2026-07-23 on both sites; GSC shows both sites indexed with
impressions (200-300+ each) but almost no ranking above position 20 yet, and zero
clicks/organic sessions so far. This is normal for month 1, not a problem.

**Holding on SEO/content changes. Re-check GSC + GA4 around 2026-08-24** (~1 month out) —
checking sooner won't show meaningful signal. Pins + meta content for both Canada and UK
are already scheduled for the week of 2026-07-24 (confirmed by user, handled outside this
repo, e.g. via a scheduler tool) — UK's `pinterest content/` folder being empty in-repo is
not a gap, just not reflected here. No Pinterest setup action needed right now; just wait
for the scheduled posts to go live and show up in the next data pull.

One thing worth a small nudge now (doesn't need to wait for the 1-month check): Canada's
query "where can i buy bathroom storage units that work in a rented flat?" sits at
position 4.9 — a near-page-1 miss. An internal link or content refresh on whichever page
targets it could push it onto page 1.

## Working conventions

- Never delete or restructure the three live site folders' framework paths (`src/`,
  `public/`, config files) without explicit confirmation — they're deployed on Vercel.
- New planning/strategy docs for a country blog go in that country's `docs/` folder,
  not loose at the country-folder root.
- When adding blog posts to Canada/UK, consider which Fourthwall store product it
  should link to, per the article-matching strategy — not just publish-and-forget.

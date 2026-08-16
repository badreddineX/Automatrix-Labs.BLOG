# SPACE WORK — Project Purpose & Current Focus

Read this first in any new session before doing anything else in this repo. Also read:
- `CLAUDE-WORKFLOW.md` (same folder) for token-economy habits and delegation setup.
- `THE MAIN IDEA.md` (same folder) — the user's personal context, financial goals, and
  constraints behind this whole workspace. Read this before making priority calls or
  suggesting spend — it explains *why* things are sequenced the way they are (e.g. no
  Fourthwall store yet, backlinks currently deferred, budget constraints).

**Rewritten 2026-08-16** after a full structural audit found this file badly out of
date (wrong paths from before the 2026-08-13 reorg, a stale service account, a dead
`digital prod/` structure, and store-status framing that no longer matched reality).

## Root layout

`SPACE WORK/` contains only: `CLAUDE.md`, `CLAUDE-WORKFLOW.md`, `THE MAIN IDEA.md`, and
two subfolders — **`space work (blogging)/`** and **`space work (digital prod)/`**.
Everything below with a `blogs/`, `docs/`, `scripts/`, `blogging ressources/` path is
relative to `space work (blogging)/`, not the SPACE WORK root directly.

## What this is

**Blogging side** (`space work (blogging)/`): a portfolio of niche home-decor blogs.
The intended growth loop is **Pinterest → blog traffic → matched store product per
article** — but **no Fourthwall store is actually live yet for any blog** as of
2026-08-16. Store setup is structurally blocked on the user not having a bank account
(see `THE MAIN IDEA.md`) — don't describe stores as active/paired, and don't suggest
"just set up the store" without checking that constraint first. Right now this is
blog-content-and-traffic only.

**Digital-prod side** (`space work (digital prod)/`): a separate venture, "The
Prosperity Press" — public-domain wealth/self-improvement books repackaged as guided
study editions, sold on Etsy + Gumroad. Has its own `CLAUDE.md` in that folder with
real content-accuracy guardrails — read it before touching anything there. This is
**not** the same as the old CAD/UK Fourthwall ebook business; that content is gone
(confirmed missing, not recoverable, as of 2026-08-13/14) and this replaced it.

## Blogging: current scope

**Active: Canada, UK, Australia.** Canada and UK blogs are the most mature and are the
ones actually being iterated on day to day. Australia was reactivated 2026-08-07 to
match the Canada/UK operating model — GSC access for Australia is now working (verified
2026-08-16), though check `AUSTRALIA-ANALYTICS.md` before assuming full parity with
Canada/UK on other fronts (e.g. GA4, daily-content-loop cadence).

| Country | Site | Live URL | Repo folder (under `space work (blogging)/`) |
|---|---|---|---|
| Canada | SmallSpace Home | smallspacehome.ca | `blogs/canada-subn-1/smallspacehome/` |
| UK | British Home Interior | britishhomeinterior.co.uk | `blogs/uk-subn-1/britishhomeinterior/` |
| Australia | Outdoor & Coastal Home | outdoorcoastalhome.com | `blogs/australia-subn-1/website/` |

`blogs/automatrix-labs-blog/` also lives here — an AI/tech niche blog (Next.js, not
Astro), monetized via SaaS affiliates + display ads, not the Pinterest→store loop
above. Separate stack and growth model; see its own `CLAUDE.md` inside that folder.

**Current priority (per `THE MAIN IDEA.md`, 2026-08-16):** fix indexing/ranking on
Canada and UK (both ~1 month old, near-zero backlinks, real search-volume topics
already showing but not yet ranking) before expanding to stores, Australia parity, or
new ventures — "automate-then-expand," not everything in parallel. Backlink outreach is
explicitly deferred until the blogs are older; don't restart it without checking in
first. **Status of the "daily trend-content loop"** (write 1 trend article + 1 extra
pin/day) described in earlier planning docs is unconfirmed as of this rewrite — verify
with the user whether it's still the active day-to-day cadence before assuming it is.

## Blogging: folder map (all paths under `space work (blogging)/`)

- `blogs/<country>-subn-1/` — one per country: the live Astro site, a `pinterest content/`
  folder, a `BLOGS TO POST/` folder of drafted-unpublished posts, a `tools/` folder
  (site audit + pin/social generator scripts — check `tools/social-generator/` and
  `tools/pin-generator/` before assuming a schedule/CSV file elsewhere is current; those
  are the source-of-truth generator outputs, not the copies once kept in
  `pinterest content/`), and a `<COUNTRY>-ANALYTICS.md` dated-snapshot log — **read that
  file before pulling new GSC/GA4/Pinterest data, and add a new dated entry after every
  pull.**
- `blogging ressources/` — shared hub: cloned `claude-blog`/`claude-seo`/`hormozi-skills`/
  `marketingskills`/`ai-marketing-skills` repos (source clones — the actual active copies
  are mirrored into `.claude/skills/`), plus `strategy/blogging-strategy/` niche/keyword
  research used by all blogs.
- `docs/` (this folder's root) — cross-country planning docs that don't belong to one
  blog. Country-specific docs still go in that country's own `docs/`. **Spot-check any
  doc here against `THE MAIN IDEA.md` before treating it as current** — one was found
  2026-08-16 planning around a Fourthwall store push that isn't actually possible yet.
- `scripts/` — `check-posts.mjs` (run from `space work (blogging)/`, checks
  `BLOGS TO POST/` drafts against what's actually published) and
  `content-decay-check.py` (pulls GSC position/impression trends per property to catch
  ranking decay early; needs `google-auth` + `google-api-python-client` — install via
  `pip3 install` if missing, don't assume a specific venv path).
- `.claude/skills/` — 94 skills across 5 merged packs; `.claude/agents/` holds the
  Hormozi orchestrator + sub-agents (must live here, not under `skills/`, or the
  harness won't discover them as agents).

## Analytics access — already set up, don't redo

Google Search Console + GA4 API access is live for Canada, UK, and Australia. **The
working service account is `claude-blog-ca@smallspace-home.iam.gserviceaccount.com`**
(key at `~/.config/claude-seo/service_account_ca.json`, configured as the default in
`~/.config/claude-seo/google-api.json`) — this is what the `blog-google` skill actually
uses for all three properties, added as a GSC user on each. Use the `blog-google` skill
to pull data:

- Canada GSC property: `https://smallspacehome.ca/` (URL-prefix property)
- Canada GA4 property: `properties/546979184`
- UK GSC property: `sc-domain:britishhomeinterior.co.uk` (domain property)
- UK GA4 property: `properties/546917739`
- Australia GSC property: `sc-domain:outdoorcoastalhome.com` (domain property, access
  confirmed working 2026-08-16)

**Separately, `scripts/content-decay-check.py` uses its own dedicated per-country
service accounts** (`service_account_ca.json`/`_uk.json`/`_au.json`, different email per
country e.g. `claude-blog-uk@britishhome-interiro.iam.gserviceaccount.com`) — this is
intentional, not a mistake, and each needed to be separately added as a GSC user (done
2026-08-16). Don't assume the two credential setups are interchangeable or that fixing
one fixes the other.

If a pull ever returns "permission denied," verify with a raw API call first, check
which of the two credential setups above is actually in use, and check the exact
service-account email being added in GSC (easy to add the wrong project's account by
mistake — happened twice this session, 2026-08-16) before assuming it's a deeper issue.

## Working conventions

- Never delete or restructure the live site folders' framework paths (`src/`, `public/`,
  config files) without explicit confirmation — they're deployed on Vercel.
- New planning/strategy docs for a country blog go in that country's `docs/` folder,
  not loose at the country-folder root. Docs spanning both countries go in the root
  `docs/` (of `space work (blogging)/`).
- `node_modules/` and `dist/` in each site folder are left in place by default — `dist/`
  is used for pre-ship link/image checks, `node_modules/` needs a real `npm install` to
  regenerate (network-dependent), so don't delete either without warning first. Empty/
  regenerable cache folders (`.astro/`, empty `out/` placeholders) are safe to clear
  anytime with no warning needed.
- When adding blog posts to Canada/UK, consider which Fourthwall store product it
  should eventually link to per the article-matching strategy — but don't add live
  Fourthwall links yet, since no store exists (see store-status note above).

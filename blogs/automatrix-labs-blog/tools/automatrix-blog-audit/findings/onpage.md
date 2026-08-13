# On-Page SEO — Findings

**Score: 85/100**

## Method
Read `src/app/layout.tsx`, `src/app/blog/[slug]/page.tsx`, `src/app/about/page.tsx`, `src/app/sitemap.ts` in source, then validated against the live rendered `/`, `/blog/claude-ai-review`, `/about` via WebFetch and `curl`.

## What works
- **Title tags**: root layout uses a template (`%s | AutoMatrix Labs`), post pages set a unique `title: post.title` per post via `generateMetadata`. Rendered title for the sample post: *"Claude AI Review: Is It Worth Switching From ChatGPT? | AutoMatrix Labs"* — confirmed live.
- **Meta descriptions**: sourced from each post's `excerpt` frontmatter field, all but one post at or under the 155-char budget (see content.md).
- **Open Graph + Twitter Card**: both fully populated per post (`title`, `description`, `images`, `type: article`, `publishedTime`, `authors`, `tags`) in `generateMetadata` — good for social/AI-crawler previews.
- **Canonical tags**: `alternates: { canonical: '${SITE_URL}/blog/${post.slug}' }` set for every post in source.
- **Heading hierarchy**: single H1 per post (title), sequentially-numbered H2s ("01.", "02." …) and H3s ("2.1", "2.2") generated programmatically by `createMdxComponents()` in `MDXComponents.tsx` — enforces clean, consistent hierarchy across all 26 posts rather than relying on writers to get it right manually.
- **Internal linking**: contextual in-body links plus a "Related Articles" section driven by `getRelatedPosts()`, plus tag pills linking to `/tags/[tag]`.
- **Breadcrumb UI** present on every post (Home › Blog › Category) — good for UX, though see schema.md for the missing structured-data counterpart.
- Google Search Console verification meta tag is present in `layout.tsx` (`verification.google`), confirming GSC ownership was already established.

## Issues found

| Severity | Issue | Evidence |
|---|---|---|
| Medium | Breadcrumbs are rendered visually but there is no `BreadcrumbList` JSON-LD to match — a missed structured-data opportunity given the UI already has the data. | `jsonLd` array in `blog/[slug]/page.tsx` only contains `BlogPosting` + optional `FAQPage` |
| Low | `layout.tsx` sets `twitter.site: '@automatrixlabs'` — unverified whether this Twitter/X handle actually exists/is owned; if it doesn't, remove it to avoid an inaccurate association. |
| Low | No `og:locale:alternate` or hreflang — not an issue for a single-language, single-market site, noting only because it's a common check; no action needed unless multilingual expansion happens. |

## Homepage-specific
- Rendered homepage `<title>`: "AutoMatrix Labs — AI Intelligence for Builders" (differs from root layout's default `'AutoMatrix Labs'`, meaning `page.tsx` sets its own metadata override — this is fine, just noting it's not the plain default).
- Homepage surfaces a featured post + a chronological/categorized list — reasonable content-discovery structure for a 26-post blog.

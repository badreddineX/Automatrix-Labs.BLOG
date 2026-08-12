# Schema / Structured Data — Findings

**Score: 65/100**

## Method
Read the JSON-LD construction logic directly in `src/app/blog/[slug]/page.tsx` (source of truth — WebFetch's HTML→markdown conversion strips `<script>` tags, so live rendering could not directly confirm the JSON-LD string, but the source code unambiguously shows it is emitted via `dangerouslySetInnerHTML` on every post page).

## What works
- **`BlogPosting` schema** on every post: `headline`, `description`, `image`, `datePublished`, `dateModified`, `author` (Person), `publisher` (Organization), `url`, `keywords`. All required fields present.
- **`FAQPage` schema** generated dynamically from the `**Q: ... A: ...**` pattern in post content — confirmed present on all 26 posts (26/26 matched the regex in a grep pass), each with 3+ real Q&A pairs mapped to `Question`/`acceptedAnswer`.
- Both schema blocks are correctly scoped per-post (not sitewide duplicated) and use valid `@context`/`@type`.

## Issues found

| Severity | Issue | Evidence |
|---|---|---|
| High | **`dateModified` is hardcoded to equal `datePublished`** (`dateModified: post.date` — same field used twice) on every post. This means the schema can never truthfully signal a content update, even if the MDX is edited later. Google and AI systems use `dateModified` as a freshness signal; right now it's structurally incapable of being accurate. | `jsonLd` object in `blog/[slug]/page.tsx` line 86 |
| Medium | No sitewide `Organization` schema (e.g. on the homepage or in a shared layout) — only the inline `publisher` object nested inside each `BlogPosting`. A standalone `Organization`/`WebSite` schema with `sameAs` links would strengthen brand-entity recognition for Google/AI systems. | not found in `layout.tsx` or `page.tsx` (homepage) |
| Medium | No `BreadcrumbList` schema despite visible breadcrumb UI on every post (see onpage.md). | absent from `jsonLd` array |
| Low | `Person` author schema is minimal — just `name`, no `url`, `image`, `jobTitle`, or `sameAs` (social/profile links). Given the author-identity inconsistency flagged in content.md, this is a symptom of the same underlying gap: no real, linkable author entity to point schema at. | `author: { '@type': 'Person', name: post.author.name }` |
| Low | No `Review`/`AggregateRating` schema on review-category posts (e.g. `claude-ai-review.mdx`, `notion-ai-review.mdx`, `perplexity-ai-review.mdx`) despite the site having a `Rating`/`RatingCard` MDX component that visually renders scores — a missed rich-result opportunity specifically for the `category: "review"` posts. | `category: "review"` posts + `Rating`/`RatingCard` in `MDXComponents.tsx` not mirrored in JSON-LD |

## Validation caveat
No live schema validator (Google Rich Results Test / Schema.org validator) could be run in this headless environment — the assessment above is a manual read of the JSON-LD structure in source against Schema.org's required/recommended properties, not a validator-confirmed pass/fail.

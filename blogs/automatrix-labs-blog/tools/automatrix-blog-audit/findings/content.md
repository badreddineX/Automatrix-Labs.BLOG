# Content Quality — Findings

**Score: 68/100**

## Method
Read frontmatter + body of all 26 `.mdx` files on disk under `content/posts/` (full read of all 26 files, not a sample — every post's frontmatter was pulled and every post's affiliate-link/FAQ/image-alt usage was grepped across the full set). Cross-checked against the rendered `/blog/claude-ai-review` page and the `/about` page.

## What works
- **Word counts are healthy**: range 1,062–2,260 words per post across all 26 files (measured via `wc -w`), no thin-content pages found.
- **Consistent answer-first structure**: every post opens with a "Key Takeaways" bullet box before the body — good for scannability and AI-citation extraction.
- **FAQ formatting**: all 26/26 posts contain a `**Q: ... A: ...**` pattern that the page component (`blog/[slug]/page.tsx`) parses into real `FAQPage` JSON-LD — strong, consistently-applied AI-citation signal.
- **Internal linking** is genuinely present and contextual (spot-checked `claude-ai-review.mdx`, `ai-search-geo-guide-2026.mdx`, `best-ai-image-tools-for-marketers.mdx`) — links point to specific related posts with descriptive anchor text, not generic "click here."
- Tone reads as practical/opinionated ("Most 'best AI tools' lists are just a scraped list...") rather than generic AI-filler, which helps both readability and differentiation.

## Issues found

| Severity | Issue | Evidence |
|---|---|---|
| Critical | **Author identity is inconsistent and unverifiable.** Every one of the 26 posts is bylined "Alex Morgan" with a generic role ("AI Writer at AutoMatrix Labs"), sourced from a picsum.photos placeholder avatar. The `/about` page, however, profiles a different, named real person ("Badreddine — Founder · Writer") and states *"Every article is researched, tested, and written by me [Badreddine]... no filler, no fluff."* This is a direct contradiction: the About page's credibility claim doesn't match who the bylines say wrote the articles. For E-E-A-T (Experience/Expertise/Authoritativeness/Trust), an unverifiable, non-linked byline with no bio page and no connection to the one named human on the site is a real trust gap, not a cosmetic one. | `content/posts/*.mdx` frontmatter (26/26 "Alex Morgan") vs. `src/app/about/page.tsx` lines 162-206 |
| High | **All 26 posts share the exact same publish date** (`date: "2026-08-07"`) and, because `dateModified` in the JSON-LD is hardcoded to `post.date` (`blog/[slug]/page.tsx` line 86), **no post has ever shown a genuine "updated" date** even if content changes later. This reads as a single batch-publish rather than an ongoing editorial cadence, and undermines the freshness signal AI Overviews / Google increasingly weight — notably undercutting the site's own advice in `ai-search-geo-guide-2026.mdx` about content freshness mattering for GEO. | grep across all frontmatter; `dateModified: post.date` in source |
| Medium | **Affiliate monetization is underused relative to the stated model.** Only 5 of 26 posts (19%) contain an `<AffiliateLink>` component — the site's primary monetization component. Several tool-comparison/review posts that explicitly discuss paid products (e.g., `chatgpt-vs-gemini-for-work.mdx`, `best-ai-tools-for-marketers-2026.mdx`) mention tools by name without a CTA in that section. Since this blog is monetized via SaaS affiliates (not the Pinterest→Fourthwall model), this is a monetization gap, not a virtue of restraint. | `grep -l AffiliateLink *.mdx` → 5/26 |
| Low | No visible outbound citations to primary/authoritative sources (vendor pricing pages, official docs, research) were found in the spot-checked posts — claims like specific pricing ranges ("$8–25/user/month") are stated without a linked source. This weakens both classic E-E-A-T and AI-citation trust (models weight sourced claims higher). Not exhaustively verified across all 26 files — flagged from the ones read in full. | spot-check of `claude-ai-review.mdx`, `10-best-ai-tools-for-work-2026.mdx`, `ai-tools-for-project-management.mdx` |
| Info | One excerpt (`automate-repetitive-tasks-with-ai.mdx`) is 156 characters, one character over the stated 155-char meta-description budget in `CLAUDE.md`. Trivial, but worth trimming since it's the documented rule. | character count via script |

## Affiliate CTA quality assessment (per task instructions)
Where present, the `<AffiliateLink>` component reads as genuinely useful, not spammy: it's inline within relevant context, uses a clear disclosure line ("Affiliate link — we may earn a commission at no extra cost to you"), and uses `rel="noopener sponsored"` correctly. The issue is coverage (only 19% of posts), not quality of the CTA itself.

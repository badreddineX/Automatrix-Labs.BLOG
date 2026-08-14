# Images — Findings

**Score: 88/100**

## Method
Grepped alt text on all inline markdown images across all 26 `.mdx` files, read `Image` usage in `blog/[slug]/page.tsx` and `about/page.tsx`, and confirmed image URLs actually resolve via `curl -I`/status checks.

## What works
- **Cover images are real, working Unsplash photo URLs** (`images.unsplash.com/photo-...`), not the picsum.photos placeholder documented in CLAUDE.md for avatars — confirmed a sample cover image returns **HTTP 200**. This is better than the CLAUDE.md note implied; only author avatars use picsum.
- **Author avatars** (`picsum.photos/seed/alexmorgan/40/40`) return **HTTP 302** (redirect to the actual seeded image) — this is normal picsum behavior, not a broken image, and resolves successfully.
- **Inline body images have descriptive, specific alt text** — every markdown image checked has a meaningful alt string, e.g. `"Split screen comparing Claude AI and ChatGPT pricing pages"`, `"Laptop showing an AI-generated meeting summary with action items highlighted"` — not generic filenames or empty alt.
- `next/image` is used throughout (cover images, author avatars, About page photos) — gets automatic responsive `srcset`, lazy loading (except `priority` hero images), and format optimization from Next.js's image pipeline.
- Hero images on post pages and About page correctly use `priority` to avoid being lazy-loaded above the fold.

## Issues found

| Severity | Issue | Evidence |
|---|---|---|
| Low | Author avatar alt text is just the author's name (`alt={post.author.name}`) — acceptable but minimal; not a real issue since it's a small decorative avatar, not content-bearing. |
| Low | Two posts (`ai-voice-agents-for-business.mdx`, `zapier-vs-make-ai-automation.mdx`) have only 1 inline image vs. 2-3 in most other posts — not a defect, just a minor consistency gap worth noting for future posts. | image count grep across all 26 files |
| Info | No image dimensions/file-size audit possible without fetching every binary — cover images are served via Unsplash's own CDN with `?w=800&h=450&fit=crop&q=80` params, which is a reasonable, pre-optimized size for a blog cover slot. |

## Not flagged as issues (per task instructions)
Picsum/Unsplash placeholder-style URLs are a documented, deliberate choice per this blog's own CLAUDE.md and were confirmed to load successfully — not reported as "broken images."

# AutoMatrix Labs Blog — Claude Instructions

## Project Overview

Next.js 14 AI blog covering technical AI and practical AI-for-work content. 21 published posts, monetized via SaaS affiliates and display ads.

## Stack

- **Framework**: Next.js 14 (App Router), TypeScript
- **Content**: MDX files in `content/posts/`
- **Styling**: Tailwind CSS + Radix UI
- **Deployment**: Vercel → https://automatrix-blog.vercel.app
- **Branch**: `master`

## Content Format

All posts live in `content/posts/*.mdx`. Required frontmatter:

```yaml
---
title: "Post Title"
date: "YYYY-MM-DD"
category: "tutorial"         # one of: news | tutorial | review | opinion | research
tags: ["tag1", "tag2"]
excerpt: "Max 155 chars — used as meta description"
coverImage: "https://picsum.photos/seed/UNIQUE-SEED/800/450"
author:
  name: "Alex Morgan"
  avatar: "https://picsum.photos/seed/alexmorgan/40/40"
---
```

## Key Files

| File | Purpose |
|------|---------|
| `src/lib/posts.ts` | Parses MDX frontmatter, reading time auto-calculated |
| `src/types/post.ts` | TypeScript types — Category union, Post interface |
| `src/components/MDXComponents.tsx` | Custom MDX components incl. `<AffiliateLink>` |
| `src/app/blog/[slug]/page.tsx` | Post page with JSON-LD schema + OpenGraph |
| `src/app/sitemap.ts` | Auto-generates sitemap.xml with all posts |
| `FRAMEWORK/` | Full SEO + monetization strategy — start with START-HERE.md |

## Monetization Component

Use `<AffiliateLink>` in any MDX post:

```mdx
<AffiliateLink href="https://jasper.ai?ref=YOUR_ID" badge="30% recurring">
  Jasper AI — Best AI writing tool for content creators
</AffiliateLink>
```

## n8n Automation (Auto Blog Publisher)

This blog is connected to an n8n automation stack at:
`C:\Users\bader\OneDrive\Desktop\CLAUDE CODE\project number one`

The workflow (`FRAMEWORK/AUTOMATION/n8n-blog-workflow.json`) automates:
1. Reads next keyword from Google Sheets (status: "ready")
2. Generates MDX post via Gemini (correct Next.js frontmatter)
3. Saves draft to Google Drive for 24h review → emails badreddinekx122@gmail.com
4. Pushes to GitHub at `content/posts/SLUG.mdx` → Vercel auto-deploys
5. Updates keyword status to "published"

To deploy the workflow to n8n, use the MCP tools from:
`CLAUDE CODE/project number one/n8n-mcp/`

**Placeholders to fill before deploying:**
- `YOUR_GOOGLE_SHEET_ID`
- `YOUR_GOOGLE_DRIVE_FOLDER_ID`
- `YOUR_GITHUB_USERNAME`

## SEO Strategy

Full strategy in `FRAMEWORK/`. Key docs:
- `FRAMEWORK/START-HERE.md` — 7-step funnel
- `FRAMEWORK/MASTER-STRATEGY.md` — content pillars, 90-day calendar
- `FRAMEWORK/01-keyword-vault/` — keyword database
- `FRAMEWORK/05-monetization-tracker/` — affiliate income tracker

Target: Month 6 = 8,000 traffic + $780/month. Month 12 = 30,000 traffic + $2,800/month.

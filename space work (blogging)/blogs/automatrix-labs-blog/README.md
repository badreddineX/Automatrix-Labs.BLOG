# AutoMatrix Labs — AI Blog

A monetized AI blog built with Next.js 14, TypeScript, and Tailwind CSS. Covers both **technical AI** (LLMs, agents, research) and **practical AI for work** (tools, productivity, prompts).

## Stack

- **Framework:** Next.js 14 (App Router)
- **Content:** MDX files in `/content/posts/`
- **Styling:** Tailwind CSS + Radix UI
- **SEO:** Sitemap, robots.txt, JSON-LD schema, OpenGraph, Twitter cards
- **Monetization:** Affiliate links via `<AffiliateLink>` MDX component

## Posts (21 total)

| Category | Count | Focus |
|----------|:-----:|-------|
| Tutorial | 6 | ChatGPT prompts, SEO, guides |
| Review | 5 | AI tool comparisons and rankings |
| Opinion | 3 | AI industry takes |
| Research | 3 | Technical deep dives |
| News | 4 | Releases and updates |

## Content Strategy

The full SEO and monetization strategy lives in `/FRAMEWORK/`. Start with `FRAMEWORK/START-HERE.md`.

Key documents:
- `FRAMEWORK/MASTER-STRATEGY.md` — content pillars and topic clusters
- `FRAMEWORK/01-keyword-vault/` — keyword database and scoring formula
- `FRAMEWORK/02-topic-pipeline/` — 90-day content calendar
- `FRAMEWORK/05-monetization-tracker/` — affiliate programs and income tracking

## Monetization

**Phase 1 (now):** SaaS affiliates — Jasper, Copy.ai, Grammarly, Notion, Zapier, Canva, Surfer SEO, Otter.ai (20-30% recurring commissions)

**Phase 2 (Month 3):** Display ads via Ezoic (no minimum traffic)

**Phase 3 (Month 4-5):** Digital products on Gumroad — prompt library, Notion templates

**Phase 4 (Month 6+):** Newsletter sponsorships at $150-300/issue

### Using AffiliateLink in MDX

```mdx
<AffiliateLink href="https://jasper.ai?ref=YOUR_ID" badge="30% recurring">
  Jasper AI — Best for long-form AI writing
</AffiliateLink>
```

## Dev

```bash
npm run dev    # start dev server at localhost:3000
npm run build  # production build
```

## Deploy

Deploy to Vercel. The sitemap at `/sitemap.xml` and robots at `/robots.txt` are auto-generated.

After deploying, submit `https://yourdomain.com/sitemap.xml` to Google Search Console.

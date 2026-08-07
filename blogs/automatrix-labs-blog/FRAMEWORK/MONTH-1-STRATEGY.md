# Month 1 Strategy — June 22 → July 22, 2026

## What This Month Is For

Month 1 is about **planting seeds, not harvesting**. Google takes 2–4 months to rank new content. Every post you publish now is traffic you'll earn in September and October. The goal is not revenue this month — it's getting 23 high-quality, SEO-optimized posts indexed as fast as possible.

---

## The 3 Things That Matter Most Right Now

### 1. Publish Consistently (the machine does this for you)
The n8n workflow fires every weekday at 8am. It reads your Google Sheet, generates a post, emails you the draft, waits 24 hours, then pushes to GitHub. Vercel deploys in ~2 minutes. **You don't have to touch anything.**

Your only job: make sure the sheet always has keywords with Status = "ready".

### 2. Submit Every Post to Google Search Console
After each post goes live, go to **Google Search Console → URL Inspection → paste the URL → Request Indexing**. This cuts indexing time from weeks to days.

Do this every morning for the previous day's post. Takes 2 minutes.

### 3. Apply to Affiliate Programs (do this week)

Apply to these now — approval takes 3–7 days and you want links live from post 1:

| Program | Commission | Apply at |
|---------|-----------|---------|
| Jasper AI | 30% recurring | jasper.ai/affiliate |
| Copy.ai | 30% recurring | copy.ai/affiliate |
| Grammarly | 20% recurring | grammarly.com/affiliates |
| Notion | 20% recurring | notion.so/affiliates |
| Zapier | 20-25% recurring | zapier.com/affiliate |
| Surfer SEO | 25% recurring | surferseo.com/affiliate |
| Frase | 30% recurring | frase.io/affiliates |
| Otter.ai | 20% recurring | otter.ai/affiliates |
| Canva Pro | 25% per sale | canva.com/affiliates |

Once approved, replace the plain tool links in your posts with your affiliate links using the `<AffiliateLink>` MDX component.

---

## Weekly Rhythm

| Day | Action | Time |
|-----|--------|------|
| Mon | n8n publishes post automatically | 0 min |
| Mon | Submit Monday's post URL to Search Console | 2 min |
| Tue | n8n publishes post automatically | 0 min |
| Tue | Submit Tuesday's URL to Search Console | 2 min |
| Wed | n8n publishes post automatically | 0 min |
| Wed | Check email — review draft, approve or edit | 10 min |
| Thu | n8n publishes post automatically | 0 min |
| Fri | n8n publishes post automatically | 0 min |
| Fri | Weekly review: check n8n workflow ran all 5 days | 5 min |

**Total weekly time commitment: ~20 minutes**

---

## Content Map — What Gets Published When

```
WEEK 1 (Jun 22-26) — Core AI for Work
├── Mon: Notion AI for project management [PILLAR]
├── Tue: Best AI writing tools 2026 [MONEY → Jasper, Copy.ai]
├── Wed: Zapier automation for beginners [SUPPORTING]
├── Thu: ChatGPT custom instructions [SUPPORTING]
└── Fri: Grammarly vs Quillbot [MONEY → Grammarly]

WEEK 2 (Jun 29 - Jul 3) — AI for Marketers
├── Mon: Best AI tools for social media marketing [MONEY → multiple]
├── Tue: AI for email marketing campaigns [SUPPORTING]
├── Wed: ChatGPT for content calendar planning [SUPPORTING]
├── Thu: Best AI SEO tools 2026 [MONEY → Surfer SEO, Frase]
└── Fri: Repurpose blog content with AI [SUPPORTING]

WEEK 3 (Jul 6-10) — AI for Remote Workers
├── Mon: Best AI tools for remote workers 2026 [PILLAR]
├── Tue: AI to summarize meeting notes [SUPPORTING → Otter.ai]
├── Wed: ChatGPT prompts for project managers [MONEY]
├── Thu: Best AI tools for virtual assistants [MONEY → multiple]
└── Fri: Otter AI for Zoom transcription [SUPPORTING → Otter.ai]

WEEK 4 (Jul 13-17) — AI for Freelancers
├── Mon: Best AI tools for freelance writers [PILLAR → Jasper]
├── Tue: AI to write client proposals faster [SUPPORTING]
├── Wed: Best AI tools for graphic designers [MONEY → Canva]
├── Thu: ChatGPT prompts for customer service [SUPPORTING]
└── Fri: Automate freelance invoicing with Zapier [SUPPORTING]

WEEK 5 (Jul 20-22) — High-Intent Money Posts
├── Mon: Jasper AI review 2026 [MONEY → Jasper 30% recurring]
├── Tue: Copy AI vs Jasper AI [MONEY → both 30% recurring]
└── Wed: Best AI tools under $20/month [PILLAR → multiple]
```

---

## Revenue Expectations

**Month 1 (June 22 - July 22):** $0–50
Content is being indexed. Don't expect clicks yet. Focus is publishing + indexing.

**Month 2 (July 22 - August 22):** $50–200
First Google rankings appear. Affiliate clicks begin. Submit to Ezoic for display ads.

**Month 3 (August - September):** $200–600
Compounding effect. Early posts rank. Affiliate income becomes consistent.

**Month 6:** $780+ (FRAMEWORK target)
Traffic ~8,000/month. Affiliate + Ezoic ads + possibly first digital product.

---

## The One Thing That Will Kill This Strategy

**Stopping after 2 weeks because you don't see traffic yet.**

Google takes 60–90 days to rank new sites. The workflow is doing all the work. Your job is to keep the Google Sheet full of keywords and spend 2 minutes/day submitting URLs to Search Console.

The bloggers who fail stop in week 3. The ones who succeed didn't do anything smarter — they just kept going.

---

## Next Steps Right Now (Before June 22)

- [ ] Import `keywords-sheet-import.csv` into your Google Sheet (sheet name: **Keywords**)
- [ ] Apply to all 9 affiliate programs above
- [ ] Deploy the n8n workflow from `FRAMEWORK/AUTOMATION/n8n-blog-workflow.json` to your n8n instance
- [ ] Set up Google Search Console for automatrix-blog.vercel.app
- [ ] Submit `https://automatrix-blog.vercel.app/sitemap.xml` to Search Console
- [ ] Connect GitHub repo to Vercel for auto-deploy on push to `master`

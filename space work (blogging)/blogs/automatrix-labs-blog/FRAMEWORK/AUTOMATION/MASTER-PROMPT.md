# MASTER GEMINI PROMPT — Ultimate SEO Blog Post Generator
## Based on 2026 ranking factors, E-E-A-T, LLM citation optimization

---

## USE THIS PROMPT IN N8N — Gemini Generate Post Node

Paste this in the JSON body field (expression mode):

```
={{ JSON.stringify({ contents: [{ parts: [{ text: "You are an expert SEO content writer and AI tools specialist with 5+ years testing AI tools for work productivity.\n\nWrite a complete, high-ranking blog post for keyword: \"" + $json.keyword + "\"\n\nCRITICAL 2026 SEO RULES:\n\n## STRUCTURE (Google + AI Search Optimized)\n1. TITLE: Include exact keyword + 2026, under 60 chars, use power word (Complete, Ultimate, Honest, Tested)\n2. META DESCRIPTION: 150 chars max, keyword in first 10 words, include specific benefit\n3. OPENING PARAGRAPH (most important): Answer the main question in the FIRST 2 sentences. Include keyword. Include one specific statistic with source. This gets cited by ChatGPT and Perplexity.\n4. LENGTH: 1800-2200 words for supporting posts\n\n## CONTENT REQUIREMENTS\n5. H2 headings every 300 words (include keyword variations)\n6. H3 subheadings under each H2\n7. One step-by-step numbered tutorial (minimum 5 steps)\n8. 5 copy-paste ready prompts readers use TODAY (inside code blocks)\n9. One comparison table (tools, methods, or before/after)\n10. FAQ section with 4 questions in this exact format:\n    **Q: [question]**\n    A: [direct answer in 2-3 sentences]\n11. Two real statistics with source attribution (cite openai.com, mckinsey.com, gartner.com, harvard.edu)\n12. Two external links to authoritative sources (open in new tab)\n\n## E-E-A-T SIGNALS (Google Trust Factors)\n13. Write in first person: use phrases like 'I tested', 'In my experience', 'After using this for 3 months'\n14. Include one specific real result: 'This saved me X hours on Y task'\n15. Add a 'Tested by Human' note: mention you actually used the tool\n16. Include one limitation or downside of AI (shows honesty = trust)\n17. Author note at end: 'Written by an AI productivity specialist who tests every tool before recommending it'\n\n## INTERNAL LINKING (use these exact placeholder texts)\n18. Add this link somewhere: [See our complete guide to AI at work](/blog/how-to-use-chatgpt-for-work)\n19. Add this link somewhere: [Best AI tools reviewed](/blog/best-ai-tools-for-work-2026)\n\n## AFFILIATE CTA\n20. End with: strong recommendation for 1-2 specific tools with:\n    - What it costs\n    - What you get\n    - Direct CTA: 'Try [Tool] free for 14 days →'\n\n## AI SEARCH OPTIMIZATION (Get cited by ChatGPT/Perplexity)\n21. Add a 'Quick Answer' box right after the intro:\n    **Quick Answer:** [Direct 2-sentence answer to the main keyword question]\n22. Use specific numbers everywhere: not 'saves time' but 'saves 2.5 hours per week'\n23. Include the year 2026 in at least 2 headings\n24. Write short paragraphs (2-3 lines max)\n\n## BEFORE/AFTER SECTION\n25. Include one Before/After comparison:\n    **Without AI:** [task] takes [time], produces [result]\n    **With AI:** [task] takes [time], produces [result]\n    **Time saved:** [X hours/week]\n\n## FORMAT — ASTRO MARKDOWN\n---\ntitle: 'exact SEO title with keyword and 2026'\ndescription: '150 char meta description with keyword and benefit'\npubDate: '2026-06-19'\nheroImage: '/blog-placeholder-1.jpg'\ntags: ['AI', 'productivity', 'work', '2026']\n---\n\n[Full blog post content here]\n\nOUTPUT ONLY THE MARKDOWN. No explanations, no preamble, no notes after the content." }] }]) }}
```

---

## WHY EACH RULE EXISTS

| Rule | Why it matters |
|------|---------------|
| Answer in first 2 sentences | 44% of LLM citations come from first 30% of content |
| Statistic in intro | AI search engines prioritize cited facts |
| "I tested" language | Google E-E-A-T: Experience signal |
| Quick Answer box | Gets pulled as featured snippet + AI Overview |
| Year 2026 in headings | Improves Perplexity citation rate by 30% |
| Short paragraphs | Mobile readability + Google prefers scannable content |
| Before/After format | Most shared format on LinkedIn = social signals |
| Specific numbers | "2.5 hours" beats "saves time" for both humans and AI |
| Internal links | Passes authority between posts, improves crawling |
| FAQ format | Wins People Also Ask boxes in Google |
| Honest limitation | Trust signal — Google rewards honest content |

---

## CONTENT UNIQUENESS TECHNIQUES

Things your competitors DON'T do that this prompt forces:

1. **Specific time savings** — not vague, always a number
2. **First-person testing** — "I used this for 30 days"  
3. **Honest downsides** — "This tool failed at X"
4. **Before/After proof** — concrete comparison
5. **Quick Answer box** — immediate value, AI-citation magnet
6. **Job-specific examples** — not generic, always for a specific role
7. **Copy-paste prompts** — the #1 thing readers share
8. **2026 year signals** — fresh, current, citable

---

## POST TYPES AND WORD COUNTS

| Type | Words | Focus |
|------|-------|-------|
| Pillar | 3000+ | Broad keyword, links to everything |
| Supporting | 1800-2200 | Specific task, links to pillar |
| Money | 1500-2000 | Tool review, heavy affiliate CTAs |
| Quick Win | 1200-1500 | Very specific, low competition |
| Before/After | 1000-1500 | Personal experiment, high shareability |

---

## LINKEDIN POST TEMPLATE (Auto-generate after each blog post)

After Gemini writes the blog post, use this as a LinkedIn post:

```
I tested [TOOL] for [TASK] for [TIME PERIOD].

Here's what actually happened:

Before: [result without AI]
After: [result with AI]
Time saved: [X hours/week]

The 3 prompts that made the difference:

1. [Prompt 1]
2. [Prompt 2]  
3. [Prompt 3]

Full guide with all prompts → [BLOG URL]

#AI #Productivity #FutureOfWork
```

One LinkedIn post per blog post = free traffic every week.

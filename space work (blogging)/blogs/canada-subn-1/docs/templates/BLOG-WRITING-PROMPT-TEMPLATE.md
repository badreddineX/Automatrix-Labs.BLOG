# SmallSpace Home — Blog Writing Prompt Template

Adapted from a generic travel-niche template (2026-08-06) — kept what works, cut the
keyword-density myth, cut the hardcoded travel references, and folded voice into the
main prompt instead of a separate "humanize" pass. Matches the FAQ-driven, answer-first
format already validated across the blog's 38 published posts.

---

## 1. Article Writing Prompt

```
You are a Canadian renter and small-space living expert writing for SmallSpace Home
(smallspacehome.ca), a blog for renters in Toronto, Vancouver, and Montreal apartments
who can't make permanent changes to their space.

Voice: first-person, practical, tested-not-theoretical. Reference "my 510 sq ft Toronto
rental" as lived experience where relevant. Casual but not jokey — a knowledgeable friend,
not a comedian. Contractions are fine. No forced humor, no filler enthusiasm ("You won't
believe #7!").

Write a comprehensive blog post based on the outline in [OUTLINE], target length
1200-1800 words. Structure:

- Numbered-question H2s (e.g. "1. What's the Best Over-Toilet Shelving Option?") —
  this format is what's currently ranking for this blog's target queries, don't deviate.
- A TL;DR section right after the intro (3-4 bullets, the single most useful takeaway first)
- 4-6 FAQ entries at the end, each answering a REAL search phrasing (see keyword rules below)
- Real CAD prices from named Canadian retailers (Amazon.ca, IKEA Canada, HomeSense,
  Canadian Tire, Wayfair Canada) — never vague pricing
- Every solution must be renter-safe: no drilling, no permanent changes, reversible
- 2-3 internal links to related existing posts on the blog, with natural anchor text
  (not "click here")

Keyword rules (replaces density-counting — that's not how ranking works):
- Primary keyword: [PRIMARY KEYWORD] — must appear verbatim in the title, at least one
  H2, and at least one FAQ question (word-for-word, not paraphrased)
- Secondary/related keywords: [RELATED KEYWORD 1], [RELATED KEYWORD 2], [RELATED KEYWORD 3]
  — each should appear naturally at least once, ideally in a distinct H2 or FAQ so the
  page has a clear on-page reason to rank for each variant, not just the primary
- Do NOT hit a density percentage. Do NOT repeat the primary keyword mechanically.
  If a sentence needs the keyword and a synonym is more natural, use the synonym —
  variety reads better and Google groups synonyms together anyway.
- Write the FAQ questions in the exact phrasing a person would type into Google
  (informal, sometimes ungrammatical) — not a polished editorial rephrasing of it.

Outline:
[OUTLINE]
```

**Why this version:** the original prompt's keyword-density instruction (1-2%) is a
pre-2015 SEO idea Google doesn't use anymore — chasing a ratio produces stiff, repetitive
sentences. What's actually moved rankings on this blog (confirmed 2026-08-06, see
[[project_seo_growth_plan]] and `CANADA-ANALYTICS.md`) is using the *exact* search phrasing
in headers and FAQs, not counting how many times it appears.

---

## 2. Meta Title Prompt

```
Write 10 meta titles for a SmallSpace Home blog post targeting the focus keyword
"[FOCUS KEYWORD]".

Rules:
1. The exact phrase "[FOCUS KEYWORD]" must appear in every title, ideally at the start
2. Under 60 characters (not 65 — Google truncates around 60 on mobile, where most of
   this blog's traffic comes from)
3. Reflect this blog's actual angle: renter-safe, no-drill, Canadian retailers/pricing —
   don't write generic titles that any home-decor blog could use
4. Mix formats: a numbered list ("15 ..."), a direct question, and a how-to
5. No number-in-title requirement unless the post is actually a numbered list — a
   forced number in a non-list post reads as clickbait and doesn't match the content
6. No quotes, no markdown, no emoji
```

**Why this version:** dropped the rigid "must contain a number" rule from the original
(it conflicts with keyword-first titles when the post isn't a listicle) and swapped the
generic "Travel niche" instruction for this blog's actual differentiator, which is the
real lever — see the competitor research from earlier this session showing no ranking
competitor leads with renter-safe/no-drill in their titles.

---

## 3. Meta Description Prompt

```
Write 10 meta descriptions for the post titled "[META TITLE]", focus keyword
"[FOCUS KEYWORD]".

Rules:
1. Exact phrase "[FOCUS KEYWORD]" appears naturally in each
2. Under 155 characters
3. Lead with the renter-safe/no-drill/CAD-pricing angle where it fits naturally —
   this is the one thing ranking competitors consistently leave out of their own
   descriptions (verified 2026-08-06 competitor pull)
4. End with a soft CTA (Discover, See, Get) but don't force it if it doesn't fit
5. No quotes, no markdown, no self-reference ("In this post...")
```

---

## What NOT to carry over from the original template

- **Keyword density percentage** — replaced with "exact phrase in specific locations"
  (title, one H2, one FAQ) — a testable, real signal instead of an arbitrary ratio.
- **Separate "Humanize Text" rewrite pass** — folded voice/tone directly into the writing
  prompt above. Running a blind casual-rewrite pass after the fact risks undoing the
  keyword placement and introducing AI-detectable forced-humor patterns.
- **Hardcoded "Travel niche" references** — this was a leftover from whatever source the
  original template came from; always check for niche leakage like this before reusing
  a found template.
- **"GEO expert" framing with no GEO-specific instructions** — if AI-citation optimization
  is actually wanted, add explicit requirements (structured Q&A pairs, a sourced statistic
  with attribution, clear one-sentence entity definitions) rather than just claiming the
  expertise in the persona line.

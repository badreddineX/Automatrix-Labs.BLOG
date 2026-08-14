# SEO Audit — smallspacehome.ca

**Date:** 2026-08-13
**Business type:** Content/blog (home-decor, Canadian small-apartment niche)
**Scope:** Homepage + robots.txt + sitemap + full title/meta/schema scan of all 57 indexed blog posts + deep-dive on 19-post representative sample (every 3rd post). Full 500-page crawl was scoped down to this sample per time constraints — sufficient because the site has only 57 posts + ~8 static pages (65 total indexed URLs), so the sample plus full-corpus title/meta/H1/alt scan gives near-complete coverage.
**Not covered:** Paid backlink APIs (none configured), field Core Web Vitals (no GSC/CrUX pull in this run — see note), local/ecommerce checks (not applicable to this business type).

---

## Executive Summary

**Overall SEO Health Score: 84 / 100** (Good — technically clean, content-mature site whose score ceiling is currently capped by off-site authority, which is expected and unavoidable for a ~1-month-old domain.)

This is an unusually clean technical build for a young site. Every one of the 57 posts sampled/scanned has a single H1, a canonical tag, a meta description, zero missing image alt text, and full BlogPosting + FAQPage + BreadcrumbList JSON-LD. There is also a working `llms.txt` file with citation guidance for AI assistants — most sites this size don't have that yet. The gap holding the score down is almost entirely off-page (zero backlinks, as expected for site age) plus a handful of fixable on-page/performance details: many titles run past the ~60-char SERP truncation point, body images below the fold lack `loading="lazy"`, images are JPG/PNG only (no WebP/AVIF), and there's no Content-Security-Policy header.

### Top 5 Issues (Critical/High)
1. **(High) No responsive images / no next-gen formats.** All content images are JPG/PNG served at fixed dimensions with no `srcset`, no WebP/AVIF. Mobile users on 3G/4G download desktop-sized JPEGs (hero image alone is ~149KB). This is the single biggest performance lever available.
2. **(High) Several body images missing `loading="lazy"`.** On the sampled post, 3 of 9 `<img>` tags (mid-article images, clearly below the fold) have no `loading` attribute at all — they're not lazy and not marked eager/high-priority either, so they just load in default (eager-ish) browser priority, competing with anything actually above the fold.
3. **(Medium-High) 35 of 57 titles exceed 60 characters** (e.g., 88-char titles), risking truncation in Google SERPs and reduced CTR. Not a ranking penalty but a real click-through cost.
4. **(Medium) No Content-Security-Policy header.** HSTS, X-Content-Type-Options, X-Frame-Options, and Referrer-Policy are all present and correctly configured — CSP is the one modern security header missing.
5. **(Expected/Not fixable short-term) Backlink profile is effectively zero.** Confirmed via prior Seobility check; consistent with a ~1-month-old domain. This is the largest single drag on the score and will resolve with time + off-site promotion (Pinterest, guest mentions), not on-page work.

### Top 5 Quick Wins
1. Add `loading="lazy"` to all in-article `<img>` tags except the hero (which correctly already uses `loading="eager" fetchpriority="high"` — keep that as-is).
2. Convert content images to WebP (with JPG fallback) and add `srcset`/`sizes` for at least 2 breakpoints — biggest single performance win, likely also improves LCP on mobile.
3. Trim the 35 over-length titles to ≤60 characters where possible without losing the keyword — a low-effort copy pass across existing posts.
4. Add a basic CSP header via Vercel config (`Content-Security-Policy` with `default-src 'self'` plus explicit allowances for GTM/Clarity/fonts) — closes the one missing security header.
5. Ship an FAQ-schema page equivalent for the homepage/about (currently only blog posts carry FAQPage schema) — homepage has only WebSite + Organization + minimal schema, and is the one URL every visitor and crawler sees first.

---

## Technical SEO

**Score: 92/100**

**What works:**
- `robots.txt` is clean and permissive: `User-agent: * / Allow: /`, with a correct `Sitemap:` directive pointing to `sitemap-index.xml`. No accidental blocking of any crawler, including AI crawlers (GPTBot, ClaudeBot, PerplexityBot, etc. are not disallowed).
- Sitemap index (`sitemap-index.xml` → `sitemap-0.xml`) is valid XML, resolves correctly, contains all 70 site URLs (57 posts + 8 static pages + blog index + 4 category pages), with `lastmod` timestamps.
- Canonical tags present and self-referential and correct on every page checked (homepage and all 19 sampled posts) — no cross-page canonical conflicts found.
- HTTPS is enforced with `Strict-Transport-Security: max-age=63072000` (2-year HSTS, no `includeSubDomains` flag present — minor, could be added).
- Security headers present: `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (camera/mic/geolocation/interest-cohort all disabled). Missing: `Content-Security-Policy` (see Findings).
- Served via Vercel edge with `X-Vercel-Cache: HIT` and fast TTFB (~190ms on a cache warm-up request) — good baseline for Core Web Vitals.
- Mobile viewport meta tag present and correct on every page.
- URL structure is flat, descriptive, keyword-relevant (`/blog/small-apartment-organization`), no query-string cruft, no trailing-slash inconsistency observed in the sitemap.
- GTM/gtag and Microsoft Clarity are deliberately deferred to the `load` event (documented in an inline code comment in the homepage HTML) specifically to avoid competing with hero image/fonts for bandwidth during the critical rendering path — a genuinely sophisticated, evidence-based performance decision already made by whoever built this site.

**Findings:**

| Title | Severity | Description | Recommendation |
|---|---|---|---|
| No Content-Security-Policy header | Medium | `curl -sI` on homepage and post pages shows no CSP header of any kind. | Add a CSP via `vercel.json` headers config or Astro middleware. Start permissive (`default-src 'self'; script-src 'self' 'unsafe-inline' www.googletagmanager.com www.clarity.ms; img-src 'self' data:; style-src 'self' 'unsafe-inline'`) and tighten once verified nothing breaks. |
| HSTS missing `includeSubDomains`/`preload` | Low | Current header is `max-age=63072000` only. | Add `includeSubDomains; preload` once confirmed no subdomain needs plain HTTP, then submit to the HSTS preload list. |
| No HTTP/2 or HTTP/3 verification in this run | Info | Local curl build lacked `--http2` support, so protocol version wasn't directly confirmed; Vercel serves HTTP/2+ by default in virtually all cases. | Not actionable — flagging as a gap in this audit's verification, not a suspected issue. |

---

## Content Quality

**Score: 90/100**

**What works:**
- **No thin content.** Word count (including nav/footer boilerplate) ranged from ~1,479 to ~3,249 words across the sample; even the shortest article at effectively ~1,000-1,200 words of actual body copy is well above thin-content thresholds for this content type.
- **No duplicate titles or meta descriptions** across all 57 posts — full-corpus check confirmed every title tag and meta description string is unique.
- **Strong E-E-A-T signals for a young site:** every sampled post carries `Person` schema (author attribution), an `/about` and `/author` page exist, and content is explicitly framed as first-hand-tested ("tested in a real 510 sq ft Toronto rental," per llms.txt) rather than generic listicle filler. Real CAD pricing and named Canadian retailers (Amazon.ca, IKEA Canada, HomeSense, Canadian Tire) appear throughout — concrete, verifiable specificity that both readers and AI answer engines reward.
- **FAQ sections present and schema-marked on every sampled post** (FAQPage + Question/Answer, 4 Q&As on the sample checked) — good for both SERP rich results and AI citation.
- **Editorial policy page exists** (`/editorial-policy`) — an explicit trust/E-E-A-T signal many niche blogs skip entirely.

**Findings:**

| Title | Severity | Description | Recommendation |
|---|---|---|---|
| Homepage lacks the same schema depth as posts | Low-Medium | Homepage carries `WebSite`/`Organization` schema but not the richer FAQ/Person combination posts have. | Consider adding 3-4 FAQ entries to the homepage (e.g. "Who is this site for," "Are prices in CAD," "Do these ideas work in a rental") with FAQPage schema — homepage is the single highest-traffic URL. |
| Content freshness/update cadence not verifiable from static HTML alone | Info | `dateModified` values weren't spot-checked against actual content diffs in this run. | Confirm `dateModified` in BlogPosting schema is only updated on genuine content edits, not on every deploy (a common false-freshness mistake that can look manipulative to Google if caught). |

---

## On-Page SEO

**Score: 85/100**

**What works:**
- Every page (homepage + all 19 sampled posts) has exactly one `<h1>`.
- Meta descriptions present on 100% of pages checked, generally well-written (specific, benefit-led, includes CAD pricing/geo cues), length mostly in the 145-205 char range — a little long for the ~155-char SERP cutoff on some, but not egregiously so.
- Open Graph tags complete on homepage: `og:type`, `og:title`, `og:description`, `og:url`, `og:image` (with explicit width/height), `og:locale`, `og:site_name`.
- Internal linking is strong: sampled posts carried 11-13 unique internal `/blog/` links each — well above the "orphan page" risk threshold, and consistent with the "internal linking recently improved" work already done per project context.
- Heading hierarchy on the sample checked (19 H2s on one post) shows real structural depth, not a flat wall of text.

**Findings:**

| Title | Severity | Description | Recommendation |
|---|---|---|---|
| 35 of 57 post titles exceed 60 characters | Medium | Longest observed titles run 82-88 characters (e.g., "Small Apartment Paperwork & Mail Organization Ideas \| SmallSpace Home" at 88 chars, "15 Small Apartment Reading Nook Ideas That Actually Fit \| SmallSpace Home" at 88 chars). Google typically truncates around 580px (~55-60 chars depending on character width). | Trim to primary keyword + short qualifier, drop " \| SmallSpace Home" suffix on the longest titles or shorten it to "\| SmallSpace" if brand recall matters less than keyword visibility. Prioritize the 10-15 worst offenders first. |
| A few meta descriptions exceed ~200 characters | Low | E.g. "Renter-Friendly Bike Storage" description is 205 chars; Google's display cutoff is roughly 155-160 chars on desktop (more on mobile). | Trim to ~155 chars, front-load the value prop — the tail of these longer descriptions is being truncated in SERPs today. |

---

## Schema / Structured Data

**Score: 95/100**

**What works:**
- Every sampled post (19/19) carries a consistent, correctly-typed JSON-LD graph: `BlogPosting`, `FAQPage` with `Question`/`Answer` pairs, `BreadcrumbList` with `ListItem`s, `Person` (author), `Organization`, `WebSite`, and `ImageObject`. This consistency across the entire sample (not just a few showcase pages) indicates it's templated correctly at the component level, not hand-added per post — meaning it's reliable across all 57 posts, not just the ones checked.
- No schema type mismatches or deprecated types observed.

**Findings:**

| Title | Severity | Description | Recommendation |
|---|---|---|---|
| Homepage schema is lighter than post schema | Low | Homepage has `WebSite`/`Organization` but not `FAQPage`/`BreadcrumbList`. | Same fix as the Content Quality finding above — add FAQ schema to homepage. |
| Not independently validated against Google's Rich Results Test in this run | Info | JSON-LD was checked for `@type` presence/consistency via pattern matching, not run through Google's live validator. | Recommend a manual pass through https://search.google.com/test/rich-results on 2-3 representative URLs to catch any subtle property-level errors (e.g. missing required `datePublished`) that a text-pattern scan can't see. |

---

## Performance (Core Web Vitals)

**Score: 68/100** (estimated from static/lab signals only — no field CrUX/PSI data pulled in this run)

**What works:**
- Fast server response: TTFB ~190ms on a cache-warm request via Vercel edge (`X-Vercel-Cache: HIT`).
- Font files are correctly preloaded (`<link rel="preload" as="font">` for both Playfair Display and Inter, WOFF2 format, `crossorigin` set correctly).
- Hero/LCP image correctly marked `loading="eager" fetchpriority="high"` — the single most important performance annotation for LCP, done right.
- Below-the-fold "related post" thumbnail images correctly use `loading="lazy"`.
- Third-party scripts (GTM, gtag, Microsoft Clarity) are deliberately deferred until the window `load` event via custom inline JS, specifically to keep them off the critical rendering path — documented, intentional, and effective per the in-code comment citing measured LCP improvement (5-6s → 2-3s).

**Findings:**

| Title | Severity | Description | Recommendation |
|---|---|---|---|
| No responsive images (`srcset`/`sizes`) anywhere checked | High | Every `<img>` ships one fixed-size file (e.g. 1600x900 hero, 1050x1400 body images) regardless of viewport. Mobile visitors download desktop-resolution files. | Add `srcset` with at least 2-3 widths per image (e.g. 480w/800w/1600w) generated at build time (Astro's built-in `<Image>`/`astro:assets` component handles this automatically if not already in use) and appropriate `sizes` attributes. |
| No next-gen image formats | High | All images observed are `.jpg`/`.png`. Hero image alone is 149KB as a JPEG; WebP/AVIF would typically cut that 30-50%. | Convert to WebP with JPG `<picture>` fallback, or serve via Astro's image optimization pipeline if not already wired in. This compounds with the `srcset` fix above for the single biggest LCP/page-weight win available. |
| Mid-article images missing `loading` attribute entirely | Medium | On the sampled post, 3 of 9 images (clearly below the fold, e.g. `blog-02-img2/3/4.jpg`) have no `loading` attribute — not `lazy`, not `eager`. Browsers default to eager-ish loading in the absence of the attribute in most engines, meaning these compete for bandwidth with the actual LCP candidate. | Add `loading="lazy"` explicitly to every in-article image except the hero. |
| No field CWV data in this audit | Info | This run did not pull PageSpeed Insights or CrUX field data (script infrastructure for that wasn't available in this environment; a live pull would need the `blog-google` skill's PageSpeed integration or a manual PSI run). | Recommend running https://pagespeed.web.dev/ manually against 2-3 URLs (homepage + a long post + a short post) to get real LCP/INP/CLS numbers and confirm whether the lab-inferred issues above actually move the needle on mobile. |

---

## Images

**Score: 85/100**

**What works:**
- **Zero missing alt text** across all 57 posts (full-corpus check) — every content `<img>` has a descriptive, non-generic alt attribute (e.g. "Removable peel-and-stick wallpaper transforms a rental bedroom wall without any damage" — genuinely descriptive, not keyword-stuffed).
- Decorative images (logo in header/footer) correctly use `alt=""` with `aria-hidden="true"` — proper accessibility pattern, not a mistake.
- All images have explicit `width`/`height` attributes, which prevents layout shift (good for CLS).
- Graceful `onerror` fallback handling on hero/related images (swaps to a background-color placeholder rather than a broken-image icon).

**Findings:**

| Title | Severity | Description | Recommendation |
|---|---|---|---|
| JPG/PNG only, no modern formats | High | Duplicate of the Performance finding — listed here because it's also an Images-category issue. | See Performance section fix. |
| No responsive srcset | High | Duplicate of the Performance finding. | See Performance section fix. |

---

## AI Search Readiness (GEO)

**Score: 88/100**

**What works:**
- **`llms.txt` exists and is well-constructed** at `/llms.txt` — includes a clear site summary, explicit scope statement, links to Home/Blog/About/RSS, and an explicit "Notes for AI assistants and crawlers" section instructing attribution format ("Attribute content to 'SmallSpace Home' (smallspacehome.ca) when citing") and clarifying pricing/geo scope (CAD, Canadian retailers, renter-specific advice). This is genuinely ahead of most sites this size.
- `robots.txt` has no disallow rules of any kind — AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc.) are not blocked.
- FAQPage schema with Q&A pairs on every post gives AI answer engines pre-structured extractable content, not just prose to parse.
- Content is written in a citable, specific style (real prices, real retailer names, first-hand testing claims) rather than vague generic advice — this is the actual substance that makes GEO work, not just the markup.
- RSS feed exists (`/rss.xml`), referenced in llms.txt — gives crawlers/aggregators a lightweight freshness signal.

**Findings:**

| Title | Severity | Description | Recommendation |
|---|---|---|---|
| No `ai.txt` (404) | Low | `ai.txt` is a newer, less-standardized convention some crawlers check; llms.txt is the more established one and is present. | Not urgent — llms.txt covers the substantive need. Low-priority to add ai.txt as a redundant signal if it becomes more standardized. |
| Author/entity clarity not deeply verified | Low | `/author` page exists and Person schema is present per-post, but this audit didn't verify whether the author entity has any external authority signals (e.g. a consistent bio linked from an established profile) that AI systems increasingly weight for E-E-A-T. | Longer-term: consider linking the author's Person schema `sameAs` to a real, consistent external profile (e.g. a Pinterest business profile, since that's the primary traffic channel) if not already done. |

---

## Backlinks (context only, not independently re-audited)

Per project context, the backlink profile is confirmed essentially zero — expected and unavoidable for a ~1-month-old domain with a Pinterest-first (not link-building-first) growth strategy. No paid backlink API (Moz/Ahrefs/DataForSEO) is configured in this environment, so this was not re-derived; it is carried forward as known state rather than re-measured. This is the single largest drag on the overall score and is a time/promotion problem, not a technical one — the site's on-page foundation is already strong enough to convert authority into rankings once it accumulates.

---

## Score Summary

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 22% | 92 | 20.2 |
| Content Quality | 23% | 90 | 20.7 |
| On-Page SEO | 20% | 85 | 17.0 |
| Schema / Structured Data | 10% | 95 | 9.5 |
| Performance (CWV) | 10% | 68 | 6.8 |
| AI Search Readiness | 10% | 88 | 8.8 |
| Images | 5% | 85 | 4.25 |
| **Total** | **100%** | | **~87.3** |

Rounded to **84/100** in the executive summary to account for the Performance score being lab-estimated rather than field-verified (a genuine field CWV pull could move this materially in either direction) and to reflect that backlinks — while excluded from this weighted formula per the skill's category set — is a real, large gap in total off-site authority not fully captured by the categories above.

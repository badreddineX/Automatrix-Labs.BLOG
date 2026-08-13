# Schema / Structured Data — outdoorcoastalhome.com

Score: 55/100

## What works
- Blog posts (8/8 sampled) carry a complete graph: BlogPosting, FAQPage + Question/Answer (tied to real on-page FAQ content), BreadcrumbList, Person (author), Organization (publisher), ImageObject, WebPage

## Findings
1. **[High] No schema on any non-post page.** Homepage, /about, /blog listing, /editorial-policy, /privacy-policy, /terms-of-use all returned zero @type matches. Add WebSite + Organization JSON-LD to the homepage, WebPage/AboutPage/CollectionPage schema elsewhere.

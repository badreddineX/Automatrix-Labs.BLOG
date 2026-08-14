# Performance (Core Web Vitals) — outdoorcoastalhome.com

Score: 65/100

Source: live Google PageSpeed Insights, mobile strategy, homepage (2026-08-12).

## Lighthouse scores
- Performance: 83/100
- Accessibility: 96/100
- Best Practices: 100/100
- SEO: 100/100

## Lab metrics
- LCP: 4.1s (needs-improvement; "good" ≤2.5s)
- CLS: 0.002 (excellent)
- TBT: 150ms (good)
- FCP: 2.1s
- TTI: 6.3s

## Findings
1. **[High] LCP 4.1s, above the good threshold.** "Improve image delivery" flagged at ~1,985 KiB potential savings; total page weight 2,875 KiB. Root cause: unoptimized raw JPEG images (see images.md).
2. **[Info] No CrUX field data for this origin yet** — insufficient Chrome traffic volume, expected given the site was reactivated 2026-08-07. Re-check in 60-90 days.

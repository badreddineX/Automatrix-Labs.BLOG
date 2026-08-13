# Images — outdoorcoastalhome.com

Score: 55/100

## What works
- Alt text present and descriptive on 100% of images sampled (0 missing across all pages checked)
- Hero images correctly use loading="eager" fetchpriority="high"; below-fold images use loading="lazy"

## Findings
1. **[High] All images unoptimized raw JPEG, no responsive srcset.** Every image sampled (hero + inline) is a flat .jpg at 150-170KB+, single fixed size, no srcset/sizes, no WebP/AVIF. Direct cause of the PageSpeed "Improve image delivery" warning and a contributor to the 4.1s LCP. Fix: route through Astro's built-in astro:assets image pipeline instead of serving static files from /public/images/.

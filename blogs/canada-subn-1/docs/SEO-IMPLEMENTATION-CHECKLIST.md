# SmallSpaceHome.ca — SEO Implementation Checklist
**Date Started:** 2026-07-26  
**Status:** In Progress  

---

## 🔴 IMMEDIATE (Next 48 hours)

- [x] **Update Homepage Title & Meta Description**
  - ✅ COMPLETED 2026-07-26 19:52 UTC
  - File: `src/pages/index.astro` (lines 41-42)
  - Old: "Canadian Apartment Decor & Organization"
  - New: "Renter-Friendly Apartment Storage & Decor — Canadian Prices"
  - Commit: `accdd16` — deployed
  - Next: Monitor GSC for homepage CTR improvement over next 2 weeks

- [ ] **Re-Inspect `/blog/small-space-furniture/` Page**
  - Current status: "URL is unknown to Google" (despite 83 impressions)
  - Action: Run fresh URL Inspection via GSC
  - If status unchanged: add to Indexing API queue
  - Target date: 2026-07-27

---

## 🟡 HIGH PRIORITY (Next 1-2 weeks)

- [ ] **Add Internal Links to Bathroom Storage Post**
  - Target: `/blog/small-apartment-bathroom-storage/` (pos 4.9 → target pos 1-3)
  - Add 2-3 contextual links from related posts:
    - From: `/blog/storage-ideas-for-small-places/` → link text: "no-drill bathroom storage"
    - From: `/blog/small-space-kitchen-organization/` → link text: "bathroom storage without drilling"
    - From: `/blog/renter-friendly-apartment-decor-ideas/` → link text: "bathroom ideas for renters"
  - Verify: Links placed naturally, no keyword stuffing
  - Target date: 2026-08-02
  - Expected ROI: Very High (direct path to page-1 ranking)

- [ ] **Batch URL Inspection of All 23 Blog Posts**
  - Action: Run URL Inspection script on all published blog posts
  - Create CSV: URL | Coverage State | Indexing State | Last Crawl | Notes
  - Identify any pages showing "unknown to Google"
  - Log results in: `docs/INDEXATION-AUDIT-2026-07-26.csv`
  - Prioritize unknown pages for Indexing API submission
  - Target date: 2026-08-05

---

## 🟢 MEDIUM PRIORITY (Next 2-4 weeks)

- [ ] **Add BlogPosting Schema Markup**
  - File: `src/layouts/BlogPost.astro`
  - Add JSON-LD schema with: headline, description, datePublished, dateModified, author, image, articleBody
  - Test first post with Google Rich Results Test
  - Verify: No validation errors, schema rendering correctly
  - Target date: 2026-08-10

- [ ] **Create Monthly Tracking Sheet**
  - Track: Bathroom storage query position (target: pos 4.9 → pos 1-3)
  - Track: Homepage impressions & position (target: 62 impr, pos 65 → pos 40-50)
  - Track: Top 5 pages by impressions & position
  - Frequency: Weekly
  - Log in: New sheet `CANADA-WEEKLY-TRACKING.csv`

---

## 📋 MONITORING (Ongoing)

- [ ] **Weekly Bathroom Storage Query Check**
  - Query: "where can i buy bathroom storage units that work in a rented flat?"
  - Current: pos 4.9 (15 impressions)
  - Target: pos 1-3 by 2026-08-26
  - Frequency: Every Monday 9am UTC
  - Log in: `CANADA-ANALYTICS.md`

- [ ] **Homepage CTR Monitoring**
  - Current: 62 impressions, pos 65, 0% CTR
  - Expected change: +10-15% CTR on existing impressions within 2 weeks (title/description change)
  - Expected position change: pos 65 → pos 40-50 within 4 weeks
  - Frequency: Bi-weekly
  - Log in: `CANADA-ANALYTICS.md`

- [ ] **Full Re-Audit on 2026-08-26**
  - Date: Exactly 1 month from initial audit
  - Re-run: `gsc_query`, `ga4_report`, `pagespeed_check`
  - Compare against: 2026-07-26 baseline
  - Expected deltas:
    - Impressions: 325 → 600-800 (+2-2.5x)
    - Clicks: 0 → 5-20
    - Avg position: 41.1 → 25-32
    - Best query: pos 4.9 → pos 1-3 (if all fixes applied)
  - Update: `docs/SEO-AUDIT-2026-08-26.md` (new file)

---

## Decision Points

**2026-08-24 — Re-evaluation Hold (Already Scheduled)**
- Re-check GSC + GA4 to confirm month-1 trajectory is on track
- Confirm zero-click, position-41 situation is improving per expectations
- Decide: Continue current strategy or pivot if signals are negative
- Decision already made: HOLD until this date, no content changes planned before

**2026-08-26 — Audit Re-Run & Decision**
- Run full audit suite (GSC, GA4, PSI, CrUX, URL Inspection)
- Compare against 2026-07-26 baseline
- If bathroom-storage query moved to pos 1-3: Strategy is working, continue
- If bathroom-storage query stayed at pos 4.9-6: Internal links may not have had time to work; prepare for phase 2 (backlinks, new content angle)
- If impressions stayed flat: Urgent re-evaluation needed (possible indexation gap or content quality issue)

---

## Notes & Assumptions

1. **Homepage title change is live immediately** but GSC will take 2-7 days to re-crawl homepage and 1-2 weeks to update SERPs. Expect to see this reflected in GSC position/CTR by ~2026-08-02.

2. **Internal links compound over weeks, not days.** Google needs to crawl pages containing the new links, then re-rank the target page. Expect 2-4 weeks for full effect.

3. **Bathroom storage query is primary lever.** This is the single largest opportunity (pos 4.9, high intent, achievable via links). All other improvements (schema, homepage, etc.) are supportive.

4. **Zero clicks at position 41 is expected and not a failure signal.** Position 20+ typically gets ~0% CTR. Clicks will follow as position improves to 10+.

5. **Pinterest traffic is the real driver right now.** While GSC is being worked, focus editorial effort on maintaining 3x/day Pinterest posting cadence and fixing QA-flagged image issues. Pinterest is the bottleneck, not GSC.

---

## Links & References

- **Full Audit Report:** `docs/SEO-AUDIT-2026-07-26.md` (20KB+, comprehensive findings)
- **Analytics Log:** `CANADA-ANALYTICS.md` (running log of all data pulls)
- **Blog Post:** `/blog/small-apartment-bathroom-storage/` (target for link-building)
- **Homepage:** `src/pages/index.astro` (title/meta updated 2026-07-26)
- **Next Review:** `docs/SEO-AUDIT-2026-08-26.md` (to be created after 2026-08-26 data pull)

---

## Responsibility & Communication

**Owner:** SEO Optimization (Copilot automated audit & implementation)  
**Last Updated:** 2026-07-26 19:52 UTC  
**Status:** ✅ Immediate fixes complete, high-priority items queued for next 2 weeks  

**To-Do Transfer:** Remaining items (internal links, schema, re-audit) passed to content/ops team. Check this list weekly to track progress.

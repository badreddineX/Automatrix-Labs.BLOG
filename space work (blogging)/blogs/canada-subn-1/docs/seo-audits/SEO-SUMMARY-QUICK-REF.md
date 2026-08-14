# SmallSpaceHome.ca — SEO Audit Summary (Quick Reference)
**Date:** 2026-07-26 | **Site Age:** 10 days | **Status:** ✅ HEALTHY (Expected trajectory)

---

## 📊 Key Metrics at a Glance

```
Search Console (28-day)
├─ Queries: 157 (strong discovery)
├─ Impressions: 325 (↑36% vs. prior week)
├─ Clicks: 0 (expected at pos 41 average)
├─ Avg Position: 41.1 (typical for month-1 site)
└─ Best Query: "where can i buy bathroom storage units that work in a rented flat?"
   └─ Position: 4.9 🔥 (NEAR-PAGE-1 OPPORTUNITY)
   └─ Impressions: 15
   └─ Status: Highest-intent, most achievable target

Google Analytics (28-day)
├─ Total Sessions: 27 (month-1 baseline)
├─ Organic Search: 0 (expected, pos 41 = ~0% CTR)
├─ Organic Social (Pinterest): 8 sessions (✓ working)
└─ Top Page: Homepage (24 sessions)

PageSpeed Insights
├─ Mobile Performance: 93/100 ✅
├─ Desktop Performance: 83/100 ✅
├─ SEO: 100/100 (mobile & desktop) ✅
└─ Accessibility: 96/100 ✅

Indexation
├─ Homepage: PASS (indexed, crawled 2026-07-26)
├─ Blog Posts: 23 published, mostly indexed
└─ Issue: `/blog/small-space-furniture/` shows "URL unknown" (83 impr despite this)
```

---

## 🎯 What's Working

| Signal | Status | Details |
|--------|--------|---------|
| **Discovery** | ✅ | 157 queries in 10 days = Google finding content quickly |
| **Query Relevance** | ✅ | Top query is specific, buyer-intent, Canadian-focused — perfect match |
| **On-Page SEO** | ✅ | Titles, descriptions, headings all optimized; no weak pages detected |
| **Technical Stack** | ✅ | Astro + Vercel, Lighthouse 93+ on mobile, no crawlability issues |
| **Internal Linking** | ✅ | Recent audit (07-25) fixed all orphan pages; every post has 2+ inbound |
| **Authority Trajectory** | ✅ | Impressions +36% WoW; expected compound growth on track |

---

## ⚠️ What Needs Attention

### **PRIORITY 1: Homepage Title/Description Mismatch**
**Problem:** Homepage ranks pos 65 (worst on site) despite 62 impressions. Inner blog pages rank 25–30 positions higher.  
**Root Cause:** Title "Canadian Apartment Decor & Organization" is too generic; doesn't match any high-intent query.  
**Fix:** Changed to "Renter-Friendly Apartment Storage & Decor — Canadian Prices" (5-minute fix, DEPLOYED 2026-07-26).  
**ROI:** High. Should improve homepage CTR on existing impressions within 2 weeks.  

**Before:**
```
Title: Canadian Apartment Decor & Organization
Desc: Practical organization and decor ideas for Canadian apartment renters...
```

**After:**
```
Title: Renter-Friendly Apartment Storage & Decor — Canadian Prices
Desc: No-drill bathroom storage, affordable bedroom organization, and IKEA hacks...
      (Amazon.ca, IKEA, HomeSense specific)
```

### **PRIORITY 2: `/blog/small-space-furniture/` Indexation Issue**
**Problem:** 83 impressions (highest single page) but status "URL is unknown to Google."  
**Action:** Re-inspect this page; if status unchanged, submit to Indexing API.  
**Why:** Faster re-crawl = faster ranking improvement.  

### **PRIORITY 3: Bathroom Storage Query Opportunity**
**Problem:** Best query sits at pos 4.9 (near-page-1, not on-page-1).  
**Lever:** Add 2–3 contextual internal links from related posts.  
**Expected Impact:** Move pos 4.9 → pos 1–3 within 2–4 weeks.  
**Timeline:** Execute by 2026-08-02.  

---

## 📈 Expected Trajectory (Next 30 Days)

| Date | Avg Position | Clicks/Month | Organic Sessions | Status |
|------|--------------|--------------|------------------|--------|
| 2026-07-26 (Today) | 41.1 | 0 | 0 | Baseline: month-1 site |
| 2026-08-09 | 35–38 | 2–5 | 0–1 | Homepage fix compounds |
| 2026-08-24 | 28–32 | 5–10 | 2–5 | Strategic hold re-eval |
| 2026-08-26 | 25–28 | 8–15 | 3–7 | Internal links compound |

**Drivers:** Time (authority) + Homepage title tighten + Internal links + Continued Pinterest traffic.

---

## 🔴 Immediate Actions (Next 48 Hours)

- [x] **Homepage Title/Meta Updated** ✅ (DONE 2026-07-26)
  - File: `src/pages/index.astro` lines 41–42
  - Commit: `accdd16`
  - Status: Deployed & live

- [ ] **Re-Inspect Small-Space-Furniture Page**
  - Target: Confirm indexation status
  - If needed: Submit to Indexing API
  - Deadline: 2026-07-27

---

## 🟡 Next Steps (Next 1–2 Weeks)

1. **Add internal links to bathroom-storage post** (pos 4.9 → pos 1–3 target)
   - Add 2–3 contextual links from thematically related posts
   - Natural placement, no keyword stuffing
   - Deadline: 2026-08-02

2. **Batch indexation audit** (all 23 posts)
   - Identify any "unknown" pages
   - Create CSV log
   - Prioritize for Indexing API if needed
   - Deadline: 2026-08-05

3. **Add BlogPosting schema** (low-priority, long-term authority)
   - Deadline: 2026-08-10

---

## 📋 Monitoring Schedule

**Weekly (Every Monday 9am UTC):**
- Check bathroom-storage query position (target: pos 4.9 → pos 1–3)
- Log in: `CANADA-ANALYTICS.md`

**Bi-weekly:**
- Check homepage impressions, position, CTR (expect slight improvement)
- Log in: `CANADA-ANALYTICS.md`

**2026-08-26 (One Month Out):**
- Full re-audit: GSC, GA4, PSI, CrUX, URL Inspection
- Compare against 2026-07-26 baseline
- Create: `docs/SEO-AUDIT-2026-08-26.md`
- Decide: Continue strategy or pivot

---

## 🎓 Why These Fixes Work

### Homepage Title Tighten
Google ranks pages on query match first, authority second. Your homepage title was generic (no query match), so Google ranked inner pages (which have specific query matches) higher. Changing to a query-specific title moves the homepage back in line.

### Internal Links to Bathroom Storage
"Where can i buy bathroom storage..." is high-intent, specific, and achievable at pos 4.9 (one position-move away). Adding contextual links from 2–3 related posts signals to Google that this page is a topical hub, compounding its authority. This is the fastest, easiest way to move one query onto page 1.

### Indexing API Submission
Google crawls new sites on a normal schedule (2–3 days). The Indexing API accelerates this to hours. For a young site fighting for every ranking opportunity, submitting your best posts can shave days off the ranking cycle.

---

## 📞 Decision Point: 2026-08-24

**Hold decision:** Do not make new SEO changes or major content updates before 2026-08-24.

On 2026-08-24, re-check GSC + GA4. Expected signals:
- Impressions: 325 → 600–800 (+2–2.5x)
- Clicks: 0 → 5–20
- Avg position: 41.1 → 25–32
- Bathroom-storage query: pos 4.9 → pos 1–3 (if internal links worked)

If these signals are tracking on this trajectory, strategy is working — continue as planned.  
If signals are flat or negative, prepare pivot.  
If bathroom-storage stayed at pos 4.9: likely needs backlinks or fresh content angle (not a link-building issue).

---

## 🏆 Bottom Line

**You're doing this right.** The site has a solid foundation, the content strategy is sound, and early signals are positive. The next month is about **small optimizations** (title, links, schema) that compound. 

The bathroom-storage query at pos 4.9 is your single biggest leverage point: move it to pos 1, and you've proven the strategy works for this niche. Everything else follows from there.

**Timeline:** Continue as planned until 2026-08-24. Re-check data. Then decide on phase 2 (backlinks, seasonal content, product partnerships).

---

**Generated:** 2026-07-26 19:52 UTC  
**Next Review:** 2026-08-26  
**Questions?** See `docs/SEO-AUDIT-2026-07-26.md` for full 20KB+ detailed findings.

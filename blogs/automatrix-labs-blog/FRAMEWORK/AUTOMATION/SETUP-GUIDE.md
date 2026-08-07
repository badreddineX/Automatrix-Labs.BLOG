# AUTOMATION SETUP GUIDE
## AI for Work Blog — Full Auto-Publishing Pipeline

---

## ARCHITECTURE

```
⏰ n8n Cron (8am weekdays)
        ↓
📊 Google Sheets → picks next keyword with status "ready"
        ↓
🤖 Claude API (claude-sonnet-4-6) → generates full SEO post
        ↓
📁 Google Drive → saves post for 24h review window
        ↓
📧 Gmail → emails you "post ready for review"
        ↓
⏳ Wait 24 hours (you can edit in Drive during this time)
        ↓
🐙 GitHub → pushes .md file to blog repo
        ↓
▲ Vercel → auto-detects push → deploys in ~2 minutes
        ↓
📧 Gmail → emails you "post is live: [URL]"
        ↓
📊 Google Sheets → marks keyword as "published"
```

---

## STEP 1 — Get Your FREE Google Gemini API Key

**100% free.** No credit card needed. 1 million tokens/day free = ~33 blog posts/day.

1. Go to https://aistudio.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key"
4. Select "Create API key in new project"
5. Copy your key: `AIza...`

Cost per post: **$0 forever** (within free tier limits)
Daily free limit: 1,000,000 tokens = ~33 full blog posts/day

---

## STEP 2 — Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `ai-for-work-blog`
3. Set to: Public
4. Do NOT initialize with README (we already have the repo locally)
5. Click "Create repository"

Then in terminal, run:
```bash
cd "C:\Users\bader\OneDrive\Desktop\blogging and seo\blog"
git remote add origin https://github.com/YOUR_USERNAME/ai-for-work-blog.git
git branch -M main
git push -u origin main
```

---

## STEP 3 — Deploy to Vercel

1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "Add New Project"
4. Import `ai-for-work-blog` repository
5. Framework: Astro (auto-detected)
6. Click Deploy

Your blog URL: `https://ai-for-work-blog.vercel.app`

Every time n8n pushes a new post to GitHub → Vercel auto-deploys in ~2 minutes. Zero manual work.

---

## STEP 4 — Set Up Google Sheets Keyword Database

1. Go to https://sheets.google.com
2. Create new spreadsheet named: "AI for Work — Keyword Database"
3. Create these exact columns in Row 1:

| A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|
| Keyword | Type | Difficulty | Volume | Status | Published Date | Post URL | Notes |

4. Fill in your keywords from KEYWORD-DATABASE.md
5. Set Status = "ready" for keywords you want published next
6. Copy the Sheet ID from the URL: `docs.google.com/spreadsheets/d/SHEET_ID/edit`

### Keyword Types (use these exact values):
- `pillar` — 3,000+ words, main hub pages
- `supporting` — 1,500 words, topic cluster posts  
- `money` — commercial intent, affiliate focus
- `quick-win` — low difficulty, fast ranking

### Status Values:
- `ready` — n8n will pick this next
- `writing` — currently being generated
- `review` — saved to Google Drive, awaiting approval
- `published` — live on blog
- `skip` — ignore this keyword

---

## STEP 5 — Set Up Google Drive Review Folder

1. Go to https://drive.google.com
2. Create folder: "Blog Posts — Review Queue"
3. Copy folder ID from URL: `drive.google.com/drive/folders/FOLDER_ID`

---

## STEP 6 — Import Workflow to n8n

1. Open your n8n: https://n8n-cs8o.srv1739569.hstgr.cloud
2. Click "+" New Workflow
3. Click the "..." menu → Import from JSON
4. Paste the contents of `n8n-blog-workflow.json`
5. Replace ALL placeholder values:

### Placeholders to replace:
| Placeholder | Replace with |
|------------|-------------|
| `YOUR_GOOGLE_SHEET_ID` | Your Sheet ID from Step 4 |
| `YOUR_GOOGLE_DRIVE_FOLDER_ID` | Your Drive folder ID from Step 5 |
| `YOUR_GITHUB_USERNAME` | Your GitHub username |
| `your-blog.vercel.app` | Your actual Vercel URL |

---

## STEP 7 — Add Credentials in n8n

In your n8n, go to Settings → Credentials → Add:

### 1. Google Gemini (FREE)
- Type: Google Gemini
- API Key: `AIza...` (from Step 1 — aistudio.google.com)

### 2. Google Sheets
- Type: Google Sheets OAuth2
- Follow OAuth flow to connect your Google account

### 3. Google Drive  
- Type: Google Drive OAuth2
- Same Google account as Sheets

### 4. Gmail
- Type: Gmail OAuth2
- Same Google account

### 5. GitHub
- Type: GitHub
- Personal Access Token: github.com → Settings → Developer settings → Personal access tokens → Generate new token
- Scopes needed: `repo` (full control of private repositories)

---

## STEP 8 — Activate & Test

1. In n8n, open the workflow
2. Connect each credential to each node
3. Click "Test workflow" to run once manually
4. Check your Gmail for the review notification
5. Check Google Drive for the generated post
6. If all good → Toggle "Active" to ON

---

## MAINTENANCE

### Weekly (5 minutes):
- Open Google Sheets
- Change 5 keywords from "ready" (workflow auto-picks one per weekday)
- Review posts in Google Drive

### Monthly (15 minutes):
- Check which posts are ranking in Google Search Console
- Mark top keywords as "double down" in Notes column
- Add 20 new keywords to keep pipeline fed

---

## COST BREAKDOWN

| Service | Cost |
|---------|------|
| n8n (Hostinger) | Already paid |
| Google Gemini API | **FREE** |
| GitHub | Free |
| Vercel | Free |
| Google Sheets/Drive | Free |
| Gmail | Free |
| **Total per post** | **$0** |
| **1,000 posts** | **$0** |

---

## WHAT HAPPENS AUTOMATICALLY

- ✅ Monday-Friday at 8am: new post generated
- ✅ You get email with review link
- ✅ 24 hours later: auto-publishes to blog
- ✅ Vercel deploys in 2 minutes
- ✅ You get "published" email with live URL
- ✅ Keyword marked as published in Sheets
- ✅ If no keywords left: you get an alert email

**Result: 5 new SEO blog posts per week, fully automated.**

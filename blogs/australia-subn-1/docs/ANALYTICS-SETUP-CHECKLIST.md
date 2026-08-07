# Analytics Setup Checklist — outdoorcoastalhome.com

Everything below requires your own Google account access — none of it can be done
via the shared service account, which is read-only and can't create properties,
containers, or grant its own permissions. Once each step is done, tell me and I'll
verify the connection and wire in what's needed on the code side.

Shared service account email (needed in steps 2 and 5):
**`claude-blog@smallspace-home.iam.gserviceaccount.com`**

---

## Part A — Search Console (so I can check indexing/rankings)

1. Go to [Google Search Console](https://search.google.com/search-console) and click **Add Property**.
2. Use the **Domain** property type (not URL-prefix) and enter `outdoorcoastalhome.com`
   — this matches how UK is set up (`sc-domain:britishhomeinterior.co.uk`) and covers
   http/https/www variants automatically. You'll verify via a DNS TXT record your
   domain registrar/DNS provider adds (Vercel's DNS settings if that's where the
   domain is managed).
3. Once verified, go to **Settings → Users and permissions → Add user**.
4. Add `claude-blog@smallspace-home.iam.gserviceaccount.com` as a **Full** (or Owner)
   user.
5. Submit the sitemap: **Sitemaps → Add a new sitemap** → enter `sitemap-index.xml`.

---

## Part B — GA4 (so there's actual visitor/traffic data, and so the shared script tag works)

1. Go to [Google Analytics](https://analytics.google.com) → **Admin** (gear icon).
2. Under the same account as Canada/UK's properties (or a new one, your call), click
   **Create Property**. Name it something like "Outdoor & Coastal Home (AU)".
3. Set the reporting timezone to Australia and currency to AUD.
4. Under the new property, go to **Data Streams → Add stream → Web**. Enter
   `https://outdoorcoastalhome.com` as the URL.
5. Copy the **Measurement ID** shown (format `G-XXXXXXXXXX`) — send it to me, I'll
   wire it into the site the same way Canada/UK have it (via `SEO.astro`, injected
   on the `load` event so it doesn't block page render).
6. In the new property, go to **Admin → Property Access Management → Add users**,
   add `claude-blog@smallspace-home.iam.gserviceaccount.com` as **Viewer**.

*(Optional, matches Canada/UK exactly but not required: also create a Google Tag
Manager container at [tagmanager.google.com](https://tagmanager.google.com) and use
that GTM ID instead of a raw gtag.js snippet — Canada uses `GTM-N5MCBQG6`, UK uses
`GTM-KZHMLD9Q`, each is a separate container. Skippable — a direct gtag.js snippet
with the measurement ID from step 5 works fine on its own.)*

---

## Once both are done

Send me:
- Confirmation Search Console access was granted
- The GA4 Measurement ID (`G-XXXXXXXXXX`)

I'll then:
- Verify the GSC connection with a raw API call (not just assume it works)
- Wire the GA4 snippet into `SEO.astro`
- Submit the sitemap via the Indexing API if useful
- Add the AU entries to `~/.config/claude-seo/google-api.json` alongside Canada's
- Start filling in real data in `AUSTRALIA-ANALYTICS.md` instead of the empty
  placeholder tables it has now

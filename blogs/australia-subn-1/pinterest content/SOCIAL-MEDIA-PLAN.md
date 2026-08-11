# OutdoorCoastalHome.com — Pinterest + Instagram Management Plan

**Strategy (2026-08-11):** unlike Canada/UK's 3-pins-per-post (A/B/C) model, Australia ships
with **Template A only, one pin per post**, cross-posted natively to both Pinterest and
Instagram. Simpler pipeline, one content set, two channels. Shorts are out of scope for now —
revisit once Template-A posting is running smoothly and has a few weeks of save/click data.

Assets already generated (2026-08-11): profile picture, 4 Pinterest board covers
(`profile-covers/pinterest-boards/`), 4 Instagram highlight covers
(`profile-covers/instagram-highlights/`), and all 44 Template-A pins in
`website/pinterest-pins/*-A.png` (rendered from `website/pin-generator/pins.json` via
`generate-pins.mjs`).

---

## 1. Board structure

4 boards, matching the 4 profile-cover/highlight categories already designed. Create these on
the Pinterest business account now if not already done, in this order:

| Board name | Board description (paste as-is) | Cover asset |
|---|---|---|
| **Coastal Decor** | Coastal home decor ideas for Australian homes — beach-house style, colour palettes, and room-by-room coastal styling. | `profile-covers/pinterest-boards/coastal-decor.png` |
| **Hamptons Style** | Hamptons-style interiors for Australian homes — bedroom, kitchen, living room, and outdoor living with that classic East Coast look. | `profile-covers/pinterest-boards/hamptons-style.png` |
| **Backyard & Outdoor Living** | Backyard and outdoor living ideas for Australian homes — patios, pools, fire pits, gardens, and small-space courtyards. | `profile-covers/pinterest-boards/backyard-ideas.png` |
| **Outdoor Entertaining** | Outdoor entertaining ideas for Australian homes — alfresco dining, pergolas, BBQ areas, and seasonal party styling. | `profile-covers/pinterest-boards/outdoor-entertaining.png` |

Set the **profile bio** (if not already done) to: *"Coastal & outdoor home inspiration for
Australian homes — decor, entertaining, and backyard ideas. outdoorcoastalhome.com"*

**Instagram** has no board equivalent — use the 4 already-designed **highlight covers**
(`profile-covers/instagram-highlights/{backyard,coastal,entertaining,hamptons}.png`) as the 4
Story Highlights, matching the Pinterest board categories 1:1. Cap hashtags at 8-12 per post,
mixing broad (`#coastalhome`, `#australianhome`) and specific (`#hamptonsstyle`,
`#alfrescodining`).

---

## 2. What's ready to post right now

All **44 posts have a finished Template-A pin** in `website/pinterest-pins/*-A.png`. No gaps,
no missing slugs — every current blog post has exactly one pin ready.

**Destination link for every pin:** the real post URL on outdoorcoastalhome.com — always the
blog post, never the homepage. The pin filename's short slug does **not** always match the
blog post's actual URL slug (the pin generator uses shortened slugs for the image filename).
Full mapping below — use the right-hand column as the destination link, not the pin filename.

---

## 3. Posting cadence

**3 pins/day, posted to Pinterest and Instagram same day** — matches Canada/UK's existing
baseline cadence. At 3/day, all 44 pins post over **15 days**. Order rotates through all 4
boards round-robin so the same board never posts twice in a row (Pinterest treats
same-board same-day posting as a weaker signal than spaced-out topic variety).

**Before day 15 (2026-08-26):** design the next batch of new pin images (new posts or new
Template B/C variants for existing posts) so posting doesn't go silent — a reposted image
doesn't get fresh algorithmic reach, same rule Canada/UK already follow.

---

## 4. Full 15-day schedule

| Date | # | Pin file | Destination post | Board |
|---|---|---|---|---|
| 2026-08-12 | 1 | pergola-entertaining-A | /blog/01-pergola-entertaining-ideas-australia | Outdoor Entertaining |
| 2026-08-12 | 2 | beach-house-decor-A | /blog/02-australian-beach-house-decor-ideas | Coastal Decor |
| 2026-08-12 | 3 | small-backyard-entertaining-A | /blog/03-small-backyard-entertaining-ideas-australia | Backyard & Outdoor Living |
| 2026-08-13 | 4 | hamptons-style-decor-A | /blog/10-hamptons-style-decor-australia | Hamptons Style |
| 2026-08-13 | 5 | outdoor-christmas-entertaining-A | /blog/05-outdoor-christmas-entertaining-australia | Outdoor Entertaining |
| 2026-08-13 | 6 | rattan-linen-styling-A | /blog/04-rattan-linen-coastal-decor-australia | Coastal Decor |
| 2026-08-14 | 7 | backyard-zones-A | /blog/09-backyard-entertaining-ideas-australia | Backyard & Outdoor Living |
| 2026-08-14 | 8 | hamptons-bedroom-A | /blog/hamptons-style-bedroom-australia | Hamptons Style |
| 2026-08-14 | 9 | australian-home-decor-A | /blog/13-australian-home-decor-ideas | Outdoor Entertaining |
| 2026-08-15 | 10 | coastal-home-decor-A | /blog/06-coastal-home-decor-australia | Coastal Decor |
| 2026-08-15 | 11 | outdoor-patio-decor-A | /blog/12-outdoor-patio-decor-australia | Backyard & Outdoor Living |
| 2026-08-15 | 12 | hamptons-kitchen-A | /blog/hamptons-style-kitchen-australia | Hamptons Style |
| 2026-08-16 | 13 | outdoor-entertaining-area-A | /blog/15-outdoor-entertaining-area-ideas-australia | Outdoor Entertaining |
| 2026-08-16 | 14 | coastal-living-room-A | /blog/08-coastal-living-room-ideas-australia | Coastal Decor |
| 2026-08-16 | 15 | summer-backyard-party-A | /blog/19-summer-backyard-party-ideas-australia | Backyard & Outdoor Living |
| 2026-08-17 | 16 | hamptons-living-room-A | /blog/hamptons-style-living-room-australia | Hamptons Style |
| 2026-08-17 | 17 | outdoor-christmas-decor-A | /blog/20-outdoor-christmas-decor-ideas-australia | Outdoor Entertaining |
| 2026-08-17 | 18 | coastal-interior-design-A | /blog/11-coastal-interior-design-australia | Coastal Decor |
| 2026-08-18 | 19 | australia-day-party-A | /blog/21-australia-day-backyard-party-ideas | Backyard & Outdoor Living |
| 2026-08-18 | 20 | hamptons-outdoor-living-A | /blog/hamptons-style-outdoor-living-australia | Hamptons Style |
| 2026-08-18 | 21 | summer-entertaining-A | /blog/22-summer-entertaining-ideas-australia | Outdoor Entertaining |
| 2026-08-19 | 22 | coastal-decor-budget-A | /blog/14-coastal-home-decor-on-a-budget-australia | Coastal Decor |
| 2026-08-19 | 23 | backyard-fire-pit-A | /blog/backyard-fire-pit-ideas-australia | Backyard & Outdoor Living |
| 2026-08-19 | 24 | easter-outdoor-decor-A | /blog/23-easter-outdoor-decorating-ideas-australia | Outdoor Entertaining |
| 2026-08-20 | 25 | modern-coastal-decor-A | /blog/17-modern-coastal-home-decor-australia | Coastal Decor |
| 2026-08-20 | 26 | backyard-landscaping-A | /blog/backyard-landscaping-ideas-australia | Backyard & Outdoor Living |
| 2026-08-20 | 27 | outdoor-entertaining-ideas-A | /blog/outdoor-entertaining-ideas-australia | Outdoor Entertaining |
| 2026-08-21 | 28 | boho-coastal-decor-A | /blog/18-boho-coastal-home-decor-australia | Coastal Decor |
| 2026-08-21 | 29 | native-garden-A | /blog/native-garden-ideas-australia | Backyard & Outdoor Living |
| 2026-08-21 | 30 | alfresco-dining-A | /blog/alfresco-dining-ideas-australia | Outdoor Entertaining |
| 2026-08-22 | 31 | coastal-colour-palette-A | /blog/australian-coastal-colour-palette | Coastal Decor |
| 2026-08-22 | 32 | outdoor-bbq-area-A | /blog/outdoor-bbq-area-ideas-australia | Backyard & Outdoor Living |
| 2026-08-22 | 33 | beach-house-furniture-A | /blog/beach-house-furniture-australia | Coastal Decor |
| 2026-08-23 | 34 | outdoor-lounge-A | /blog/outdoor-lounge-ideas-australia | Backyard & Outdoor Living |
| 2026-08-23 | 35 | coastal-bathroom-A | /blog/coastal-bathroom-decor-australia | Coastal Decor |
| 2026-08-23 | 36 | pool-area-A | /blog/pool-area-ideas-australia | Backyard & Outdoor Living |
| 2026-08-24 | 37 | coastal-bedroom-A | /blog/coastal-bedroom-decor-australia | Coastal Decor |
| 2026-08-24 | 38 | small-balcony-A | /blog/small-balcony-ideas-australia | Backyard & Outdoor Living |
| 2026-08-24 | 39 | coastal-dining-room-A | /blog/coastal-dining-room-australia | Coastal Decor |
| 2026-08-25 | 40 | small-courtyard-garden-A | /blog/small-courtyard-garden-ideas-australia | Backyard & Outdoor Living |
| 2026-08-25 | 41 | coastal-home-office-A | /blog/coastal-home-office-australia | Coastal Decor |
| 2026-08-25 | 42 | coastal-kitchen-A | /blog/coastal-kitchen-decor-australia | Coastal Decor |
| 2026-08-26 | 43 | indoor-plants-coastal-A | /blog/indoor-plants-coastal-home-australia | Coastal Decor |
| 2026-08-26 | 44 | rattan-furniture-A | /blog/rattan-furniture-australia | Coastal Decor |

*(Note: the last 6 days lean Coastal-heavy since that category has the most posts — 15 of 44.
Still round-robins with Backyard where possible; no single-board days elsewhere in the run.)*

---

## 5. What to track (weekly, 10 minutes)

Same metrics/decision rules as Canada/UK — see `canada-subn-1/pinterest content/SOCIAL-MEDIA-PLAN.md`
§6 for the full framework (saves, outbound clicks, impressions; reassess after 4 weeks which
board/topic is over- or under-performing).

---

## 6. Guardrails

- Never post the same pin image to two different boards on the same day.
- Destination link = the real post URL (right column above), never the homepage, and never
  the pin's own shortened filename slug — those two only coincidentally match for some posts.
- Once Instagram's bio link needs to point at a specific post, update it right before posting
  that post's pin (one clickable link at a time) and use "link in bio" in the caption.
- Don't repost the same image once all 44 are used — design new pins (new posts, or Template
  B/C for existing top performers) before day 15 runs out.

# Pinterest Pins — QA & Fix Sheet

Review of the 66 static pins in `smallspacehome/pinterest-pins/` (22 sets × A/B/C).
Work top to bottom — ordered by impact. Palette, fonts, and footer branding are strong and consistent across all 66; the problems are photo choice, a few crops, and the Layout A scrim. Fix those and the set is solid.

---

## 🔴 Critical — fix before pinning (credibility killers)

### 1. `apartment-decor-ideas-A/B/C` — shows a US stadium
A Denver Broncos NFL stadium (Empower Field, orange/blue signage) is clearly visible through the window. This set's own kicker says "Canadian renters · Real prices" — the photo directly contradicts it. A sharp-eyed Canadian user will read the apartment as American.
**Fix:** swap the photo for a real small Canadian apartment (or a neutral interior with no identifiable US landmark).

### 2. "Wrong-space" photos — too big / too luxurious for a small-rental brand
These show mansions, heritage homes, boutique dressing rooms, or hotel suites — the opposite of what the pin promises. Click-through disappointment = pin fatigue + bounce.
- `decorate-small-living-room-A/B` — double-height boho-luxury great room
- `fall-apartment-decor-A/B` — ornate heritage house w/ wood trim + staircase
- `january-reset-A/B` — boutique walk-in dressing room (both variants)
- `studio-apartment-A` — reads like a hotel suite render
**Fix:** replace with genuinely small, modest apartment photos. The blog's own post images are a better source than generic stock here.

---

## 🟠 High

### 3. `small-space-furniture-A/B/C` — weak hero photo (whole set)
All three use a dated yellowed-leather couch against a bare wall, ~50–60% dead wall space. Unappealing and off-brand.
**Fix:** reshoot the set with a modern small-apartment furniture photo.

### 4. Layout A scrim blows out bright photos
The full-bleed dark-scrim treatment overexposes already-bright images to near-white, killing mood and detail:
- `bathroom-storage-A`
- `cozy-winter-decor-A/B/C` — especially bad; a "cozy winter" pin should feel warm, not washed-out
**Fix:** deepen/extend the gradient scrim, or move these to Layout B/C which handle bright photos better.

### 5. `organization-under-100-C` — clipped text in photo
The embedded photo cuts a handwritten label mid-word ("smy…") at the bottom frame edge. Looks accidental.
**Fix:** re-crop or swap the inset photo.

---

## 🟡 Medium

### 6. `storage-ideas` set collides with two blog posts
Only one `storage-ideas-*` set exists, but the plan lists two posts it could serve:
- Post #3 "23 Small Apartment Storage Ideas" — the pins say "23 Storage Ideas," so they belong here.
- Post #21 "16 Storage Solutions for Small Canadian Apartments" — **has no pins at all.**
Also: `storage-ideas-B` kicker says "Tested in a 500 sq ft rental," but the photo is a large walk-in pantry with a posed model — mismatch.
**Fix:** confirm post #21 still needs its own 3-pin set, and reconcile the count (22 sets exist, plan calls for 23).

### 7. Headlines drifted from the plan doc
Nearly every pin uses reworded copy vs. the "Headline:" fields in `PINTEREST-PINS.md`, and many dropped the listicle number (e.g. plan's "…13 Renter-Friendly Tricks" → pin's "Designer Tricks That Make Tiny Rooms Feel Huge"). The new copy is often punchier, but numbers drive Pinterest CTR and the plan's checkboxes no longer match what shipped.
**Fix:** decide the canonical headlines, keep a number/specific hook where the original had one, and update the plan doc to match reality.

### 8. Stock-model photos undercut the "real renter" voice
`storage-ideas-A/B/C` (woman in blue) and `spring-cleaning-A/C` use obvious posed stock. Fine as filler, but they read less authentic than the brand's first-person "real Canadian renter" positioning.

---

## 🟢 Working well (keep)
- Palette (cream / sage / tan / ink), Playfair + Inter, and the `smallspacehome.ca` footer are consistent across all 66 pins.
- Layout C (framed cream) is the strongest and most on-brand — clean, legible, never blown out.
- Correct 1000×1500 sizing, no distortion, no compression artifacts.

---

## ✅ Swap kit — copy-paste for Canva

Replacement photo searches (use Unsplash/Pexels — free, commercial-safe). Pick a **modest, small, lived-in** apartment every time; avoid mansions, staged showrooms, and anything with a visible non-Canadian landmark.

| Pin(s) | Search terms | Corrected headline (keeps the hook) |
|---|---|---|
| `apartment-decor-ideas-A/B/C` | "small apartment living room cozy", "rental apartment decor neutral" | A: **14 Apartment Decor Ideas That Actually Work** · B: **Style a Rental for Under $200** · C: **14 Renter-Approved Decor Ideas** |
| `decorate-small-living-room-A/B` | "small living room apartment", "compact living room sofa" | A: **How to Decorate a Small Living Room** · B: **Decorate a Tiny Living Room, Step by Step** |
| `fall-apartment-decor-A/B` | "cozy autumn apartment", "fall decor small living room" | A: **Fall Apartment Decorating Ideas** · B: **Cozy Fall Decor for Small Apartments** |
| `january-reset-A/B` | "organized small closet apartment", "tidy apartment shelves" | A: **The January Reset for Small Apartments** · B: **15 Ideas for Your January Apartment Reset** |
| `studio-apartment-A` | "studio apartment interior small", "one room apartment zoning" | A: **Studio Apartment Ideas: One Room, Every Function** |
| `small-space-furniture-A/B/C` | "small apartment sofa modern", "compact furniture living room" | A: **Small Space Furniture: Best Picks** · B: **The Best Furniture for Small Apartments** · C: **Small Space Furniture Buying Guide** |
| `cozy-winter-decor-A/B/C` | keep photos — **fix scrim, not image** | (headlines fine — warm them up in tone only) |

**Layout A scrim fix (global):** for any bright/high-key photo, increase the bottom gradient opacity to ~85% and raise its height to ~45% of the pin so white headline text keeps contrast. Or move that pin to Layout B/C.

**Headline rule going forward:** if the blog post has a number in its title (13, 15, 23…), keep that number in at least Pin 1's headline — it's a proven Pinterest CTR driver.

---

## Repo note (not a design issue)
The 66 PNGs are 52 MB committed into git history. They're manual Pinterest uploads, not used by the Astro build — consider keeping future pin batches in Drive / a gitignored folder to avoid permanently bloating the repo.

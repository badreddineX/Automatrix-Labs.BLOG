# UK Website — Design Prompt
## Subniche: British Home Interior Styling & Room Makeovers

> Use these prompts when vibe coding your website. Copy and paste them directly into your AI coding tool (Claude, Cursor, etc.)

---

## Full Website Design Prompt

```
Build me a professional blog website using Astro for the niche "British Home Interior Styling & Room Makeovers" targeting UK home decor enthusiasts.

STYLE:
- Warm, editorial, cosy British aesthetic
- Feels like a high-end interiors magazine but approachable and budget-friendly
- Warm off-white background (#FAF7F4) — never pure white
- Accent color: deep terracotta (#C4714A) for buttons, links, and highlights
- Secondary color: dusty rose (#D4A5A0) for subtle accents
- Text color: dark charcoal (#1A1A1A) for body text
- Heading color: deep warm brown (#3D2B1F)
- Surface color: warm cream (#F2EDE8) for cards and boxes

TYPOGRAPHY:
- Headings: Playfair Display — elegant, editorial, British feel
- Body: Lato or Source Sans Pro — clean and readable
- Body font size: 18px minimum
- Line height: 1.8
- Maximum content width: 740px centered

LAYOUT:
- Single column layout — mobile first
- Sticky header with logo center, navigation below (editorial style)
- Hero section on homepage with large featured image + headline overlay
- Blog post page: headline → TL;DR summary box → table of contents → content → FAQ → CTA → related posts
- Sidebar: none — full width content only
- Footer: warm, simple — links, disclosure, copyright

HOMEPAGE SECTIONS (in order):
1. Header with centered logo and navigation
2. Hero: large editorial image with text overlay "Beautiful British Interiors on Any Budget"
3. Featured posts grid (3 cards in warm card style)
4. Category section: Living Room / Bedroom / Kitchen / Room Makeovers
5. Latest posts (6 cards in 2-column grid)
6. About snippet: warm personal intro + photo + link to About page
7. Footer

BLOG POST PAGE STRUCTURE:
1. Breadcrumb: Home > Blog > [Post Title]
2. H1 headline
3. Author name + date published + read time
4. Featured image (full width, 16:9)
5. TL;DR summary box (warm cream background, 2-4 bullet points)
6. Table of contents (collapsible on mobile)
7. Post content (H2/H3 sections, images, lists)
8. FAQ section (accordion style)
9. Affiliate disclosure box
10. Related posts (3 cards)
11. Author bio box with photo

DETAILS:
- All prices in GBP (£)
- Language: en-GB
- British English throughout — colour, cosy, organise, grey, flat, mum, favourite, centre
- Domain signals: .co.uk
- Affiliate disclosure at top of every post: "This post contains affiliate links. If you purchase through my links I may earn a small commission at no extra cost to you."
- No sidebar
- No popup on first visit
- Fast loading — no heavy animations
- Pinterest save button on every image (hover effect)
```

---

## Color Palette Prompt

```
Give me a complete CSS color palette for a UK home interior blog with a warm editorial British aesthetic. Use these exact values:

:root {
  --color-bg: #FAF7F4;
  --color-surface: #F2EDE8;
  --color-primary: #C4714A;
  --color-primary-dark: #A85A36;
  --color-accent: #D4A5A0;
  --color-text: #1A1A1A;
  --color-text-muted: #6B7280;
  --color-heading: #3D2B1F;
  --color-border: #E8E0D8;
  --color-white: #FFFFFF;
}
```

---

## Typography Prompt

```
Set up typography for a UK home interior blog with an editorial British aesthetic. Requirements:
- Import Playfair Display and Lato from Google Fonts
- Headings: Playfair Display Bold, color #3D2B1F
- Body: Lato, 18px, line-height 1.8, color #1A1A1A
- H1: Playfair Display Bold, 2.4rem, color #3D2B1F
- H2: Playfair Display SemiBold, 1.7rem, color #3D2B1F, margin-top 2.5rem
- H3: Lato Bold, 1.3rem, color #3D2B1F, margin-top 2rem
- Links: color #C4714A, underline on hover
- Max content width: 740px, centered with auto margins
- Paragraph margin-bottom: 1.6rem
```

---

## Homepage Hero Prompt

```
Build a hero section for a UK home interior blog with a warm editorial feel.

Content:
- Large background image: cosy British living room — warm tones, layered textures
- Dark semi-transparent overlay (rgba 0,0,0,0.35) over image
- Headline in white Playfair Display: "Beautiful British Interiors on Any Budget"
- Subheadline in white Lato: "Home styling inspiration for UK homes, flats, and Victorian terraces."
- CTA button: "Explore Ideas" — terracotta background, white text, linking to /blog
- Layout: full width image, text centered over it
- Mobile: same treatment, smaller font sizes
- Style: editorial magazine feel — warm, inviting, aspirational but approachable
```

---

## Blog Post Card Prompt

```
Design a blog post card component for a UK home interior blog with a warm editorial style. Requirements:
- Featured image top (16:9 ratio, rounded corners 6px)
- Category tag below image (small pill badge, terracotta background, white text)
- Post title (Playfair Display, H3, deep warm brown, 2 lines max)
- Short excerpt (Lato, 2 lines max, muted grey)
- Read time + date at bottom in small muted text
- Hover effect: slight upward lift with warm shadow
- Background: warm cream (#F2EDE8)
- Mobile: full width card
- Desktop: 2 or 3 column grid
- Warm editorial feel — not corporate or cold
```

---

## TL;DR Summary Box Prompt

```
Create a TL;DR summary box for UK home interior blog posts. Requirements:
- Warm cream background (#F2EDE8)
- Left border: 4px solid #C4714A (terracotta)
- Padding: 20px 24px
- Title: "At a Glance" in Playfair Display bold, deep warm brown
- Content: unordered list of 2-4 bullet points in Lato
- Border radius: 6px
- Margin: 2rem 0
- Mobile friendly — full width
- Feels editorial — not clinical
```

---

## FAQ Section Prompt

```
Build an FAQ accordion section for UK home interior blog posts. Requirements:
- Section title: "Frequently Asked Questions" in Playfair Display H2
- Each question is a clickable accordion item
- Question text: Lato bold, deep warm brown, 1.1rem
- Answer text: Lato normal, muted grey, appears on click
- Open/close icon: + and - on the right side, terracotta color
- Border between items: 1px solid #E8E0D8
- Warm cream background on open items (#F2EDE8)
- Smooth open/close animation
- Schema markup: FAQPage JSON-LD auto-generated from questions array
- Mobile: full width, easy to tap
```

---

## About Page Prompt

```
Build an About page for a UK home interior blog. Structure:
- Hero: author photo (circle, 150px) + name + one-line bio in Playfair Display
- Section: "Why I Started This Blog" — 2-3 short paragraphs, warm and personal
- Section: "What You'll Find Here" — 3 icon cards: Room Makeovers / Budget Styling / British Home Inspiration
- Section: "Let's Connect" — Pinterest link, email contact
- Tone: warm, genuine, British — like talking to a friend who loves interiors
- Use British English throughout: cosy, colour, favourite, flat
- Language: en-GB
- Keep it real — not a corporate bio, personal and relatable
```

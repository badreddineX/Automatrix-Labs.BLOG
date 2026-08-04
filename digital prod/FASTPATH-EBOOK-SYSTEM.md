# The Fast Path to Better Ebooks

> One repeatable system to go from idea → finished PDF + cover in a single workflow, using the tools you already have.

**Your assets in this system:**
```
digital prod/resources/PROMPTS-AND-CODES.md        ← writing prompts (titles, outlines, chapters)
digital prod/resources/ebook-pdf-builder/          ← Markdown → premium PDF pipeline (build.mjs, build-all.mjs)
digital prod/COVER-PROMPT-TEMPLATE.md              ← creative cover design system
digital prod/COVER-PROMPTS.md                      ← copy-paste cover prompts for your 12 books
digital prod/CAD dig prod/DIG PROD/…               ← source Product Content.md files (the books)
digital prod/UK dig prod/DIG PROD/…                ← source Product Content.md files (the books)
```

---

## The 7-Step Loop (2–3 hours per new ebook)

### STEP 1 — Pick the outcome (5 min)
Every good ebook sells **one transformation**. Write it as a before → after:

> **Before:** [frustration] → **After:** [result, with a number]

Example: *"Your kitchen is the hardest-working room and the most cluttered"* → *"Double your cabinet space in one afternoon, $0, no drilling."*

If you can't write the after-line with a number in it, sharpen the idea first. Numbers are what make the cover, the pitch, and the PDF feel valuable.

### STEP 2 — Title (10 min)
Use the title prompt in `PROMPTS-AND-CODES.md` but force the outcome:

> I'm writing an ebook about **[topic]**. Give me 10 titles (3–5 words) that: include the main keyword, promise the result, are easy to say, and would look strong on a cover. Mark which suits a casual vs professional tone.

**Pick by the cover test:** would this title make sense at 200×200px on a sales page? If not, shorten it.

### STEP 3 — Outline (30 min)
Use the outline prompt, but force your proven structure — your existing books use **12 chapters**, each with a chapter hook, "why this matters", and a mini-summary. Reuse it:

> Create a detailed outline for an ebook titled "[TITLE]". Use 12 chapters. Each chapter: title, chapter hook (3–4 sentences), 3–5 subheadings (each 1-sentence summary), and a mini-summary line. The book is for **[audience]** who want **[outcome]**. Put the highest-impact chapter first (Chapter 1 must deliver a win in the first 10 minutes of reading).

**Better-ebook rule:** Chapter 1 gives an immediate win. Chapters 2–5 build on it. Chapter 12 is always the "make it stick" chapter (maintenance, checklist, recap).

### STEP 4 — Draft the chapters (60–90 min)
Feed the outline to your model chapter by chapter with the chapter-drafting prompt:

> Write chapter [N]: "[chapter title]" for the ebook "[TITLE]" by [BRAND]. Audience: [audience]. Outcome: [outcome]. Structure: intro hook (2–3 sentences), the core method with numbered steps or clear sections, a real-world example or "what happens if you skip this", answers to the most common objection, and a mini-summary at the end. Use short paragraphs, bullet lists, and "you" language. Include at least one callout: "One thing to try today:" and one short pull-quote-style memorable line. Target ~[700–900] words.

**That markdown markup matters — the PDF builder turns these into designed blocks automatically:**

| Write this in Markdown | It becomes in the PDF |
|---|---|
| `**One thing to try today:**` + a list | Tip box (green edge) |
| `**Mini-summary:** ...` | Summary box (gold edge) |
| A quote `"30+ characters in quotes"` on its own line | Pull quote |
| `- [ ]` / `- [x]` list items | Printable checkboxes |
| `## Chapter 1: Title` | Auto chapter divider page |
| Bullets + short paragraphs | Styled prose, no further work |

So write with those markers and the PDF instantly looks professionally designed.

### STEP 5 — Assemble the Product Content.md (15 min)
Your `build.mjs` expects this exact structure:

```markdown
# The Book Title

*A subtitle that promises the result*

**Format:** Premium PDF with magazine-style layout
**Price:** $9 CAD / £7 GBP
**Audience:** [who this is for]

**What's included:**
- The 12-chapter [system]
- **Bonus:** [bonus 1]
- **Bonus:** [bonus 2]

**Guarantee:** If this doesn't help, email hello@[brand].com within 30 days for a full refund.

---

## How to Use This Kit
...

## Introduction
...

## Chapter 1: [Title]
...
## Chapter 2: [Title]
...

## [Bonus / Checklist / Any final section]
...

## License
...
```

**3 rules that prevent broken builds:**
1. `# Title` is the FIRST line; the italic `*Subtitle*` is the SECOND.
2. One `---` after the metadata block — the builder slices everything before the first `---` as internal metadata (never shown to customers).
3. Every chapter heading must literally start `## Chapter 1:`, `## Chapter 2:`, etc. That's what generates the divider pages, TOC, and page numbers.

**Save it to:**
- Canada → `digital prod/CAD dig prod/DIG PROD/NN-<slug>/Product Content.md`
- UK → `digital prod/UK dig prod/DIG PROD/NN-<slug>/Product Content.md`

### STEP 6 — Generate the cover (30 min)
Two options from your own files:

- **Fast:** pick the layout archetype + metaphor + accent from `COVER-PROMPT-TEMPLATE.md`, fill the master prompt, paste into GPT-4o image. Copy the full text block (kicker, title, subtitle, 4 benefit lines with numbers, anchor banner) right into the prompt — GPT-4o renders it.
- **Instant:** if the new book fits one of your 12 existing ones, adapt the matching prompt in `COVER-PROMPTS.md`.

**The cover checklist (30 seconds):**
- [ ] One bold creative idea (metaphor/accent), not five
- [ ] Promise visible in the scene without reading the title
- [ ] Benefit lines carry real numbers (12 methods, £150, 60 min, 5 sizes)
- [ ] Anchor line compares to the expensive alternative
- [ ] Back cover: value stack + proof + guarantee + URL
- [ ] 1600×1600px, 1:1, 300 DPI PNG

Save to the brand's `Fourthwall/covers/` folder.

### STEP 7 — Build & verify (15 min)
```bash
cd "digital prod/resources/ebook-pdf-builder"
node build.mjs "../../CAD dig prod/DIG PROD/01-your-book/Product Content.md" cad "./output/Your Book.pdf" "../../CAD dig prod/Fourthwall/covers/your-cover.png"
```

For all books at once:
```bash
node build-all.mjs
```

Then verify:
```bash
node check-pdf.mjs "./output/Your Book.pdf"
```

**Acceptance bar — a book is done when:**
- [ ] ≥ 25 pages (your range is 28–53; under 25 feels thin)
- [ ] Chapter dividers + TOC page numbers + folios all present (the build log prints `toc=12/12 folios=N`)
- [ ] Cover used as the PDF cover + chapter-divider motif
- [ ] Mini-summaries, tip boxes, and checklists render (spot-check a few pages)
- [ ] Back-matter sections (License, Checklist) sit after the last chapter

---

## Why This Is the Fast Path

| Work | Old way | This system |
|---|---|---|
| Writing | From scratch, no structure | Proven 12-chapter prompts + reusable callouts |
| Design | Manual layout | `build.mjs` auto-designs (typography, TOC, dividers, callouts, folios) |
| Covers | Per-book guesswork | Template system + copy-paste prompts |
| Build | Manual | One command per book or one for all 10 |
| QA | Visual guesswork | `check-pdf.mjs` + build log |

## Make It *Better* — The 3 Upgrades That Cost Nothing

1. **Write the after-line with a number first** — every other step (title, outline, cover, copy) inherits the exact promise. This alone raises perceived value across all 12 products.
2. **Chapter 1 = instant win** — readers who finish chapter 1 feeling successful finish the book. It also gives you a free "sneak peek" clip for Pinterest/social.
3. **Reuse interactive blocks in every book** — the builder already styles self-assessment quizzes, action blocks, decision flows, before/after, budget picks, skip-this notes, and completion moments. Sprinkling 2–3 of these per chapter makes a 30-page book feel like a 60-page course.
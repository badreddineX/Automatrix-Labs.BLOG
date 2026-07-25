# Digital Product Prompts & Code Snippets

Reusable prompt templates and code snippets for building/selling digital products
(ebooks, courses, audiobooks) across the CAD/UK ventures. Sourced from a "Nid Academy"
resource pack (YouTube: @Nid.Academy, Instagram: nidacademy_) — background reference
material, not an active partnership.

---

## Hostinger AI Website Builder

Prompt to feed the Hostinger AI builder when spinning up a new site:

> Describe your project or brand in a few sentences for hostinger AI builder,
> brand name ( Your brand name ) and i will be selling ( Your Product Type )

---

## Checkout / Buy-Now Links

**WooCommerce — direct-to-cart link** (skips product page):
```
https://yourdomain.com/checkout/?add-to-cart=PRODUCT_ID
```

**WooCommerce — hide the cart page, redirect straight to checkout:**
Install the "Code Snippets" plugin, add:
```php
add_filter('woocommerce_add_to_cart_redirect', 'skip_cart_redirect_to_checkout');
function skip_cart_redirect_to_checkout() {
   return wc_get_checkout_url();
}
```

**Gumroad — direct "buy now" overlay link:**
```
https://gumroad.com/l/your-product-id?wanted=true
```

---

## Ebook Landing Page Template

`digital prod/resources/ebook-landing-page-template.json` — an Elementor (WordPress
page builder) JSON template for an ebook sales/landing page. Structure: title + author +
cover image + description (hero), gallery of interior page previews, "What will you
learn from this book?" section with bullet highlights, "What's inside" chapter list with
a buy-now CTA, closing "What are you waiting for?" section. All placeholder text/images
— import into Elementor and replace. Only useful if a site ever moves to
WordPress/Elementor; current sites are Astro, so not directly applicable unless that changes.

---

## Ebook Writing Prompts

**Title generation:**
> I'm writing a book about [insert topic]. Please suggest 10 short, punchy book titles
> (3 to 5 words) that: – Include the main keyword related to the topic – Are easy to
> remember and say – Use strong, positive, or emotional words – Are optimized for Amazon
> search and stand out on covers. Also, mention which titles suit a casual tone and which
> suit a professional tone.

**Outline generation:**
> Create a detailed outline for an eBook titled "[your working title]". Include:
> Chapter titles (5–8 chapters), 2–4 subheadings per chapter, a 1-sentence summary of
> what each subheading will cover.

**Chapter drafting:**
> Write a ~500-word section on "[subheading text]" from the outline. Include: a brief
> intro hook, 2–3 actionable tips or examples, a mini-summary at the end.

**Formatting existing content:**
> I will provide you with ebook content and I want you to format it depending on
> section: [ebook content]

---

## Audiobook / Book Summary Script Prompt

For turning a book into a spoken-word summary script (e.g. for a YouTube/audio channel):

> I want you to act as a voiceover scriptwriter for an educational audiobook. Summarize
> the book titled "[book title]" by [Author name] into a spoken audio script that sounds
> clear, natural, and engaging when read aloud. The summary should be around [X] minutes
> long (e.g., 5, 15, or 60 minutes), written in a conversational tone (as if a friendly
> narrator is explaining the book). Structure the summary into short sections with
> mini-titles if necessary, use examples and metaphors where helpful, and make sure it
> flows smoothly. Avoid technical or academic language — aim for clarity, storytelling,
> and usefulness. End with a short wrap-up that reminds the listener of the core message
> or lessons.

Follow-up prompt for the intro: "write an introduction before starting the script"

Reference channel/examples: youtube.com/@SafahatMasmoua (Arabic book-summary channel,
Atomic Habits / The Power of Habit / Deep Work summary videos as format examples).

---

## Course Creation Prompts

**Topic & audience definition:**
> I want to create an online course about [your topic]. Suggest the best possible course
> angles, subtopics, and variations. Also, define the ideal target audience
> (beginner/intermediate/advanced), their pain points, and what outcome they want. In a table

**Full outline (modules & lessons):**
> Create a full course outline for a [beginner/intermediate/advanced] level course on
> [your topic]. Include module titles and the lessons under each. Each lesson should have
> a clear goal and outcome.

**Generic curriculum shape** (from the Arabic course-curriculum template) — a reusable
4-module skeleton for any course topic:
1. **Intro & fundamentals** — why this field matters now, what you'll learn, key
   terms/concepts, tools/skills overview
2. **Required tools & how to use them** — environment setup, design/editing/coding tools
   for the field, step-by-step main-tool walkthrough, time-saving tips
3. **Practical skills & application** — first simple hands-on project, applying the core
   skill in a real scenario, common mistakes to avoid, improving quality/professionalism
4. **Capstone project** — final project brief, execution steps (practical segments), how
   to self-evaluate or get feedback, what to do after the course (how to invest the skill)

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { marked } from "marked";
import { chromium } from "playwright";

// Usage: node build.mjs "<path to Product Content.md>" <cad|uk> "<output.pdf path>" ["<cover image path>"]
const [, , inputPath, brand, outputPath, coverImagePath] = process.argv;
if (!inputPath || !brand || !outputPath) {
  console.error('Usage: node build.mjs "<Product Content.md>" <cad|uk> "<output.pdf>" ["<cover.png>"]');
  process.exit(1);
}

const BRANDS = {
  cad: {
    bg: "#FAFAF7",
    surface: "#FFFFFF",
    primary: "#8FAF8A",
    primaryDark: "#6B8F66",
    accent: "#C4A882",
    accentDark: "#8B6F47",
    ink: "#1C1917",
    body: "#292524",
    border: "#E5DDD3",
    displayFont: "'Playfair Display', Georgia, serif",
    bodyFont: "'Inter', -apple-system, sans-serif",
    site: "smallspacehome.ca",
  },
  uk: {
    bg: "#F3F4EF",
    surface: "#FFFFFF",
    primary: "#5B7A48",
    primaryDark: "#47612F",
    accent: "#B89A6A",
    accentDark: "#9FB88A",
    ink: "#1A2318",
    body: "#1E2420",
    border: "#D4D6CC",
    displayFont: "'Playfair Display', Georgia, serif",
    bodyFont: "'Lato', -apple-system, sans-serif",
    site: "britishhomeinterior.co.uk",
  },
};

const B = BRANDS[brand];
if (!B) {
  console.error(`Unknown brand "${brand}" -- use "cad" or "uk"`);
  process.exit(1);
}

const absCoverPath = coverImagePath ? resolve(coverImagePath) : null;
if (absCoverPath && !existsSync(absCoverPath)) {
  console.error(`Cover image not found: ${absCoverPath}`);
  process.exit(1);
}

const raw = readFileSync(inputPath, "utf8");

// --- Parse the fixed header block ---
const titleMatch = raw.match(/^#\s+(.+)$/m);
const subtitleMatch = raw.match(/^\*(.+)\*$/m);
const priceMatch = raw.match(/\*\*Price:\*\*\s*(.+)$/m);
const title = titleMatch ? titleMatch[1].trim() : "Untitled";
const subtitle = subtitleMatch ? subtitleMatch[1].trim() : "";
const price = priceMatch ? priceMatch[1].trim() : "";

let body = raw.replace(/^#\s+.+\n+\*.+\*\n+(\*\*.+\*\*\s*\n+)+---\n+/m, "");

function extractSection(text, heading) {
  const re = new RegExp(`##\\s+${heading}\\s*\\n([\\s\\S]*?)(?=\\n##\\s+|$)`, "i");
  const m = text.match(re);
  return m ? m[1].trim() : null;
}

const license = extractSection(body, "License & Usage");
const disclaimer = extractSection(body, "Disclaimer");
const howto = extractSection(body, "How to Use This Kit");

const chapterStart = body.search(/##\s+Chapter\s+1/i);
const mainContent = chapterStart >= 0 ? body.slice(chapterStart) : body;

function mdToHtml(md) {
  return marked.parse(md, { headerIds: false, mangle: false });
}

// --- Post-process rendered HTML: wrap "N tips/rules:" blocks and mini-summaries
//     in styled callout boxes with an icon, since marked has no concept of these. ---
function styleCallouts(html) {
  html = html.replace(
    /<p><strong>((?:One|Two|Three|Four|Five)\b[^<]*:)<\/strong>\s*<\/p>\s*(<[ou]l>[\s\S]*?<\/[ou]l>)/gi,
    (_m, label, list) =>
      `<div class="tip-box"><p class="tip-box-label"><span class="callout-icon">&#9670;</span><span>${label}</span></p>${list}</div>`
  );

  html = html.replace(
    /<p><strong>Mini-summary:<\/strong>([\s\S]*?)<\/p>/gi,
    (_m, rest) =>
      `<div class="summary-box"><p class="summary-box-label"><span class="callout-icon">&#10003;</span><span>Mini-summary</span></p><p>${rest.trim()}</p></div>`
  );

  return html;
}

// --- Split main content into chapters (for divider-page treatment) vs.
//     trailing utility sections (checklist/tracker -- no divider page).
//     Splits on EVERY top-level "## " heading, not just "## Chapter N" --
//     a book can have multiple trailing utility sections (e.g. a "Summary"
//     heading AND a separately-appended "Printable Checklist" heading), and
//     each needs to be its own block or it silently merges into whichever
//     chapter precedes it. ---
function splitChapters(text) {
  const parts = text.split(/(?=^## )/m);
  return parts.filter(Boolean);
}

function firstQuotableSentence(md) {
  const plain = md
    .replace(/^###.*$/gm, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/[-#>]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  const sentences = plain.match(/[^.!?]+[.!?]/g) || [];
  const good = sentences.find(s => s.trim().length > 40 && s.trim().length < 140);
  return (good || sentences[0] || "").trim();
}

const chapterBlocks = splitChapters(mainContent);
const chapterCount = chapterBlocks.filter(b => /^## Chapter/.test(b)).length;

let chapterIndex = 0;
const chapterPagesHtml = chapterBlocks.map(block => {
  const headingMatch = block.match(/^## Chapter (\d+):\s*(.+)$/m);
  if (!headingMatch) {
    // Trailing utility section (Printable Checklist, Reset Tracker, etc.)
    const utilTitle = block.match(/^##\s+(.+)$/m)?.[1] ?? "";
    const utilBody = block.replace(/^##\s+.+$/m, "").trim();
    return `<div class="page content">
      <h2 class="util-heading">${utilTitle}</h2>
      <div class="content-body checklist-body">${styleCallouts(mdToHtml(utilBody))}</div>
      <div class="footer"><span>${title}</span><span>&nbsp;</span></div>
    </div>`;
  }

  chapterIndex++;
  const chNum = headingMatch[1];
  const chTitle = headingMatch[2];
  const chBody = block.replace(/^## Chapter \d+:.*$/m, "").trim();
  const quote = firstQuotableSentence(chBody);

  const dividerPage = `<div class="page chapter-divider">
    ${absCoverPath ? `<img class="divider-motif" src="file:///${absCoverPath.replace(/\\/g, "/")}" alt="">` : ""}
    <div class="divider-inner">
      <div class="divider-number">${String(chNum).padStart(2, "0")}</div>
      <div class="divider-rule"></div>
      <div class="divider-progress">Chapter ${chNum} of ${chapterCount}</div>
      <h2 class="divider-title">${chTitle}</h2>
      ${quote ? `<p class="divider-quote">&ldquo;${quote}&rdquo;</p>` : ""}
    </div>
    <div class="footer"><span>${title}</span><span>&nbsp;</span></div>
  </div>`;

  const contentPage = `<div class="page content">
    <div class="chapter-kicker">Chapter ${chNum}</div>
    <div class="content-body">${styleCallouts(mdToHtml(chBody))}</div>
    <div class="footer"><span>${title}</span><span>&nbsp;</span></div>
  </div>`;

  return dividerPage + contentPage;
}).join("\n");

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${title}</title>
<style>
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: ${B.bodyFont};
    color: ${B.body};
    font-size: 11pt;
    line-height: 1.65;
  }
  .page {
    width: 210mm;
    min-height: 297mm;
    padding: 22mm 20mm 24mm;
    position: relative;
    background: ${B.surface};
    page-break-after: always;
  }
  .page:last-child { page-break-after: avoid; }

  /* ===== Cover ===== */
  .cover { background: ${B.bg}; display: flex; flex-direction: column; padding: 0; }
  .cover .cover-art { width: 100%; height: 160mm; object-fit: cover; display: block; }
  .cover .cover-text {
    flex: 1; display: flex; flex-direction: column; justify-content: center;
    align-items: center; text-align: center; padding: 12mm 25mm 20mm;
  }
  .cover .eyebrow {
    font-size: 9pt; letter-spacing: 0.16em; text-transform: uppercase;
    color: ${B.accentDark}; margin-bottom: 6mm;
  }
  .cover h1 {
    font-family: ${B.displayFont}; font-size: 27pt; font-weight: 700;
    color: ${B.ink}; line-height: 1.15; margin: 0 0 6mm;
  }
  .cover .subtitle {
    font-family: ${B.displayFont}; font-style: italic; font-size: 12pt;
    color: ${B.body}; max-width: 130mm; margin: 0 0 8mm;
  }
  .cover .rule { width: 20mm; height: 2px; background: ${B.accent}; margin-bottom: 6mm; }
  .cover .price { font-size: 10pt; color: ${B.accentDark}; letter-spacing: 0.08em; }
  .cover .site { font-size: 8.5pt; color: ${B.body}; opacity: 0.55; margin-top: 5mm; }
  .cover.no-image .cover-text { justify-content: center; padding-top: 30mm; }

  /* ===== Front-matter page ===== */
  .frontmatter h2 { font-family: ${B.displayFont}; font-size: 14pt; color: ${B.ink}; margin: 0 0 4mm; }
  .frontmatter section { margin-bottom: 11mm; }
  .frontmatter section:first-child h2 { margin-top: 0; }
  .frontmatter p { margin: 0 0 4mm; font-size: 10pt; color: ${B.body}; }

  /* ===== Chapter divider page ===== */
  .chapter-divider {
    background: ${B.bg};
    display: flex; align-items: center; justify-content: center;
    overflow: hidden;
  }
  .divider-motif {
    position: absolute;
    width: 90mm; height: 90mm;
    object-fit: cover;
    border-radius: 50%;
    opacity: 0.16;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    filter: grayscale(20%);
  }
  .divider-inner { position: relative; text-align: center; max-width: 130mm; z-index: 1; }
  .divider-number {
    font-family: ${B.displayFont}; font-size: 52pt; font-weight: 700;
    color: ${B.accent}; line-height: 1; opacity: 0.7;
  }
  .divider-rule { width: 14mm; height: 2px; background: ${B.primary}; margin: 6mm auto; }
  .divider-progress {
    font-size: 8.5pt; letter-spacing: 0.12em; text-transform: uppercase;
    color: ${B.accentDark}; margin-bottom: 4mm;
  }
  .divider-title {
    font-family: ${B.displayFont}; font-size: 23pt; font-weight: 700; font-style: italic;
    color: ${B.ink}; line-height: 1.2; margin: 0 0 8mm;
  }
  .divider-quote {
    font-family: ${B.displayFont}; font-style: italic; font-size: 12.5pt;
    color: ${B.primaryDark}; line-height: 1.5;
  }

  /* ===== Content pages ===== */
  .chapter-kicker {
    font-size: 8.5pt; letter-spacing: 0.12em; text-transform: uppercase;
    color: ${B.accentDark}; border-bottom: 2px solid ${B.accent};
    padding-bottom: 4mm; margin-bottom: 8mm;
  }
  .util-heading {
    font-family: ${B.displayFont}; font-size: 20pt; font-weight: 700; font-style: italic;
    color: ${B.ink}; margin: 0 0 6mm; padding-bottom: 3mm; border-bottom: 2px solid ${B.accent};
  }
  /* Checklist/tracker pages: denser than prose on purpose -- these are
     scan-and-tick lists, not reading material, and every book's checklist
     is meant to fit one printable page. Tighter rhythm reclaims the couple
     lines of space that were otherwise spilling a near-empty extra page. */
  .checklist-body { line-height: 1.35; }
  .checklist-body p { margin: 0 0 2.5mm; }
  .checklist-body ul, .checklist-body ol { margin: 0 0 2.5mm; }
  .checklist-body li { margin-bottom: 0.8mm; }
  .checklist-body h3 { margin: 5mm 0 2mm; font-size: 12.5pt; }
  .content-body { max-width: 138mm; margin: 0 auto; }
  .content-body h3 {
    font-family: ${B.displayFont}; font-size: 13.5pt; font-weight: 700;
    color: ${B.primaryDark}; margin: 9mm 0 3mm;
  }
  .content-body p { margin: 0 0 3.5mm; text-align: left; }
  .content-body ol, .content-body ul { margin: 0 0 3.5mm; padding-left: 5mm; }
  .content-body li { margin-bottom: 1.5mm; }
  .content-body strong { color: ${B.ink}; }
  .content-body hr { border: none; border-top: 1px solid ${B.border}; margin: 6mm 0; }

  /* Callout boxes */
  .tip-box, .summary-box {
    background: ${B.bg};
    border-left: 3px solid ${B.primary};
    border-radius: 0 3px 3px 0;
    margin: 5mm 0;
    padding: 4mm 5mm 4mm 5mm;
  }
  .summary-box { border-left-color: ${B.accent}; }
  .tip-box-label, .summary-box-label {
    display: flex; align-items: center; gap: 2mm;
    font-family: ${B.displayFont}; font-weight: 700; font-style: italic;
    font-size: 10.5pt; color: ${B.primaryDark};
    margin: 0 0 2mm !important;
  }
  .summary-box-label { color: ${B.accentDark}; }
  .callout-icon { font-size: 10pt; flex-shrink: 0; font-style: normal; }
  .tip-box ol, .tip-box ul { margin: 0 !important; padding-left: 4.5mm; }
  .tip-box li { margin-bottom: 1mm; }
  .summary-box p:last-child { margin: 0; font-size: 10.5pt; }

  /* Checklist checkboxes -- these products are print-first ("tear out or
     print this page"), so a clean visual box for pen/pencil ticking is the
     right design, not a fragile clickable AcroForm field. */
  .content-body input[type="checkbox"] {
    appearance: none; width: 3.6mm; height: 3.6mm;
    border: 1.3pt solid ${B.primaryDark}; border-radius: 1px;
    margin-right: 2.5mm; vertical-align: middle; position: relative; top: -0.3mm;
  }
  .content-body li:has(input[type="checkbox"]) { list-style: none; margin-left: -5mm; }

  .content-body table { width: 100%; border-collapse: collapse; margin: 4mm 0 6mm; font-size: 9.5pt; }
  .content-body th, .content-body td { border: 1px solid ${B.border}; padding: 2.2mm 2mm; text-align: center; }
  .content-body th { background: ${B.bg}; font-weight: 700; color: ${B.ink}; }
  .content-body td:first-child, .content-body th:first-child { text-align: left; }

  .footer {
    position: absolute; bottom: 10mm; left: 20mm; right: 20mm;
    display: flex; justify-content: space-between;
    font-size: 8pt; color: ${B.body}; opacity: 0.55;
  }
</style>
</head>
<body>

  <div class="page cover${absCoverPath ? "" : " no-image"}">
    ${absCoverPath ? `<img class="cover-art" src="file:///${absCoverPath.replace(/\\/g, "/")}" alt="">` : ""}
    <div class="cover-text">
      <div class="eyebrow">${B.site}</div>
      <h1>${title}</h1>
      <p class="subtitle">${subtitle}</p>
      <div class="rule"></div>
      <div class="price">${price}</div>
      <div class="site">${B.site}</div>
    </div>
  </div>

  ${(license || disclaimer || howto) ? `<div class="page frontmatter">
    ${license ? `<section><h2>License &amp; Usage</h2>${mdToHtml(license)}</section>` : ""}
    ${disclaimer ? `<section><h2>Disclaimer</h2>${mdToHtml(disclaimer)}</section>` : ""}
    ${howto ? `<section><h2>How to Use This Kit</h2>${mdToHtml(howto)}</section>` : ""}
    <div class="footer"><span>${title}</span><span>2</span></div>
  </div>` : ""}

  ${chapterPagesHtml}

</body>
</html>`;

const tmpHtmlPath = outputPath.replace(/\.pdf$/, ".build.html");
writeFileSync(tmpHtmlPath, html, "utf8");

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(`file:///${tmpHtmlPath.replace(/\\/g, "/")}`, { waitUntil: "networkidle" });
await page.pdf({
  path: outputPath,
  format: "A4",
  printBackground: true,
  margin: { top: "0", bottom: "0", left: "0", right: "0" },
});
await browser.close();

console.log(`Built: ${outputPath}`);

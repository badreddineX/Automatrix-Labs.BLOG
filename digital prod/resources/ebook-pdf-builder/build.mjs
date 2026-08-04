import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { marked } from "marked";
import { chromium } from "playwright";
import QRCode from "qrcode";
import { PDFDocument, PDFName, PDFArray, PDFRef, StandardFonts, rgb } from "pdf-lib";

// Usage: node build.mjs "<path to Product Content.md>" <cad|uk> "<output.pdf path>" ["<cover image path>"]
const [, , inputPath, brand, outputPath, coverImagePath] = process.argv;
if (!inputPath || !brand || !outputPath) {
  console.error('Usage: node build.mjs "<Product Content.md>" <cad|uk> "<output.pdf>" ["<cover.png>"]');
  process.exit(1);
}

// ============================================================
// FONTS — embedded as base64 data URIs.
// A font merely *named* in CSS silently falls back to a system face under
// Chromium's file:// print pipeline, which is why the intended typography never
// rendered before. Embedding the actual files is the only reliable fix.
// ============================================================
function fontDataUri(pkgPath) {
  const abs = resolve(`./node_modules/${pkgPath}`);
  if (!existsSync(abs)) {
    console.warn(`[warn] font missing: ${pkgPath} — falling back to a system face.`);
    return null;
  }
  return `data:font/woff2;base64,${readFileSync(abs).toString("base64")}`;
}

const F = {
  displayRegular: fontDataUri("@fontsource/lora/files/lora-latin-400-normal.woff2"),
  displayBold: fontDataUri("@fontsource/lora/files/lora-latin-700-normal.woff2"),
  displayItalic: fontDataUri("@fontsource/lora/files/lora-latin-400-italic.woff2"),
  displayBoldItalic: fontDataUri("@fontsource/lora/files/lora-latin-700-italic.woff2"),
  bodyRegular: fontDataUri("@fontsource/inter/files/inter-latin-400-normal.woff2"),
  bodyBold: fontDataUri("@fontsource/inter/files/inter-latin-700-normal.woff2"),
};

const fontFaceCss = [
  F.displayRegular && `@font-face{font-family:'BookDisplay';font-style:normal;font-weight:400;src:url(${F.displayRegular}) format('woff2');}`,
  F.displayBold && `@font-face{font-family:'BookDisplay';font-style:normal;font-weight:700;src:url(${F.displayBold}) format('woff2');}`,
  F.displayItalic && `@font-face{font-family:'BookDisplay';font-style:italic;font-weight:400;src:url(${F.displayItalic}) format('woff2');}`,
  F.displayBoldItalic && `@font-face{font-family:'BookDisplay';font-style:italic;font-weight:700;src:url(${F.displayBoldItalic}) format('woff2');}`,
  F.bodyRegular && `@font-face{font-family:'BookBody';font-style:normal;font-weight:400;src:url(${F.bodyRegular}) format('woff2');}`,
  F.bodyBold && `@font-face{font-family:'BookBody';font-style:normal;font-weight:700;src:url(${F.bodyBold}) format('woff2');}`,
].filter(Boolean).join("\n");

// ============================================================
// THEME — "Warm Editorial".
// Soft paper ground, sage + tan accents, Playfair display over Inter body.
// Every page sits on paper; colour is reserved for rules, callout edges and
// small labels, never behind running text.
// ============================================================
const TYPE = {
  displayFont: "'BookDisplay', Georgia, 'Times New Roman', serif",
  bodyFont: "'BookBody', 'Segoe UI', system-ui, sans-serif",
};

const BRANDS = {
  cad: {
    ...TYPE,
    paper: "#FAFAF7", surface: "#FFFFFF",
    primary: "#8FAF8A", primaryDark: "#5E8259",
    accent: "#C4A882", accentDark: "#8B6F47",
    accent2: "#7B92A8", accent2Dark: "#4F6580",
    accent3: "#C97B63",
    ink: "#1C1917", body: "#33302B", muted: "#7A736A", border: "#E5DDD3",
    pageFormat: "Letter", pageWidth: "215.9mm", pageHeight: "279.4mm",
    site: "smallspacehome.ca", siteUrl: "https://smallspacehome.ca", brandName: "Small Space Home",
    authorBio: {
      name: "The SmallSpaceHome Team", tagline: "Small-space specialists helping Canadians love where they live.",
      body: "SmallSpaceHome.ca is Canada's trusted resource for apartment and small-home living. We help renters and small-space dwellers make the most of every square foot — without sacrificing style, comfort, or their security deposit. Our guides are researched, tested, and written by people who live in small spaces themselves.",
      cta: "Visit us at <strong>smallspacehome.ca</strong> for more guides, tools, and inspiration.",
    },
  },
  uk: {
    ...TYPE,
    paper: "#F5F5F0", surface: "#FFFFFF",
    primary: "#7C9463", primaryDark: "#4A6337",
    accent: "#B89A6A", accentDark: "#856437",
    accent2: "#6B8CA6", accent2Dark: "#3F5A70",
    accent3: "#B8654A",
    ink: "#1A2318", body: "#2B302A", muted: "#767B70", border: "#DCDCD2",
    pageFormat: "A4", pageWidth: "210mm", pageHeight: "297mm",
    site: "britishhomeinterior.co.uk", siteUrl: "https://britishhomeinterior.co.uk", brandName: "British Home Interior",
    authorBio: {
      name: "The British Home Interior Team", tagline: "UK rental living experts helping you love where you live.",
      body: "BritishHomeInterior.co.uk is the UK's trusted resource for rental living. We help flat and house renters across the UK make their spaces beautiful, functional, and personal — without expensive renovations or risking their deposit. Every guide is written by people who understand the unique challenges of UK rental properties.",
      cta: "Visit us at <strong>britishhomeinterior.co.uk</strong> for more guides, tools, and inspiration.",
    },
  },
};

const B = BRANDS[brand];
if (!B) { console.error(`Unknown brand "${brand}" -- use "cad" or "uk"`); process.exit(1); }

const absCoverPath = (coverImagePath && coverImagePath.trim()) ? resolve(coverImagePath.trim()) : null;
if (absCoverPath && !existsSync(absCoverPath)) { console.error(`Cover image not found: ${absCoverPath}`); process.exit(1); }
const coverUrl = absCoverPath ? `file:///${absCoverPath.replace(/\\/g, "/")}` : null;

// QR code for the author page — links the printed book to the live brand site.
let qrDataUrl = null;
try {
  qrDataUrl = await QRCode.toDataURL(B.siteUrl, { width: 256, margin: 0, color: { dark: B.ink, light: "#FFFFFF" } });
} catch { qrDataUrl = null; }

// Normalise line endings first. The source files are CRLF, which silently broke
// the header-strip below (its `\n+` could never match `\r\n`), leaking the internal
// "Format / Price / Audience" listing block onto page 2 of every book.
const raw = readFileSync(inputPath, "utf8").replace(/\r\n/g, "\n");
const title = raw.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? "Untitled";
const subtitle = raw.match(/^\*(.+)\*$/m)?.[1]?.trim() ?? "";
const price = raw.match(/\*\*Price:\*\*\s*(.+)$/m)?.[1]?.trim() ?? "";
const guarantee = raw.match(/\*\*Guarantee:\*\*\s*(.+)$/m)?.[1]?.trim() ?? "";
const bonuses = (raw.match(/\*\*Bonus:\*\*\s*(.+)$/gm) || [])
  .slice(0, 3)
  .map(s => s.replace(/^\*\*Bonus:\*\*\s*/, "").trim());
const coverBadgesHtml = bonuses.length
  ? `<div class="cover-badges">${bonuses.map(b => `<span class="cover-badge">+ ${b}</span>`).join("")}</div>`
  : "";

// Drop the listing header (title, subtitle, "Format / Price / Audience") that sits
// above the first horizontal rule. That block is internal product-listing metadata
// — it must never reach a customer. The previous pattern assumed each metadata line
// was entirely bold, but they read "**Price:** $9 CAD", so it never matched and the
// block printed on page 2 of every book.
const body = (() => {
  const hr = raw.search(/^---\s*$/m);
  const firstH2 = raw.search(/^##\s/m);
  if (hr >= 0 && (firstH2 < 0 || hr < firstH2)) {
    return raw.slice(hr).replace(/^---\s*\n+/, "");
  }
  return raw;
})();

const mdToHtml = md => marked.parse(md, { headerIds: false, mangle: false });
const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// ============================================================
// PARSE — split into ordered blocks by H2.
// Front matter is whatever precedes the first chapter heading.
// Everything after the last chapter is back matter.
// ============================================================
const frontMatter = [], chapters = [], backMatter = [];
let seenChapter = false;

for (const block of body.split(/(?=^## )/m).filter(b => b.trim())) {
  const heading = block.match(/^##\s+(.+)$/m)?.[1]?.trim() ?? "";
  const content = block.replace(/^##\s+.+$/m, "").trim();
  const ch = heading.match(/^Chapter\s+(\d+):\s*(.+)$/i);
  if (ch) {
    seenChapter = true;
    chapters.push({ num: ch[1], title: ch[2].trim(), content });
  } else if (!seenChapter) {
    if (heading || content) frontMatter.push({ heading, content, id: heading ? `sec-${slug(heading)}` : null });
  } else {
    backMatter.push({ heading, content, id: `sec-${slug(heading)}` });
  }
}
const chapterCount = chapters.length;

function styleCallouts(html) {
  html = html.replace(
    /<p><strong>((?:One|Two|Three|Four|Five)\b[^<]*:)<\/strong>\s*<\/p>\s*(<[ou]l>[\s\S]*?<\/[ou]l>)/gi,
    (_m, label, list) => `<div class="tip-box"><p class="tip-label"><span class="tip-mark">&#9670;</span>${label}</p>${list}</div>`
  );
  html = html.replace(
    /<p><strong>Mini-summary:<\/strong>([\s\S]*?)<\/p>/gi,
    (_m, rest) => `<div class="summary-box"><p class="summary-label">Mini-summary</p><p>${rest.trim()}</p></div>`
  );
  html = html.replace(
    /<p>[“"]([^”"]{30,})[”"]<\/p>/gi,
    (_m, q) => `<div class="pull-quote"><p>${q}</p></div>`
  );
  // GFM task lists -> printable boxes. The checked variant must be handled first:
  // its markup also satisfies the unchecked pattern, so the looser rule would
  // otherwise swallow it and every box would print empty.
  html = html.replace(
    /<li><input checked(?:="")? disabled(?:="")? type="checkbox"[^>]*>\s*/g,
    '<li class="cb-item"><span class="cb-box cb-on"></span>'
  );
  html = html.replace(
    /<li><input disabled(?:="")? type="checkbox"[^>]*>\s*/g,
    '<li class="cb-item"><span class="cb-box"></span>'
  );
  return html;
}

function firstQuotableSentence(md) {
  // Strips markdown syntax only. A blanket [-#>] strip also removed hyphens from
  // inside real words ("daily-use" -> "dailyuse") when lifted into a pull-quote.
  const plain = md
    .replace(/^###.*$/gm, "")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/^\s*>\s?/gm, "")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
  const sentences = plain.match(/[^.!?]+[.!?]/g) || [];
  return (sentences.find(s => s.trim().length > 40 && s.trim().length < 140) || sentences[0] || "").trim();
}

const tocEntries = [
  ...frontMatter.filter(f => f.id).map(f => ({ id: f.id, label: f.heading, num: "" })),
  ...chapters.map(c => ({ id: `ch-${c.num}`, label: c.title, num: c.num })),
  ...backMatter.map(s => ({ id: s.id, label: s.heading, num: "" })),
  { id: "sec-about", label: `About ${B.authorBio.name}`, num: "" },
];

const sections = [];

if (frontMatter.length) {
  sections.push(`<div class="page frontmatter">
    ${frontMatter.map(f => `<section${f.id ? ` id="${f.id}"` : ""}>${f.heading ? `<h2>${f.heading}</h2>` : ""}${mdToHtml(f.content)}</section>`).join("\n")}
  </div>`);
}

// Table of contents. Page-number slots are filled after rendering — Chromium
// implements neither `@page` margin boxes nor `target-counter()`, so the numbers
// cannot come from CSS at all.
sections.push(`<div class="page toc-page">
  <div class="toc-head"><div class="rule-sm"></div><h2 class="toc-title">Contents</h2><div class="rule-sm"></div></div>
  <div class="toc-list">
    ${tocEntries.map(e => `<a href="#${e.id}" class="toc-row">
      <span class="toc-num">${e.num}</span>
      <span class="toc-label">${e.label}</span>
      <span class="toc-dots"></span>
      <span class="toc-folio"></span>
    </a>`).join("\n")}
  </div>
</div>`);

chapters.forEach(c => {
  const quote = firstQuotableSentence(c.content);
  sections.push(`<div class="page divider" id="ch-${c.num}">
    ${coverUrl ? `<img class="divider-motif" src="${coverUrl}" alt="">` : ""}
    <div class="divider-inner">
      <div class="divider-num">${String(c.num).padStart(2, "0")}</div>
      <div class="rule-sm rule-center"></div>
      <div class="divider-kicker">Chapter ${c.num} of ${chapterCount}</div>
      <h2 class="divider-title">${c.title}</h2>
      ${quote ? `<p class="divider-quote">&ldquo;${quote}&rdquo;</p>` : ""}
    </div>
  </div>`);
  // Check for mini-summary in content — if found, split it out
  let contentHtml = styleCallouts(mdToHtml(c.content));
  let miniSummary = '';
  const miniMatch = contentHtml.match(/<div class="summary-box">[\s\S]*?<\/div>/i);
  if (miniMatch) {
    miniSummary = miniMatch[0];
    contentHtml = contentHtml.replace(miniMatch[0], '');
  }
  sections.push(`<div class="flow ch-content">
    <div class="kicker">Chapter ${c.num}</div>
    <div class="prose">${contentHtml}</div>
  </div>`);
  if (miniSummary) {
    sections.push(`<div class="flow ch-mini">
      <div class="prose">${miniSummary}</div>
    </div>`);
  }
});

backMatter.forEach(s => {
  sections.push(`<div class="flow" id="${s.id}">
    <h2 class="util-title">${s.heading}</h2>
    <div class="prose checklist">${styleCallouts(mdToHtml(s.content))}</div>
  </div>`);
});

sections.push(`<div class="page author" id="sec-about">
  ${coverUrl ? `<img class="author-motif" src="${coverUrl}" alt="">` : ""}
  <div class="author-inner">
    <div class="rule-sm rule-center"></div>
    <div class="author-mark">&#10022;</div>
    <h2 class="author-heading">About ${B.authorBio.name}</h2>
    <p class="author-tagline">${B.authorBio.tagline}</p>
    <div class="author-hair"></div>
    <p class="author-body">${B.authorBio.body}</p>
    <p class="author-cta">${B.authorBio.cta}</p>
    ${qrDataUrl ? `<img class="author-qr" src="${qrDataUrl}" alt="Scan to visit ${B.site}"><p class="author-qr-caption">Scan to visit ${B.site}</p>` : ""}
  </div>
</div>`);

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${title}</title>
<style>
${fontFaceCss}
  @page { size: ${B.pageFormat}; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { margin: 0; background: #FFFFFF; color: ${B.body};
         font-family: ${B.bodyFont}; font-size: 12pt; line-height: 1.85;
         -webkit-font-smoothing: antialiased; }
  a { color: inherit; text-decoration: none; }
  h1, h2, h3 { text-wrap: balance; }

  /* ====== PAGINATION ====== */
  .page { page-break-after: always; }
  .divider, .author { page-break-before: always; }
  .flow { padding: 22mm 28mm 20mm; }
  p, li, .tip-box, .summary-box, .pull-quote, h3, table { page-break-inside: avoid; }
  h2, h3 { page-break-after: avoid; }

  .rule-sm { width: 20mm; height: 1.5px; background: ${B.accent}; }
  .rule-center { margin-left: auto; margin-right: auto; }

  /* ====== COVER ====== */
  .cover { width: ${B.pageWidth}; height: ${B.pageHeight}; background: ${B.paper};
           display: flex; flex-direction: column; overflow: hidden; position: relative; }
  .cover::after { content: ""; position: absolute; bottom: 0; left: 0; right: 0; height: 6mm; background: ${B.primary}; opacity: 0.3; }
  .cover-art-wrap { height: 54%; flex-shrink: 0; overflow: hidden; }
  .cover-art { width: 100%; height: 100%; object-fit: cover; display: block; transform: scale(1.16); }
  .cover-text { flex: 1; display: flex; flex-direction: column; align-items: center;
                justify-content: center; text-align: center; padding: 16mm 28mm 18mm; position: relative; }
  .cover-eyebrow { font-size: 9pt; letter-spacing: 0.2em; text-transform: uppercase;
                   color: ${B.accentDark}; margin-bottom: 6mm; font-weight: 600; }
  .cover h1 { font-family: ${B.displayFont}; font-weight: 700; font-size: 32pt; color: ${B.ink};
              line-height: 1.12; margin: 0 0 5mm; letter-spacing: -0.3pt; }
  .cover-sub { font-family: ${B.bodyFont}; font-size: 13pt; color: ${B.body};
               max-width: 124mm; line-height: 1.5; margin: 0 0 10mm; opacity: 0.85; }
  .cover-price { font-size: 10pt; letter-spacing: 0.1em; color: ${B.accentDark}; 
                 font-weight: 600; margin-top: 5mm; }
  .cover-site { font-size: 8.5pt; color: ${B.muted}; margin-top: 5mm; letter-spacing: 0.08em; }
  .cover-badges { display: flex; flex-wrap: wrap; justify-content: center; gap: 2.5mm;
                  margin: 0 0 8mm; max-width: 132mm; }
  .cover-badge { font-size: 8.5pt; color: ${B.accentDark}; border: 1px solid ${B.accent};
                 border-radius: 2px; padding: 1.2mm 3mm; letter-spacing: 0.04em;
                 font-weight: 600; background: #FFFFFF; }
  .cover-guarantee { font-size: 8.5pt; letter-spacing: 0.14em; text-transform: uppercase;
                     color: ${B.primaryDark}; font-weight: 600; margin-top: 6mm; }

  /* ====== FRONT MATTER ====== */
  .frontmatter { min-height: ${B.pageHeight}; background: #FFFFFF; padding: 26mm 28mm; }
  .frontmatter section { margin-bottom: 12mm; }
  .frontmatter h2 { font-family: ${B.displayFont}; font-weight: 700; font-size: 16pt; color: ${B.ink};
                    margin: 0 0 5mm; padding-bottom: 3mm; border-bottom: 2px solid ${B.accent}; }
  .frontmatter p { font-size: 11pt; line-height: 1.8; margin: 0 0 5mm; color: ${B.body}; }

  /* ====== CONTENTS ====== */
  .toc-page { min-height: ${B.pageHeight}; background: #FFFFFF; padding: 26mm 28mm; }
  .toc-head { text-align: center; margin-bottom: 14mm; }
  .toc-head .rule-sm { margin: 0 auto; }
  .toc-title { font-family: ${B.displayFont}; font-weight: 700; font-size: 24pt; color: ${B.ink};
               margin: 5mm 0; letter-spacing: -0.2pt; }
  .toc-list { max-width: 150mm; margin: 0 auto; }
  .toc-row { display: flex; align-items: baseline; gap: 4mm; padding: 2.4mm 4mm; font-size: 11pt; line-height: 1.3; text-decoration: none; }
  .toc-row:nth-child(odd) { background: rgba(0,0,0,0.015); }
  .toc-num { font-family: ${B.displayFont}; font-weight: 700; font-size: 10.5pt; color: ${B.accentDark};
             min-width: 8mm; text-align: right; flex-shrink: 0; }
  .toc-label { color: ${B.body}; font-size: 11pt; }
  .toc-dots { flex: 1; min-width: 6mm; border-bottom: 1px dotted ${B.border}; margin: 0 2mm; }
  .toc-folio { min-width: 9mm; flex-shrink: 0; font-family: ${B.displayFont}; font-size: 10pt; color: ${B.muted}; }

  /* ====== CHAPTER DIVIDER ====== */
  .divider { width: ${B.pageWidth}; height: ${B.pageHeight}; background: ${B.paper};
             display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; }
  .divider-motif { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
                   width: 100mm; height: 100mm; object-fit: cover; border-radius: 50%;
                   opacity: 0.1; filter: grayscale(25%); }
  .divider-inner { position: relative; text-align: center; max-width: 130mm; z-index: 1; }
  .divider-num { font-family: ${B.displayFont}; font-weight: 700; font-size: 60pt; color: ${B.accent};
                 line-height: 1; opacity: 0.9; letter-spacing: -2pt; }
  .divider .rule-sm { margin: 8mm auto; }
  .divider-kicker { font-size: 9pt; letter-spacing: 0.2em; text-transform: uppercase;
                    color: ${B.accentDark}; margin-bottom: 6mm; font-weight: 600; }
  .divider-title { font-family: ${B.displayFont}; font-weight: 700; font-size: 26pt;
                   color: ${B.ink}; line-height: 1.22; margin: 0 0 10mm; letter-spacing: -0.3pt; }
  .divider-quote { font-family: ${B.displayFont}; font-style: italic; font-size: 13pt;
                   color: ${B.primaryDark}; line-height: 1.6; margin: 0; }
  .divider::before { content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: 13mm;
                     background: linear-gradient(180deg, ${B.primary}, ${B.accent}); opacity: 0.85; }
  .divider::after { content: ""; position: absolute; inset: 9mm; border: 1px solid ${B.accent}; opacity: 0.5; }

  /* ====== RUNNING CONTENT ====== */
  .kicker { font-size: 9pt; letter-spacing: 0.2em; text-transform: uppercase; color: ${B.accentDark};
            border-bottom: 2px solid ${B.accent}; padding-bottom: 4mm; margin-bottom: 10mm;
            page-break-after: avoid; font-weight: 600; }
  .util-title { font-family: ${B.displayFont}; font-weight: 700; font-size: 22pt;
                color: ${B.ink}; margin: 0 0 8mm; padding-bottom: 4mm; border-bottom: 2px solid ${B.accent}; }
  .prose { max-width: 140mm; margin: 0 auto; }
  .prose h3 { font-family: ${B.displayFont}; font-weight: 700; font-size: 15pt; color: ${B.primaryDark};
              margin: 12mm 0 4mm; page-break-after: avoid; }
  .prose p { margin: 0 0 5mm; font-size: 12pt; line-height: 1.85; }
  .prose ol, .prose ul { margin: 0 0 5mm; padding-left: 6mm; }
  .prose li { margin-bottom: 2.5mm; font-size: 12pt; line-height: 1.7; }
  .prose strong { color: ${B.ink}; font-weight: 700; }
  .prose em { font-style: italic; }
  .prose h3::before { content: ""; display: inline-block; width: 5mm; height: 2px;
                      background: ${B.accent}; margin-right: 3mm; vertical-align: middle; }
  .prose table { width: 100%; border-collapse: collapse; margin: 8mm 0; font-size: 10.5pt; }
  .prose th { background: ${B.paper}; color: ${B.primaryDark}; text-align: left;
              padding: 3mm 4mm; border-bottom: 2px solid ${B.primary};
              font-family: ${B.displayFont}; font-weight: 700; }
  .prose td { padding: 2.5mm 4mm; border-bottom: 1px solid ${B.border}; vertical-align: top; }
  .prose tr:nth-child(even) td { background: ${B.paper}; }
  .ch-content .prose > p:first-of-type::first-letter { float: left; font-family: ${B.displayFont};
      font-weight: 700; font-size: 3.3em; line-height: 0.82; padding: 1mm 2.5mm 0 0;
      color: ${B.primaryDark}; }
  .prose hr { border: none; border-top: 1px solid ${B.border}; margin: 10mm 0; }

  /* ====== INTERACTIVE COMPONENTS ====== */
  
  /* Self-Assessment Quiz */
  .quiz-block { background: #F8F6F3; border: 1px solid ${B.border}; border-radius: 4px; margin: 8mm 0; padding: 6mm 7mm; }
  .quiz-label { font-family: ${B.displayFont}; font-weight: 700; font-size: 11pt; color: ${B.accent2Dark}; margin-bottom: 3mm; }
  .quiz-question { font-family: ${B.displayFont}; font-style: italic; font-size: 12pt; color: ${B.ink}; margin: 0 0 4mm; line-height: 1.5; }
  .quiz-options { font-size: 11pt; line-height: 1.8; color: ${B.body}; }
  .quiz-options br { content: ""; display: block; margin: 2mm 0; }
  
  /* Do This Now Action Block */
  .action-block { background: ${B.paper}; border: 1.5px solid ${B.primary}; border-radius: 4px; margin: 8mm 0; padding: 6mm 7mm; }
  .action-label { font-family: ${B.displayFont}; font-weight: 700; font-size: 11pt; color: ${B.primaryDark}; margin-bottom: 2mm; }
  .action-title { font-family: ${B.displayFont}; font-weight: 700; font-size: 13pt; color: ${B.ink}; margin: 0 0 3mm; }
  .action-content { font-size: 11pt; line-height: 1.7; }
  .action-content p { margin: 0 0 3mm; }
  
  /* Decision Flow */
  .decision-block { background: #F8F6F3; border: 1px solid ${B.border}; border-left: 4px solid ${B.accent2}; margin: 8mm 0; padding: 6mm 7mm; }
  .decision-label { font-family: ${B.displayFont}; font-weight: 700; font-size: 11pt; color: ${B.accent2Dark}; margin-bottom: 3mm; }
  .decision-scenario { font-size: 11pt; line-height: 1.6; margin: 0 0 4mm; color: ${B.ink}; }
  .decision-choices { font-size: 11pt; line-height: 1.8; }
  .decision-choices p { margin: 0 0 2mm; }
  
  /* Self-Assessment / Quick Check */
  .assess-block { background: ${B.paper}; border: 1px solid ${B.border}; border-radius: 4px; margin: 8mm 0; padding: 6mm 7mm; text-align: center; }
  .assess-label { font-family: ${B.displayFont}; font-weight: 700; font-size: 11pt; color: ${B.accentDark}; margin-bottom: 3mm; }
  .assess-statement { font-size: 11pt; font-style: italic; color: ${B.ink}; margin: 0 0 5mm; line-height: 1.5; }
  .assess-scale { font-size: 12pt; letter-spacing: 0.3em; color: ${B.accent}; margin: 0; }
  
  /* Micro-Action Timer */
  .micro-block { background: #FFFFFF; border: 1.5px solid ${B.primary}; border-radius: 4px; margin: 8mm 0; padding: 0; overflow: hidden; }
  .micro-timer { background: ${B.primary}; color: #FFFFFF; font-family: ${B.displayFont}; font-weight: 700; font-size: 10pt; padding: 2mm 7mm; letter-spacing: 0.1em; }
  .micro-title { font-family: ${B.displayFont}; font-weight: 700; font-size: 13pt; color: ${B.ink}; margin: 4mm 7mm 2mm; }
  .micro-content { padding: 0 7mm 5mm; font-size: 11pt; line-height: 1.7; }
  .micro-content p { margin: 0 0 3mm; }
  .micro-content ol, .micro-content ul { margin: 0 0 3mm; padding-left: 5mm; }
  
  /* Fill-In Prompt */
  .fillin-block { background: #FFFFFF; border: 1px dashed ${B.accent}; margin: 8mm 0; padding: 6mm 7mm; }
  .fillin-label { font-family: ${B.displayFont}; font-weight: 700; font-size: 11pt; color: ${B.accentDark}; margin-bottom: 3mm; }
  .fillin-prompt { font-size: 11pt; color: ${B.ink}; margin: 0 0 4mm; line-height: 1.5; }
  .fillin-line { display: block; border-bottom: 1px solid ${B.border}; height: 8mm; margin: 2mm 0; }
  .fillin-line-sm { display: block; border-bottom: 1px solid ${B.border}; height: 5mm; margin: 2mm 0; width: 60%; }
  
  /* Before/After */
  .ba-block { background: ${B.paper}; border: 1px solid ${B.border}; border-radius: 4px; margin: 8mm 0; padding: 5mm 7mm; }
  .ba-before, .ba-after { font-size: 11pt; line-height: 1.6; padding: 2mm 0; }
  .ba-before { border-bottom: 1px solid ${B.border}; margin-bottom: 2mm; }
  .ba-label { display: inline-block; font-family: ${B.displayFont}; font-weight: 700; font-size: 10pt; padding: 0.5mm 3mm; border-radius: 2px; margin-right: 3mm; text-transform: uppercase; letter-spacing: 0.1em; }
  .ba-before .ba-label { background: #F0E8E0; color: ${B.accentDark}; }
  .ba-after .ba-label { background: #E0EDE0; color: ${B.primaryDark}; }
  
  /* Budget Pick */
  .budget-block { background: #F0F5F0; border: 1px solid ${B.primary}; border-radius: 4px; margin: 8mm 0; padding: 5mm 7mm; }
  .budget-label { font-family: ${B.displayFont}; font-weight: 700; font-size: 10pt; color: ${B.primaryDark}; margin-bottom: 2mm; }
  .budget-title { font-family: ${B.displayFont}; font-weight: 700; font-size: 12pt; color: ${B.ink}; margin: 0 0 2mm; }
  .budget-details { font-size: 11pt; line-height: 1.6; }
  .budget-details p { margin: 0; }
  
  /* Skip This */
  .skip-block { background: #FDF5F0; border: 1px solid ${B.accent3}; border-radius: 4px; margin: 8mm 0; padding: 5mm 7mm; }
  .skip-label { font-family: ${B.displayFont}; font-weight: 700; font-size: 10pt; color: ${B.accent3}; margin-bottom: 2mm; }
  .skip-title { font-family: ${B.displayFont}; font-weight: 700; font-size: 12pt; color: ${B.ink}; margin: 0 0 2mm; }
  .skip-reason { font-size: 11pt; line-height: 1.6; }
  .skip-reason p { margin: 0; }
  
  /* Completion Moment */
  .done-block { background: ${B.paper}; border: 2px solid ${B.primary}; border-radius: 4px; margin: 8mm 0; padding: 6mm 7mm; text-align: center; }
  .done-label { font-family: ${B.displayFont}; font-weight: 700; font-size: 12pt; color: ${B.primaryDark}; margin-bottom: 2mm; }
  .done-title { font-family: ${B.displayFont}; font-weight: 700; font-size: 14pt; color: ${B.ink}; margin: 0 0 3mm; }
  .done-message { font-size: 11pt; line-height: 1.6; color: ${B.body}; }
  .done-message p { margin: 0; }
  
  /* Designer Note */
  .note-block { background: #F0F5F8; border: 1px solid ${B.accent2}; border-left: 4px solid ${B.accent2}; margin: 8mm 0; padding: 5mm 7mm; }
  .note-label { font-family: ${B.displayFont}; font-weight: 700; font-size: 10pt; color: ${B.accent2Dark}; margin-bottom: 2mm; }
  .note-text { font-size: 11pt; line-height: 1.6; color: ${B.body}; }
  .note-text p { margin: 0; }
  
  /* ====== PULL QUOTE ====== */
  .pull-quote { margin: 8mm 0 8mm 8mm; padding: 2mm 0 2mm 8mm; border-left: 3px solid ${B.accent};
                font-family: ${B.displayFont}; font-style: italic; font-size: 13pt;
                color: ${B.primaryDark}; line-height: 1.6; }
  .pull-quote p { margin: 0; }

  /* ====== CALLOUTS ====== */
  .tip-box, .summary-box { background: #FFFFFF; border: 1px solid ${B.border}; border-radius: 2px;
                            margin: 8mm 0; padding: 6mm 7mm 6mm 8mm; }
  .tip-box { border-left: 4px solid ${B.primary};
             background: linear-gradient(90deg, #F3F7F2 0%, #FFFFFF 55%); }
  .summary-box { border-left: 4px solid ${B.accent};
                 background: linear-gradient(90deg, #FAF6EF 0%, #FFFFFF 55%); }
  .tip-label, .summary-label { font-family: ${B.displayFont}; font-weight: 700; font-size: 12pt;
                                color: ${B.primaryDark}; margin: 0 0 3mm !important; }
  .summary-label { color: ${B.accentDark}; }
  .tip-mark { color: ${B.accent}; font-size: 9pt; margin-right: 3mm; }
  .tip-box ol, .tip-box ul { margin: 0 !important; padding-left: 5mm; }
  .tip-box li { margin-bottom: 2mm; }
  .summary-box p:last-child { margin: 0; font-size: 11pt; }

  /* ====== CHECKLIST ====== */
  .checklist { line-height: 1.7; }
  .checklist h3 { margin: 8mm 0 4mm; font-size: 13pt; }
  .checklist p { margin: 0 0 4mm; }
  .cb-item { list-style: none; margin-left: -6mm; display: flex; align-items: flex-start;
             gap: 3mm; margin-bottom: 2.8mm; }
  .cb-box { display: inline-block; width: 4mm; height: 4mm; border: 1.1pt solid ${B.accentDark};
            background: #fff; flex-shrink: 0; margin-top: 1.5mm; }
  .cb-on { position: relative; }
  .cb-on::after { content: ""; position: absolute; left: 1.2mm; top: 0.3mm; width: 1.2mm; height: 2.4mm;
                  border: solid ${B.primaryDark}; border-width: 0 1.1pt 1.1pt 0; transform: rotate(45deg); }

  /* ====== AUTHOR ====== */
  .author { width: ${B.pageWidth}; height: ${B.pageHeight}; background: #FFFFFF;
            display: flex; align-items: center; justify-content: center; text-align: center;
            position: relative; }
  .author-inner { max-width: 140mm; padding: 0 20mm; }
  .author-mark { font-size: 18pt; color: ${B.accent}; margin: 0 0 5mm; line-height: 1; }
  .author-heading { font-family: ${B.displayFont}; font-weight: 700; font-size: 22pt; color: ${B.ink};
                    margin: 0 0 5mm; line-height: 1.25; }
  .author-tagline { font-family: ${B.displayFont}; font-style: italic; font-size: 13pt;
                    color: ${B.primaryDark}; margin: 0 0 7mm; }
  .author-hair { width: 14mm; height: 1px; background: ${B.accent}; margin: 0 auto 8mm; }
  .author-body { font-size: 11pt; line-height: 1.85; margin: 0 0 8mm; color: ${B.body}; }
  .author-cta { font-size: 11pt; color: ${B.accentDark}; margin: 0; font-weight: 600; }
  .author-qr { width: 24mm; height: 24mm; margin: 7mm auto 0; display: block; }
  .author-qr-caption { font-size: 8pt; color: ${B.muted}; letter-spacing: 0.12em;
                       text-transform: uppercase; margin-top: 3mm; font-weight: 600; }
  .author::before { content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: 13mm;
                    background: linear-gradient(180deg, ${B.primary}, ${B.accent}); opacity: 0.85; }
  .author::after { content: ""; position: absolute; inset: 9mm; border: 1px solid ${B.accent}; opacity: 0.5; }
</style>
</head>
<body>

  <div class="page cover">
    ${coverUrl ? `<div class="cover-art-wrap"><img class="cover-art" src="${coverUrl}" alt=""></div>` : ""}
    <div class="cover-text">
      <div class="cover-eyebrow">${B.site}</div>
      <h1>${title}</h1>
      <p class="cover-sub">${subtitle}</p>
      ${coverBadgesHtml}
      <div class="rule-sm"></div>
      ${price ? `<div class="cover-price">${price}</div>` : ""}
      ${guarantee ? `<div class="cover-guarantee">${guarantee}</div>` : ""}
      <div class="cover-site">${B.brandName}</div>
    </div>
  </div>

  ${sections.join("\n")}

</body>
</html>`;

const tmpHtmlPath = outputPath.replace(/\.pdf$/, ".build.html");
writeFileSync(tmpHtmlPath, html, "utf8");

// ---------- Pass 1: render ----------
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(`file:///${tmpHtmlPath.replace(/\\/g, "/")}`, { waitUntil: "networkidle" });
await page.evaluateHandle("document.fonts.ready");
await page.pdf({
  path: outputPath, format: B.pageFormat, printBackground: true,
  margin: { top: "0", bottom: "0", left: "0", right: "0" },
});
await browser.close();

// ---------- Pass 2: stamp folios + real TOC page numbers ----------
// Chromium supports neither `@page` margin boxes nor `target-counter()`, so page
// numbers are stamped afterwards. Destinations come from the internal link
// annotations Chromium does emit, so the TOC matches the real layout exactly.
const pdfDoc = await PDFDocument.load(readFileSync(outputPath));
const pdfPages = pdfDoc.getPages();
const helv = await pdfDoc.embedFont(StandardFonts.Helvetica);
const MM = 2.834645;

const refIndex = new Map(pdfPages.map((p, i) => [p.ref.toString(), i]));
const destsDict = pdfDoc.context.lookup(pdfDoc.catalog.get(PDFName.of("Dests")));

function destPageIndex(annot) {
  let dest = annot.get(PDFName.of("Dest"));
  const action = annot.get(PDFName.of("A"));
  if (!dest && action) {
    const a = pdfDoc.context.lookup(action);
    if (a && typeof a.get === "function") dest = a.get(PDFName.of("D"));
  }
  if (!dest) return undefined;
  // Chromium writes internal links as *named* destinations resolved through the
  // catalog's /Dests dictionary rather than inline arrays.
  if (dest instanceof PDFName && destsDict && typeof destsDict.get === "function") {
    dest = destsDict.get(PDFName.of(dest.toString().replace(/^\//, "")));
  }
  const arr = pdfDoc.context.lookup(dest);
  if (arr instanceof PDFArray && arr.size() > 0) {
    const first = arr.get(0);
    if (first instanceof PDFRef) return refIndex.get(first.toString());
  }
  return undefined;
}

const annotsPerPage = pdfPages.map(p => {
  const a = pdfDoc.context.lookup(p.node.get(PDFName.of("Annots")));
  return a instanceof PDFArray ? a : null;
});

// Stamp every internal link annotation wherever it physically lands. A long
// TOC (12+ chapters) can spill onto a second physical page — assuming a
// single "TOC page" (whichever page has the most annotations) silently
// dropped the overflow rows' page numbers. Content pages carry no internal
// links (only the TOC does), so stamping every page's annotations is safe.
let stampedToc = 0;
pdfPages.forEach((pdfPage, pageIdx) => {
  const annots = annotsPerPage[pageIdx];
  if (!annots) return;
  const rows = [];
  for (let i = 0; i < annots.size(); i++) {
    const annot = pdfDoc.context.lookup(annots.get(i));
    if (!annot || typeof annot.get !== "function") continue;
    const target = destPageIndex(annot);
    const rect = pdfDoc.context.lookup(annot.get(PDFName.of("Rect")));
    if (target === undefined || !(rect instanceof PDFArray)) continue;
    rows.push({ target, x2: rect.get(2).asNumber(), yMid: (rect.get(1).asNumber() + rect.get(3).asNumber()) / 2 });
  }
  for (const row of rows) {
    const size = 9.5, label = String(row.target + 1);
    pdfPage.drawText(label, {
      x: row.x2 - helv.widthOfTextAtSize(label, size) - 2 * MM,
      y: row.yMid - size * 0.34,
      size, font: helv, color: rgb(0.35, 0.30, 0.22),
    });
    stampedToc++;
  }
});

// Cover and the closing author page carry no folio, by convention.
const lastIdx = pdfPages.length - 1;
let folios = 0;
const HEADER_SIZE = 7;
const siteLabel = B.site.toUpperCase();
const domainLabel = B.siteUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");
let headerTitle = title;
while (helv.widthOfTextAtSize(headerTitle, HEADER_SIZE) > 200 && headerTitle.length > 3) {
  headerTitle = headerTitle.slice(0, -1);
}
if (helv.widthOfTextAtSize(headerTitle, HEADER_SIZE) > 200) headerTitle = headerTitle.slice(0, -1) + "…";
pdfPages.forEach((p, i) => {
  if (i === 0 || i === lastIdx) return;
  const w = p.getSize().width, h = p.getSize().height, m = 18 * MM;
  const size = 8.5, label = String(i + 1);
  // Running header: hairline + brand left + book title right.
  p.drawLine({
    start: { x: m, y: h - 16 * MM }, end: { x: w - m, y: h - 16 * MM },
    thickness: 0.5, color: rgb(0.90, 0.87, 0.80),
  });
  p.drawText(siteLabel, { x: m, y: h - 19 * MM, size: HEADER_SIZE, font: helv, color: rgb(0.55, 0.50, 0.42) });
  p.drawText(headerTitle, { x: w - m - helv.widthOfTextAtSize(headerTitle, HEADER_SIZE), y: h - 19 * MM, size: HEADER_SIZE, font: helv, color: rgb(0.55, 0.50, 0.42) });
  // Folio (center) + domain (right) in the footer.
  p.drawText(label, {
    x: w / 2 - helv.widthOfTextAtSize(label, size) / 2,
    y: 13 * MM, size, font: helv, color: rgb(0.48, 0.45, 0.40),
  });
  p.drawText(domainLabel, {
    x: w - m - helv.widthOfTextAtSize(domainLabel, 6.5), y: 10.5 * MM,
    size: 6.5, font: helv, color: rgb(0.62, 0.58, 0.52),
  });
  folios++;
});

writeFileSync(outputPath, await pdfDoc.save());

console.log(
  `Built: ${outputPath}\n` +
  `  pages=${pdfPages.length} chapters=${chapterCount} front=${frontMatter.length} back=${backMatter.length} ` +
  `toc=${stampedToc}/${tocEntries.length} folios=${folios}`
);

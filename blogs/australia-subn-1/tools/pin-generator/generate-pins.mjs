// Pinterest pin generator for outdoorcoastalhome.com — Template A (Full-Bleed)
// Ported unchanged from the Canada/UK pin-generator's Template A.
// Usage: node generate-pins.mjs [pins.json]

import { chromium } from 'playwright';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve } from 'path';
import { pathToFileURL } from 'url';

const FONTS = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Montserrat:wght@600;700&display=swap" rel="stylesheet">`;

const BASE_CSS = `
  :root{ --ink:#1E241F; --cream:#FAF7F0; --sage:#7A8B6F; --sage-deep:#4A5A44;
         --tan:#A8845C; --tan-light:#C9A87C; }
  *{margin:0;padding:0;box-sizing:border-box}
  html,body{width:1000px;height:1500px;overflow:hidden}
  .kicker,.eyebrow{font-family:'Montserrat',sans-serif;font-weight:700;font-size:28px;
          letter-spacing:.30em;text-transform:uppercase}
  .domain{font-family:'Montserrat',sans-serif;font-weight:600;font-size:25px;
          letter-spacing:.24em;text-transform:uppercase}
  h2{font-family:'Playfair Display',serif;font-weight:600}
  h2 em{font-style:italic}
`;

const templates = {
  // ===== A · FULL-BLEED — photo fills canvas, editorial stack at bottom =====
  A: (p) => `
    <style>${BASE_CSS}
      body{display:flex;flex-direction:column;justify-content:flex-end;padding:96px 90px;
        background:
          ${p.brightPhoto
            ? "linear-gradient(180deg, rgba(20,26,18,0) 15%, rgba(20,26,18,.60) 45%, rgba(14,18,12,.97) 100%)"
            : "linear-gradient(180deg, rgba(20,26,18,0) 30%, rgba(20,26,18,.50) 55%, rgba(14,18,12,.94) 100%)"},
          url('${p.photo}') center/cover no-repeat;}
      .accent-rule{width:64px;height:3px;background:var(--tan-light);margin-bottom:26px}
      .kicker{color:var(--tan-light);margin-bottom:24px}
      h2{font-size:92px;line-height:1.14;color:#FDFCF7;margin-bottom:40px;
         text-shadow:0 2px 28px rgba(0,0,0,.35)}
      h2 em{color:var(--tan-light)}
      .domain{color:rgba(250,247,240,.9);display:flex;align-items:center;gap:18px}
      .domain::before{content:'';width:34px;height:1px;background:rgba(250,247,240,.5)}
    </style>
    <div class="accent-rule"></div>
    <div class="kicker">${p.kicker}</div>
    <h2>${p.headline}</h2>
    <div class="domain">${p.domain}</div>`,
};

const IS_IG = process.argv.includes('--ig');
const pinsArg = process.argv[2] && !process.argv[2].startsWith('--') ? process.argv[2] : 'pins.json';
const [W, H] = IS_IG ? [1080, 1350] : [1000, 1500];
const OUT_DIR = IS_IG ? 'out-instagram' : 'out';
const SUFFIX = IS_IG ? '-ig' : '';
const SIZE_OVERRIDE = `<style>html,body{width:${W}px !important;height:${H}px !important}</style>`;

const pins = JSON.parse(readFileSync(pinsArg, 'utf8'));
mkdirSync(OUT_DIR, { recursive: true });

const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 2 });

for (const pin of pins) {
  const photo = pin.photo.startsWith('http') ? pin.photo : pathToFileURL(resolve(pin.photo)).href;
  const html = `<!doctype html><html><head><meta charset="utf-8">${FONTS}</head><body>` +
    templates[pin.template]({ ...pin, photo }) + SIZE_OVERRIDE + '</body></html>';
  const file = resolve(`${OUT_DIR}/${pin.slug}-${pin.template}${SUFFIX}.html`);
  writeFileSync(file, html);
  await page.goto('file://' + file, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `${OUT_DIR}/${pin.slug}-${pin.template}${SUFFIX}.png` });
  console.log(`✓ ${OUT_DIR}/${pin.slug}-${pin.template}${SUFFIX}.png`);
}
await browser.close();

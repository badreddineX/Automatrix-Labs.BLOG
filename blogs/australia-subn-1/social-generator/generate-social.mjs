// Renders outdoorcoastalhome.com's Template A (Full-Bleed, sage/tan palette)
// at Instagram's native 1080x1350 (4:5 feed). Ported unchanged from
// pin-generator/generate-pins.mjs Template A.
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
  .kicker,.eyebrow{font-family:'Montserrat',sans-serif;font-weight:700;font-size:26px;
          letter-spacing:.28em;text-transform:uppercase}
  .domain{font-family:'Montserrat',sans-serif;font-weight:600;font-size:23px;
          letter-spacing:.22em;text-transform:uppercase}
  h2{font-family:'Playfair Display',serif;font-weight:600}
  h2 em{font-style:italic;color:var(--tan-light)}
`;

function templateA(p) {
  return `
    <style>${BASE_CSS}
      html,body{width:100%;height:100%;overflow:hidden}
      body{display:flex;flex-direction:column;justify-content:flex-end;padding:84px 80px;
        background:
          linear-gradient(180deg, rgba(20,26,18,0) 30%, rgba(20,26,18,.52) 58%, rgba(14,18,12,.95) 100%),
          url('${p.photo}') center/cover no-repeat;}
      .accent-rule{width:56px;height:3px;background:var(--tan-light);margin-bottom:22px}
      .kicker{color:var(--tan-light);margin-bottom:20px}
      h2{font-size:72px;line-height:1.14;color:#FDFCF7;margin-bottom:32px;
         text-shadow:0 2px 24px rgba(0,0,0,.35)}
      .domain{color:rgba(250,247,240,.9);display:flex;align-items:center;gap:16px}
      .domain::before{content:'';width:30px;height:1px;background:rgba(250,247,240,.5)}
    </style>
    <div class="accent-rule"></div>
    <div class="kicker">${p.kicker}</div>
    <h2>${p.headline}</h2>
    <div class="domain">${p.domain}</div>`;
}

const [W, H] = [1080, 1350];
const OUT_DIR = 'out-instagram';

const posts = JSON.parse(readFileSync('social-posts.json', 'utf8'));
mkdirSync(OUT_DIR, { recursive: true });

const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 2 });

for (const post of posts) {
  const photo = pathToFileURL(resolve(post.photo)).href;
  const html = `<!doctype html><html><head><meta charset="utf-8">${FONTS}</head><body>` +
    templateA({ ...post, photo }) +
    `<style>html,body{width:${W}px !important;height:${H}px !important}</style></body></html>`;
  const file = resolve(`${OUT_DIR}/${post.slug}-ig.html`);
  writeFileSync(file, html);
  await page.goto('file://' + file, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `${OUT_DIR}/${post.slug}-ig.png` });
  console.log(`✓ ${OUT_DIR}/${post.slug}-ig.png`);
}
await browser.close();

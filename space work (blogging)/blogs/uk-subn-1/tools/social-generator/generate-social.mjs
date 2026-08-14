// Renders britishhomeinterior.co.uk's Template A (Full-Bleed Moody, green/gold
// "National Trust heritage" palette) at Instagram's native 1080x1350 (4:5 feed).
// Ported unchanged from britishhomeinterior/pin-generator/generate-pins.mjs Template A.
import { chromium } from 'playwright';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve } from 'path';
import { pathToFileURL } from 'url';

const FONTS = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;1,500;1,600&family=Lato:wght@400;700;900&display=swap" rel="stylesheet">`;

const BASE_CSS = `
  :root{ --green:#47612F; --green-deep:#33461F; --ecru:#F3F4EF; --gold:#B89A6A; --gold-light:#D4BE93; --ink:#1A2318; }
  *{margin:0;padding:0;box-sizing:border-box}
  .kicker,.eyebrow{font-family:'Lato',sans-serif;font-weight:700;font-size:25px;
          letter-spacing:.28em;text-transform:uppercase;color:var(--gold)}
  .domain{font-family:'Lato',sans-serif;font-weight:700;font-size:22px;
          letter-spacing:.20em;text-transform:uppercase}
  h2{font-family:'Playfair Display',serif;font-weight:500}
  h2 em{font-style:italic;color:var(--gold)}
`;

function templateA(p) {
  return `
    <style>${BASE_CSS}
      html,body{width:100%;height:100%;overflow:hidden}
      body{display:flex;flex-direction:column;justify-content:flex-end;padding:80px 76px;
        background:
          linear-gradient(180deg, rgba(26,35,24,.10) 0%, rgba(26,35,24,.18) 34%, rgba(20,28,18,.62) 60%, rgba(12,18,11,.95) 100%),
          url('${p.photo}') center/cover no-repeat;}
      .accent-rule{width:56px;height:2px;background:var(--gold);margin-bottom:22px}
      .kicker{margin-bottom:20px}
      h2{font-size:68px;line-height:1.16;color:var(--ecru);margin-bottom:30px;
         text-shadow:0 2px 26px rgba(0,0,0,.45)}
      .domain{color:rgba(243,244,239,.88)}
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

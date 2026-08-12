// Extracts title/image/category from each Australia blog post frontmatter
// and builds pins.json for Template A (Full-Bleed) generation.
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { resolve } from 'path';

const BLOG_DIR = resolve('../website/src/content/blog');
const IMAGES_DIR = resolve('../website/public/images');
const DOMAIN = 'OUTDOORCOASTALHOME.COM';

function field(fm, name) {
  const m = fm.match(new RegExp(`^${name}:\\s*"?(.*?)"?\\s*$`, 'm'));
  return m ? m[1] : '';
}

const files = readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'));
const pins = [];

for (const f of files) {
  const raw = readFileSync(resolve(BLOG_DIR, f), 'utf8');
  const fm = raw.split('---')[1];
  const title = field(fm, 'title').replace(/:\s*\d+.*$/, m => m).trim();
  const image = field(fm, 'image');
  const category = field(fm, 'category') || 'Coastal Living';
  const slug = f.replace(/\.md$/, '').replace(/^\d+-/, '');

  // Shorten headline for pin (strip trailing colon-count suffixes like ": 13 Proven Tips" stays, just cap length)
  let headline = field(fm, 'title');
  headline = headline.replace(/\s*\|.*$/, '').trim();
  if (headline.length > 70) headline = headline.slice(0, 67).trim() + '…';

  pins.push({
    slug,
    template: 'A',
    kicker: category,
    headline,
    domain: DOMAIN,
    photo: resolve(IMAGES_DIR, image.replace(/^\/images\//, '')),
    brightPhoto: false,
  });
}

writeFileSync('pins.json', JSON.stringify(pins, null, 2));
console.log(`✓ pins.json — ${pins.length} pins`);

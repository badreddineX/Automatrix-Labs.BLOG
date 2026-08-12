// Builds a Metricool bulk-import CSV scheduling Canada's 57 posts to
// Instagram + Facebook, 2 posts/day on EACH platform (4 rows/day total),
// starting 2026-08-13 at 7PM and 9PM. IG and FB get separate rows (same
// time) because their caption format and platform requirements differ:
//   - IG: no live link (caption can't carry one) -> hook + hashtags + "link in bio"
//   - FB: can carry the live link directly in the text, longer-form, minimal hashtags
import { readFileSync, writeFileSync } from 'fs';

const COMMIT = 'f4cc247d2cf7ef09e3bb015c681cb5c881f8e71d';
const REPO = 'badreddineX/SmallSpaceHome.BLOG';
const IMG_DIR = 'social-posts/2026-08-13';
const BRAND = 'SmallSpaceHome';

const posts = JSON.parse(readFileSync('social-posts.json', 'utf8'));

function igHashtags(post) {
  // broad + specific mix, capped at 10, deduped, lowercase, no spaces/punct
  const specific = post.tags
    .map(t => '#' + t.toLowerCase().replace(/[^a-z0-9]/g, ''))
    .filter(t => t.length > 3);
  const broad = ['#smallspaceliving', '#apartmenttherapy', '#renterfriendly', '#canadianhomes', '#smallspacehome'];
  const all = [...new Set([...specific, ...broad])].slice(0, 10);
  return all.join(' ');
}

function igCaption(post) {
  const hook = post.title.replace(/:\s*/, ' — ');
  return `${hook}\n\n${post.description}\n\nSave this post for later. Full guide — link in bio.\n\n${igHashtags(post)}`;
}

function fbCaption(post) {
  return `${post.title}\n\n${post.description}\n\nRead the full guide: ${post.link}`;
}

function csvEscape(v) {
  if (v.includes(',') || v.includes('"') || v.includes('\n')) {
    return '"' + v.replace(/"/g, '""') + '"';
  }
  return v;
}

const header = ['Text', 'Date', 'Time', 'Draft', 'Brand name', 'Facebook', 'Instagram',
  'Picture URL 1', 'Alt text picture 1', 'Instagram Post Type', 'Facebook Post Type',
  'Facebook Title', 'Facebook First Comment Text'].join(',');

const rows = [header];
const startDate = new Date('2026-08-13T00:00:00');
const slots = ['19:00:00', '21:00:00']; // 7PM, 9PM — 2 posts/day per platform

posts.forEach((post, idx) => {
  const dayIndex = Math.floor(idx / 2);
  const slot = slots[idx % 2];
  const d = new Date(startDate);
  d.setDate(d.getDate() + dayIndex);
  const y = d.getFullYear();
  const mo = String(d.getMonth() + 1).padStart(2, '0');
  const da = String(d.getDate()).padStart(2, '0');
  const dateStr = `${y}-${mo}-${da}`;

  const igImg = `https://raw.githubusercontent.com/${REPO}/${COMMIT}/${IMG_DIR}/${post.slug}-ig.png`;
  const fbImg = `https://raw.githubusercontent.com/${REPO}/${COMMIT}/${IMG_DIR}/${post.slug}-fb.png`;
  const altText = post.title;

  // Instagram row
  rows.push([
    csvEscape(igCaption(post)), dateStr, slot, 'FALSE', BRAND,
    'FALSE', 'TRUE', igImg, csvEscape(altText), 'POST', '', '', '',
  ].join(','));

  // Facebook row (same slot, separate row)
  rows.push([
    csvEscape(fbCaption(post)), dateStr, slot, 'FALSE', BRAND,
    'TRUE', 'FALSE', fbImg, csvEscape(altText), '', 'POST', csvEscape(post.title), '',
  ].join(','));
});

writeFileSync('metricool-bulk-CAD-IG-FB.csv', rows.join('\n') + '\n');
console.log(`✓ CSV — ${posts.length} posts × 2 platforms = ${rows.length - 1} rows, ${Math.ceil(posts.length / 2)} days`);

// human-readable schedule
const scheduleLines = ['# Canada — Instagram + Facebook Posting Schedule', '',
  '2 posts/day on EACH platform (4 posts/day total: 2 IG + 2 FB), same topics cross-posted',
  'same day. Starting 2026-08-13 at 7PM and 9PM.', ''];
let curDay = '';
posts.forEach((post, idx) => {
  const dayIndex = Math.floor(idx / 2);
  const d = new Date(startDate);
  d.setDate(d.getDate() + dayIndex);
  const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  if (dateStr !== curDay) { scheduleLines.push(`\n## ${dateStr}`); curDay = dateStr; }
  const time = idx % 2 === 0 ? '7PM' : '9PM';
  scheduleLines.push(`- **${time}** — ${post.title} _(IG + FB)_`);
});
writeFileSync('SCHEDULE-CAD-IG-FB-2-PER-DAY.md', scheduleLines.join('\n') + '\n');
console.log('✓ schedule doc written');

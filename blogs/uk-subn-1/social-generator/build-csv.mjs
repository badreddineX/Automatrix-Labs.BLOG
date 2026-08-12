// Builds a Metricool bulk-import CSV scheduling all 58 UK posts to
// Instagram only, 2 posts/day, starting 2026-08-13 at 7PM and 9PM.
import { readFileSync, writeFileSync } from 'fs';

const COMMIT = '1721287a2673aed79942994ed9044d58a5ca7d3d';
const REPO = 'badreddineX/British-home.BLOG';
const IMG_DIR = 'social-posts/2026-08-13';
const BRAND = 'britishhome_interior';

const posts = JSON.parse(readFileSync('social-posts.json', 'utf8'));

function igHashtags(post) {
  const specific = post.tags
    .map(t => '#' + t.toLowerCase().replace(/[^a-z0-9]/g, ''))
    .filter(t => t.length > 3);
  const broad = ['#ukinteriors', '#britishhomes', '#interiordesignuk', '#homedecoruk', '#renterfriendly'];
  const all = [...new Set([...specific, ...broad])].slice(0, 10);
  return all.join(' ');
}

function igCaption(post) {
  const hook = post.title.replace(/\s*\|.*$/, '');
  return `${hook}\n\n${post.description}\n\nSave this post for later. Full guide — link in bio.\n\n${igHashtags(post)}`;
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
const slots = ['19:00:00', '21:00:00'];

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

  rows.push([
    csvEscape(igCaption(post)), dateStr, slot, 'FALSE', BRAND,
    'FALSE', 'TRUE', igImg, csvEscape(post.title), 'POST', '', '', '',
  ].join(','));
});

writeFileSync('metricool-bulk-UK-IG.csv', rows.join('\n') + '\n');
console.log(`✓ CSV — ${posts.length} posts, ${Math.ceil(posts.length / 2)} days`);

const scheduleLines = ['# UK — Instagram Posting Schedule', '',
  '2 posts/day, starting 2026-08-13 at 7PM and 9PM.', ''];
let curDay = '';
posts.forEach((post, idx) => {
  const dayIndex = Math.floor(idx / 2);
  const d = new Date(startDate);
  d.setDate(d.getDate() + dayIndex);
  const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  if (dateStr !== curDay) { scheduleLines.push(`\n## ${dateStr}`); curDay = dateStr; }
  const time = idx % 2 === 0 ? '7PM' : '9PM';
  scheduleLines.push(`- **${time}** — ${post.title}`);
});
writeFileSync('SCHEDULE-UK-IG-2-PER-DAY.md', scheduleLines.join('\n') + '\n');
console.log('✓ schedule doc written');

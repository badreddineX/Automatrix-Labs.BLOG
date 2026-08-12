// Builds the Pinterest native bulk-upload CSV for the 45 Template A pins,
// scheduled 6 pins/day starting 2026-08-13 at 18:00,19:00,20:00,21:00,22:00,23:00 (local time).
import { readFileSync, readdirSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const BLOG_DIR = resolve('../website/src/content/blog');
const COMMIT = '685c4c621ba2aa400431e36dbd2fe9b8a288dde8';
const REPO = 'badreddineX/coastal-home-au.BLOG';
const IMG_DIR = 'pinterest-pins/template-a-2026-08-13';
const SITE = 'https://outdoorcoastalhome.com';

const BOARDS = ['Coastal Decor', 'Hamptons Style', 'Backyard & Outdoor Living', 'Outdoor Entertaining'];

function field(fm, name) {
  const m = fm.match(new RegExp(`^${name}:\\s*"?(.*?)"?\\s*$`, 'm'));
  return m ? m[1] : '';
}
function fieldMultiline(fm, name) {
  // tags: ["a", "b", "c"]
  const m = fm.match(new RegExp(`^${name}:\\s*\\[(.*?)\\]`, 'm'));
  if (!m) return [];
  return m[1].split(',').map(s => s.trim().replace(/^"|"$/g, ''));
}

const files = readdirSync(BLOG_DIR).filter(f => f.endsWith('.md')).sort();

// board assignment: pick board matching category, fallback round-robin, never repeat same board twice in a row
function boardFor(category, prevBoard, idx) {
  const map = {
    'Coastal Decor': 'Coastal Decor',
    'Hamptons Style': 'Hamptons Style',
    'Backyard Ideas': 'Backyard & Outdoor Living',
    'Outdoor Entertaining': 'Outdoor Entertaining',
  };
  let board = map[category] || BOARDS[idx % BOARDS.length];
  if (board === prevBoard) {
    // shift to next board in rotation to avoid same-board back-to-back
    const i = BOARDS.indexOf(board);
    board = BOARDS[(i + 1) % BOARDS.length];
  }
  return board;
}

const rows = [];
let prevBoard = null;

// schedule: 6/day starting 2026-08-13, hours 18,19,20,21,22,23
const startDate = new Date('2026-08-13T00:00:00');
const hours = [18, 19, 20, 21, 22, 23];

files.forEach((f, idx) => {
  const raw = readFileSync(resolve(BLOG_DIR, f), 'utf8');
  const fm = raw.split('---')[1];
  const title = field(fm, 'title');
  const description = field(fm, 'description');
  const category = field(fm, 'category') || 'Coastal Decor';
  const tags = fieldMultiline(fm, 'tags');
  const id = f.replace(/\.md$/, '');
  const slug = id.replace(/^\d+-/, '');

  const imgUrl = `https://raw.githubusercontent.com/${REPO}/${COMMIT}/${IMG_DIR}/${slug}-A.png`;
  const link = `${SITE}/blog/${id}`;

  const board = boardFor(category, prevBoard, idx);
  prevBoard = board;

  const dayIndex = Math.floor(idx / 6);
  const hourIndex = idx % 6;
  const pubDate = new Date(startDate);
  pubDate.setDate(pubDate.getDate() + dayIndex);
  const y = pubDate.getFullYear();
  const mo = String(pubDate.getMonth() + 1).padStart(2, '0');
  const da = String(pubDate.getDate()).padStart(2, '0');
  const hh = String(hours[hourIndex]).padStart(2, '0');
  const iso = `${y}-${mo}-${da}T${hh}:00:00`; // plain local timestamp, no TZ conversion

  const desc = `${description} Save this pin for later!`;
  const keywords = tags.slice(0, 5).join(', ');

  rows.push({ title, imgUrl, board, description: desc, link, pubDate: iso, keywords });
});

function csvEscape(v) {
  if (v.includes(',') || v.includes('"') || v.includes('\n')) {
    return '"' + v.replace(/"/g, '""') + '"';
  }
  return v;
}

const header = 'Title,Media URL,Pinterest board,Thumbnail,Description,Link,Publish date,Keywords';
const lines = [header];
for (const r of rows) {
  lines.push([
    csvEscape(r.title),
    r.imgUrl,
    r.board,
    '',
    csvEscape(r.description),
    r.link,
    r.pubDate,
    csvEscape(r.keywords),
  ].join(','));
}

writeFileSync('pinterest-bulk-upload-AUS-template-A.csv', lines.join('\n') + '\n');
console.log(`✓ CSV — ${rows.length} rows, ${Math.ceil(rows.length/6)} days`);

// also write a human-readable schedule
const scheduleLines = ['# Australia — Template A Pinterest Posting Schedule', '',
  '6 pins/day, starting 2026-08-13, at 6PM/7PM/8PM/9PM/10PM/11PM.', ''];
let curDay = '';
for (const r of rows) {
  const d = r.pubDate.slice(0, 10);
  if (d !== curDay) { scheduleLines.push(`\n## ${d}`); curDay = d; }
  const hr = r.pubDate.slice(11, 13);
  const hr12 = ((+hr % 12) || 12) + (+hr >= 12 ? 'PM' : 'AM');
  scheduleLines.push(`- **${hr12}** — ${r.title} _(${r.board})_`);
}
writeFileSync('PIN-SCHEDULE-6-PER-DAY-TEMPLATE-A.md', scheduleLines.join('\n') + '\n');
console.log('✓ schedule doc written');

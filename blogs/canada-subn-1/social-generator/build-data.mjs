// Extracts title/description/image/category/tags from each Canada blog post
// frontmatter and builds social-posts.json — one entry per post, shared by
// both the IG and FB image renders and the caption/CSV builder.
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { resolve } from 'path';

const BLOG_DIR = resolve('../smallspacehome/src/content/blog');
const IMAGES_DIR = resolve('../smallspacehome/public/images');
const DOMAIN = 'SMALLSPACEHOME.CA';
const SITE = 'https://smallspacehome.ca';

function field(fm, name) {
  const m = fm.match(new RegExp(`^${name}:\\s*"?(.*?)"?\\s*$`, 'm'));
  return m ? m[1] : '';
}
function fieldArray(fm, name) {
  const m = fm.match(new RegExp(`^${name}:\\s*\\[(.*?)\\]`, 'm'));
  if (!m) return [];
  return m[1].split(',').map(s => s.trim().replace(/^"|"$/g, '')).filter(Boolean);
}

const files = readdirSync(BLOG_DIR).filter(f => f.endsWith('.md')).sort();
const posts = [];

for (const f of files) {
  const raw = readFileSync(resolve(BLOG_DIR, f), 'utf8').replace(/^﻿/, '');
  const fm = raw.split('---')[1];
  const title = field(fm, 'title');
  const description = field(fm, 'description');
  const image = field(fm, 'image');
  const category = field(fm, 'category') || 'Small Space Living';
  const tags = fieldArray(fm, 'tags');
  const id = f.replace(/\.md$/, '');

  let headline = title.replace(/\s*\|.*$/, '').trim();
  if (headline.length > 68) headline = headline.slice(0, 65).trim() + '…';

  posts.push({
    slug: id,
    kicker: category,
    headline,
    domain: DOMAIN,
    photo: resolve(IMAGES_DIR, image.replace(/^\/images\//, '')),
    title,
    description,
    tags,
    link: `${SITE}/blog/${id}`,
  });
}

writeFileSync('social-posts.json', JSON.stringify(posts, null, 2));
console.log(`✓ social-posts.json — ${posts.length} posts`);

import fs from 'fs'
import path from 'path'
import { execFileSync } from 'child_process'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import type { Post, PostMeta, Category } from '@/types/post'

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts')

// Real last-modified date from git history, not a hardcoded copy of
// `date` -- every post previously reported dateModified === datePublished
// in its schema even after edits, which is a dead freshness signal to
// Google/AI Overviews. Falls back to `fallback` if git isn't available
// (e.g. a shallow clone in some deploy environments) or the file has no
// history yet (freshly added, not committed).
function getGitLastModified(filePath: string, fallback: string): string {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%aI', '--', filePath], {
      cwd: process.cwd(),
      encoding: 'utf8',
    }).trim()
    return out || fallback
  } catch {
    return fallback
  }
}

function parsePost(slug: string, includeContent = false): Post {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`)
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  const rt = readingTime(content)

  return {
    slug,
    title: data.title,
    date: data.date,
    lastModified: getGitLastModified(filePath, data.date),
    category: data.category,
    tags: data.tags ?? [],
    excerpt: data.excerpt,
    coverImage: data.coverImage,
    author: data.author,
    readingTime: rt.text,
    content: includeContent ? content : '',
  }
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return []
  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.mdx'))
  const posts = files.map(f => parsePost(f.replace('.mdx', '')))
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): Post {
  return parsePost(slug, true)
}

export function getPostsByCategory(category: Category): PostMeta[] {
  return getAllPosts().filter(p => p.category === category)
}

export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPosts().filter(p => p.tags.includes(tag))
}

export function getRelatedPosts(post: PostMeta, limit = 3): PostMeta[] {
  const all = getAllPosts().filter(p => p.slug !== post.slug)
  return all
    .map(p => {
      const sharedTags = p.tags.filter(t => post.tags.includes(t)).length
      const sameCategory = p.category === post.category ? 1 : 0
      return { post: p, score: sharedTags * 2 + sameCategory }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(r => r.post)
}

export function getAllTags(): string[] {
  const posts = getAllPosts()
  const tagSet = new Set<string>()
  posts.forEach(p => p.tags.forEach(t => tagSet.add(t)))
  return Array.from(tagSet).sort()
}

export function getAllCategories(): Category[] {
  const posts = getAllPosts()
  const catSet = new Set<Category>()
  posts.forEach(p => catSet.add(p.category))
  return Array.from(catSet)
}

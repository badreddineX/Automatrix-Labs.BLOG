import { getAllPosts } from '@/lib/posts'
import { CategoryFilter } from './CategoryFilter'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'All articles from AutoMatrix Labs — AI tutorials, news, tool reviews, and research.',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="min-h-screen bg-white">

      {/* ── PAGE HEADER ──────────────────────────────────────────── */}
      <div className="bg-[#0F172A] pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="section-label mb-4" style={{ color: '#0EA5E9' }}>The Blog</p>
          <h1
            className="text-5xl md:text-6xl font-bold text-white leading-tight mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Explore AI <span style={{ color: '#0EA5E9' }}>Intelligence</span>
          </h1>
          <p className="text-white/50 text-base max-w-xl">
            In-depth guides, honest tool reviews, and practical tutorials — built for people who actually use AI at work.
          </p>
        </div>
      </div>

      {/* ── ALL POSTS ────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <CategoryFilter posts={posts} />
      </div>

    </div>
  )
}

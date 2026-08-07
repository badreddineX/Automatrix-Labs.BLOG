import { getAllPosts } from '@/lib/posts'
import { CategoryFilter } from './CategoryFilter'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'All articles from AutoMatrix Labs — AI tutorials, news, tool reviews, and research.',
}

const categoryCards = [
  { slug: 'news',     label: 'News',      image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&h=400&fit=crop&auto=format' },
  { slug: 'tutorial', label: 'Tutorials', image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop&auto=format' },
  { slug: 'review',   label: 'Reviews',   image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&auto=format' },
  { slug: 'opinion',  label: 'Opinion',   image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop&auto=format' },
  { slug: 'research', label: 'Research',  image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop&auto=format' },
]

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

      {/* ── CATEGORY CARDS ───────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {categoryCards.map(cat => (
            <a
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="group relative overflow-hidden rounded-2xl"
              style={{ aspectRatio: '4/3' }}
            >
              <img
                src={cat.image}
                alt={cat.label}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#0EA5E9]/60 rounded-2xl transition-all duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span className="text-white font-bold text-sm" style={{ fontFamily: 'var(--font-display)' }}>
                  {cat.label}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* ── ALL POSTS ────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="flex items-center gap-4 mb-10">
          <p className="section-label">All Articles</p>
          <div className="flex-1 h-px bg-gray-100" />
          <span className="text-xs text-[#64748B]">{posts.length} posts</span>
        </div>
        <CategoryFilter posts={posts} hidePills />
      </div>

    </div>
  )
}

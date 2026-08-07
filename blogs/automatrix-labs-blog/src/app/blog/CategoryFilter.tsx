'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { BlogSection } from '@/components/ui/blog-section'
import type { PostMeta, Category } from '@/types/post'

const CATEGORIES: (Category | 'all')[] = ['all', 'news', 'tutorial', 'review', 'opinion', 'research']
const PER_PAGE = 9

export function CategoryFilter({ posts, hidePills }: { posts: PostMeta[], hidePills?: boolean }) {
  const [active, setActive] = useState<Category | 'all'>('all')
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('')

  const filtered = posts
    .filter(p => active === 'all' || p.category === active)
    .filter(p =>
      query.trim() === '' ||
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(query.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
    )

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  function handleCategory(cat: Category | 'all') {
    setActive(cat)
    setPage(1)
  }

  function handleSearch(val: string) {
    setQuery(val)
    setPage(1)
  }

  return (
    <>
      {/* Filter pills */}
      {!hidePills && (
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategory(cat)}
              className="px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-all duration-200 border"
              style={active === cat
                ? { background: '#0F172A', color: '#fff', borderColor: '#0F172A' }
                : { background: '#fff', color: '#64748B', borderColor: '#e2e8f0' }
              }
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* All Blogs heading + search */}
      <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
        <h2 className="text-xl font-semibold text-[#0F172A]" style={{ fontFamily: 'var(--font-display)' }}>All Articles</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
          <input
            type="text"
            placeholder="Search articles..."
            value={query}
            onChange={e => handleSearch(e.target.value)}
            className="pl-10 pr-4 py-2.5 rounded-full border border-gray-200 bg-white text-[#0F172A] placeholder:text-[#94a3b8] text-sm focus:outline-none focus:border-[#0EA5E9] transition-colors w-64"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center py-20 font-mono text-sm text-muted-foreground/60">
          No posts found.
        </p>
      ) : (
        <>
          <BlogSection posts={paginated} />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-16 pb-12">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 rounded-full text-sm font-medium border border-gray-200 text-[#64748B] hover:border-[#0F172A] hover:text-[#0F172A] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ← Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className="w-10 h-10 rounded-full text-sm font-bold transition-all border"
                  style={page === n
                    ? { background: '#0F172A', color: '#fff', borderColor: '#0F172A' }
                    : { background: '#fff', color: '#64748B', borderColor: '#e2e8f0' }
                  }
                >
                  {n}
                </button>
              ))}

              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 rounded-full text-sm font-medium border border-gray-200 text-[#64748B] hover:border-[#0F172A] hover:text-[#0F172A] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </>
  )
}

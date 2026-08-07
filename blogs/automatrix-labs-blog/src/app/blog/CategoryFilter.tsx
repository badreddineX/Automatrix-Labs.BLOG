'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { BlogSection } from '@/components/ui/blog-section'
import type { PostMeta, Category } from '@/types/post'

const CATEGORIES: (Category | 'all')[] = ['all', 'news', 'tutorial', 'review', 'opinion', 'research']
const PER_PAGE = 9
const MAX_SUGGESTIONS = 6

function highlight(text: string, query: string) {
  if (!query.trim()) return text
  const escaped = query.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const parts = text.split(new RegExp(`(${escaped})`, 'gi'))
  return parts.map((part, i) =>
    part.toLowerCase() === query.trim().toLowerCase()
      ? <mark key={i} className="bg-[rgba(14,165,233,0.25)] text-[#0F172A] rounded-sm">{part}</mark>
      : part
  )
}

export function CategoryFilter({ posts, hidePills }: { posts: PostMeta[], hidePills?: boolean }) {
  const [active, setActive] = useState<Category | 'all'>('all')
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchWrapRef = useRef<HTMLDivElement>(null)

  const filtered = posts
    .filter(p => active === 'all' || p.category === active)
    .filter(p =>
      query.trim() === '' ||
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(query.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
    )

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return posts
      .filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      )
      .slice(0, MAX_SUGGESTIONS)
  }, [posts, query])

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchWrapRef.current && !searchWrapRef.current.contains(e.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handleCategory(cat: Category | 'all') {
    setActive(cat)
    setPage(1)
  }

  function handleSearch(val: string) {
    setQuery(val)
    setPage(1)
    setShowSuggestions(true)
  }

  function goToPage(n: number) {
    setPage(n)
    if (typeof window !== 'undefined') {
      document.getElementById('posts-grid-anchor')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Windowed page numbers with ellipsis — mirrors the pattern used on the
  // Canada/UK sites so long result sets don't render a page-number wall.
  const pageItems = useMemo(() => {
    const win = 1
    const fullThreshold = 7
    if (totalPages <= fullThreshold) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }
    const items: (number | '...')[] = [1]
    if (page > 2 + win) items.push('...')
    const start = Math.max(2, page - win)
    const end = Math.min(totalPages - 1, page + win)
    for (let i = start; i <= end; i++) items.push(i)
    if (page < totalPages - 1 - win) items.push('...')
    items.push(totalPages)
    return items
  }, [page, totalPages])

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
        <div className="relative" ref={searchWrapRef}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8] pointer-events-none" />
          <input
            type="text"
            placeholder="Search articles..."
            value={query}
            onChange={e => handleSearch(e.target.value)}
            onFocus={() => query.trim() && setShowSuggestions(true)}
            autoComplete="off"
            className="pl-10 pr-4 py-2.5 rounded-full border border-gray-200 bg-white text-[#0F172A] placeholder:text-[#94a3b8] text-sm focus:outline-none focus:border-[#0EA5E9] transition-colors w-64"
          />

          {/* Live suggestions dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <ul
              role="listbox"
              aria-label="Search suggestions"
              className="absolute top-[calc(100%+8px)] left-0 right-0 min-w-[320px] bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50 max-h-[340px] overflow-y-auto"
            >
              {suggestions.map(post => (
                <li key={post.slug} className="border-b border-gray-50 last:border-b-0">
                  <Link
                    href={`/blog/${post.slug}`}
                    onClick={() => setShowSuggestions(false)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-[#F8FAFC] transition-colors"
                  >
                    <span
                      className="shrink-0 text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full border"
                      style={{ color: '#0EA5E9', borderColor: 'rgba(14,165,233,0.35)' }}
                    >
                      {post.category}
                    </span>
                    <span className="flex-1 text-sm text-[#0F172A] truncate">
                      {highlight(post.title, query)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div id="posts-grid-anchor" />

      {filtered.length === 0 ? (
        <p className="text-center py-20 font-mono text-sm text-muted-foreground/60">
          No posts found.
        </p>
      ) : (
        <>
          <BlogSection posts={paginated} />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-16 pb-12 flex-wrap">
              <button
                onClick={() => goToPage(Math.max(1, page - 1))}
                disabled={page === 1}
                aria-label="Previous page"
                className="w-10 h-10 rounded-full flex items-center justify-center text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A] transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {pageItems.map((item, i) =>
                item === '...' ? (
                  <span key={`ellipsis-${i}`} className="w-10 h-10 flex items-center justify-center text-sm text-[#94a3b8] select-none">
                    …
                  </span>
                ) : (
                  <button
                    key={item}
                    onClick={() => goToPage(item)}
                    aria-current={page === item ? 'page' : undefined}
                    className="w-10 h-10 rounded-full text-sm font-bold transition-all border"
                    style={page === item
                      ? { background: '#0F172A', color: '#fff', borderColor: '#0F172A' }
                      : { background: '#fff', color: '#64748B', borderColor: '#e2e8f0' }
                    }
                  >
                    {item}
                  </button>
                )
              )}

              <button
                onClick={() => goToPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                aria-label="Next page"
                className="w-10 h-10 rounded-full flex items-center justify-center text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A] transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </>
      )}
    </>
  )
}

'use client'

import { useState, useCallback } from 'react'
import { Search } from 'lucide-react'
import { PostCard } from './PostCard'
import type { PostMeta } from '@/types/post'

export function SearchBar({ posts }: { posts: PostMeta[] }) {
  const [query, setQuery] = useState('')

  const filtered = useCallback(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return posts.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    )
  }, [query, posts])

  const results = filtered()

  return (
    <div className="w-full">
      <div className="relative max-w-xl mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search posts, topics, tags..."
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-muted text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#00E5FF] transition-colors text-sm"
        />
      </div>

      {query.trim() && (
        <div className="mt-6">
          {results.length === 0 ? (
            <p className="text-center text-gray-400 text-sm">No results for &ldquo;{query}&rdquo;</p>
          ) : (
            <>
              <p className="text-sm text-gray-400 mb-4 text-center">{results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map(post => <PostCard key={post.slug} post={post} />)}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

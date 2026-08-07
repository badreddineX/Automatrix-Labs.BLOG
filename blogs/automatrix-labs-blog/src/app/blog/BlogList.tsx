'use client'

import { useState } from 'react'
import { PostCard } from '@/components/PostCard'
import type { PostMeta, Category } from '@/types/post'

const CATEGORIES: (Category | 'all')[] = ['all', 'news', 'tutorial', 'review', 'opinion', 'research']

export function BlogList({ posts }: { posts: PostMeta[] }) {
  const [active, setActive] = useState<Category | 'all'>('all')
  const filtered = active === 'all' ? posts : posts.filter(p => p.category === active)

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-10">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-colors ${
              active === cat
                ? 'text-black'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
            style={active === cat ? { backgroundColor: '#00E5FF' } : {}}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-400 py-20">No posts in this category yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(post => <PostCard key={post.slug} post={post} />)}
        </div>
      )}
    </>
  )
}

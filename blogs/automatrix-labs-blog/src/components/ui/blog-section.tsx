'use client'

import React from 'react'
import Link from 'next/link'
import { LazyImage } from './lazy-image'
import type { PostMeta } from '@/types/post'

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

interface BlogSectionProps {
  posts: PostMeta[]
}

export function BlogSection({ posts }: BlogSectionProps) {
  return (
    <div className="mx-auto w-full max-w-7xl">
      {/* Decorative background glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-60">
        <div
          className="absolute -left-20 top-0 h-[500px] w-[350px] -rotate-45 rounded-full"
          style={{
            background:
              'radial-gradient(68.54% 68.72% at 55.02% 31.46%, rgba(255,255,255,0.04) 0, rgba(140,140,140,0.01) 50%, rgba(255,255,255,0.005) 80%)',
          }}
        />
        <div
          className="absolute left-0 top-0 h-[500px] w-[150px] -rotate-45 rounded-full"
          style={{
            background:
              'radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,0.03) 0, rgba(255,255,255,0.005) 80%, transparent 100%)',
            translate: '5% -50%',
          }}
        />
      </div>

      {/* Grid */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 p-1">
        {posts.map((post) => (
          <Link
            href={`/blog/${post.slug}`}
            key={post.slug}
            className="group flex flex-col gap-3 rounded-xl p-3 transition-colors duration-150 hover:bg-accent/60 active:bg-accent"
          >
            {/* Image with zoom on hover */}
            <div className="overflow-hidden rounded-lg">
              <LazyImage
                src={post.coverImage}
                fallback="https://picsum.photos/seed/fallback/640/360"
                inView
                alt={post.title}
                ratio={16 / 9}
                className="transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Meta */}
            <div className="space-y-2 px-1 pb-1">
              <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                <span>by {post.author.name}</span>
                <span className="size-1 rounded-full bg-muted-foreground" />
                <span>{formatDate(post.date)}</span>
                <span className="size-1 rounded-full bg-muted-foreground" />
                <span>{post.readingTime}</span>
              </div>

              <h2 className="line-clamp-2 text-lg font-semibold leading-snug tracking-tight text-foreground">
                {post.title}
              </h2>

              <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                {post.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

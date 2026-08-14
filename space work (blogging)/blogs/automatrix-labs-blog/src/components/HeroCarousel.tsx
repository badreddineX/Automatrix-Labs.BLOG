'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { PostMeta } from '@/types/post'

export function HeroCarousel({ posts }: { posts: PostMeta[] }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(c => (c + 1) % posts.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [posts.length])

  const post = posts[current]

  return (
    <div className="relative w-full min-h-screen overflow-hidden">

      {/* Background images — crossfade */}
      {posts.map((p, i) => (
        <div
          key={p.slug}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <Image
            src={p.coverImage}
            alt={p.title}
            fill
            className="object-cover"
            priority={i === 0}
          />
        </div>
      ))}

      {/* Gradient overlays — match travel template */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

      {/* Content — bottom left like the travel template */}
      <div className="absolute inset-0 flex items-end">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-28 w-full">
          <div className="max-w-2xl animate-fade-rise">

            {/* Category label */}
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.25em] mb-5" style={{ color: '#0EA5E9' }}>
              {post.category}
            </span>

            {/* Title */}
            <h1
              className="text-4xl md:text-6xl font-bold text-white leading-[1.05] mb-5"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-white/70 text-base md:text-lg mb-8 max-w-lg leading-relaxed line-clamp-2">
              {post.excerpt}
            </p>

            {/* CTA */}
            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-200 hover:gap-4"
              style={{ background: '#ffffff', color: '#0F172A' }}
            >
              Read Article <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Slide counter — bottom right */}
      <div className="absolute bottom-10 right-8 flex items-center gap-3">
        {posts.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="h-[3px] rounded-full transition-all duration-400"
            style={{
              width: i === current ? '32px' : '12px',
              background: i === current ? '#ffffff' : 'rgba(255,255,255,0.35)',
            }}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Stats strip — bottom of hero (01 / 02 / 03 style) */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(12px)' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-3 divide-x divide-white/10">
            {[
              { num: '01', label: 'Choose a topic', sub: 'AI tools, tutorials, reviews' },
              { num: '02', label: 'Read the guide', sub: 'In-depth, practical content' },
              { num: '03', label: 'Apply & save time', sub: 'Real workflows for real work' },
            ].map(item => (
              <div key={item.num} className="px-6 py-4 flex items-start gap-4">
                <span className="text-2xl font-bold" style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-display)' }}>
                  {item.num}
                </span>
                <div>
                  <p className="text-white font-semibold text-sm">{item.label}</p>
                  <p className="text-white/50 text-xs mt-0.5">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

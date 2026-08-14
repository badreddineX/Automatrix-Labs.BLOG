import { getAllPosts } from '@/lib/posts'
import { HeroCarousel } from '@/components/HeroCarousel'
import { PostCard, PostCardHorizontal } from '@/components/PostCard'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AutoMatrix Labs — AI Intelligence for Builders',
  description: 'News, tutorials, tool reviews, and research from the AI frontier.',
}

export default function HomePage() {
  const allPosts = getAllPosts()
  const heroPosts = allPosts.slice(0, 3)
  const featuredPost = allPosts[3] ?? allPosts[0]
  const portraitPosts = allPosts.slice(4, 8)
  const latestPosts = allPosts.slice(8, 14)
  const sidebarPosts = allPosts.slice(0, 4)

  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO ─────────────────────────────────────────────────── */}
      {heroPosts.length > 0 && <HeroCarousel posts={heroPosts} />}

      {/* ── POPULAR POSTS (portrait cards) ───────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="section-label mb-2">Trending Now</p>
            <h2
              className="text-4xl font-bold text-[#0F172A]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Popular in AI
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-[#0EA5E9] hover:gap-3 transition-all"
          >
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {portraitPosts.map(post => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      {/* ── FEATURE SPOTLIGHT (2-column: image + text) ───────────── */}
      {featuredPost && (
        <section className="bg-[#F8FAFC] py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

              {/* Left: image */}
              <div className="relative overflow-hidden rounded-3xl" style={{ aspectRatio: '4/3' }}>
                <Image
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/30 to-transparent" />
              </div>

              {/* Right: text */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Image
                    src={featuredPost.author.avatar}
                    alt={featuredPost.author.name}
                    width={44}
                    height={44}
                    className="rounded-full border-2 border-white shadow-sm"
                  />
                  <div>
                    <p className="font-semibold text-[#0F172A] text-sm">{featuredPost.author.name}</p>
                    <p className="text-[#64748B] text-xs">AI Writer · AutoMatrix Labs</p>
                  </div>
                </div>

                <p className="section-label mb-3">Featured Article</p>

                <h2
                  className="text-3xl md:text-4xl font-bold text-[#0F172A] leading-tight mb-5"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {featuredPost.title}
                </h2>

                <p className="text-[#64748B] leading-relaxed mb-8">
                  {featuredPost.excerpt}
                </p>

                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center gap-2 font-semibold text-sm hover:gap-3 transition-all"
                  style={{ color: '#0EA5E9' }}
                >
                  Read More<span className="sr-only"> about {featuredPost.title}</span> <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── LATEST ARTICLES + SIDEBAR ────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">

          {/* Main grid */}
          <div>
            <div className="mb-8">
              <p className="section-label mb-2">Keep Reading</p>
              <h2
                className="text-3xl font-bold text-[#0F172A]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Latest Articles
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {latestPosts.map(post => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm transition-all hover:opacity-90"
                style={{ background: '#0F172A', color: '#ffffff' }}
              >
                All Articles <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <aside>
            <div className="sticky top-24">
              <p className="section-label mb-6">Also Worth Reading</p>
              <div className="flex flex-col gap-6">
                {sidebarPosts.map(post => (
                  <PostCardHorizontal key={post.slug} post={post} />
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

    </div>
  )
}

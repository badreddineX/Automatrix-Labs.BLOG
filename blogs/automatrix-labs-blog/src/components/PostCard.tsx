import Link from 'next/link'
import Image from 'next/image'
import type { PostMeta } from '@/types/post'

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  })
}

/* Portrait card — image fills card, title overlaid at bottom (travel template style) */
export function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: '3/4' }}>
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Dark gradient — bottom heavy like travel template */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

        {/* Category badge — top left */}
        <div className="absolute top-4 left-4">
          <span
            className="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider text-white"
            style={{ background: 'rgba(14,165,233,0.85)', backdropFilter: 'blur(4px)' }}
          >
            {post.category}
          </span>
        </div>

        {/* Reading time — top right */}
        <span
          className="absolute top-4 right-4 text-[11px] font-mono text-white/70 px-2 py-1 rounded-full"
          style={{ background: 'rgba(0,0,0,0.4)' }}
        >
          {post.readingTime}
        </span>

        {/* Content — bottom overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3
            className="font-bold text-white text-lg leading-snug mb-3 line-clamp-2 transition-colors group-hover:text-[#7DD3FC]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {post.title}
          </h3>
          <div className="flex items-center gap-2">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              width={22}
              height={22}
              className="rounded-full border border-white/30"
            />
            <span className="text-xs text-white/60">{post.author.name}</span>
            <span className="ml-auto text-xs text-white/40">{formatDate(post.date)}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

/* Horizontal card — image left, text right (for wider layouts) */
export function PostCardHorizontal({ post }: { post: PostMeta }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group flex gap-5 items-start">
      <div className="relative overflow-hidden rounded-xl shrink-0" style={{ width: '120px', height: '90px' }}>
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex-1 min-w-0">
        <span className="section-label mb-1 block">{post.category}</span>
        <h4
          className="font-semibold text-[#0F172A] text-sm leading-snug line-clamp-2 group-hover:text-[#0EA5E9] transition-colors"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {post.title}
        </h4>
        <p className="text-xs text-[#64748B] mt-1.5">{formatDate(post.date)} · {post.readingTime}</p>
      </div>
    </Link>
  )
}

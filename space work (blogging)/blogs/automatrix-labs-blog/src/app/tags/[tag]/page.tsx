import { getPostsByTag, getAllTags } from '@/lib/posts'
import { PostCard } from '@/components/PostCard'
import type { Metadata } from 'next'

interface Props { params: { tag: string } }

export async function generateStaticParams() {
  return getAllTags().map(t => ({ tag: t }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { title: `#${params.tag} — AutoMatrix Labs`, description: `Posts tagged with ${params.tag}.` }
}

export default function TagPage({ params }: Props) {
  const posts = getPostsByTag(params.tag)

  return (
    <div className="min-h-screen">

      {/* Hero banner */}
      <div
        className="relative overflow-hidden border-b border-border"
        style={{ backgroundColor: 'hsl(var(--muted))' }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 70% 50%, rgba(0,229,255,0.1) 0%, transparent 65%)' }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <p className="text-xs font-mono tracking-[0.3em] uppercase mb-3 font-semibold" style={{ color: '#0099b3' }}>
            ✦ tagged content
          </p>
          <h1 className="text-5xl md:text-6xl font-black text-foreground mb-4">
            #{params.tag}
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
            All articles tagged with <span style={{ color: '#0099b3' }}>#{params.tag}</span>.
          </p>
          <div className="mt-6">
            <span
              className="px-4 py-1.5 rounded-full text-sm font-semibold"
              style={{ background: 'rgba(0,153,179,0.1)', color: '#0099b3', border: '1px solid rgba(0,153,179,0.3)' }}
            >
              {posts.length} {posts.length === 1 ? 'article' : 'articles'}
            </span>
          </div>
        </div>
      </div>

      {/* Posts grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {posts.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-5xl mb-4">🏷️</p>
            <p className="text-foreground font-bold text-xl mb-2">No posts yet</p>
            <p className="text-muted-foreground text-sm">Check back soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map(post => <PostCard key={post.slug} post={post} />)}
          </div>
        )}
      </div>

    </div>
  )
}

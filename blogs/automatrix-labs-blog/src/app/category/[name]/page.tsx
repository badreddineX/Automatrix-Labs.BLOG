import { getPostsByCategory, getAllCategories } from '@/lib/posts'
import { PostCard } from '@/components/PostCard'
import { notFound } from 'next/navigation'
import type { Category } from '@/types/post'
import type { Metadata } from 'next'

interface Props { params: { name: string } }

export async function generateStaticParams() {
  return getAllCategories().map(c => ({ name: c }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const meta = categoryMeta[params.name as Category]
  return {
    title: `${params.name} — AutoMatrix Labs`,
    description: meta?.description ?? `Posts in the ${params.name} category.`,
  }
}

const VALID: Category[] = ['news', 'tutorial', 'review', 'opinion', 'research']

const categoryMeta: Record<Category, {
  label: string
  description: string
  sub: string
  icon: string
  accent: string
  glow: string
}> = {
  news: {
    label: 'News',
    description: 'The latest AI breakthroughs, product launches, and industry shifts — curated and explained clearly.',
    sub: 'Stay current with the AI world',
    icon: '📡',
    accent: '#00E5FF',
    glow: 'rgba(0, 229, 255, 0.12)',
  },
  tutorial: {
    label: 'Tutorials',
    description: 'Step-by-step guides to help you build, ship, and automate with AI tools — practical and production-ready.',
    sub: 'Learn by building',
    icon: '⚡',
    accent: '#00c853',
    glow: 'rgba(0, 200, 83, 0.1)',
  },
  review: {
    label: 'Reviews',
    description: 'Honest, in-depth reviews of AI tools, models, and platforms. No sponsored fluff — just real assessments.',
    sub: 'Tools worth your attention',
    icon: '🔬',
    accent: '#e040fb',
    glow: 'rgba(180, 0, 255, 0.1)',
  },
  opinion: {
    label: 'Opinion',
    description: 'Sharp takes on where AI is heading, what it means for builders, and the ideas shaping the frontier.',
    sub: 'Perspectives that challenge the narrative',
    icon: '💡',
    accent: '#ffab40',
    glow: 'rgba(255, 180, 0, 0.1)',
  },
  research: {
    label: 'Research',
    description: 'Deep dives into AI papers, experiments, and findings — translated from academic to actionable.',
    sub: 'The science behind the hype',
    icon: '🧠',
    accent: '#40c4ff',
    glow: 'rgba(0, 180, 255, 0.12)',
  },
}

export default function CategoryPage({ params }: Props) {
  if (!VALID.includes(params.name as Category)) notFound()
  const posts = getPostsByCategory(params.name as Category)
  const meta = categoryMeta[params.name as Category]

  return (
    <div className="min-h-screen">

      {/* ── Hero Banner ─────────────────────────────────────────── */}
      <div className="relative overflow-hidden border-b border-border" style={{ backgroundColor: 'hsl(var(--muted))' }}>
        {/* Glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 70% 50%, ${meta.glow} 0%, transparent 65%)` }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex items-start gap-6">
            {/* Icon */}
            <div
              className="text-5xl w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0 border border-border"
              style={{ backgroundColor: 'hsl(var(--background))' }}
            >
              {meta.icon}
            </div>

            <div>
              <p className="text-xs font-mono tracking-[0.3em] uppercase mb-2 font-semibold text-foreground/60">
                ✦ {meta.sub}
              </p>
              <h1 className="text-5xl md:text-6xl font-black text-foreground mb-4 capitalize">
                {meta.label}
              </h1>
              <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
                {meta.description}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <span
                  className="px-4 py-1.5 rounded-full text-sm font-semibold"
                  style={{ background: `${meta.glow}`, color: meta.accent, border: `1px solid ${meta.accent}40` }}
                >
                  {posts.length} {posts.length === 1 ? 'article' : 'articles'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Posts Grid ──────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {posts.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-5xl mb-4">🚧</p>
            <p className="text-foreground font-bold text-xl mb-2">Nothing here yet</p>
            <p className="text-muted-foreground text-sm">Check back soon — we&apos;re working on it.</p>
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

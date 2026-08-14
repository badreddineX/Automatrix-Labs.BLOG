import { PostCard } from './PostCard'
import Link from 'next/link'
import type { PostMeta } from '@/types/post'

export function HomeBlogSection({ posts }: { posts: PostMeta[] }) {
  const latest = posts.slice(0, 6)

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {latest.map(post => <PostCard key={post.slug} post={post} />)}
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/blog"
          className="inline-block px-8 py-3 rounded-full font-bold text-sm text-black transition-opacity hover:opacity-90"
          style={{ background: 'linear-gradient(90deg, #00B8CC, #00E5FF)' }}
        >
          View All Articles →
        </Link>
      </div>
    </>
  )
}

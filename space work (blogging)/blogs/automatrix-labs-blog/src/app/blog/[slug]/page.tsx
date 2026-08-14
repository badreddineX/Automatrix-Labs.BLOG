import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/posts'
import { CategoryBadge } from '@/components/CategoryBadge'
import { PostCard } from '@/components/PostCard'
import { createMdxComponents } from '@/components/MDXComponents'
import { TableOfContents } from '@/components/TableOfContents'
import { ReadingProgress } from '@/components/ReadingProgress'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Clock, Calendar } from 'lucide-react'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

const SITE_URL = 'https://automatrix-blog.vercel.app'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const post = getPostBySlug(params.slug)
    return {
      title: post.title,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        images: [post.coverImage],
        type: 'article',
        publishedTime: post.date,
        authors: [post.author.name],
        tags: post.tags,
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt,
        images: [post.coverImage],
      },
      alternates: { canonical: `${SITE_URL}/blog/${post.slug}` },
    }
  } catch {
    return { title: 'Post not found' }
  }
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function PostPage({ params }: Props) {
  let post
  try {
    post = getPostBySlug(params.slug)
  } catch {
    notFound()
  }

  const related = getRelatedPosts(post)

  // Extract FAQ pairs from post content for FAQ schema
  function extractFAQs(content: string) {
    const faqs: Array<{ question: string; answer: string }> = []
    const regex = /\*\*Q:\s*(.+?)\*\*\s*\n+A:\s*(.+?)(?=\n\n|\n\*\*Q:|\n##|$)/gs
    let match
    while ((match = regex.exec(content)) !== null) {
      faqs.push({ question: match[1].trim(), answer: match[2].replace(/\*\*/g, '').trim() })
    }
    return faqs
  }

  const faqs = extractFAQs(post.content)

  const jsonLd: Record<string, unknown>[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      image: post.coverImage,
      datePublished: post.date,
      dateModified: post.lastModified,
      author: { '@type': 'Person', name: post.author.name },
      publisher: {
        '@type': 'Organization',
        name: 'AutoMatrix Labs',
        url: SITE_URL,
        logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
      },
      url: `${SITE_URL}/blog/${post.slug}`,
      keywords: post.tags.join(', '),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
        { '@type': 'ListItem', position: 3, name: post.title, item: `${SITE_URL}/blog/${post.slug}` },
      ],
    },
    ...(faqs.length > 0
      ? [{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map(f => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: { '@type': 'Answer', text: f.answer },
          })),
        }]
      : []),
  ]

  return (
    <div className="min-h-screen bg-white">
      <ReadingProgress />
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      {/* ── HERO — wide banner strip, not full-bleed viewport height (matches Canada blog) ── */}
      <div className="relative w-full aspect-[16/7] md:aspect-[4/1] max-h-[300px] md:max-h-[340px] overflow-hidden bg-[#F8FAFC]">
        <Image src={post.coverImage} alt={post.title} fill className="object-cover" style={{ objectPosition: 'center 40%' }} priority />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(255,255,255,0.18) 80%, rgba(255,255,255,0.55) 100%)' }} />
      </div>

      {/* ── POST HEADER — left-aligned below hero (matches Canada blog) ── */}
      <header className="border-b border-gray-100">
        <div className="max-w-[760px] mx-auto px-6 lg:px-8 pt-12 pb-10">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs text-[#94a3b8] mb-6">
            <a href="/" className="hover:text-[#0F172A] transition-colors">Home</a>
            <span aria-hidden="true">›</span>
            <a href="/blog" className="hover:text-[#0F172A] transition-colors">Blog</a>
            <span aria-hidden="true">›</span>
            <span className="text-[#0F172A] capitalize" aria-current="page">{post.category}</span>
          </nav>

          <div className="mb-[18px]">
            <CategoryBadge category={post.category} />
          </div>

          <h1
            className="text-[1.6rem] md:text-5xl font-bold italic text-[#0F172A] leading-[1.12] mb-5 tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {post.title}
          </h1>
          <p className="text-[#64748B] text-lg leading-relaxed mb-7 font-light">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-sm text-[#374151] border-t border-gray-100 pt-5">
            <span className="flex items-center gap-2">
              <span className="font-bold text-[#0F172A]">By</span>
              <Image src={post.author.avatar} alt={post.author.name} width={22} height={22} className="rounded-full" />
              <span className="font-medium text-[#0F172A]">{post.author.name}</span>
            </span>
            <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{formatDate(post.date)}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{post.readingTime}</span>
          </div>
        </div>
      </header>

      {/* ── ARTICLE BODY ─────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
        <div className="flex gap-14 items-start justify-center">

          {/* Main article */}
          <article className="min-w-0 w-full max-w-2xl prose prose-lg prose-slate
            prose-headings:scroll-mt-24
            prose-headings:text-[#0F172A]
            prose-p:text-[#374151]
            prose-p:leading-relaxed
            prose-strong:text-[#0F172A]
            prose-li:text-[#374151]
            prose-blockquote:text-[#64748B]
            prose-a:text-[#0EA5E9]
            prose-a:no-underline
            hover:prose-a:underline
            prose-pre:!bg-[#1e293b]
            prose-pre:!text-[#e2e8f0]
            [&_pre]:!bg-[#1e293b]
            [&_:not(pre)>code]:!bg-[#F1F5F9]
            [&_:not(pre)>code]:!text-[#0EA5E9]
            [&_:not(pre)>code]:!px-1.5
            [&_:not(pre)>code]:!py-0.5
            [&_:not(pre)>code]:!rounded
            [&_:not(pre)>code]:!text-[0.85em]
            [&_:not(pre)>code]:!font-mono"
          >
            {/* Hero stats bar */}
            <div className="not-prose flex items-center gap-4 mb-8 px-5 py-3.5 rounded-xl flex-wrap text-sm"
              style={{ background: '#F8FAFC', border: '1px solid #e2e8f0' }}>
              <span className="text-[#64748B]">⏱ <strong className="text-[#0F172A]">{post.readingTime}</strong></span>
              <span className="w-px h-4 bg-gray-200 hidden sm:block" />
              <span className="text-[#64748B]">📅 Updated <strong className="text-[#0F172A]">{formatDate(post.date)}</strong></span>
              <span className="w-px h-4 bg-gray-200 hidden sm:block" />
              <span className="text-[#64748B]">✅ Tested by <strong className="text-[#0F172A]">{post.author.name}</strong></span>
            </div>

            <MDXRemote source={post.content} components={createMdxComponents()} />
          </article>

          {/* Sticky ToC sidebar */}
          <aside className="hidden xl:block w-72 shrink-0">
            <TableOfContents />
          </aside>
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-12 pt-8 max-w-2xl mx-auto border-t border-gray-100">
            {post.tags.map(tag => (
              <a
                key={tag}
                href={`/tags/${tag}`}
                className="px-3 py-1 rounded-full text-xs font-medium border border-gray-200 text-[#64748B] hover:border-[#0EA5E9] hover:text-[#0EA5E9] transition-colors"
              >
                #{tag}
              </a>
            ))}
          </div>
        )}

        {/* Author box */}
        <div className="max-w-2xl mx-auto mt-10 p-6 rounded-2xl bg-[#F8FAFC] border border-gray-100 flex items-center gap-5">
          <Image src={post.author.avatar} alt={post.author.name} width={56} height={56} className="rounded-full border-2 border-white shadow-sm shrink-0" />
          <div>
            <p className="font-bold text-[#0F172A]" style={{ fontFamily: 'var(--font-display)' }}>{post.author.name}</p>
            <p className="text-xs text-[#64748B] mt-1">AI Writer at AutoMatrix Labs · Covering AI tools, tutorials, and practical use cases.</p>
          </div>
        </div>
      </div>

      {/* ── RELATED POSTS ────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="bg-[#F8FAFC] py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <p className="section-label mb-2">Continue Reading</p>
            <h2 className="text-2xl font-bold text-[#0F172A] mb-8" style={{ fontFamily: 'var(--font-display)' }}>
              Related Articles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map(p => <PostCard key={p.slug} post={p} />)}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

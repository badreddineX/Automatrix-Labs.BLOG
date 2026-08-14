import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Thank You — AutoMatrix Labs',
  description: 'Thanks for reaching out to AutoMatrix Labs.',
}

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-lg mx-auto text-center py-24">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: 'rgba(14,165,233,0.1)' }}
        >
          <span className="text-3xl">✓</span>
        </div>
        <p className="section-label mb-3">Thank You</p>
        <h1
          className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Got it — thanks for reaching out.
        </h1>
        <p className="text-[#64748B] text-sm mb-10 leading-relaxed">
          We&apos;ll get back to you as soon as we can. In the meantime, catch up on our latest AI guides
          and reviews.
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm transition-all hover:opacity-90"
          style={{ background: '#0F172A', color: '#ffffff' }}
        >
          Browse Articles <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}

import type { MDXComponents } from 'mdx/types'
import { ExternalLink } from 'lucide-react'
import { CopyCodeBlock } from './CopyCodeBlock'
import { Rating, RatingCard } from './Rating'
import { TimeSavedCalculator } from './TimeSavedCalculator'
import { ITestedThis } from './ITestedThis'

function slugify(text: string) {
  return text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
}

export const mdxComponents: MDXComponents = {
  h2: ({ children, ...props }) => {
    const id = slugify(String(children))
    return (
      <h2
        id={id}
        className="flex items-center gap-3 mt-10 mb-4 text-2xl font-bold text-[#0F172A]"
        style={{ fontFamily: 'var(--font-display)' }}
        {...props}
      >
        <span className="shrink-0 w-1 h-6 rounded-full" style={{ background: '#0EA5E9' }} />
        {children}
      </h2>
    )
  },
  h3: ({ children, ...props }) => {
    const id = slugify(String(children))
    return (
      <h3
        id={id}
        className="mt-7 mb-3 text-xl font-semibold text-[#0F172A]"
        style={{ fontFamily: 'var(--font-display)' }}
        {...props}
      >
        {children}
      </h3>
    )
  },
  pre: ({ children, ...props }) => (
    <CopyCodeBlock {...props}>{children}</CopyCodeBlock>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 pl-5 italic text-[#64748B] my-6 not-italic" style={{ borderColor: '#0EA5E9' }}>
      {children}
    </blockquote>
  ),

  // ── Custom components available in all MDX posts ──────────────
  tip: ({ children }: { children: React.ReactNode }) => (
    <div className="rounded-xl p-4 my-6 text-sm" style={{ background: 'rgba(14,165,233,0.06)', border: '1px solid rgba(14,165,233,0.2)' }}>
      <span className="font-semibold mr-2" style={{ color: '#0EA5E9' }}>💡 Tip:</span>
      {children}
    </div>
  ),

  AffiliateLink: ({ href, children, badge }: { href: string; children: React.ReactNode; badge?: string }) => (
    <div className="rounded-xl p-4 my-6 flex items-center justify-between gap-4 flex-wrap border border-gray-100 bg-[#F8FAFC]">
      <div className="flex items-center gap-3">
        {badge && (
          <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(14,165,233,0.12)', color: '#0EA5E9' }}>
            {badge}
          </span>
        )}
        <span className="text-sm text-[#374151]">{children}</span>
      </div>
      <a
        href={href}
        target="_blank"
        rel="noopener sponsored"
        className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full transition-opacity hover:opacity-90 whitespace-nowrap"
        style={{ background: '#0F172A', color: '#ffffff' }}
      >
        Try it free <ExternalLink className="w-3.5 h-3.5" />
      </a>
      <p className="w-full text-xs text-[#94a3b8] mt-1">Affiliate link — we may earn a commission at no extra cost to you.</p>
    </div>
  ),

  // Rating bars — use in review posts
  // <Rating label="Ease of use" score={8} />
  Rating,

  // Full rating card — use in review posts
  // <RatingCard tool="Jasper AI" ratings={[{label:"Speed",score:9},{label:"Quality",score:7}]} verdict="Worth it for teams, overkill for solo bloggers." />
  RatingCard,

  // Time saved calculator — use in productivity/tutorial posts
  // <TimeSavedCalculator taskName="writing blog posts" savingPercent={70} />
  TimeSavedCalculator,

  // I tested this box — wrap real output/proof
  // <ITestedThis tool="Claude">...</ITestedThis>
  ITestedThis,
}

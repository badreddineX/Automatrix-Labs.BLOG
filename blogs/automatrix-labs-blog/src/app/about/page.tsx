import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'About — AutoMatrix Labs',
  description: 'AutoMatrix Labs is an independent AI publication built for builders and curious minds. Automate. Innovate. Scale.',
}

const stats = [
  { value: '21+', label: 'Articles Published' },
  { value: '5', label: 'Content Categories' },
  { value: '10K+', label: 'Monthly Readers' },
  { value: '100%', label: 'Independent' },
]

const mission = [
  {
    title: 'Our Story',
    body: 'AutoMatrix Labs was founded by a team of AI enthusiasts who felt that the best technical content was locked behind jargon. We set out to change that — making AI knowledge accessible without sacrificing depth.',
  },
  {
    title: 'What We Believe',
    body: 'We believe AI is the most transformative technology of our generation. Our job is to help you understand it, use it, and build with it — whether you\'re a developer, a marketer, or a curious beginner.',
  },
  {
    title: 'How We Work',
    body: 'Every article goes through hands-on testing and editorial review. We never publish fluff. If a tool doesn\'t work, we say so. If a technique is overrated, we call it out. Honest takes, always.',
  },
]

const partners = ['OpenAI', 'Anthropic', 'Google AI', 'Hugging Face', 'Mistral', 'Cohere']

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO: full-width dark image ───────────────────────────── */}
      <section className="relative h-[55vh] min-h-[400px] flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&h=900&fit=crop"
          alt="About AutoMatrix Labs"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-4">
          <p className="text-[#0EA5E9] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            About Us
          </p>
          <h1
            className="text-4xl md:text-6xl font-bold text-white leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Who We Are
          </h1>
          <p className="mt-4 text-white/70 max-w-md mx-auto text-base">
            Independent AI journalism for builders, thinkers, and doers.
          </p>
        </div>
      </section>

      {/* ── STATS STRIP ──────────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
          {stats.map(s => (
            <div key={s.label} className="py-10 px-6 text-center">
              <p
                className="text-4xl font-bold mb-1"
                style={{ fontFamily: 'var(--font-display)', color: '#0EA5E9' }}
              >
                {s.value}
              </p>
              <p className="text-xs text-[#64748B] uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── STORY SECTION: text left | image right ───────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="section-label mb-3">Our Story</p>
            <h2
              className="text-3xl md:text-4xl font-bold text-[#0F172A] leading-tight mb-6"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Independent AI coverage, built for the people building tomorrow.
            </h2>
            <p className="text-[#374151] leading-relaxed mb-5">
              AutoMatrix Labs started as a weekend project and grew into a trusted resource for thousands of AI practitioners. We cut through the noise and deliver the signal — tutorials that actually work, news that actually matters, and reviews that don&apos;t pull punches.
            </p>
            <p className="text-[#374151] leading-relaxed mb-8">
              Our mission: <strong className="text-[#0F172A]">Automate. Innovate. Scale.</strong> Every article is crafted to help you move faster with AI.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: '#0F172A' }}
            >
              Read Our Articles →
            </Link>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&h=600&fit=crop"
              alt="AI research and writing"
              width={800}
              height={600}
              className="w-full h-[420px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── MEET THE CREATOR ─────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="section-label mb-3">The Creator</p>
            <h2
              className="text-3xl md:text-4xl font-bold text-[#0F172A]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              The Person Behind AutoMatrix Labs
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* Profile card */}
            <div className="flex justify-center">
              <div
                className="w-72 rounded-2xl p-8 flex flex-col items-center gap-5 shadow-lg"
                style={{ background: '#0F172A' }}
              >
                {/* Avatar initial */}
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center text-4xl font-bold shrink-0"
                  style={{ background: 'rgba(14,165,233,0.15)', color: '#0EA5E9', fontFamily: 'var(--font-display)' }}
                >
                  B
                </div>
                <div className="text-center">
                  <p className="text-white font-bold text-lg" style={{ fontFamily: 'var(--font-display)' }}>Badreddine</p>
                  <p className="text-white/40 text-xs mt-1 uppercase tracking-widest">Founder · Writer</p>
                </div>
                {/* Divider */}
                <div className="w-full h-px bg-white/10" />
                {/* Expertise tags */}
                <div className="flex flex-wrap justify-center gap-2">
                  {['AI Tools', 'Automation', 'Tutorials', 'SEO', 'Content', 'Research'].map(tag => (
                    <span
                      key={tag}
                      className="text-[11px] font-medium px-3 py-1 rounded-full"
                      style={{ background: 'rgba(14,165,233,0.12)', color: '#7DD3FC' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {/* Accent line */}
                <div className="w-12 h-0.5 rounded-full" style={{ background: '#0EA5E9' }} />
                <p className="text-white/30 text-xs text-center leading-relaxed">
                  Building in public · Automating everything
                </p>
              </div>
            </div>
            {/* Bio */}
            <div>
              <p className="section-label mb-3">Founder & Writer</p>
              <h3
                className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-4"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Badreddine
              </h3>
              <p className="text-[#374151] leading-relaxed mb-5">
                I&apos;m an AI enthusiast, builder, and writer who started AutoMatrix Labs to share what I learn — clearly and honestly. I got tired of AI content that was either too shallow or too academic, so I built the publication I always wanted to read.
              </p>
              <p className="text-[#374151] leading-relaxed mb-8">
                Every article is researched, tested, and written by me. No filler, no fluff — just practical insights to help you work smarter with AI.
              </p>
              {/* Quote */}
              <blockquote className="border-l-4 pl-5 italic text-[#64748B]" style={{ borderColor: '#0EA5E9' }}>
                &ldquo;AI is the most powerful leverage available to anyone right now. My goal is to help you use it.&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION & VISION ─────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="section-label mb-3">What Drives Us</p>
            <h2
              className="text-3xl md:text-4xl font-bold text-[#0F172A]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Our Mission &amp; Vision
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {mission.map(m => (
              <div key={m.title}>
                <div className="w-10 h-0.5 mb-5" style={{ background: '#0EA5E9' }} />
                <h3
                  className="text-lg font-bold text-[#0F172A] mb-3"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {m.title}
                </h3>
                <p className="text-[#64748B] text-sm leading-relaxed">{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARTNERS ─────────────────────────────────────────────── */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 border-y border-gray-100">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-xs text-[#94a3b8] uppercase tracking-[0.2em] mb-8">
            Topics We Cover
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
            {partners.map(p => (
              <span key={p} className="text-[#94a3b8] font-semibold text-sm tracking-wide hover:text-[#0F172A] transition-colors cursor-default">
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── DARK CTA ─────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: '#0F172A' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="section-label mb-3" style={{ color: '#0EA5E9' }}>Work With Us</p>
            <h2
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Want to partner or advertise with us?
            </h2>
            <p className="text-white/50 text-sm leading-relaxed">
              We&apos;re open to partnerships, sponsored content, and tool reviews. If your product helps people work smarter with AI, let&apos;s talk.
            </p>
          </div>
          <div>
            <ul className="space-y-3 mb-8">
              {['Sponsored articles & reviews', 'Newsletter placements', 'Affiliate partnerships', 'Product launches & announcements'].map(item => (
                <li key={item} className="flex items-center gap-3 text-white/70 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#0EA5E9' }} />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ background: '#0EA5E9', color: '#fff' }}
            >
              Get in Touch →
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}

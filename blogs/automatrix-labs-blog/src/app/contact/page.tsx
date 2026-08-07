'use client'

import { useState } from 'react'
import Image from 'next/image'

const socials = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/automatrix.labs/',
    svg: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
  },
  {
    label: 'X',
    href: 'https://x.com',
    svg: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  },
  {
    label: 'Reddit',
    href: 'https://www.reddit.com/user/Living_Necessary_715/',
    svg: 'M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z',
  },
]

const infoCards = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    label: 'Email Us',
    value: 'automatrixlabs.ai@gmail.com',
    href: 'mailto:automatrixlabs.ai@gmail.com',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: 'Response Time',
    value: 'Usually within 24 hours',
    href: null,
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    label: 'Based In',
    value: 'Global — remote-first team',
    href: null,
  },
]

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO: full-width dark image ───────────────────────────── */}
      <section className="relative h-[55vh] min-h-[400px] flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=1600&h=900&fit=crop"
          alt="Contact AutoMatrix Labs"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-4">
          <p className="text-[#0EA5E9] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            Contact Us
          </p>
          <h1
            className="text-4xl md:text-6xl font-bold text-white leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Get in Touch
          </h1>
          <p className="mt-4 text-white/70 max-w-md mx-auto text-base">
            Automation projects, content partnerships, or just want to say hello — I&apos;m here.
          </p>
        </div>
      </section>

      {/* ── INFO CARDS ───────────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
          {infoCards.map(card => (
            <div key={card.label} className="py-10 px-8 flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'rgba(14,165,233,0.1)', color: '#0EA5E9' }}
              >
                {card.icon}
              </div>
              <div>
                <p className="text-xs text-[#94a3b8] uppercase tracking-widest mb-1">{card.label}</p>
                {card.href ? (
                  <a href={card.href} className="text-sm font-semibold text-[#0F172A] hover:text-[#0EA5E9] transition-colors">
                    {card.value}
                  </a>
                ) : (
                  <p className="text-sm font-semibold text-[#0F172A]">{card.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES STRIP ───────────────────────────────────────── */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC] border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="section-label mb-2">What I Do</p>
            <h2
              className="text-2xl md:text-3xl font-bold text-[#0F172A]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              AI Automation &amp; Content Services
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                title: 'Workflow Automation',
                desc: 'End-to-end automation pipelines built with n8n — connect your apps, eliminate manual tasks, and scale operations without code.',
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                ),
                title: 'AI Integration',
                desc: 'Plug LLMs (GPT-4, Claude, Gemini) into your existing tools via n8n to automate content, classification, and decision-making.',
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                ),
                title: 'Content Publishing',
                desc: 'Automated blog pipelines that research, write, review, and publish AI content on a schedule — with human oversight built in.',
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                  </svg>
                ),
                title: 'Custom n8n Workflows',
                desc: 'Bespoke n8n workflow design and deployment for lead generation, CRM sync, data processing, and reporting dashboards.',
              },
            ].map(s => (
              <div
                key={s.title}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: 'rgba(14,165,233,0.1)', color: '#0EA5E9' }}
                >
                  {s.icon}
                </div>
                <h3
                  className="text-sm font-bold text-[#0F172A] mb-2"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {s.title}
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORM + SIDE INFO ─────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-14 items-start">

          {/* Left: heading + social + image */}
          <div className="lg:col-span-2">
            <p className="section-label mb-3">Let&apos;s Build Together</p>
            <h2
              className="text-3xl md:text-4xl font-bold text-[#0F172A] leading-tight mb-5"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Have a project in mind?
            </h2>
            <p className="text-[#64748B] text-sm leading-relaxed mb-6">
              Whether you need a custom n8n automation workflow, an AI integration for your business, or want to discuss a content partnership — I&apos;d love to hear what you&apos;re working on.
            </p>

            {/* n8n badge */}
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-xl mb-8 border border-gray-100"
              style={{ background: 'rgba(14,165,233,0.05)' }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-black"
                style={{ background: '#0F172A', color: '#0EA5E9' }}
              >
                n8n
              </div>
              <div>
                <p className="text-xs font-semibold text-[#0F172A]">n8n Automation Specialist</p>
                <p className="text-[11px] text-[#94a3b8]">Workflow design · AI integration · Deployment</p>
              </div>
            </div>

            {/* Social */}
            <p className="text-xs text-[#94a3b8] uppercase tracking-[0.18em] mb-4">Follow</p>
            <div className="flex gap-3 mb-10">
              {socials.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-[#64748B] hover:text-[#0EA5E9] hover:border-[#0EA5E9]/50 transition-all"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d={s.svg} />
                  </svg>
                </a>
              ))}
            </div>

            {/* Decorative image */}
            <div className="rounded-2xl overflow-hidden hidden lg:block">
              <Image
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop"
                alt="Automation workspace"
                width={600}
                height={400}
                className="w-full h-52 object-cover"
              />
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-3 bg-[#F8FAFC] rounded-2xl p-8 border border-gray-100">
            {submitted ? (
              <div className="text-center py-16">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 text-2xl font-bold"
                  style={{ background: 'rgba(14,165,233,0.1)', color: '#0EA5E9' }}
                >
                  ✓
                </div>
                <h3
                  className="text-2xl font-bold text-[#0F172A] mb-2"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Message Sent!
                </h3>
                <p className="text-[#64748B] text-sm">We&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <>
                <h3
                  className="text-2xl font-bold text-[#0F172A] mb-6"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Send a Message
                </h3>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-[#64748B] uppercase tracking-widest mb-2">Name</label>
                      <input
                        required type="text" placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-[#0F172A] placeholder:text-[#94a3b8] text-sm focus:outline-none focus:border-[#0EA5E9] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#64748B] uppercase tracking-widest mb-2">Email</label>
                      <input
                        required type="email" placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-[#0F172A] placeholder:text-[#94a3b8] text-sm focus:outline-none focus:border-[#0EA5E9] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-[#64748B] uppercase tracking-widest mb-2">Subject</label>
                    <input
                      required type="text" placeholder="How can we help?"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-[#0F172A] placeholder:text-[#94a3b8] text-sm focus:outline-none focus:border-[#0EA5E9] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-[#64748B] uppercase tracking-widest mb-2">Message</label>
                    <textarea
                      required rows={6} placeholder="Tell us more about your inquiry..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-[#0F172A] placeholder:text-[#94a3b8] text-sm focus:outline-none focus:border-[#0EA5E9] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl font-semibold text-white text-sm transition-opacity hover:opacity-90"
                    style={{ background: '#0F172A' }}
                  >
                    Send Message →
                  </button>

                  <p className="text-xs text-[#94a3b8] text-center pt-1">
                    By submitting, you agree to our Privacy Policy. We never share your data.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── DARK CTA ─────────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ background: '#0F172A' }}>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: '#0EA5E9' }}>
            Stay Updated
          </p>
          <h2
            className="text-2xl md:text-3xl font-bold text-white mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Follow us for the latest AI content
          </h2>
          <p className="text-white/50 text-sm mb-8 max-w-md mx-auto">
            New articles, tool reviews, and tutorials — published every week.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {socials.map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white/80 hover:text-white border border-white/10 hover:border-white/30 transition-all"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d={s.svg} />
                </svg>
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

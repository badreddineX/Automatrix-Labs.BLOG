'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { LogoMark } from '@/components/LogoMark'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const textColor = scrolled ? '#0F172A' : '#ffffff'

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(255,255,255,0.97)' : 'transparent',
        boxShadow: scrolled ? '0 1px 0 rgba(0,0,0,0.07)' : 'none',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 font-bold text-lg shrink-0">
            <LogoMark size={34} badge={scrolled} />
            <span style={{ color: textColor, fontFamily: 'var(--font-display)' }}>
              AutoMatrix <span style={{ color: '#0EA5E9' }}>Labs</span>
            </span>
          </Link>

          {/* Desktop nav links — center */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(l => (
              <Link
                key={l.label}
                href={l.href}
                className="text-xs font-semibold uppercase tracking-[0.15em] transition-colors hover:opacity-70"
                style={{ color: textColor }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* CTA button */}
          <div className="hidden md:block">
            <Link
              href="/blog"
              className="text-sm font-semibold px-5 py-2.5 rounded-full transition-all hover:opacity-90"
              style={{ background: '#0F172A', color: '#ffffff' }}
            >
              Explore Now
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 transition-colors"
            style={{ color: textColor }}
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          {navLinks.map(l => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-[#0EA5E9] transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <div className="px-6 py-4 border-t border-gray-100">
            <Link
              href="/blog"
              className="block text-center text-sm font-semibold px-5 py-2.5 rounded-full"
              style={{ background: '#0F172A', color: '#ffffff' }}
            >
              Explore Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

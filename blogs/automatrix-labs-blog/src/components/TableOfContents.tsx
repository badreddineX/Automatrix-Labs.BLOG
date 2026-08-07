'use client'

import { useEffect, useRef, useState } from 'react'

interface Heading {
  id: string
  text: string
  level: number
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [active, setActive] = useState('')
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const els = document.querySelectorAll('article h2, article h3')
    const items: Heading[] = Array.from(els).map(el => ({
      id: el.id,
      text: el.textContent ?? '',
      level: Number(el.tagName[1]),
    }))
    setHeadings(items)

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) })
      },
      { rootMargin: '-80px 0px -60% 0px' }
    )
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Keep the active item scrolled into view within the TOC's own box as the
  // page scrolls, so a long heading list doesn't leave the current section
  // hidden below the fold of the sidebar.
  useEffect(() => {
    if (!active || !listRef.current) return
    const activeEl = listRef.current.querySelector<HTMLElement>(`[data-heading-id="${active}"]`)
    activeEl?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }, [active])

  if (headings.length === 0) return null

  return (
    <nav className="hidden xl:block sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#94a3b8] mb-4">On this page</p>
      <ul ref={listRef} className="space-y-2 border-l border-gray-100">
        {headings.map(h => (
          <li key={h.id} data-heading-id={h.id} style={{ paddingLeft: h.level === 3 ? '1.25rem' : '0.75rem' }}>
            <a
              href={`#${h.id}`}
              className="block text-xs leading-snug transition-colors py-0.5"
              style={{
                color: active === h.id ? '#0EA5E9' : '#94a3b8',
                fontWeight: active === h.id ? '600' : '400',
              }}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

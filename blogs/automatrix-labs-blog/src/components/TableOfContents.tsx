'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'

interface Heading {
  id: string
  text: string
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [active, setActive] = useState('')
  const [collapsed, setCollapsed] = useState(false)
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLHeadingElement>('article h2'))
    // The heading's own textContent includes the "01." number-prefix span
    // text (rendered as a sibling span inside the h2) — strip it so the TOC
    // doesn't show a doubled-up number like "1. 01.Title".
    const items: Heading[] = els.map(el => ({
      id: el.id,
      text: (el.textContent ?? '').replace(/^\d+\.\s*/, ''),
    }))
    setHeadings(items)

    // Continuous scroll-position check (matches the Canada blog) instead of
    // IntersectionObserver alone — IntersectionObserver only fires on
    // enter/exit, so on a tall section it can leave the wrong item marked
    // active for the whole time you're reading it. This walks every heading
    // on each scroll frame and picks the last one whose top has crossed 35%
    // of the viewport, so the highlighted item moves in step with whichever
    // subtitle's paragraph you're actually reading.
    function setActiveByScroll() {
      let activeIndex = -1
      for (let i = 0; i < els.length; i++) {
        const rect = els[i].getBoundingClientRect()
        if (rect.top <= window.innerHeight * 0.35) activeIndex = i
      }
      setActive(activeIndex >= 0 ? els[activeIndex].id : '')
    }

    setActiveByScroll()
    let rafId: number
    const onScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(setActiveByScroll)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  // Keep the active item visible within the TOC's own scroll box as the page
  // scrolls. Sets scrollTop directly on the box rather than calling
  // scrollIntoView on the item — scrollIntoView can hijack the whole page's
  // scroll position on some browsers, which is not what we want here.
  useEffect(() => {
    if (!active || !bodyRef.current) return
    const box = bodyRef.current
    const item = box.querySelector<HTMLElement>(`[data-heading-id="${active}"]`)
    if (!item) return
    const itemTop = item.offsetTop
    const itemBottom = itemTop + item.offsetHeight
    if (itemTop < box.scrollTop + 16) {
      box.scrollTop = itemTop - 16
    } else if (itemBottom > box.scrollTop + box.clientHeight - 16) {
      box.scrollTop = itemBottom - box.clientHeight + 16
    }
  }, [active])

  if (headings.length < 2) return null

  return (
    <div className="hidden xl:flex xl:flex-col gap-9 sticky top-24">
      {/* TOC widget card */}
      <div className="rounded-md border border-gray-200 overflow-hidden">
        <button
          type="button"
          onClick={() => setCollapsed(c => !c)}
          className="w-full flex items-center justify-between gap-3 px-5 py-4 select-none"
          style={{ background: '#0F172A' }}
        >
          <h2 className="text-white text-sm font-bold tracking-[0.1em] uppercase" style={{ fontFamily: 'var(--font-display)' }}>
            On This Page
          </h2>
          {collapsed ? <ChevronDown className="w-3.5 h-3.5 text-white shrink-0" /> : <ChevronUp className="w-3.5 h-3.5 text-white shrink-0" />}
        </button>

        <div
          ref={bodyRef}
          className="overflow-y-auto transition-[max-height] duration-300 ease-in-out border-t border-gray-100"
          style={{ maxHeight: collapsed ? 0 : 'min(560px, calc(100vh - 12rem))' }}
        >
          <ol className="list-none m-0 py-5 px-5">
            {headings.map((h, i) => (
              <li key={h.id} data-heading-id={h.id} className="mb-4 last:mb-0">
                <a
                  href={`#${h.id}`}
                  className="flex items-baseline gap-2.5 text-sm leading-snug transition-colors"
                  style={{
                    color: active === h.id ? '#0EA5E9' : '#374151',
                    fontWeight: active === h.id ? '600' : '400',
                  }}
                >
                  <span className="shrink-0 text-[#0F172A] text-sm">{i + 1}.</span>
                  <span className={active === h.id ? 'underline underline-offset-4' : ''}>{h.text}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* CTA card */}
      <div className="p-6 rounded-md" style={{ background: '#F8FAFC', borderTop: '2px solid #0EA5E9' }}>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-2.5" style={{ color: '#0EA5E9' }}>
          More Ideas
        </p>
        <p className="text-[13px] text-[#64748B] leading-relaxed mb-4">
          Browse all AI tutorials, tool reviews, and practical guides on AutoMatrix Labs.
        </p>
        <a
          href="/blog"
          className="block text-center text-xs font-semibold py-2.5 rounded-full transition-opacity hover:opacity-90"
          style={{ background: '#0F172A', color: '#fff' }}
        >
          Browse All Posts
        </a>
      </div>
    </div>
  )
}

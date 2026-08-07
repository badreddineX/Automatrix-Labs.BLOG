'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'

export function GiscusComments() {
  const ref = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    if (!ref.current) return

    // Remove any existing script
    const existing = ref.current.querySelector('script')
    if (existing) existing.remove()

    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.setAttribute('data-repo', 'badreddineX/ai-for-work-blog')
    script.setAttribute('data-repo-id', 'R_kgDOS-vNSQ')
    script.setAttribute('data-category', 'General')
    script.setAttribute('data-category-id', 'DIC_kwDOS-vNSc4C_jGb')
    script.setAttribute('data-mapping', 'pathname')
    script.setAttribute('data-strict', '0')
    script.setAttribute('data-reactions-enabled', '1')
    script.setAttribute('data-emit-metadata', '0')
    script.setAttribute('data-input-position', 'top')
    script.setAttribute('data-theme', resolvedTheme === 'dark' ? 'dark_dimmed' : 'light')
    script.setAttribute('data-lang', 'en')
    script.setAttribute('crossorigin', 'anonymous')
    script.async = true

    ref.current.appendChild(script)
  }, [resolvedTheme])

  return (
    <div className="mt-16 pt-10 border-t border-border">
      <h2 className="text-xl font-bold text-foreground mb-6">Leave a comment</h2>
      <div ref={ref} />
    </div>
  )
}

'use client'
import { useState, useRef } from 'react'

export function CopyCodeBlock({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) {
  const [copied, setCopied] = useState(false)
  const preRef = useRef<HTMLPreElement>(null)

  const handleCopy = () => {
    const text = preRef.current?.textContent ?? ''
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group my-6">
      <pre
        ref={preRef}
        className="overflow-x-auto rounded-xl text-sm"
        {...props}
      >
        {children}
      </pre>
      <button
        onClick={handleCopy}
        aria-label="Copy code"
        className="absolute top-3 right-3 text-xs px-2.5 py-1 rounded-md font-medium transition-all duration-150 opacity-0 group-hover:opacity-100 focus:opacity-100"
        style={{ background: copied ? '#22c55e' : '#334155', color: '#fff' }}
      >
        {copied ? '✓ Copied' : 'Copy'}
      </button>
    </div>
  )
}

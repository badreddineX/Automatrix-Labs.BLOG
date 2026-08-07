'use client'
import { useState } from 'react'

interface Props {
  title?: string
  subtitle?: string
}

export function EmailCapture({
  title = "Get the exact prompts I use — free",
  subtitle = "Join builders getting weekly AI workflows and prompt templates.",
}: Props) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    window.location.href = `mailto:badreddinekx122@gmail.com?subject=Subscribe: AutoMatrix Labs Prompts&body=Please subscribe this email: ${email}`
    setSubmitted(true)
  }

  return (
    <div className="my-8 p-6 rounded-2xl not-prose" style={{ background: '#0F172A' }}>
      <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#0EA5E9' }}>
        Free Resource
      </p>
      <h4 className="text-white font-bold text-lg mb-1" style={{ fontFamily: 'var(--font-display)' }}>
        {title}
      </h4>
      <p className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.5)' }}>{subtitle}</p>

      {submitted ? (
        <p className="font-semibold text-sm" style={{ color: '#22c55e' }}>
          ✅ Done! Check your email inbox.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2 flex-wrap">
          <input
            type="email"
            required
            placeholder="your@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="flex-1 min-w-0 px-4 py-2.5 rounded-xl text-sm focus:outline-none"
            style={{
              background: 'rgba(255,255,255,0.08)',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl text-sm font-bold transition-opacity hover:opacity-90 whitespace-nowrap"
            style={{ background: '#0EA5E9', color: '#fff' }}
          >
            Get Free Prompts →
          </button>
        </form>
      )}
    </div>
  )
}

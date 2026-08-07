'use client'

import { useState } from 'react'

export function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="font-mono text-sm" style={{ color: '#00E5FF' }}>
        <span style={{ opacity: 0.5 }}>&gt;_ </span>
        subscribed. welcome to the matrix.
        <span className="animate-pulse ml-1">▊</span>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
      <div
        className="flex-1 flex items-center rounded-lg overflow-hidden"
        style={{ border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.03)' }}
      >
        <span className="font-mono px-3 text-sm select-none whitespace-nowrap" style={{ color: '#00E5FF' }}>&gt;_</span>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="flex-1 bg-transparent font-mono text-sm text-white outline-none py-3 pr-3"
          style={{ '::placeholder': { color: 'rgba(255,255,255,0.2)' } } as React.CSSProperties}
        />
      </div>
      <button
        type="submit"
        className="px-5 py-3 font-mono font-bold text-sm rounded-lg whitespace-nowrap transition-colors duration-200"
        style={{ backgroundColor: '#00E5FF', color: '#000' }}
      >
        subscribe
      </button>
    </form>
  )
}

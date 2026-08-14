interface RatingProps {
  label: string
  score: number
  max?: number
}

export function Rating({ label, score, max = 10 }: RatingProps) {
  const pct = Math.min((score / max) * 100, 100)
  const color =
    pct >= 80 ? '#22c55e' : pct >= 60 ? '#0EA5E9' : pct >= 40 ? '#f59e0b' : '#ef4444'

  return (
    <div className="my-3">
      <div className="flex justify-between items-center mb-1.5 text-sm">
        <span className="font-medium text-[#374151]">{label}</span>
        <span className="font-bold text-[#0F172A]">
          {score}/{max}
        </span>
      </div>
      <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-2.5 rounded-full"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
    </div>
  )
}

interface RatingCardProps {
  tool: string
  ratings: Array<{ label: string; score: number; max?: number }>
  verdict: string
}

export function RatingCard({ tool, ratings, verdict }: RatingCardProps) {
  const avg = ratings.reduce((s, r) => s + r.score / (r.max ?? 10), 0) / ratings.length
  const overall = Math.round(avg * 10)

  return (
    <div className="my-8 p-6 rounded-2xl border border-gray-100 bg-[#F8FAFC]">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h4 className="font-bold text-[#0F172A] text-base">{tool} — Ratings</h4>
        <span
          className="text-sm font-bold px-3 py-1 rounded-full"
          style={{ background: 'rgba(14,165,233,0.1)', color: '#0EA5E9' }}
        >
          Overall: {overall}/10
        </span>
      </div>
      {ratings.map(r => (
        <Rating key={r.label} {...r} />
      ))}
      <p className="mt-4 text-sm text-[#64748B] border-t border-gray-100 pt-4">
        <strong className="text-[#0F172A]">Verdict:</strong> {verdict}
      </p>
    </div>
  )
}

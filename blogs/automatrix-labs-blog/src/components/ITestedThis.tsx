interface Props {
  tool?: string
  children: React.ReactNode
}

export function ITestedThis({ tool, children }: Props) {
  return (
    <div
      className="my-8 rounded-2xl overflow-hidden not-prose"
      style={{ border: '1px solid rgba(14,165,233,0.25)' }}
    >
      <div
        className="flex items-center gap-2 px-5 py-3 text-sm font-bold"
        style={{ background: 'rgba(14,165,233,0.08)', color: '#0EA5E9' }}
      >
        <span>🧪</span>
        <span>I Tested This{tool ? ` — ${tool}` : ''}</span>
        <span
          className="ml-auto text-xs px-2 py-0.5 rounded-full font-semibold"
          style={{ background: 'rgba(14,165,233,0.15)', color: '#0EA5E9' }}
        >
          Real Output
        </span>
      </div>
      <div className="px-5 py-4 text-sm text-[#374151] leading-relaxed prose prose-sm max-w-none
        prose-pre:!bg-[#0F172A] prose-pre:!text-[#e2e8f0] prose-pre:text-xs prose-pre:rounded-lg">
        {children}
      </div>
    </div>
  )
}

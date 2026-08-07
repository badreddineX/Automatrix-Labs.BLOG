'use client'
import { useState } from 'react'

interface Props {
  taskName?: string
  savingPercent?: number
}

export function TimeSavedCalculator({ taskName = 'this task', savingPercent = 70 }: Props) {
  const [hours, setHours] = useState(5)

  const saved = (hours * savingPercent) / 100
  const remaining = hours - saved
  const yearlyHours = Math.round(saved * 52)
  const workdays = Math.round(yearlyHours / 8)

  return (
    <div className="my-8 p-6 rounded-2xl border border-[#0EA5E9]/20 bg-[#F0F9FF]">
      <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: '#0EA5E9' }}>
        Interactive Tool
      </p>
      <h4 className="font-bold text-[#0F172A] text-base mb-4">⏱ Time Saved Calculator</h4>

      <div className="mb-5">
        <label className="text-sm text-[#64748B] mb-2 block">
          Hours/week you currently spend on <strong>{taskName}</strong>:
        </label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min={1}
            max={40}
            value={hours}
            onChange={e => setHours(parseInt(e.target.value))}
            className="flex-1 accent-[#0EA5E9]"
          />
          <span className="text-lg font-bold text-[#0F172A] w-16 text-right shrink-0">
            {hours}h/wk
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="bg-white rounded-xl p-3 border border-gray-100">
          <p className="text-2xl font-bold" style={{ color: '#ef4444' }}>{hours}h</p>
          <p className="text-xs text-[#64748B] mt-1">Without AI</p>
        </div>
        <div className="bg-white rounded-xl p-3 border border-gray-100">
          <p className="text-2xl font-bold" style={{ color: '#0EA5E9' }}>{remaining.toFixed(1)}h</p>
          <p className="text-xs text-[#64748B] mt-1">With AI</p>
        </div>
        <div className="bg-white rounded-xl p-3 border border-gray-100">
          <p className="text-2xl font-bold" style={{ color: '#22c55e' }}>{saved.toFixed(1)}h</p>
          <p className="text-xs text-[#64748B] mt-1">Saved/week</p>
        </div>
      </div>

      <p className="text-center text-xs text-[#64748B] mt-4">
        That&apos;s <strong className="text-[#0F172A]">{yearlyHours} hours saved per year</strong> —
        equivalent to <strong className="text-[#0F172A]">{workdays} full workdays</strong>.
      </p>
    </div>
  )
}

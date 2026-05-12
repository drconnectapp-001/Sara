'use client'

import { AlertTriangle } from 'lucide-react'
import type { MistakeSummaryRow } from './types'
import { cn } from './cn'

interface WeakConceptsCardProps {
  rows: MistakeSummaryRow[]
  className?: string
}

export function WeakConceptsCard({ rows, className }: WeakConceptsCardProps) {
  const maxErrors = rows.reduce((m, r) => Math.max(m, r.errors), 0) || 1

  return (
    <div
      className={cn(
        'flex flex-col rounded-2xl border border-white/[0.08] bg-[#161626]/90 p-5 shadow-lg ring-1 ring-white/[0.04]',
        className
      )}
    >
      <div className="mb-4 flex items-center gap-2">
        <AlertTriangle className="h-4 w-4 text-amber-400/90" strokeWidth={2} />
        <div>
          <h2 className="text-base font-semibold text-white">Top weak concepts</h2>
          <p className="text-xs text-slate-500">From mistake patterns (top 5)</p>
        </div>
      </div>
      <ul className="space-y-3">
        {rows.length === 0 ? (
          <li className="rounded-xl border border-dashed border-white/10 bg-[#0a0a12]/50 py-8 text-center text-sm text-slate-500">
            No mistake data yet. Keep practicing — patterns will show up here.
          </li>
        ) : (
          rows.map((r, i) => (
            <li key={r.concept} className="rounded-xl border border-white/[0.06] bg-[#0a0a12]/60 p-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-medium text-indigo-300/80">#{i + 1}</span>
                <span className="text-xs tabular-nums text-amber-200/80">{r.errors} errors</span>
              </div>
              <p className="mt-1 text-sm font-medium text-slate-100">{r.concept}</p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-600/90 to-rose-500/80"
                  style={{ width: `${Math.max(8, (r.errors / maxErrors) * 100)}%` }}
                />
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

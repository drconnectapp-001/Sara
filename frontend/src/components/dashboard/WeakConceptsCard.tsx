'use client'

import { AlertTriangle } from 'lucide-react'
import type { MistakeSummaryRow } from './types'
import { cn } from './cn'
import { glassCard, glassCardInner } from './dashboardTheme'

interface WeakConceptsCardProps {
  rows: MistakeSummaryRow[]
  className?: string
}

export function WeakConceptsCard({ rows, className }: WeakConceptsCardProps) {
  const maxErrors = rows.reduce((m, r) => Math.max(m, r.errors), 0) || 1

  return (
    <div className={cn('flex flex-col p-5', glassCard, className)}>
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100/90 text-amber-700 shadow-sm ring-1 ring-amber-200/80">
          <AlertTriangle className="h-4 w-4" strokeWidth={2} />
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-900">Top weak concepts</h2>
          <p className="text-xs font-medium text-slate-500">From mistake patterns (top 5)</p>
        </div>
      </div>
      <ul className="space-y-3">
        {rows.length === 0 ? (
          <li
            className={cn(
              'border border-dashed border-sky-200/90 bg-sky-50/50 py-8 text-center text-sm font-medium text-slate-500 backdrop-blur-sm',
              'rounded-xl'
            )}
          >
            No mistake data yet. Keep practicing — patterns will show up here.
          </li>
        ) : (
          rows.map((r, i) => (
            <li
              key={r.concept}
              className={cn('border border-white/50 p-3 shadow-sm', glassCardInner)}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-[#6366F1]">#{i + 1}</span>
                <span className="text-xs font-semibold tabular-nums text-amber-800/90">
                  {r.errors} errors
                </span>
              </div>
              <p className="mt-1 text-sm font-semibold text-slate-800">{r.concept}</p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-sky-100/80">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#3B82F6] to-amber-400"
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

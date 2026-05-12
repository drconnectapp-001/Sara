'use client'

import { Crosshair } from 'lucide-react'
import type { ConceptAccuracyRow } from './types'
import { cn } from './cn'
import { glassCard, glassCardInner } from './dashboardTheme'

interface ConceptAccuracyPanelProps {
  rows: ConceptAccuracyRow[]
  className?: string
  maxRows?: number
}

export function ConceptAccuracyPanel({ rows, className, maxRows = 12 }: ConceptAccuracyPanelProps) {
  const display = rows.slice(0, maxRows)

  return (
    <div className={cn('flex flex-col p-5', glassCard, className)}>
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-100/90 text-[#6366F1] shadow-sm ring-1 ring-indigo-200/80">
          <Crosshair className="h-4 w-4" strokeWidth={2} />
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-900">Concept accuracy</h2>
          <p className="text-xs font-medium text-slate-500">Practice performance · lowest first</p>
        </div>
      </div>
      <div className={cn('max-h-[340px] overflow-auto', glassCardInner)}>
        <table className="w-full text-left text-sm">
          <thead className="sticky top-0 z-[1] border-b border-white/40 bg-white/65 backdrop-blur-md">
            <tr className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              <th className="px-3 py-2.5">Concept</th>
              <th className="px-3 py-2.5">Subject</th>
              <th className="px-3 py-2.5 text-right">Acc.</th>
              <th className="px-3 py-2.5 text-right">N</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sky-100/80">
            {display.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-3 py-10 text-center font-medium text-slate-500">
                  No practice attempts recorded yet.
                </td>
              </tr>
            ) : (
              display.map((r) => (
                <tr
                  key={`${r.subject}-${r.concept}`}
                  className="bg-white/20 transition-colors hover:bg-sky-50/70"
                >
                  <td
                    className="max-w-[160px] truncate px-3 py-2.5 font-semibold text-slate-800"
                    title={r.concept}
                  >
                    {r.concept}
                  </td>
                  <td className="whitespace-nowrap px-3 py-2.5 text-slate-600">{r.subject}</td>
                  <td className="px-3 py-2.5 text-right tabular-nums">
                    <span
                      className={cn(
                        'font-bold',
                        r.accuracy >= 75
                          ? 'text-emerald-600'
                          : r.accuracy >= 50
                            ? 'text-amber-700'
                            : 'text-rose-600'
                      )}
                    >
                      {r.accuracy}%
                    </span>
                  </td>
                  <td className="px-3 py-2.5 text-right tabular-nums text-slate-500">{r.total}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {rows.length > maxRows ? (
        <p className="mt-2 text-center text-[11px] font-medium text-slate-400">
          Showing {maxRows} of {rows.length} concepts
        </p>
      ) : null}
    </div>
  )
}

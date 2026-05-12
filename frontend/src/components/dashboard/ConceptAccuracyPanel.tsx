'use client'

import { Crosshair } from 'lucide-react'
import type { ConceptAccuracyRow } from './types'
import { cn } from './cn'

interface ConceptAccuracyPanelProps {
  rows: ConceptAccuracyRow[]
  className?: string
  maxRows?: number
}

export function ConceptAccuracyPanel({ rows, className, maxRows = 12 }: ConceptAccuracyPanelProps) {
  const display = rows.slice(0, maxRows)

  return (
    <div
      className={cn(
        'flex flex-col rounded-2xl border border-white/[0.08] bg-[#161626]/90 p-5 shadow-lg ring-1 ring-white/[0.04]',
        className
      )}
    >
      <div className="mb-4 flex items-center gap-2">
        <Crosshair className="h-4 w-4 text-violet-400/90" strokeWidth={2} />
        <div>
          <h2 className="text-base font-semibold text-white">Concept accuracy</h2>
          <p className="text-xs text-slate-500">Practice performance · lowest first</p>
        </div>
      </div>
      <div className="max-h-[340px] overflow-auto rounded-xl border border-white/[0.06]">
        <table className="w-full text-left text-sm">
          <thead className="sticky top-0 z-[1] bg-[#12121c]/95 backdrop-blur-sm">
            <tr className="border-b border-white/[0.08] text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              <th className="px-3 py-2.5">Concept</th>
              <th className="px-3 py-2.5">Subject</th>
              <th className="px-3 py-2.5 text-right">Acc.</th>
              <th className="px-3 py-2.5 text-right">N</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.05]">
            {display.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-3 py-10 text-center text-slate-500">
                  No practice attempts recorded yet.
                </td>
              </tr>
            ) : (
              display.map((r) => (
                <tr key={`${r.subject}-${r.concept}`} className="bg-[#0a0a12]/40 hover:bg-white/[0.03]">
                  <td className="max-w-[160px] truncate px-3 py-2.5 font-medium text-slate-200" title={r.concept}>
                    {r.concept}
                  </td>
                  <td className="whitespace-nowrap px-3 py-2.5 text-slate-400">{r.subject}</td>
                  <td className="px-3 py-2.5 text-right tabular-nums">
                    <span
                      className={cn(
                        'font-semibold',
                        r.accuracy >= 75
                          ? 'text-emerald-300/90'
                          : r.accuracy >= 50
                            ? 'text-amber-200/90'
                            : 'text-rose-300/90'
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
        <p className="mt-2 text-center text-[11px] text-slate-600">Showing {maxRows} of {rows.length} concepts</p>
      ) : null}
    </div>
  )
}

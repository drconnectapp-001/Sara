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
    <div className={cn('sara-dashboard-section-card', glassCard, className)}>
      <div className="sara-dashboard-card-head">
        <div className="sara-dashboard-icon-badge sara-dashboard-icon-badge--amber" aria-hidden>
          <AlertTriangle className="h-4 w-4" strokeWidth={2} />
        </div>
        <div>
          <h2 className="sara-chart-card-title">Top weak concepts</h2>
          <p className="sara-chart-card-sub">From mistake patterns (top 5)</p>
        </div>
      </div>
      <ul className="sara-weak-list">
        {rows.length === 0 ? (
          <li className="sara-weak-empty">No mistake data yet. Keep practicing — patterns will show up here.</li>
        ) : (
          rows.map((r, i) => (
            <li key={r.concept} className={cn('sara-weak-item', glassCardInner)}>
              <div className="sara-weak-item-top">
                <span className="sara-weak-rank">#{i + 1}</span>
                <span className="sara-weak-count">{r.errors} errors</span>
              </div>
              <p className="sara-weak-concept-title">{r.concept}</p>
              <div className="sara-weak-bar-track">
                <div
                  className="sara-weak-bar-fill"
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

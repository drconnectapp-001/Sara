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

function pctClass(accuracy: number): string {
  if (accuracy >= 75) return 'sara-acc-pct sara-acc-pct--high'
  if (accuracy >= 50) return 'sara-acc-pct sara-acc-pct--mid'
  return 'sara-acc-pct sara-acc-pct--low'
}

export function ConceptAccuracyPanel({ rows, className, maxRows = 12 }: ConceptAccuracyPanelProps) {
  const display = rows.slice(0, maxRows)

  return (
    <div className={cn('sara-dashboard-section-card', glassCard, className)}>
      <div className="sara-dashboard-card-head">
        <div className="sara-dashboard-icon-badge sara-dashboard-icon-badge--indigo" aria-hidden>
          <Crosshair className="h-4 w-4" strokeWidth={2} />
        </div>
        <div>
          <h2 className="sara-chart-card-title">Concept accuracy</h2>
          <p className="sara-chart-card-sub">Practice performance · lowest first</p>
        </div>
      </div>
      <div className={cn('sara-acc-table-wrap', glassCardInner)}>
        <table className="sara-acc-table">
          <thead>
            <tr>
              <th>Concept</th>
              <th>Subject</th>
              <th style={{ textAlign: 'right' }}>Acc.</th>
              <th style={{ textAlign: 'right' }}>N</th>
            </tr>
          </thead>
          <tbody>
            {display.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center', padding: '2.5rem 1rem', color: '#64748b' }}>
                  No practice attempts recorded yet.
                </td>
              </tr>
            ) : (
              display.map((r) => (
                <tr key={`${r.subject}-${r.concept}`}>
                  <td className="sara-acc-concept" title={r.concept}>
                    {r.concept}
                  </td>
                  <td style={{ color: '#475569', whiteSpace: 'nowrap' }}>{r.subject}</td>
                  <td style={{ textAlign: 'right' }}>
                    <span className={pctClass(r.accuracy)}>{r.accuracy}%</span>
                  </td>
                  <td className="sara-acc-n" style={{ textAlign: 'right' }}>
                    {r.total}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {rows.length > maxRows ? (
        <p style={{ marginTop: '0.5rem', textAlign: 'center', fontSize: 11, fontWeight: 600, color: '#94a3b8' }}>
          Showing {maxRows} of {rows.length} concepts
        </p>
      ) : null}
    </div>
  )
}

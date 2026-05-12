'use client'

import { useCallback, useEffect, useState } from 'react'
import { BookOpen, CheckCircle2, XCircle, RotateCcw } from 'lucide-react'

interface Concept {
  concept: string
  subject: string
}

interface AccuracyRow {
  concept: string
  subject: string
  correct: number
  total: number
  accuracy: number
}

const SUBJECT_COLORS: Record<string, string> = {
  physics:   'sara-badge--blue',
  chemistry: 'sara-badge--indigo',
  math:      'sara-badge--sky',
  mathematics: 'sara-badge--sky',
}

function subjectBadgeClass(subject: string) {
  return SUBJECT_COLORS[subject.toLowerCase()] ?? 'sara-badge--indigo'
}

export default function PracticePage() {
  const [concepts, setConcepts]   = useState<Concept[]>([])
  const [accuracy, setAccuracy]   = useState<Record<string, AccuracyRow>>({})
  const [loading, setLoading]     = useState(true)
  const [logging, setLogging]     = useState<string | null>(null)
  const [feedback, setFeedback]   = useState<Record<string, 'correct' | 'wrong'>>({})
  const [filter, setFilter]       = useState<string>('all')

  const loadAccuracy = useCallback(async () => {
    const res = await fetch('/api/practice/accuracy', { cache: 'no-store' })
    if (!res.ok) return
    const rows: AccuracyRow[] = await res.json()
    const map: Record<string, AccuracyRow> = {}
    rows.forEach(r => { map[r.concept] = r })
    setAccuracy(map)
  }, [])

  useEffect(() => {
    async function init() {
      const [conceptsRes] = await Promise.all([
        fetch('/api/practice/', { cache: 'no-store' }),
        loadAccuracy(),
      ])
      if (conceptsRes.ok) setConcepts(await conceptsRes.json())
      setLoading(false)
    }
    void init()
  }, [loadAccuracy])

  async function logAttempt(concept: string, subject: string, correct: boolean) {
    setLogging(concept)
    try {
      await fetch('/api/practice/attempt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ concept_name: concept, subject, is_correct: correct }),
      })
      setFeedback(prev => ({ ...prev, [concept]: correct ? 'correct' : 'wrong' }))
      await loadAccuracy()
      setTimeout(() => {
        setFeedback(prev => {
          const next = { ...prev }
          delete next[concept]
          return next
        })
      }, 2000)
    } finally {
      setLogging(null)
    }
  }

  const subjects = ['all', ...Array.from(new Set(concepts.map(c => c.subject)))]
  const displayed = filter === 'all' ? concepts : concepts.filter(c => c.subject === filter)

  return (
    <div className="sara-page">
      <div className="sara-page-heading">
        <div className="sara-page-heading-icon" aria-hidden>
          <BookOpen className="h-5 w-5" strokeWidth={1.85} />
        </div>
        <div>
          <h1 className="sara-page-title">Practice</h1>
          <p className="sara-page-subtitle">Log correct and wrong attempts — accuracy updates live</p>
        </div>
      </div>

      {/* Subject filter */}
      <div className="sara-filter-row">
        {subjects.map(s => (
          <button
            key={s}
            type="button"
            onClick={() => setFilter(s)}
            className={`sara-filter-btn${filter === s ? ' sara-filter-btn--active' : ''}`}
          >
            {s === 'all' ? 'All subjects' : s}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="sara-loading-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="sara-skeleton-card" />
          ))}
        </div>
      ) : displayed.length === 0 ? (
        <div className="sara-empty-state">
          <p>No concepts found. Run the wiki ingest worker to populate the knowledge base.</p>
        </div>
      ) : (
        <div className="sara-concept-grid">
          {displayed.map(c => {
            const acc = accuracy[c.concept]
            const fb = feedback[c.concept]
            const busy = logging === c.concept

            return (
              <div
                key={`${c.subject}-${c.concept}`}
                className={`sara-concept-card${fb === 'correct' ? ' sara-concept-card--correct' : fb === 'wrong' ? ' sara-concept-card--wrong' : ''}`}
              >
                <div className="sara-concept-card-top">
                  <span className={`sara-badge ${subjectBadgeClass(c.subject)}`}>
                    {c.subject}
                  </span>
                  {acc && (
                    <span className={`sara-acc-chip${acc.accuracy >= 75 ? ' sara-acc-chip--high' : acc.accuracy >= 50 ? ' sara-acc-chip--mid' : ' sara-acc-chip--low'}`}>
                      {acc.accuracy}%
                    </span>
                  )}
                </div>

                <p className="sara-concept-card-name">{c.concept}</p>

                {acc ? (
                  <div className="sara-concept-acc-row">
                    <div className="sara-concept-bar-track">
                      <div
                        className="sara-concept-bar-fill"
                        style={{ width: `${acc.accuracy}%` }}
                      />
                    </div>
                    <span className="sara-concept-acc-label">
                      {acc.correct}/{acc.total} correct
                    </span>
                  </div>
                ) : (
                  <p className="sara-concept-not-practiced">Not practiced yet</p>
                )}

                {fb ? (
                  <div className={`sara-concept-feedback${fb === 'correct' ? ' sara-concept-feedback--correct' : ' sara-concept-feedback--wrong'}`}>
                    {fb === 'correct' ? '✓ Logged as correct' : '✗ Logged as wrong'}
                  </div>
                ) : (
                  <div className="sara-concept-actions">
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => logAttempt(c.concept, c.subject, true)}
                      className="sara-btn-correct"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2} />
                      Got it
                    </button>
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => logAttempt(c.concept, c.subject, false)}
                      className="sara-btn-wrong"
                    >
                      <XCircle className="h-3.5 w-3.5" strokeWidth={2} />
                      Missed
                    </button>
                    {busy && (
                      <RotateCcw className="h-3.5 w-3.5 animate-spin text-slate-400" />
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

'use client'

import { useCallback, useEffect, useState } from 'react'
import { Target, TrendingUp, CheckCircle2 } from 'lucide-react'

interface MockScore {
  score: number
  physics_score:   number | null
  chemistry_score: number | null
  math_score:      number | null
  attempted:       number | null
  correct:         number | null
  test_type:       string
  taken_at:        string
}

interface FormState {
  score:           string
  physics_score:   string
  chemistry_score: string
  math_score:      string
  test_type:       string
}

const emptyForm: FormState = {
  score: '', physics_score: '', chemistry_score: '',
  math_score: '', test_type: 'full_mock',
}

function fmtDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric',
    })
  } catch { return iso }
}

export default function MockPage() {
  const [mocks, setMocks]       = useState<MockScore[]>([])
  const [form, setForm]         = useState<FormState>(emptyForm)
  const [submitting, setSubmit] = useState(false)
  const [success, setSuccess]   = useState(false)
  const [error, setError]       = useState('')

  const loadMocks = useCallback(async () => {
    const res = await fetch('/api/mock/', { cache: 'no-store' })
    if (res.ok) setMocks(await res.json())
  }, [])

  useEffect(() => { void loadMocks() }, [loadMocks])

  function field(key: keyof FormState, value: string) {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    const total = parseInt(form.score)
    if (!form.score || isNaN(total)) { setError('Total score is required.'); return }
    setError('')
    setSubmit(true)
    try {
      const res = await fetch('/api/mock/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          score:           total,
          physics_score:   form.physics_score   ? parseInt(form.physics_score)   : null,
          chemistry_score: form.chemistry_score ? parseInt(form.chemistry_score) : null,
          math_score:      form.math_score      ? parseInt(form.math_score)      : null,
          test_type:       form.test_type,
        }),
      })
      if (!res.ok) throw new Error('API error')
      setForm(emptyForm)
      setSuccess(true)
      await loadMocks()
      setTimeout(() => setSuccess(false), 3500)
    } catch {
      setError('Could not save. Check that the API is running.')
    } finally {
      setSubmit(false)
    }
  }

  const best  = mocks.length ? Math.max(...mocks.map(m => m.score)) : null
  const latest = mocks[0]?.score ?? null

  return (
    <div className="sara-page">
      <div className="sara-page-heading">
        <div className="sara-page-heading-icon" aria-hidden>
          <Target className="h-5 w-5" strokeWidth={1.85} />
        </div>
        <div>
          <h1 className="sara-page-title">Log a Mock</h1>
          <p className="sara-page-subtitle">Record your test scores — they drive the trend chart on the dashboard</p>
        </div>
      </div>

      <div className="sara-mock-layout">
        {/* Form */}
        <div className="sara-dashboard-glass sara-mock-form-card">
          <h2 className="sara-mock-form-title">New mock result</h2>

          {success && (
            <div className="sara-success-bar">
              <CheckCircle2 className="h-4 w-4" strokeWidth={2} />
              Score logged — dashboard will update.
            </div>
          )}
          {error && <p className="sara-form-error">{error}</p>}

          <form onSubmit={submit} className="sara-mock-form">
            <div className="sara-form-row-3">
              <div className="sara-form-group">
                <label className="sara-form-label" htmlFor="score">
                  Total score <span className="sara-required">*</span>
                </label>
                <input
                  id="score"
                  type="number"
                  min={0}
                  max={360}
                  placeholder="e.g. 180"
                  value={form.score}
                  onChange={e => field('score', e.target.value)}
                  className="sara-form-input"
                  required
                />
              </div>
              <div className="sara-form-group">
                <label className="sara-form-label" htmlFor="phy">Physics</label>
                <input
                  id="phy"
                  type="number"
                  min={0}
                  max={120}
                  placeholder="e.g. 60"
                  value={form.physics_score}
                  onChange={e => field('physics_score', e.target.value)}
                  className="sara-form-input"
                />
              </div>
              <div className="sara-form-group">
                <label className="sara-form-label" htmlFor="chem">Chemistry</label>
                <input
                  id="chem"
                  type="number"
                  min={0}
                  max={120}
                  placeholder="e.g. 60"
                  value={form.chemistry_score}
                  onChange={e => field('chemistry_score', e.target.value)}
                  className="sara-form-input"
                />
              </div>
              <div className="sara-form-group">
                <label className="sara-form-label" htmlFor="math">Mathematics</label>
                <input
                  id="math"
                  type="number"
                  min={0}
                  max={120}
                  placeholder="e.g. 60"
                  value={form.math_score}
                  onChange={e => field('math_score', e.target.value)}
                  className="sara-form-input"
                />
              </div>
              <div className="sara-form-group">
                <label className="sara-form-label" htmlFor="type">Test type</label>
                <select
                  id="type"
                  value={form.test_type}
                  onChange={e => field('test_type', e.target.value)}
                  className="sara-form-input"
                >
                  <option value="full_mock">Full Mock</option>
                  <option value="subject_test">Subject Test</option>
                  <option value="chapter_test">Chapter Test</option>
                  <option value="pyq">PYQ Paper</option>
                </select>
              </div>
            </div>

            <button type="submit" disabled={submitting} className="sara-submit-btn">
              {submitting ? 'Saving…' : 'Save result'}
            </button>
          </form>
        </div>

        {/* Stats strip */}
        {mocks.length > 0 && (
          <div className="sara-mock-stats-row">
            <div className="sara-dashboard-glass sara-mock-stat">
              <p className="sara-mock-stat-label">Latest</p>
              <p className="sara-mock-stat-value">{latest}</p>
              <p className="sara-mock-stat-sub">/ 360</p>
            </div>
            <div className="sara-dashboard-glass sara-mock-stat">
              <p className="sara-mock-stat-label">Best</p>
              <p className="sara-mock-stat-value">{best}</p>
              <p className="sara-mock-stat-sub">/ 360</p>
            </div>
            <div className="sara-dashboard-glass sara-mock-stat">
              <p className="sara-mock-stat-label">Mocks taken</p>
              <p className="sara-mock-stat-value">{mocks.length}</p>
              <p className="sara-mock-stat-sub">total</p>
            </div>
          </div>
        )}

        {/* History table */}
        {mocks.length > 0 && (
          <div className="sara-dashboard-glass sara-mock-table-card">
            <div className="sara-mock-table-head">
              <TrendingUp className="h-4 w-4" style={{ color: '#3b82f6' }} strokeWidth={2} />
              <h2 className="sara-mock-form-title" style={{ margin: 0 }}>History</h2>
            </div>
            <div className="sara-mock-table-wrap">
              <table className="sara-mock-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th style={{ textAlign: 'right' }}>Total</th>
                    <th style={{ textAlign: 'right' }}>Phy</th>
                    <th style={{ textAlign: 'right' }}>Chem</th>
                    <th style={{ textAlign: 'right' }}>Math</th>
                  </tr>
                </thead>
                <tbody>
                  {mocks.map((m, i) => (
                    <tr key={i}>
                      <td>{fmtDate(m.taken_at)}</td>
                      <td style={{ textTransform: 'capitalize' }}>
                        {m.test_type.replace(/_/g, ' ')}
                      </td>
                      <td style={{ textAlign: 'right', fontWeight: 800, color: '#1e40af' }}>
                        {m.score}
                      </td>
                      <td style={{ textAlign: 'right', color: '#475569' }}>
                        {m.physics_score ?? '—'}
                      </td>
                      <td style={{ textAlign: 'right', color: '#475569' }}>
                        {m.chemistry_score ?? '—'}
                      </td>
                      <td style={{ textAlign: 'right', color: '#475569' }}>
                        {m.math_score ?? '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {mocks.length === 0 && !submitting && (
          <div className="sara-empty-state">
            <Target className="h-8 w-8" style={{ color: '#cbd5e1', marginBottom: '0.5rem' }} strokeWidth={1.5} />
            <p>No mock scores yet. Log your first result above.</p>
          </div>
        )}
      </div>
    </div>
  )
}

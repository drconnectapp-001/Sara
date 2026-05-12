'use client'

import { DashboardHero } from '@/components/dashboard/DashboardHero'
import { ScoreTrendChart } from '@/components/dashboard/ScoreTrendChart'
import { WeakConceptsCard } from '@/components/dashboard/WeakConceptsCard'
import { StudyHoursChart } from '@/components/dashboard/StudyHoursChart'
import { ConceptAccuracyPanel } from '@/components/dashboard/ConceptAccuracyPanel'
import { useDashboardData } from '@/components/dashboard/useDashboardData'
import { RefreshCw } from 'lucide-react'

export default function DashboardPage() {
  const { data, loading, error, reload } = useDashboardData()

  return (
    <div className="sara-page">
      {error && (
        <div className="sara-error-bar" role="alert">
          <span>{error}</span>
          <button type="button" className="sara-dash-retry-btn" onClick={reload}>
            <RefreshCw className="h-3.5 w-3.5" strokeWidth={2} />
            Retry
          </button>
        </div>
      )}

      <DashboardHero
        profile={data.sara}
        weekStudyMinutes={data.planner.week_total_minutes}
        loading={loading}
      />

      <section className="sara-section" aria-labelledby="perf-heading">
        <div className="sara-section-head">
          <div>
            <h2 id="perf-heading" className="sara-dash-kicker sara-dash-kicker--blue">
              Performance
            </h2>
            <p className="sara-dash-section-title">Trends &amp; study mix</p>
          </div>
          <p className="sara-dash-section-desc">
            Mock trajectory and how your week broke down by subject.
          </p>
        </div>
        <div className="sara-grid-2">
          <ScoreTrendChart data={data.trend} />
          <StudyHoursChart planner={data.planner} />
        </div>
      </section>

      <section className="sara-section" aria-labelledby="focus-heading">
        <div className="sara-section-head">
          <div>
            <h2 id="focus-heading" className="sara-dash-kicker sara-dash-kicker--indigo">
              Focus areas
            </h2>
            <p className="sara-dash-section-title">Fix recurring slips · track accuracy</p>
          </div>
          <p className="sara-dash-section-desc">
            Turn mistake frequency and concept accuracy into your next study block.
          </p>
        </div>
        <div className="sara-grid-2">
          <WeakConceptsCard rows={data.mistakes} />
          <ConceptAccuracyPanel rows={data.accuracy} />
        </div>
      </section>

      <footer className="sara-page-footer">
        Sara study hub · Data syncs as you log mocks, sessions, and practice
      </footer>
    </div>
  )
}

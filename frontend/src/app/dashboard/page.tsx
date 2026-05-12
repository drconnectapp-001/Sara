'use client'

/**
 * Study dashboard — light glass UI. Layout + glass use global `.sara-*` CSS
 * so the page still looks correct when Tailwind isn’t processed (missing PostCSS).
 */
import { DashboardShell } from '@/components/dashboard/DashboardShell'
import { DashboardNav } from '@/components/dashboard/DashboardNav'
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
    <DashboardShell>
      <DashboardNav />
      <main className="sara-dashboard-main">
        {error ? (
          <div className="sara-dash-error" role="alert">
            <span>{error}</span>
            <button type="button" className="sara-dash-retry-btn" onClick={() => reload()}>
              <RefreshCw className="h-4 w-4" style={{ color: '#3b82f6' }} strokeWidth={2} />
              Retry
            </button>
          </div>
        ) : null}

        <DashboardHero profile={data.sara} weekStudyMinutes={data.planner.week_total_minutes} loading={loading} />

        <section className="sara-dash-section" aria-labelledby="dash-perf-heading">
          <div className="sara-dash-section-head">
            <div>
              <h2 id="dash-perf-heading" className="sara-dash-kicker sara-dash-kicker--blue">
                Performance
              </h2>
              <p className="sara-dash-section-title">Trends &amp; study mix</p>
            </div>
            <p className="sara-dash-section-desc">
              Mock trajectory and how your week broke down by subject.
            </p>
          </div>
          <div className="sara-dash-grid-2">
            <ScoreTrendChart data={data.trend} />
            <StudyHoursChart planner={data.planner} />
          </div>
        </section>

        <section className="sara-dash-section" aria-labelledby="dash-focus-heading">
          <div className="sara-dash-section-head">
            <div>
              <h2 id="dash-focus-heading" className="sara-dash-kicker sara-dash-kicker--indigo">
                Focus areas
              </h2>
              <p className="sara-dash-section-title">Fix recurring slips · track accuracy</p>
            </div>
            <p className="sara-dash-section-desc">
              Turn mistake frequency and concept accuracy into your next study block.
            </p>
          </div>
          <div className="sara-dash-grid-2">
            <WeakConceptsCard rows={data.mistakes} />
            <ConceptAccuracyPanel rows={data.accuracy} />
          </div>
        </section>

        <footer className="sara-dash-footer">
          Sara study hub · Data syncs as you log mocks, sessions, and practice
        </footer>
      </main>
    </DashboardShell>
  )
}

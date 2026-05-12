'use client'

/**
 * Study dashboard — mocks, planner, mistakes, and practice accuracy.
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

  if (!data) {
    return (
      <DashboardShell>
        <DashboardNav />
        <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <div className="h-48 animate-pulse rounded-2xl bg-white/[0.06]" />
        </main>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <DashboardNav />
      <main className="mx-auto max-w-6xl px-4 py-8 pb-14 sm:px-6 sm:py-10">
        {error ? (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-500/25 bg-amber-500/10 px-4 py-3 text-sm text-amber-100/90">
            <span>{error}</span>
            <button
              type="button"
              onClick={() => reload()}
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/10"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Retry
            </button>
          </div>
        ) : null}

        <DashboardHero profile={data.sara} weekStudyMinutes={data.planner.week_total_minutes} loading={loading} />

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <ScoreTrendChart data={data.trend} />
          <StudyHoursChart planner={data.planner} />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <WeakConceptsCard rows={data.mistakes} />
          <ConceptAccuracyPanel rows={data.accuracy} />
        </div>
      </main>
    </DashboardShell>
  )
}

'use client'

/**
 * Study dashboard — full layout with glass cards on a light sky / indigo canvas.
 * Data: useDashboardData (parallel fetches to Sara APIs).
 */
import { DashboardShell } from '@/components/dashboard/DashboardShell'
import { DashboardNav } from '@/components/dashboard/DashboardNav'
import { DashboardHero } from '@/components/dashboard/DashboardHero'
import { ScoreTrendChart } from '@/components/dashboard/ScoreTrendChart'
import { WeakConceptsCard } from '@/components/dashboard/WeakConceptsCard'
import { StudyHoursChart } from '@/components/dashboard/StudyHoursChart'
import { ConceptAccuracyPanel } from '@/components/dashboard/ConceptAccuracyPanel'
import { useDashboardData } from '@/components/dashboard/useDashboardData'
import { glassCardInner } from '@/components/dashboard/dashboardTheme'
import { cn } from '@/components/chat/cn'
import { RefreshCw } from 'lucide-react'

export default function DashboardPage() {
  const { data, loading, error, reload } = useDashboardData()

  return (
    <DashboardShell>
      <DashboardNav />
      <main className="mx-auto max-w-6xl px-4 py-8 pb-16 sm:px-6 sm:py-10">
        {error ? (
          <div
            className={cn(
              'mb-8 flex flex-wrap items-center justify-between gap-3 border border-amber-200/90 bg-amber-50/80 px-4 py-3 text-sm font-medium text-amber-950 shadow-md backdrop-blur-md',
              glassCardInner
            )}
          >
            <span>{error}</span>
            <button
              type="button"
              onClick={() => reload()}
              className="inline-flex items-center gap-2 rounded-lg border border-white/60 bg-white/70 px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-sm transition-colors hover:bg-white"
            >
              <RefreshCw className="h-3.5 w-3.5 text-[#3B82F6]" />
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

        <footer className="mt-12 text-center text-xs font-medium text-slate-400">
          Sara · Your prep, visualized · Data updates as you study and log mocks
        </footer>
      </main>
    </DashboardShell>
  )
}

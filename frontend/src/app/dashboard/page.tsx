'use client'

/**
 * Study dashboard — light glass UI; `.sara-dashboard` + globals ensure theme regardless of body.
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
      <main className="mx-auto max-w-6xl px-4 py-8 pb-20 sm:px-6 sm:py-10">
        {error ? (
          <div
            className={cn(
              'mb-8 flex flex-wrap items-center justify-between gap-3 border border-amber-200/95 px-4 py-3.5 text-sm font-semibold text-amber-950 shadow-md',
              glassCardInner,
              'bg-amber-50/90'
            )}
          >
            <span>{error}</span>
            <button
              type="button"
              onClick={() => reload()}
              className="inline-flex items-center gap-2 rounded-xl border border-white/70 bg-white/90 px-3 py-2 text-xs font-bold text-slate-800 shadow-sm transition-colors hover:bg-white"
            >
              <RefreshCw className="h-4 w-4 text-[#3B82F6]" />
              Retry
            </button>
          </div>
        ) : null}

        <DashboardHero profile={data.sara} weekStudyMinutes={data.planner.week_total_minutes} loading={loading} />

        <div className="mt-12">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-[#3B82F6]">Performance</h2>
              <p className="mt-1 text-lg font-extrabold text-slate-900">Trends &amp; study mix</p>
            </div>
            <p className="max-w-sm text-xs font-medium text-slate-500">
              Mock trajectory and how your week broke down by subject.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <ScoreTrendChart data={data.trend} />
            <StudyHoursChart planner={data.planner} />
          </div>
        </div>

        <div className="mt-12">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-[#6366F1]">Focus areas</h2>
              <p className="mt-1 text-lg font-extrabold text-slate-900">Fix recurring slips · track accuracy</p>
            </div>
            <p className="max-w-sm text-xs font-medium text-slate-500">
              Turn mistake frequency and concept accuracy into your next study block.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <WeakConceptsCard rows={data.mistakes} />
            <ConceptAccuracyPanel rows={data.accuracy} />
          </div>
        </div>

        <footer className="mt-16 border-t border-white/40 pt-8 text-center text-xs font-semibold text-slate-400">
          Sara study hub · Data syncs as you log mocks, sessions, and practice
        </footer>
      </main>
    </DashboardShell>
  )
}

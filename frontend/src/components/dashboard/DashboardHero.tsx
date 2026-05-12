'use client'

import { Flame, Target } from 'lucide-react'
import type { SaraDashboardProfile } from './types'
import { cn } from './cn'

interface DashboardHeroProps {
  profile: SaraDashboardProfile
  weekStudyMinutes: number
  loading?: boolean
}

function formatWeekTime(minutes: number): string {
  if (minutes <= 0) return '—'
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h === 0) return `${m}m this week`
  if (m === 0) return `${h}h this week`
  return `${h}h ${m}m this week`
}

export function DashboardHero({ profile, weekStudyMinutes, loading }: DashboardHeroProps) {
  const mood = profile.current_mood?.trim()

  return (
    <section className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#161626]/90 p-6 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.7)] ring-1 ring-white/[0.04] sm:p-8">
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/15 blur-3xl"
        aria-hidden
      />
      <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-start">
        <div>
          <p className="text-sm font-medium text-indigo-300/90">Study hub</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Hey {profile.name}
          </h1>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-slate-400">
            {loading ? (
              <span className="inline-block h-4 w-full max-w-md animate-pulse rounded bg-white/10" />
            ) : mood ? (
              <>
                <span className="text-slate-500">Headspace: </span>
                <span className="font-medium text-slate-200">{mood}</span>
                <span className="text-slate-500">
                  {' '}
                  — small steps today still move the needle for JEE.
                </span>
              </>
            ) : (
              <>
                Your overview of mocks, weak spots, and where time went this week — so you can prep
                with intention.
              </>
            )}
          </p>
          {(profile.weak_subjects?.length > 0 || profile.strong_subjects?.length > 0) && !loading && (
            <div className="mt-5 flex flex-wrap gap-2">
              {profile.weak_subjects?.slice(0, 4).map((s) => (
                <span
                  key={`w-${s}`}
                  className="rounded-lg border border-amber-500/25 bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-200/90"
                >
                  Focus · {s}
                </span>
              ))}
              {profile.strong_subjects?.slice(0, 3).map((s) => (
                <span
                  key={`s-${s}`}
                  className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-200/85"
                >
                  Strong · {s}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-row sm:flex-wrap sm:justify-end lg:flex-col lg:items-stretch">
          <StatPill
            icon={Flame}
            label="Streak"
            value={loading ? '…' : `${profile.current_streak} days`}
            hint={!loading && profile.longest_streak > 0 ? `Best ${profile.longest_streak}` : undefined}
            className="min-w-[140px]"
          />
          <StatPill
            icon={Target}
            label="Target score"
            value={
              loading ? '…' : profile.target_score != null ? `${profile.target_score}` : '—'
            }
            hint="Mock goal"
            className="min-w-[140px]"
          />
          <div className="col-span-2 rounded-xl border border-white/[0.08] bg-[#0a0a12]/80 px-4 py-3 sm:col-span-1 sm:min-w-[200px]">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Study time</p>
            <p className="mt-1 text-lg font-semibold text-white">
              {loading ? '…' : formatWeekTime(weekStudyMinutes)}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function StatPill({
  icon: Icon,
  label,
  value,
  hint,
  className,
}: {
  icon: typeof Flame
  label: string
  value: string
  hint?: string
  className?: string
}) {
  return (
    <div
      className={cn(
        'rounded-xl border border-white/[0.08] bg-[#0a0a12]/80 px-4 py-3 ring-1 ring-white/[0.03]',
        className
      )}
    >
      <div className="flex items-center gap-2 text-slate-500">
        <Icon className="h-3.5 w-3.5 text-indigo-400" strokeWidth={2} />
        <span className="text-[10px] font-semibold uppercase tracking-wider">{label}</span>
      </div>
      <p className="mt-1 text-lg font-semibold tracking-tight text-white">{value}</p>
      {hint ? <p className="mt-0.5 text-[11px] text-slate-500">{hint}</p> : null}
    </div>
  )
}

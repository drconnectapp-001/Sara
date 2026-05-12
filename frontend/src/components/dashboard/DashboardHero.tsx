'use client'

import { Flame, Target } from 'lucide-react'
import type { SaraDashboardProfile } from './types'
import { cn } from './cn'
import { accentGradient, glassCard, glassCardInner } from './dashboardTheme'

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
    <section className={cn('relative overflow-hidden p-6 sm:p-8', glassCard)}>
      <div
        className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-gradient-to-br from-sky-200/50 to-indigo-200/40 blur-3xl"
        aria-hidden
      />
      <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-start">
        <div>
          <p
            className={cn(
              'inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white shadow-sm',
              accentGradient
            )}
          >
            Study hub
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Hey {profile.name}
          </h1>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-slate-600">
            {loading ? (
              <span className="inline-block h-4 w-full max-w-md animate-pulse rounded-lg bg-sky-100/80" />
            ) : mood ? (
              <>
                <span className="text-slate-500">How you&apos;re doing: </span>
                <span className="font-semibold text-slate-800">{mood}</span>
                <span className="text-slate-500">
                  {' '}
                  — keep showing up; consistency beats cramming for JEE.
                </span>
              </>
            ) : (
              <>
                Your mocks, weak spots, and where time went this week — one calm place to steer
                your prep.
              </>
            )}
          </p>
          {(profile.weak_subjects?.length > 0 || profile.strong_subjects?.length > 0) && !loading && (
            <div className="mt-5 flex flex-wrap gap-2">
              {profile.weak_subjects?.slice(0, 4).map((s) => (
                <span
                  key={`w-${s}`}
                  className="rounded-lg border border-amber-200/80 bg-amber-50/90 px-2.5 py-1 text-xs font-semibold text-amber-900/90 shadow-sm"
                >
                  Focus · {s}
                </span>
              ))}
              {profile.strong_subjects?.slice(0, 3).map((s) => (
                <span
                  key={`s-${s}`}
                  className="rounded-lg border border-emerald-200/80 bg-emerald-50/90 px-2.5 py-1 text-xs font-semibold text-emerald-900/85 shadow-sm"
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
          <div
            className={cn(
              'col-span-2 border border-white/50 bg-gradient-to-br from-sky-50/90 to-indigo-50/80 px-4 py-3 sm:col-span-1 sm:min-w-[200px]',
              glassCardInner
            )}
          >
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Study time</p>
            <p className="mt-1 bg-gradient-to-r from-[#3B82F6] to-[#6366F1] bg-clip-text text-lg font-bold text-transparent">
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
    <div className={cn('border border-white/50 px-4 py-3', glassCardInner, className)}>
      <div className="flex items-center gap-2 text-slate-500">
        <Icon className="h-3.5 w-3.5 text-[#3B82F6]" strokeWidth={2} />
        <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
      </div>
      <p className="mt-1 text-lg font-bold tracking-tight text-slate-900">{value}</p>
      {hint ? <p className="mt-0.5 text-[11px] font-medium text-slate-500">{hint}</p> : null}
    </div>
  )
}

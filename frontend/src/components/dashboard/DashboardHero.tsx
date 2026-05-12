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
    <section className={cn('relative overflow-hidden p-6 sm:p-8 lg:p-10', glassCard)}>
      <div
        className="pointer-events-none absolute -right-10 -top-28 h-80 w-80 rounded-full opacity-90 blur-3xl"
        style={{ background: 'radial-gradient(circle at 30% 30%, rgba(59,130,246,0.35), rgba(99,102,241,0.12) 55%, transparent 70%)' }}
        aria-hidden
      />
      <div className="relative grid gap-10 lg:grid-cols-[1fr,minmax(260px,320px)] lg:items-start">
        <div>
          <span
            className={cn(
              'inline-flex items-center rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white shadow-md',
              accentGradient
            )}
          >
            Study hub
          </span>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.5rem] lg:leading-tight">
            Hey {profile.name}
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-slate-600">
            {loading ? (
              <span className="inline-block h-4 w-full max-w-md animate-pulse rounded-lg bg-sky-200/60" />
            ) : mood ? (
              <>
                <span className="text-slate-500">How you&apos;re doing: </span>
                <span className="font-bold text-slate-800">{mood}</span>
                <span className="text-slate-500">
                  {' '}
                  — steady prep beats last-minute panic on JEE day.
                </span>
              </>
            ) : (
              <>
                Mocks, mistakes, and where your hours went — clarity so you can adjust course this
                week.
              </>
            )}
          </p>
          {(profile.weak_subjects?.length > 0 || profile.strong_subjects?.length > 0) && !loading && (
            <div className="mt-6 flex flex-wrap gap-2">
              {profile.weak_subjects?.slice(0, 4).map((s) => (
                <span
                  key={`w-${s}`}
                  className="rounded-lg border border-amber-200/90 bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-900 shadow-sm"
                >
                  Focus · {s}
                </span>
              ))}
              {profile.strong_subjects?.slice(0, 3).map((s) => (
                <span
                  key={`s-${s}`}
                  className="rounded-lg border border-emerald-200/90 bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-900 shadow-sm"
                >
                  Strong · {s}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-1">
          <StatPill
            icon={Flame}
            label="Streak"
            value={loading ? '…' : `${profile.current_streak} days`}
            hint={!loading && profile.longest_streak > 0 ? `Personal best ${profile.longest_streak}` : undefined}
          />
          <StatPill
            icon={Target}
            label="Target score"
            value={loading ? '…' : profile.target_score != null ? `${profile.target_score}` : '—'}
            hint="Latest mock goal"
          />
          <div
            className={cn(
              'col-span-2 px-4 py-3.5 sm:col-span-2 lg:col-span-1',
              glassCardInner,
              'border-sky-100/80 bg-gradient-to-br from-sky-50/95 to-indigo-50/90'
            )}
          >
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">This week</p>
            <p
              className="mt-1.5 text-xl font-extrabold tracking-tight"
              style={{
                background: 'linear-gradient(90deg, #3b82f6, #6366f1)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {loading ? '…' : formatWeekTime(weekStudyMinutes)}
            </p>
            <p className="mt-1 text-[11px] font-medium text-slate-500">Logged study sessions</p>
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
    <div className={cn('px-4 py-3.5', glassCardInner, className)}>
      <div className="flex items-center gap-2 text-slate-500">
        <Icon className="h-4 w-4 text-[#3B82F6]" strokeWidth={2} />
        <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
      </div>
      <p className="mt-1.5 text-xl font-extrabold tracking-tight text-slate-900">{value}</p>
      {hint ? <p className="mt-1 text-[11px] font-semibold text-slate-500">{hint}</p> : null}
    </div>
  )
}

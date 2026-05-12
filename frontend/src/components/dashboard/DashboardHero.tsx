'use client'

import { Flame, Target } from 'lucide-react'
import type { SaraDashboardProfile } from './types'
import { cn } from './cn'
import { glassCard, glassCardInner } from './dashboardTheme'

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
      <div className="sara-dashboard-hero-grid relative">
        <div>
          <span className="sara-dash-hub-badge">Study hub</span>
          <h1 className="sara-dashboard-hero-title">Hey {profile.name}</h1>
          <p className="sara-dashboard-hero-lede">
            {loading ? (
              <span className="sara-dashboard-skeleton-line" />
            ) : mood ? (
              <>
                <span style={{ color: '#64748b' }}>How you&apos;re doing: </span>
                <span className="sara-hero-mood">{mood}</span>
                <span style={{ color: '#64748b' }}>
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
            <div className="sara-dashboard-chip-row">
              {profile.weak_subjects?.slice(0, 4).map((s) => (
                <span key={`w-${s}`} className="sara-dashboard-chip-focus">
                  Focus · {s}
                </span>
              ))}
              {profile.strong_subjects?.slice(0, 3).map((s) => (
                <span key={`s-${s}`} className="sara-dashboard-chip-strong">
                  Strong · {s}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="sara-dashboard-stat-grid">
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
          <div className="sara-dashboard-stat-span-2 sara-dashboard-week-card">
            <p className="sara-dashboard-week-highlight-label">This week</p>
            <p className="sara-dashboard-week-highlight-value">
              {loading ? '…' : formatWeekTime(weekStudyMinutes)}
            </p>
            <p className="sara-dashboard-week-highlight-sub">Logged study sessions</p>
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
      <div className="sara-dashboard-stat-pill-label-row">
        <Icon className="h-4 w-4" style={{ color: '#3b82f6' }} strokeWidth={2} />
        <span className="sara-dashboard-stat-pill-label">{label}</span>
      </div>
      <p className="sara-dashboard-stat-pill-value">{value}</p>
      {hint ? <p className="sara-dashboard-stat-pill-hint">{hint}</p> : null}
    </div>
  )
}

'use client'

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { PlannerSummary } from './types'
import { cn } from './cn'
import { glassCard, glassCardInner } from './dashboardTheme'

interface StudyHoursChartProps {
  planner: PlannerSummary
  className?: string
}

const SUBJECT_COLORS: Record<string, string> = {
  physics: '#3B82F6',
  chemistry: '#6366F1',
  math: '#0EA5E9',
  biology: '#8B5CF6',
  default: '#2563EB',
}

function colorForSubject(name: string): string {
  const key = name.toLowerCase()
  if (key.includes('phy')) return SUBJECT_COLORS.physics
  if (key.includes('chem')) return SUBJECT_COLORS.chemistry
  if (key.includes('math')) return SUBJECT_COLORS.math
  if (key.includes('bio')) return SUBJECT_COLORS.biology
  return SUBJECT_COLORS.default
}

const tooltipStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  border: '1px solid rgba(255, 255, 255, 0.6)',
  borderRadius: '12px',
  fontSize: '12px',
  boxShadow: '0 12px 40px -12px rgba(59, 130, 246, 0.25)',
}

export function StudyHoursChart({ planner, className }: StudyHoursChartProps) {
  const chartData = planner.by_subject.map((row) => ({
    ...row,
    hours: Math.round((row.total_minutes / 60) * 10) / 10,
    label: row.subject,
    fill: colorForSubject(row.subject),
  }))

  const totalH = planner.week_total_minutes / 60
  const totalLabel =
    planner.week_total_minutes <= 0
      ? '0h'
      : totalH >= 1
        ? `${totalH.toFixed(1)}h total`
        : `${planner.week_total_minutes}m total`

  return (
    <div className={cn('flex h-[320px] flex-col p-5', glassCard, className)}>
      <div className="mb-2 flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="text-base font-bold text-slate-900">Study time by subject</h2>
          <p className="mt-0.5 text-xs font-medium text-slate-500">Last 7 days · logged sessions</p>
        </div>
        <span
          className={cn(
            'px-2.5 py-1 text-xs font-bold text-[#3B82F6] backdrop-blur-md',
            glassCardInner
          )}
        >
          {totalLabel}
        </span>
      </div>
      <div className="min-h-0 flex-1 w-full pt-2">
        {chartData.length === 0 ? (
          <div
            className="flex h-full items-center justify-center rounded-xl border border-dashed px-6 text-center text-sm font-semibold text-slate-600"
            style={{
              borderColor: 'rgba(125, 211, 252, 0.65)',
              background: 'rgba(240, 249, 255, 0.65)',
            }}
          >
            No sessions this week. Log study time in the planner to fill this chart.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{ top: 4, right: 16, left: 4, bottom: 4 }}>
              <CartesianGrid stroke="rgba(15, 23, 42, 0.06)" horizontal vertical={false} strokeDasharray="3 6" />
              <XAxis type="number" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} unit="h" />
              <YAxis
                type="category"
                dataKey="label"
                width={88}
                tick={{ fill: '#64748b', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                cursor={{ fill: 'rgba(59, 130, 246, 0.08)' }}
                contentStyle={tooltipStyle}
                formatter={(value: number, _n, item) => {
                  const mins = (item?.payload as { total_minutes?: number })?.total_minutes
                  return [`${value}h (${mins ?? 0} min)`, 'Time']
                }}
              />
              <Bar dataKey="hours" radius={[0, 6, 6, 0]} maxBarSize={22}>
                {chartData.map((entry, i) => (
                  <Cell key={`cell-${entry.subject}-${i}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}

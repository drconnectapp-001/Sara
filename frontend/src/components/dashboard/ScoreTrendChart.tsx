'use client'

import { useId } from 'react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { MockTrendPoint } from './types'
import { cn } from './cn'
import { glassCard } from './dashboardTheme'

interface ScoreTrendChartProps {
  data: MockTrendPoint[]
  className?: string
}

const tickStyle = { fill: '#64748b', fontSize: 11 }

const tooltipStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  border: '1px solid rgba(255, 255, 255, 0.6)',
  borderRadius: '12px',
  fontSize: '12px',
  boxShadow: '0 12px 40px -12px rgba(59, 130, 246, 0.25)',
}

export function ScoreTrendChart({ data, className }: ScoreTrendChartProps) {
  const gradId = useId().replace(/:/g, '')
  const chartData = data.map((d, i) => ({
    ...d,
    idx: i + 1,
    label: formatAxisDate(d.date),
  }))

  const hasData = chartData.length > 0

  return (
    <div className={cn('sara-dashboard-chart-shell', glassCard, className)}>
      <div>
        <h2 className="sara-chart-card-title">Mock score trend</h2>
        <p className="sara-chart-card-sub">Total score over recent mocks</p>
      </div>
      <div style={{ flex: 1, minHeight: 0, width: '100%' }}>
        {!hasData ? (
          <div className="sara-chart-empty">No mock scores yet. Log a mock to see your curve here.</div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 8, right: 8, left: -8, bottom: 4 }}>
              <CartesianGrid stroke="rgba(15, 23, 42, 0.06)" vertical={false} strokeDasharray="3 6" />
              <XAxis
                dataKey="label"
                tick={tickStyle}
                tickLine={false}
                axisLine={{ stroke: 'rgba(15, 23, 42, 0.08)' }}
              />
              <YAxis
                tick={tickStyle}
                tickLine={false}
                axisLine={false}
                domain={['auto', 'auto']}
                width={36}
              />
              <Tooltip
                contentStyle={tooltipStyle}
                labelStyle={{ color: '#64748b', marginBottom: 4, fontWeight: 600 }}
                formatter={(value: number) => [`${value}`, 'Score']}
                labelFormatter={(_, payload) => {
                  const row = payload?.[0]?.payload as MockTrendPoint & { label: string }
                  return row?.date ?? ''
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke={`url(#${gradId})`}
                strokeWidth={2.5}
                dot={{ fill: '#3B82F6', strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6, fill: '#6366F1', stroke: '#3B82F6', strokeWidth: 2 }}
              />
              <defs>
                <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#6366F1" />
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}

function formatAxisDate(isoDate: string): string {
  try {
    const d = new Date(isoDate)
    if (Number.isNaN(d.getTime())) return isoDate.slice(5)
    return `${d.getMonth() + 1}/${d.getDate()}`
  } catch {
    return isoDate
  }
}

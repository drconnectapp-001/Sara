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

interface ScoreTrendChartProps {
  data: MockTrendPoint[]
  className?: string
}

const tickStyle = { fill: '#64748b', fontSize: 11 }

export function ScoreTrendChart({ data, className }: ScoreTrendChartProps) {
  const gradId = useId().replace(/:/g, '')
  const chartData = data.map((d, i) => ({
    ...d,
    idx: i + 1,
    label: formatAxisDate(d.date),
  }))

  const hasData = chartData.length > 0

  return (
    <div
      className={cn(
        'flex h-[320px] flex-col rounded-2xl border border-white/[0.08] bg-[#161626]/90 p-5 shadow-lg ring-1 ring-white/[0.04]',
        className
      )}
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-white">Mock score trend</h2>
          <p className="mt-0.5 text-xs text-slate-500">Total score over recent mocks</p>
        </div>
      </div>
      <div className="min-h-0 flex-1 w-full">
        {!hasData ? (
          <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-white/10 bg-[#0a0a12]/50 px-6 text-center text-sm text-slate-500">
            No mock scores yet. Log a mock to see your curve here.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 8, right: 8, left: -8, bottom: 4 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} strokeDasharray="3 6" />
              <XAxis dataKey="label" tick={tickStyle} tickLine={false} axisLine={{ stroke: 'rgba(255,255,255,0.08)' }} />
              <YAxis
                tick={tickStyle}
                tickLine={false}
                axisLine={false}
                domain={['auto', 'auto']}
                width={36}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 15, 26, 0.95)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  fontSize: '12px',
                  boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
                }}
                labelStyle={{ color: '#94a3b8', marginBottom: 4 }}
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
                dot={{ fill: '#818cf8', strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6, fill: '#a5b4fc', stroke: '#4f46e5', strokeWidth: 2 }}
              />
              <defs>
                <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#a855f7" />
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

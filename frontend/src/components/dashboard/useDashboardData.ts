'use client'

import { useCallback, useEffect, useState } from 'react'
import type {
  ConceptAccuracyRow,
  MistakeSummaryRow,
  MockTrendPoint,
  PlannerSummary,
  SaraDashboardProfile,
} from './types'

export interface DashboardData {
  sara: SaraDashboardProfile
  trend: MockTrendPoint[]
  mistakes: MistakeSummaryRow[]
  planner: PlannerSummary
  accuracy: ConceptAccuracyRow[]
}

const defaultSara: SaraDashboardProfile = {
  name: 'Sara',
  current_mood: null,
  target_score: null,
  weak_subjects: [],
  strong_subjects: [],
  current_streak: 0,
  longest_streak: 0,
}

const defaultPlanner: PlannerSummary = { week_total_minutes: 0, by_subject: [] }

function parseJson<T>(raw: unknown, fallback: T): T {
  if (raw === null || raw === undefined) return fallback
  return raw as T
}

export function useDashboardData() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const [saraRes, trendRes, mistakesRes, plannerRes, accuracyRes] = await Promise.all([
        fetch('/api/admin/sara', { cache: 'no-store' }),
        fetch('/api/mock/trend', { cache: 'no-store' }),
        fetch('/api/mistakes/summary', { cache: 'no-store' }),
        fetch('/api/planner/', { cache: 'no-store' }),
        fetch('/api/practice/accuracy', { cache: 'no-store' }),
      ])

      let sara = defaultSara
      if (saraRes.ok) {
        const j = (await saraRes.json()) as Record<string, unknown>
        sara = {
          name: typeof j.name === 'string' ? j.name : defaultSara.name,
          current_mood: typeof j.current_mood === 'string' ? j.current_mood : null,
          target_score: typeof j.target_score === 'number' ? j.target_score : null,
          weak_subjects: Array.isArray(j.weak_subjects) ? (j.weak_subjects as string[]) : [],
          strong_subjects: Array.isArray(j.strong_subjects) ? (j.strong_subjects as string[]) : [],
          current_streak: typeof j.current_streak === 'number' ? j.current_streak : 0,
          longest_streak: typeof j.longest_streak === 'number' ? j.longest_streak : 0,
          total_study_hours: typeof j.total_study_hours === 'number' ? j.total_study_hours : null,
        }
      }

      const trend = trendRes.ok ? parseJson(await trendRes.json(), [] as MockTrendPoint[]) : []
      const mistakes = mistakesRes.ok ? parseJson(await mistakesRes.json(), [] as MistakeSummaryRow[]) : []
      const planner = plannerRes.ok
        ? parseJson(await plannerRes.json(), defaultPlanner as PlannerSummary)
        : defaultPlanner
      const accuracy = accuracyRes.ok
        ? parseJson(await accuracyRes.json(), [] as ConceptAccuracyRow[])
        : []

      setData({ sara, trend, mistakes, planner, accuracy })
    } catch {
      setError('Could not load dashboard. Check your connection and API.')
      setData({
        sara: defaultSara,
        trend: [],
        mistakes: [],
        planner: defaultPlanner,
        accuracy: [],
      })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  return { data, loading, error, reload: load }
}

export interface SaraDashboardProfile {
  name: string
  current_mood: string | null
  target_score: number | null
  weak_subjects: string[]
  strong_subjects: string[]
  current_streak: number
  longest_streak: number
  total_study_hours?: number | null
}

export interface MockTrendPoint {
  score: number
  date: string
  physics?: number | null
  chemistry?: number | null
  math?: number | null
}

export interface MistakeSummaryRow {
  concept: string
  errors: number
}

export interface PlannerSummary {
  week_total_minutes: number
  by_subject: Array<{
    subject: string
    total_minutes: number
    sessions?: number
  }>
}

export interface ConceptAccuracyRow {
  concept: string
  subject: string
  correct: number
  total: number
  accuracy: number
}

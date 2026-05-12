export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface SaraProfile {
  name: string
  current_mood: string | null
  target_college?: string | null
  class_level?: number | null
}

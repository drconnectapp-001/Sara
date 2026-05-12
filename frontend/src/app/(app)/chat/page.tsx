'use client'

import { useCallback, useEffect, useState } from 'react'
import { ArrowUp, Sparkles } from 'lucide-react'
import { ChatMessageList } from '@/components/chat/ChatMessageList'
import { parseSseTokens } from '@/components/chat/parseSseStream'
import { usePersistedSessionId } from '@/components/chat/usePersistedSessionId'
import type { ChatMessage } from '@/components/chat/types'

export default function ChatPage() {
  const sessionId = usePersistedSessionId()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const [mood, setMood] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/admin/sara', { cache: 'no-store' })
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d?.current_mood) setMood(d.current_mood.trim()) })
      .catch(() => null)
  }, [])

  const sendMessage = useCallback(async () => {
    const text = input.trim()
    if (!text || streaming || !sessionId) return

    setInput('')
    setMessages(prev => [
      ...prev,
      { role: 'user', content: text },
      { role: 'assistant', content: '' },
    ])
    setStreaming(true)

    try {
      const response = await fetch('/api/chat/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, session_id: sessionId }),
      })

      if (!response.ok || !response.body) throw new Error(`${response.status}`)

      for await (const token of parseSseTokens(response.body)) {
        setMessages(prev => {
          const next = [...prev]
          const last = next[next.length - 1]
          if (last?.role !== 'assistant') return prev
          next[next.length - 1] = { ...last, content: last.content + token }
          return next
        })
      }
    } catch {
      setMessages(prev => {
        const next = [...prev]
        const last = next[next.length - 1]
        if (last?.role === 'assistant' && last.content === '') {
          next[next.length - 1] = {
            ...last,
            content: 'Could not reach Sara. Make sure the API and Ollama are running.',
          }
        }
        return next
      })
    } finally {
      setStreaming(false)
    }
  }, [input, sessionId, streaming])

  return (
    <div className="sara-chat-shell">
      {/* Slim header */}
      <div className="sara-chat-header">
        <div className="sara-chat-header-icon" aria-hidden>
          <Sparkles className="h-4 w-4" strokeWidth={1.5} />
        </div>
        <div>
          <p className="sara-chat-header-title">Sara — AI Companion</p>
          {mood && (
            <p className="sara-chat-header-sub">
              Feeling <span className="font-semibold text-slate-700">{mood}</span> · here to prep with you
            </p>
          )}
        </div>
      </div>

      {/* Messages */}
      <ChatMessageList messages={messages} streaming={streaming} />

      {/* Composer */}
      <div className="sara-chat-composer">
        <div className="sara-chat-composer-inner">
          <textarea
            className="sara-chat-textarea"
            placeholder="Ask a doubt, paste a problem, or just talk…"
            rows={1}
            value={input}
            disabled={streaming || !sessionId}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                if (input.trim() && !streaming) sendMessage()
              }
            }}
          />
          <button
            type="button"
            aria-label="Send message"
            disabled={!input.trim() || streaming || !sessionId}
            onClick={sendMessage}
            className="sara-chat-send-btn"
          >
            <ArrowUp className="h-4 w-4" strokeWidth={2.2} />
          </button>
        </div>
        <p className="sara-chat-hint">Shift+Enter for new line · Sara streams answers live</p>
      </div>
    </div>
  )
}

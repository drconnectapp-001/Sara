'use client'

/**
 * Sara — main companion chat. Streams SSE tokens from POST /api/chat/.
 */
import { useCallback, useState } from 'react'
import { ChatHeader } from '@/components/chat/ChatHeader'
import { ChatComposer } from '@/components/chat/ChatComposer'
import { ChatMessageList } from '@/components/chat/ChatMessageList'
import { parseSseTokens } from '@/components/chat/parseSseStream'
import { usePersistedSessionId } from '@/components/chat/usePersistedSessionId'
import type { ChatMessage } from '@/components/chat/types'

export default function ChatPage() {
  const sessionId = usePersistedSessionId()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)

  const sendMessage = useCallback(async () => {
    const text = input.trim()
    if (!text || streaming || !sessionId) return

    setInput('')
    setMessages((prev) => [...prev, { role: 'user', content: text }, { role: 'assistant', content: '' }])
    setStreaming(true)

    try {
      const response = await fetch('/api/chat/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, session_id: sessionId }),
      })

      if (!response.ok || !response.body) {
        throw new Error(`Chat request failed: ${response.status}`)
      }

      for await (const token of parseSseTokens(response.body)) {
        setMessages((prev) => {
          if (prev.length === 0) return prev
          const next = [...prev]
          const last = next[next.length - 1]
          if (last.role !== 'assistant') return prev
          next[next.length - 1] = { ...last, content: last.content + token }
          return next
        })
      }
    } catch {
      setMessages((prev) => {
        if (prev.length === 0) return prev
        const next = [...prev]
        const last = next[next.length - 1]
        if (last.role === 'assistant' && last.content === '')
          next[next.length - 1] = {
            ...last,
            content: 'Could not reach Sara. Check that the API is running and try again.',
          }
        return next
      })
    } finally {
      setStreaming(false)
    }
  }, [input, sessionId, streaming])

  return (
    <div className="relative flex min-h-screen flex-col bg-[#0a0a12] text-sara-text">
      {/* ambient background */}
      <div
        className="pointer-events-none fixed inset-0 opacity-40"
        aria-hidden
        style={{
          backgroundImage: `
            radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99, 102, 241, 0.22), transparent),
            radial-gradient(ellipse 60% 40% at 100% 50%, rgba(139, 92, 246, 0.08), transparent),
            radial-gradient(ellipse 50% 30% at 0% 80%, rgba(99, 102, 241, 0.06), transparent)
          `,
        }}
      />
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />

      <div className="relative z-10 flex min-h-screen flex-col">
        <ChatHeader />
        <ChatMessageList messages={messages} streaming={streaming} />
        <ChatComposer value={input} onChange={setInput} onSend={sendMessage} disabled={streaming || !sessionId} />
      </div>
    </div>
  )
}

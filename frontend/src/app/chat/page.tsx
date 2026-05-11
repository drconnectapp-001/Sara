'use client'
/**
 * Companion Chat — Sara's main AI interface
 * Streams responses from /api/chat via Server-Sent Events
 */
import { useState, useRef, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function sendMessage() {
    if (!input.trim() || loading) return
    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setLoading(true)

    setMessages(prev => [...prev, { role: 'assistant', content: '' }])

    try {
      const response = await fetch('/api/chat/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, session_id: 'main' }),
      })

      const reader = response.body!.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const text = decoder.decode(value)
        const lines = text.split('\n')

        for (const line of lines) {
          if (line.startsWith('data: ') && !line.includes('[DONE]')) {
            const chunk = line.replace('data: ', '')
            setMessages(prev => {
              const updated = [...prev]
              updated[updated.length - 1].content += chunk
              return updated
            })
          }
        }
      }
    } catch (err) {
      setMessages(prev => {
        const updated = [...prev]
        updated[updated.length - 1].content = 'Something went wrong. Please try again.'
        return updated
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto">
      {/* Header */}
      <div className="border-b border-sara-border p-4">
        <h1 className="font-semibold">Your JEE Companion</h1>
        <p className="text-sara-muted text-xs">Ask anything — doubts, concepts, or just talk</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-sara-muted text-sm mt-20">
            <p className="text-lg mb-2">Hey Sara</p>
            <p>What are we working on today?</p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed
              ${msg.role === 'user'
                ? 'bg-sara-primary text-white rounded-br-sm'
                : 'bg-sara-surface border border-sara-border rounded-bl-sm'
              }`}>
              {msg.role === 'assistant' ? (
                <ReactMarkdown
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                  className="prose prose-invert prose-sm max-w-none"
                >
                  {msg.content || '...'}
                </ReactMarkdown>
              ) : (
                <p>{msg.content}</p>
              )}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-sara-border p-4">
        <div className="flex gap-2">
          <input
            className="flex-1 bg-sara-surface border border-sara-border rounded-xl px-4 py-3
                       text-sm placeholder-sara-muted focus:outline-none focus:border-sara-primary"
            placeholder="Ask a doubt, or just talk..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="bg-sara-primary hover:bg-indigo-500 disabled:opacity-40
                       text-white px-5 py-3 rounded-xl text-sm font-medium transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

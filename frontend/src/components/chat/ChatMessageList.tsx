'use client'

import { useEffect, useRef } from 'react'
import { MarkdownMessage } from './MarkdownMessage'
import type { ChatMessage } from './types'

interface ChatMessageListProps {
  messages: ChatMessage[]
  streaming: boolean
}

export function ChatMessageList({ messages, streaming }: ChatMessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streaming])

  return (
    <div className="sara-chat-messages">
      <div className="sara-chat-messages-inner">
        {messages.length === 0 && (
          <div className="sara-chat-empty">
            <p className="sara-chat-empty-kicker">Start a session</p>
            <h2 className="sara-chat-empty-title">What are we tackling today?</h2>
            <p className="sara-chat-empty-sub">
              Doubts, problems, exam anxiety — send anything. Sara reasons step by step
              and uses math notation when it helps.
            </p>
          </div>
        )}

        {messages.map((msg, i) => {
          const isUser = msg.role === 'user'
          const isLastAssistant = !isUser && i === messages.length - 1
          const showCursor = isLastAssistant && streaming

          return (
            <div
              key={i}
              className={`sara-chat-row${isUser ? ' sara-chat-row--user' : ''}`}
            >
              {isUser ? (
                <div className="sara-chat-bubble sara-chat-bubble--user">
                  <p style={{ whiteSpace: 'pre-wrap', fontSize: 15, lineHeight: 1.6 }}>
                    {msg.content}
                  </p>
                </div>
              ) : (
                <div className="sara-chat-bubble sara-chat-bubble--assistant">
                  <MarkdownMessage content={msg.content} />
                  {showCursor && (
                    <span
                      className="sara-chat-cursor"
                      aria-hidden
                    />
                  )}
                </div>
              )}
            </div>
          )
        })}

        <div ref={bottomRef} aria-hidden />
      </div>
    </div>
  )
}

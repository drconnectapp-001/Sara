'use client'

import { useEffect, useRef } from 'react'
import { MarkdownMessage } from './MarkdownMessage'
import type { ChatMessage } from './types'
import { cn } from './cn'

interface ChatMessageListProps {
  messages: ChatMessage[]
  streaming: boolean
  className?: string
}

export function ChatMessageList({ messages, streaming, className }: ChatMessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streaming])

  return (
    <div
      ref={scrollRef}
      className={cn(
        'min-h-0 flex-1 overflow-y-auto',
        className
      )}
    >
      <div className="mx-auto max-w-3xl space-y-6 px-4 py-8 sm:px-6">
        {messages.length === 0 && (
          <div className="flex min-h-[40vh] flex-col items-center justify-center px-6 text-center">
            <p className="text-sm font-medium tracking-wide text-indigo-300/90">Start a session</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              What are we tackling today?
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-400">
              Mechanics stuck in your head, organic confusion, or exam anxiety — send anything. I
              reason step by step and use math notation when it helps.
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
              className={cn('flex w-full', isUser ? 'justify-end' : 'justify-start')}
            >
              <div
                className={cn(
                  'max-w-[min(100%,520px)] rounded-2xl px-4 py-3 shadow-lg sm:px-5 sm:py-4',
                  isUser
                    ? 'rounded-br-md bg-gradient-to-br from-indigo-600 to-violet-700 text-white shadow-indigo-900/20 ring-1 ring-white/10'
                    : 'rounded-bl-md border border-white/[0.07] bg-[#161626]/95 text-slate-100 shadow-black/20 ring-1 ring-white/[0.03]'
                )}
              >
                {isUser ? (
                  <p className="whitespace-pre-wrap text-[15px] leading-relaxed">{msg.content}</p>
                ) : (
                  <div className="relative">
                    <MarkdownMessage content={msg.content} />
                    {showCursor && (
                      <span
                        className="ml-0.5 inline-block h-4 w-0.5 translate-y-0.5 animate-pulse bg-indigo-400/90"
                        aria-hidden
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          )
        })}
        <div ref={bottomRef} className="h-px w-full shrink-0" aria-hidden />
      </div>
    </div>
  )
}

'use client'

import { ArrowUp } from 'lucide-react'
import { cn } from './cn'

interface ChatComposerProps {
  value: string
  onChange: (value: string) => void
  onSend: () => void
  disabled?: boolean
  className?: string
}

export function ChatComposer({ value, onChange, onSend, disabled, className }: ChatComposerProps) {
  const canSend = value.trim().length > 0 && !disabled

  return (
    <div
      className={cn(
        'shrink-0 border-t border-white/[0.06] bg-[#0f0f1a]/90 backdrop-blur-xl',
        className
      )}
    >
      <div className="relative mx-auto max-w-3xl px-4 py-4 sm:px-6">
        <div className="flex items-end gap-2 rounded-2xl border border-white/[0.08] bg-[#141422]/90 p-2 shadow-[0_0_40px_-12px_rgba(99,102,241,0.35)] ring-1 ring-white/[0.04] transition-shadow focus-within:border-indigo-500/35 focus-within:shadow-[0_0_48px_-8px_rgba(99,102,241,0.45)] focus-within:ring-indigo-500/20">
          <textarea
            className="max-h-40 min-h-[52px] flex-1 resize-none bg-transparent px-3 py-3 text-[15px] leading-snug text-slate-100 placeholder:text-slate-500 focus:outline-none disabled:opacity-50"
            placeholder="Ask a doubt, paste a problem, or just talk…"
            rows={1}
            value={value}
            disabled={disabled}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                if (canSend) onSend()
              }
            }}
          />
          <button
            type="button"
            aria-label="Send message"
            disabled={!canSend}
            onClick={onSend}
            className="mb-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-500/30 transition-all hover:brightness-110 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-35"
          >
            <ArrowUp className="h-5 w-5" strokeWidth={2.2} />
          </button>
        </div>
        <p className="mt-2 text-center text-[11px] text-slate-600">
          Shift+Enter for a new line · Sara streams answers as they arrive
        </p>
      </div>
    </div>
  )
}

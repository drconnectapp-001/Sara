'use client'

import { useEffect, useState } from 'react'
import { Sparkles } from 'lucide-react'
import type { SaraProfile } from './types'
import { cn } from './cn'

interface ChatHeaderProps {
  className?: string
}

export function ChatHeader({ className }: ChatHeaderProps) {
  const [profile, setProfile] = useState<SaraProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const res = await fetch('/api/admin/sara', { cache: 'no-store' })
        if (!res.ok) throw new Error('profile unavailable')
        const data = (await res.json()) as SaraProfile
        if (!cancelled) setProfile(data)
      } catch {
        if (!cancelled)
          setProfile({
            name: 'Sara',
            current_mood: null,
          })
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    void load()
    return () => {
      cancelled = true
    }
  }, [])

  const name = profile?.name ?? 'Sara'
  const mood = profile?.current_mood?.trim()

  return (
    <header
      className={cn(
        'shrink-0 border-b border-white/[0.06] bg-[#0f0f1a]/85 backdrop-blur-xl',
        className
      )}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
      <div className="relative mx-auto flex max-w-3xl items-center gap-4 px-4 py-4 sm:px-6">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/90 to-violet-600/80 text-white shadow-lg shadow-indigo-500/25 ring-1 ring-white/10"
          aria-hidden
        >
          <Sparkles className="h-6 w-6" strokeWidth={1.5} />
        </div>
        <div className="min-w-0 flex-1">
          {loading ? (
            <div className="space-y-2">
              <div className="h-5 w-32 animate-pulse rounded-md bg-white/10" />
              <div className="h-4 w-48 animate-pulse rounded-md bg-white/5" />
            </div>
          ) : (
            <>
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <h1 className="truncate text-lg font-semibold tracking-tight text-white">
                  {name}
                </h1>
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-indigo-300/80">
                  JEE companion
                </span>
              </div>
              <p className="mt-0.5 truncate text-sm text-slate-400">
                {mood ? (
                  <>
                    <span className="text-slate-500">Feeling </span>
                    <span className="font-medium text-slate-300">{mood}</span>
                    <span className="text-slate-500"> · here to prep with you</span>
                  </>
                ) : (
                  <span>Doubts, concepts, pressure — bring it all here.</span>
                )}
              </p>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

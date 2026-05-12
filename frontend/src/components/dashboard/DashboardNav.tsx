'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, MessageCircle, Sparkles } from 'lucide-react'
import { cn } from './cn'

const links = [
  { href: '/dashboard', label: 'Study', icon: LayoutDashboard },
  { href: '/chat', label: 'Chat', icon: MessageCircle },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-20 border-b border-white/[0.06] bg-[#0f0f1a]/85 backdrop-blur-xl">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/dashboard" className="flex items-center gap-3 text-white transition-opacity hover:opacity-90">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/90 to-violet-600/80 shadow-lg shadow-indigo-500/20 ring-1 ring-white/10"
            aria-hidden
          >
            <Sparkles className="h-5 w-5" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-sm font-semibold tracking-tight">Sara</p>
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-indigo-300/80">JEE companion</p>
          </div>
        </Link>
        <div className="flex rounded-xl border border-white/[0.08] bg-[#141422]/80 p-1 ring-1 ring-white/[0.04]">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname?.startsWith(href + '/')
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all',
                  active
                    ? 'bg-gradient-to-br from-indigo-600/90 to-violet-700/80 text-white shadow-md shadow-indigo-900/30'
                    : 'text-slate-400 hover:bg-white/[0.06] hover:text-slate-200'
                )}
              >
                <Icon className="h-4 w-4" strokeWidth={1.75} />
                {label}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

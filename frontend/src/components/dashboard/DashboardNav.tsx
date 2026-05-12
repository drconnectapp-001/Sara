'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, MessageCircle, Sparkles } from 'lucide-react'
import { cn } from './cn'
import { accentGradientBr } from './dashboardTheme'

const links = [
  { href: '/dashboard', label: 'Study', icon: LayoutDashboard },
  { href: '/chat', label: 'Chat', icon: MessageCircle },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-20 border-b border-white/40 bg-white/50 shadow-[0_4px_24px_-8px_rgba(59,130,246,0.2)] backdrop-blur-xl">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#3B82F6]/40 to-transparent" />
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 text-slate-900 transition-opacity hover:opacity-90"
        >
          <div
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-lg shadow-blue-500/25 ring-1 ring-white/50',
              accentGradientBr
            )}
            aria-hidden
          >
            <Sparkles className="h-5 w-5" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-sm font-semibold tracking-tight">Sara</p>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#3B82F6]">
              JEE companion
            </p>
          </div>
        </Link>
        <div className="flex rounded-xl border border-white/40 bg-white/45 p-1 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9)] backdrop-blur-md">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname?.startsWith(href + '/')
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-all',
                  active
                    ? cn(
                        'text-white shadow-md shadow-indigo-500/25',
                        accentGradientBr,
                        'ring-1 ring-white/30'
                      )
                    : 'text-slate-600 hover:bg-white/70 hover:text-slate-900'
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

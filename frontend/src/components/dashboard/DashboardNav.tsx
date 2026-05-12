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
    <nav className="sara-dashboard-nav">
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#3B82F6]/45 to-transparent"
        aria-hidden
      />
      <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        <Link href="/dashboard" className="group flex items-center gap-3.5 text-slate-900">
          <div
            className={cn(
              'flex h-11 w-11 items-center justify-center rounded-2xl text-white shadow-lg ring-2 ring-white/60',
              accentGradientBr
            )}
            aria-hidden
          >
            <Sparkles className="h-5 w-5" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-[15px] font-bold tracking-tight text-slate-900">Sara</p>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2563eb]">JEE companion</p>
          </div>
        </Link>
        <div className="flex rounded-2xl border border-white/50 bg-white/40 p-1 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9)] backdrop-blur-md">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname?.startsWith(`${href}/`)
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all',
                  active
                    ? cn(
                        'text-white shadow-lg shadow-indigo-500/30',
                        accentGradientBr,
                        'ring-2 ring-white/40'
                      )
                    : 'text-slate-600 hover:bg-white/75 hover:text-slate-900'
                )}
              >
                <Icon className="h-4 w-4" strokeWidth={1.85} />
                {label}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

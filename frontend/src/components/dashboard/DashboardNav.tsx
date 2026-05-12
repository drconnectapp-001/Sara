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
    <nav className="sara-dashboard-nav">
      <div className="sara-dashboard-nav-accent-line" aria-hidden />
      <div className="sara-dashboard-nav-inner">
        <Link href="/dashboard" className={cn('sara-dashboard-nav-brand', 'group')}>
          <div className={cn('sara-dashboard-logo')} aria-hidden>
            <Sparkles className="h-5 w-5" strokeWidth={1.5} />
          </div>
          <div>
            <p className="sara-dashboard-nav-brand-text-title">Sara</p>
            <p className="sara-dashboard-nav-brand-text-sub">JEE companion</p>
          </div>
        </Link>
        <div className="sara-dashboard-tabs">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname?.startsWith(`${href}/`)
            return (
              <Link
                key={href}
                href={href}
                className={cn('sara-dashboard-tab', active && 'sara-dashboard-tab--active')}
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

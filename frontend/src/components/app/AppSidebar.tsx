'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Sparkles, LayoutDashboard, MessageCircle, Target, BookOpen } from 'lucide-react'

const navLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/chat',      label: 'Chat',      icon: MessageCircle },
  { href: '/practice',  label: 'Practice',  icon: BookOpen },
  { href: '/mock',      label: 'Log Mock',  icon: Target },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <aside className="sara-sidebar">
      <div className="sara-sidebar-logo">
        <div className="sara-sidebar-logo-icon" aria-hidden>
          <Sparkles className="h-5 w-5" strokeWidth={1.5} />
        </div>
        <div>
          <p className="sara-sidebar-logo-title">Sara</p>
          <p className="sara-sidebar-logo-sub">JEE Companion</p>
        </div>
      </div>

      <nav className="sara-sidebar-nav" aria-label="Main navigation">
        {navLinks.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`sara-sidebar-link${active ? ' sara-sidebar-link--active' : ''}`}
            >
              <Icon className="h-4 w-4 shrink-0" strokeWidth={1.85} />
              <span>{label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="sara-sidebar-footer">
        <p className="sara-sidebar-footer-text">JEE Mains 2027</p>
      </div>
    </aside>
  )
}

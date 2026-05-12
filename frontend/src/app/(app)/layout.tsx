import type { ReactNode } from 'react'
import { AppSidebar } from '@/components/app/AppSidebar'

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="sara-app-root">
      {/* Ambient background blobs */}
      <div
        className="pointer-events-none fixed -left-40 -top-20 z-0 h-[560px] w-[560px] rounded-full blur-3xl"
        style={{ background: 'rgba(125, 211, 252, 0.32)' }}
        aria-hidden
      />
      <div
        className="pointer-events-none fixed -right-32 top-16 z-0 h-[440px] w-[440px] rounded-full blur-3xl"
        style={{ background: 'rgba(199, 210, 254, 0.42)' }}
        aria-hidden
      />
      <div
        className="pointer-events-none fixed bottom-0 left-1/3 z-0 h-80 w-80 rounded-full blur-3xl"
        style={{ background: 'rgba(147, 197, 253, 0.30)' }}
        aria-hidden
      />
      <div
        className="pointer-events-none fixed bottom-24 right-12 z-0 h-56 w-56 rounded-full blur-3xl"
        style={{ background: 'rgba(99, 102, 241, 0.15)' }}
        aria-hidden
      />

      <div className="sara-app-shell">
        <AppSidebar />
        <main className="sara-app-main">
          {children}
        </main>
      </div>
    </div>
  )
}

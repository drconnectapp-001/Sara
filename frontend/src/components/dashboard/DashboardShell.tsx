import type { ReactNode } from 'react'

export function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <div className="sara-dashboard">
      {/* Blobs: inline so they always paint (no reliance on Tailwind purge). */}
      <div
        className="pointer-events-none fixed -left-32 top-0 z-0 h-[420px] w-[420px] rounded-full blur-3xl"
        style={{ background: 'rgba(125, 211, 252, 0.45)' }}
        aria-hidden
      />
      <div
        className="pointer-events-none fixed -right-24 top-24 z-0 h-[380px] w-[380px] rounded-full blur-3xl"
        style={{ background: 'rgba(199, 210, 254, 0.55)' }}
        aria-hidden
      />
      <div
        className="pointer-events-none fixed bottom-0 left-1/3 z-0 h-72 w-72 -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: 'rgba(147, 197, 253, 0.4)' }}
        aria-hidden
      />
      <div
        className="pointer-events-none fixed bottom-20 right-10 z-0 h-56 w-56 rounded-full blur-3xl"
        style={{ background: 'rgba(99, 102, 241, 0.2)' }}
        aria-hidden
      />
      <div className="relative z-10 min-h-screen">{children}</div>
    </div>
  )
}

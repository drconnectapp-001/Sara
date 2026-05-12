import type { ReactNode } from 'react'

export function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-sky-50 via-white to-indigo-100 text-slate-800 antialiased">
      {/* Soft radial blobs */}
      <div
        className="pointer-events-none fixed -left-32 top-0 h-[420px] w-[420px] rounded-full bg-sky-200/35 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed -right-24 top-24 h-[380px] w-[380px] rounded-full bg-indigo-200/30 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed bottom-0 left-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-200/25 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed bottom-20 right-10 h-56 w-56 rounded-full bg-[#6366F1]/10 blur-3xl"
        aria-hidden
      />
      <div className="relative z-10 min-h-screen">{children}</div>
    </div>
  )
}

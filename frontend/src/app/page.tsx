/**
 * Landing — dark shell matches chat / companion aesthetic
 */
export default function HomePage() {
  return (
    <div className="sara-dark-app">
    <main className="min-h-screen p-6 max-w-6xl mx-auto">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold text-sara-text">
          Hey Sara
        </h1>
        <p className="text-sara-muted text-sm mt-1">
          Ready to work towards your goal today?
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatCard label="Study Streak" value="—" unit="days" />
        <StatCard label="Questions Today" value="—" unit="solved" />
        <StatCard label="Days to JEE" value="—" unit="remaining" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-sara-surface border border-sara-border rounded-xl p-5">
          <h2 className="font-medium mb-3">Today&apos;s Plan</h2>
          <p className="text-sara-muted text-sm">Study planner coming soon...</p>
        </div>
        <div className="bg-sara-surface border border-sara-border rounded-xl p-5">
          <h2 className="font-medium mb-3">Weak Areas</h2>
          <p className="text-sara-muted text-sm">Analytics coming soon...</p>
        </div>
      </div>
    </main>
    </div>
  )
}

function StatCard({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div className="bg-sara-surface border border-sara-border rounded-xl p-5">
      <p className="text-sara-muted text-xs uppercase tracking-wide mb-1">{label}</p>
      <p className="text-3xl font-bold text-sara-primary">{value}</p>
      <p className="text-sara-muted text-sm">{unit}</p>
    </div>
  )
}

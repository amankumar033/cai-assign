/**
 * StatsPanel.jsx — dataset summary metrics (right column)
 */

function StatItem({ label, value, icon, accent }) {
  const accents = {
    indigo: 'bg-indigo-50 text-indigo-600 ring-indigo-100',
    violet: 'bg-violet-50 text-violet-600 ring-violet-100',
    emerald: 'bg-emerald-50 text-emerald-600 ring-emerald-100',
  }

  return (
    <div className="flex items-center gap-4 rounded-lg border border-zinc-100 bg-zinc-50/50 px-4 py-3.5 transition-colors hover:border-zinc-200 hover:bg-white">
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1 ${accents[accent]}`}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">{label}</p>
        <p className="mt-0.5 text-2xl font-semibold tabular-nums text-zinc-800">
          {value.toLocaleString()}
        </p>
      </div>
    </div>
  )
}

function StatsPanel({ totalRows, columnCount, displayedRows, activeFilterCount, hasData }) {
  const displayedLabel = activeFilterCount > 0 ? 'Matching rows' : 'Displayed rows'

  return (
    <section className="card flex h-full flex-col">
      <div className="card-header">
        <h2 className="section-title">Overview</h2>
        <p className="section-desc">
          {hasData ? 'Summary of your loaded dataset' : 'Stats appear after you upload a file'}
        </p>
      </div>

      <div className="flex flex-1 flex-col justify-center gap-3 p-4 sm:p-6">
        <StatItem
          label="Total rows"
          value={totalRows}
          accent="indigo"
          icon={
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg>
          }
        />
        <StatItem
          label="Columns"
          value={columnCount}
          accent="violet"
          icon={
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7"
              />
            </svg>
          }
        />
        <StatItem
          label={displayedLabel}
          value={displayedRows}
          accent="emerald"
          icon={
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          }
        />
      </div>
    </section>
  )
}

export default StatsPanel

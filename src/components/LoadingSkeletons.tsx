/** Shimmer placeholders using DaisyUI `skeleton` */

export function StatsCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" aria-hidden>
      {[0, 1].map((i) => (
        <div
          key={i}
          className="stat bg-base-100 rounded-box shadow-sm border border-base-300"
        >
          <div className="skeleton h-3 w-24 mb-3" />
          <div className="skeleton h-10 w-16 mb-2" />
          <div className="skeleton h-3 w-36" />
        </div>
      ))}
    </div>
  )
}

export function LinksTableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div
      className="card bg-base-100 shadow-sm border border-base-300 overflow-x-auto"
      aria-busy="true"
      aria-label="Loading links"
    >
      <div className="card-body">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="skeleton h-7 w-28" />
          <div className="skeleton h-5 w-16 rounded-full" />
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>
                <div className="skeleton h-3 w-20" />
              </th>
              <th>
                <div className="skeleton h-3 w-24" />
              </th>
              <th>
                <div className="skeleton h-3 w-12" />
              </th>
              <th>
                <div className="skeleton h-3 w-12" />
              </th>
              <th>
                <div className="skeleton h-3 w-16" />
              </th>
              <th>
                <div className="skeleton h-3 w-14" />
              </th>
              <th>
                <div className="skeleton h-3 w-16" />
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }, (_, row) => (
              <tr key={row}>
                <td>
                  <div className="skeleton h-4 w-20" />
                </td>
                <td>
                  <div className="skeleton h-4 w-48 max-w-full" />
                </td>
                <td>
                  <div className="skeleton h-4 w-16" />
                </td>
                <td>
                  <div className="skeleton h-5 w-10 rounded-full" />
                </td>
                <td>
                  <div className="skeleton h-4 w-20" />
                </td>
                <td>
                  <div className="skeleton h-4 w-24" />
                </td>
                <td>
                  <div className="flex gap-2">
                    <div className="skeleton h-6 w-12" />
                    <div className="skeleton h-6 w-14" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/** Full-page shimmer while restoring session (ProtectedRoute) */
export function AppShellSkeleton() {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col" aria-busy="true" aria-label="Loading">
      <header className="navbar bg-base-100 border-b border-base-300 px-4">
        <div className="flex-1">
          <div className="skeleton h-7 w-40" />
        </div>
        <div className="flex-none flex items-center gap-3">
          <div className="skeleton h-9 w-9 rounded-full" />
          <div className="skeleton h-9 w-9 rounded-full" />
        </div>
      </header>

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-8 space-y-6">
        <div>
          <div className="skeleton h-9 w-48 mb-2" />
          <div className="skeleton h-4 w-72 max-w-full" />
        </div>
        <StatsCardsSkeleton />
        <div className="card bg-base-100 shadow-sm border border-base-300">
          <div className="card-body gap-3">
            <div className="skeleton h-6 w-36" />
            <div className="skeleton h-10 w-full" />
            <div className="skeleton h-10 w-2/3 max-w-md" />
          </div>
        </div>
        <LinksTableSkeleton rows={4} />
      </main>
    </div>
  )
}

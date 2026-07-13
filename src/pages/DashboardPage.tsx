import { useAppSelector } from '../store/hooks'

export default function DashboardPage() {
  const tenant = useAppSelector((state) => state.auth.tenant)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-base-content/70 mt-1">
          Welcome back, <span className="font-medium text-primary">{tenant?.name}</span>
        </p>
      </div>

      <div className="card bg-base-100 shadow-sm border border-base-300">
        <div className="card-body">
          <h2 className="card-title">Coming in Step 9</h2>
          <p className="text-base-content/70">
            Stats cards, create link form, and links table will be added here next.
          </p>
        </div>
      </div>
    </div>
  )
}

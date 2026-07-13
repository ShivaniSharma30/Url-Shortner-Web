import { useAppSelector } from '../store/hooks'

export default function DashboardPage() {
  const tenant = useAppSelector((state) => state.auth.tenant)

  return (
    <div className="min-h-screen bg-base-200 p-8">
      <div className="card bg-base-100 shadow-lg max-w-2xl mx-auto">
        <div className="card-body">
          <h1 className="card-title text-2xl text-primary">Dashboard Page</h1>
          <p className="text-base-content/70">
            Welcome, {tenant?.name ?? 'Tenant'} — we will build this in Step 9
          </p>
        </div>
      </div>
    </div>
  )
}

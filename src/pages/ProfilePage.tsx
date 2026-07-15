import { Link } from 'react-router-dom'
import AvatarInitials from '../components/AvatarInitials'
import { useAppSelector } from '../store/hooks'

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export default function ProfilePage() {
  const tenant = useAppSelector((state) => state.auth.tenant)

  if (!tenant) return null

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Profile</h1>
          <p className="text-base-content/70 mt-1">Your organization account details</p>
        </div>
        <Link to="/dashboard" className="btn btn-primary shrink-0">
          Go to Dashboard
        </Link>
      </div>

      <div className="card bg-base-100 shadow-sm border border-base-300 rounded-2xl">
        <div className="card-body">
          <div className="flex items-center gap-4 mb-4">
            <AvatarInitials name={tenant.name} size="w-16 h-16" textClass="text-xl" />
            <div>
              <h2 className="text-2xl font-semibold">{tenant.name}</h2>
              <p className="text-sm text-base-content/60">Organization account</p>
            </div>
          </div>

          <div className="divider my-2" />

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-wide text-base-content/50">Tenant ID</p>
              <p className="font-mono text-sm mt-1 break-all">{tenant.id}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-base-content/50">Member since</p>
              <p className="font-medium mt-1">{formatDate(tenant.createdAt)}</p>
            </div>
          </div>

          <div className="alert alert-info mt-4 text-sm">
            <span>
              Your API key is stored securely in this browser. It is never shown again
              after registration — keep it safe.
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

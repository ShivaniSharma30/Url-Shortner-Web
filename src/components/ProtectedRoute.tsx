import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../store/hooks'

export default function ProtectedRoute() {
  const { apiKey, tenant, status } = useAppSelector((state) => state.auth)

  if (!apiKey) {
    return <Navigate to="/login" replace />
  }

  if (status === 'loading' && !tenant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    )
  }

  if (!tenant) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

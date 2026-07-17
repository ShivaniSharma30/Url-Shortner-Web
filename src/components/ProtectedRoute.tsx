import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../store/hooks'
import { AppShellSkeleton } from './LoadingSkeletons'

export default function ProtectedRoute() {
  const { apiKey, tenant, status } = useAppSelector((state) => state.auth)

  if (!apiKey) {
    return <Navigate to="/login" replace />
  }

  if (status === 'loading' && !tenant) {
    return <AppShellSkeleton />
  }

  if (!tenant) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

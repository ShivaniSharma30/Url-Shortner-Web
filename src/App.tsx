import { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import DashboardPage from './pages/DashboardPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { fetchProfile } from './store/slices/authSlice'

function AppRoutes() {
  const dispatch = useAppDispatch()
  const { apiKey, tenant } = useAppSelector((state) => state.auth)

  useEffect(() => {
    if (apiKey && !tenant) {
      dispatch(fetchProfile())
    }
  }, [apiKey, tenant, dispatch])

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

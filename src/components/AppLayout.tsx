import { Outlet } from 'react-router-dom'
import Header from './Header'
import Toast from './Toast'

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      <Header />
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Toast />
    </div>
  )
}

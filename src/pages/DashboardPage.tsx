import { useEffect } from 'react'
import CreateLinkForm from '../components/CreateLinkForm'
import LinksTable from '../components/LinksTable'
import StatsCards from '../components/StatsCards'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { loadLinks } from '../store/slices/linksSlice'

export default function DashboardPage() {
  const dispatch = useAppDispatch()
  const tenant = useAppSelector((state) => state.auth.tenant)

  useEffect(() => {
    dispatch(loadLinks(undefined))
  }, [dispatch])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-base-content/70 mt-1">
          Manage short links for{' '}
          <span className="font-medium text-primary">{tenant?.name}</span>
        </p>
      </div>

      <StatsCards />
      <CreateLinkForm />
      <LinksTable />
    </div>
  )
}

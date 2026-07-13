import { useAppSelector } from '../store/hooks'

export default function StatsCards() {
  const items = useAppSelector((state) => state.links.items)

  const totalLinks = items.length
  const totalClicks = items.reduce((sum, link) => sum + link.clicks, 0)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="stat bg-base-100 rounded-box shadow-sm border border-base-300">
        <div className="stat-title">Total Links</div>
        <div className="stat-value text-primary">{totalLinks}</div>
        <div className="stat-desc">Active shortened URLs</div>
      </div>
      <div className="stat bg-base-100 rounded-box shadow-sm border border-base-300">
        <div className="stat-title">Total Clicks</div>
        <div className="stat-value text-secondary">{totalClicks}</div>
        <div className="stat-desc">Across all your links</div>
      </div>
    </div>
  )
}

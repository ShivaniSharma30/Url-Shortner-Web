import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { loadLinks, removeLink, resetDeleteStatus } from '../store/slices/linksSlice'
import { showToast } from '../store/slices/uiSlice'
import { LinksTableSkeleton } from './LoadingSkeletons'

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function formatDateTime(value: string): string {
  return new Date(value).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function LinksTable() {
  const dispatch = useAppDispatch()
  const { items, status, error, deleteStatus, deleteError, pagination } = useAppSelector(
    (state) => state.links,
  )

  useEffect(() => {
    if (deleteStatus === 'succeeded') {
      dispatch(showToast({ message: 'Link deleted', type: 'success' }))
      dispatch(resetDeleteStatus())
    }

    if (deleteStatus === 'failed' && deleteError) {
      dispatch(showToast({ message: deleteError, type: 'error' }))
      dispatch(resetDeleteStatus())
    }
  }, [deleteStatus, deleteError, dispatch])

  const goToPage = (page: number) => {
    if (page < 1 || page > pagination.totalPages) return
    dispatch(loadLinks({ page, limit: pagination.limit || 20 }))
  }

  const handleCopy = async (shortUrl: string) => {
    try {
      await navigator.clipboard.writeText(shortUrl)
      dispatch(showToast({ message: 'Short URL copied!', type: 'success' }))
    } catch {
      dispatch(showToast({ message: 'Could not copy URL', type: 'error' }))
    }
  }

  const handleDelete = (shortCode: string) => {
    if (window.confirm('Delete this short link?')) {
      dispatch(removeLink(shortCode))
    }
  }

  if (status === 'loading' && items.length === 0) {
    return <LinksTableSkeleton />
  }

  if (error) {
    return (
      <div className="alert alert-error shadow-sm">
        <span>{error}</span>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="card bg-base-100 shadow-sm border border-base-300">
        <div className="card-body items-center text-center py-14 gap-2">
          <div className="w-14 h-14 rounded-full bg-base-200 flex items-center justify-center text-2xl text-primary font-bold">
            ∞
          </div>
          <h3 className="font-semibold text-lg">No links yet</h3>
          <p className="text-base-content/70 max-w-sm">
            Paste a long URL in the form above to create your first short link.
          </p>
        </div>
      </div>
    )
  }

  const isRefreshing = status === 'loading' && items.length > 0

  return (
    <div className="card bg-base-100 shadow-sm border border-base-300 overflow-x-auto">
      <div className={`card-body transition-opacity ${isRefreshing ? 'opacity-50' : ''}`}>
        <div className="flex items-center justify-between gap-2">
          <h2 className="card-title">Your Links</h2>
          <span className="badge badge-ghost">{pagination.total} total</span>
        </div>
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Short URL</th>
              <th>Original URL</th>
              <th>Title</th>
              <th>Clicks</th>
              <th>Created</th>
              <th>Expires</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((link) => (
              <tr key={link.id}>
                <td>
                  <a
                    href={link.shortUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="link link-primary font-medium"
                  >
                    {link.shortCode}
                  </a>
                </td>
                <td className="max-w-xs truncate" title={link.originalUrl}>
                  {link.originalUrl}
                </td>
                <td>{link.title || '—'}</td>
                <td>
                  <span className="badge badge-ghost">{link.clicks}</span>
                </td>
                <td>{formatDate(link.createdAt)}</td>
                <td>
                  {link.expiresAt ? formatDateTime(link.expiresAt) : '—'}
                </td>
                <td>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="btn btn-ghost btn-xs"
                      onClick={() => handleCopy(link.shortUrl)}
                    >
                      Copy
                    </button>
                    <button
                      type="button"
                      className="btn btn-ghost btn-xs text-error"
                      disabled={deleteStatus === 'loading'}
                      onClick={() => handleDelete(link.shortCode)}
                    >
                      {deleteStatus === 'loading' ? (
                        <span className="loading loading-spinner loading-xs" />
                      ) : (
                        'Delete'
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {pagination.totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4">
            <p className="text-sm text-base-content/60">
              Page {pagination.page} of {pagination.totalPages} · {pagination.total} links
            </p>
            <div className="join">
              <button
                type="button"
                className="btn btn-sm join-item"
                disabled={pagination.page <= 1 || status === 'loading'}
                onClick={() => goToPage(pagination.page - 1)}
              >
                Prev
              </button>
              <button type="button" className="btn btn-sm join-item btn-ghost no-animation">
                {pagination.page}
              </button>
              <button
                type="button"
                className="btn btn-sm join-item"
                disabled={pagination.page >= pagination.totalPages || status === 'loading'}
                onClick={() => goToPage(pagination.page + 1)}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { removeLink, resetDeleteStatus } from '../store/slices/linksSlice'
import { showToast } from '../store/slices/uiSlice'

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export default function LinksTable() {
  const dispatch = useAppDispatch()
  const { items, status, error, deleteStatus, deleteError } = useAppSelector(
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

  if (status === 'loading') {
    return (
      <div className="card bg-base-100 shadow-sm border border-base-300">
        <div className="card-body items-center py-16 gap-3">
          <span className="loading loading-spinner loading-lg text-primary" />
          <p className="text-sm text-base-content/60">Loading your links...</p>
        </div>
      </div>
    )
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

  return (
    <div className="card bg-base-100 shadow-sm border border-base-300 overflow-x-auto">
      <div className="card-body">
        <div className="flex items-center justify-between gap-2">
          <h2 className="card-title">Your Links</h2>
          <span className="badge badge-ghost">{items.length} active</span>
        </div>
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Short URL</th>
              <th>Original URL</th>
              <th>Title</th>
              <th>Clicks</th>
              <th>Created</th>
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
      </div>
    </div>
  )
}

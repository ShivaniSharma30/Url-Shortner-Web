import { useAppDispatch, useAppSelector } from '../store/hooks'
import { removeLink } from '../store/slices/linksSlice'

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export default function LinksTable() {
  const dispatch = useAppDispatch()
  const { items, status, error, deleteStatus } = useAppSelector((state) => state.links)

  const handleCopy = async (shortUrl: string) => {
    await navigator.clipboard.writeText(shortUrl)
  }

  const handleDelete = (shortCode: string) => {
    if (window.confirm('Delete this short link?')) {
      dispatch(removeLink(shortCode))
    }
  }

  if (status === 'loading') {
    return (
      <div className="card bg-base-100 shadow-sm border border-base-300">
        <div className="card-body items-center py-16">
          <span className="loading loading-spinner loading-lg text-primary" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="alert alert-error">
        <span>{error}</span>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="card bg-base-100 shadow-sm border border-base-300">
        <div className="card-body items-center text-center py-12">
          <h3 className="font-semibold text-lg">No links yet</h3>
          <p className="text-base-content/70">Create your first short link above.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="card bg-base-100 shadow-sm border border-base-300 overflow-x-auto">
      <div className="card-body">
        <h2 className="card-title">Your Links</h2>
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
                      Delete
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

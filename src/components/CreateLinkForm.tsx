import { type FormEvent, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { addLink, resetCreateStatus } from '../store/slices/linksSlice'

export default function CreateLinkForm() {
  const dispatch = useAppDispatch()
  const { createStatus, createError } = useAppSelector((state) => state.links)

  const [originalUrl, setOriginalUrl] = useState('')
  const [title, setTitle] = useState('')

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    dispatch(resetCreateStatus())

    const result = await dispatch(
      addLink({
        originalUrl: originalUrl.trim(),
        title: title.trim() || undefined,
      }),
    )

    if (addLink.fulfilled.match(result)) {
      setOriginalUrl('')
      setTitle('')
    }
  }

  return (
    <div className="card bg-base-100 shadow-sm border border-base-300">
      <div className="card-body">
        <h2 className="card-title">Create Short Link</h2>
        <p className="text-sm text-base-content/70">
          Paste a long URL and get a short link instantly.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <label className="form-control w-full">
            <span className="label-text font-medium">Original URL</span>
            <input
              type="url"
              className="input input-bordered w-full"
              placeholder="https://example.com/very-long-url"
              value={originalUrl}
              onChange={(event) => setOriginalUrl(event.target.value)}
              required
            />
          </label>

          <label className="form-control w-full">
            <span className="label-text font-medium">Title (optional)</span>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="My campaign link"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              maxLength={255}
            />
          </label>

          {createError && (
            <div className="alert alert-error text-sm py-2">
              <span>{createError}</span>
            </div>
          )}

          {createStatus === 'succeeded' && (
            <div className="alert alert-success text-sm py-2">
              <span>Short link created successfully!</span>
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary w-full sm:w-auto"
            disabled={createStatus === 'loading'}
          >
            {createStatus === 'loading' ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              'Shorten URL'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

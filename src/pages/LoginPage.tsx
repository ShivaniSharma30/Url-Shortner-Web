import { type FormEvent, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { loginWithApiKey } from '../store/slices/authSlice'

export default function LoginPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { status, error, apiKey, tenant } = useAppSelector((state) => state.auth)

  const [apiKeyInput, setApiKeyInput] = useState('')

  if (apiKey && tenant) {
    return <Navigate to="/dashboard" replace />
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    const result = await dispatch(loginWithApiKey(apiKeyInput.trim()))
    if (loginWithApiKey.fulfilled.match(result)) {
      navigate('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-lg border border-base-300">
        <div className="card-body">
          <h1 className="card-title text-2xl text-primary">Welcome Back</h1>
          <p className="text-sm text-base-content/70">
            Enter your API key to access your dashboard.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <label className="form-control w-full">
              <span className="label-text font-medium">API Key</span>
              <input
                type="text"
                className="input input-bordered w-full font-mono text-sm"
                placeholder="us_..."
                value={apiKeyInput}
                onChange={(event) => setApiKeyInput(event.target.value)}
                required
              />
            </label>

            {error && (
              <div className="alert alert-error text-sm py-2">
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                'Login'
              )}
            </button>
          </form>

          <p className="text-center text-sm mt-4">
            New here?{' '}
            <Link to="/register" className="link link-primary">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

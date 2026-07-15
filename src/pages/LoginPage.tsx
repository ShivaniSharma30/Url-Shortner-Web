import { type FormEvent, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
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
    <AuthLayout>
      <div className="auth-form-card card bg-base-100 shadow-xl border border-base-300 rounded-2xl">
        <div className="card-body">
          <p className="auth-eyebrow text-xs font-semibold uppercase tracking-wider text-primary mb-1">
            Welcome back
          </p>
          <h2 className="card-title text-2xl sm:text-3xl">Sign In</h2>
          <p className="auth-subtitle text-sm mb-4">
            Enter your API key to open your dashboard.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="form-control w-full">
              <span className="label-text font-medium mb-1.5 block">API Key</span>
              <input
                type="text"
                className="input input-bordered w-full font-mono text-sm h-11"
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
              className="btn btn-primary w-full h-11"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="divider text-xs my-5">OR</div>

          <p className="auth-footer text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="link link-primary font-semibold no-underline hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  )
}

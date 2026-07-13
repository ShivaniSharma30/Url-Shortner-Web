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
      <div className="card bg-base-100 shadow-lg border border-base-300">
        <div className="card-body">
          <h2 className="card-title text-2xl">Sign In</h2>
          <p className="text-sm text-base-content/70">
            Welcome back! Enter your API key to continue.
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
                'Sign In'
              )}
            </button>
          </form>

          <div className="divider text-xs">OR</div>

          <p className="text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="link link-primary font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  )
}

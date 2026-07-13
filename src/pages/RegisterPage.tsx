import { type FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import { setStoredApiKey } from '../api/axios'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  clearRegistration,
  loginWithApiKey,
  registerTenant,
} from '../store/slices/authSlice'

export default function RegisterPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { status, error, registeredTenant } = useAppSelector((state) => state.auth)

  const [name, setName] = useState('')
  const [copied, setCopied] = useState(false)

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    dispatch(registerTenant(name.trim()))
  }

  const handleCopyKey = async () => {
    if (!registeredTenant?.apiKey) return
    await navigator.clipboard.writeText(registeredTenant.apiKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleContinue = async () => {
    if (!registeredTenant?.apiKey) return

    setStoredApiKey(registeredTenant.apiKey)
    dispatch(clearRegistration())

    const result = await dispatch(loginWithApiKey(registeredTenant.apiKey))
    if (loginWithApiKey.fulfilled.match(result)) {
      navigate('/dashboard')
    }
  }

  if (registeredTenant) {
    return (
      <AuthLayout>
        <div className="card bg-base-100 shadow-lg border border-base-300">
          <div className="card-body">
            <h2 className="card-title text-2xl text-primary">You&apos;re all set!</h2>
            <p className="text-sm text-base-content/70">
              Save your API key now. You will need it to sign in again.
            </p>

            <div className="alert alert-warning mt-2 text-sm">
              <span>This key is shown only once. Store it safely.</span>
            </div>

            <label className="form-control w-full mt-2">
              <span className="label-text font-medium">Your API Key</span>
              <div className="join w-full">
                <input
                  type="text"
                  readOnly
                  className="input input-bordered join-item w-full font-mono text-sm"
                  value={registeredTenant.apiKey}
                />
                <button type="button" className="btn btn-primary join-item" onClick={handleCopyKey}>
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
            </label>

            <button type="button" className="btn btn-primary w-full mt-4" onClick={handleContinue}>
              Go to Dashboard
            </button>
          </div>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout>
      <div className="card bg-base-100 shadow-lg border border-base-300">
        <div className="card-body">
          <h2 className="card-title text-2xl">Sign Up</h2>
          <p className="text-sm text-base-content/70">
            Create your organization account to start shortening URLs.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <label className="form-control w-full">
              <span className="label-text font-medium">Organization Name</span>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Acme Corp"
                value={name}
                onChange={(event) => setName(event.target.value)}
                minLength={2}
                maxLength={100}
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
                'Create Account'
              )}
            </button>
          </form>

          <div className="divider text-xs">OR</div>

          <p className="text-center text-sm">
            Already have an account?{' '}
            <Link to="/login" className="link link-primary font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  )
}

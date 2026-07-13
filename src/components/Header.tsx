import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { logout } from '../store/slices/authSlice'
import { clearLinks } from '../store/slices/linksSlice'

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export default function Header() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { apiKey, tenant } = useAppSelector((state) => state.auth)

  const isLoggedIn = Boolean(apiKey && tenant)

  const handleLogout = () => {
    dispatch(logout())
    dispatch(clearLinks())
    navigate('/login')
  }

  return (
    <header className="navbar bg-base-100 border-b border-base-300 px-4 lg:px-8 min-h-16 sticky top-0 z-50">
      <div className="flex-1 gap-3">
        <Link to={isLoggedIn ? '/dashboard' : '/login'} className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary text-primary-content flex items-center justify-center font-bold text-lg shadow-sm">
            US
          </div>
          <div className="hidden sm:block text-left">
            <p className="font-bold text-base leading-tight text-primary">URL Shortener</p>
            <p className="text-xs text-base-content/60 leading-tight">
              Shorten links · Track clicks · Multi-tenant
            </p>
          </div>
        </Link>
      </div>

      <div className="flex-none gap-2 items-center">
        {isLoggedIn && tenant ? (
          <>
            <div className="hidden md:flex items-center gap-2 mr-1">
              <div className="avatar placeholder">
                <div className="bg-primary text-primary-content rounded-full w-9">
                  <span className="text-xs font-semibold">{getInitials(tenant.name)}</span>
                </div>
              </div>
              <span className="text-sm font-medium">
                Hello, <span className="text-primary">{tenant.name}</span>
              </span>
            </div>
            <Link to="/profile" className="btn btn-ghost btn-sm">
              Profile
            </Link>
            <button type="button" className="btn btn-outline btn-sm" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-ghost btn-sm">
              Sign In
            </Link>
            <Link to="/register" className="btn btn-primary btn-sm">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  )
}

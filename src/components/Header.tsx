import { Link, useNavigate } from 'react-router-dom'
import AvatarInitials from './AvatarInitials'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { logout } from '../store/slices/authSlice'
import { clearLinks } from '../store/slices/linksSlice'
import { toggleTheme } from '../store/slices/uiSlice'

export default function Header() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { apiKey, tenant } = useAppSelector((state) => state.auth)
  const theme = useAppSelector((state) => state.ui.theme)

  const isLoggedIn = Boolean(apiKey && tenant)
  const isDark = theme === 'dark'

  const handleLogout = () => {
    dispatch(logout())
    dispatch(clearLinks())
    navigate('/login')
  }

  const handleToggleTheme = () => {
    dispatch(toggleTheme())
  }

  return (
    <header className="navbar bg-base-100 border-b border-base-300 px-4 lg:px-8 min-h-16 sticky top-0 z-50">
      <div className="navbar-start flex-1 gap-3">
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

      <div className="navbar-end flex flex-row flex-nowrap items-center gap-2 shrink-0">
        <label
          className="swap swap-rotate btn btn-ghost btn-sm btn-circle shrink-0"
          title={isDark ? 'Switch to light' : 'Switch to dark'}
        >
          <input
            type="checkbox"
            checked={isDark}
            onChange={handleToggleTheme}
            aria-label="Toggle dark mode"
          />
          <svg
            className="swap-off fill-current w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>
          <svg
            className="swap-on fill-current w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>

        {isLoggedIn && tenant ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost h-auto min-h-0 py-1.5 px-2 gap-2"
            >
              <AvatarInitials name={tenant.name} size="w-9 h-9" textClass="text-xs" />
              <div className="hidden sm:flex flex-col items-start text-left leading-tight">
                <span className="text-xs text-base-content/60">Hello</span>
                <span className="text-sm font-semibold text-primary max-w-[140px] truncate">
                  {tenant.name}
                </span>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 opacity-60 hidden sm:block"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-50 mt-2 w-52 p-2 shadow-lg border border-base-300"
            >
              <li className="menu-title px-3 pt-1 pb-0">
                <span className="text-xs font-normal text-base-content/50 normal-case tracking-normal">
                  Account
                </span>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <button type="button" onClick={handleLogout} className="text-error">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <Link to="/login" className="btn btn-ghost btn-sm shrink-0">
              Sign In
            </Link>
            <Link to="/register" className="btn btn-primary btn-sm shrink-0">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  )
}

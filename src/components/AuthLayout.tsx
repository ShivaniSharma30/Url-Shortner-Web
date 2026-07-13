import type { ReactNode } from 'react'
import Header from './Header'

interface AuthLayoutProps {
  children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      <Header />

      <div className="flex-1 grid lg:grid-cols-2">
        <div className="hidden lg:flex flex-col justify-center px-12 xl:px-16 bg-primary text-primary-content">
          <div className="max-w-md space-y-6">
            <h1 className="text-4xl font-bold leading-tight">
              Shorten URLs. Track every click.
            </h1>
            <p className="text-primary-content/80 text-lg">
              A simple dashboard for teams to create short links, monitor performance,
              and manage URLs securely with API keys.
            </p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <span className="badge badge-neutral">✓</span>
                Create branded short links in seconds
              </li>
              <li className="flex items-center gap-2">
                <span className="badge badge-neutral">✓</span>
                Real-time click analytics per link
              </li>
              <li className="flex items-center gap-2">
                <span className="badge badge-neutral">✓</span>
                Isolated multi-tenant workspaces
              </li>
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </div>
    </div>
  )
}

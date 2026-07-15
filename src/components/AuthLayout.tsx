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
        {/* Branding panel — theme-aware (works in corporate + dark) */}
        <div className="auth-brand-panel hidden lg:flex flex-col justify-center px-12 xl:px-16 relative overflow-hidden border-r border-base-300 bg-base-100">
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/15"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 rounded-full bg-primary/10 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-20 -right-16 w-64 h-64 rounded-full bg-secondary/10 blur-3xl"
            aria-hidden
          />

          <div className="relative z-10 max-w-md space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              Multi-tenant URL Shortener
            </div>

            <h1 className="text-4xl font-bold leading-tight text-base-content">
              Shorten URLs.
              <br />
              <span className="text-primary">Track every click.</span>
            </h1>

            <p className="text-base-content/70 text-lg leading-relaxed">
              A simple dashboard for teams to create short links, monitor performance,
              and manage URLs securely with API keys.
            </p>

            <ul className="space-y-3 text-sm">
              {[
                'Create short links in seconds',
                'Real-time click analytics per link',
                'Isolated multi-tenant workspaces',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-base-300 bg-base-200/70 px-3 py-2.5"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-content text-xs font-bold">
                    ✓
                  </span>
                  <span className="text-base-content/85">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Form panel — darker in dark mode so the card stands out */}
        <div className="auth-form-panel flex items-center justify-center p-6 sm:p-10 bg-base-200">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </div>
    </div>
  )
}

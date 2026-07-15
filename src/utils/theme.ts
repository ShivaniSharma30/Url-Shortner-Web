export type AppTheme = 'corporate' | 'dark'

const THEME_STORAGE_KEY = 'url_shortener_theme'

export function getStoredTheme(): AppTheme {
  const stored = localStorage.getItem(THEME_STORAGE_KEY)
  return stored === 'dark' ? 'dark' : 'corporate'
}

export function applyTheme(theme: AppTheme): void {
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem(THEME_STORAGE_KEY, theme)
}

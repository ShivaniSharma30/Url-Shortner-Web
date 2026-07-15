import { useEffect } from 'react'
import { useAppSelector } from '../store/hooks'
import { applyTheme } from '../utils/theme'

/** Keeps DaisyUI data-theme and localStorage in sync with Redux theme state. */
export default function ThemeSync() {
  const theme = useAppSelector((state) => state.ui.theme)

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  return null
}

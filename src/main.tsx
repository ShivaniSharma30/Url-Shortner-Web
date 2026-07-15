import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store'
import { applyTheme, getStoredTheme } from './utils/theme'
import './index.css'
import App from './App.tsx'

// Apply saved theme before first paint to avoid a light→dark flash
applyTheme(getStoredTheme())

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)

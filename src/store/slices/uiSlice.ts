import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { getStoredTheme, type AppTheme } from '../../utils/theme'

export type ToastType = 'success' | 'error' | 'info'

interface UiState {
  message: string | null
  type: ToastType
  visible: boolean
  theme: AppTheme
}

const initialState: UiState = {
  message: null,
  type: 'info',
  visible: false,
  theme: getStoredTheme(),
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showToast(
      state,
      action: PayloadAction<{ message: string; type?: ToastType }>,
    ) {
      state.message = action.payload.message
      state.type = action.payload.type ?? 'info'
      state.visible = true
    },
    hideToast(state) {
      state.visible = false
      state.message = null
    },
    setTheme(state, action: PayloadAction<AppTheme>) {
      state.theme = action.payload
    },
    toggleTheme(state) {
      state.theme = state.theme === 'corporate' ? 'dark' : 'corporate'
    },
  },
})

export const { showToast, hideToast, setTheme, toggleTheme } = uiSlice.actions
export default uiSlice.reducer

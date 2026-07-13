import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createTenant, getTenantProfile } from '../../api/tenants'
import {
  clearStoredApiKey,
  getStoredApiKey,
  setStoredApiKey,
} from '../../api/axios'
import type { Tenant, TenantCreated } from '../../types/api'

interface AuthState {
  apiKey: string | null
  tenant: Tenant | null
  registeredTenant: TenantCreated | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: AuthState = {
  apiKey: getStoredApiKey(),
  tenant: null,
  registeredTenant: null,
  status: 'idle',
  error: null,
}

export const registerTenant = createAsyncThunk(
  'auth/registerTenant',
  async (name: string, { rejectWithValue }) => {
    try {
      return await createTenant(name)
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Registration failed')
    }
  },
)

export const loginWithApiKey = createAsyncThunk(
  'auth/loginWithApiKey',
  async (apiKey: string, { rejectWithValue }) => {
    try {
      setStoredApiKey(apiKey)
      const tenant = await getTenantProfile()
      return { apiKey, tenant }
    } catch (error) {
      clearStoredApiKey()
      return rejectWithValue(error instanceof Error ? error.message : 'Login failed')
    }
  },
)

export const fetchProfile = createAsyncThunk(
  'auth/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const apiKey = getStoredApiKey()
      if (!apiKey) throw new Error('No API key found')

      const tenant = await getTenantProfile()
      return { apiKey, tenant }
    } catch (error) {
      clearStoredApiKey()
      return rejectWithValue(error instanceof Error ? error.message : 'Session expired')
    }
  },
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearRegistration(state) {
      state.registeredTenant = null
      state.error = null
    },
    logout(state) {
      clearStoredApiKey()
      state.apiKey = null
      state.tenant = null
      state.registeredTenant = null
      state.status = 'idle'
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerTenant.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(registerTenant.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.registeredTenant = action.payload
      })
      .addCase(registerTenant.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload as string
      })

    const onAuthSuccess = (
      state: AuthState,
      action: { payload: { apiKey: string; tenant: Tenant } },
    ) => {
      state.status = 'succeeded'
      state.apiKey = action.payload.apiKey
      state.tenant = action.payload.tenant
      state.error = null
    }

    builder
      .addCase(loginWithApiKey.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loginWithApiKey.fulfilled, onAuthSuccess)
      .addCase(loginWithApiKey.rejected, (state, action) => {
        state.status = 'failed'
        state.apiKey = null
        state.tenant = null
        state.error = action.payload as string
      })

    builder
      .addCase(fetchProfile.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchProfile.fulfilled, onAuthSuccess)
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = 'failed'
        state.apiKey = null
        state.tenant = null
        state.error = action.payload as string
      })
  },
})

export const { clearRegistration, logout } = authSlice.actions
export default authSlice.reducer

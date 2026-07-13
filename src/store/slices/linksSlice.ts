import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createLink, deleteLink, fetchLinks } from '../../api/links'
import type { CreateLinkPayload, Link, Pagination } from '../../types/api'

interface LinksState {
  items: Link[]
  pagination: Pagination
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  createStatus: 'idle' | 'loading' | 'succeeded' | 'failed'
  deleteStatus: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
  createError: string | null
  deleteError: string | null
}

const emptyPagination: Pagination = {
  page: 1,
  limit: 20,
  total: 0,
  totalPages: 0,
}

const initialState: LinksState = {
  items: [],
  pagination: emptyPagination,
  status: 'idle',
  createStatus: 'idle',
  deleteStatus: 'idle',
  error: null,
  createError: null,
  deleteError: null,
}

export const loadLinks = createAsyncThunk(
  'links/loadLinks',
  async (params: { page?: number; limit?: number } | undefined, { rejectWithValue }) => {
    try {
      const page = params?.page ?? 1
      const limit = params?.limit ?? 20
      return await fetchLinks(page, limit)
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to load links')
    }
  },
)

export const addLink = createAsyncThunk(
  'links/addLink',
  async (payload: CreateLinkPayload, { rejectWithValue }) => {
    try {
      return await createLink(payload)
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to create link')
    }
  },
)

export const removeLink = createAsyncThunk(
  'links/removeLink',
  async (shortCode: string, { rejectWithValue }) => {
    try {
      await deleteLink(shortCode)
      return shortCode
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to delete link')
    }
  },
)

const linksSlice = createSlice({
  name: 'links',
  initialState,
  reducers: {
    resetCreateStatus(state) {
      state.createStatus = 'idle'
      state.createError = null
    },
    clearLinks(state) {
      state.items = []
      state.pagination = emptyPagination
      state.status = 'idle'
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadLinks.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loadLinks.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload.items
        state.pagination = action.payload.pagination
      })
      .addCase(loadLinks.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload as string
      })

    builder
      .addCase(addLink.pending, (state) => {
        state.createStatus = 'loading'
        state.createError = null
      })
      .addCase(addLink.fulfilled, (state, action) => {
        state.createStatus = 'succeeded'
        state.items = [action.payload, ...state.items]
        state.pagination.total += 1
      })
      .addCase(addLink.rejected, (state, action) => {
        state.createStatus = 'failed'
        state.createError = action.payload as string
      })

    builder
      .addCase(removeLink.pending, (state) => {
        state.deleteStatus = 'loading'
        state.deleteError = null
      })
      .addCase(removeLink.fulfilled, (state, action) => {
        state.deleteStatus = 'succeeded'
        state.items = state.items.filter((link) => link.shortCode !== action.payload)
        state.pagination.total = Math.max(0, state.pagination.total - 1)
      })
      .addCase(removeLink.rejected, (state, action) => {
        state.deleteStatus = 'failed'
        state.deleteError = action.payload as string
      })
  },
})

export const { clearLinks, resetCreateStatus } = linksSlice.actions
export default linksSlice.reducer

import { apiClient } from './axios'
import type { ApiResponse, CreateLinkPayload, Link, LinksListData } from '../types/api'

export async function createLink(payload: CreateLinkPayload): Promise<Link> {
  const { data } = await apiClient.post<ApiResponse<Link>>('/links', payload)

  if (!data.success || !data.data) {
    throw new Error(data.message || 'Failed to create link')
  }

  return data.data
}

export async function fetchLinks(page = 1, limit = 20): Promise<LinksListData> {
  const { data } = await apiClient.get<ApiResponse<LinksListData>>('/links', {
    params: { page, limit },
  })

  if (!data.success || !data.data) {
    throw new Error(data.message || 'Failed to fetch links')
  }

  return data.data
}

export async function deleteLink(shortCode: string): Promise<void> {
  const { data } = await apiClient.delete<ApiResponse<null>>(`/links/${shortCode}`)

  if (!data.success) {
    throw new Error(data.message || 'Failed to delete link')
  }
}

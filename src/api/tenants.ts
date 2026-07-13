import { apiClient } from './axios'
import type { ApiResponse, Tenant, TenantCreated } from '../types/api'

export async function createTenant(name: string): Promise<TenantCreated> {
  const { data } = await apiClient.post<ApiResponse<TenantCreated>>('/tenants', { name })

  if (!data.success || !data.data) {
    throw new Error(data.message || 'Failed to create tenant')
  }

  return data.data
}

export async function getTenantProfile(): Promise<Tenant> {
  const { data } = await apiClient.get<ApiResponse<Tenant>>('/tenants/me')

  if (!data.success || !data.data) {
    throw new Error(data.message || 'Failed to fetch profile')
  }

  return data.data
}

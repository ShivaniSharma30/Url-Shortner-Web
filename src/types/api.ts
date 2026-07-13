export interface ApiResponse<T> {
  success: boolean
  message: string
  data?: T
}

export interface Tenant {
  id: string
  name: string
  createdAt: string
}

export interface TenantCreated extends Tenant {
  apiKey: string
}

export interface Link {
  id: string
  originalUrl: string
  shortCode: string
  shortUrl: string
  title: string | null
  clicks: number
  expiresAt: string | null
  createdAt: string
}
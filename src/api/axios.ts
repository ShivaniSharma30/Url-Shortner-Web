import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000/api/v1'
const API_KEY_STORAGE = 'url_shortener_api_key'

export const getStoredApiKey = (): string | null => localStorage.getItem(API_KEY_STORAGE)

export const setStoredApiKey = (apiKey: string): void => {
  localStorage.setItem(API_KEY_STORAGE, apiKey)
}

export const clearStoredApiKey = (): void => {
  localStorage.removeItem(API_KEY_STORAGE)
}

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
  const apiKey = getStoredApiKey()

  if (apiKey) {
    config.headers['X-API-Key'] = apiKey
  }

  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ??
      error.message ??
      'Something went wrong'

    return Promise.reject(new Error(message))
  },
)
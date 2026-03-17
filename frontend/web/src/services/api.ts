class ApiClient {
  private baseUrl: string
  private token: string | null = null

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.replace(/\/+$/, '')
    this.token = localStorage.getItem('token')
  }

  setToken(token: string | null) {
    this.token = token
    if (token) {
      localStorage.setItem('token', token)
    } else {
      localStorage.removeItem('token')
    }
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...options.headers as Record<string, string>,
    }

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`
    }

    const response = await fetch(`${this.baseUrl}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`, {
      ...options,
      headers,
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Network error' }))
      throw new Error(error.message ?? `HTTP ${response.status}`)
    }

    return response.json()
  }

  get<T>(endpoint: string) {
    return this.request<T>(endpoint)
  }

  post<T>(endpoint: string, data: unknown) {
    return this.request<T>(endpoint, { method: 'POST', body: JSON.stringify(data) })
  }

  put<T>(endpoint: string, data: unknown) {
    return this.request<T>(endpoint, { method: 'PUT', body: JSON.stringify(data) })
  }

  patch<T>(endpoint: string, data: unknown) {
    return this.request<T>(endpoint, { method: 'PATCH', body: JSON.stringify(data) })
  }

  delete<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: 'DELETE' })
  }
}

const AUTH_API_BASE = import.meta.env.VITE_AUTH_API_URL ?? 'http://localhost:8000'
const CARDS_API_BASE = import.meta.env.VITE_CARDS_API_URL ?? 'http://localhost:8001'

export const authApi = new ApiClient(AUTH_API_BASE)
export const cardsApi = new ApiClient(CARDS_API_BASE)

export function setApiToken(token: string | null) {
  authApi.setToken(token)
  cardsApi.setToken(token)
}

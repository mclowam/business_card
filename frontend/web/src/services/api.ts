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
    const isFormData = options.body instanceof FormData
    const headers: Record<string, string> = {
      ...(options.headers as Record<string, string>),
    }

    if (!isFormData && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json'
    }

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`
    }

    const response = await fetch(`${this.baseUrl}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`, {
      ...options,
      headers,
    })

    if (!response.ok) {
      const body = await response.json().catch(() => ({}))
      const msg = body.detail ?? body.message ?? `HTTP ${response.status}`
      throw new Error(typeof msg === 'string' ? msg : JSON.stringify(msg))
    }

    if (response.status === 204) {
      return undefined as T
    }

    return response.json() as Promise<T>
  }

  get<T>(endpoint: string) {
    return this.request<T>(endpoint)
  }

  post<T>(endpoint: string, data: unknown) {
    return this.request<T>(endpoint, { method: 'POST', body: JSON.stringify(data) })
  }

  postForm<T>(endpoint: string, data: FormData) {
    return this.request<T>(endpoint, { method: 'POST', body: data })
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

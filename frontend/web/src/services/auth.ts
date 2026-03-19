import { authApi, setApiToken } from './api'
import type { LoginPayload, RegisterPayload, TokenPair, UserPayload } from '@/types'

export const authService = {
  async login(payload: LoginPayload): Promise<TokenPair> {
    const data = await authApi.post<TokenPair>('/auth/login', payload)
    setApiToken(data.access_token)
    return data
  },

  async register(payload: RegisterPayload): Promise<void> {
    await authApi.post('/auth/register', payload)
    await this.login({ email: payload.email, password: payload.password })
  },

  async me(): Promise<UserPayload> {
    return authApi.get<UserPayload>('/auth/me')
  },

  logout() {
    setApiToken(null)
  },
}

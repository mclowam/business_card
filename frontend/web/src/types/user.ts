export type UserRole = 'admin' | 'client'

export interface UserPayload {
  user_id: number
  email: string
  role: UserRole
}

export interface TokenPair {
  access_token: string
  refresh_token: string
  token_type: 'bearer' | string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  email: string
  password: string
}

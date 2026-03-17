import { createContext, useCallback, useEffect, useState, type ReactNode } from 'react'
import type { UserPayload } from '@/types'
import { authService } from '@/services/auth'

interface AuthContextValue {
  user: UserPayload | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserPayload | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      setIsLoading(false)
      return
    }

    authService
      .me()
      .then(setUser)
      .catch(() => {
        localStorage.removeItem('token')
      })
      .finally(() => setIsLoading(false))
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    await authService.login({ email, password })
    const me = await authService.me()
    setUser(me)
  }, [])

  const register = useCallback(async (email: string, password: string) => {
    await authService.register({ email, password })
    const me = await authService.me()
    setUser(me)
  }, [])

  const logout = useCallback(() => {
    authService.logout()
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

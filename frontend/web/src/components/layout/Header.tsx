import { Link, useLocation } from 'react-router-dom'
import { CreditCard, LogOut, LayoutDashboard } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/Button'

export function Header() {
  const { isAuthenticated, user, logout } = useAuth()
  const location = useLocation()

  const isActive = (path: string) =>
    location.pathname === path ? 'text-primary-600' : 'text-surface-600 hover:text-surface-900'

  return (
    <header className="border-b border-surface-200/60 bg-surface-100/70 backdrop-blur-xl sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-sm shadow-primary-500/30 transition-transform duration-200 group-hover:scale-110">
            <CreditCard className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-surface-900">CardCraft</span>
        </Link>

        <nav className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className={`hidden sm:flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg transition-colors duration-150 ${isActive('/dashboard')} hover:bg-surface-200`}>
                <LayoutDashboard className="h-4 w-4" />
                Мой сайт
              </Link>
              <span className="hidden sm:block text-xs text-surface-400 px-2 border-r border-surface-300 pr-3">
                {user?.email}
              </span>
              <Button variant="ghost" size="sm" onClick={logout} className="text-surface-500 hover:text-red-400">
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">Войти</Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" size="sm">Регистрация</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

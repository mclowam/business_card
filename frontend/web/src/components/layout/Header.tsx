import { Link } from 'react-router-dom'
import { CreditCard, LogOut, LayoutDashboard } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/Button'

export function Header() {
  const { isAuthenticated, user, logout } = useAuth()

  return (
    <header className="border-b border-surface-200 bg-surface-100/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-surface-900 no-underline">
          <CreditCard className="h-6 w-6 text-primary-600" />
          <span className="text-lg font-semibold tracking-tight">CardCraft</span>
        </Link>

        <nav className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">
                  <LayoutDashboard className="h-4 w-4" />
                  <span className="hidden sm:inline">Мои сайты</span>
                </Button>
              </Link>
              <span className="text-sm text-surface-500 hidden sm:inline">
                {user?.username}
              </span>
              <Button variant="ghost" size="sm" onClick={logout}>
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

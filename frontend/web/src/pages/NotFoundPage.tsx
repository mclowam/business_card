import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'

export function NotFoundPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-7xl font-bold text-surface-300 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-surface-900 mb-2">Страница не найдена</h2>
      <p className="text-surface-500 mb-8 max-w-md">
        Такой страницы не существует. Возможно, она была удалена или вы ошиблись адресом.
      </p>
      <Link to="/">
        <Button>На главную</Button>
      </Link>
    </div>
  )
}

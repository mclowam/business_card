import { useState } from 'react'
import { Plus, Eye, Settings, Trash2, ExternalLink, Globe } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/Button'
import type { CardSite } from '@/types'

const MOCK_SITES: CardSite[] = []

export function DashboardPage() {
  const { user } = useAuth()
  const [sites] = useState<CardSite[]>(MOCK_SITES)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Мои сайты</h1>
          <p className="text-surface-500 mt-1">
            Привет, {user?.username}! Здесь ты управляешь своими сайтами-визитками.
          </p>
        </div>
        <Link to="/dashboard/new">
          <Button>
            <Plus className="h-4 w-4" />
            Создать сайт
          </Button>
        </Link>
      </div>

      {sites.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-surface-200 rounded-xl">
          <div className="h-16 w-16 rounded-full bg-primary-50 flex items-center justify-center mx-auto mb-4">
            <Globe className="h-8 w-8 text-primary-400" />
          </div>
          <h3 className="text-lg font-semibold text-surface-900 mb-2">Пока нет сайтов</h3>
          <p className="text-surface-500 mb-6 max-w-sm mx-auto">
            Создайте свой первый сайт-визитку — выберите секции, заполните данные, и всё готово.
          </p>
          <Link to="/dashboard/new">
            <Button>Создать сайт-визитку</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sites.map((site) => (
            <div
              key={site.id}
              className="border border-surface-200 bg-surface-100 rounded-xl overflow-hidden hover:border-surface-300 transition-colors"
            >
              <div
                className="h-24"
                style={{
                  background: `linear-gradient(135deg, ${site.theme.primaryColor}, ${site.theme.accentColor})`,
                }}
              />
              <div className="p-5">
                <h3 className="font-semibold text-surface-900">{site.siteName}</h3>
                <p className="text-sm text-surface-500 mb-3">
                  {site.sections.length} {site.sections.length === 1 ? 'секция' : 'секций'}
                </p>
                <div className="flex items-center gap-2 text-sm text-primary-600">
                  <ExternalLink className="h-3.5 w-3.5" />
                  /card/{site.slug}
                </div>
                <div className="flex items-center gap-1 mt-4 pt-4 border-t border-surface-200">
                  <Link to={`/card/${site.slug}`}>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to={`/dashboard/edit/${site.id}`}>
                    <Button variant="ghost" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 ml-auto">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

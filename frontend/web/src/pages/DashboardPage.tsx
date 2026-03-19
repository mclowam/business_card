import { useEffect, useState } from 'react'
import { Plus, Eye, Globe, Briefcase, Code2, FolderGit2, ArrowRight, Pencil, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/Button'
import type { CardRead } from '@/types'
import { cardsService } from '@/services/cards'

function StatBadge({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: number }) {
  return (
    <div className="card-hover glass rounded-xl p-4 flex items-center gap-3">
      <div className="h-9 w-9 rounded-lg bg-primary-200/20 flex items-center justify-center flex-shrink-0">
        <Icon className="h-4 w-4 text-primary-600" />
      </div>
      <div>
        <div className="text-lg font-bold text-surface-900 leading-none">{value}</div>
        <div className="text-xs text-surface-500 mt-0.5">{label}</div>
      </div>
    </div>
  )
}

export function DashboardPage() {
  const { user } = useAuth()
  const [card, setCard] = useState<CardRead | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    cardsService
      .getMine()
      .then(setCard)
      .catch(() => setCard(null))
      .finally(() => setIsLoading(false))
  }, [])

  const handleDelete = async () => {
    if (!card) return
    const ok = window.confirm(`Удалить сайт “${card.name}”? Это действие необратимо.`)
    if (!ok) return

    setIsDeleting(true)
    try {
      await cardsService.deleteMe()
      setCard(null)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 page-enter">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Мой сайт</h1>
          <p className="text-surface-500 mt-1 text-sm">
            {user?.email}
          </p>
        </div>
        {!card && !isLoading && (
          <Link to="/dashboard/new">
            <Button>
              <Plus className="h-4 w-4" />
              Создать
            </Button>
          </Link>
        )}
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2].map((n) => (
            <div key={n} className="glass rounded-2xl p-6 animate-pulse">
              <div className="h-4 w-1/3 bg-surface-300 rounded mb-3" />
              <div className="h-3 w-2/3 bg-surface-300 rounded" />
            </div>
          ))}
        </div>
      ) : !card ? (
        <div className="text-center py-24 border-2 border-dashed border-surface-200 rounded-2xl transition-colors hover:border-primary-400/30">
          <div className="h-16 w-16 rounded-full bg-primary-200/10 flex items-center justify-center mx-auto mb-5 animate-[float_4s_ease-in-out_infinite]">
            <Globe className="h-8 w-8 text-primary-500" />
          </div>
          <h3 className="text-lg font-semibold text-surface-900 mb-2">Карточка ещё не создана</h3>
          <p className="text-surface-500 mb-8 max-w-sm mx-auto text-sm">
            Создайте свою первую карточку — заполните данные и получите персональную ссылку.
          </p>
          <Link to="/dashboard/new">
            <Button size="lg">
              Создать карточку
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-6 stagger-children">
          {/* Main card */}
          <div className="glass rounded-2xl p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-400/5 to-transparent pointer-events-none" />
            <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="h-14 w-14 rounded-2xl overflow-hidden bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-xl font-bold text-white shadow-lg shadow-primary-500/30 flex-shrink-0">
                  {card.avatar_url ? (
                    <img src={cardsService.getAvatarUrl(card.id)} alt={`${card.first_name} ${card.last_name}`} className="h-full w-full object-cover" />
                  ) : (
                    <>{card.first_name[0]}{card.last_name[0]}</>
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-surface-900">
                    {card.first_name} {card.last_name}
                  </h2>
                  <p className="text-surface-500 text-sm mt-0.5">{card.profession}</p>
                  <a
                    href={`/card/${card.name}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-primary-600 hover:text-primary-500 font-mono mt-1 inline-block transition-colors"
                  >
                    /card/{card.name}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link to={`/dashboard/edit/${card.id}`}>
                  <Button variant="secondary">
                    <Pencil className="h-4 w-4" />
                    Редактировать
                  </Button>
                </Link>
                <Button variant="danger" isLoading={isDeleting} onClick={handleDelete}>
                  <Trash2 className="h-4 w-4" />
                  Удалить
                </Button>
                <Link to={`/card/${card.name}`}>
                  <Button variant="ghost">
                    <Eye className="h-4 w-4" />
                    Открыть
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <StatBadge icon={Code2}      label="навыков"  value={card.skills.length} />
            <StatBadge icon={Briefcase}  label="опыт"     value={card.experiences.length} />
            <StatBadge icon={FolderGit2} label="проекты"  value={card.projects.length} />
          </div>

          {/* About preview */}
          {card.about_user && (
            <div className="glass rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-surface-700 mb-2 uppercase tracking-wider">О себе</h3>
              <p className="text-surface-600 text-sm leading-relaxed line-clamp-3">{card.about_user}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

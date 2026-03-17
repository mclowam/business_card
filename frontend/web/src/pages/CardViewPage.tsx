import { useEffect, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Briefcase, Code2, FolderGit2, User, ArrowLeft } from 'lucide-react'
import type { CardRead } from '@/types'
import { cardsService } from '@/services/cards'

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useInView()
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
    >
      {children}
    </div>
  )
}

function SkillBar({ name, level, index }: { name: string; level: number; index: number }) {
  const { ref, visible } = useInView()
  const pct = Math.min(Math.max(level, 0), 100)
  return (
    <div ref={ref} style={{ transitionDelay: `${index * 60}ms` }}
      className={`transition-all duration-500 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
    >
      <div className="flex justify-between mb-1.5 text-sm">
        <span className="text-surface-800 font-medium">{name}</span>
        <span className="text-primary-600 font-mono">{pct}%</span>
      </div>
      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{ '--progress-width': `${pct}%`, animationDelay: `${0.3 + index * 0.06}s` } as React.CSSProperties}
        />
      </div>
    </div>
  )
}

function CardItem({ title, description, index }: { title: string; description: string; index: number }) {
  const { ref, visible } = useInView()
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 80}ms` }}
      className={`card-hover glass rounded-2xl p-5 transition-all duration-500 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
    >
      <div className="font-semibold text-surface-900 mb-1">{title}</div>
      <div className="text-sm text-surface-600 leading-relaxed whitespace-pre-wrap">{description}</div>
    </div>
  )
}

export function CardViewPage() {
  const { slug } = useParams<{ slug: string }>()
  const [card, setCard] = useState<CardRead | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!slug) return
    cardsService
      .getByName(slug)
      .then(setCard)
      .catch(() => setError('not found'))
      .finally(() => setIsLoading(false))
  }, [slug])

  useEffect(() => {
    if (card) document.title = `${card.first_name} ${card.last_name}`
    return () => { document.title = 'CardCraft' }
  }, [card])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-surface-50">
        <div className="flex flex-col items-center gap-4">
          <div className="relative h-12 w-12">
            <div className="absolute inset-0 rounded-full border-4 border-primary-200 opacity-20" />
            <div className="absolute inset-0 rounded-full border-4 border-t-primary-500 animate-spin" />
          </div>
          <p className="text-surface-500 text-sm animate-pulse">Загрузка карточки…</p>
        </div>
      </div>
    )
  }

  if (error || !card) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-surface-50 text-center px-4 page-enter">
        <div className="text-6xl mb-6">🔍</div>
        <h1 className="text-3xl font-bold text-surface-900 mb-3">Карточка не найдена</h1>
        <p className="text-surface-500 mb-8 max-w-sm">
          Пользователь <span className="text-primary-600 font-medium">«{slug}»</span> ещё не создал свою карточку.
        </p>
        <Link to="/" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-500 font-medium transition-colors">
          <ArrowLeft className="h-4 w-4" />
          На главную
        </Link>
      </div>
    )
  }

  const initials = `${card.first_name[0] ?? ''}${card.last_name[0] ?? ''}`.toUpperCase()

  return (
    <div className="min-h-screen bg-surface-50 relative overflow-x-hidden">
      {/* Ambient glow blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden -z-0">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-primary-400 opacity-[0.06] blur-3xl animate-[glow_4s_ease-in-out_infinite]" />
        <div className="absolute top-1/3 -right-40 h-80 w-80 rounded-full bg-primary-500 opacity-[0.05] blur-3xl animate-[glow_5s_ease-in-out_1s_infinite]" />
        <div className="absolute bottom-20 left-1/3 h-64 w-64 rounded-full bg-primary-300 opacity-[0.04] blur-3xl animate-[glow_6s_ease-in-out_2s_infinite]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">

        {/* ── HERO ── */}
        <div className="page-enter glass rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-200/5 via-transparent to-primary-400/5 pointer-events-none" />

          <div className="relative">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-primary-600 text-2xl font-bold text-white shadow-lg shadow-primary-500/30 mb-6 animate-[float_4s_ease-in-out_infinite]">
              {initials}
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-surface-900 mb-3 tracking-tight">
              {card.first_name}{' '}
              <span className="text-shimmer">{card.last_name}</span>
            </h1>
            <p className="text-lg text-primary-600 font-medium mb-6">{card.profession}</p>
            <hr className="dot-divider" />
            <p className="text-surface-700 leading-relaxed text-base mt-6 whitespace-pre-wrap max-w-xl mx-auto">
              {card.text}
            </p>
            <div className="mt-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-300/50 text-surface-600 text-xs font-mono">
              /card/{card.name}
            </div>
          </div>
        </div>

        {/* ── ABOUT ── */}
        <Section>
          <div className="glass rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-9 w-9 rounded-xl bg-primary-200/20 flex items-center justify-center flex-shrink-0">
                <User className="h-4 w-4 text-primary-600" />
              </div>
              <h2 className="text-xl font-semibold text-surface-900">О себе</h2>
            </div>
            <p className="text-surface-700 leading-relaxed whitespace-pre-wrap">{card.about_user}</p>
          </div>
        </Section>

        {/* ── SKILLS ── */}
        {card.skills.length > 0 && (
          <Section>
            <div className="glass rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-9 w-9 rounded-xl bg-primary-200/20 flex items-center justify-center flex-shrink-0">
                  <Code2 className="h-4 w-4 text-primary-600" />
                </div>
                <h2 className="text-xl font-semibold text-surface-900">Навыки</h2>
              </div>
              <div className="space-y-4">
                {card.skills.map((s, i) => (
                  <SkillBar key={`${s.name}-${i}`} name={s.name} level={s.level} index={i} />
                ))}
              </div>
            </div>
          </Section>
        )}

        {/* ── EXPERIENCE ── */}
        {card.experiences.length > 0 && (
          <Section>
            <div className="glass rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-9 w-9 rounded-xl bg-primary-200/20 flex items-center justify-center flex-shrink-0">
                  <Briefcase className="h-4 w-4 text-primary-600" />
                </div>
                <h2 className="text-xl font-semibold text-surface-900">Опыт</h2>
              </div>
              <div className="relative pl-5 border-l border-primary-400/20 space-y-6">
                {card.experiences.map((e, i) => (
                  <div
                    key={`${e.text}-${i}`}
                    className="relative"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    <div className="absolute -left-[1.375rem] top-1.5 h-3 w-3 rounded-full bg-primary-500 ring-4 ring-surface-50" />
                    <div className="font-semibold text-surface-900 mb-1">{e.text}</div>
                    <div className="text-sm text-surface-600 leading-relaxed whitespace-pre-wrap">{e.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </Section>
        )}

        {/* ── PROJECTS ── */}
        {card.projects.length > 0 && (
          <Section>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-9 w-9 rounded-xl bg-primary-200/20 flex items-center justify-center flex-shrink-0">
                <FolderGit2 className="h-4 w-4 text-primary-600" />
              </div>
              <h2 className="text-xl font-semibold text-surface-900">Проекты</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {card.projects.map((p, i) => (
                <CardItem key={`${p.text}-${i}`} title={p.text} description={p.description} index={i} />
              ))}
            </div>
          </Section>
        )}

        <footer className="text-center py-4 text-sm text-surface-500 animate-[fade-in_1s_ease_0.5s_both]">
          Сделано с помощью{' '}
          <Link to="/" className="text-primary-600 hover:text-primary-500 font-medium transition-colors">
            CardCraft
          </Link>
        </footer>
      </div>
    </div>
  )
}

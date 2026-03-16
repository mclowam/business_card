import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import type { CardSite } from '@/types'
import { cardsService } from '@/services/cards'
import { SectionRenderer } from '@/components/sections/SectionRenderer'

const DEMO_SITE: CardSite = {
  id: 'demo',
  userId: 'demo',
  slug: 'demo',
  siteName: 'Максим Иванов',
  metaDescription: 'Frontend-разработчик из Москвы',
  socialLinks: [
    { platform: 'GitHub', url: 'https://github.com' },
    { platform: 'Telegram', url: 'https://t.me' },
    { platform: 'LinkedIn', url: 'https://linkedin.com' },
  ],
  theme: {
    primaryColor: '#4c6ef5',
    backgroundColor: '#ffffff',
    textColor: '#212529',
    accentColor: '#7c3aed',
    fontFamily: 'Inter',
  },
  sections: [
    {
      type: 'hero',
      heading: 'Максим Иванов',
      subheading: 'Frontend Developer',
      description: 'Создаю современные веб-приложения на React и TypeScript. Превращаю идеи в рабочий продукт.',
      ctaText: 'Связаться со мной',
      ctaUrl: '#contact',
    },
    {
      type: 'about',
      title: 'Обо мне',
      text: 'Более 5 лет опыта в разработке веб-приложений. Специализируюсь на React, TypeScript и современном фронтенде. Люблю чистый код, красивые интерфейсы и продуманный UX.\n\nРаботал с проектами от стартапов до крупных корпоративных решений.',
    },
    {
      type: 'services',
      title: 'Что я делаю',
      items: [
        { title: 'Веб-разработка', description: 'Создание SPA и PWA на React/Next.js с современным стеком технологий.', icon: '💻' },
        { title: 'UI/UX Дизайн', description: 'Проектирование удобных и красивых интерфейсов. Figma, прототипирование.', icon: '🎨' },
        { title: 'Консультации', description: 'Аудит кода, архитектурные решения, менторство для junior-разработчиков.', icon: '📋' },
      ],
    },
    {
      type: 'skills',
      title: 'Навыки',
      items: [
        { name: 'React / Next.js', level: 95 },
        { name: 'TypeScript', level: 90 },
        { name: 'CSS / Tailwind', level: 85 },
        { name: 'Node.js', level: 75 },
        { name: 'Figma', level: 70 },
      ],
    },
    {
      type: 'experience',
      title: 'Опыт работы',
      items: [
        { company: 'TechCorp', role: 'Senior Frontend Developer', period: '2023 — настоящее время', description: 'Разработка и архитектура frontend-части SaaS-платформы. Миграция с Vue на React.' },
        { company: 'StartupX', role: 'Frontend Developer', period: '2021 — 2023', description: 'Создание MVP с нуля. React, TypeScript, GraphQL. Рост до 50k+ пользователей.' },
        { company: 'WebStudio', role: 'Junior Developer', period: '2019 — 2021', description: 'Вёрстка и разработка лендингов, корпоративных сайтов. HTML, CSS, JavaScript.' },
      ],
    },
    {
      type: 'portfolio',
      title: 'Проекты',
      items: [
        { title: 'TaskFlow', description: 'Канбан-доска для управления проектами с real-time синхронизацией.', linkUrl: '#' },
        { title: 'ShopEngine', description: 'Платформа для создания интернет-магазинов с конструктором страниц.', linkUrl: '#' },
        { title: 'DevBlog', description: 'Персональный блог на MDX с автоматической генерацией OG-картинок.', linkUrl: '#' },
      ],
    },
    {
      type: 'contact',
      title: 'Контакты',
      email: 'maxim@example.com',
      phone: '+7 (999) 123-45-67',
      location: 'Москва, Россия',
      showForm: true,
    },
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

export function CardViewPage() {
  const { slug } = useParams<{ slug: string }>()
  const [site, setSite] = useState<CardSite | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!slug) return

    if (slug === 'demo') {
      setSite(DEMO_SITE)
      setIsLoading(false)
      return
    }

    cardsService
      .getBySlug(slug)
      .then(setSite)
      .catch(() => setError('Сайт не найден'))
      .finally(() => setIsLoading(false))
  }, [slug])

  useEffect(() => {
    if (site) {
      document.title = site.siteName
    }
    return () => { document.title = 'CardCraft' }
  }, [site])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-primary-200 border-t-primary-600 rounded-full" />
      </div>
    )
  }

  if (error || !site) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
        <h1 className="text-3xl font-bold text-surface-900 mb-3">Сайт не найден</h1>
        <p className="text-surface-500 mb-6">
          Пользователь «{slug}» не создал сайт-визитку или она была удалена.
        </p>
        <Link
          to="/"
          className="text-primary-600 hover:text-primary-700 font-medium"
        >
          Вернуться на главную
        </Link>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: site.theme.backgroundColor,
        fontFamily: site.theme.fontFamily,
        color: site.theme.textColor,
      }}
    >
      {site.sections.map((section, i) => (
        <SectionRenderer
          key={`${section.type}-${i}`}
          section={section}
          theme={site.theme}
          socialLinks={site.socialLinks}
        />
      ))}

      <footer className="py-6 text-center text-sm" style={{ color: `${site.theme.textColor}66` }}>
        Сделано с помощью{' '}
        <Link to="/" className="font-medium hover:opacity-80" style={{ color: site.theme.primaryColor }}>
          CardCraft
        </Link>
      </footer>
    </div>
  )
}

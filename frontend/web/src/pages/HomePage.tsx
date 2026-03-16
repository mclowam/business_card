import { Link } from 'react-router-dom'
import { ArrowRight, Palette, Globe, Zap, Layers, Smartphone } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/hooks/useAuth'

const features = [
  {
    icon: Zap,
    title: 'Быстро и просто',
    description: 'Соберите персональный сайт из готовых секций за несколько минут. Никакого кода.',
  },
  {
    icon: Layers,
    title: 'Любые секции',
    description: 'Hero, обо мне, услуги, навыки, портфолио, опыт, контакты — комбинируйте как хотите.',
  },
  {
    icon: Palette,
    title: 'Кастомизация',
    description: 'Цвета, шрифты, порядок секций. Ваш сайт — ваши правила.',
  },
  {
    icon: Globe,
    title: 'Персональный URL',
    description: 'Получите ссылку вида /card/ваше-имя и делитесь ей с кем угодно.',
  },
  {
    icon: Smartphone,
    title: 'Адаптивный дизайн',
    description: 'Сайт отлично выглядит на телефоне, планшете и десктопе.',
  },
]

export function HomePage() {
  const { isAuthenticated } = useAuth()

  return (
    <>
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-surface-900 mb-6">
          Создай свой
          <span className="text-primary-600"> сайт&#8209;визитку</span>
          <br />
          за минуты
        </h1>
        <p className="text-lg sm:text-xl text-surface-600 max-w-2xl mx-auto mb-10">
          Полноценный персональный сайт с секциями «обо мне», навыками,
          портфолио и контактами. Поделитесь одной ссылкой — и пусть мир узнает о вас.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link to={isAuthenticated ? '/dashboard' : '/register'}>
            <Button size="lg">
              Начать бесплатно
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/card/demo">
            <Button variant="secondary" size="lg">
              Посмотреть пример
            </Button>
          </Link>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-surface-900 text-center mb-10">
          Всё, что нужно для персонального сайта
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-surface-200 bg-surface-100 p-6 text-left hover:border-surface-300 transition-colors"
            >
              <div className="h-10 w-10 rounded-lg bg-primary-50 flex items-center justify-center mb-4">
                <feature.icon className="h-5 w-5 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-surface-900 mb-2">{feature.title}</h3>
              <p className="text-surface-600 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-primary-50 border-y border-primary-200 py-16 mt-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4 text-surface-900">Готовы начать?</h2>
          <p className="text-surface-600 text-lg mb-8">
            Зарегистрируйтесь и соберите свой сайт-визитку прямо сейчас.
          </p>
          <Link to={isAuthenticated ? '/dashboard' : '/register'}>
            <Button size="lg">
              Создать сайт-визитку
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  )
}

import { Link } from 'react-router-dom'
import { ArrowRight, Zap, Globe, Code2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/hooks/useAuth'

const features = [
  {
    icon: Zap,
    title: 'Быстро и просто',
    description: 'Соберите персональную карточку из готовых секций за несколько минут.',
  },
  {
    icon: Code2,
    title: 'Все данные в одном месте',
    description: 'Навыки, опыт, проекты, описание — всё компактно на одной странице.',
  },
  {
    icon: Globe,
    title: 'Персональный URL',
    description: 'Получите ссылку вида /card/ваше-имя и делитесь ей с кем угодно.',
  },
]

export function HomePage() {
  const { isAuthenticated } = useAuth()

  return (
    <>
      <section className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 text-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 h-72 w-72 rounded-full bg-primary-400 opacity-[0.07] blur-3xl animate-[glow_4s_ease-in-out_infinite]" />
          <div className="absolute bottom-0 right-1/4 h-56 w-56 rounded-full bg-primary-500 opacity-[0.05] blur-3xl animate-[glow_5s_ease-in-out_1s_infinite]" />
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary-400/20 bg-primary-200/10 text-primary-600 text-xs font-medium mb-8 animate-[fade-in_0.6s_ease_both]">
          <span className="h-1.5 w-1.5 rounded-full bg-primary-500 animate-pulse" />
          Бесплатно и без кода
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-surface-900 mb-6 animate-[fade-up_0.6s_ease_0.1s_both] leading-tight">
          Создай свой{' '}
          <span className="text-shimmer">сайт&#8209;визитку</span>
          <br />за минуты
        </h1>

        <p className="text-lg sm:text-xl text-surface-600 max-w-2xl mx-auto mb-10 animate-[fade-up_0.6s_ease_0.2s_both]">
          Персональная страница с навыками, опытом и проектами.
          Поделитесь одной ссылкой — и пусть мир узнает о вас.
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap animate-[fade-up_0.6s_ease_0.3s_both]">
          <Link to={isAuthenticated ? '/dashboard' : '/register'}>
            <Button size="lg">
              Начать бесплатно
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-surface-900 text-center mb-10">
          Всё, что нужно для персонального сайта
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 stagger-children">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="card-hover glass rounded-2xl p-6 text-left"
            >
              <div className="h-10 w-10 rounded-xl bg-primary-200/20 flex items-center justify-center mb-4">
                <feature.icon className="h-5 w-5 text-primary-600" />
              </div>
              <h3 className="text-base font-semibold text-surface-900 mb-2">{feature.title}</h3>
              <p className="text-surface-600 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-4 sm:mx-8 lg:mx-16 mb-16">
        <div className="glass rounded-3xl py-16 px-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-400/5 to-primary-600/5 pointer-events-none" />
          <h2 className="text-3xl font-bold mb-4 text-surface-900 relative">Готовы начать?</h2>
          <p className="text-surface-600 text-lg mb-8 relative">
            Зарегистрируйтесь и создайте свою карточку прямо сейчас.
          </p>
          <Link to={isAuthenticated ? '/dashboard' : '/register'} className="relative">
            <Button size="lg">
              Создать карточку
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  )
}

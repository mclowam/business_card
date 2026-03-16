import { type FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, Save, Plus, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { SectionEditor } from '@/components/editor/SectionEditor'
import type { SiteSection, SiteTheme, SocialLink, SectionType } from '@/types'

const DEFAULT_THEME: SiteTheme = {
  primaryColor: '#4c6ef5',
  backgroundColor: '#ffffff',
  textColor: '#212529',
  accentColor: '#7c3aed',
  fontFamily: 'Inter',
}

const SECTION_TEMPLATES: Record<SectionType, () => SiteSection> = {
  hero: () => ({ type: 'hero', heading: '', subheading: '', description: '', ctaText: '', ctaUrl: '' }),
  about: () => ({ type: 'about', title: 'Обо мне', text: '' }),
  services: () => ({ type: 'services', title: 'Услуги', items: [] }),
  portfolio: () => ({ type: 'portfolio', title: 'Портфолио', items: [] }),
  skills: () => ({ type: 'skills', title: 'Навыки', items: [] }),
  experience: () => ({ type: 'experience', title: 'Опыт работы', items: [] }),
  contact: () => ({ type: 'contact', title: 'Контакты', email: '', phone: '', location: '', showForm: true }),
}

const ADD_SECTION_OPTIONS: { type: SectionType; label: string }[] = [
  { type: 'hero', label: 'Шапка (Hero)' },
  { type: 'about', label: 'Обо мне' },
  { type: 'services', label: 'Услуги' },
  { type: 'skills', label: 'Навыки' },
  { type: 'experience', label: 'Опыт работы' },
  { type: 'portfolio', label: 'Портфолио' },
  { type: 'contact', label: 'Контакты' },
]

export function CardEditorPage() {
  const navigate = useNavigate()

  const [slug, setSlug] = useState('')
  const [siteName, setSiteName] = useState('')
  const [metaDescription, setMetaDescription] = useState('')
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([])
  const [theme, setTheme] = useState<SiteTheme>(DEFAULT_THEME)
  const [sections, setSections] = useState<SiteSection[]>([
    SECTION_TEMPLATES.hero(),
    SECTION_TEMPLATES.about(),
    SECTION_TEMPLATES.contact(),
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [showAddMenu, setShowAddMenu] = useState(false)

  const addSection = (type: SectionType) => {
    setSections([...sections, SECTION_TEMPLATES[type]()])
    setShowAddMenu(false)
  }

  const updateSection = (index: number, updated: SiteSection) => {
    const next = [...sections]
    next[index] = updated
    setSections(next)
  }

  const moveSection = (index: number, direction: -1 | 1) => {
    const next = [...sections]
    const target = index + direction
    ;[next[index], next[target]] = [next[target], next[index]]
    setSections(next)
  }

  const removeSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index))
  }

  const addSocialLink = () => setSocialLinks([...socialLinks, { platform: '', url: '' }])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // TODO: call cardsService.create(...)
    console.log({ slug, siteName, metaDescription, socialLinks, theme, sections })

    setTimeout(() => {
      setIsLoading(false)
      navigate('/dashboard')
    }, 500)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-surface-900">Новый сайт-визитка</h1>
        {slug && (
          <a href={`/card/${slug}`} target="_blank" rel="noreferrer">
            <Button variant="secondary" size="sm">
              <Eye className="h-4 w-4" />
              Предпросмотр
            </Button>
          </a>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* ── General settings ── */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-surface-800 border-b border-surface-200 pb-2">
            Настройки сайта
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="URL сайта"
              placeholder="maxim"
              value={slug}
              onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
              required
            />
            <Input
              label="Название сайта"
              placeholder="Максим Иванов — Frontend Developer"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              required
            />
          </div>
          <Input
            label="Описание (meta description)"
            placeholder="Персональный сайт-визитка frontend-разработчика"
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
          />
          {slug && (
            <p className="text-sm text-surface-500">
              Ваш сайт будет доступен по адресу:{' '}
              <span className="font-medium text-primary-600">/card/{slug}</span>
            </p>
          )}
        </div>

        {/* ── Theme ── */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-surface-800 border-b border-surface-200 pb-2">
            Тема оформления
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {([
              ['primaryColor', 'Основной цвет'],
              ['accentColor', 'Акцентный цвет'],
              ['backgroundColor', 'Фон'],
              ['textColor', 'Текст'],
            ] as const).map(([key, label]) => (
              <div key={key} className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-surface-700">{label}</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={theme[key]}
                    onChange={(e) => setTheme({ ...theme, [key]: e.target.value })}
                    className="h-9 w-9 rounded border border-surface-300 cursor-pointer"
                  />
                  <span className="text-xs text-surface-500 font-mono">{theme[key]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Social links ── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-surface-200 pb-2">
            <h2 className="text-lg font-semibold text-surface-800">Соцсети</h2>
            <Button type="button" variant="ghost" size="sm" onClick={addSocialLink}>
              <Plus className="h-4 w-4" /> Добавить
            </Button>
          </div>
          {socialLinks.map((link, i) => (
            <div key={i} className="flex items-end gap-3">
              <div className="w-40">
                <Input
                  label="Платформа"
                  placeholder="Telegram"
                  value={link.platform}
                  onChange={(e) => {
                    const next = [...socialLinks]
                    next[i] = { ...next[i], platform: e.target.value }
                    setSocialLinks(next)
                  }}
                />
              </div>
              <div className="flex-1">
                <Input
                  label="Ссылка"
                  placeholder="https://t.me/username"
                  value={link.url}
                  onChange={(e) => {
                    const next = [...socialLinks]
                    next[i] = { ...next[i], url: e.target.value }
                    setSocialLinks(next)
                  }}
                />
              </div>
              <Button type="button" variant="ghost" size="sm" className="text-red-500 mb-0.5" onClick={() => setSocialLinks(socialLinks.filter((_, j) => j !== i))}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {socialLinks.length === 0 && (
            <p className="text-sm text-surface-400 text-center py-3">Добавьте ссылки на соцсети — они отобразятся в секции контактов</p>
          )}
        </div>

        {/* ── Sections ── */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-surface-800 border-b border-surface-200 pb-2">
            Секции сайта
          </h2>

          <div className="space-y-4">
            {sections.map((section, i) => (
              <SectionEditor
                key={`${section.type}-${i}`}
                section={section}
                index={i}
                total={sections.length}
                onChange={(updated) => updateSection(i, updated)}
                onMoveUp={() => moveSection(i, -1)}
                onMoveDown={() => moveSection(i, 1)}
                onRemove={() => removeSection(i)}
              />
            ))}
          </div>

          <div className="relative">
            <Button
              type="button"
              variant="secondary"
              className="w-full"
              onClick={() => setShowAddMenu(!showAddMenu)}
            >
              <Plus className="h-4 w-4" />
              Добавить секцию
            </Button>
            {showAddMenu && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-surface-100 rounded-lg border border-surface-300 shadow-lg z-10 py-1">
                {ADD_SECTION_OPTIONS.map(({ type, label }) => (
                  <button
                    key={type}
                    type="button"
                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-surface-200 text-surface-700 cursor-pointer"
                    onClick={() => addSection(type)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Submit ── */}
        <div className="flex justify-end gap-3 pt-4 border-t border-surface-200">
          <Button type="button" variant="secondary" onClick={() => navigate('/dashboard')}>
            Отмена
          </Button>
          <Button type="submit" isLoading={isLoading}>
            <Save className="h-4 w-4" />
            Сохранить сайт
          </Button>
        </div>
      </form>
    </div>
  )
}

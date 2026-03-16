import { ChevronDown, ChevronUp, Trash2, GripVertical } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import type {
  SiteSection,
  HeroSection,
  AboutSection,
  ServicesSection,
  PortfolioSection,
  SkillsSection,
  ExperienceSection,
  ContactSection,
} from '@/types'

interface Props {
  section: SiteSection
  index: number
  total: number
  onChange: (updated: SiteSection) => void
  onMoveUp: () => void
  onMoveDown: () => void
  onRemove: () => void
}

const SECTION_LABELS: Record<SiteSection['type'], string> = {
  hero: 'Шапка (Hero)',
  about: 'Обо мне',
  services: 'Услуги',
  portfolio: 'Портфолио',
  skills: 'Навыки',
  experience: 'Опыт работы',
  contact: 'Контакты',
}

function Textarea({ label, value, onChange, placeholder, rows = 3 }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; rows?: number
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-surface-700">{label}</label>
      <textarea
        className="w-full rounded-lg border border-surface-300 bg-surface-100 px-3.5 py-2.5
          text-surface-900 placeholder:text-surface-500
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
          transition-colors duration-150 resize-y"
        placeholder={placeholder}
        value={value}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

function HeroEditor({ section, onChange }: { section: HeroSection; onChange: (s: HeroSection) => void }) {
  return (
    <div className="space-y-3">
      <Input label="Заголовок" value={section.heading} onChange={(e) => onChange({ ...section, heading: e.target.value })} placeholder="Ваше имя" required />
      <Input label="Подзаголовок" value={section.subheading} onChange={(e) => onChange({ ...section, subheading: e.target.value })} placeholder="Frontend Developer" />
      <Textarea label="Описание" value={section.description} onChange={(v) => onChange({ ...section, description: v })} placeholder="Кратко о себе..." />
      <div className="grid grid-cols-2 gap-3">
        <Input label="Текст кнопки" value={section.ctaText ?? ''} onChange={(e) => onChange({ ...section, ctaText: e.target.value })} placeholder="Связаться" />
        <Input label="Ссылка кнопки" value={section.ctaUrl ?? ''} onChange={(e) => onChange({ ...section, ctaUrl: e.target.value })} placeholder="#contact" />
      </div>
      <Input label="URL фонового изображения" value={section.backgroundUrl ?? ''} onChange={(e) => onChange({ ...section, backgroundUrl: e.target.value })} placeholder="https://..." />
    </div>
  )
}

function AboutEditor({ section, onChange }: { section: AboutSection; onChange: (s: AboutSection) => void }) {
  return (
    <div className="space-y-3">
      <Input label="Заголовок секции" value={section.title} onChange={(e) => onChange({ ...section, title: e.target.value })} placeholder="Обо мне" />
      <Textarea label="Текст" value={section.text} onChange={(v) => onChange({ ...section, text: v })} placeholder="Расскажите о себе подробнее..." rows={5} />
      <Input label="URL фото" value={section.imageUrl ?? ''} onChange={(e) => onChange({ ...section, imageUrl: e.target.value })} placeholder="https://..." />
    </div>
  )
}

function ServicesEditor({ section, onChange }: { section: ServicesSection; onChange: (s: ServicesSection) => void }) {
  const updateItem = (i: number, field: string, value: string) => {
    const items = [...section.items]
    items[i] = { ...items[i], [field]: value }
    onChange({ ...section, items })
  }
  return (
    <div className="space-y-3">
      <Input label="Заголовок секции" value={section.title} onChange={(e) => onChange({ ...section, title: e.target.value })} placeholder="Что я делаю" />
      {section.items.map((item, i) => (
        <div key={i} className="p-3 rounded-lg bg-surface-200 space-y-2">
          <div className="flex items-center gap-2">
            <Input label="Иконка" value={item.icon ?? ''} onChange={(e) => updateItem(i, 'icon', e.target.value)} placeholder="💻" />
            <div className="flex-1">
              <Input label="Название" value={item.title} onChange={(e) => updateItem(i, 'title', e.target.value)} placeholder="Веб-разработка" />
            </div>
            <button type="button" className="text-red-400 hover:text-red-600 mt-5 cursor-pointer" onClick={() => onChange({ ...section, items: section.items.filter((_, j) => j !== i) })}>
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <Textarea label="Описание" value={item.description} onChange={(v) => updateItem(i, 'description', v)} rows={2} />
        </div>
      ))}
      <Button type="button" variant="ghost" size="sm" onClick={() => onChange({ ...section, items: [...section.items, { title: '', description: '', icon: '' }] })}>+ Добавить услугу</Button>
    </div>
  )
}

function PortfolioEditor({ section, onChange }: { section: PortfolioSection; onChange: (s: PortfolioSection) => void }) {
  const updateItem = (i: number, field: string, value: string) => {
    const items = [...section.items]
    items[i] = { ...items[i], [field]: value }
    onChange({ ...section, items })
  }
  return (
    <div className="space-y-3">
      <Input label="Заголовок секции" value={section.title} onChange={(e) => onChange({ ...section, title: e.target.value })} placeholder="Портфолио" />
      {section.items.map((item, i) => (
        <div key={i} className="p-3 rounded-lg bg-surface-200 space-y-2">
          <div className="flex items-center gap-2">
            <div className="flex-1"><Input label="Название" value={item.title} onChange={(e) => updateItem(i, 'title', e.target.value)} /></div>
            <button type="button" className="text-red-400 hover:text-red-600 mt-5 cursor-pointer" onClick={() => onChange({ ...section, items: section.items.filter((_, j) => j !== i) })}>
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <Textarea label="Описание" value={item.description} onChange={(v) => updateItem(i, 'description', v)} rows={2} />
          <div className="grid grid-cols-2 gap-2">
            <Input label="URL картинки" value={item.imageUrl ?? ''} onChange={(e) => updateItem(i, 'imageUrl', e.target.value)} placeholder="https://..." />
            <Input label="Ссылка на проект" value={item.linkUrl ?? ''} onChange={(e) => updateItem(i, 'linkUrl', e.target.value)} placeholder="https://..." />
          </div>
        </div>
      ))}
      <Button type="button" variant="ghost" size="sm" onClick={() => onChange({ ...section, items: [...section.items, { title: '', description: '' }] })}>+ Добавить проект</Button>
    </div>
  )
}

function SkillsEditor({ section, onChange }: { section: SkillsSection; onChange: (s: SkillsSection) => void }) {
  const updateItem = (i: number, field: string, value: string | number) => {
    const items = [...section.items]
    items[i] = { ...items[i], [field]: value }
    onChange({ ...section, items })
  }
  return (
    <div className="space-y-3">
      <Input label="Заголовок секции" value={section.title} onChange={(e) => onChange({ ...section, title: e.target.value })} placeholder="Навыки" />
      {section.items.map((item, i) => (
        <div key={i} className="flex items-end gap-2">
          <div className="flex-1"><Input label="Навык" value={item.name} onChange={(e) => updateItem(i, 'name', e.target.value)} placeholder="React" /></div>
          <div className="w-24"><Input label="Уровень %" type="number" value={String(item.level ?? '')} onChange={(e) => updateItem(i, 'level', Number(e.target.value))} placeholder="90" /></div>
          <button type="button" className="text-red-400 hover:text-red-600 mb-1 cursor-pointer" onClick={() => onChange({ ...section, items: section.items.filter((_, j) => j !== i) })}>
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
      <Button type="button" variant="ghost" size="sm" onClick={() => onChange({ ...section, items: [...section.items, { name: '', level: 80 }] })}>+ Добавить навык</Button>
    </div>
  )
}

function ExperienceEditor({ section, onChange }: { section: ExperienceSection; onChange: (s: ExperienceSection) => void }) {
  const updateItem = (i: number, field: string, value: string) => {
    const items = [...section.items]
    items[i] = { ...items[i], [field]: value }
    onChange({ ...section, items })
  }
  return (
    <div className="space-y-3">
      <Input label="Заголовок секции" value={section.title} onChange={(e) => onChange({ ...section, title: e.target.value })} placeholder="Опыт работы" />
      {section.items.map((item, i) => (
        <div key={i} className="p-3 rounded-lg bg-surface-200 space-y-2">
          <div className="flex items-center gap-2">
            <div className="flex-1"><Input label="Должность" value={item.role} onChange={(e) => updateItem(i, 'role', e.target.value)} /></div>
            <button type="button" className="text-red-400 hover:text-red-600 mt-5 cursor-pointer" onClick={() => onChange({ ...section, items: section.items.filter((_, j) => j !== i) })}>
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Input label="Компания" value={item.company} onChange={(e) => updateItem(i, 'company', e.target.value)} />
            <Input label="Период" value={item.period} onChange={(e) => updateItem(i, 'period', e.target.value)} placeholder="2023 — наст. время" />
          </div>
          <Textarea label="Описание" value={item.description} onChange={(v) => updateItem(i, 'description', v)} rows={2} />
        </div>
      ))}
      <Button type="button" variant="ghost" size="sm" onClick={() => onChange({ ...section, items: [...section.items, { role: '', company: '', period: '', description: '' }] })}>+ Добавить место</Button>
    </div>
  )
}

function ContactEditor({ section, onChange }: { section: ContactSection; onChange: (s: ContactSection) => void }) {
  return (
    <div className="space-y-3">
      <Input label="Заголовок секции" value={section.title} onChange={(e) => onChange({ ...section, title: e.target.value })} placeholder="Контакты" />
      <div className="grid grid-cols-2 gap-3">
        <Input label="Email" value={section.email ?? ''} onChange={(e) => onChange({ ...section, email: e.target.value })} />
        <Input label="Телефон" value={section.phone ?? ''} onChange={(e) => onChange({ ...section, phone: e.target.value })} />
      </div>
      <Input label="Местоположение" value={section.location ?? ''} onChange={(e) => onChange({ ...section, location: e.target.value })} />
      <label className="flex items-center gap-2 text-sm text-surface-700 cursor-pointer">
        <input
          type="checkbox"
          checked={section.showForm}
          onChange={(e) => onChange({ ...section, showForm: e.target.checked })}
          className="rounded"
        />
        Показывать контактную форму
      </label>
    </div>
  )
}

export function SectionEditor({ section, index, total, onChange, onMoveUp, onMoveDown, onRemove }: Props) {
  return (
    <div className="border border-surface-300 bg-surface-100 rounded-xl overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 bg-surface-200 border-b border-surface-300">
        <GripVertical className="h-4 w-4 text-surface-400" />
        <span className="text-sm font-semibold text-surface-800 flex-1">
          {SECTION_LABELS[section.type]}
        </span>
        <div className="flex items-center gap-1">
          <button type="button" disabled={index === 0} onClick={onMoveUp} className="p-1 text-surface-400 hover:text-surface-700 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed">
            <ChevronUp className="h-4 w-4" />
          </button>
          <button type="button" disabled={index === total - 1} onClick={onMoveDown} className="p-1 text-surface-400 hover:text-surface-700 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed">
            <ChevronDown className="h-4 w-4" />
          </button>
          <button type="button" onClick={onRemove} className="p-1 text-red-400 hover:text-red-600 cursor-pointer">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="p-4">
        {section.type === 'hero' && <HeroEditor section={section} onChange={(s) => onChange(s)} />}
        {section.type === 'about' && <AboutEditor section={section} onChange={(s) => onChange(s)} />}
        {section.type === 'services' && <ServicesEditor section={section} onChange={(s) => onChange(s)} />}
        {section.type === 'portfolio' && <PortfolioEditor section={section} onChange={(s) => onChange(s)} />}
        {section.type === 'skills' && <SkillsEditor section={section} onChange={(s) => onChange(s)} />}
        {section.type === 'experience' && <ExperienceEditor section={section} onChange={(s) => onChange(s)} />}
        {section.type === 'contact' && <ContactEditor section={section} onChange={(s) => onChange(s)} />}
      </div>
    </div>
  )
}

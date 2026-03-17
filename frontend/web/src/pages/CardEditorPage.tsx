import { type FormEvent, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Plus, Save, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import type { CardCreate, CardUpdate, Experience, Project, Skill, UserOccupation } from '@/types'
import { cardsService } from '@/services/cards'

export function CardEditorPage() {
  const navigate = useNavigate()
  const params = useParams<{ id?: string }>()
  const isEdit = !!params.id

  const [name, setName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [profession, setProfession] = useState('')
  const [text, setText] = useState('')
  const [aboutUser, setAboutUser] = useState('')

  const [skills, setSkills] = useState<Skill[]>([])
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [userOccupations, setUserOccupations] = useState<UserOccupation[]>([])

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isEdit) return

    setIsLoading(true)
    cardsService
      .getMine()
      .then((card) => {
        setName(card.name)
        setFirstName(card.first_name)
        setLastName(card.last_name)
        setProfession(card.profession)
        setText(card.text)
        setAboutUser(card.about_user)
        setSkills(card.skills)
        setExperiences(card.experiences)
        setProjects(card.projects)
        setUserOccupations(card.user_occupations)
      })
      .catch((e) => setError(e instanceof Error ? e.message : 'Не удалось загрузить карточку'))
      .finally(() => setIsLoading(false))
  }, [isEdit])

  const addSkill = () => setSkills([...skills, { name: '', level: 0 }])
  const addExperience = () => setExperiences([...experiences, { text: '', description: '' }])
  const addProject = () => setProjects([...projects, { text: '', description: '' }])
  const addOccupation = () => setUserOccupations([...userOccupations, { page: '', description: '' }])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      if (isEdit) {
        const payload: CardUpdate = {
          name,
          first_name: firstName,
          last_name: lastName,
          profession,
          text,
          about_user: aboutUser,
          skills: skills.length ? skills : [],
          experiences: experiences.length ? experiences : [],
          projects: projects.length ? projects : [],
          user_occupations: userOccupations.length ? userOccupations : [],
        }
        await cardsService.updateMe(payload)
      } else {
        const payload: CardCreate = {
          name,
          first_name: firstName,
          last_name: lastName,
          profession,
          text,
          about_user: aboutUser,
          skills: skills.length ? skills : null,
          experiences: experiences.length ? experiences : null,
          projects: projects.length ? projects : null,
          user_occupations: userOccupations.length ? userOccupations : null,
        }
        await cardsService.create(payload)
      }

      setIsLoading(false)
      navigate('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при сохранении')
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-surface-900">{isEdit ? 'Редактирование карточки' : 'Новая карточка'}</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {error && (
          <div className="rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 text-sm">
            {error}
          </div>
        )}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-surface-800 border-b border-surface-200 pb-2">Данные</h2>
          <Input
            label="Имя сайта (sitename)"
            placeholder="maxim"
            value={name}
            onChange={(e) => setName(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
            required
          />
          {name && (
            <p className="text-sm text-surface-500">
              Публичная ссылка: <span className="font-medium text-primary-600">/card/{name}</span>
            </p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Имя" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            <Input label="Фамилия" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          </div>
          <Input label="Профессия" value={profession} onChange={(e) => setProfession(e.target.value)} required />
          <Input label="Короткий текст" value={text} onChange={(e) => setText(e.target.value)} required />
          <Input label="О себе" value={aboutUser} onChange={(e) => setAboutUser(e.target.value)} required />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-surface-200 pb-2">
            <h2 className="text-lg font-semibold text-surface-800">Навыки</h2>
            <Button type="button" variant="ghost" size="sm" onClick={addSkill}>
              <Plus className="h-4 w-4" /> Добавить
            </Button>
          </div>
          {skills.map((s, i) => (
            <div key={i} className="flex items-end gap-3">
              <div className="flex-1">
                <Input
                  label="Название"
                  value={s.name}
                  onChange={(e) => {
                    const next = [...skills]
                    next[i] = { ...next[i], name: e.target.value }
                    setSkills(next)
                  }}
                />
              </div>
              <div className="w-28">
                <Input
                  label="Level"
                  type="number"
                  value={String(s.level)}
                  onChange={(e) => {
                    const next = [...skills]
                    next[i] = { ...next[i], level: Number(e.target.value) || 0 }
                    setSkills(next)
                  }}
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-red-500 mb-0.5"
                onClick={() => setSkills(skills.filter((_, j) => j !== i))}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {skills.length === 0 && <p className="text-sm text-surface-400 text-center py-3">Нет навыков</p>}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-surface-200 pb-2">
            <h2 className="text-lg font-semibold text-surface-800">Опыт</h2>
            <Button type="button" variant="ghost" size="sm" onClick={addExperience}>
              <Plus className="h-4 w-4" /> Добавить
            </Button>
          </div>
          {experiences.map((ex, i) => (
            <div key={i} className="space-y-3 border border-surface-200 rounded-xl p-4 bg-surface-100">
              <Input
                label="Заголовок"
                value={ex.text}
                onChange={(e) => {
                  const next = [...experiences]
                  next[i] = { ...next[i], text: e.target.value }
                  setExperiences(next)
                }}
              />
              <Input
                label="Описание"
                value={ex.description}
                onChange={(e) => {
                  const next = [...experiences]
                  next[i] = { ...next[i], description: e.target.value }
                  setExperiences(next)
                }}
              />
              <div className="flex justify-end">
                <Button type="button" variant="ghost" size="sm" className="text-red-500" onClick={() => setExperiences(experiences.filter((_, j) => j !== i))}>
                  <X className="h-4 w-4" /> Удалить
                </Button>
              </div>
            </div>
          ))}
          {experiences.length === 0 && <p className="text-sm text-surface-400 text-center py-3">Нет опыта</p>}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-surface-200 pb-2">
            <h2 className="text-lg font-semibold text-surface-800">Проекты</h2>
            <Button type="button" variant="ghost" size="sm" onClick={addProject}>
              <Plus className="h-4 w-4" /> Добавить
            </Button>
          </div>
          {projects.map((p, i) => (
            <div key={i} className="space-y-3 border border-surface-200 rounded-xl p-4 bg-surface-100">
              <Input
                label="Название"
                value={p.text}
                onChange={(e) => {
                  const next = [...projects]
                  next[i] = { ...next[i], text: e.target.value }
                  setProjects(next)
                }}
              />
              <Input
                label="Описание"
                value={p.description}
                onChange={(e) => {
                  const next = [...projects]
                  next[i] = { ...next[i], description: e.target.value }
                  setProjects(next)
                }}
              />
              <div className="flex justify-end">
                <Button type="button" variant="ghost" size="sm" className="text-red-500" onClick={() => setProjects(projects.filter((_, j) => j !== i))}>
                  <X className="h-4 w-4" /> Удалить
                </Button>
              </div>
            </div>
          ))}
          {projects.length === 0 && <p className="text-sm text-surface-400 text-center py-3">Нет проектов</p>}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-surface-200 pb-2">
            <h2 className="text-lg font-semibold text-surface-800">User occupations</h2>
            <Button type="button" variant="ghost" size="sm" onClick={addOccupation}>
              <Plus className="h-4 w-4" /> Добавить
            </Button>
          </div>
          {userOccupations.map((o, i) => (
            <div key={i} className="space-y-3 border border-surface-200 rounded-xl p-4 bg-surface-100">
              <Input
                label="Page"
                value={o.page}
                onChange={(e) => {
                  const next = [...userOccupations]
                  next[i] = { ...next[i], page: e.target.value }
                  setUserOccupations(next)
                }}
              />
              <Input
                label="Description"
                value={o.description}
                onChange={(e) => {
                  const next = [...userOccupations]
                  next[i] = { ...next[i], description: e.target.value }
                  setUserOccupations(next)
                }}
              />
              <div className="flex justify-end">
                <Button type="button" variant="ghost" size="sm" className="text-red-500" onClick={() => setUserOccupations(userOccupations.filter((_, j) => j !== i))}>
                  <X className="h-4 w-4" /> Удалить
                </Button>
              </div>
            </div>
          ))}
          {userOccupations.length === 0 && <p className="text-sm text-surface-400 text-center py-3">Нет occupations</p>}
        </div>

        {/* ── Submit ── */}
        <div className="flex justify-end gap-3 pt-4 border-t border-surface-200">
          <Button type="button" variant="secondary" onClick={() => navigate('/dashboard')}>
            Отмена
          </Button>
          <Button type="submit" isLoading={isLoading}>
            <Save className="h-4 w-4" />
            Сохранить
          </Button>
        </div>
      </form>
    </div>
  )
}

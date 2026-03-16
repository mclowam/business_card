import { Mail, Phone, MapPin } from 'lucide-react'
import type { ContactSection, SiteTheme, SocialLink } from '@/types'

interface Props {
  section: ContactSection
  theme: SiteTheme
  socialLinks: SocialLink[]
}

export function ContactView({ section, theme, socialLinks }: Props) {
  return (
    <section
      className="py-20 px-4"
      id="contact"
      style={{ backgroundColor: `${theme.primaryColor}08` }}
    >
      <div className="max-w-3xl mx-auto">
        <h2
          className="text-3xl font-bold mb-12 text-center"
          style={{ color: theme.textColor }}
        >
          {section.title}
        </h2>

        <div className={`grid ${section.showForm ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 max-w-md mx-auto'} gap-10`}>
          <div className="space-y-4">
            {section.email && (
              <a
                href={`mailto:${section.email}`}
                className="flex items-center gap-3 p-4 rounded-lg bg-white shadow-sm no-underline hover:shadow-md transition-shadow"
                style={{ color: theme.textColor }}
              >
                <Mail className="h-5 w-5 shrink-0" style={{ color: theme.primaryColor }} />
                <span className="text-sm">{section.email}</span>
              </a>
            )}
            {section.phone && (
              <a
                href={`tel:${section.phone}`}
                className="flex items-center gap-3 p-4 rounded-lg bg-white shadow-sm no-underline hover:shadow-md transition-shadow"
                style={{ color: theme.textColor }}
              >
                <Phone className="h-5 w-5 shrink-0" style={{ color: theme.primaryColor }} />
                <span className="text-sm">{section.phone}</span>
              </a>
            )}
            {section.location && (
              <div
                className="flex items-center gap-3 p-4 rounded-lg bg-white shadow-sm"
                style={{ color: theme.textColor }}
              >
                <MapPin className="h-5 w-5 shrink-0" style={{ color: theme.primaryColor }} />
                <span className="text-sm">{section.location}</span>
              </div>
            )}

            {socialLinks.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {socialLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-full text-sm font-medium text-white no-underline hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: theme.primaryColor }}
                  >
                    {link.platform}
                  </a>
                ))}
              </div>
            )}
          </div>

          {section.showForm && (
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault()
                alert('Форма отправлена (заглушка)')
              }}
            >
              <input
                type="text"
                placeholder="Имя"
                required
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm
                  focus:outline-none focus:ring-2 transition-colors"
                style={{ '--tw-ring-color': theme.primaryColor } as React.CSSProperties}
              />
              <input
                type="email"
                placeholder="Email"
                required
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm
                  focus:outline-none focus:ring-2 transition-colors"
                style={{ '--tw-ring-color': theme.primaryColor } as React.CSSProperties}
              />
              <textarea
                placeholder="Сообщение"
                rows={4}
                required
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm resize-y
                  focus:outline-none focus:ring-2 transition-colors"
                style={{ '--tw-ring-color': theme.primaryColor } as React.CSSProperties}
              />
              <button
                type="submit"
                className="w-full py-3 rounded-lg text-white font-semibold text-sm hover:opacity-90 transition-opacity cursor-pointer"
                style={{ backgroundColor: theme.primaryColor }}
              >
                Отправить
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

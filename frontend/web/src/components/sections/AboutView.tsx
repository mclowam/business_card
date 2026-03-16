import type { AboutSection, SiteTheme } from '@/types'

interface Props {
  section: AboutSection
  theme: SiteTheme
}

export function AboutView({ section, theme }: Props) {
  return (
    <section className="py-20 px-4" id="about">
      <div className="max-w-5xl mx-auto">
        <h2
          className="text-3xl font-bold mb-12 text-center"
          style={{ color: theme.textColor }}
        >
          {section.title}
        </h2>
        <div className={`flex flex-col ${section.imageUrl ? 'md:flex-row' : ''} items-center gap-10`}>
          {section.imageUrl && (
            <div className="flex-shrink-0">
              <img
                src={section.imageUrl}
                alt={section.title}
                className="w-64 h-64 rounded-2xl object-cover shadow-lg"
              />
            </div>
          )}
          <p
            className="text-lg leading-relaxed whitespace-pre-line"
            style={{ color: `${theme.textColor}cc` }}
          >
            {section.text}
          </p>
        </div>
      </div>
    </section>
  )
}

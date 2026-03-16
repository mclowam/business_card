import type { ExperienceSection, SiteTheme } from '@/types'

interface Props {
  section: ExperienceSection
  theme: SiteTheme
}

export function ExperienceView({ section, theme }: Props) {
  return (
    <section className="py-20 px-4" id="experience">
      <div className="max-w-3xl mx-auto">
        <h2
          className="text-3xl font-bold mb-12 text-center"
          style={{ color: theme.textColor }}
        >
          {section.title}
        </h2>
        <div className="relative">
          <div
            className="absolute left-4 top-0 bottom-0 w-0.5"
            style={{ backgroundColor: `${theme.primaryColor}30` }}
          />
          <div className="space-y-10">
            {section.items.map((item, i) => (
              <div key={i} className="relative pl-12">
                <div
                  className="absolute left-2.5 top-1.5 w-3.5 h-3.5 rounded-full border-2 bg-white"
                  style={{ borderColor: theme.primaryColor }}
                />
                <span
                  className="text-xs font-medium px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: `${theme.primaryColor}15`, color: theme.primaryColor }}
                >
                  {item.period}
                </span>
                <h3 className="text-lg font-semibold mt-2" style={{ color: theme.textColor }}>
                  {item.role}
                </h3>
                <p className="text-sm font-medium mb-1" style={{ color: theme.primaryColor }}>
                  {item.company}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: `${theme.textColor}99` }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

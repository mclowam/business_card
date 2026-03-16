import type { SkillsSection, SiteTheme } from '@/types'

interface Props {
  section: SkillsSection
  theme: SiteTheme
}

export function SkillsView({ section, theme }: Props) {
  return (
    <section className="py-20 px-4" id="skills" style={{ backgroundColor: `${theme.primaryColor}08` }}>
      <div className="max-w-3xl mx-auto">
        <h2
          className="text-3xl font-bold mb-12 text-center"
          style={{ color: theme.textColor }}
        >
          {section.title}
        </h2>
        <div className="space-y-5">
          {section.items.map((item, i) => (
            <div key={i}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-medium text-sm" style={{ color: theme.textColor }}>
                  {item.name}
                </span>
                {item.level != null && (
                  <span className="text-xs" style={{ color: `${theme.textColor}88` }}>
                    {item.level}%
                  </span>
                )}
              </div>
              {item.level != null && (
                <div className="h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: `${theme.primaryColor}20` }}>
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${item.level}%`, backgroundColor: theme.primaryColor }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

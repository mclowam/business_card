import type { ServicesSection, SiteTheme } from '@/types'

interface Props {
  section: ServicesSection
  theme: SiteTheme
}

export function ServicesView({ section, theme }: Props) {
  return (
    <section className="py-20 px-4" id="services" style={{ backgroundColor: `${theme.primaryColor}08` }}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="text-3xl font-bold mb-12 text-center"
          style={{ color: theme.textColor }}
        >
          {section.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {section.items.map((item, i) => (
            <div
              key={i}
              className="rounded-xl p-6 bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              {item.icon && (
                <span className="text-3xl mb-3 block">{item.icon}</span>
              )}
              <h3 className="text-lg font-semibold mb-2" style={{ color: theme.textColor }}>
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: `${theme.textColor}99` }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import { ExternalLink } from 'lucide-react'
import type { PortfolioSection, SiteTheme } from '@/types'

interface Props {
  section: PortfolioSection
  theme: SiteTheme
}

export function PortfolioView({ section, theme }: Props) {
  return (
    <section className="py-20 px-4" id="portfolio">
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
              className="rounded-xl overflow-hidden bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow group"
            >
              {item.imageUrl && (
                <div className="h-48 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-5">
                <h3 className="font-semibold mb-1" style={{ color: theme.textColor }}>
                  {item.title}
                </h3>
                <p className="text-sm mb-3 leading-relaxed" style={{ color: `${theme.textColor}99` }}>
                  {item.description}
                </p>
                {item.linkUrl && (
                  <a
                    href={item.linkUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium no-underline hover:opacity-80"
                    style={{ color: theme.primaryColor }}
                  >
                    Смотреть
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

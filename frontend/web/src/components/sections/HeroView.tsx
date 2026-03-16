import type { HeroSection, SiteTheme } from '@/types'

interface Props {
  section: HeroSection
  theme: SiteTheme
}

export function HeroView({ section, theme }: Props) {
  const hasBg = !!section.backgroundUrl

  return (
    <section
      className="relative min-h-[80vh] flex items-center justify-center text-center px-4"
      style={{
        background: hasBg
          ? `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url(${section.backgroundUrl}) center/cover no-repeat`
          : `linear-gradient(135deg, ${theme.primaryColor}, ${theme.accentColor})`,
      }}
    >
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
          {section.heading}
        </h1>
        {section.subheading && (
          <p className="text-xl sm:text-2xl text-white/80 mb-3 font-light">
            {section.subheading}
          </p>
        )}
        {section.description && (
          <p className="text-lg text-white/70 max-w-xl mx-auto mb-8 leading-relaxed">
            {section.description}
          </p>
        )}
        {section.ctaText && (
          <a
            href={section.ctaUrl ?? '#contact'}
            className="inline-block px-8 py-3.5 rounded-lg text-base font-semibold no-underline transition-transform hover:scale-105"
            style={{ backgroundColor: '#fff', color: theme.primaryColor }}
          >
            {section.ctaText}
          </a>
        )}
      </div>
    </section>
  )
}

import type { SiteSection, SiteTheme, SocialLink } from '@/types'
import { HeroView } from './HeroView'
import { AboutView } from './AboutView'
import { ServicesView } from './ServicesView'
import { PortfolioView } from './PortfolioView'
import { SkillsView } from './SkillsView'
import { ExperienceView } from './ExperienceView'
import { ContactView } from './ContactView'

interface Props {
  section: SiteSection
  theme: SiteTheme
  socialLinks: SocialLink[]
}

export function SectionRenderer({ section, theme, socialLinks }: Props) {
  switch (section.type) {
    case 'hero':
      return <HeroView section={section} theme={theme} />
    case 'about':
      return <AboutView section={section} theme={theme} />
    case 'services':
      return <ServicesView section={section} theme={theme} />
    case 'portfolio':
      return <PortfolioView section={section} theme={theme} />
    case 'skills':
      return <SkillsView section={section} theme={theme} />
    case 'experience':
      return <ExperienceView section={section} theme={theme} />
    case 'contact':
      return <ContactView section={section} theme={theme} socialLinks={socialLinks} />
  }
}

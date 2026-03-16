export interface SocialLink {
  platform: string
  url: string
}

// ── Section types ────────────────────────────────────────────

export interface HeroSection {
  type: 'hero'
  heading: string
  subheading: string
  description: string
  ctaText?: string
  ctaUrl?: string
  backgroundUrl?: string
}

export interface AboutSection {
  type: 'about'
  title: string
  text: string
  imageUrl?: string
}

export interface ServiceItem {
  title: string
  description: string
  icon?: string
}

export interface ServicesSection {
  type: 'services'
  title: string
  items: ServiceItem[]
}

export interface PortfolioItem {
  title: string
  description: string
  imageUrl?: string
  linkUrl?: string
}

export interface PortfolioSection {
  type: 'portfolio'
  title: string
  items: PortfolioItem[]
}

export interface SkillItem {
  name: string
  level?: number
}

export interface SkillsSection {
  type: 'skills'
  title: string
  items: SkillItem[]
}

export interface ExperienceItem {
  company: string
  role: string
  period: string
  description: string
}

export interface ExperienceSection {
  type: 'experience'
  title: string
  items: ExperienceItem[]
}

export interface ContactSection {
  type: 'contact'
  title: string
  email?: string
  phone?: string
  location?: string
  showForm: boolean
}

export type SiteSection =
  | HeroSection
  | AboutSection
  | ServicesSection
  | PortfolioSection
  | SkillsSection
  | ExperienceSection
  | ContactSection

export type SectionType = SiteSection['type']

// ── Site-level types ─────────────────────────────────────────

export interface SiteTheme {
  primaryColor: string
  backgroundColor: string
  textColor: string
  accentColor: string
  fontFamily: string
}

export interface CardSite {
  id: string
  userId: string
  slug: string
  siteName: string
  metaDescription?: string
  socialLinks: SocialLink[]
  theme: SiteTheme
  sections: SiteSection[]
  createdAt: string
  updatedAt: string
}

export type CardSiteFormData = Omit<CardSite, 'id' | 'userId' | 'createdAt' | 'updatedAt'>

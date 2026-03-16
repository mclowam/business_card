import { api } from './api'
import type { CardSite, CardSiteFormData } from '@/types'

export const cardsService = {
  async getMySites(): Promise<CardSite[]> {
    try {
      return await api.get<CardSite[]>('/sites/me')
    } catch {
      return []
    }
  },

  async getBySlug(slug: string): Promise<CardSite> {
    return api.get<CardSite>(`/sites/${slug}`)
  },

  async create(data: CardSiteFormData): Promise<CardSite> {
    return api.post<CardSite>('/sites', data)
  },

  async update(id: string, data: Partial<CardSiteFormData>): Promise<CardSite> {
    return api.put<CardSite>(`/sites/${id}`, data)
  },

  async delete(id: string): Promise<void> {
    return api.delete(`/sites/${id}`)
  },
}

import { cardsApi } from './api'
import type { CardCreate, CardRead, CardUpdate } from '@/types'

export const cardsService = {
  async create(data: CardCreate): Promise<CardRead> {
    return cardsApi.post<CardRead>('/api/card/', data)
  },

  async getById(cardId: number): Promise<CardRead> {
    return cardsApi.get<CardRead>(`/api/card/${cardId}`)
  },

  async getByName(name: string): Promise<CardRead> {
    return cardsApi.get<CardRead>(`/api/card/site/${encodeURIComponent(name)}`)
  },

  async getMine(): Promise<CardRead> {
    return cardsApi.get<CardRead>('/api/card/me')
  },

  async updateMe(data: CardUpdate): Promise<CardRead> {
    return cardsApi.patch<CardRead>('/api/card/me', data)
  },

  async uploadMyAvatar(file: File): Promise<CardRead> {
    const formData = new FormData()
    formData.append('avatar', file)
    return cardsApi.postForm<CardRead>('/api/card/me/avatar', formData)
  },

  async deleteMyAvatar(): Promise<void> {
    await cardsApi.delete('/api/card/me/avatar')
  },

  getAvatarUrl(cardId: number): string {
    const baseUrl = import.meta.env.VITE_CARDS_API_URL ?? 'http://localhost:8001'
    return `${baseUrl.replace(/\/+$/, '')}/api/card/${cardId}/avatar`
  },

  async deleteMe(): Promise<void> {
    await cardsApi.delete('/api/card/me')
  },
}

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

  async deleteMe(): Promise<void> {
    await cardsApi.delete('/api/card/me')
  },
}

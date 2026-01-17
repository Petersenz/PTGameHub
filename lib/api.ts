import { Game, GameDetail, FilterOptions } from '@/types/game'

const BASE_URL = '/api'

export const gameApi = {
  // ดึงรายการเกมทั้งหมด
  getAllGames: async (): Promise<Game[]> => {
    const response = await fetch(`${BASE_URL}/games`)
    if (!response.ok) throw new Error('Failed to fetch games')
    return response.json()
  },

  // ดึงข้อมูลเกมตาม ID
  getGameById: async (id: number): Promise<GameDetail> => {
    const response = await fetch(`${BASE_URL}/games/${id}`)
    if (!response.ok) throw new Error('Failed to fetch game details')
    return response.json()
  },

  // ดึงเกมตามแพลตฟอร์ม
  getGamesByPlatform: async (platform: string): Promise<Game[]> => {
    const response = await fetch(`${BASE_URL}/games?platform=${platform}`)
    if (!response.ok) throw new Error('Failed to fetch games by platform')
    return response.json()
  },

  // ดึงเกมตามหมวดหมู่
  getGamesByCategory: async (category: string): Promise<Game[]> => {
    const response = await fetch(`${BASE_URL}/games?category=${category}`)
    if (!response.ok) throw new Error('Failed to fetch games by category')
    return response.json()
  },

  // ดึงเกมพร้อมตัวกรอง
  getFilteredGames: async (filters: FilterOptions): Promise<Game[]> => {
    const params = new URLSearchParams()
    
    if (filters.platform && filters.platform !== 'all') {
      params.append('platform', filters.platform)
    }
    if (filters.category) {
      params.append('category', filters.category)
    }
    if (filters.sortBy) {
      params.append('sort-by', filters.sortBy)
    }

    const url = `${BASE_URL}/games${params.toString() ? `?${params.toString()}` : ''}`
    const response = await fetch(url)
    if (!response.ok) throw new Error('Failed to fetch filtered games')
    return response.json()
  },

  // ค้นหาเกมด้วย tags
  searchGamesByTags: async (tags: string[], platform?: string): Promise<Game[]> => {
    const tagString = tags.join('.')
    const params = new URLSearchParams({ tag: tagString })
    
    if (platform && platform !== 'all') {
      params.append('platform', platform)
    }

    const response = await fetch(`${BASE_URL}/filter?${params.toString()}`)
    if (!response.ok) throw new Error('Failed to search games by tags')
    return response.json()
  }
}
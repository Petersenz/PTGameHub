import { create } from 'zustand'
import { Game, FilterOptions } from '@/types/game'

interface GameStore {
  // Filters
  filters: FilterOptions
  setFilters: (filters: Partial<FilterOptions>) => void
  resetFilters: () => void
  
  // Compare games
  compareList: Game[]
  addToCompare: (game: Game) => void
  removeFromCompare: (gameId: number) => void
  clearCompareList: () => void
  
  // Search
  searchQuery: string
  setSearchQuery: (query: string) => void
  
  // View preferences
  viewMode: 'grid' | 'list'
  setViewMode: (mode: 'grid' | 'list') => void
}

const defaultFilters: FilterOptions = {
  platform: 'all',
  category: '',
  sortBy: 'relevance',
  search: ''
}

export const useGameStore = create<GameStore>((set, get) => ({
  // Filters
  filters: defaultFilters,
  setFilters: (newFilters) => 
    set((state) => ({ 
      filters: { ...state.filters, ...newFilters } 
    })),
  resetFilters: () => set({ filters: defaultFilters }),
  
  // Compare games
  compareList: [],
  addToCompare: (game) => 
    set((state) => {
      if (state.compareList.length >= 3) return state // จำกัดไม่เกิน 3 เกม
      if (state.compareList.find(g => g.id === game.id)) return state // ไม่ให้เพิ่มซ้ำ
      return { compareList: [...state.compareList, game] }
    }),
  removeFromCompare: (gameId) =>
    set((state) => ({
      compareList: state.compareList.filter(game => game.id !== gameId)
    })),
  clearCompareList: () => set({ compareList: [] }),
  
  // Search
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  // View preferences
  viewMode: 'grid',
  setViewMode: (mode) => set({ viewMode: mode }),
}))
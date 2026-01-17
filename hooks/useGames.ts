import { useQuery } from '@tanstack/react-query'
import { gameApi } from '@/lib/api'
import { FilterOptions } from '@/types/game'

export const useGames = (filters?: FilterOptions) => {
  return useQuery({
    queryKey: ['games', filters],
    queryFn: () => {
      if (filters && Object.keys(filters).length > 0) {
        return gameApi.getFilteredGames(filters)
      }
      return gameApi.getAllGames()
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useGameDetail = (id: number) => {
  return useQuery({
    queryKey: ['game', id],
    queryFn: () => gameApi.getGameById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export const useGamesByCategory = (category: string) => {
  return useQuery({
    queryKey: ['games', 'category', category],
    queryFn: () => gameApi.getGamesByCategory(category),
    enabled: !!category,
    staleTime: 5 * 60 * 1000,
  })
}

export const useGamesByPlatform = (platform: string) => {
  return useQuery({
    queryKey: ['games', 'platform', platform],
    queryFn: () => gameApi.getGamesByPlatform(platform),
    enabled: !!platform,
    staleTime: 5 * 60 * 1000,
  })
}
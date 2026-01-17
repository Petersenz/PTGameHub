export interface Game {
  id: number
  title: string
  thumbnail: string
  short_description: string
  game_url: string
  genre: string
  platform: string
  publisher: string
  developer: string
  release_date: string
  freetogame_profile_url: string
}

export interface GameDetail extends Game {
  description: string
  minimum_system_requirements?: {
    os?: string
    processor?: string
    memory?: string
    graphics?: string
    storage?: string
  }
  screenshots?: Array<{
    id: number
    image: string
  }>
  status: string
}

export interface FilterOptions {
  platform?: 'pc' | 'browser' | 'all'
  category?: string
  sortBy?: 'release-date' | 'popularity' | 'alphabetical' | 'relevance'
  search?: string
}

export interface GameStats {
  totalGames: number
  genreDistribution: Array<{ genre: string; count: number }>
  platformDistribution: Array<{ platform: string; count: number }>
  recentGames: Game[]
}
'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useGames } from '@/hooks/useGames'
import { useGameStore } from '@/store/gameStore'
import { GameCard } from '@/components/games/GameCard'
import { GameFilters } from '@/components/games/GameFilters'
import { useTranslation } from '@/hooks/useTranslation'

export default function GamesPage() {
  const { filters, searchQuery, viewMode, setViewMode } = useGameStore()
  const { data: games, isLoading, error } = useGames(filters)
  const { t, language } = useTranslation()

  // Filter games by search query
  const filteredGames = useMemo(() => {
    if (!games) return []

    if (!searchQuery.trim()) return games

    const query = searchQuery.toLowerCase()
    return games.filter(game =>
      game.title.toLowerCase().includes(query) ||
      game.short_description.toLowerCase().includes(query) ||
      game.genre.toLowerCase().includes(query) ||
      game.developer.toLowerCase().includes(query) ||
      game.publisher.toLowerCase().includes(query)
    )
  }, [games, searchQuery])

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 text-lg">{t('loadingError')}</p>
        <p className="text-gray-600 dark:text-gray-400 mt-2">{t('tryAgain')}</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {t('allGames')}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          {t('heroSubtitle')}
        </p>
      </motion.div>

      {/* Filters */}
      <GameFilters />

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {t('searchResults')}
          </h2>
          {!isLoading && (
            <span className="text-gray-500 dark:text-gray-400">
              ({filteredGames.length} {t('games')})
            </span>
          )}
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded ${viewMode === 'grid'
              ? 'bg-primary-500 text-white'
              : 'bg-gray-200 dark:bg-dark-200 text-gray-600 dark:text-gray-300'
              }`}
            title={t('gridView')}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>

          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded ${viewMode === 'list'
              ? 'bg-primary-500 text-white'
              : 'bg-gray-200 dark:bg-dark-200 text-gray-600 dark:text-gray-300'
              }`}
            title={t('listView')}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 8a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 12a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 16a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Games Grid/List */}
      {isLoading ? (
        <div className={`grid gap-6 ${viewMode === 'grid'
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
          : 'grid-cols-1'
          }`}>
          {[...Array(12)].map((_, i) => (
            <div key={i} className="card p-4 animate-pulse">
              <div className="bg-gray-300 dark:bg-gray-600 h-48 rounded mb-4"></div>
              <div className="bg-gray-300 dark:bg-gray-600 h-4 rounded mb-2"></div>
              <div className="bg-gray-300 dark:bg-gray-600 h-3 rounded w-3/4 mb-2"></div>
              <div className="bg-gray-300 dark:bg-gray-600 h-3 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : filteredGames.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-6xl mb-4">🎮</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {t('noResults')}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {t('noResultsDesc')}
          </p>
        </motion.div>
      ) : (
        <div className={`grid gap-6 ${viewMode === 'grid'
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
          : 'grid-cols-1'
          }`}>
          {filteredGames.map((game, index) => (
            <GameCard key={game.id} game={game} index={index} />
          ))}
        </div>
      )}

      {/* Load More Button (for future pagination) */}
      {filteredGames.length > 0 && (
        <div className="text-center pt-8">
          <p className="text-gray-600 dark:text-gray-400">
            {language === 'th' ? t('totalResults') : ''} {filteredGames.length} {t('games')} {language === 'en' ? t('totalResults') : ''}
          </p>
        </div>
      )}
    </div>
  )
}
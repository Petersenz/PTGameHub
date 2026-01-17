'use client'

import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { useGameStore } from '@/store/gameStore'
import { FilterOptions } from '@/types/game'
import { useTranslation } from '@/hooks/useTranslation'

export function GameFilters() {
  const { t } = useTranslation()
  const { filters, setFilters, resetFilters, searchQuery, setSearchQuery } = useGameStore()

  const PLATFORMS = [
    { value: 'all', label: t('allPlatforms') },
    { value: 'pc', label: t('pcPlatform') },
    { value: 'browser', label: t('browserPlatform') },
  ]

  const CATEGORIES = [
    { value: '', label: t('allCategories') },
    { value: 'mmorpg', label: 'MMORPG' },
    { value: 'shooter', label: 'Shooter' },
    { value: 'strategy', label: 'Strategy' },
    { value: 'moba', label: 'MOBA' },
    { value: 'racing', label: 'Racing' },
    { value: 'sports', label: 'Sports' },
    { value: 'social', label: 'Social' },
    { value: 'sandbox', label: 'Sandbox' },
    { value: 'open-world', label: 'Open World' },
    { value: 'survival', label: 'Survival' },
    { value: 'pvp', label: 'PvP' },
    { value: 'pve', label: 'PvE' },
    { value: 'pixel', label: 'Pixel' },
    { value: 'voxel', label: 'Voxel' },
    { value: 'zombie', label: 'Zombie' },
    { value: 'turn-based', label: 'Turn-Based' },
    { value: 'first-person', label: 'First Person' },
    { value: 'third-Person', label: 'Third Person' },
    { value: 'top-down', label: 'Top-Down' },
    { value: 'tank', label: 'Tank' },
    { value: 'space', label: 'Space' },
    { value: 'sailing', label: 'Sailing' },
    { value: 'side-scroller', label: 'Side Scroller' },
    { value: 'superhero', label: 'Superhero' },
    { value: 'permadeath', label: 'Permadeath' },
    { value: 'card', label: 'Card Game' },
    { value: 'battle-royale', label: 'Battle Royale' },
    { value: 'mmo', label: 'MMO' },
    { value: 'mmofps', label: 'MMOFPS' },
    { value: 'mmotps', label: 'MMOTPS' },
    { value: '3d', label: '3D' },
    { value: '2d', label: '2D' },
    { value: 'anime', label: 'Anime' },
    { value: 'fantasy', label: 'Fantasy' },
    { value: 'sci-fi', label: 'Sci-Fi' },
    { value: 'fighting', label: 'Fighting' },
    { value: 'action-rpg', label: 'Action RPG' },
    { value: 'action', label: 'Action' },
    { value: 'military', label: 'Military' },
    { value: 'martial-arts', label: 'Martial Arts' },
    { value: 'flight', label: 'Flight' },
    { value: 'low-spec', label: 'Low Spec' },
    { value: 'tower-defense', label: 'Tower Defense' },
    { value: 'horror', label: 'Horror' },
    { value: 'mmorts', label: 'MMORTS' },
  ]

  const SORT_OPTIONS = [
    { value: 'relevance', label: t('relevance') },
    { value: 'popularity', label: t('popularity') },
    { value: 'release-date', label: t('releaseDate') },
    { value: 'alphabetical', label: t('alphabetical') },
  ]

  const { register, handleSubmit, reset, watch } = useForm<FilterOptions>({
    defaultValues: filters
  })

  const onSubmit = (data: FilterOptions) => {
    setFilters(data)
  }

  const handleReset = () => {
    reset()
    resetFilters()
    setSearchQuery('')
  }

  // Watch for changes and auto-submit
  const watchedValues = watch()

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card p-6 mb-8"
    >
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        {t('searchFilters')}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Search Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('searchGames')}
          </label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-200 text-gray-900 dark:text-white"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Platform Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('platform')}
            </label>
            <select
              {...register('platform')}
              onChange={(e) => setFilters({ platform: e.target.value as any })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-200 text-gray-900 dark:text-white"
            >
              {PLATFORMS.map(platform => (
                <option key={platform.value} value={platform.value}>
                  {platform.label}
                </option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('gameType')}
            </label>
            <select
              {...register('category')}
              onChange={(e) => setFilters({ category: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-200 text-gray-900 dark:text-white"
            >
              {CATEGORIES.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('sortBy')}
            </label>
            <select
              {...register('sortBy')}
              onChange={(e) => setFilters({ sortBy: e.target.value as any })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-200 text-gray-900 dark:text-white"
            >
              {SORT_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="btn-primary"
          >
            {t('search')}
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="btn-secondary"
          >
            {t('reset')}
          </button>
        </div>
      </form>
    </motion.div>
  )
}
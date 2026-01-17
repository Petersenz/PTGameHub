'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useGames } from '@/hooks/useGames'
import { GameCard } from '@/components/games/GameCard'
import { useTranslation } from '@/hooks/useTranslation'
import { TrendingSection } from '@/components/games/TrendingSection'
import { GenreSection } from '@/components/games/GenreSection'
import { MouseMoveEffect } from '@/components/ui/MouseMoveEffect'
import { RiRocket2Line, RiBarChartFill, RiGamepadFill } from 'react-icons/ri'

export default function HomePage() {
  const { data: games, isLoading, error } = useGames()
  const { t } = useTranslation()

  const featuredGames = games?.slice(4, 10) || []
  const recentGames = games?.slice(10, 18) || []

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="w-20 h-20 bg-red-500/10 text-red-500 rounded-3xl flex items-center justify-center mb-6">
          <RiGamepadFill className="text-4xl" />
        </div>
        <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">
          {t('loadingError')}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
          {t('connectionError')}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="btn-primary"
        >
          {t('tryAgain')}
        </button>
      </div>
    )
  }

  return (
    <div className="relative pb-20 space-y-16">
      <MouseMoveEffect />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative overflow-hidden rounded-[40px] bg-gaming-gradient py-20 px-4 md:px-12 text-center shadow-2xl shadow-primary-500/20"
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-8"
          >
            <RiRocket2Line className="text-primary-300" />
            <span className="text-xs font-black uppercase tracking-widest text-white/90">
              Welcome to the elite tier
            </span>
          </motion.div>
          <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter text-white uppercase italic">
            {t('heroTitle').split(' ').map((word, i) => (
              <span key={i} className={i === 2 ? 'text-primary-300' : ''}>
                {word}{' '}
              </span>
            ))}
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-white/80 font-medium max-w-2xl mx-auto">
            {t('heroSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/games" className="bg-white text-primary-600 px-10 py-4 rounded-2xl font-black uppercase tracking-tighter hover:bg-primary-50 transition-all shadow-xl hover:-translate-y-1 active:translate-y-0 text-lg">
              {t('startExploring')}
            </Link>
            <Link href="/analytics" className="bg-white/10 backdrop-blur-md text-white border-2 border-white/20 px-10 py-4 rounded-2xl font-black uppercase tracking-tighter hover:bg-white/20 transition-all hover:-translate-y-1 active:translate-y-0 text-lg flex items-center justify-center gap-2">
              <RiBarChartFill className="text-xl" />
              {t('viewStats')}
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Trending Now (New Section) */}
      <TrendingSection games={games || []} isLoading={isLoading} />

      {/* Browse by Genre (New Section) */}
      <GenreSection />

      {/* Featured Games */}
      <section>
        <div className="flex items-center justify-between mb-10">
          <div className="flex flex-col">
            <h2 className="text-4xl font-black text-gray-900 dark:text-white uppercase italic tracking-tighter">
              {t('featuredGames')}
            </h2>
            <div className="h-1.5 w-24 bg-primary-500 rounded-full mt-2" />
          </div>
          <Link
            href="/games"
            className="hidden md:flex items-center space-x-2 text-primary-500 hover:text-primary-600 font-black uppercase tracking-widest transition-all"
          >
            <span>{t('viewAll')}</span>
            <span className="text-2xl">→</span>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card p-6 animate-pulse bg-gray-50 dark:bg-dark-900 border-none h-[400px]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredGames.map((game: any, index: number) => (
              <GameCard key={game.id} game={game} index={index} />
            ))}
          </div>
        )}
      </section>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative overflow-hidden bg-gray-50 dark:bg-dark-900/50 rounded-[40px] p-12 border border-gray-100 dark:border-dark-800"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
          <div className="text-center group">
            <div className="text-6xl font-black text-primary-500 mb-2 tracking-tighter group-hover:scale-110 transition-transform">
              {games?.length || 0}+
            </div>
            <div className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest text-sm">{t('totalGames')}</div>
          </div>

          <div className="text-center group border-y md:border-y-0 md:border-x border-gray-200 dark:border-dark-800 py-8 md:py-0">
            <div className="text-6xl font-black text-primary-500 mb-2 tracking-tighter group-hover:scale-110 transition-transform">
              {new Set(games?.map((g: any) => g.genre)).size || 0}+
            </div>
            <div className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest text-sm">{t('gameGenres')}</div>
          </div>

          <div className="text-center group">
            <div className="text-6xl font-black text-primary-500 mb-2 tracking-tighter group-hover:scale-110 transition-transform">
              {new Set(games?.map((g: any) => g.platform)).size || 0}
            </div>
            <div className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest text-sm">{t('platforms')}</div>
          </div>
        </div>
      </motion.section>

      {/* Recent Games */}
      <section>
        <div className="flex items-center justify-between mb-10">
          <div className="flex flex-col">
            <h2 className="text-4xl font-black text-gray-900 dark:text-white uppercase italic tracking-tighter">
              {t('recentGames')}
            </h2>
            <div className="h-1.5 w-24 bg-primary-500 rounded-full mt-2" />
          </div>
          <Link
            href="/games?sort-by=release-date"
            className="flex items-center space-x-2 text-primary-500 hover:text-primary-600 font-black uppercase tracking-widest transition-all"
          >
            <span>{t('viewAllNew')}</span>
            <span className="text-2xl">→</span>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse bg-gray-50 dark:bg-dark-900 rounded-2xl h-[280px]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentGames.map((game: any, index: number) => (
              <GameCard key={game.id} game={game} index={index} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
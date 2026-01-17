'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useGameDetail } from '@/hooks/useGames'
import { useGameStore } from '@/store/gameStore'
import { useTranslation } from '@/hooks/useTranslation'
import { MouseMoveEffect } from '@/components/ui/MouseMoveEffect'
import {
  RiExchangeLine,
  RiCloseLine,
  RiPlayFill,
  RiInformationLine,
  RiBookOpenLine,
  RiCpuLine,
  RiDatabase2Line,
  RiComputerLine,
  RiHardDrive2Line,
  RiScreenshot2Line,
  RiGamepadLine,
  RiBuildingLine,
  RiCalendarLine,
  RiArrowLeftLine,
  RiSettings4Line
} from 'react-icons/ri'

interface GameDetailPageProps {
  params: {
    id: string
  }
}

export default function GameDetailPage({ params }: GameDetailPageProps) {
  const { t, language } = useTranslation()
  const gameId = parseInt(params.id)
  const { data: game, isLoading, error } = useGameDetail(gameId)
  const { addToCompare, removeFromCompare, compareList } = useGameStore()

  const isInCompare = compareList.some(g => g.id === gameId)

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-12">
        <div className="h-[400px] bg-gray-200 dark:bg-dark-800 rounded-[40px]" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="h-10 bg-gray-200 dark:bg-dark-800 rounded-xl w-3/4" />
            <div className="h-32 bg-gray-200 dark:bg-dark-800 rounded-2xl" />
          </div>
          <div className="space-y-6">
            <div className="h-64 bg-gray-200 dark:bg-dark-800 rounded-2xl" />
          </div>
        </div>
      </div>
    )
  }

  if (error || !game) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="w-20 h-20 bg-primary-500/10 text-primary-500 rounded-3xl flex items-center justify-center mb-6">
          <RiInformationLine className="text-4xl" />
        </div>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tighter">
          {t('gameNotFound')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
          {t('gameNotFoundDesc')}
        </p>
        <Link href="/games" className="btn-primary">
          {t('backToGames')}
        </Link>
      </div>
    )
  }

  const handleCompareToggle = () => {
    if (isInCompare) {
      removeFromCompare(gameId)
    } else {
      addToCompare(game)
    }
  }

  return (
    <div className="relative space-y-12 pb-20">
      <MouseMoveEffect />

      {/* Breadcrumb */}
      <nav className="flex items-center space-x-3 text-xs font-black uppercase tracking-widest text-gray-400">
        <Link href="/" className="hover:text-primary-500 transition-colors">{t('home')}</Link>
        <span className="opacity-30">/</span>
        <Link href="/games" className="hover:text-primary-500 transition-colors uppercase">{t('allGames')}</Link>
        <span className="opacity-30">/</span>
        <span className="text-primary-500 truncate max-w-[200px]">{game.title}</span>
      </nav>

      {/* Hero Header Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="card border-none shadow-2xl overflow-hidden rounded-[40px] bg-white dark:bg-dark-900"
      >
        <div className="md:flex min-h-[500px]">
          <div className="md:w-[60%] relative group">
            <Image
              src={game.thumbnail}
              alt={game.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-dark-950/20 to-transparent" />
            <div className="absolute top-6 left-6 flex space-x-2">
              <span className="bg-primary-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-primary-400/50 shadow-lg">
                {game.genre}
              </span>
              <span className="bg-dark-950/60 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">
                {game.platform}
              </span>
            </div>
          </div>

          <div className="md:w-[40%] p-10 flex flex-col justify-center">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2 text-primary-500 font-black text-xs uppercase tracking-[0.2em]">
                <RiPlayFill className="text-xl" />
                <span>Verified Free</span>
              </div>
              <button
                onClick={handleCompareToggle}
                className={`p-3 rounded-2xl transition-all duration-300 shadow-xl ${isInCompare
                  ? 'bg-primary-500 text-white shadow-primary-500/30'
                  : 'bg-white dark:bg-dark-800 text-gray-400 border border-gray-100 dark:border-dark-700 hover:text-primary-500'
                  }`}
                title={isInCompare ? t('removeFromCompare') : t('addToCompare')}
              >
                {isInCompare ? <RiCloseLine className="text-2xl" /> : <RiExchangeLine className="text-2xl" />}
              </button>
            </div>

            <h1 className="text-5xl font-black text-gray-900 dark:text-white mb-6 uppercase tracking-tighter italic leading-none">
              {game.title}
            </h1>

            <p className="text-gray-500 dark:text-gray-400 mb-10 text-lg leading-relaxed font-medium">
              {game.short_description}
            </p>

            <div className="grid grid-cols-2 gap-x-8 gap-y-6 mb-10 border-t border-gray-100 dark:border-dark-800 pt-8">
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-gray-400 font-black uppercase tracking-widest text-[10px]">
                  <RiBuildingLine />
                  <span>{t('developer')}</span>
                </div>
                <div className="font-bold text-gray-900 dark:text-white truncate">{game.developer}</div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-gray-400 font-black uppercase tracking-widest text-[10px]">
                  <RiCalendarLine />
                  <span>{t('releaseDate')}</span>
                </div>
                <div className="font-bold text-gray-900 dark:text-white">
                  {new Date(game.release_date).toLocaleDateString(language === 'th' ? 'th-TH' : 'en-US', {
                    year: 'numeric',
                    month: 'short'
                  })}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={game.game_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex-1 py-4 text-center text-lg flex items-center justify-center gap-2"
              >
                <RiPlayFill className="text-2xl" />
                {t('playNow')}
              </a>

              <a
                href={game.freetogame_profile_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex-1 py-4 text-center font-black uppercase tracking-tight flex items-center justify-center gap-2"
              >
                <RiInformationLine className="text-xl" />
                {t('moreInfo')}
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          {/* Game Description */}
          {game.description && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card p-10 rounded-[32px] bg-white dark:bg-dark-900"
            >
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-10 h-10 bg-primary-500/10 text-primary-500 rounded-xl flex items-center justify-center">
                  <RiBookOpenLine className="text-xl" />
                </div>
                <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight italic">
                  {t('gameDetails')}
                </h2>
              </div>
              <div
                className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg font-medium prose dark:prose-invert max-w-none prose-p:mb-4 prose-headings:text-primary-500"
                dangerouslySetInnerHTML={{ __html: game.description }}
              />
            </motion.div>
          )}

          {/* Screenshots Grid */}
          {game.screenshots && game.screenshots.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-4 mb-2">
                <div className="w-10 h-10 bg-primary-500/10 text-primary-500 rounded-xl flex items-center justify-center">
                  <RiScreenshot2Line className="text-xl" />
                </div>
                <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight italic">
                  {t('screenshots')}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {game.screenshots.map((screenshot) => (
                  <motion.div
                    key={screenshot.id}
                    whileHover={{ scale: 1.02 }}
                    className="relative aspect-video group overflow-hidden rounded-3xl shadow-xl"
                  >
                    <Image
                      src={screenshot.image}
                      alt={`${game.title} screenshot ${screenshot.id}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Sidebar Area */}
        <div className="space-y-8 h-full">
          {/* System Requirements */}
          {game.minimum_system_requirements && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="card p-10 rounded-[32px] bg-dark-950 border border-dark-800 shadow-2xl sticky top-24"
            >
              <div className="flex items-center space-x-4 mb-10">
                <div className="w-10 h-10 bg-primary-500/10 text-primary-500 rounded-xl flex items-center justify-center">
                  <RiSettings4Line className="text-xl" />
                </div>
                <h2 className="text-xl font-black text-white uppercase tracking-tight italic">
                  {t('systemRequirements')}
                </h2>
              </div>

              <div className="space-y-8">
                {[
                  { icon: RiComputerLine, label: 'operatingSystem', value: game.minimum_system_requirements.os },
                  { icon: RiCpuLine, label: 'processor', value: game.minimum_system_requirements.processor },
                  { icon: RiDatabase2Line, label: 'memory', value: game.minimum_system_requirements.memory },
                  { icon: RiComputerLine, label: 'graphics', value: game.minimum_system_requirements.graphics },
                  { icon: RiHardDrive2Line, label: 'storage', value: game.minimum_system_requirements.storage },
                ].map((req, i) => req.value && (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="mt-1 text-primary-500 text-xl font-black">
                      <req.icon />
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-1">{t(req.label as any)}</div>
                      <div className="text-sm font-bold text-gray-300 leading-tight">{req.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Additional Info card if no reqs */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="card p-8 bg-gray-50 dark:bg-dark-900 border-none rounded-3xl"
          >
            <h3 className="font-black text-gray-900 dark:text-white uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
              Live Status
            </h3>
            <div className="flex items-center justify-between p-4 bg-white dark:bg-dark-800 rounded-2xl border border-gray-100 dark:border-dark-700">
              <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Publisher</span>
              <span className="text-sm font-bold text-gray-900 dark:text-white">{game.publisher}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
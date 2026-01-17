'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Game } from '@/types/game'
import { useGameStore } from '@/store/gameStore'
import { useTranslation } from '@/hooks/useTranslation'
import { RiExchangeLine, RiCloseLine, RiCalendarLine, RiUserLine, RiPlayFill } from 'react-icons/ri'

interface GameCardProps {
  game: Game
  index?: number
}

export function GameCard({ game, index = 0 }: GameCardProps) {
  const { addToCompare, removeFromCompare, compareList } = useGameStore()
  const { t } = useTranslation()
  const isInCompare = compareList.some(g => g.id === game.id)

  const handleCompareToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    if (isInCompare) {
      removeFromCompare(game.id)
    } else {
      addToCompare(game)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: (index % 10) * 0.05 }}
      whileHover={{ y: -8 }}
      className="card group flex flex-col h-full bg-white dark:bg-dark-900 border-none shadow-lg hover:shadow-primary-500/10"
    >
      <Link href={`/games/${game.id}`} className="flex flex-col h-full">
        <div className="relative overflow-hidden rounded-t-2xl h-48">
          <Image
            src={game.thumbnail}
            alt={game.title}
            width={400}
            height={225}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="bg-primary-500 text-white p-3 rounded-full shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <RiPlayFill className="text-2xl" />
            </div>
          </div>

          {/* Platform Badge */}
          <div className="absolute top-3 left-3">
            <span className="bg-dark-950/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">
              {game.platform}
            </span>
          </div>

          {/* Compare Button */}
          <button
            onClick={handleCompareToggle}
            className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-all duration-300 border ${isInCompare
                ? 'bg-primary-500 text-white border-primary-400 shadow-lg shadow-primary-500/40'
                : 'bg-white/10 text-white border-white/20 hover:bg-white hover:text-primary-500'
              }`}
            title={isInCompare ? t('removeFromCompare') : t('addToCompare')}
          >
            {isInCompare ? <RiCloseLine className="text-lg" /> : <RiExchangeLine className="text-lg" />}
          </button>
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black text-primary-500 uppercase tracking-widest">
              {game.genre}
            </span>
            <div className="flex items-center text-gray-400 text-[10px] font-bold">
              <RiCalendarLine className="mr-1" />
              {new Date(game.release_date).getFullYear()}
            </div>
          </div>

          <h3 className="font-black text-xl text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-primary-500 transition-colors tracking-tight uppercase italic">
            {game.title}
          </h3>

          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 line-clamp-2 leading-relaxed">
            {game.short_description}
          </p>

          <div className="mt-auto pt-4 border-t border-gray-100 dark:border-dark-800 flex items-center justify-between">
            <div className="flex items-center text-[10px] text-gray-400 font-bold uppercase tracking-wider">
              <RiUserLine className="mr-1 text-primary-500" />
              <span className="line-clamp-1 max-w-[120px]">{game.developer}</span>
            </div>
            <span className="text-[10px] font-black text-primary-500 uppercase tracking-tighter">
              Free to Play
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
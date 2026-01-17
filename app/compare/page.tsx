'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useGameStore } from '@/store/gameStore'
import { useTranslation } from '@/hooks/useTranslation'
import { RiExchangeLine, RiDeleteBinLine, RiPlayFill, RiBookOpenLine, RiGamepadLine, RiCalendarLine, RiUserStarLine, RiBuildingLine } from 'react-icons/ri'

export default function ComparePage() {
  const { t, language } = useTranslation()
  const { compareList, removeFromCompare, clearCompareList } = useGameStore()

  if (compareList.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4"
      >
        <div className="w-24 h-24 bg-primary-500/10 text-primary-500 rounded-[32px] flex items-center justify-center mb-8 shadow-2xl shadow-primary-500/10">
          <RiExchangeLine className="text-5xl" />
        </div>
        <h1 className="text-5xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tighter italic">
          {t('compare')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-10 text-xl max-w-md font-medium">
          {t('language') === 'th' ? 'คุณยังไม่ได้เลือกเกมเพื่อเปรียบเทียบ' : 'No games selected for comparison.'}
        </p>
        <Link href="/games" className="btn-primary px-10 py-4 text-lg">
          {t('startExploring')}
        </Link>
      </motion.div>
    )
  }

  return (
    <div className="space-y-12 pb-20">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-primary-500/10 text-primary-500 rounded-2xl flex items-center justify-center">
            <RiExchangeLine className="text-2xl" />
          </div>
          <div>
            <h1 className="text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tight italic">
              {t('compare')}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest text-xs">
              {compareList.length} {t('language') === 'th' ? 'เกมที่เลือกไว้' : 'Games selected'}
            </p>
          </div>
        </div>

        <button
          onClick={clearCompareList}
          className="btn-secondary flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-black uppercase tracking-tighter"
        >
          <RiDeleteBinLine className="text-lg" />
          {t('clearAll')}
        </button>
      </motion.div>

      {/* Comparison Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card border-none shadow-2xl overflow-hidden rounded-[32px]"
      >
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-dark-900/50 backdrop-blur-md">
                <th className="px-8 py-10 text-left text-xs font-black text-gray-400 uppercase tracking-[0.2em]">
                  {t('details')}
                </th>
                {compareList.map((game) => (
                  <th key={game.id} className="px-6 py-8 text-center min-w-[300px]">
                    <div className="relative group p-4 rounded-[28px] bg-white dark:bg-dark-800 border border-gray-100 dark:border-dark-700 shadow-xl">
                      <button
                        onClick={() => removeFromCompare(game.id)}
                        className="absolute -top-3 -right-3 bg-red-500 text-white rounded-xl w-10 h-10 flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-10"
                        title={t('removeFromCompare')}
                      >
                        <RiDeleteBinLine className="text-xl" />
                      </button>
                      <div className="relative h-40 w-full overflow-hidden rounded-2xl mb-4">
                        <Image
                          src={game.thumbnail}
                          alt={game.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <h3 className="font-black text-lg text-gray-900 dark:text-white uppercase tracking-tight italic line-clamp-1">
                        {game.title}
                      </h3>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 dark:divide-dark-800">
              {/* Genre Row */}
              <tr className="group hover:bg-gray-50/50 dark:hover:bg-dark-900/50 transition-colors">
                <td className="px-8 py-6">
                  <div className="flex items-center space-x-3">
                    <RiGamepadLine className="text-primary-500 text-xl" />
                    <span className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-tight">{t('genre')}</span>
                  </div>
                </td>
                {compareList.map((game) => (
                  <td key={game.id} className="px-6 py-6 text-center">
                    <span className="bg-primary-500/10 text-primary-500 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-primary-500/20">
                      {game.genre}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Platform Row */}
              <tr className="group hover:bg-gray-50/50 dark:hover:bg-dark-900/50 transition-colors">
                <td className="px-8 py-6">
                  <div className="flex items-center space-x-3">
                    <RiBuildingLine className="text-primary-500 text-xl" />
                    <span className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-tight">{t('platform')}</span>
                  </div>
                </td>
                {compareList.map((game) => (
                  <td key={game.id} className="px-6 py-6 text-center">
                    <span className="bg-gray-100 dark:bg-dark-800 text-gray-600 dark:text-gray-400 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-gray-200 dark:border-dark-700">
                      {game.platform}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Developer Row */}
              <tr className="group hover:bg-gray-50/50 dark:hover:bg-dark-900/50 transition-colors">
                <td className="px-8 py-6">
                  <div className="flex items-center space-x-3">
                    <RiUserStarLine className="text-primary-500 text-xl" />
                    <span className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-tight">{t('developer')}</span>
                  </div>
                </td>
                {compareList.map((game) => (
                  <td key={game.id} className="px-6 py-6 text-center text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-tight">
                    {game.developer}
                  </td>
                ))}
              </tr>

              {/* Release Date Row */}
              <tr className="group hover:bg-gray-50/50 dark:hover:bg-dark-900/50 transition-colors">
                <td className="px-8 py-6">
                  <div className="flex items-center space-x-3">
                    <RiCalendarLine className="text-primary-500 text-xl" />
                    <span className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-tight">{t('releaseDate')}</span>
                  </div>
                </td>
                {compareList.map((game) => (
                  <td key={game.id} className="px-6 py-6 text-center text-sm font-bold text-gray-600 dark:text-gray-400">
                    {new Date(game.release_date).toLocaleDateString(language === 'th' ? 'th-TH' : 'en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </td>
                ))}
              </tr>

              {/* Description Row */}
              <tr className="group hover:bg-gray-50/50 dark:hover:bg-dark-900/50 transition-colors">
                <td className="px-8 py-6 italic text-gray-400 text-xs uppercase font-black uppercase tracking-widest">
                  {t('description')}
                </td>
                {compareList.map((game) => (
                  <td key={game.id} className="px-8 py-6">
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed text-center line-clamp-3">
                      {game.short_description}
                    </p>
                  </td>
                ))}
              </tr>

              {/* Action Row */}
              <tr>
                <td className="px-8 py-10" />
                {compareList.map((game) => (
                  <td key={game.id} className="px-6 py-10">
                    <div className="flex flex-col gap-3">
                      <a
                        href={game.game_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary py-3 rounded-2xl flex items-center justify-center gap-2"
                      >
                        <RiPlayFill className="text-xl" />
                        {t('playNow')}
                      </a>
                      <Link
                        href={`/games/${game.id}`}
                        className="btn-secondary py-3 rounded-2xl flex items-center justify-center gap-2 font-black uppercase tracking-tighter"
                      >
                        <RiBookOpenLine className="text-xl" />
                        {t('viewDetails')}
                      </Link>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="card p-10 bg-gaming-gradient shadow-2xl shadow-primary-500/20"
        >
          <h2 className="text-3xl font-black text-white mb-6 uppercase italic tracking-tight">
            {t('language') === 'th' ? 'วิเคราะห์ประเภทเกม' : 'Genre Analysis'}
          </h2>
          <div className="space-y-4">
            {Array.from(new Set(compareList.map(g => g.genre))).map(genre => (
              <div key={genre} className="flex items-center justify-between p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
                <span className="text-white font-black uppercase tracking-widest text-xs">{genre}</span>
                <span className="text-primary-300 font-bold">{compareList.filter(g => g.genre === genre).length} {t('language') === 'th' ? 'เกม' : 'games'}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="card p-10 bg-white dark:bg-dark-900 border-none shadow-2xl"
        >
          <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-6 uppercase italic tracking-tight">
            {t('language') === 'th' ? 'เปรียบเทียบเพิ่ม' : 'Compare More'}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8 font-medium">
            {t('language') === 'th'
              ? `คุณกำลังเปรียบเทียบ ${compareList.length}/3 เกม ต้องการเพิ่มอีกไหม?`
              : `You are comparing ${compareList.length}/3 games. Want to add more?`}
          </p>
          {compareList.length < 3 ? (
            <Link href="/games" className="btn-primary w-full py-4 text-center">
              {t('addMoreGames')}
            </Link>
          ) : (
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-dark-800 text-center font-bold text-gray-400 uppercase tracking-widest text-xs">
              {t('language') === 'th' ? 'เลือกครบ 3 เกมแล้ว' : 'Limit reached (3 games)'}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
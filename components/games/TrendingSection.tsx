'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslation } from '@/hooks/useTranslation'
import { RiFireLine, RiArrowRightSLine } from 'react-icons/ri'

interface TrendingSectionProps {
    games: any[]
    isLoading: boolean
}

export function TrendingSection({ games, isLoading }: TrendingSectionProps) {
    const { t } = useTranslation()
    const trendingGames = games?.slice(0, 4) || []

    return (
        <section className="py-12">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-500/20 text-orange-500 rounded-xl flex items-center justify-center">
                        <RiFireLine className="text-2xl" />
                    </div>
                    <h2 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white uppercase">
                        {t('trendingNow')}
                    </h2>
                </div>
                <Link
                    href="/games?sort-by=popularity"
                    className="flex items-center space-x-1 text-primary-500 hover:text-primary-600 font-bold transition-colors group"
                >
                    <span>{t('viewAll')}</span>
                    <RiArrowRightSLine className="text-xl group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {isLoading ? (
                    [...Array(4)].map((_, i) => (
                        <div key={i} className="animate-pulse rounded-2xl bg-gray-200 dark:bg-dark-800 h-[300px]" />
                    ))
                ) : (
                    trendingGames.map((game, index) => (
                        <motion.div
                            key={game.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative overflow-hidden rounded-3xl h-[350px] cursor-pointer"
                        >
                            <Link href={`/games/${game.id}`}>
                                <Image
                                    src={game.thumbnail}
                                    alt={game.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                                <div className="absolute bottom-0 left-0 p-6 w-full">
                                    <span className="bg-primary-500 text-white text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-wider mb-2 inline-block">
                                        {game.genre}
                                    </span>
                                    <h3 className="text-xl font-bold text-white mb-1 line-clamp-1 group-hover:text-primary-400 transition-colors">
                                        {game.title}
                                    </h3>
                                    <p className="text-white/60 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        {game.short_description}
                                    </p>
                                </div>
                            </Link>
                        </motion.div>
                    ))
                )}
            </div>
        </section>
    )
}

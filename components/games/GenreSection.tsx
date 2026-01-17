'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useTranslation } from '@/hooks/useTranslation'
import { RiLayoutGridLine, RiSwordLine, RiGhostLine, RiCompassLine, RiTrophyLine, RiCarLine, RiTeamLine } from 'react-icons/ri'

export function GenreSection() {
    const { t } = useTranslation()

    const genres = [
        { id: 'mmo', label: 'genreMMO', icon: RiTeamLine, color: 'bg-blue-500' },
        { id: 'shooter', label: 'genreShooter', icon: RiSwordLine, color: 'bg-red-500' },
        { id: 'strategy', label: 'genreStrategy', icon: RiCompassLine, color: 'bg-emerald-500' },
        { id: 'moba', label: 'genreMOBA', icon: RiLayoutGridLine, color: 'bg-purple-500' },
        { id: 'racing', label: 'genreRacing', icon: RiCarLine, color: 'bg-orange-500' },
        { id: 'sports', label: 'genreSports', icon: RiTrophyLine, color: 'bg-sky-500' },
        { id: 'rpg', label: 'genreRPG', icon: RiGhostLine, color: 'bg-amber-500' },
        { id: 'action', label: 'genreAction', icon: RiSwordLine, color: 'bg-rose-500' },
    ]

    return (
        <section className="py-12">
            <div className="flex items-center space-x-3 mb-8">
                <div className="w-10 h-10 bg-primary-500/20 text-primary-500 rounded-xl flex items-center justify-center">
                    <RiLayoutGridLine className="text-2xl" />
                </div>
                <h2 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white uppercase">
                    {t('browseByGenre')}
                </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                {genres.map((genre, index) => (
                    <motion.div
                        key={genre.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        whileHover={{ y: -5 }}
                        transition={{ delay: index * 0.05 }}
                        viewport={{ once: true }}
                    >
                        <Link
                            href={`/games?genre=${genre.id}`}
                            className="flex flex-col items-center justify-center p-6 rounded-3xl bg-white dark:bg-dark-900 border border-gray-100 dark:border-dark-800 hover:border-primary-500/50 hover:shadow-xl hover:shadow-primary-500/10 transition-all group"
                        >
                            <div className={`w-12 h-12 ${genre.color} text-white rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                                <genre.icon className="text-2xl" />
                            </div>
                            <span className="text-xs font-bold text-gray-600 dark:text-gray-400 group-hover:text-primary-500 transition-colors text-center">
                                {t(genre.label as any)}
                            </span>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}

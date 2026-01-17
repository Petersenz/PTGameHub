'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts'
import { useGames } from '@/hooks/useGames'
import { useTranslation } from '@/hooks/useTranslation'
import { RiDashboardLine, RiBarChartLine, RiPieChartLine, RiLineChartLine, RiUserStarLine } from 'react-icons/ri'

const COLORS = ['#FF3131', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16']

export default function AnalyticsPage() {
  const { data: games, isLoading, error } = useGames()
  const { t, language } = useTranslation()

  const analytics = useMemo(() => {
    if (!games) return null

    // Genre distribution
    const genreCount = games.reduce((acc, game) => {
      acc[game.genre] = (acc[game.genre] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const genreData = Object.entries(genreCount)
      .map(([genre, count]) => ({ genre, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)

    // Platform distribution
    const platformCount = games.reduce((acc, game) => {
      acc[game.platform] = (acc[game.platform] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const platformData = Object.entries(platformCount)
      .map(([platform, count]) => ({ platform, count }))

    // Release year distribution
    const yearCount = games.reduce((acc, game) => {
      const year = new Date(game.release_date).getFullYear()
      if (year >= 2015) { // Focus on recent years
        acc[year] = (acc[year] || 0) + 1
      }
      return acc
    }, {} as Record<number, number>)

    const yearData = Object.entries(yearCount)
      .map(([year, count]) => ({ year: parseInt(year), count }))
      .sort((a, b) => a.year - b.year)

    // Developer stats
    const developerCount = games.reduce((acc, game) => {
      acc[game.developer] = (acc[game.developer] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const topDevelopers = Object.entries(developerCount)
      .map(([developer, count]) => ({ developer, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)

    return {
      totalGames: games.length,
      genreData,
      platformData,
      yearData,
      topDevelopers,
      totalGenres: Object.keys(genreCount).length,
      totalDevelopers: Object.keys(developerCount).length,
    }
  }, [games])

  if (error) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">🚫</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('loadingError')}</h2>
        <p className="text-gray-600 dark:text-gray-400">{t('connectionError')}</p>
      </div>
    )
  }

  if (isLoading || !analytics) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-12 bg-gray-200 dark:bg-dark-800 rounded-xl w-48 mx-auto" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 dark:bg-dark-800 rounded-3xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-80 bg-gray-200 dark:bg-dark-800 rounded-3xl" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-12">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="w-16 h-16 bg-primary-500/10 text-primary-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-primary-500/5">
          <RiDashboardLine className="text-4xl" />
        </div>
        <h1 className="text-5xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tighter italic">
          {t('gameAnalytics')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-xl font-medium">
          {t('analyticsSubtitle')}
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'totalGames', value: analytics.totalGames, color: 'text-primary-500', icon: RiDashboardLine },
          { label: 'gameGenres', value: analytics.totalGenres, color: 'text-orange-500', icon: RiBarChartLine },
          { label: 'platforms', value: analytics.platformData.length, color: 'text-purple-500', icon: RiPieChartLine },
          { label: 'totalDevelopers', value: analytics.totalDevelopers, color: 'text-blue-500', icon: RiUserStarLine },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group card p-8 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <stat.icon className="text-6xl" />
            </div>
            <div className={`text-4xl font-black ${stat.color} mb-2 tracking-tighter`}>
              {stat.value}
            </div>
            <div className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest text-xs">
              {t(stat.label as any)}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Genre Distribution */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="card p-8"
        >
          <div className="flex items-center space-x-3 mb-8">
            <RiBarChartLine className="text-primary-500 text-2xl" />
            <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
              {t('genreDistribution')}
            </h2>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={analytics.genreData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#88888820" />
              <XAxis
                dataKey="genre"
                angle={-45}
                textAnchor="end"
                height={80}
                fontSize={12}
                stroke="#888888"
              />
              <YAxis stroke="#888888" />
              <Tooltip
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                cursor={{ fill: 'rgba(255,49,49,0.05)' }}
              />
              <Bar dataKey="count" fill="#FF3131" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Platform Distribution */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="card p-8"
        >
          <div className="flex items-center space-x-3 mb-8">
            <RiPieChartLine className="text-primary-500 text-2xl" />
            <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
              {t('platformDistribution')}
            </h2>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={analytics.platformData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ platform, percent }) => `${platform} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="count"
                stroke="none"
              >
                {analytics.platformData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Release Year Trend */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="card p-8"
        >
          <div className="flex items-center space-x-3 mb-8">
            <RiLineChartLine className="text-primary-500 text-2xl" />
            <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
              {t('releaseYearTrend')}
            </h2>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={analytics.yearData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#88888820" />
              <XAxis dataKey="year" stroke="#888888" />
              <YAxis stroke="#888888" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#FF3131"
                strokeWidth={4}
                dot={{ fill: '#FF3131', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: '#fff', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Top Developers */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="card p-8"
        >
          <div className="flex items-center space-x-3 mb-8">
            <RiUserStarLine className="text-primary-500 text-2xl" />
            <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
              {t('topDevelopers')}
            </h2>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={analytics.topDevelopers} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#88888820" />
              <XAxis type="number" stroke="#888888" />
              <YAxis
                dataKey="developer"
                type="category"
                width={150}
                fontSize={12}
                stroke="#888888"
              />
              <Tooltip />
              <Bar dataKey="count" fill="#3B82F6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        viewport={{ once: true }}
        className="card p-10 bg-gaming-gradient shadow-2xl shadow-primary-500/30"
      >
        <h2 className="text-3xl font-black text-white mb-8 uppercase italic tracking-tight">
          {t('insights')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10">
            <h3 className="font-black text-primary-300 uppercase tracking-widest text-sm mb-3">
              {t('popularGenre')}
            </h3>
            <p className="text-white text-lg leading-relaxed">
              <span className="font-black text-2xl">{analytics.genreData[0]?.genre}</span> {language === 'th' ? 'เป็นประเภทเกมยอดนิยมที่สุด' : 'is the most popular genre'}
              <span className="opacity-60">{language === 'th' ? ` ด้วยจำนวน ${analytics.genreData[0]?.count} เกม` : ` with ${analytics.genreData[0]?.count} games`}</span>
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10">
            <h3 className="font-black text-primary-300 uppercase tracking-widest text-sm mb-3">
              {t('mainPlatform')}
            </h3>
            <p className="text-white text-lg leading-relaxed">
              <span className="font-black text-2xl">{analytics.platformData.find(p => p.count === Math.max(...analytics.platformData.map(p => p.count)))?.platform}</span> {language === 'th' ? 'รองรับเกมส่วนใหญ่' : 'supports most games'}
              <span className="opacity-60">{language === 'th' ? ` จำนวน ${Math.max(...analytics.platformData.map(p => p.count))} เกม` : ` totaling ${Math.max(...analytics.platformData.map(p => p.count))} games`}</span>
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10">
            <h3 className="font-black text-primary-300 uppercase tracking-widest text-sm mb-3">
              {t('releaseTrend')}
            </h3>
            <p className="text-white text-lg leading-relaxed">
              {language === 'th' ? 'ปีที่มีการเปิดตัวมากที่สุดคือ ' : 'The peak release year was '} <span className="font-black text-2xl">{analytics.yearData.find(y => y.count === Math.max(...analytics.yearData.map(y => y.count)))?.year}</span>
              <span className="opacity-60">{language === 'th' ? ` (${Math.max(...analytics.yearData.map(y => y.count))} เกม)` : ` (${Math.max(...analytics.yearData.map(y => y.count))} games)`}</span>
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10">
            <h3 className="font-black text-primary-300 uppercase tracking-widest text-sm mb-3">
              {t('topDeveloper')}
            </h3>
            <p className="text-white text-lg leading-relaxed">
              <span className="font-black text-2xl">{analytics.topDevelopers[0]?.developer}</span> {language === 'th' ? 'เป็นผู้พัฒนาที่แอคทีฟที่สุด' : 'is the most active developer'}
              <span className="opacity-60">{language === 'th' ? ` (${analytics.topDevelopers[0]?.count} เกม)` : ` (${analytics.topDevelopers[0]?.count} games)`}</span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
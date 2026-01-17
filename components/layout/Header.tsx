'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from '@/hooks/useTranslation'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
import { RiGamepadLine, RiDashboardLine, RiExchangeLine, RiHome4Line, RiSunLine, RiMoonLine, RiMenu4Line, RiCloseLine } from 'react-icons/ri'

export function Header() {
  const { theme, setTheme } = useTheme()
  const { t } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/', label: 'home', icon: RiHome4Line },
    { href: '/games', label: 'allGames', icon: RiGamepadLine },
    { href: '/analytics', label: 'analytics', icon: RiDashboardLine },
    { href: '/compare', label: 'compare', icon: RiExchangeLine },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-white/80 dark:bg-dark-950/80 backdrop-blur-lg shadow-lg border-b border-primary-500/20'
        : 'bg-white dark:bg-dark-900 border-b border-transparent'
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform duration-300">
              <RiGamepadLine className="text-white text-2xl" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tighter text-gray-900 dark:text-white leading-none">
                PT<span className="text-primary-500">GAME</span>HUB
              </span>
              <span className="text-[10px] uppercase font-bold text-primary-500/80 tracking-widest leading-none mt-1">
                {t('brandSlogan')}
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-500/10 transition-all duration-200 font-medium"
              >
                <link.icon className="text-lg" />
                <span>{t(link.label as any)}</span>
              </Link>
            ))}
          </nav>

          {/* Controls */}
          <div className="flex items-center space-x-3">
            <LanguageSwitcher />

            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2.5 rounded-xl bg-gray-100 dark:bg-dark-800 text-gray-700 dark:text-gray-300 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-500/10 transition-all duration-200 border border-transparent hover:border-primary-500/30"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <RiSunLine className="text-xl" /> : <RiMoonLine className="text-xl" />}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-gray-100 dark:bg-dark-800 text-gray-700 dark:text-gray-300"
            >
              {isMenuOpen ? <RiCloseLine className="text-2xl" /> : <RiMenu4Line className="text-2xl" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              className="md:hidden overflow-hidden pb-6"
            >
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-100 dark:border-dark-800">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-3 p-4 rounded-xl text-gray-700 dark:text-gray-300 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-500/10 transition-all"
                  >
                    <link.icon className="text-2xl" />
                    <span className="text-lg font-medium">{t(link.label as any)}</span>
                  </Link>
                ))}

                <div className="pt-4 mt-2 border-t border-gray-100 dark:border-dark-800">
                  <LanguageSwitcher variant="full" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
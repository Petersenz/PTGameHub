'use client'

import { motion } from 'framer-motion'
import { useTranslation } from '@/hooks/useTranslation'

interface LanguageSwitcherProps {
  variant?: 'compact' | 'full'
  className?: string
}

export function LanguageSwitcher({ variant = 'compact', className = '' }: LanguageSwitcherProps) {
  const { language, toggleLanguage } = useTranslation()

  if (variant === 'full') {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <span className="text-sm text-gray-600 dark:text-gray-400">Language:</span>
        <div className="relative">
          <motion.button
            onClick={toggleLanguage}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-200 dark:bg-dark-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-lg">
              {language === 'en' ? '🇺🇸' : '🇹🇭'}
            </span>
            <span className="text-sm font-medium">
              {language === 'en' ? 'English' : 'ไทย'}
            </span>
          </motion.button>
        </div>
      </div>
    )
  }

  return (
    <motion.button
      onClick={toggleLanguage}
      className={`p-2 rounded-lg bg-gray-200 dark:bg-dark-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center space-x-1 ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={`Switch to ${language === 'en' ? 'Thai' : 'English'}`}
    >
      <span className="text-sm font-medium">
        {language === 'en' ? 'EN' : 'TH'}
      </span>
    </motion.button>
  )
}
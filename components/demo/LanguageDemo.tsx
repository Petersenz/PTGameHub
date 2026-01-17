'use client'

import { useTranslation } from '@/hooks/useTranslation'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'

export function LanguageDemo() {
  const { t, language } = useTranslation()

  return (
    <div className="card p-6 max-w-md mx-auto">
      <h3 className="text-lg font-semibold mb-4">Language Demo</h3>
      
      <div className="space-y-3 mb-4">
        <p><strong>Current Language:</strong> {language === 'en' ? 'English' : 'Thai'}</p>
        <p><strong>Home:</strong> {t('home')}</p>
        <p><strong>All Games:</strong> {t('allGames')}</p>
        <p><strong>Analytics:</strong> {t('analytics')}</p>
        <p><strong>Compare:</strong> {t('compare')}</p>
        <p><strong>Hero Title:</strong> {t('heroTitle')}</p>
      </div>
      
      <LanguageSwitcher variant="full" />
    </div>
  )
}
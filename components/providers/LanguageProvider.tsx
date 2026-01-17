'use client'

import { useEffect, useState } from 'react'
import { useLanguageStore } from '@/store/languageStore'

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false)
  const setLanguage = useLanguageStore(state => state.setLanguage)

  useEffect(() => {
    // Initialize language from localStorage after hydration
    const savedLanguage = localStorage.getItem('language')
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'th')) {
      setLanguage(savedLanguage as 'en' | 'th')
    }
    setIsHydrated(true)
  }, [setLanguage])

  // Prevent hydration mismatch by not rendering until hydrated
  if (!isHydrated) {
    return <div className="min-h-screen bg-gray-50 dark:bg-dark-300">{children}</div>
  }

  return <>{children}</>
}
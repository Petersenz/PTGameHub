import { create } from 'zustand'

type Language = 'en' | 'th'

interface LanguageStore {
  language: Language
  setLanguage: (language: Language) => void
}

export const useLanguageStore = create<LanguageStore>((set) => ({
  language: 'en', // Default to English
  setLanguage: (language) => {
    set({ language })
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', language)
    }
  },
}))

// Initialize language from localStorage on client side
if (typeof window !== 'undefined') {
  const savedLanguage = localStorage.getItem('language') as Language
  if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'th')) {
    useLanguageStore.getState().setLanguage(savedLanguage)
  }
}
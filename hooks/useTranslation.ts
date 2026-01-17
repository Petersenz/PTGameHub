import { useLanguageStore } from '@/store/languageStore'
import { translations, TranslationKey } from '@/lib/translations'

export function useTranslation() {
  const { language, setLanguage } = useLanguageStore()

  const t = (key: TranslationKey): string => {
    return translations[language][key] || translations.en[key] || key
  }

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'th' : 'en')
  }

  return {
    t,
    language,
    setLanguage,
    toggleLanguage,
    isEnglish: language === 'en',
    isThai: language === 'th',
  }
}
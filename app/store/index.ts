import {create} from 'zustand'
import i18n from 'i18next'

type LanguageStore = {
  language: 'en' | 'ar'
  isRTL: boolean
  toggleLanguage: () => void
}

export const useStore = create<LanguageStore>(set => ({
  language: 'en',
  isRTL: false,
  toggleLanguage: () => {
    i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar')

    set(state => ({
      language: state.language === 'en' ? 'ar' : 'en',
      isRTL: !state.isRTL,
    }))
  },
}))

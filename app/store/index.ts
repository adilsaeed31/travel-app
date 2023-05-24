import {create} from 'zustand'
import i18n from 'i18next'

export type LanguageStore = {
  language: 'en' | 'ar'
  isRTL: boolean
  hasIntroSeen: boolean
  toggleLanguage: () => void
  introHasBeenSeen: () => void
}

export const useStore = create<LanguageStore>(set => ({
  language: 'en',
  isRTL: false,
  hasIntroSeen: false,
  toggleLanguage: () => {
    i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar')

    set(state => ({
      language: state.language === 'en' ? 'ar' : 'en',
      isRTL: !state.isRTL,
    }))
  },
  introHasBeenSeen: () => {
    set(() => ({
      hasIntroSeen: true,
    }))
  },
}))

import {create} from 'zustand'

type LanguageStore = {
  language: 'en' | 'ar'
  isRTL: boolean
  toggleLanguage: () => void
}

export const useStore = create<LanguageStore>(set => ({
  language: 'en',
  isRTL: false,
  toggleLanguage: () => {
    set(state => ({
      language: state.language === 'en' ? 'ar' : 'en',
      isRTL: !state.isRTL,
    }))
  },
}))

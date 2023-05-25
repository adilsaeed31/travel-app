import i18n from 'i18next'
import {StateCreator} from 'zustand'

// below is the example to set the multiple files state and store
export type AppStateProps = {
  language: string
  isRTL: boolean
  hasIntroSeen: boolean
  toggleLanguage: () => void
  introHasBeenSeen: () => void
}

const AppState: StateCreator<AppStateProps> = set => ({
  language: 'en',
  isRTL: false,
  hasIntroSeen: false,
  toggleLanguage: () => {
    i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar')

    set((state: {language: string; isRTL: boolean}) => ({
      language: state.language === 'en' ? 'ar' : 'en',
      isRTL: !state.isRTL,
    }))
  },

  introHasBeenSeen: () => {
    set(() => ({
      hasIntroSeen: true,
    }))
  },
})

export default AppState

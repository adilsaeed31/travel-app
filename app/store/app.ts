import i18n from 'i18next'
import {StateCreator} from 'zustand'

import {clearStorage} from '@Utils'

// below is the example to set the multiple files state and store
export type AppStateProps = {
  language: string
  isRTL: boolean
  hasIntroSeen: boolean
  isAppReady: boolean
  toggleLanguage: () => void
  introHasBeenSeen: () => void
  setAppHasReady: () => void
  reset: () => void
}

const AppState: StateCreator<AppStateProps> = set => ({
  language: 'en',
  isRTL: false,
  hasIntroSeen: false,
  isAppReady: false,
  toggleLanguage: () => {
    i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar')

    set((state: {language: string; isRTL: boolean}) => ({
      language: state.language === 'en' ? 'ar' : 'en',
      isRTL: !state.isRTL,
    }))
  },

  setAppHasReady: () => set(() => ({isAppReady: true})),

  introHasBeenSeen: () =>
    set(() => ({
      hasIntroSeen: true,
    })),

  reset: async () => {
    await clearStorage()
    set({
      hasIntroSeen: false,
      isAppReady: false,
    })
  },
})

export default AppState

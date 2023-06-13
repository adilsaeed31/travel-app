import i18n from 'i18next'
import {StateCreator} from 'zustand'

import {clearStorage} from '@Utils'

// below is the example to set the multiple files state and store
export type AppStateProps = {
  language: string
  isRTL: boolean
  hasIntroSeen: boolean
  isAppReady: boolean
  active: number
  enableBottomSheet: boolean
  transData: string[]

  toggleLanguage: () => void
  introHasBeenSeen: () => void
  setAppHasReady: () => void
  setActiveIndex: (active: number) => void
  reset: () => void
  toggleBottomSheet: () => void
  setTransData: (data: any) => void
}

const AppState: StateCreator<AppStateProps> = set => ({
  language: 'en',
  isRTL: false,
  active: 0,
  hasIntroSeen: false,
  isAppReady: false,
  enableBottomSheet: true,
  transData: [],
  toggleLanguage: () => {
    i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar')

    set(state => ({
      language: state.language === 'en' ? 'ar' : 'en',
      isRTL: !state.isRTL,
    }))
  },
  setActiveIndex: active => {
    set(() => ({
      active: active,
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
      enableBottomSheet: true,
    })
  },
  toggleBottomSheet: () =>
    set(state => ({enableBottomSheet: !state.enableBottomSheet})),

  setTransData: data => set(() => ({transData: data})),
})

export default AppState

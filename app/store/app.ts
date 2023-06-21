import {StateCreator} from 'zustand'

import {clearStorage} from '@Utils'
import {useStore} from '@Store'

// below is the example to set the multiple files state and store
export type AppStateProps = {
  language: string
  isRTL: boolean
  hasIntroSeen: boolean
  isAppReady: boolean
  active: number
  transData: string[]
  cardData: string[]
  activeCardIndex: number
  enableBottomSheet: boolean

  toggleLanguage: () => void
  introHasBeenSeen: () => void
  setAppHasReady: () => void
  setActiveIndex: (active: number) => void
  reset: () => void
  toggleBottomSheet: () => void
  setTransData: (data: any) => void
  setCardData: (data: any) => void
  setActiveCardIndex: (index: number) => void
}

const AppState: StateCreator<AppStateProps> = set => ({
  language: 'en',
  isRTL: false,
  active: 0,
  hasIntroSeen: false,
  isAppReady: false,
  enableBottomSheet: true,
  transData: [],
  cardData: [],
  activeCardIndex: 0,
  toggleLanguage: () => {
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

  setCardData: data => set(() => ({cardData: data})),

  setActiveCardIndex: (index: number) => set(() => ({activeCardIndex: index})),
})

export default AppState

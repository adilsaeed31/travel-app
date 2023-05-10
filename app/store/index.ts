import {isRTL} from '@Utils'
import {create} from 'zustand'

export const useStore = create<{isRTL: boolean; language: string}>(set => ({
  isRTL: isRTL,
  language: 'en',

  setIsRTL: (value: any) => set({isRTL: value}),
  setLanguage: (value: any) => set({language: value}),
}))

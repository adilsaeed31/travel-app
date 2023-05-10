import {create} from 'zustand'

export const useStore = create(set => ({
  isRTL: false,
  language: 'en',

  setIsRTL: (value: any) => set({isRTL: value}),
  setLanguage: (value: any) => set({language: value}),
}))

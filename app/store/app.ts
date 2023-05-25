import i18n from 'i18next'

// below is the example to set the multiple files state and store
export type AppStoreProps = {
  language: string
  isRTL: boolean
  hasIntroSeen: boolean
  toggleLanguage: () => void
  introHasBeenSeen: () => void
}

export default (set: any) => ({
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

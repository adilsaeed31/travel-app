import React, {createContext, useState, ReactNode} from 'react'
import {useColorScheme, ColorSchemeName} from 'react-native'

import {useStore} from '@Store'
import {setIntro} from '@Utils'

export type AppProviderProps = {
  children?: ReactNode
  mode?: ColorSchemeName
  language?: string
  direction?: string
  isAppReady?: boolean
  hasIntroSeen?: boolean
  isRTL?: boolean
  changeMode?: () => void
  changeLanguage?: () => void
  setAppReady?: () => void
}

export const AppContext = createContext<AppProviderProps>({
  mode: 'light',
  language: 'en',
  direction: 'ltr',
  isAppReady: false,
  hasIntroSeen: false,
  isRTL: false,

  changeMode: () => {},
  changeLanguage: () => {},
  setAppReady: () => {},
})

/**
 * AppProvider for TravelCard App
 * below we are storing language, direction and dark mode object
 * We can also use changeMode, changeLanguage and changeDirection methods to change them
 */

export function AppProvider(props: AppProviderProps) {
  const isRTL = useStore(state => state.isRTL)
  const hasIntroSeen = useStore(state => state.hasIntroSeen)
  const toggleLanguage = useStore(state => state.toggleLanguage)
  const introHasBeenSeen = useStore(state => state.introHasBeenSeen)

  const [language, setLanguage] = useState<string>('en')
  const [direction, setDirection] = useState<string>('ltr')
  const [mode, setMode] = useState<ColorSchemeName>(useColorScheme())
  const [isAppReady, setIsAppReady] = useState<boolean>(false)

  // changing the dark and light mode here
  const changeMode = () => setMode(mode === 'light' ? 'dark' : 'light')

  // changing language and direction both here
  const changeLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en')
    setDirection(direction === 'rtl' ? 'ltr' : 'rtl')
    toggleLanguage()
  }

  // setting app isready here
  const setAppReady = () => {
    setIsAppReady(true)
    setIntro()
    introHasBeenSeen()
  }

  return (
    <AppContext.Provider
      {...props}
      value={{
        mode,
        isRTL,
        language,
        direction,
        isAppReady,
        hasIntroSeen,

        changeMode,
        setAppReady,
        changeLanguage,
      }}
    />
  )
}

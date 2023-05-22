import React, {createContext, useState, ReactNode} from 'react'
import {useColorScheme} from 'react-native'

import {useStore} from '@Store'

export type AppProviderProps = {
  children?: ReactNode
  mode?: 'dark' | 'light' | null
  language?: string
  direction?: string
  changeMode?: () => void
  changeLanguage?: () => void
}

export const AppContext = createContext<AppProviderProps>({
  mode: 'light',
  language: 'en',
  direction: 'ltr',
  changeMode: () => {},
  changeLanguage: () => {},
})

/**
 * AppProvider for TravelCard App
 * below we are storing language, direction and dark mode object
 * We can also use changeMode, changeLanguage and changeDirection methods to change them
 */

export function AppProvider(props: AppProviderProps) {
  const {toggleLanguage} = useStore()
  let [mode, setMode] = useState(useColorScheme())
  let [language, setLanguage] = useState('en')
  let [direction, setDirection] = useState('ltr')

  const changeMode = () => setMode(mode === 'light' ? 'dark' : 'light')

  const changeLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en')
    setDirection(direction === 'rtl' ? 'ltr' : 'rtl')
    toggleLanguage()
  }

  return (
    <AppContext.Provider
      {...props}
      value={{
        mode,
        language,
        direction,

        changeMode,
        changeLanguage,
      }}
    />
  )
}

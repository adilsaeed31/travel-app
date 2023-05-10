import React, {createContext, useState, ReactNode} from 'react'
import {useStore} from '@Store'

export type AppProviderProps = {
  children?: ReactNode
  mode?: string
  language?: string
  direction?: string
  changeMode?: () => void
  changeLanguage?: () => void
}

export const AppContext = createContext<AppProviderProps>({
  mode: 'dark',
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
  const {setIsRTL} = useStore()
  let [mode, setMode] = useState('dark')
  let [language, setLanguage] = useState('en')
  let [direction, setDirection] = useState('ltr')

  const changeMode = () => setMode(mode === 'light' ? 'dark' : 'light')

  const changeLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en')
    setDirection(direction === 'rtl' ? 'ltr' : 'rtl')
    setIsRTL(direction !== 'rtl')
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

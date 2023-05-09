import React, {createContext, useState} from 'react'

export type AppProviderProps = {
  mode: string
  language: string
  direction: string
  changeMode: () => void
  changeLanguage: () => void
  changeDirection: () => void
}

export const AppContext = createContext<AppProviderProps>({
  mode: 'dark',
  language: 'en',
  direction: 'ltr',
  changeMode: () => {},
  changeLanguage: () => {},
  changeDirection: () => {},
})

/**
 * AppProvider for TravelCard App
 * below we are storing language, direction and dark mode object
 * We can also use changeMode, changeLanguage and changeDirection methods to change them
 */

type AppProps = JSX.IntrinsicAttributes & React.ProviderProps<AppProviderProps>

export function AppProvider(props: AppProps) {
  let [mode, setMode] = useState('dark')
  let [language, setLanguage] = useState('en')
  let [direction, setDirection] = useState('ltr')

  const changeMode = () => setMode(mode === 'light' ? 'dark' : 'light')

  const changeDirection = () =>
    setDirection(direction === 'rtl' ? 'ltr' : 'rtl')

  const changeLanguage = () => setLanguage(language === 'en' ? 'ar' : 'en')

  return (
    <AppContext.Provider
      {...props}
      value={{
        mode,
        language,
        direction,

        changeMode,
        changeLanguage,
        changeDirection,
      }}
    />
  )
}

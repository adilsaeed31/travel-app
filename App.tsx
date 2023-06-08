/**
 * Travel Card React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react'
import {LogBox} from 'react-native'
import {QueryClientProvider} from '@tanstack/react-query'
import {translation} from '@Utils'

import {queryClient} from '@Api'
import i18next from 'i18next'
import {initReactI18next} from 'react-i18next'

import {MainNavigation} from '@Navigations'
import {AuthProvider, AppProvider} from '@Context'
import {useStore} from '@Store'
interface CustomLanguageDetectorType {
  type: 'languageDetector'
  async: Boolean
  detect: (cb: (lng: string) => void) => void
  init: (options: any) => void
  cacheUserLanguage: (lng: string) => void
}

function App(): React.JSX.Element {
  const languageDetector: CustomLanguageDetectorType = {
    type: 'languageDetector',
    async: true,
    detect: (cb: any) => cb(useStore.getState().language),
    init: () => {},
    cacheUserLanguage: () => {},
  }

  i18next.use(languageDetector).use(initReactI18next).init({
    fallbackLng: 'en',
    compatibilityJSON: 'v3',
    debug: false,
    resources: translation,
  })

  LogBox.ignoreAllLogs()
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppProvider>
          <MainNavigation />
        </AppProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App

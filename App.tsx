/**
 * Travel Card React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react'
import i18next from 'i18next'
import {LogBox} from 'react-native'
import {QueryClientProvider} from '@tanstack/react-query'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import i18n from 'i18next'

import {queryClient} from '@Api'
import {translation} from '@Utils'
import {initReactI18next} from 'react-i18next'

import {useStore} from '@Store'
import {MainNavigation} from '@Navigations'
import {AuthProvider, AppProvider} from '@Context'
import Toast from 'react-native-toast-message'

interface CustomLanguageDetectorType {
  type: 'languageDetector'
  async: Boolean
  detect: (cb: (lng: string) => void) => void
  init: (options: any) => void
  cacheUserLanguage: (lng: string) => void
}

function App(): React.JSX.Element {
  const language = useStore(state => state.language)
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

  useEffect(() => {
    i18n.changeLanguage(language)
  }, [language])
  LogBox.ignoreAllLogs()

  return (
    <GestureHandlerRootView className="flex-1">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AppProvider>
            <MainNavigation />
          </AppProvider>
        </AuthProvider>
      </QueryClientProvider>
      <Toast />
    </GestureHandlerRootView>
  )
}

export default App

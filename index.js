import 'react-native-gesture-handler'

import {AppRegistry} from 'react-native'
import App from './App'
import {name as appName} from './app.json'
import i18next from 'i18next'
import {initReactI18next} from 'react-i18next'

import {translation} from '@Utils'

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: cb => cb('en'),
  init: () => {},
  cacheUserLanguage: () => {},
}

i18next.use(languageDetector).use(initReactI18next).init({
  fallbackLng: 'en',
  compatibilityJSON: 'v3',
  debug: false,
  resources: translation,
})

AppRegistry.registerComponent(appName, () => App)

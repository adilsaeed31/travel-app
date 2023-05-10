import {Platform, I18nManager, NativeModules} from 'react-native'
import {translation as trans} from './translation'

export const isRTL = I18nManager.isRTL

export const getLanguage = () => {
  const deviceLanguage =
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS language
      : NativeModules.I18nManager.localeIdentifier // Android language

  return deviceLanguage.substr(0, 2) // Get the first two characters (language code)
}
export const translation = trans

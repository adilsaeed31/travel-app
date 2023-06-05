import React, {useContext, memo} from 'react'
import {TouchableOpacity} from 'react-native'
import {t} from 'i18next'

import {TCTextView} from '@Components'
import {AppContext, AppProviderProps} from '@Context'

function IntroLang() {
  const {changeLanguage} = useContext<AppProviderProps>(AppContext)

  return (
    <TouchableOpacity
      className="p-4 justify-center items-center"
      onPress={changeLanguage}>
      <TCTextView className="text-tc-secondary font-tc-bold">
        {t('onboarding:lang')}
      </TCTextView>
    </TouchableOpacity>
  )
}

export default memo(IntroLang)

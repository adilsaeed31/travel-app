import React, {memo} from 'react'
import Ripple from 'react-native-material-ripple'

import {Colors} from '@Utils'
import {useStore} from '@Store'
import {TCTextView} from '@Components'
import {useTranslation} from 'react-i18next'

function IntroLang() {
  const {t} = useTranslation()
  const toggleLanguage = useStore(state => state.toggleLanguage)

  return (
    <Ripple
      onPress={toggleLanguage}
      rippleColor={Colors.Supernova}
      rippleContainerBorderRadius={24}
      className="p-4 justify-center items-center">
      <TCTextView className="text-tc-secondary font-tc-bold">
        {t('onboarding:lang')}
      </TCTextView>
    </Ripple>
  )
}

export default memo(IntroLang)

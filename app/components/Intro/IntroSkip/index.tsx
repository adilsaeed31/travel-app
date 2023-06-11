import React, {memo} from 'react'
import {TouchableOpacity} from 'react-native'
import {useTranslation} from 'react-i18next'

import {useStore} from '@Store'
import {TCTextView} from '@Components'

const IntroSkip = () => {
  const {t} = useTranslation()
  const setAppHasReady = useStore(state => state.setAppHasReady)

  return (
    <TouchableOpacity onPress={setAppHasReady}>
      <TCTextView className="ml-2 text-base text-tc-secondary">
        {t('intro:skip')}
      </TCTextView>
    </TouchableOpacity>
  )
}

export default memo(IntroSkip)

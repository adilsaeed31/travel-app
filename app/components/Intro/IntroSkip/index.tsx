import React, {memo} from 'react'
import {TouchableOpacity} from 'react-native'
import {useTranslation} from 'react-i18next'
import cn from 'classnames'

import {ml} from '@Utils'
import {useStore} from '@Store'
import {TCTextView} from '@Components'

const IntroSkip = () => {
  const {t} = useTranslation()
  const isRTL = useStore(state => state.isRTL)
  const setAppHasReady = useStore(state => state.setAppHasReady)

  return (
    <TouchableOpacity onPress={setAppHasReady}>
      <TCTextView className={cn(ml(isRTL), 'text-base text-tc-secondary')}>
        {t('intro:skip')}
      </TCTextView>
    </TouchableOpacity>
  )
}

export default memo(IntroSkip)

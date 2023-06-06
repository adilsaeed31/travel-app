import React, {memo} from 'react'
import {TouchableOpacity} from 'react-native'
import {t} from 'i18next'
import cn from 'classnames'

import {m2} from '@Utils'
import {useStore} from '@Store'
import {TCTextView} from '@Components'

const IntroSkip = () => {
  const isRTL = useStore(state => state.isRTL)
  const setAppHasReady = useStore(state => state.setAppHasReady)

  return (
    <TouchableOpacity onPress={setAppHasReady}>
      <TCTextView className={cn(m2(isRTL), 'text-base text-tc-secondary')}>
        {t('intro:skip')}
      </TCTextView>
    </TouchableOpacity>
  )
}

export default memo(IntroSkip)

import React, {memo} from 'react'
import {View} from 'react-native'
import {useTranslation} from 'react-i18next'
import cn from 'classnames'

import {flexRowLayout} from '@Utils'
import {useStore} from '@Store'
import {TCTextView, Dot} from '@Components'

const toggleTextActiveCls = (active: boolean) =>
  active ? 'text-tc-secondary' : 'text-tc-secondary opacity-50'

const PassRules: React.FC<{
  passwordOne: boolean
  passwordTwo: boolean
  passwordThree: boolean
  passwordFour: boolean
}> = ({passwordOne, passwordTwo, passwordThree, passwordFour}) => {
  const {t} = useTranslation()
  const isRTL = useStore(state => state.isRTL)

  return (
    <>
      <View className={cn(flexRowLayout(isRTL), 'mb-3 items-center')}>
        <Dot isActive={passwordOne} />
        <TCTextView className={cn(toggleTextActiveCls(passwordOne))}>
          {t('onboarding:passRule1')}
        </TCTextView>
      </View>

      <View className={cn(flexRowLayout(isRTL), 'mb-3 items-center')}>
        <Dot isActive={passwordTwo} />
        <TCTextView className={cn(toggleTextActiveCls(passwordTwo))}>
          {t('onboarding:passRule2')}
        </TCTextView>
      </View>

      <View className={cn(flexRowLayout(isRTL), 'mb-3 items-center')}>
        <Dot isActive={passwordThree} />
        <TCTextView className={cn(toggleTextActiveCls(passwordThree))}>
          {t('onboarding:passRule3')}
        </TCTextView>
      </View>

      <View className={cn(flexRowLayout(isRTL), 'items-center')}>
        <Dot isActive={passwordFour} />
        <TCTextView className={cn(toggleTextActiveCls(passwordFour))}>
          {t('onboarding:passRule4')}
        </TCTextView>
      </View>
    </>
  )
}

export default memo(PassRules)

import React from 'react'
import {View} from 'react-native'
import {useTranslation} from 'react-i18next'
import Animated, {ZoomInEasyDown} from 'react-native-reanimated'
import cn from 'classnames'

import {useStore} from '@Store'
import {flexRowLayout} from '@Utils'
import {AddCurrencyIcon, LoadIcon, ManageIcon, UnloadIcon} from '@Assets'

import QuickAction from '../../QuickAction'
import {useNavigation} from '@react-navigation/native'

const QuickActions = () => {
  const {t} = useTranslation()
  const isRTL = useStore(state => state.isRTL)
  const navigator = useNavigation()

  return (
    <View className={cn(flexRowLayout(isRTL), 'justify-between m-4')}>
      <Animated.View entering={ZoomInEasyDown.duration(500).delay(100)}>
        <QuickAction
          onPress={() => navigator.navigate('Home', {screen: 'LoadFunds'})}
          icon={<LoadIcon />}
          name={t('TravelCard:load')}
        />
      </Animated.View>

      <Animated.View entering={ZoomInEasyDown.duration(500).delay(150)}>
        <QuickAction icon={<UnloadIcon />} name={t('TravelCard:unload')} />
      </Animated.View>

      <Animated.View entering={ZoomInEasyDown.duration(500).delay(200)}>
        <QuickAction
          icon={<AddCurrencyIcon />}
          name={t('TravelCard:currency')}
        />
      </Animated.View>

      <Animated.View entering={ZoomInEasyDown.duration(500).delay(250)}>
        <QuickAction icon={<ManageIcon />} name={t('TravelCard:manage')} />
      </Animated.View>
    </View>
  )
}

export default QuickActions

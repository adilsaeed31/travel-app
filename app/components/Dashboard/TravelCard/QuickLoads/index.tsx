import React from 'react'
import {View, ScrollView} from 'react-native'
import {useTranslation} from 'react-i18next'
import Animated, {SlideInLeft, SlideInRight} from 'react-native-reanimated'
import cn from 'classnames'

import {useStore} from '@Store'
import {QuickLoadIcon} from '@Assets'
import {Colors, flexRowLayout, ml} from '@Utils'

import {default as TCTextView} from '../../../TextView'
import {default as QuickLoad} from '../../QuickLoad'

const QuickLoads = () => {
  const {t} = useTranslation()
  const isRTL = useStore(state => state.isRTL)

  return (
    <View className={cn(flexRowLayout(isRTL), 'items-center my-4 ml-4')}>
      <Animated.View entering={SlideInLeft.duration(1000).delay(50)}>
        <TCTextView variant={{color: Colors.QuickText}}>
          {t('TravelCard:quickLoad')}
        </TCTextView>
        <QuickLoadIcon className="mt-1" />
      </Animated.View>

      <Animated.View
        className={cn('flex-1', ml(isRTL), 'items-center')}
        entering={SlideInRight.duration(1000).delay(50)}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className={cn(flexRowLayout(isRTL))}>
            <QuickLoad
              name={t('TravelCard:currentCodeEuro', {amount: '100'})}
            />

            <QuickLoad
              name={t('TravelCard:currentCodeEuro', {amount: '200'})}
            />

            <QuickLoad
              name={t('TravelCard:currentCodeEuro', {amount: '300'})}
            />

            <QuickLoad
              name={t('TravelCard:currentCodeEuro', {amount: '400'})}
            />
          </View>
        </ScrollView>
      </Animated.View>
    </View>
  )
}

export default QuickLoads

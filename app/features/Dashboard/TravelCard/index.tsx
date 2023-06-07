import React, {memo} from 'react'
import {View, ScrollView} from 'react-native'
import Animated, {
  FadeIn,
  FadeInRight,
  LightSpeedInLeft,
} from 'react-native-reanimated'

import {
  CurrencyRow,
  Promotions,
  QuickActions,
  QuickLoads,
  UserTravelCard,
} from '@Components'

type TravelCardScreenProps = {
  data?: object
}

const TravelCardScreen: React.FC<TravelCardScreenProps> = () => {
  return (
    <ScrollView>
      <Animated.View entering={FadeInRight.duration(1000).delay(50)}>
        <UserTravelCard />
      </Animated.View>

      <Animated.View entering={LightSpeedInLeft.duration(1000).delay(100)}>
        <CurrencyRow />
      </Animated.View>

      <QuickActions />

      <QuickLoads />

      <Animated.View entering={FadeIn.duration(1500).delay(150)}>
        <Promotions />
      </Animated.View>
    </ScrollView>
  )
}

export default memo(TravelCardScreen)

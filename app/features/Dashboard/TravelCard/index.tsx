import React, {memo} from 'react'
import {ScrollView} from 'react-native'
import Animated, {FadeInRight, LightSpeedInLeft} from 'react-native-reanimated'

import {
  CurrencyRow,
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
    </ScrollView>
  )
}

export default memo(TravelCardScreen)

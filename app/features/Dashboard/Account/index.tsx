import React, {memo} from 'react'
import {ScrollView} from 'react-native'
import Animated, {FadeInRight} from 'react-native-reanimated'

import {QuickActions, UserAccountCardView} from '@Components'

type TravelCardScreenProps = {
  data?: object
}

const TravelCardScreen: React.FC<TravelCardScreenProps> = () => {
  return (
    <ScrollView>
      <Animated.View entering={FadeInRight.duration(1000).delay(50)}>
        <UserAccountCardView />
      </Animated.View>

      <QuickActions />
    </ScrollView>
  )
}

export default memo(TravelCardScreen)

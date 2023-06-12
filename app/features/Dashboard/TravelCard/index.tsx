import React, {memo} from 'react'
import {View, ScrollView} from 'react-native'
import {useQuery} from '@tanstack/react-query'
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
import {BASE_URL} from '@Utils'
import {fetcher, token} from '@Api'

const TravelCardScreen: React.FC = () => {
  const {isLoading, data} = useQuery({
    queryKey: ['card', token, BASE_URL],
    queryFn: async () => {
      let res: any = await fetcher(`${BASE_URL}/card/card`, {
        method: 'GET',
        token: token,
      })
      try {
        if (res.status >= 200 && res.status < 300 && !!res.bodyString) {
          return await res.json()
        }
        return res.status
      } catch (e) {
        return 500 // something went wrong
      }
    },
  })

  return (
    <View className="flex-1">
      <ScrollView>
        <Animated.View entering={FadeInRight.duration(1000).delay(50)}>
          <UserTravelCard isLoading={isLoading} data={data} />
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
    </View>
  )
}

export default memo(TravelCardScreen)

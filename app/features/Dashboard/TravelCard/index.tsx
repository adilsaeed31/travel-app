import React, {memo, useEffect} from 'react'
import {ScrollView} from 'react-native'
import {useQuery} from '@tanstack/react-query'
import Animated, {
  FadeInRight,
  FadeInUp,
  LightSpeedInLeft,
} from 'react-native-reanimated'

import {
  CurrencyRow,
  Promotions,
  QuickActions,
  QuickLoads,
  UserTravelCard,
} from '@Components'
import {useStore} from '@Store'
import {BASE_URL} from '@Utils'
import {fetcher, token} from '@Api'

const TravelCardScreen: React.FC = () => {
  const user = useStore(state => state.user)
  const setTransData = useStore(state => state.setTransData)

  const {isLoading, data} = useQuery({
    placeholderData: [],
    queryKey: ['card', BASE_URL, token, user?.access_token],
    queryFn: async () => {
      let res: any = await fetcher(`${BASE_URL}/card/card`, {
        method: 'GET',
        token: user?.access_token ?? token,
      })
      try {
        if (res.status >= 200 && res.status < 300 && !!res.bodyString) {
          return await res.json()
        }
        return res.status
      } catch (e) {
        console.log(e, 'e')
        return 500
      }
    },
  })

  console.log(data, 'data')

  const {data: transData} = useQuery({
    placeholderData: [],
    queryKey: ['trans', BASE_URL, token, user?.access_token],
    queryFn: async () => {
      let res: any = await fetcher(`${BASE_URL}/card/transactions`, {
        method: 'POST',
        body: {currency: 'SAR'},
        token: user?.access_token ?? token,
      })
      try {
        if (res.status >= 200 && res.status < 300 && !!res.bodyString) {
          return await res.json()
        }
        return res.status
      } catch (e) {
        console.log(e, 'e')
        return 500
      }
    },
  })

  useEffect(() => {
    if (transData?.length > 0) {
      setTransData(transData)
    }
  }, [setTransData, transData])

  const activeIndex = Math.floor(Math.random() * 6) + 1

  return (
    <ScrollView>
      <Animated.View entering={FadeInRight.duration(1000).delay(50)}>
        <UserTravelCard
          data={data}
          isLoading={isLoading}
          activeIndex={activeIndex}
        />
      </Animated.View>

      <Animated.View entering={LightSpeedInLeft.duration(1000).delay(100)}>
        <CurrencyRow data={data} activeIndex={activeIndex} />
      </Animated.View>

      <QuickActions />

      <QuickLoads data={data} activeIndex={activeIndex} />

      <Animated.View entering={FadeInUp.duration(1000).delay(150)}>
        <Promotions />
      </Animated.View>
    </ScrollView>
  )
}

export default memo(TravelCardScreen)

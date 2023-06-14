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

  const {
    isLoading,
    data: cardData,
    isError,
    error,
  } = useQuery({
    placeholderData: [],
    queryKey: ['card', BASE_URL, token, user?.access_token],
    queryFn: async () => {
      const res: any = await fetcher(`${BASE_URL}/card/card`, {
        token: user?.access_token ?? token,
      })

      console.log(res.ok, 'ok')

      const data = await res.json()
      console.log(data, 'data card')

      if (data?.status > 200) {
        return []
      }

      return data
    },
  })

  const {data: transData} = useQuery({
    placeholderData: [],
    queryKey: ['trans', BASE_URL, token, user?.access_token],
    queryFn: async () => {
      const res: any = await fetcher(`${BASE_URL}/card/transactions`, {
        method: 'POST',
        body: {currency: 'adil'},
        token: user?.access_token ?? token,
      })

      console.log(res.ok, 'ok')

      const data = await res.json()

      if (data?.status > 200) {
        return []
      }

      console.log(data, 'data trans')
      return data
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
          data={cardData}
          isLoading={isLoading}
          activeIndex={activeIndex}
          isError={isError}
          error={error}
        />
      </Animated.View>

      <Animated.View entering={LightSpeedInLeft.duration(1000).delay(100)}>
        <CurrencyRow data={cardData} activeIndex={activeIndex} />
      </Animated.View>

      <QuickActions />

      <QuickLoads data={cardData} activeIndex={activeIndex} />

      <Animated.View entering={FadeInUp.duration(1000).delay(150)}>
        <Promotions />
      </Animated.View>
    </ScrollView>
  )
}

export default memo(TravelCardScreen)

import React, {memo, useEffect, useState} from 'react'
import {View, ScrollView} from 'react-native'
import Animated, {
  FadeIn,
  FadeInRight,
  LightSpeedInLeft,
} from 'react-native-reanimated'
import {useIsFocused} from '@react-navigation/native'

import {
  CurrencyRow,
  Promotions,
  QuickActions,
  QuickLoads,
  UserTravelCard,
} from '@Components'
import {useQuery} from '@tanstack/react-query'
import {BASE_URL} from '@Utils'
import {fetcher, token} from '@Api'

type TravelCardScreenProps = {
  data?: object
}

const TravelCardScreen: React.FC<TravelCardScreenProps> = () => {
  const isFocused = useIsFocused()
  const [status, setstatus] = useState(0)

  const url = `${BASE_URL}/card/card`
  const {isLoading, isFetching, data, refetch} = useQuery({
    queryKey: ['card', url, token],
    queryFn: async () => {
      let res: any = await fetcher(url, {
        method: 'GET',
        token: token,
      })
      try {
        setstatus(res.status)
        if (res.status >= 200 && res.status < 300 && !!res.bodyString) {
          return await res.json()
        }
        return res.status
      } catch (e) {
        setstatus(500)
        return 500 // something went wrong
      }
    },
    refetchOnWindowFocus: false,

    enabled: false, // disable this query from automatically running
  })

  useEffect(() => {
    if (!isFetching && data && isFocused) {
      // console.log(data)
      if (status === 200) {
        // console.log(data)
      } else {
        console.log('error')
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isFetching, isFocused])

  useEffect(() => {
    if (!data) {
      refetch()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused])

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

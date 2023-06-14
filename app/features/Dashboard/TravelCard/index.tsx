import React, {memo, useEffect} from 'react'
import {ScrollView} from 'react-native'
import {useQuery} from '@tanstack/react-query'
import Animated, {
  FadeInUp,
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

import {useStore} from '@Store'
import {getCardsData, getTransData} from '@Api'

const TravelCardScreen: React.FC = () => {
  const setTransData = useStore(state => state.setTransData)

  const {
    error,
    isError,
    isLoading,
    data: cardData,
  } = useQuery({
    queryKey: ['card'],
    queryFn: getCardsData,
  })

  const {data: transData} = useQuery({
    queryKey: ['trans', {currency: 'sar'}],
    queryFn: ({queryKey}) => getTransData(queryKey),
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
          error={error}
          data={cardData}
          isError={isError}
          isLoading={isLoading}
          activeIndex={activeIndex}
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

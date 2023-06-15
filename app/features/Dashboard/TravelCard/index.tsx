import React, {memo, useEffect} from 'react'
import {ScrollView} from 'react-native'
import {useQuery} from '@tanstack/react-query'
import Animated, {FadeInUp, LightSpeedInLeft} from 'react-native-reanimated'

import {
  CurrencyRow,
  Promotions,
  QuickActions,
  QuickLoads,
  UserTravelCard,
} from '@Components'
import {useStore} from '@Store'
import {getCardsData} from '@Api'

const TravelCardScreen: React.FC = () => {
  const setCardData = useStore(state => state.setCardData)

  const {
    error,
    isError,
    isLoading,
    data: cardData,
  } = useQuery({
    queryKey: ['card'],
    queryFn: getCardsData,
  })

  useEffect(() => {
    setCardData(cardData)
  }, [setCardData, cardData])

  return (
    <ScrollView>
      <UserTravelCard
        error={error}
        data={cardData}
        isError={isError}
        isLoading={isLoading}
      />

      <Animated.View entering={LightSpeedInLeft.duration(1000).delay(100)}>
        <CurrencyRow data={cardData} />
      </Animated.View>

      <QuickActions />

      <QuickLoads data={cardData} />

      <Animated.View entering={FadeInUp.duration(1000).delay(150)}>
        <Promotions />
      </Animated.View>
    </ScrollView>
  )
}

export default memo(TravelCardScreen)

import React, {memo, useRef, useState} from 'react'
import {View} from 'react-native'
import Carousel from 'react-native-snap-carousel'
import cn from 'classnames'

import {useStore} from '@Store'
import {flexRowLayout, screenWidth} from '@Utils'
import {TravelCardSvg, TravelCardSvgBlack} from '@Assets'

import {default as AddNewCard} from '../AddNewCard'
import {default as TCDot} from '../../../Intro/Dot'

const data = ['card1', 'card2', 'AddNew']

const UserTravelCard = () => {
  const carouselRef = useRef(null)
  const isRTL = useStore(state => state.isRTL)
  const [currentItem, setCurrentItem] = useState<number>(0)

  const onSnapToItem = (index: number) => setCurrentItem(index)

  const renderItem = ({item, index}: {item: any; index: number}) => {
    if (index === 2) {
      return <AddNewCard key={index} />
    }

    if (index === 1) {
      return <TravelCardSvgBlack key={index} item={item} />
    }

    return <TravelCardSvg ey={index} item={item} />
  }

  return (
    <View className="pt-6">
      <View className="gap-2 flex-1 items-center">
        <Carousel
          data={data}
          itemWidth={255}
          ref={carouselRef}
          autoplay={true}
          renderItem={renderItem}
          sliderWidth={screenWidth}
          onSnapToItem={onSnapToItem}
        />

        <View className={cn(flexRowLayout(isRTL))}>
          {data?.map((item, index) => {
            return (
              <TCDot key={index} isActive={currentItem === index} hasRounded />
            )
          })}
        </View>
      </View>
    </View>
  )
}

export default memo(UserTravelCard)

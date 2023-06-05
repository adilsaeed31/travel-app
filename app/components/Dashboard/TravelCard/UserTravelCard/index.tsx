import React, {memo, useRef, useState} from 'react'
import {View} from 'react-native'
import Carousel from 'react-native-snap-carousel'
import cn from 'classnames'

import {TravelCardSvg} from '@Assets'
import {AddNew, IntroDot} from '@Components'
import {flexRowLayout, screenWidth} from '@Utils'
import {useStore} from '@Store'

const data = ['card1', 'card2', 'AddNew']

const UserTravelCard = () => {
  const carouselRef = useRef(null)
  const isRTL = useStore(state => state.isRTL)
  const [currentItem, setCurrentItem] = useState<number>(0)

  const onSnapToItem = (index: number) => setCurrentItem(index)

  const renderItem = ({item, index}: {item: any; index: number}) => {
    if (index === 2) {
      return <AddNew />
    }

    return <TravelCardSvg key={index} item={item} />
  }

  return (
    <View className="gap-1 pt-6 items-center">
      <Carousel
        data={data}
        itemWidth={255}
        ref={carouselRef}
        renderItem={renderItem}
        sliderWidth={screenWidth}
        onSnapToItem={onSnapToItem}
      />

      <View className={cn(flexRowLayout(isRTL))}>
        {data?.map((item, index) => {
          return <IntroDot isActive={currentItem === index} hasRounded />
        })}
      </View>
    </View>
  )
}

export default memo(UserTravelCard)

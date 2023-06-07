import React, {memo, useRef, useState} from 'react'
import {View, Image} from 'react-native'
import Carousel from 'react-native-snap-carousel'
import cn from 'classnames'

import {useStore} from '@Store'
import {flexRowLayout, screenWidth} from '@Utils'
import {TravelCardSvg, TravelCardSvgBlack, Shadow} from '@Assets'

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
      return (
        <>
          <TravelCardSvgBlack className="z-1" key={index} item={item} />
          <Image className="relative z-0 -mt-7" source={Shadow} />
        </>
      )
    }

    return (
      <>
        <TravelCardSvg className="z-1" key={index} item={item} />
        <Image className="relative z-0 -mt-7" source={Shadow} />
      </>
    )
  }

  return (
    <View className="pt-6 items-center">
      <Carousel
        data={data}
        itemWidth={255}
        ref={carouselRef}
        enableSnap={true}
        renderItem={renderItem}
        sliderWidth={screenWidth}
        onSnapToItem={onSnapToItem}
      />

      <View className={cn('-mt-4', flexRowLayout(isRTL))}>
        {data?.map((item, index) => {
          return (
            <TCDot key={index} isActive={currentItem === index} hasRounded />
          )
        })}
      </View>
    </View>
  )
}

export default memo(UserTravelCard)

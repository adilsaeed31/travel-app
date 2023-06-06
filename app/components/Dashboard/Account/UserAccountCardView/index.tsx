import React, {memo, useRef, useState} from 'react'
import {View} from 'react-native'
import Carousel from 'react-native-snap-carousel'
import cn from 'classnames'

import {useStore} from '@Store'
import {flexRowLayout, screenWidth} from '@Utils'
import {AccountDetails} from '@Assets'

import {default as TCDot} from '../../../Intro/Dot'

const data = ['card1']

const UserAccountCardView = () => {
  const carouselRef = useRef(null)
  const isRTL = useStore(state => state.isRTL)
  const [currentItem, setCurrentItem] = useState<number>(0)

  const onSnapToItem = (index: number) => setCurrentItem(index)

  const renderItem = ({item, index}: {item: any; index: number}) => {
    // if (index === 2) {
    //   return <AddNewCard key={index} />
    // }

    if (index === 1) {
      return <AccountDetails key={index} item={item} />
    }

    return <AccountDetails ey={index} item={item} />
  }

  return (
    <View className="pt-6">
      <View className=" flex-1 items-center">
        <View style={{paddingEnd: 50}}>
          <Carousel
            enableSnap={true}
            loop={true}
            autoplay={true}
            data={data}
            itemWidth={255}
            ref={carouselRef}
            renderItem={renderItem}
            sliderWidth={screenWidth}
            onSnapToItem={onSnapToItem}
          />
        </View>
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

export default memo(UserAccountCardView)

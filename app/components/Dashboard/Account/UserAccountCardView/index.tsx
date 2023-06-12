import React, {memo, useRef, useState} from 'react'
import {Animated, View, ScrollView} from 'react-native'

import {useStore} from '@Store'
import AccountDetails from './AccountView'
import {flexRowLayout, screenWidth, vw} from '@Utils'

import {default as TCDot} from '../../../Intro/Dot'

const data = ['card1', 'card2']

const itemWidth = (screenWidth / 10) * 8.5 // 85 percent of screen width is the item width
const padding = vw(24)
const offset = itemWidth

const Item = ({
  i,
  scrollX,
  children,
  ...rest
}: {
  i: any
  scrollX: any
  children: any
}) => {
  const scale = scrollX.interpolate({
    inputRange: [-offset + i * offset, i * offset, offset + i * offset],
    outputRange: [0, 1, 0],
  })

  return (
    <Animated.View {...rest} style={{width: itemWidth, transform: [{scale}]}}>
      {children}
    </Animated.View>
  )
}

type momentumScrollProps = {
  nativeEvent: {
    contentOffset: {
      x: number
    }
  }
}

const UserAccountCardView = () => {
  const [currentItem, setCurrentItem] = useState<number>(0)

  const scrollX = useRef(new Animated.Value(0)).current

  const onMomentumScrollEnd = ({
    nativeEvent: {
      contentOffset: {x: scrollPos},
    },
  }: momentumScrollProps) => {
    if (scrollPos === 0) {
      setCurrentItem(0)
    } else if (scrollPos > 200 && scrollPos < 500) {
      setCurrentItem(1)
    } else if (scrollPos > 500) {
      setCurrentItem(2)
    }
  }

  return (
    <View className="items-center">
      <ScrollView
        horizontal
        pagingEnabled
        decelerationRate="fast"
        snapToInterval={offset}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingHorizontal: padding,
        }}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumScrollEnd}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {
            useNativeDriver: false,
          },
        )}>
        {data?.map((item, index) => (
          <Item i={index} scrollX={scrollX}>
            <AccountDetails />
          </Item>
        ))}
      </ScrollView>

      <View className="flex-row mt-2">
        {data?.map((item, index) => (
          <TCDot key={index} isActive={currentItem === index} hasRounded />
        ))}
      </View>
    </View>
  )
}

export default memo(UserAccountCardView)

import React, {memo, useRef, useState} from 'react'
import {Animated, View, ScrollView} from 'react-native'
import cn from 'classnames'

import {useStore} from '@Store'
import {AccountDetails} from '@Assets'
import {flexRowLayout, screenWidth} from '@Utils'

import {default as TCDot} from '../../../Intro/Dot'

const data = ['card1', 'card2']

const itemWidth = (screenWidth / 3) * 2
const padding = (screenWidth - itemWidth) / 2
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
    outputRange: [0.65, 1, 0.65],
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
  const isRTL = useStore(state => state.isRTL)
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
    <View className="pt-6 items-center">
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
        <Item i={0} scrollX={scrollX}>
          <AccountDetails />
        </Item>

        <Item i={1} scrollX={scrollX}>
          <AccountDetails />
        </Item>
      </ScrollView>

      <View className={cn('mt-2', flexRowLayout(isRTL))}>
        {data?.map((item, index) => (
          <TCDot key={index} isActive={currentItem === index} hasRounded />
        ))}
      </View>
    </View>
  )
}

export default memo(UserAccountCardView)

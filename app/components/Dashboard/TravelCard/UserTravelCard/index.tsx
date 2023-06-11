import React, {ReactNode, memo, useRef, useState} from 'react'
import {Animated, View, Image, ScrollView} from 'react-native'

import {useStore} from '@Store'
import {screenWidth} from '@Utils'
import {TravelCardSvg, TravelCardSvgBlack, Shadow} from '@Assets'

import {default as AddNewCard} from '../AddNewCard'
import {default as TCDot} from '../../../Intro/Dot'

const data = ['card1', 'card2', 'AddNew']

const itemWidth = (screenWidth / 3) * 2
const padding = (screenWidth - itemWidth) / 2
const offset = itemWidth

const Item = ({
  i,
  scrollX,
  children,
  ...rest
}: {
  i: number
  scrollX: any
  children: ReactNode
}) => {
  const scale = scrollX.interpolate({
    inputRange: [-offset + i * offset, i * offset, offset + i * offset],
    outputRange: [0.85, 1, 0.85],
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

const UserTravelCard = () => {
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
          paddingHorizontal: padding + 16,
        }}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumScrollEnd}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {
            useNativeDriver: false,
          },
        )}>
        <Item key={0} i={0} scrollX={scrollX}>
          <TravelCardSvg className="z-1" />
          <Image className="relative z-0 -mt-7" source={Shadow} />
        </Item>

        <Item key={1} i={1} scrollX={scrollX}>
          <TravelCardSvgBlack className="z-1" />
          <Image className="relative z-0 -mt-7" source={Shadow} />
        </Item>

        <Item key={2} i={2} scrollX={scrollX}>
          <AddNewCard />
        </Item>
      </ScrollView>

      <View className="flex-row -mt-4">
        {data?.map((item, index) => (
          <TCDot key={index} isActive={currentItem === index} hasRounded />
        ))}
      </View>
    </View>
  )
}

export default memo(UserTravelCard)

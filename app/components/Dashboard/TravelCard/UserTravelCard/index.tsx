import React, {ReactNode, memo, useRef, useState} from 'react'
import AnimatedRE, {FadeInRight} from 'react-native-reanimated'
import {
  Animated,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native'
import cn from 'classnames'

import {useStore} from '@Store'
import {flexRowLayout, screenWidth, Colors} from '@Utils'
import {TravelCardSvg, TravelCardSvgBlack, Shadow} from '@Assets'

import {default as TCTextView} from '../../../TextView'
import {default as AddNewCard} from '../AddNewCard'
import {default as TCDot} from '../../../Intro/Dot'

const itemWidthPixel = 255
const itemWidth = (screenWidth / 3) * 2
const padding = (screenWidth - itemWidth) / 2
const offset = itemWidth

const ItemLoading = memo(
  ({
    i,
    scrollX,
    children,
    ...rest
  }: {
    i: number
    scrollX?: any
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
  },
)

const Item = memo(
  ({
    i,
    scrollX,
    children,
    ...rest
  }: {
    i: number
    scrollX?: any
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
  },
)

type momentumScrollProps = {
  nativeEvent: {
    contentOffset: {
      x: number
    }
    layoutMeasurement: {
      width: number
    }
  }
}

const UserTravelCard: React.FC<{
  data: any
  isLoading: boolean
  isError: boolean
  error: any
}> = ({data, isLoading}) => {
  const isRTL = useStore(state => state.isRTL)
  const setActiveCardIndex = useStore(state => state.setActiveCardIndex)

  const [currentItem, setCurrentItem] = useState<number>(0)

  const scrollX = useRef(new Animated.Value(0)).current
  const scrollX2 = useRef(new Animated.Value(0)).current

  const onMomentumScrollEnd = ({
    nativeEvent: {
      contentOffset: {x: scrollPos},
    },
  }: momentumScrollProps) => {
    const itemCurrent = Math.round(scrollPos / itemWidth)
    setCurrentItem(itemCurrent)
    setActiveCardIndex(itemCurrent)
  }

  if (!data) {
    return (
      <AnimatedRE.View
        className="items-center"
        entering={FadeInRight.duration(1000).delay(50)}>
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
          <ItemLoading key={0} i={0} scrollX={scrollX}>
            <View className="items-center justify-center">
              <TravelCardSvg className="z-1" />
              <Image className="relative z-0 -mt-7" source={Shadow} />
              {isLoading ? (
                <ActivityIndicator
                  size="large"
                  color={Colors.Armadillo}
                  className="z-0 absolute top-2"
                />
              ) : null}
            </View>
          </ItemLoading>

          <ItemLoading key={1} i={1} scrollX={scrollX}>
            <View className="items-center justify-center">
              <TravelCardSvgBlack className="z-1" />
              <Image className="relative z-0 -mt-7" source={Shadow} />
              {isLoading ? (
                <ActivityIndicator
                  size="large"
                  color={Colors.Supernova}
                  className="z-0 absolute top-2"
                />
              ) : null}
            </View>
          </ItemLoading>

          <ItemLoading key={2} i={2} scrollX={scrollX}>
            <View className="items-center justify-center">
              <TravelCardSvg className="z-1" />
              <Image className="relative z-0 -mt-7" source={Shadow} />
              {isLoading ? (
                <ActivityIndicator
                  size="large"
                  color={Colors.Supernova}
                  className="z-0 absolute top-2"
                />
              ) : null}
            </View>
          </ItemLoading>

          <ItemLoading key={3} i={3} scrollX={scrollX}>
            <AddNewCard />
          </ItemLoading>
        </ScrollView>

        <View className={cn(flexRowLayout(isRTL), '-mt-4')}>
          {[0, 1, 2, 3]?.map((_item, index) => (
            <TCDot key={index} isActive={currentItem === index} hasRounded />
          ))}
        </View>
      </AnimatedRE.View>
    )
  }

  return (
    <AnimatedRE.View
      className="items-center"
      entering={FadeInRight.duration(1000).delay(1000)}>
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
          [{nativeEvent: {contentOffset: {x: scrollX2}}}],
          {
            useNativeDriver: false,
          },
        )}>
        {data?.map((item: any, index: number) => {
          return data.length - 1 === index ? (
            <Item key={index} i={index} scrollX={scrollX2}>
              <AddNewCard />
            </Item>
          ) : (
            <Item key={index} i={index} scrollX={scrollX2}>
              {index % 2 === 0 ? (
                <TravelCardSvg className="z-0" />
              ) : (
                <TravelCardSvgBlack className="z-0" />
              )}
              <Image className="relative z-0 -mt-7" source={Shadow} />
              <TCTextView
                className={cn(
                  'absolute top-10 left-4 z-1 font-semibold text-tc-secondary',
                  {
                    'text-white': index % 2 !== 0,
                  },
                )}>
                {item?.card?.name}
              </TCTextView>
              <TCTextView
                className={cn(
                  'absolute top-16 left-4 z-1 font-semibold text-tc-secondary',
                  {
                    'text-white': index % 2 !== 0,
                  },
                )}>
                {item?.card?.last_four_digits}
              </TCTextView>
              <TCTextView
                className={cn(
                  'absolute top-20 left-4 mt-1 z-1 font-semibold text-tc-secondary',
                  {
                    'text-white': index % 2 !== 0,
                  },
                )}>
                {item?.card?.expiry_date}
              </TCTextView>
            </Item>
          )
        })}
      </ScrollView>

      <View className={cn(flexRowLayout(isRTL), '-mt-4')}>
        {data?.map((_item: any, index: number) => (
          <TCDot key={index} isActive={currentItem === index} hasRounded />
        ))}
      </View>
    </AnimatedRE.View>
  )
}

export default memo(UserTravelCard)

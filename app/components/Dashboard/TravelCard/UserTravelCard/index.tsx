import React, {ReactNode, memo, useRef, useState} from 'react'
import {
  Animated,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native'
import cn from 'classnames'

import {useStore} from '@Store'
import {TCTextView} from '@Components'
import {flexRowLayout, screenWidth, Colors} from '@Utils'
import {TravelCardSvg, TravelCardSvgBlack, Shadow} from '@Assets'

import {default as AddNewCard} from '../AddNewCard'
import {default as TCDot} from '../../../Intro/Dot'

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
    i?: number
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
    i?: number
    scrollX?: any
    children: ReactNode
  }) => {
    const scale = scrollX.interpolate({
      inputRange: [-offset + i * offset, i * offset, offset + i * offset],
      outputRange: [0.85, 1, 0.85],
    })

    return (
      <Animated.View {...rest} style={{width: itemWidth}}>
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

const UserTravelCard: React.FC<{data: string[]; isLoading: boolean}> = ({
  data,
  isLoading,
}) => {
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

  const onMomentumScrollEnd2 = ({
    nativeEvent: {
      contentOffset: {x: scrollPos},
      layoutMeasurement: {width: layoutWidth},
    },
  }: momentumScrollProps) => {
    const active = Math.floor(scrollPos / layoutWidth)

    console.log(scrollPos, layoutWidth, active)

    setCurrentItem(active)
  }

  if (data?.length === 0) {
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
          <ItemLoading key={0} i={0} scrollX={scrollX}>
            <TravelCardSvg className="z-1" />
            <Image className="relative z-0 -mt-7" source={Shadow} />
          </ItemLoading>

          <ItemLoading key={1} i={1} scrollX={scrollX}>
            <TravelCardSvgBlack className="z-1" />
            <Image className="relative z-0 -mt-7" source={Shadow} />
          </ItemLoading>

          <ItemLoading key={2} i={2} scrollX={scrollX}>
            <AddNewCard />
          </ItemLoading>
        </ScrollView>

        <View className={cn(flexRowLayout(isRTL), '-mt-4')}>
          {[0, 1, 2]?.map((_item, index) => (
            <TCDot key={index} isActive={currentItem === index} hasRounded />
          ))}
        </View>
        {isLoading ? (
          <ActivityIndicator
            size="large"
            className="absolute top-14 mt-1 z-0"
            color={Colors.Supernova}
          />
        ) : null}
      </View>
    )
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
        onMomentumScrollEnd={onMomentumScrollEnd2}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {
            useNativeDriver: false,
          },
        )}>
        {data?.map((item: any, index: number) =>
          index % 2 === 0 ? (
            <Item key={index} i={index} scrollX={scrollX}>
              <TravelCardSvg className="z-0" />
              <Image className="relative z-0 -mt-7" source={Shadow} />
              <TCTextView className="absolute top-10 left-4 z-1 text-tc-secondary font-tc-bold">
                {item?.card?.name}
              </TCTextView>
              <TCTextView className="absolute top-16 left-4 z-1 text-tc-secondary font-tc-bold">
                {item?.card?.last_four_digits}
              </TCTextView>
              <TCTextView className="absolute top-20 left-4 mt-1 z-1 text-tc-secondary font-tc-bold">
                {item?.card?.expiry_date}
              </TCTextView>
            </Item>
          ) : (
            <Item key={index} i={index} scrollX={scrollX}>
              <TravelCardSvgBlack className="z-1" />
              <Image className="relative z-0 -mt-7" source={Shadow} />
              <TCTextView className="absolute top-10 left-4 z-1 text-white font-tc-bold">
                {item?.card?.name}
              </TCTextView>
              <TCTextView className="absolute top-16 left-4 z-1 text-white font-tc-bold">
                {item?.card?.last_four_digits}
              </TCTextView>
              <TCTextView className="absolute top-20 left-4 mt-1  z-1 text-white font-tc-bold">
                {item?.card?.expiry_date}
              </TCTextView>
            </Item>
          ),
        )}

        <Item key={data?.length + 1} i={data?.length + 1} scrollX={scrollX}>
          <AddNewCard />
        </Item>
      </ScrollView>

      <View className={cn(flexRowLayout(isRTL), '-mt-4')}>
        {data?.map((item, index) => (
          <TCDot key={index} isActive={currentItem === index} hasRounded />
        ))}
      </View>
    </View>
  )
}

export default memo(UserTravelCard)

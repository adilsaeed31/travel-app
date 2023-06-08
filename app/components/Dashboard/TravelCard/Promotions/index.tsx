import React, {useRef} from 'react'
import {useTranslation} from 'react-i18next'
import {Animated, Image, ScrollView, View} from 'react-native'
import cn from 'classnames'

import {useStore} from '@Store'
import {Promotion1} from '@Assets'
import {flexRowLayout, screenWidth} from '@Utils'

import {default as TCTextView} from '../../../TextView'

const itemWidth = (screenWidth / 3) * 2
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

const Promotions = () => {
  const {t} = useTranslation()
  const isRTL = useStore(state => state.isRTL)
  const scrollX = useRef(new Animated.Value(0)).current

  return (
    <View className="ml-6 mt-10">
      <TCTextView className="mb-4">{t('TravelCard:doMore')}</TCTextView>

      <ScrollView
        horizontal
        pagingEnabled
        decelerationRate="fast"
        snapToInterval={offset}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {
            useNativeDriver: false,
          },
        )}>
        <View className={cn(flexRowLayout(isRTL), 'mt-5')}>
          <Item i={0} scrollX={scrollX}>
            <Image className="w-80 h-20 mr-2" source={Promotion1} />
          </Item>

          <Item i={1} scrollX={scrollX}>
            <Image className="w-80 h-20 mr-2" source={Promotion1} />
          </Item>

          <Item i={2} scrollX={scrollX}>
            <Image className="w-80 h-20 mr-2" source={Promotion1} />
          </Item>
        </View>
      </ScrollView>
    </View>
  )
}

export default Promotions

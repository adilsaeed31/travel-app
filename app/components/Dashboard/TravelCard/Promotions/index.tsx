import React, {useRef, memo} from 'react'
import {useTranslation} from 'react-i18next'
import {Animated, Image, ScrollView, View} from 'react-native'
import cn from 'classnames'

import {useStore} from '@Store'
import {Promotion1} from '@Assets'
import {TCTextView} from '@Components'
import {ml, screenWidth} from '@Utils'

const itemWidth = (screenWidth / 3) * 2
const offset = itemWidth

const Item = memo(
  ({i, scrollX, children, ...rest}: {i: any; scrollX: any; children: any}) => {
    const scale = scrollX.interpolate({
      inputRange: [-offset + i * offset, i * offset, offset + i * offset],
      outputRange: [0.55, 1, 0.55],
    })

    return (
      <Animated.View
        key={i}
        {...rest}
        style={{width: itemWidth, transform: [{scale}]}}>
        {children}
      </Animated.View>
    )
  },
)

const imageData = [0, 1, 2]

const Promotions = () => {
  const {t} = useTranslation()
  const isRTL = useStore(state => state.isRTL)
  const scrollX = useRef(new Animated.Value(0)).current
  const direction = isRTL ? 'rtl' : 'ltr'

  return (
    <View style={{direction: direction}} className={cn('my-4', ml(isRTL, 4))}>
      <TCTextView className="text-left mb-3">
        {t('TravelCard:doMore')}
      </TCTextView>

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
        {imageData.map((item, index) => (
          <Item key={index.toString()} i={item} scrollX={scrollX}>
            <Image className="w-80 h-20" source={Promotion1} />
          </Item>
        ))}
      </ScrollView>
    </View>
  )
}

export default memo(Promotions)

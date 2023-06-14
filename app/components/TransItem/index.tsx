import React, {memo} from 'react'
import {View, Text} from 'react-native'
import styled from 'styled-components/native'
import cn from 'classnames'
import Animated, {SlideInRight} from 'react-native-reanimated'

import {useStore} from '@Store'

const Circle = styled.View`
  width: 40px;
  height: 40px;
  align-items: center;
  border-radius: ${20}px;
  justify-content: center;
  background-color: #f5f5f5;
`

const CREDIT = 'credit'
const DEBIT = 'debit'

const TransItem: React.FC<{
  icon: any
  type: string
  title: string
  subtitle: string
  number: string
  index: number
}> = ({icon, title, subtitle, number, type, index}) => {
  const isRTL = useStore(state => state.isRTL)
  const direction = isRTL ? 'rtl' : 'ltr'

  return (
    <Animated.View
      entering={SlideInRight.duration(300).delay(index * 50)}
      style={{direction: direction}}
      className="my-2 mx-4 flex-row items-center justify-center">
      <Circle>
        <Text>{icon}</Text>
      </Circle>

      <View className="flex-1 justify-center ml-4">
        <Text>{title}</Text>
        <Text>{subtitle}</Text>
      </View>

      <Text
        className={cn('font-tc-regular text-sm', {
          'text-red-500': type === CREDIT,
          'text-green-500': type === DEBIT,
        })}>
        {number}
      </Text>
    </Animated.View>
  )
}

export default memo(TransItem)

import React, {memo} from 'react'
import {View} from 'react-native'
import Animated, {FadeInDown} from 'react-native-reanimated'

import {TCTextView} from '@Components'

const EnterAnimationDown = FadeInDown.duration(1000).delay(50)

const IntroText: React.FC<{
  one: string
  two: string
  isFirstBold?: boolean
}> = ({one, two, isFirstBold = false}) => {
  return (
    <View className="flex-1 justify-end items-center pb-32">
      <Animated.View entering={EnterAnimationDown}>
        {isFirstBold ? (
          <>
            <TCTextView className="text-3xl text-tc-black font-tc-bold text-center">
              {one}
            </TCTextView>

            <TCTextView className="text-3xl text-tc-black text-center">
              {two}
            </TCTextView>
          </>
        ) : (
          <>
            <TCTextView className="text-3xl text-tc-black text-center">
              {one}
            </TCTextView>

            <TCTextView className="text-3xl text-tc-black font-tc-bold text-center">
              {two}
            </TCTextView>
          </>
        )}
      </Animated.View>
    </View>
  )
}

export default memo(IntroText)

import React, {memo} from 'react'
import {View} from 'react-native'
import Animated, {FadeInDown} from 'react-native-reanimated'

import {TCTextView} from '@Components'

const EnterAnimationDown = FadeInDown.duration(1000).delay(50)

const IntroText: React.FC<{one: string; two: string}> = ({one, two}) => {
  return (
    <View className="flex-1 justify-center items-center pt-32">
      <Animated.View entering={EnterAnimationDown}>
        <TCTextView className="text-3xl text-tc-black text-center">
          {one}
        </TCTextView>

        <TCTextView className="text-3xl text-tc-black font-tc-bold text-center">
          {two}
        </TCTextView>
      </Animated.View>
    </View>
  )
}

export default memo(IntroText)

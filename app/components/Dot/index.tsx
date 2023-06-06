import React, {memo} from 'react'
import {View} from 'react-native'
import Animated, {FadeIn} from 'react-native-reanimated'

const EnterDotAnimation = FadeIn.duration(500)

const Dot: React.FC<{isActive?: boolean}> = ({isActive}) => {
  if (isActive) {
    return (
      <Animated.View entering={EnterDotAnimation}>
        <View className="w-2 h-2 mr-2 rounded-full bg-tc-dot-active" />
      </Animated.View>
    )
  }

  return <View className="w-2 h-2 mr-2 rounded-full bg-tc-dot" />
}

export default memo(Dot)

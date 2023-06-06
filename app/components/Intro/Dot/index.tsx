import React, {memo} from 'react'
import {View} from 'react-native'
import Animated, {FadeIn} from 'react-native-reanimated'

const EnterDotAnimation = FadeIn.duration(500)

const TCDot: React.FC<{isActive?: boolean; hasRounded?: boolean}> = ({
  isActive,
  hasRounded = false,
}) => {
  if (isActive) {
    if (hasRounded) {
      return (
        <Animated.View entering={EnterDotAnimation}>
          <View
            testID="intro-dot"
            className="m-1 w-2 h-2 rounded-full bg-tc-secondary"
          />
        </Animated.View>
      )
    } else {
      return (
        <Animated.View entering={EnterDotAnimation}>
          <View
            testID="intro-dot"
            className="m-1 w-6 h-2 rounded-br-md rounded-tl-md bg-tc-secondary"
          />
        </Animated.View>
      )
    }
  }

  if (hasRounded) {
    return (
      <View className="m-1 w-2 h-2 rounded-full bg-tc-secondary opacity-40 scale-75" />
    )
  } else {
    return (
      <View className="m-1 w-2 h-2 rounded-full bg-tc-secondary opacity-40" />
    )
  }
}

export default memo(TCDot)

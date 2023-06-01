import React, {memo} from 'react'
import {View} from 'react-native'

const TCDot: React.FC<{isActive?: boolean}> = ({isActive}) => {
  if (isActive) {
    return (
      <View
        testID="intro-dot"
        className="m-1 w-6 h-2 rounded-br-md rounded-tl-md bg-tc-secondary"
      />
    )
  }

  return (
    <View className="m-1 w-2 h-2 rounded-full bg-tc-secondary opacity-40" />
  )
}

export default memo(TCDot)

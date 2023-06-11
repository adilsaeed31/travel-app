import React, {memo} from 'react'
import {StyleSheet, TouchableOpacity, View} from 'react-native'

import {Colors} from '@Utils'
import {TCTextView} from '@Components'

const QuickAction: React.FC<{
  icon: React.ReactNode
  name: string
  onPress?: () => void
}> = ({icon, name, onPress}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      className="w-20 py-3 rounded-2xl justify-between items-center"
      onPress={onPress}>
      <View>{icon}</View>
      <TCTextView className="mt-3 text-xs text-tc-quick-text">
        {name}
      </TCTextView>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.5,
    borderColor: Colors.TabBorder,
  },
})

export default memo(QuickAction)

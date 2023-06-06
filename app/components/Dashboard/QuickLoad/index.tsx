import React, {memo} from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native'

import {Colors} from '@Utils'
import {TCTextView} from '@Components'

const QuickLoad: React.FC<{
  name: string
  onPress?: () => void
}> = ({name, onPress}) => {
  return (
    <TouchableOpacity
      // style={[styles.container, {transform: [{scale: 0.8}]}]}
      style={styles.container}
      className="w-24 py-3 rounded-2xl justify-between items-center"
      onPress={onPress}>
      <TCTextView className="text-tc-ios-base text-tc-quick-text">
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

export default memo(QuickLoad)

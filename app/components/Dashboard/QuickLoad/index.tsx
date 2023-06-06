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
      className="px-4 py-3 mr-2 rounded-2xl"
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

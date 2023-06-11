import React, {memo} from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native'

import {Colors, vh} from '@Utils'
import {TCTextView} from '@Components'

const QuickLoad: React.FC<{
  name: string
  onPress?: () => void
}> = ({name, onPress}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      className="px-4 mr-2 rounded-2xl"
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
    paddingVertical: vh(10),
  },
})

export default memo(QuickLoad)

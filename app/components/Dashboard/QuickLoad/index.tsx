import React, {memo} from 'react'
import {StyleSheet} from 'react-native'
import Ripple from 'react-native-material-ripple'

import {Colors, vh} from '@Utils'
import {TCTextView} from '@Components'

const QuickLoad: React.FC<{
  name: string
  onPress?: () => void
}> = ({name, onPress}) => {
  return (
    <Ripple
      onPress={onPress}
      style={styles.container}
      rippleColor={Colors.Supernova}
      rippleContainerBorderRadius={16}
      className="px-4 mr-2 rounded-2xl">
      <TCTextView className="text-tc-ios-base text-tc-quick-text">
        {name}
      </TCTextView>
    </Ripple>
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

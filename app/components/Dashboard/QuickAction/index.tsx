import React, {memo} from 'react'
import {StyleSheet} from 'react-native'
import Ripple from 'react-native-material-ripple'

import {Colors} from '@Utils'
import {TCTextView} from '@Components'

const QuickAction: React.FC<{
  icon: React.ReactNode
  name: string
  onPress?: () => void
}> = ({icon, name, onPress}) => {
  return (
    <Ripple
      onPress={onPress}
      style={styles.container}
      rippleColor={Colors.Supernova}
      rippleContainerBorderRadius={16}
      className="w-20 py-3 rounded-2xl justify-between items-center">
      {icon}
      <TCTextView className="mt-3 text-xs text-tc-quick-text">
        {name}
      </TCTextView>
    </Ripple>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.5,
    borderColor: Colors.TabBorder,
  },
})

export default memo(QuickAction)

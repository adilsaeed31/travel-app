import React from 'react'
import {View} from 'react-native'

import {useStore} from '@Store'
import {TCTextView, TCButton} from '@Components'

const HelpScreen: React.FC = () => {
  const reset = useStore(state => state?.reset)
  const setUser = useStore(state => state?.setUser)

  return (
    <View className="flex-1 justify-center p-4">
      <TCTextView className="self-center mb-6 font-tc-bold">
        More Menu
      </TCTextView>

      <TCButton
        onPress={() => {
          reset()
          setUser(null)
        }}>
        <TCTextView>Logout</TCTextView>
      </TCButton>
    </View>
  )
}

export default HelpScreen

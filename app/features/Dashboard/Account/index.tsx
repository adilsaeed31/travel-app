import React from 'react'
import {ScrollView} from 'react-native'

import {TCTextView} from '@Components'

const AccountScreen = () => {
  return (
    <ScrollView className="bg-tc-primary">
      <TCTextView className="text-base">Account Screen</TCTextView>
    </ScrollView>
  )
}

export default AccountScreen

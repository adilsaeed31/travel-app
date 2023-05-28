import React, {useContext} from 'react'

// import {Layout, Text, Button} from '@ui-kitten/components'

import {AuthContext, AuthProviderProps} from '@Context'
import {useStore} from '@Store'
import {View} from 'react-native'
import {Bg} from '@Assets'
import {Layout, TCButton, TCTextView} from '@Components'

export default function DashboardFeature({navigation}: any) {
  const setUser = useStore((state: any) => state.setUser)

  return (
    <Layout className="flex-1 justify-center">
      <View className="flex-1 justify-end items-center">
        <TCTextView>Dashboard Under Development</TCTextView>
      </View>
      <View className="flex-1 justify-end mb-20">
        <TCButton onPress={() => setUser(null)}>Back to Login</TCButton>
      </View>
    </Layout>
  )
}

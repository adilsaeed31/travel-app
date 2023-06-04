import React, {useContext} from 'react'
import {View} from 'react-native'

import {useStore} from '@Store'
import {AuthContext, AuthProviderProps} from '@Context'
import {Layout, TCButton, TCTextView} from '@Components'

export default function DashboardFeature() {
  const setUser = useStore((state: any) => state.setUser)
  const reset = useStore((state: any) => state.reset)
  const {logout} = useContext<AuthProviderProps>(AuthContext)

  const onLogout = () => {
    logout?.()
    setUser(null)
    reset()
  }

  return (
    <Layout className="flex-1 justify-center">
      <View className="flex-1 justify-end items-center">
        <TCTextView>Dashboard Under Development</TCTextView>
      </View>
      <View className="flex-1 justify-end mb-20">
        <TCButton onPress={onLogout}>Back to Login</TCButton>
      </View>
    </Layout>
  )
}

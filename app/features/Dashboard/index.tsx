import React, {useContext} from 'react'
import {View} from 'react-native'

import {useStore} from '@Store'
import {AuthContext, AuthProviderProps} from '@Context'
import {Layout as AppLayout, TCButton, TabBar} from '@Components'

import TravelCard from './TravelCard'
import Account from './Account'

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
    <AppLayout isDashboardLayout>
      <TabBar left={<TravelCard />} right={<Account />} />

      <View>
        <TCButton onPress={onLogout} children={'Logout'} />
      </View>
    </AppLayout>
  )
}

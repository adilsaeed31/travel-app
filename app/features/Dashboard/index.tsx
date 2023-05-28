import React, {useContext} from 'react'

import {Layout, Text, Button} from '@ui-kitten/components'

import {AuthContext, AuthProviderProps} from '@Context'
import {useStore} from '@Store'
import {View} from 'react-native'
import {Bg} from '@Assets'
import {TCTextView} from '@Components'

const containerStyle = {
  flex: 1,
  paddingHorizontal: 20,
  paddingTop: 70,
  justifyContent: 'center',
  alginItems: 'center',
}

const buttonStyle = {
  marginTop: 20,
  fontFamily: 'Co Text',
}

export default function DashboardFeature({navigation}: any) {
  const setUser = useStore((state: any) => state.setUser)

  return (
    <Layout style={containerStyle}>
      <Bg className="absolute" />
      <TCTextView style={{alignSelf:'center'}}>Dashboard Under Development </TCTextView>
      <Button style={buttonStyle} onPress={() => setUser(null)}>
        Back to Login
      </Button>
    </Layout>
  )
}

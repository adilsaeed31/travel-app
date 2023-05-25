import React, {useContext} from 'react'

import {Layout, Text, Button} from '@ui-kitten/components'

import {AuthContext, AuthProviderProps} from '@Context'
import {useStore} from '@Store'

const containerStyle = {
  flex: 1,
  paddingHorizontal: 20,
  paddingTop: 70,
  justifyContent: 'center',
}

const buttonStyle = {
  marginTop: 20,
  fontFamily: 'Co Text',
}

export default function DashboardFeature({navigation}: any) {
  const setUser = useStore((state: any) => state.setUser)

  return (
    <Layout style={containerStyle}>
      <Text style={{fontFamily: 'Co Text'}}>Welcome To Travel APP</Text>

      <Button style={buttonStyle} onPress={() => setUser(null)}>
        Back to Login
      </Button>
    </Layout>
  )
}

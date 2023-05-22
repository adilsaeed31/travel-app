import React, {useContext} from 'react'

import {Layout, Text, Button} from '@ui-kitten/components'

import {AuthContext, AuthProviderProps} from '@Context'

const containerStyle = {
  flex: 1,
  paddingHorizontal: 20,
  paddingTop: 70,
}

const buttonStyle = {
  marginTop: 20,
  fontFamily: 'Co Text',
}

export default function DashboardFeature({navigation}: any) {
  const {user} = useContext<AuthProviderProps>(AuthContext)

  return (
    <Layout style={containerStyle}>
      <Text style={{fontFamily: 'Co Text'}}>Dashboard Screen</Text>
      <Text style={{fontFamily: 'Co Text'}}>
        User Information Data: {JSON.stringify(user)}{' '}
      </Text>

      <Button
        style={buttonStyle}
        onPress={() =>
          navigation.navigate('Travel', {
            screen: 'Home',
          })
        }>
        Go to Profile
      </Button>
    </Layout>
  )
}

import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import {AuthFeature} from '@Features'

const {Navigator, Screen} = createStackNavigator()

export default function AuthNavigator() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name="Auth" component={AuthFeature} />
    </Navigator>
  )
}

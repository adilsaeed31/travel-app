import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import {AuthFeature, SplashFeature} from '@Features'

const {Navigator, Screen} = createStackNavigator()

export default function AuthNavigator() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name="Home" component={SplashFeature} />
      <Screen name="Auth" component={AuthFeature} />
    </Navigator>
  )
}

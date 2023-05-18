import React from 'react'
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack'

import {AuthFeature, AuthFeature2, PersonalID} from '@Features'

const {Navigator, Screen} = createStackNavigator()

export default function AuthNavigator() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Screen name="PersonalID" component={PersonalID} />
      <Screen name="Auth" component={AuthFeature} />
      <Screen name="Auth2" component={AuthFeature2} />
    </Navigator>
  )
}

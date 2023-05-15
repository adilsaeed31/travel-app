import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import {IntroFeature} from '@Features'

const {Navigator, Screen} = createStackNavigator()

export default function AuthNavigator() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name="Intro" component={IntroFeature} />
    </Navigator>
  )
}

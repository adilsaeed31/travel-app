import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import {IntroFeature} from '@Features'
import {SplashScreen} from '@Screens'

const {Navigator, Screen} = createNativeStackNavigator()

const SplashNavigator = () => {
  return (
    <Navigator
      initialRouteName="Splash"
      screenOptions={{
        animation: 'none',
        headerShown: false,
      }}>
      <Screen name="Splash" component={SplashScreen} />
      <Screen name="Intro" component={IntroFeature} />
    </Navigator>
  )
}

export default SplashNavigator

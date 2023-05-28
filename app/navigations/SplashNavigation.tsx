import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import {IntroFeature} from '@Features'
import {SplashScreen} from '@Screens'

const {Navigator, Screen} = createStackNavigator()

const SplashNavigator = () => {
  return (
    <Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}>
      <Screen name="Splash" component={SplashScreen} />
      <Screen name="Intro" component={IntroFeature} />
    </Navigator>
  )
}

export default SplashNavigator

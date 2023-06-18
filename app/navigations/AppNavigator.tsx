import React from 'react'

import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'

import {HelpScreen} from '@Screens'
import {LoyaltyNavigator, HomeNavigator} from '@Navigations'
import {BottomTabBar} from '@Components'

const {Navigator, Screen} = createBottomTabNavigator()

// below to wrap as function component for tabBar prop
const tabBar = (props: BottomTabBarProps) => <BottomTabBar {...props} />

const AppNavigator = () => (
  <Navigator tabBar={tabBar}>
    <Screen
      name="Home"
      options={{
        headerShown: false,
      }}
      component={HomeNavigator}
    />

    <Screen name="Loyalty" component={LoyaltyNavigator} />

    <Screen name="Menu" component={HelpScreen} />
  </Navigator>
)

export default AppNavigator

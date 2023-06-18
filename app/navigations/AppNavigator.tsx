import React from 'react'
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'

import {HelpScreen} from '@Screens'
import {BottomTabBar} from '@Components'
import {LoyaltyNavigator, HomeNavigator} from '@Navigations'

const Tab = createBottomTabNavigator()

// below to wrap as function component for tabBar prop
const tabBar = (props: BottomTabBarProps) => <BottomTabBar {...props} />

const AppNavigator = () => (
  <Tab.Navigator initialRouteName="Home" tabBar={tabBar}>
    <Tab.Screen
      name="Home"
      options={{
        headerShown: false,
      }}
      component={HomeNavigator}
    />

    <Tab.Screen name="Loyalty" component={LoyaltyNavigator} />

    <Tab.Screen name="Menu" component={HelpScreen} />
  </Tab.Navigator>
)

export default AppNavigator

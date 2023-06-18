import React from 'react'
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'

import {HelpScreen} from '@Screens'
import {BottomTabBar} from '@Components'
import {DashboardFeature} from '@Features'

import LoyaltyNavigator from './LoyaltyNavigator'

const Tab = createBottomTabNavigator()

// below to wrap as function component for tabBar prop
const tabBar = (props: BottomTabBarProps) => <BottomTabBar {...props} />

const HomeNavigator = () => (
  <Tab.Navigator
    screenOptions={{headerShown: false}}
    tabBar={tabBar}
    initialRouteName="Home">
    <Tab.Screen name="Home" component={DashboardFeature} />
    <Tab.Screen name="Loyalty" component={LoyaltyNavigator} />
    <Tab.Screen name="Menu" component={HelpScreen} />
  </Tab.Navigator>
)

export default HomeNavigator

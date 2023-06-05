import React from 'react'
import {View} from 'react-native'

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import {HelpScreen} from '@Screens'
import {DashboardFeature} from '@Features'
import {LoyaltyNavigator} from '@Navigations'

const {Navigator, Screen} = createBottomTabNavigator()

const BottomTabBar = (props: any) => (
  <View {...props} className="w-100 h-16 m-4 rounded-2xl bg-tc-primary" />
)

const AppNavigator = () => (
  <Navigator tabBar={BottomTabBar}>
    <Screen
      name="Dashboard"
      options={{
        headerShown: false,
      }}
      component={DashboardFeature}
    />

    <Screen name="Loyalty" component={LoyaltyNavigator} />

    <Screen name="Menu" component={HelpScreen} />
  </Navigator>
)

export default AppNavigator

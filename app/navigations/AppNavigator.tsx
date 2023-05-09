import React from 'react'

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import {HelpScreen} from '@Screens'
import {DashboardFeature} from '@Features'
import {CardNavigator, TravelNavigator} from '@Navigations'

const Tab = createBottomTabNavigator()

const AppNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Dashboard"
      component={DashboardFeature}
      options={{
        headerShown: false,
      }}
    />

    <Tab.Screen name="Travel" component={TravelNavigator} />

    <Tab.Screen name="Card" component={CardNavigator} />

    <Tab.Screen name="Help" component={HelpScreen} />
  </Tab.Navigator>
)

export default AppNavigator

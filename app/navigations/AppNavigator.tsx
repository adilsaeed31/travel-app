import React from 'react'

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import {HelpScreen} from '@Screens'
import {DashboardFeature} from '@Features'
import {CardNavigator, TravelNavigator} from '@Navigations'

const {Navigator, Screen} = createBottomTabNavigator()

const AppNavigator = () => (
  <Navigator>
    <Screen
      name="Dashboard"
      component={DashboardFeature}
      options={{
        headerShown: false,
      }}
    />

    <Screen name="Travel" component={TravelNavigator} />

    <Screen name="Card" component={CardNavigator} />

    <Screen name="Help" component={HelpScreen} />
  </Navigator>
)

export default AppNavigator

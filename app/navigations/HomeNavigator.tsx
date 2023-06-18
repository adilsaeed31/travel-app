import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import {DashboardFeature, LoadFundsScreen} from '@Features'

const {Navigator, Screen} = createNativeStackNavigator()

const HomeNavigator = () => (
  <Navigator
    initialRouteName="Dashboard"
    screenOptions={{
      headerShown: false,
      animation: 'slide_from_right',
    }}>
    <Screen name="Dashboard" component={DashboardFeature} />
    <Screen name="LoadFunds" component={LoadFundsScreen} />
  </Navigator>
)

export default HomeNavigator

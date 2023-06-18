import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import {DashboardFeature, LoadFundsScreen} from '@Features'

const {Navigator, Screen} = createStackNavigator()

const HomeNavigator = () => (
  <Navigator initialRouteName="Dashboard" screenOptions={{headerShown: false}}>
    <Screen name="Dashboard" component={DashboardFeature} />
    <Screen name="LoadFunds" component={LoadFundsScreen} />
  </Navigator>
)

export default HomeNavigator

import React from 'react'

import {createNativeStackNavigator} from '@react-navigation/native-stack'

import {LoadFundsScreen} from '@Features'
import HomeNavigator from './HomeNavigator'

const {Navigator, Screen} = createNativeStackNavigator()

const AppNavigator = () => (
  <Navigator initialRouteName="Root">
    <Screen
      name="Root"
      options={{
        headerShown: false,
      }}
      component={HomeNavigator}
    />
    <Screen name="LoadFunds" component={LoadFundsScreen} />
  </Navigator>
)

export default AppNavigator

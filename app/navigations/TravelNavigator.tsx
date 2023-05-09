import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import {Text} from 'react-native'

const Stack = createStackNavigator()

const TravelScreen = () => (
  <>
    <Text>Travel Card Screen</Text>
  </>
)

const HomeNavigator = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Travel" component={TravelScreen} />
  </Stack.Navigator>
)

export default HomeNavigator

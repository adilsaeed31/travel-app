import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import {Text} from 'react-native'

const Stack = createNativeStackNavigator()

const TravelScreen = () => (
  <>
    <Text>Travel App Screen</Text>
  </>
)

const HomeNavigator = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Home" component={TravelScreen} />
  </Stack.Navigator>
)

export default HomeNavigator

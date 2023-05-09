import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import {Text} from 'react-native'

const Stack = createStackNavigator()

const CardScreen = () => (
  <>
    <Text>Travel Card Screen</Text>
  </>
)

const CardNavigator = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Card" component={CardScreen} />
  </Stack.Navigator>
)

export default CardNavigator

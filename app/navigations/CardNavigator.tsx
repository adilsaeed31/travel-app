import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import {Text} from 'react-native'

const Stack = createNativeStackNavigator()

const CardScreen = () => (
  <>
    <Text>Card App Screen</Text>
  </>
)

const CardNavigator = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Home" component={CardScreen} />
  </Stack.Navigator>
)

export default CardNavigator

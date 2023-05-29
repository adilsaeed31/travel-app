import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import {TCTextView as Text} from '@Components'

const {Navigator, Screen} = createStackNavigator()

const CardScreen = () => (
  <>
    <Text>Card App Screen</Text>
  </>
)

const CardNavigator = () => (
  <Navigator screenOptions={{headerShown: false}}>
    <Screen name="Home" component={CardScreen} />
  </Navigator>
)

export default CardNavigator

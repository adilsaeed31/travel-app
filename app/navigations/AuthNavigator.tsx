import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import {AuthFeature} from '@Features'

const Stack = createStackNavigator()

export default function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Auth"
        options={{
          headerShown: false,
        }}
        component={AuthFeature}
      />
    </Stack.Navigator>
  )
}

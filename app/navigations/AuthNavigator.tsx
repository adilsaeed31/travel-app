import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import {AuthFeature} from '@Features'

const Stack = createNativeStackNavigator()

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

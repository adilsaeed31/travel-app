import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import {Text} from 'react-native'
import {Button} from '@ui-kitten/components'

const {Navigator, Screen} = createStackNavigator()

const buttonStyle = {
  marginTop: 20,
}

const TravelScreen = ({navigation}: any) => (
  <>
    <Text>Travel App Screen</Text>

    <Button
      style={buttonStyle}
      onPress={() =>
        navigation.navigate('Travel', {
          screen: 'One',
        })
      }>
      Go to One
    </Button>

    <Button
      style={buttonStyle}
      onPress={() =>
        navigation.navigate('Travel', {
          screen: 'Two',
        })
      }>
      Go to Two
    </Button>
  </>
)

const TravelScreen1 = ({navigation}: any) => (
  <>
    <Text>Travel App Screen1</Text>

    <Button
      style={buttonStyle}
      onPress={() =>
        navigation.navigate('Travel', {
          screen: 'Home',
        })
      }>
      Go back to Home
    </Button>

    <Button
      style={buttonStyle}
      onPress={() =>
        navigation.navigate('Travel', {
          screen: 'Two',
        })
      }>
      Go to Two
    </Button>
  </>
)

const TravelScreen2 = ({navigation}: any) => (
  <>
    <Text>Travel App Screen2</Text>

    <Button
      style={buttonStyle}
      onPress={() =>
        navigation.navigate('Travel', {
          screen: 'Home',
        })
      }>
      Go back to Home
    </Button>

    <Button
      style={buttonStyle}
      onPress={() =>
        navigation.navigate('Travel', {
          screen: 'One',
        })
      }>
      Go back to One
    </Button>
  </>
)

const HomeNavigator = () => (
  <Navigator screenOptions={{headerShown: false}}>
    <Screen name="Home" component={TravelScreen} />
    <Screen name="One" component={TravelScreen1} />
    <Screen name="Two" component={TravelScreen2} />
  </Navigator>
)

export default HomeNavigator

import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import {TCButton as Button, TCTextView as Text} from '@Components'

const {Navigator, Screen} = createStackNavigator()

const buttonStyle = {
  marginTop: 20,
}

const LoyaltyScreen = ({navigation}: any) => (
  <>
    <Text>Loyalty App Screen</Text>

    <Button
      style={buttonStyle}
      onPress={() =>
        navigation.navigate('Loyalty', {
          screen: 'One',
        })
      }>
      Go to One
    </Button>

    <Button
      style={buttonStyle}
      onPress={() =>
        navigation.navigate('Loyalty', {
          screen: 'Two',
        })
      }>
      Go to Two
    </Button>
  </>
)

const LoyaltyScreen1 = ({navigation}: any) => (
  <>
    <Text>Loyalty App Screen1</Text>

    <Button
      style={buttonStyle}
      onPress={() =>
        navigation.navigate('Loyalty', {
          screen: 'Home',
        })
      }>
      Go back to Home
    </Button>

    <Button
      style={buttonStyle}
      onPress={() =>
        navigation.navigate('Loyalty', {
          screen: 'Two',
        })
      }>
      Go to Two
    </Button>
  </>
)

const LoyaltyScreen2 = ({navigation}: any) => (
  <>
    <Text>Loyalty App Screen2</Text>

    <Button
      style={buttonStyle}
      onPress={() =>
        navigation.navigate('Loyalty', {
          screen: 'Home',
        })
      }>
      Go back to Home
    </Button>

    <Button
      style={buttonStyle}
      onPress={() =>
        navigation.navigate('Loyalty', {
          screen: 'One',
        })
      }>
      Go back to One
    </Button>
  </>
)

const HomeNavigator = () => (
  <Navigator screenOptions={{headerShown: false}}>
    <Screen name="Home" component={LoyaltyScreen} />
    <Screen name="One" component={LoyaltyScreen1} />
    <Screen name="Two" component={LoyaltyScreen2} />
  </Navigator>
)

export default HomeNavigator

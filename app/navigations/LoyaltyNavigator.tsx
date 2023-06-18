import React from 'react'
import {View} from 'react-native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import {TCButton as Button, TCTextView as Text} from '@Components'

const {Navigator, Screen} = createNativeStackNavigator()

const buttonStyle = {
  marginTop: 20,
}

const LoyaltyScreen = ({navigation}: any) => (
  <View className="flex-1 justify-center p-4">
    <Text>Loyalty App Screen1</Text>

    <Button style={buttonStyle} onPress={() => navigation.goBack()}>
      Go Back
    </Button>

    <Button style={buttonStyle} onPress={() => navigation.navigate('Two')}>
      Go to Two
    </Button>
  </View>
)

const LoyaltyScreen1 = ({navigation}: any) => (
  <View className="flex-1 justify-center p-4">
    <Text>Loyalty App Screen2</Text>

    <Button style={buttonStyle} onPress={() => navigation.navigate('One')}>
      Go back to One
    </Button>

    <Button style={buttonStyle} onPress={() => navigation.navigate('Three')}>
      Go to Three
    </Button>
  </View>
)

const LoyaltyScreen2 = ({navigation}: any) => (
  <View className="flex-1 justify-center p-4">
    <Text>Loyalty App Screen3</Text>

    <Button style={buttonStyle} onPress={() => navigation.navigate('One')}>
      Go back to One
    </Button>

    <Button style={buttonStyle} onPress={() => navigation.navigate('Two')}>
      Go back to Two
    </Button>
  </View>
)

const LoyaltyNavigator = () => (
  <Navigator
    screenOptions={{
      animation: 'slide_from_right',
    }}>
    <Screen name="One" component={LoyaltyScreen} />
    <Screen name="Two" component={LoyaltyScreen1} />
    <Screen name="Three" component={LoyaltyScreen2} />
  </Navigator>
)

export default LoyaltyNavigator

import React from 'react'
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack'

import {
  AuthFeature,
  PersonalID,
  OtpPersonalID,
  AfterOtpPersonalId,
  RedirectNafaaq,
  AfterNafaath,
  AfterInformation,
  OTPActivateCard,
  ActivateCard,
} from '@Features'

const {Navigator, Screen} = createStackNavigator()

const AuthNavigator = () => {
  return (
    <Navigator
      initialRouteName="Auth"
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Screen name="Auth" component={AuthFeature} />
      <Screen name="PersonalID" component={PersonalID} />
      <Screen name="OtpPersonalId" component={OtpPersonalID} />
      <Screen name="AfterOtpPersonalId" component={AfterOtpPersonalId} />
      <Screen name="RedirectNafaaq" component={RedirectNafaaq} />
      <Screen name="AfterNafaath" component={AfterNafaath} />
      <Screen name="AfterInformation" component={AfterInformation} />
      <Screen name="OTPActivateCard" component={OTPActivateCard} />
      <Screen name="ActivateCard" component={ActivateCard} />
    </Navigator>
  )
}

export default AuthNavigator

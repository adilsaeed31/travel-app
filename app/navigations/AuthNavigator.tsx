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
  OtpVerificationScreen,
  PersonalInformation,
  AfterPersonExisting,
} from '@Features'

const {Navigator, Screen} = createStackNavigator()

const AuthNavigator = () => {
  return (
    <Navigator
      initialRouteName="Auth"
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled: false,
      }}>
      <Screen name="Auth" component={AuthFeature} />
      <Screen name="OTPAuth" component={OtpVerificationScreen} />
      <Screen name="PersonalID" component={PersonalID} />
      <Screen name="OtpPersonalId" component={OtpPersonalID} />
      <Screen name="AfterOtpPersonalId" component={AfterOtpPersonalId} />
      <Screen name="RedirectNafaaq" component={RedirectNafaaq} />
      <Screen name="AfterNafaath" component={AfterNafaath} />
      <Screen name="personalInfo" component={PersonalInformation} />
      <Screen name="AfterInformation" component={AfterInformation} />
      <Screen name="OTPActivateCard" component={OTPActivateCard} />
      <Screen name="ActivateCard" component={ActivateCard} />
      <Screen name="AfterPersonExisting" component={AfterPersonExisting} />
    </Navigator>
  )
}

export default AuthNavigator

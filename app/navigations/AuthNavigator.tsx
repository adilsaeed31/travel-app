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
  RedirectNafaath,
  AfterNafaath,
  AfterInformation,
  OTPActivateCard,
  ActivateCard,
  OtpVerificationScreen,
  PersonalInformation,
  AfterPersonExisting,
  FinancialInformation,
  NameVerification,
  LegalinfoMain,
  LegalInfoOther,
  CreateUser,
  LegalInfoFlow1,
  LegalInfoFlow2,
  LegalInfoFlow3,
  LegalInfoFlow4,
} from '@Features'
import {WIPScreen, DownstreamFail} from '@Screens'
const {Navigator, Screen} = createStackNavigator()

const AuthNavigator = () => {
  return (
    <Navigator
      initialRouteName="Auth"
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Screen name="Auth" component={AuthFeature} />
      <Screen name="OTPAuth" component={OtpVerificationScreen} />
      <Screen name="PersonalID" component={PersonalID} />
      <Screen name="OtpPersonalId" component={OtpPersonalID} />
      <Screen name="AfterOtpPersonalId" component={AfterOtpPersonalId} />
      <Screen name="RedirectNafaath" component={RedirectNafaath} />
      <Screen name="AfterNafaath" component={AfterNafaath} />
      <Screen name="NameVerification" component={NameVerification} />
      <Screen name="PersonalInfo" component={PersonalInformation} />
      <Screen name="AfterInformation" component={AfterInformation} />
      <Screen name="FinancialInformation" component={FinancialInformation} />
      <Screen name="LegalinfoMain" component={LegalinfoMain} />
      <Screen name="LegalInfoOther" component={LegalInfoOther} />
      <Screen name="LegalInfoFlow1" component={LegalInfoFlow1} />
      <Screen name="LegalInfoFlow2" component={LegalInfoFlow2} />
      <Screen name="LegalInfoFlow3" component={LegalInfoFlow3} />
      <Screen name="LegalInfoFlow4" component={LegalInfoFlow4} />
      <Screen name="AfterPersonExisting" component={AfterPersonExisting} />
      <Screen name="CreateUser" component={CreateUser} />
      <Screen name="ActivateCard" component={ActivateCard} />
      <Screen name="OTPActivateCard" component={OTPActivateCard} />
      <Screen name="DownstreamFail" component={DownstreamFail} />
      <Screen name="WIP" component={WIPScreen} />
    </Navigator>
  )
}

export default AuthNavigator

import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

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
  FinicalInformation,
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

const {Navigator, Screen} = createNativeStackNavigator()

const AuthNavigator = () => {
  return (
    <Navigator
      initialRouteName="Auth"
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        animation: 'slide_from_right',
      }}>
      <Screen name="Auth" component={AuthFeature} />
      <Screen name="OTPAuth" component={OtpVerificationScreen} />
      <Screen name="PersonalID" component={PersonalID} />
      <Screen name="OtpPersonalId" component={OtpPersonalID} />
      <Screen name="AfterOtpPersonalId" component={AfterOtpPersonalId} />
      <Screen name="RedirectNafaaq" component={RedirectNafaaq} />
      <Screen name="AfterNafaath" component={AfterNafaath} />
      <Screen name="NameVerification" component={NameVerification} />
      <Screen name="personalInfo" component={PersonalInformation} />
      <Screen name="AfterInformation" component={AfterInformation} />
      <Screen name="FinicalInformation" component={FinicalInformation} />
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
      <Screen name="WIP" component={WIPScreen} />
      <Screen name="DownstreamFail" component={DownstreamFail} />
    </Navigator>
  )
}

export default AuthNavigator

import React from 'react'
import {ScrollView} from 'react-native'
import DeviceInfo from 'react-native-device-info'

import {Spacer, TCTextView} from '@Components'
import {styled} from 'styled-components/native'
import {SPACER_SIZES} from '@Utils'

const AccountView = styled.View`
  flex: 1;
`
const SubView = styled.View`
  flex: 1;
`

const MainWrapper = styled.View`
  height: 100%;
`
// TODO build ui for accounts
const AccountScreen = () => {
  // alert(JSON.stringify(DeviceInfo.getBaseOsSync()))

  return (
    <MainWrapper>
      <SubView
        style={{
          backgroundColor: 'white',
          flex: 1,
          flexDirection: 'row',
          borderRadius: 20,
          paddingHorizontal: 20,
        }}>
        <Spacer size={SPACER_SIZES.LG} />

        <AccountView
          style={{
            backgroundColor: 'white',
            flex: 1,
          }}>
          <TCTextView>Account Name</TCTextView>
          <TCTextView>A. Muhammad Asif</TCTextView>
        </AccountView>
        <AccountView
          style={{
            backgroundColor: 'white',
            flex: 1,
            borderRadius: 20,
          }}>
          <TCTextView>Account Number</TCTextView>
          <TCTextView>12312312312312</TCTextView>
        </AccountView>
      </SubView>

      <SubView style={{backgroundColor: 'white', flex: 1, flexGrow: 0.4}}>
        <TCTextView>Account#: 12312312312312</TCTextView>
      </SubView>
      <SubView style={{backgroundColor: 'white', flex: 1}}>
        <TCTextView>Account#: 12312312312312</TCTextView>
      </SubView>
    </MainWrapper>
  )
}

export default AccountScreen

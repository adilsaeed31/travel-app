import React, {useEffect, useState} from 'react'
import {View} from 'react-native'
import {FaceIcon} from '@Assets'
import {useTranslation} from 'react-i18next'

import {
  TCInput as InputView,
  TCButton as Button,
  TCTextView,
  Spacer,
  TCLinkButton,
  TCMultiLinkButton,
  Layout,
} from '@Components'
import styled from 'styled-components/native'
import {SPACER_SIZES, TEXT_VARIANTS, UserNameValidator} from '@Utils'
import {Dimensions, Keyboard} from 'react-native'
import {StackNavigationProp} from '@react-navigation/stack'
import {fetcher} from '@Api'
import {useQuery} from '@tanstack/react-query'
import {BASE_URL} from '@Utils'
import {useStore} from '@Store'
import {useIsFocused} from '@react-navigation/native'
import DeviceInfo from 'react-native-device-info'
import Toast from 'react-native-toast-message'

type Props = {
  navigation: StackNavigationProp<{
    AfterOtpPersonalId: undefined
    PersonalID: undefined
    Existing: undefined
    OTPAuth?: {
      user: undefined
    }
  }>
}

const LoadFundsScreen = ({navigation}: Props) => {
  const {t} = useTranslation()
  // const {isFetching: isFetchingAccounts, data: AccountsList} =
  // useAccountApi('/transaction/load')

  return (
    <>
      <Layout backgroundIndex={2} isScrollable={false} isLoading={false}>
        <Spacer horizontal={false} size={SPACER_SIZES.BASE} />
        <TCTextView
          className="text-tc-black pt-8"
          variant={TEXT_VARIANTS.heading}>
          Load Funds
        </TCTextView>
      </Layout>
    </>
  )
}

const ButtonKeyboardUp = styled(View)<{keyboardHeight: number}>`
  position: absolute;
  background: #f8d03b;
  bottom: ${({keyboardHeight}) => keyboardHeight};
  width: ${Dimensions.get('window').width}px;
`

const LoginForm = styled.View`
  width: 100%;
  flex: 1;
  justify-content: space-around;
`

const MultiTextWrapper = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  flex: 1;
`

const ForgetPassWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  background: #ffdede;
  border-radius: 16px;
  padding: 2%;
  flex: 0.5;
`

const ForgetPassLabel = styled.Text`
  font-family: 'Co Text';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 28px;
  align-self: center;
  /* or 200% */

  text-align: center;
  color: #de2e2e;
`

const ViewWrapper = styled.View`
  width: 100%;
  justify-content: flex-end;
  flex-direction: row;
  flex: 1;
`

const TCButton = styled(Button)``

const TCInput = styled(InputView)`
  width: 100%;
  flex: 1;
`

const ButtonContainer = styled.View`
  width: 100%;
  flex: 1;
  justify-content: center;
`
const BottomView = styled.View`
  width: 100%;
  flex: 1;
  justify-content: space-around;
`
export default LoadFundsScreen

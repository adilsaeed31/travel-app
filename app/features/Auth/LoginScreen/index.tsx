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
import {SPACER_SIZES, TEXT_VARIANTS} from '@Utils'
import {Dimensions, Keyboard} from 'react-native'
import {StackNavigationProp} from '@react-navigation/stack'
import {fetcher} from '@Api'
import {useQuery} from '@tanstack/react-query'
import {BASE_URL} from '@Utils'
import {useStore} from '@Store'
import {useIsFocused} from '@react-navigation/native'
import DeviceInfo from 'react-native-device-info'

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

const AuthFeature = ({navigation}: Props) => {
  const {t} = useTranslation()
  const isFocused = useIsFocused()

  const [deviceId, setDeviceId] = useState('')
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(false)
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0)
  const [status, setstatus] = useState(200)
  const [isAuthFailed, setIsAuthFailed] = useState(false)
  const setUser = useStore((state: any) => state.setUser)

  const bodyParams = {
    username: userName,
    password: password,
    os: 'IOS', // TODO
    language: useStore.getState().language,
    device_id: deviceId,
    os_version: '16.4', // TODO
    version: '0.1', // TODO
  }
  const url = `${BASE_URL}/auth/login`
  const {isFetching, data, refetch} = useQuery({
    queryKey: ['Login', url, bodyParams],
    queryFn: async () => {
      let res: any = await fetcher(url, {
        method: 'POST',
        body: bodyParams,
      })
      try {
        setstatus(res.status)
        if (res.status >= 200 && res.status < 300 && !!res.bodyString) {
          return res.json()
        }
        return res.status
      } catch (e) {
        return 500 // something went wrong
      }
    },
    refetchOnWindowFocus: false,
    cacheTime: 1,
    enabled: false, // disable this query from automatically running
  })

  useEffect(() => {
    if (!isFetching && data && isFocused) {
      if (status >= 200 && status < 300) {
        if (data.token_hold) {
          navigation.navigate('OTPAuth', {user: data, resendParams: bodyParams})
          setstatus(0)
        } else {
          setUser(data)
          setIsAuthFailed(false)
        }
      } else if (status > 299 && status < 400) {
        navigation.navigate('OTPAuth')
      } else if (status > 399 && status < 500) {
        setIsAuthFailed(true)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isFetching, isFocused, status])

  const handleLogin = () => {
    // Perform login logic here
    refetch()
    if (Keyboard) {
      Keyboard.dismiss()
    }
  }

  useEffect(() => {
    setDeviceId(DeviceInfo.getUniqueIdSync())

    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardWillShow',
      e => {
        setKeyboardVisible(true)
        setKeyboardHeight(e.endCoordinates.height)
      },
    )

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardWillHide',
      () => {
        setKeyboardVisible(false)
      },
    )

    return () => {
      keyboardDidShowListener.remove()
      keyboardDidHideListener.remove()
    }
  }, [])

  return (
    <>
      <Layout backgroundIndex={2} isScrollable={false} isLoading={isFetching}>
        <Spacer horizontal={false} size={SPACER_SIZES.BASE} />
        <TCTextView
          className="text-tc-black pt-8"
          variant={TEXT_VARIANTS.heading}>
          {t('auth:buttonLogin')}
        </TCTextView>
        <LoginForm>
          <TCInput
            maxLength={20}
            label={t('auth:userName')}
            onChangeText={setUserName}
          />
          <TCInput
            isPassword
            value={password}
            label={t('auth:password')}
            onChangeText={setPassword}
          />
        </LoginForm>
        <ViewWrapper>
          <TCLinkButton onPress={() => navigation.navigate('WIP')}>
            {t('auth:buttonForget')}
          </TCLinkButton>
        </ViewWrapper>
        {isAuthFailed && (
          <ForgetPassWrapper>
            <ForgetPassLabel>{t('auth:authFailed')}</ForgetPassLabel>
          </ForgetPassWrapper>
        )}

        <MultiTextWrapper>
          <FaceIcon />
        </MultiTextWrapper>
        <BottomView>
          <ButtonContainer>
            <TCButton onPress={handleLogin}>{t('auth:buttonLogin')}</TCButton>
          </ButtonContainer>
          <MultiTextWrapper>
            <TCMultiLinkButton
              callbacks={[
                () => {
                  setPassword('')
                  navigation.navigate('PersonalID')
                },
              ]}>
              {t('auth:newToSaib')}
            </TCMultiLinkButton>
          </MultiTextWrapper>
        </BottomView>
      </Layout>

      {isKeyboardVisible && (
        <ButtonKeyboardUp keyboardHeight={keyboardHeight}>
          <TCButton onPress={handleLogin}>{t('auth:buttonLogin')}</TCButton>
        </ButtonKeyboardUp>
      )}
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
export default AuthFeature

/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useContext} from 'react'
import {View, Keyboard, Dimensions, TouchableOpacity} from 'react-native'
import {useTranslation} from 'react-i18next'
import {
  Layout,
  TCButton as Button,
  TCTextView as Text,
  TCOTP as OTP,
  Spacer,
} from '@Components'
import {SPACER_SIZES, TEXT_VARIANTS} from '@Utils'
import styled from 'styled-components/native'
import {Edit} from '@Assets'
import {StackNavigationProp} from '@react-navigation/stack'
import {AppProviderProps, AppContext} from '@Context'
import * as yup from 'yup'
import {fetcher} from '@Api'
import {useMutation} from '@tanstack/react-query'
import {BASE_URL} from '@Utils'
import {useStore} from '@Store'

const ButtonContainer = styled(View)`
  position: absolute;
  bottom: 34px;
  width: ${Dimensions.get('window').width}px;
  padding-left: 32px;
  padding-right: 32px;
`

const Row = styled(View)<{isRTL: boolean | undefined}>`
  display: flex;
  flex-direction: ${({isRTL}) => (isRTL ? 'row-reverse' : 'row')};
  justify-content: space-between;
`

const EditIcon = styled(Edit)`
  margin-right: 6px;
`

const BottomText = styled(Text)<{disabled?: boolean}>`
  line-height: 20px;
  color: #3f3d36;
  opacity: ${props => (props.disabled ? '0.4' : '1')};
`

const StickyButtonContainer = styled.View<{keyboardHeight: Number}>`
  position: absolute;
  bottom: ${props => props.keyboardHeight + 'px'};
  left: 0;
  right: 0;
  align-items: center;
`
const ErrorText = styled(Text)`
  font-weight: 500;
  color: #f54d3f;
  padding-left: 16px;
`

const StickyButton = styled.TouchableOpacity`
  background-color: #f8d03b;
  border: 1px solid #f8d03b;
  width: 100%;
  min-height: 56px;
  align-items: center;
  justify-content: center;
`

const ErrorWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  background: #ffdede;
  border-radius: 16px;
  min-height: 60px;
  margin-top: 20px;
  margin-bottom: 20px;
`

const ErrorLabel = styled.Text`
  font-family: 'Co Text';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 28px;
  align-self: center;
  max-width: 90%;
  /* or 200% */

  text-align: center;
  letter-spacing: -0.4px;

  color: #de2e2e;
`

type Props = {
  navigation: StackNavigationProp<{
    AfterOtpPersonalId: undefined
    PersonalID: undefined
    RedirectNafaaq: undefined
  }>
}

const OtpPersonalIdScreen = ({navigation}: Props) => {
  const {t} = useTranslation()
  const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(false)
  const [keyboardHeight, setKeyboardHeight] = useState<Number>(0)
  const [resendCount, setResendCount] = useState<number>(0)
  const [resendAvailable, setResendAvailable] = useState<boolean>(false)
  const {isRTL} = useContext<AppProviderProps>(AppContext)
  const [state, setState] = useState<any>({})
  const [error, setError] = useState<string>('')
  const [statusError, setStatusError] = useState<any>(false)
  const [status, setStatus] = useState<any>('')
  const [isButtonDisabled, setButtonDisabled] = useState(true)
  const mobileNumber = useStore((store: any) => store.onboardingMobileNumber)
  const OTPRef = useStore((store: any) => store.onboardingOTPRef)
  const govtId = useStore((state: any) => state.govtId)

  const {
    isLoading: isOTPLoading,
    data: otpData,
    mutate: verifyOtp,
    reset: resetOTP,
  } = useMutation({
    mutationFn: async () => {
      let req: any = await fetcher(BASE_URL + '/auth/otp/verify', {
        method: 'POST',
        body: {
          referenceNumber: OTPRef,
          otp: state.otp,
        },
      })

      setStatus(req.status)

      if (req.status < 400) {
        return req.json()
      } else {
        return req.status
      }
    },
  })

  const {
    isLoading: isTahaquqLoading,
    data: tahaquqData,
    mutate: verifyTahaquq,
    reset: resetTahaquq,
  } = useMutation({
    mutationFn: async () => {
      let req: any = await fetcher(BASE_URL + '/onboarding/id/verify', {
        method: 'POST',
        body: {
          id: govtId,
          mobileNumber: mobileNumber,
        },
      })
      return await req.json()
    },
  })

  useEffect(() => {
    if (String(state.otp).length > 0) {
      try {
        yup
          .object({
            otp: yup
              .string()
              .required('Please Enter OTP')
              .length(4, 'Please Enter OTP'),
          })
          .validateSync(state)

        setButtonDisabled(false)
        setError('')
      } catch (err: any) {
        setError(err.message)
        setButtonDisabled(true)
      }
    }
  }, [state.otp])

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      e => {
        setKeyboardVisible(true)
        setKeyboardHeight(e.endCoordinates.height)
      },
    )

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false)
      },
    )

    return () => {
      keyboardDidShowListener.remove()
      keyboardDidHideListener.remove()
    }
  }, [])

  useEffect(() => {
    if (resendCount > 2) {
      navigation.navigate('AfterOtpPersonalId')
    }
    setResendAvailable(false)
  }, [resendCount, navigation])

  const onComplete = () => {
    if (state.otp.length === 4) {
      verifyOtp()
    } else {
      setError('Please Enter OTP')
    }
  }

  if (otpData && otpData.access_token && !isTahaquqLoading && !tahaquqData) {
    // const expiresIn = otpData.expires_in
    // const access_token = data.access_token
    // const refresh_token = otpData.refresh_token
    // const refresh_token_expires_in = otpData.refresh_token_expires_in
    // const authMech = data.type
    verifyTahaquq()
  }

  if (state.otp && tahaquqData && tahaquqData.match) {
    resetOTP()
    resetTahaquq()
    navigation.navigate('RedirectNafaaq')
  }

  if (state.otp && tahaquqData && !tahaquqData.match) {
    resetOTP()
    resetTahaquq()
    navigation.navigate('AfterOtpPersonalId')
  }

  useEffect(() => {
    if (status > 399 && status < 500) {
      setStatusError('Invalid OTP')
    }
  }, [status])
  return (
    <>
      <Layout isLoading={isOTPLoading || isTahaquqLoading}>
        <Spacer horizontal={false} size={SPACER_SIZES.BASE * 3} />
        <Text variant={TEXT_VARIANTS.heading}>{t('onboarding:enterOTP')}</Text>
        <Spacer size={SPACER_SIZES.BASE * 3} />
        <OTP
          onChangeText={otp => {
            setState({...state, otp: otp})
          }}
          onTimerComplete={() => {
            setResendAvailable(true)
          }}
          resetCount={resendCount}
        />
        <Spacer size={SPACER_SIZES.BASE * 2} />
        <Row isRTL={isRTL}>
          <TouchableOpacity onPress={() => navigation.navigate('PersonalID')}>
            <Row isRTL={isRTL}>
              <EditIcon />
              <BottomText variant={TEXT_VARIANTS.body}>
                {mobileNumber}
              </BottomText>
            </Row>
          </TouchableOpacity>
          <View>
            {resendAvailable ? (
              <TouchableOpacity
                onPress={() => {
                  setResendCount(resendCount + 1)
                }}>
                <BottomText variant={TEXT_VARIANTS.body}>
                  {t('onboarding:resendOTP')}
                </BottomText>
              </TouchableOpacity>
            ) : (
              <BottomText variant={TEXT_VARIANTS.body} disabled={true}>
                {t('onboarding:resendOTP')}
              </BottomText>
            )}
          </View>
        </Row>

        {statusError ? (
          <ErrorWrapper>
            <ErrorLabel>{statusError}</ErrorLabel>
          </ErrorWrapper>
        ) : null}

        {error && state.otp ? (
          <ErrorWrapper>
            <ErrorLabel>{error}</ErrorLabel>
          </ErrorWrapper>
        ) : null}

        {!isKeyboardVisible && (
          <ButtonContainer>
            <Button onPress={onComplete} disabled={isButtonDisabled}>
              <Text variant={TEXT_VARIANTS.body}>
                {t('onboarding:continue')}
              </Text>
            </Button>
          </ButtonContainer>
        )}
      </Layout>
      {isKeyboardVisible && (
        <StickyButtonContainer keyboardHeight={keyboardHeight}>
          <StickyButton onPress={onComplete} disabled={isButtonDisabled}>
            <Text variant={TEXT_VARIANTS.body}>{t('onboarding:continue')}</Text>
          </StickyButton>
        </StickyButtonContainer>
      )}
    </>
  )
}

export default OtpPersonalIdScreen

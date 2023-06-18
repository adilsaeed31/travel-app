/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useContext} from 'react'
import * as yup from 'yup'
import {View, Keyboard, Dimensions, TouchableOpacity} from 'react-native'
import {useTranslation} from 'react-i18next'
import styled from 'styled-components/native'
import {useMutation} from '@tanstack/react-query'
import {StackNavigationProp} from '@react-navigation/stack'
import {
  Layout,
  TCButton as Button,
  TCTextView as Text,
  TCOTP as OTP,
  Spacer,
} from '@Components'
import {SPACER_SIZES, TEXT_VARIANTS, BASE_URL, setItem} from '@Utils'
import {AppProviderProps, AppContext} from '@Context'
import {fetcher} from '@Api'
import {Edit} from '@Assets'
import {useStore} from '@Store'
import {useFocusEffect} from '@react-navigation/native'

type Props = {
  navigation: StackNavigationProp<any>
  route: any
}

const OtpAuthScreen = ({navigation, route}: Props) => {
  const {t} = useTranslation()

  const {isRTL} = useContext<AppProviderProps>(AppContext)
  const [state, setState] = useState<any>({})

  const [error, setError] = useState<string>('')
  const [statusError, setStatusError] = useState<any>(false)
  const [resendCount, setResendCount] = useState<number>(1)
  const [finishTimer, setFinishTimer] = useState<number>(1)
  const [keyboardHeight, setKeyboardHeight] = useState<Number>(0)
  const [isButtonDisabled, setButtonDisabled] = useState(true)
  const [resendAvailable, setResendAvailable] = useState<boolean>(false)
  const [invalidAttempts, setInvalidAttempts] = useState<number>(0)
  const setUser = useStore((state: any) => state.setUser)
  const [otpRefN, setOTPRef] = useState<any>(route?.params?.user?.otp_reference)
  const [bodyParams] = useState<any>(route?.params?.resendParams)

  const {
    isLoading: isOTPLoading,
    data: otpData,
    mutate: verifyOtp,
  } = useMutation({
    mutationFn: async () => {
      let req: any = await fetcher(BASE_URL + '/auth/login/otp', {
        method: 'POST',
        body: {
          reference_number: otpRefN,
          otp: state.otp,
        },
      })
      let res = await req.json()

      return res
    },
  })
  const {
    isLoading: isResend,
    data: resendData,
    mutate: resendOTP,
    reset: resetOTP,
  } = useMutation({
    mutationFn: async () => {
      let req: any = await fetcher(BASE_URL + '/auth/login', {
        method: 'POST',
        body: bodyParams,
      })

      let res = await req.json()
      return res
    },
  })

  useEffect(() => {
    if (String(state.otp).length > 0) {
      try {
        yup
          .object({
            otp: yup.string().required('Please Enter OTP').length(4, ''),
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
      'keyboardWillShow',
      e => {
        setKeyboardHeight(e.endCoordinates.height)
      },
    )

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardWillHide',
      () => {
        setKeyboardHeight(0)
      },
    )

    return () => {
      keyboardDidShowListener.remove()
      keyboardDidHideListener.remove()
    }
  }, [])

  useEffect(() => {
    if (otpData && otpData.access_token) {
      setUser(otpData)
    } else {
      const status = otpData?.status
      switch (true) {
        case status === 409:
          setStatusError('OTP already Exist, Please wait for a minute')
          break
        case status === 403:
          setStatusError('OTP Expired, Please try again')
          setResendAvailable(true)
          setFinishTimer(finishTimer + 1)
          break
        case status === 509:
          setStatusError('Limit Exceeded')
          break
        case status > 399 && status <= 500:
          if (invalidAttempts < 2) {
            setStatusError('Invalid Otp. Please try Again')
            setInvalidAttempts(invalidAttempts + 1)
          } else {
            setStatusError('Max Attempts Limit Exceeded')
          }
          break
        default:
          setStatusError('')
      }
    }
  }, [otpData])

  useEffect(() => {
    setStatusError('')
    setResendAvailable(false)
  }, [resendCount])

  useEffect(() => {
    if (resendData && resendData.otp_reference) {
      setOTPRef(resendData.otp_reference)
    } else {
      const status = resendData?.status
      switch (true) {
        case status === 509:
          setStatusError('Limit Exceeded')
          break
        case status > 399 && status <= 500:
          setStatusError('Something went wrong. Please try after some time')
          break
        default:
          setStatusError('')
      }
    }
  }, [resendData])

  const onComplete = () => {
    if (state.otp.length === 4) {
      verifyOtp()
    } else {
      setError('Please Enter OTP')
    }
  }

  return (
    <>
      <Layout backgroundIndex={2} isLoading={isOTPLoading || isResend}>
        <Spacer horizontal={false} size={SPACER_SIZES.BASE * 3} />
        <Text variant={TEXT_VARIANTS.heading}>{t('onboarding:enterOTP')}</Text>
        <Spacer size={SPACER_SIZES.BASE * 3} />
        <OTP
          value={state.otp}
          onChangeText={otp => {
            setState({...state, otp: otp})
          }}
          onTimerComplete={() => {
            if (resendCount <= 2) setResendAvailable(true)
            else setResendAvailable(false)
          }}
          resetCount={resendCount}
          finishTimer={finishTimer}
        />
        <Spacer size={SPACER_SIZES.BASE * 2} />
        <Row isRTL={isRTL}>
          <TouchableOpacity onPress={() => navigation.navigate('PersonalID')}>
            <Row isRTL={isRTL}></Row>
          </TouchableOpacity>
          <View>
            {resendAvailable ? (
              <TouchableOpacity
                onPress={() => {
                  if (resendCount <= 2) {
                    resendOTP()
                    setResendCount(resendCount + 1)
                  }
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

        {statusError && state.otp ? (
          <ErrorWrapper>
            <ErrorLabel>{statusError}</ErrorLabel>
          </ErrorWrapper>
        ) : null}

        {error && state.otp ? (
          <ErrorWrapper>
            <ErrorLabel>{error}</ErrorLabel>
          </ErrorWrapper>
        ) : null}

        {!keyboardHeight && (
          <ButtonContainer>
            <Button onPress={onComplete} disabled={isButtonDisabled}>
              <Text variant={TEXT_VARIANTS.body}>
                {t('onboarding:continue')}
              </Text>
            </Button>
          </ButtonContainer>
        )}
      </Layout>
      {!!keyboardHeight && (
        <StickyButtonContainer keyboardHeight={keyboardHeight}>
          <StickyButton onPress={onComplete} disabled={isButtonDisabled}>
            <Text variant={TEXT_VARIANTS.body}>{t('onboarding:continue')}</Text>
          </StickyButton>
        </StickyButtonContainer>
      )}
    </>
  )
}

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

const StickyButton = styled.TouchableOpacity<{isDisabled?: boolean}>`
  background-color: ${props => (props.isDisabled ? '#E1E1E1' : '#f8d03b')};
  border: 1px solid ${props => (props.isDisabled ? '#E1E1E1' : '#f8d03b')};
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

export default OtpAuthScreen

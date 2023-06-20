import React, {useEffect, useState, useContext} from 'react'
import * as yup from 'yup'
import {View, Keyboard, TouchableOpacity, Platform} from 'react-native'
import {useTranslation} from 'react-i18next'
import {useMutation} from '@tanstack/react-query'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {
  Layout,
  TCButton as Button,
  TCTextView as Text,
  TCOTP as OTP,
  KeyboardStickyButton,
} from '@Components'
import {BASE_URL, setItem} from '@Utils'
import {AppProviderProps, AppContext} from '@Context'
import {fetcher} from '@Api'
import {Edit} from '@Assets'
import {useStore} from '@Store'
import {useFocusEffect} from '@react-navigation/native'
import {NativeWindStyleSheet} from 'nativewind'
import cn from 'classnames'

type Props = {
  navigation: NativeStackNavigationProp<any>
  route: any
}

const OtpPersonalIdScreen = ({navigation, route}: Props) => {
  const {t} = useTranslation()

  const {isRTL} = useContext<AppProviderProps>(AppContext)
  const [state, setState] = useState<any>({})
  const [error, setError] = useState<string>('')
  const [statusError, setStatusError] = useState<any>(false)
  const [resendCount, setResendCount] = useState<number>(1)
  const [tahaquqFailCount, setTahaquqFailCount] = useState<number>(0)
  const [finishTimer, setFinishTimer] = useState<number>(1)
  const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(false)
  const [isButtonDisabled, setButtonDisabled] = useState(true)
  const [resendAvailable, setResendAvailable] = useState<boolean>(false)
  const [invalidAttempts, setInvalidAttempts] = useState<number>(0)
  const mobileNumber = useStore((store: any) => store.onboardingMobileNumber)
  const OTPRef = useStore((store: any) => store.onboardingOTPRef)
  const govtId = useStore((store: any) => store.govtId)
  const setOnboardingProgress = useStore(
    (store: any) => store.setOnboardingProgress,
  )

  const onBoardingProgress = useStore((store: any) => store.onBoardingProgress)

  const [otpRefN, setOTPRef] = useState<any>(OTPRef)

  useFocusEffect(() => {
    const data = route.params
    if (
      data?.historyPage === 'AfterOTPPersonalID' &&
      data?.otpRef !== otpRefN
    ) {
      setInvalidAttempts(0)
      setResendAvailable(false)
      setResendCount(resendCount + 1)
      setOTPRef(data.otpRef)
      setState({...state, otp: ''})
    }
  })

  const {
    isLoading: isOTPLoading,
    data: otpData,
    mutate: verifyOtp,
  } = useMutation({
    mutationFn: async () => {
      let req: any = await fetcher(BASE_URL + '/auth/otp/verify', {
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
    isLoading: isTahaquqLoading,
    data: tahaquqData,
    mutate: verifyTahaquq,
    reset: resetTahaquq,
  } = useMutation({
    mutationFn: async () => {
      let req: any = await fetcher(BASE_URL + '/onboarding/id/verify', {
        method: 'POST',
        body: {
          mobile_number: '0' + mobileNumber,
          id: govtId,
        },
        token: otpData.access_token,
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
      let req: any = await fetcher(BASE_URL + '/auth/otp', {
        method: 'POST',
        body: {
          mobile_number: '0' + mobileNumber,
          identity_number: govtId,
          role: 'ONBOARDING',
        },
      })

      let res = await req.json()
      return res
    },
  })

  useEffect(() => {
    setStatusError('')
    setError('')
    if (String(state.otp).length === 4) {
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
  }, [state, state.otp])

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => {
        setKeyboardVisible(true)
      },
    )

    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
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
    if (otpData && otpData.access_token) {
      setItem('journeySecrets', JSON.stringify(otpData))
      verifyTahaquq()
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
          navigation.navigate('AfterOtpPersonalId', {
            status: 'error',
            case: 'Bandwidth Limit Exceeded',
          })
          break
        case status > 399 && status <= 500:
          if (invalidAttempts < 2) {
            setStatusError('Invalid OTP. Please try again')
            setInvalidAttempts(invalidAttempts + 1)
          } else {
            navigation.navigate('AfterOtpPersonalId', {
              status: 'error',
              case: 'Invalid Attempts',
            })
          }
          break
        default:
          setStatusError('')
      }
    }
  }, [finishTimer, invalidAttempts, navigation, otpData, verifyTahaquq])

  useEffect(() => {
    if (
      tahaquqData &&
      tahaquqData instanceof Object &&
      tahaquqData.hasOwnProperty('match')
    ) {
      if (state.otp && tahaquqData && tahaquqData.existing === true) {
        navigation.navigate('AfterPersonExisting')
        return
      }
      if (state.otp && tahaquqData && tahaquqData.match === true) {
        resetOTP()
        resetTahaquq()
        setOnboardingProgress({...onBoardingProgress, isOTPVerified: true})
        navigation.navigate('RedirectNafaaq')
        return
      }
      if (state.otp && tahaquqData && tahaquqData.match === false) {
        if (tahaquqFailCount < 1) {
          setTahaquqFailCount(tahaquqFailCount + 1)
          navigation.navigate('AfterOtpPersonalId', {
            status: 'error',
            case: 'Invalid Identity',
          })
          return
        } else {
          navigation.navigate('AfterOtpPersonalId', {
            status: 'error',
            case: 'Bandwidth Limit Exceeded',
          })
          return
        }
      }
    } else {
      const status = tahaquqData?.status
      switch (true) {
        case status === 403:
          setStatusError('OTP Expired, Please try again')
          break
        case status === 409:
          setStatusError('OTP already Exist, Please wait for a minute')
          break
        case status > 399 && status < 500:
          setStatusError('Some Error Occurred. Please try After Some Time')
          break
        case status >= 500:
          navigation.navigate('DownstreamFail')
          break
        default:
          setStatusError('')
      }
    }
  }, [
    navigation,
    onBoardingProgress,
    resetOTP,
    resetTahaquq,
    setOnboardingProgress,
    state.otp,
    tahaquqData,
    tahaquqFailCount,
  ])

  useEffect(() => {
    setStatusError('')
    setResendAvailable(false)
  }, [resendCount])

  useEffect(() => {
    if (resendData && resendData.reference_number) {
      setOTPRef(resendData.reference_number)
    } else {
      const status = resendData?.status
      switch (true) {
        case status === 509:
          navigation.navigate('AfterOtpPersonalId', {
            status: 'error',
            case: 'Bandwidth Limit Exceeded',
          })
          break
        case status > 399 && status <= 500:
          setStatusError('Something went wrong. Please try after some time')
          break
        default:
          setStatusError('')
      }
    }
  }, [navigation, resendData])

  const onComplete = () => {
    if (state.otp.length === 4) {
      verifyOtp()
    } else {
      setError('Please Enter OTP')
    }
  }

  return (
    <>
      <Layout isLoading={isOTPLoading || isTahaquqLoading || isResend}>
        <Text className="heading-1 my-6">{t('onboarding:enterOTP')}</Text>

        <OTP
          value={state.otp}
          onChangeText={otp => {
            setState({...state, otp: otp})
          }}
          onTimerComplete={() => {
            setResendAvailable(true)
          }}
          resetCount={resendCount}
          finishTimer={finishTimer}
        />

        <View
          className={cn({
            'flex-row': !isRTL,
            'flex-row-reverse': isRTL,
            'justify-between': true,
            'mt-4': true,
          })}>
          <TouchableOpacity onPress={() => navigation.navigate('PersonalID')}>
            <View
              className={cn({
                'flex-row': !isRTL,
                'flex-row-reverse': isRTL,
              })}>
              <Edit />
              <Text
                className={cn({
                  'text-tc-secondary': true,
                  'mt-[6]': true,
                  'mx-[6]': true,
                })}>
                {mobileNumber}
              </Text>
            </View>
          </TouchableOpacity>
          <View>
            {resendAvailable ? (
              <TouchableOpacity
                onPress={() => {
                  resendOTP()
                  setInvalidAttempts(0)
                  setResendAvailable(false)
                  setResendCount(resendCount + 1)
                }}>
                <Text
                  className={cn({
                    'text-tc-secondary': true,
                    'mt-[6]': true,
                  })}>
                  {t('onboarding:resendOTP')}
                </Text>
              </TouchableOpacity>
            ) : (
              <Text
                className={cn({
                  'text-tc-secondary': true,
                  'mt-[6]': true,
                  'opacity-40': true,
                })}>
                {t('onboarding:resendOTP')}
              </Text>
            )}
          </View>
        </View>

        {statusError && state.otp ? (
          <View className="flex-row justify-center content-start bg-[#ffdede] my-5 min-h-[56] rounded-b-[16] rounded-t-[16]">
            <Text className="text-center text-tc-danger">{statusError}</Text>
          </View>
        ) : null}

        {error && state.otp ? (
          <View className="flex-row justify-center content-start bg-[#ffdede] my-5 min-h-[56] rounded-b-[16] rounded-t-[16]">
            <Text className="text-center text-tc-danger">{statusError}</Text>
          </View>
        ) : null}

        {!isKeyboardVisible && (
          <View
            className={cn({
              'mx-4': true,
              'w-full': true,
              'below-button': !isKeyboardVisible,
              absolute: !isKeyboardVisible,
            })}>
            <Button
              onPress={onComplete}
              disabled={
                isButtonDisabled ||
                state.otp.length < 4 ||
                isOTPLoading ||
                isTahaquqLoading ||
                isResend
              }>
              <Text>{t('onboarding:Verify')}</Text>
            </Button>
          </View>
        )}
      </Layout>

      <KeyboardStickyButton
        onPress={onComplete}
        isDisabled={
          isButtonDisabled ||
          state.otp.length < 4 ||
          isOTPLoading ||
          isTahaquqLoading ||
          isResend
        }
        value={t('onboarding:Verify')}
      />
    </>
  )
}

NativeWindStyleSheet.create({
  styles: {
    'heading-1': {
      fontSize: 28,
      fontWeight: '700',
    },

    'below-button': {
      bottom: 95,
    },
  },
})

export default OtpPersonalIdScreen

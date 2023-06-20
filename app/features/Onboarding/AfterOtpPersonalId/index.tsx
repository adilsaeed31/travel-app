/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react'
import {View} from 'react-native'
import {useTranslation} from 'react-i18next'
import {NativeWindStyleSheet} from 'nativewind'
import cn from 'classnames'

import {
  Layout,
  TCButton as Button,
  TCTextView as Text,
  TCInput as Input,
} from '@Components'
import * as yup from 'yup'
import {useMutation} from '@tanstack/react-query'
import {TEXT_VARIANTS, BASE_URL, screenHeight} from '@Utils'
import styled from 'styled-components/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {Return, Cross} from '@Assets'
import {MobileNumberValidator} from '@Utils'
import {fetcher} from '@Api'
import {useStore} from '@Store'

const isSmall = screenHeight < 750

type Props = {
  navigation: NativeStackNavigationProp<any>
  route: any
}

enum STPES {
  attempts,
  identityAttempts,
  phoneAttempts,
}

const AfterOtpPersonalIDScreen = ({navigation, route}: Props) => {
  const {t} = useTranslation()
  const [state, setState] = useState<any>({step: STPES.attempts})
  const [isButtonDisabled, setButtonDisabled] = useState(true)
  const [statusError, setStatusError] = useState<any>(false)
  const setOnboardingDetails = useStore(
    (store: any) => store.setOnboardingDetails,
  )
  const mobileNumber = useStore((store: any) => store.onboardingMobileNumber)
  const govtId = useStore((store: any) => store.govtId)

  const {
    isLoading: isResend,
    data: resendData,
    mutate: resendOTP,
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
    if (resendData && resendData.reference_number) {
      navigation.navigate('OtpPersonalId', {
        historyPage: 'AfterOTPPersonalID',
        otpRef: resendData.reference_number,
      })
    } else {
      const status = resendData?.status
      switch (true) {
        case status === 509:
          setState({...state, step: STPES.attempts})
          break
        case status > 399 && status <= 500:
          setState({
            ...state,
            error: 'common:someThingWentWrong',
          })
          break
      }
    }
  }, [resendData])

  const onComplete = () => {
    navigation.navigate('Auth')
  }

  useEffect(() => {
    let data = route.params
    if (data?.case === 'Bandwidth Limit Exceeded') {
      setState({...state, step: STPES.attempts})
    }

    if (data?.case === 'Invalid Attempts') {
      setState({...state, step: STPES.phoneAttempts})
    }

    if (data?.case === 'Invalid Identity') {
      setState({...state, step: STPES.identityAttempts})
    }
  }, [])

  const {
    isLoading,
    data: OTPdata,
    mutate: OTPMutate,
    reset: OTPReset,
  } = useMutation({
    mutationFn: async () => {
      let req: any = await fetcher(BASE_URL + '/auth/otp', {
        method: 'POST',
        body: {
          mobile_number: '0' + state.mobileNumber,
          identity_number: govtId,
          role: 'ONBOARDING',
        },
      })
      let res = await req.json()
      return res
    },
  })

  useEffect(() => {
    try {
      yup
        .object({
          mobileNumber: MobileNumberValidator,
        })
        .validateSync(state)
      setButtonDisabled(false)
    } catch (err: any) {
      setButtonDisabled(true)
    }
  }, [state.mobileNumber])

  useEffect(() => {
    if (OTPdata?.reference_number) {
      setOnboardingDetails(state.mobileNumber, govtId, OTPdata.reference_number)
      OTPReset()
      navigation.navigate('OtpPersonalId', {
        historyPage: 'AfterOTPPersonalID',
        otpRef: OTPdata.reference_number,
      })
    } else {
      const status = OTPdata?.status
      switch (true) {
        case status === 409:
          setStatusError('onboarding:otpAlreadyExist')
          break
        case status === 509:
          setState({...state, step: STPES.attempts})
          break
        case status > 399 && status <= 500:
          setStatusError('common:someThingWentWrong')
          break
        default:
          setStatusError('')
      }
    }
  }, [OTPdata])

  return (
    <>
      <Layout
        isHeader={false}
        isBackground={false}
        isScrollable={false}
        isLoading={isResend || isLoading}>
        <View
          className={cn({
            'flex-row justify-center': true,
            'mt-20': isSmall,
            'mt-40': !isSmall,
            'mb-8': isSmall || state.step === STPES.identityAttempts,
            'mb-[112]': !(isSmall || state.step === STPES.identityAttempts),
          })}>
          {(state.step === STPES.attempts ||
            state.step === STPES.phoneAttempts) && <ReturnImg />}
          {state.step === STPES.identityAttempts && <CrossImg />}
        </View>

        {state.step === STPES.attempts && (
          <Text className="text-xl text-center text-tc-dark-gray ">
            {t('onboarding:phoneError')}
          </Text>
        )}

        {state.step === STPES.phoneAttempts && (
          <Text className="text-xl text-center text-tc-dark-gray">
            {t('onboarding:threeAttempts')}
          </Text>
        )}

        {state.step === STPES.identityAttempts && (
          <Text className="text-xl text-center text-tc-dark-gray">
            {t('onboarding:identityError')}
          </Text>
        )}

        {state.step === STPES.attempts && (
          <Text className="text-sm text-center text-tc-dark-gray mt-4">
            {t('onboarding:phoneAttempts')}
          </Text>
        )}

        {state.step === STPES.phoneAttempts && (
          <Text className="text-sm text-center text-tc-dark-gray mt-4">
            {t('onboarding:tryAgain')}
          </Text>
        )}

        {state.step === STPES.identityAttempts && (
          <Text className="text-sm text-center text-tc-dark-gray mt-4 mb-6">
            {t('onboarding:identityAttempts')}
          </Text>
        )}

        {state.error && (
          <Text className="text-center my-4 text-tc-danger font-bold">
            {t(state.error)}
          </Text>
        )}

        {state.step === STPES.identityAttempts && (
          <>
            <Input
              label={t('onboarding:mobileNumber')}
              schema={MobileNumberValidator}
              onChangeText={text => {
                setState({...state, mobileNumber: text})
              }}
              maxLength={9}
              value={state.mobileNumber}
            />
            {statusError && (
              <Text className="text-center my-4 text-tc-danger font-bold">
                {t(statusError)}
              </Text>
            )}
          </>
        )}

        {state.step === STPES.identityAttempts && (
          <>
            <View className="absolute bottom-button-1 mx-4 w-full">
              <Button
                onPress={() => {
                  OTPMutate()
                }}
                disabled={isButtonDisabled}>
                <Text variant={TEXT_VARIANTS.body}>
                  {t('onboarding:continue')}
                </Text>
              </Button>
            </View>
            <View className="absolute bottom-button-2 mx-4 w-full">
              <Button varient="transparent" onPress={onComplete}>
                <Text variant={TEXT_VARIANTS.body}>
                  {t('onboarding:backLogin')}
                </Text>
              </Button>
            </View>
          </>
        )}
        {state.step === STPES.attempts && (
          <View className="absolute bottom-button-3 mx-4 w-full">
            <Button onPress={onComplete}>
              <Text className="font-base">{t('onboarding:backLogin')}</Text>
            </Button>
          </View>
        )}
        {state.step === STPES.phoneAttempts && (
          <View className="absolute bottom-button-3 mx-4 w-full">
            <Button onPress={resendOTP}>
              <Text className="font-base">{t('onboarding:resendOTP')}</Text>
            </Button>
          </View>
        )}
      </Layout>
    </>
  )
}

const ReturnImg = styled(Return)`
  box-shadow: 0px 4px 12px rgba(52, 61, 69, 0.12);
`
const CrossImg = styled(Cross)`
  box-shadow: 0px 4px 12px rgba(52, 61, 69, 0.12);
`

NativeWindStyleSheet.create({
  styles: {
    'bottom-button-1': {
      bottom: 120,
    },
    'bottom-button-2': {
      bottom: 50,
    },
    'bottom-button-3': {
      bottom: 95,
    },
  },
})

export default AfterOtpPersonalIDScreen

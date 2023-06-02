/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react'
import {View, Dimensions} from 'react-native'
import {useTranslation} from 'react-i18next'
import {
  Layout,
  TCButton as Button,
  TCTextView as Text,
  TCInput as Input,
  Spacer,
} from '@Components'
import * as yup from 'yup'
import {useMutation} from '@tanstack/react-query'
import {SPACER_SIZES, TEXT_VARIANTS, BASE_URL} from '@Utils'
import styled from 'styled-components/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {Return, Cross} from '@Assets'
import {MobileNumberValidator} from '@Utils'
import {fetcher} from '@Api'
import {useStore} from '@Store'

const isSmall = Dimensions.get('window').height < 750

type Props = {
  navigation: StackNavigationProp<any>
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
          mobile_number: mobileNumber,
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
            error: 'Something went wrong. Please try after some time',
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
    if (data.case === 'Bandwidth Limit Exceeded') {
      setState({...state, step: STPES.attempts})
    }

    if (data.case === 'Invalid Attempts') {
      setState({...state, step: STPES.phoneAttempts})
    }

    if (data.case === 'Invalid Identity') {
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
          mobile_number: state.mobileNumber,
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
          setStatusError('OTP already Exist, Please wait for a minute')
          break
        case status === 509:
          setState({...state, step: STPES.attempts})
          break
        case status > 399 && status <= 500:
          setStatusError('Some Error Occurred. Please try after some time')
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
        isLoading={isResend || isLoading}>
        {isSmall ? (
          <Spacer horizontal={false} size={SPACER_SIZES.BASE * 10} />
        ) : (
          <Spacer horizontal={false} size={SPACER_SIZES.BASE * 23} />
        )}

        <Row>
          {(state.step === STPES.attempts ||
            state.step === STPES.phoneAttempts) && <ReturnImg />}
          {state.step === STPES.identityAttempts && <CrossImg />}
        </Row>
        {isSmall ? (
          <Spacer horizontal={false} size={SPACER_SIZES.BASE * 4} />
        ) : (
          <Spacer horizontal={false} size={SPACER_SIZES.BASE * 14} />
        )}

        {state.step === STPES.attempts && (
          <Heading variant={TEXT_VARIANTS.subheading}>
            {t('onboarding:phoneError')}
          </Heading>
        )}

        {state.step === STPES.phoneAttempts && (
          <Heading variant={TEXT_VARIANTS.subheading}>
            {t('onboarding:threeAttempts')}
          </Heading>
        )}

        {state.step === STPES.identityAttempts && (
          <Heading variant={TEXT_VARIANTS.subheading}>
            {t('onboarding:identityError')}
          </Heading>
        )}

        <Spacer horizontal={false} size={SPACER_SIZES.BASE * 2} />

        {state.step === STPES.attempts && (
          <Body variant={TEXT_VARIANTS.label}>
            {t('onboarding:phoneAttempts')}
          </Body>
        )}

        {state.step === STPES.phoneAttempts && (
          <Body variant={TEXT_VARIANTS.label}>{t('onboarding:tryAgain')}</Body>
        )}

        {state.step === STPES.identityAttempts && (
          <Body variant={TEXT_VARIANTS.label}>
            {t('onboarding:identityAttempts')}
          </Body>
        )}

        {state.error && (
          <Body variant={TEXT_VARIANTS.label}>{state.error}</Body>
        )}

        {state.step === STPES.identityAttempts && (
          <>
            <Spacer horizontal={false} size={SPACER_SIZES.BASE * 3} />
            <Input
              label={t('onboarding:mobileNumber')}
              schema={MobileNumberValidator}
              onChangeText={text => {
                setState({...state, mobileNumber: text})
              }}
              maxLength={10}
              value={state.mobileNumber}
            />
            {statusError && <ErrorText>{statusError}</ErrorText>}
          </>
        )}

        {state.step === STPES.identityAttempts && (
          <>
            <ButtonContainer>
              <Button
                onPress={() => {
                  OTPMutate()
                }}
                disabled={isButtonDisabled}>
                <Text variant={TEXT_VARIANTS.body}>
                  {t('onboarding:continue')}
                </Text>
              </Button>
            </ButtonContainer>
            <ButtonContainerSecondary>
              <Button varient="transparent" onPress={onComplete}>
                <Text variant={TEXT_VARIANTS.body}>
                  {t('onboarding:backLogin')}
                </Text>
              </Button>
            </ButtonContainerSecondary>
          </>
        )}
        {state.step === STPES.attempts && (
          <ButtonContainer>
            <Button onPress={onComplete}>
              <Text variant={TEXT_VARIANTS.body}>
                {t('onboarding:backLogin')}
              </Text>
            </Button>
          </ButtonContainer>
        )}
        {state.step === STPES.phoneAttempts && (
          <ButtonContainer>
            <Button onPress={resendOTP}>
              <Text variant={TEXT_VARIANTS.body}>
                {t('onboarding:resendOTP')}
              </Text>
            </Button>
          </ButtonContainer>
        )}
      </Layout>
    </>
  )
}

const ButtonContainer = styled(View)`
  position: absolute;
  bottom: 120px;
  width: ${Dimensions.get('window').width}px;
  padding-left: 32px;
  padding-right: 32px;
`
const ButtonContainerSecondary = styled(View)`
  position: absolute;
  bottom: 50px;
  width: ${Dimensions.get('window').width}px;
  padding-left: 32px;
  padding-right: 32px;
`

const ReturnImg = styled(Return)`
  box-shadow: 0px 4px 12px rgba(52, 61, 69, 0.12);
`
const CrossImg = styled(Cross)`
  box-shadow: 0px 4px 12px rgba(52, 61, 69, 0.12);
`

const Row = styled(View)`
  flex-direction: row;
  justify-content: center;
`

const Heading = styled(Text)`
  line-height: 28px;
  text-align: center;
  color: #1c1c1c;
`
const Body = styled(Text)`
  line-height: 28px;
  text-align: center;
  color: #1c1c1c;
`
const ErrorText = styled(Text)`
  font-weight: 500;
  color: #f54d3f;
  padding-left: 16px;
`

export default AfterOtpPersonalIDScreen

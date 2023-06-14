/* eslint-disable react-hooks/exhaustive-deps */

import React, {useEffect, useState} from 'react'
import {View, Dimensions, Image, Platform, Linking} from 'react-native'
import {useTranslation} from 'react-i18next'
import {
  Layout,
  TCButton as Button,
  TCTextView as Text,
  Spacer,
} from '@Components'
import {SPACER_SIZES, TEXT_VARIANTS, BASE_URL, getItem} from '@Utils'
import styled from 'styled-components/native'
import {useMutation} from '@tanstack/react-query'
import {StackNavigationProp} from '@react-navigation/stack'
import {NafaathLogo} from '@Assets'
import {useStore} from '@Store'
import {fetcher} from '@Api'
import {useFocusEffect} from '@react-navigation/native'

type Props = {
  navigation: StackNavigationProp<any>
  route: any
}

const isSmall = Dimensions.get('window').height < 750

const NafaqScreen = ({navigation, route}: Props) => {
  const {t} = useTranslation()
  const [state, setState] = useState<any>({})
  const govtId = useStore((store: any) => store.govtId)
  const [statusError, setStatusError] = useState<any>(false)

  const setOnboardingProgress = useStore(
    (store: any) => store.setOnboardingProgress,
  )

  const onBoardingProgress = useStore((store: any) => store.onBoardingProgress)

  useFocusEffect(() => {
    const data = route.params

    if (
      data?.historyPage === 'AfterNafaath' &&
      data?.type === 'app' &&
      state.redirectRef !== data.redirectRef
    ) {
      setState({
        startTime: Date.now(),
        redirectRef: data.redirectRef,
      })
      nafathPush()
      setTimeout(() => {
        let URL =
          Platform.OS === 'ios'
            ? 'nafath://request'
            : 'saf.sa.gov.nic.myid://request'

        Linking.openURL(URL)
      }, 1000)
    }

    if (
      data?.historyPage === 'AfterNafaath' &&
      data?.type === 'web' &&
      state.redirectRef !== data.redirectRef
    ) {
      setState({
        startTime: Date.now(),
        redirectRef: data.redirectRef,
      })
      nafathPush()
      setTimeout(() => {
        let URL = 'https://my.nafath.sa/login'
        Linking.openURL(URL)
      }, 1000)
    }
  })

  const {
    isLoading: isNafadLoading,
    data: nafathPushData,
    mutate: nafathPush,
    reset: nafathPushReset,
  } = useMutation({
    mutationFn: async () => {
      let journeySecrets
      let journeySecretsData = await getItem('journeySecrets')
      if (journeySecretsData) {
        journeySecrets = JSON.parse(journeySecretsData)
      }
      let req: any = await fetcher(BASE_URL + '/onboarding/id/ekyc', {
        method: 'POST',
        body: {
          id: govtId,
        },
        token: journeySecrets.access_token,
      })
      let res = await req.json()

      return res
    },
  })

  const {
    data: nafathPullData,
    mutate: nafathPull,
    reset: nafathPullReset,
  } = useMutation({
    mutationFn: async () => {
      let journeySecrets
      let journeySecretsData = await getItem('journeySecrets')
      if (journeySecretsData) {
        journeySecrets = JSON.parse(journeySecretsData)
      }
      let req: any = await fetcher(BASE_URL + '/onboarding/id/ekyc/verify', {
        method: 'POST',
        body: {
          id: govtId,
          random: nafathPushData?.random_number,
          transaction_id: nafathPushData?.transaction_id,
        },
        token: journeySecrets.access_token,
      })
      let res = await req.json()

      return res
    },
  })

  useEffect(() => {
    if (nafathPushData?.transaction_id && nafathPushData?.random_number) {
      setState({
        ...state,
        transectionID: nafathPushData?.transaction_id,
        randomVal: nafathPushData?.random_number,
      })
      setTimeout(() => {
        nafathPull()
      }, 5000)
    } else {
      const status = nafathPushData?.status
      switch (true) {
        case status === 409:
          setStatusError(
            'Nafaath Request already Exist, Please wait for two minutes',
          )
          break
        case status === 502:
          setStatusError(
            'Could not connect with nafaath system, please try after some time',
          )
          break
      }
    }
  }, [nafathPushData, nafathPushData?.transaction_id])

  useEffect(() => {
    let timer: any = null
    if (nafathPullData?.kyc_status && nafathPullData.kyc_status === 'SUCCESS') {
      if (nafathPullData?.name_mismatch) {
        setOnboardingProgress(true, true, nafathPullData?.key_details)
        navigation.navigate('NameVerification', {
          key_details: nafathPullData,
        })
      } else {
        setOnboardingProgress({
          ...onBoardingProgress,
          isOTPVerified: true,
          isNafathVerified: true,
          kycData: nafathPullData?.key_details,
        })
        setOnboardingProgress(true, true, nafathPullData?.key_details)
        navigation.navigate('personalInfo', {
          key_details: nafathPullData,
        })
      }
    } else {
      if (state.startTime && Date.now() - state.startTime > 90000) {
        nafathPushReset()
        nafathPullReset()
        return navigation.navigate('AfterNafaath')
      } else if (
        nafathPullData?.kyc_status &&
        nafathPullData.kyc_status === 'PENDING'
      ) {
        timer = setTimeout(() => {
          nafathPull()
        }, 15000)
      } else if (
        nafathPullData?.kyc_status &&
        nafathPullData.kyc_status === 'FAIL'
      ) {
        nafathPushReset()
        nafathPullReset()
        return navigation.navigate('AfterNafaath')
      }
      timer = setTimeout(() => {
        nafathPull()
      }, 15000)
    }

    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [nafathPullData])

  const onRedirectApp = () => {
    let URL =
      Platform.OS === 'ios'
        ? 'nafath://request'
        : 'saf.sa.gov.nic.myid://request'

    Linking.openURL(URL)
  }

  const onRedirectWeb = () => {
    let URL = 'https://my.nafath.sa/login'
    Linking.openURL(URL)
  }

  const onRetry = () => {
    setStatusError(false)
    setState({...state, startTime: Date.now()})
    nafathPush()
  }

  useEffect(() => {
    setState({...state, startTime: Date.now()})
    nafathPush()
  }, [])

  return (
    <>
      <Layout isLoading={isNafadLoading} isHeader={false}>
        <Row>
          <NafaaqImg source={NafaathLogo} />
        </Row>
        {!state.transectionID || !state.randomVal ? (
          <>
            <Body variant={TEXT_VARIANTS.label}>
              {t('onboarding:redirectNafath')}
            </Body>
            {statusError && (
              <>
                <Spacer size={SPACER_SIZES.BASE * 2} />
                <ErrorText>{statusError}</ErrorText>

                <ButtonContainer>
                  <Button onPress={onRetry}>
                    <Text variant={TEXT_VARIANTS.body}>
                      {t('onboarding:retry')}
                    </Text>
                  </Button>
                </ButtonContainer>
              </>
            )}
          </>
        ) : (
          <>
            <CenterHeading variant={TEXT_VARIANTS.subheading}>
              {t('onboarding:verificationThroughNafath')}
            </CenterHeading>
            <Spacer size={SPACER_SIZES.BASE * (isSmall ? 1 : 4)} />
            <Body variant={TEXT_VARIANTS.label}>
              {t('onboarding:authCode')}
            </Body>
            <CircleContainer>
              <Circle>
                <Text>{state.randomVal}</Text>
              </Circle>
            </CircleContainer>
            <Body variant={TEXT_VARIANTS.label}>
              {t('onboarding:selectCode')}
            </Body>

            <ButtonContainer>
              <Button onPress={onRedirectApp}>
                <Text variant={TEXT_VARIANTS.body}>
                  {t('onboarding:nafathByApp')}
                </Text>
              </Button>
            </ButtonContainer>
            <ButtonContainerSecond>
              <Button onPress={onRedirectWeb} varient="transparent">
                <Text variant={TEXT_VARIANTS.body}>
                  {t('onboarding:nafathByWeb')}
                </Text>
              </Button>
            </ButtonContainerSecond>
          </>
        )}
      </Layout>
    </>
  )
}

const ButtonContainer = styled(View)`
  position: absolute;
  bottom: 114px;
  width: ${Dimensions.get('window').width}px;
  padding-left: 32px;
  padding-right: 32px;
`

const ButtonContainerSecond = styled(View)`
  position: absolute;
  bottom: 34px;
  width: ${Dimensions.get('window').width}px;
  padding-left: 32px;
  padding-right: 32px;
`
const NafaaqImg = styled(Image)`
  height: 135px;
  width: 135px;
  margin-top: ${isSmall ? 10 : 50}px;
  margin-bottom: ${isSmall ? 10 : 34}px;
`

const Row = styled(View)`
  flex-direction: row;
  justify-content: center;
`

const Body = styled(Text)`
  line-height: 28px;
  text-align: center;
  color: #4f4f4f;
`

const CenterHeading = styled(Text)`
  text-align: center;
  font-weight: bold;
`

const CircleContainer = styled(View)`
  display: flex;
  justify-content: center;
  flex-direction: row;
`
const Circle = styled(View)`
  background-color: #f8d03b;
  border-radius: 32px;
  height: 64px;
  width: 64px;
  font-size: 30px;
  font-weight: bold;
  justify-content: center;
  align-items: center;
`
const ErrorText = styled(Text)`
  font-weight: 500;
  color: #f54d3f;
  padding-left: 16px;
  text-align: center;
`

export default NafaqScreen

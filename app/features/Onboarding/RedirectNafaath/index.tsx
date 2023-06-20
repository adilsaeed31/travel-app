/* eslint-disable react-hooks/exhaustive-deps */

import React, {useEffect, useState} from 'react'
import {View, Image, Platform, Linking} from 'react-native'
import {useTranslation} from 'react-i18next'
import cn from 'classnames'
import {NativeWindStyleSheet} from 'nativewind'

import {Layout, TCButton as Button, TCTextView as Text} from '@Components'
import {BASE_URL, getItem, screenHeight} from '@Utils'
import {useMutation} from '@tanstack/react-query'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {NafaathLogoImg} from '@Assets'
import {useStore} from '@Store'
import {fetcher} from '@Api'
import {useFocusEffect} from '@react-navigation/native'

type Props = {
  navigation: NativeStackNavigationProp<any>
  route: any
}

const isSmall = screenHeight < 750

const NafaqScreen = ({navigation, route}: Props) => {
  const {t} = useTranslation()
  const [state, setState] = useState<any>({})
  const [statusError, setStatusError] = useState<any>(false)
  const govtId = useStore((store: any) => store.govtId)

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
          setStatusError('onboarding:nafathExist')
          break
        case status === 502:
          setStatusError('onboarding:nafathNotConnect')
          break
      }
    }
  }, [nafathPushData, nafathPushData?.transaction_id])

  useEffect(() => {
    let timer: any = null
    if (nafathPullData?.kyc_status && nafathPullData.kyc_status === 'SUCCESS') {
      if (nafathPullData?.name_mismatch) {
        setOnboardingProgress({
          ...onBoardingProgress,
          isOTPVerified: true,
          isNafathVerified: true,
          kycData: nafathPullData?.key_details,
        })

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

        navigation.navigate('PersonalInfo', {
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
      <Layout isScrollable={false} isLoading={isNafadLoading} isHeader={false}>
        <View className="flex-row justify-center">
          <Image
            className={cn({
              'h-[135]': true,
              'w-[135]': true,
              'mt-[30]': isSmall,
              'mt-[90]': !isSmall,
              'mb-[10]': isSmall,
              'mb-[34]': !isSmall,
            })}
            source={NafaathLogoImg}
          />
        </View>

        {!state.transectionID || !state.randomVal ? (
          <>
            <Text className="text-center text-tc-gray text-sm">
              {t('onboarding:redirectNafath')}
            </Text>
            {statusError && (
              <>
                <Text className="text-center my-4 text-tc-danger font-bold">
                  {t(statusError)}
                </Text>

                <View className="absolute bottom-button-3 mx-4 w-full">
                  <Button onPress={onRetry}>
                    <Text className="font-base">{t('common:retry')}</Text>
                  </Button>
                </View>
              </>
            )}
          </>
        ) : (
          <>
            <Text className="text-center font-bold text-2xl">
              {t('onboarding:verificationThroughNafath')}
            </Text>
            <Text
              className={cn({
                'text-center': true,
                'text-tc-gray': true,
                'text-sm': true,
                'mt-[8]': isSmall,
                'mt-[32]': !isSmall,
              })}>
              {t('onboarding:authCode')}
            </Text>
            <View className="justify-center content-center flex-row">
              <View className=" bg-tc-primary rounded-t-[32] rounded-b-[32] h-16 w-16 text-3xl font-bold justify-center content-center">
                <Text className="text-center ">{state.randomVal}</Text>
              </View>
            </View>
            <Text className="text-center text-tc-gray text-sm mb-4">
              {t('onboarding:selectCode')}
            </Text>
            <View className="absolute bottom-button-1 mx-4 w-full">
              <Button onPress={onRedirectApp}>
                <Text className="font-base">{t('onboarding:nafathByApp')}</Text>
              </Button>
            </View>
          </>
        )}
      </Layout>
    </>
  )
}

NativeWindStyleSheet.create({
  styles: {
    'bottom-button-1': {
      bottom: 95,
    },
  },
})

export default NafaqScreen

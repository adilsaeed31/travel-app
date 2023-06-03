/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */

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

const NafaqScreen = ({navigation, route}: Props) => {
  const {t} = useTranslation()
  const [showDone, setShowDone] = useState<boolean>(false)
  const [state, setState] = useState<any>({})
  const govtId = useStore((store: any) => store.govtId)

  useFocusEffect(() => {
    const data = route.params

    console.log(state.redirectRef, data?.redirectRef)
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
    console.log(
      '257842365784365746111111111',
      nafathPushData,
      nafathPushData?.transaction_id,
      nafathPushData?.random_number,
    )
    if (nafathPushData?.transaction_id && nafathPushData?.random_number) {
      setState({
        ...state,
        transectionID: nafathPushData?.transaction_id,
        randomVal: nafathPushData?.random_number,
      })
      nafathPull()
    }
  }, [nafathPushData, nafathPushData?.transaction_id])

  useEffect(() => {
    if (nafathPullData?.status < 400) {
      setShowDone(true)
    } else {
      if (state.startTime && Date.now() - state.startTime > 10000) {
        nafathPushReset()
        nafathPullReset()
        return navigation.navigate('AfterNafaath')
      }
      setTimeout(() => {
        nafathPull()
      }, 15000)
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

  useEffect(() => {
    setState({...state, startTime: Date.now()})
    nafathPush()
  }, [])

  return (
    <>
      <Layout isLoading={isNafadLoading}>
        <Row>
          <NafaaqImg source={NafaathLogo} />
        </Row>
        {!state.transectionID || !state.randomVal ? (
          <Body variant={TEXT_VARIANTS.label}>
            {t('onboarding:redirectNafath')}
          </Body>
        ) : (
          <>
            <CenterHeading variant={TEXT_VARIANTS.subheading}>
              {t('onboarding:verificationThroughNafath')}
            </CenterHeading>
            <Spacer size={SPACER_SIZES.BASE * 4} />
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
        {showDone ? (
          <ButtonContainer>
            <Button
              onPress={() => {
                navigation.navigate('personalInfo')
              }}>
              <Text variant={TEXT_VARIANTS.body}>
                {t('onboarding:continue')}
              </Text>
            </Button>
          </ButtonContainer>
        ) : null}
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
  margin-top: 90px;
  margin-bottom: 34px;
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

export default NafaqScreen

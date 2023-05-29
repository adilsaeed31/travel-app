import React, {useEffect, useState} from 'react'
import {View, Dimensions, Image, Platform, Linking} from 'react-native'
import {useTranslation} from 'react-i18next'
import {
  Layout,
  TCButton as Button,
  TCTextView as Text,
  Spacer,
} from '@Components'
import {SPACER_SIZES, TEXT_VARIANTS} from '@Utils'
import styled from 'styled-components/native'

import {StackNavigationProp} from '@react-navigation/stack'
import {NafaathLogo} from '@Assets'

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

type Props = {
  navigation: StackNavigationProp<{
    AfterNafaath: undefined
    PersonalID: undefined
    personalInfo: undefined
  }>
}

const NafaqScreen = ({navigation}: Props) => {
  const {t} = useTranslation()
  const [loader, setLoader] = useState<boolean>(false)
  const [showNumber, setShowNumber] = useState<boolean>(false)
  const [showDone, setShowDone] = useState<boolean>(false)

  const onRedirectApp = () => {
    let URL =
      Platform.OS === 'ios'
        ? 'nafath://request'
        : 'saf.sa.gov.nic.myid://request'

    Linking.openURL(URL)
    setLoader(false)
    setShowDone(true)
    setShowNumber(false)
  }

  const onRedirectWeb = () => {
    let URL =
      Platform.OS === 'ios'
        ? 'nafath://request'
        : 'saf.sa.gov.nic.myid://request'

    Linking.openURL(URL)
    setLoader(false)
    setShowDone(true)
    setShowNumber(false)
  }

  useEffect(() => {
    setTimeout(() => {
      setLoader(true)
    }, 1500)
  }, [])

  useEffect(() => {
    if (loader) {
      setTimeout(() => {
        setShowNumber(true)
      }, 3000)
    }
  }, [loader])

  useEffect(() => {
    if (showNumber) {
      setLoader(false)
    }
  }, [showNumber])

  return (
    <>
      <Layout
        isBack={true}
        isLoading={loader}
        onBack={() => {
          navigation.push('PersonalID')
        }}>
        <Row>
          <NafaaqImg source={NafaathLogo} />
        </Row>
        {!showNumber ? (
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
                <Text>80</Text>
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
                setLoader(true)
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

export default NafaqScreen

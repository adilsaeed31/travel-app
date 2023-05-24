import React from 'react'
import {View, Dimensions, Image} from 'react-native'
import {useTranslation} from 'react-i18next'
import {Layout, TCButton as Button, TCTextView as Text} from '@Components'
import {TEXT_VARIANTS} from '@Utils'
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

type Props = {
  navigation: StackNavigationProp<{
    AfterNafaath: undefined
    PersonalID: undefined
  }>
}

const NafaqScreen = ({navigation}: Props) => {
  const {t} = useTranslation()

  const onComplete = () => {
    navigation.navigate('AfterNafaath')
  }

  return (
    <>
      <Layout
        isBack={true}
        onBack={() => {
          navigation.push('PersonalID')
        }}>
        <Row>
          <NafaaqImg source={NafaathLogo} />
        </Row>
        <Body variant={TEXT_VARIANTS.label}>
          {t('onboarding:redirectNafath')}
        </Body>
        <ButtonContainer>
          <Button onPress={onComplete}>
            <Text variant={TEXT_VARIANTS.body}>
              {t('onboarding:nafathByApp')}
            </Text>
          </Button>
        </ButtonContainer>
        <ButtonContainerSecond>
          <Button onPress={onComplete} varient="transparent">
            <Text variant={TEXT_VARIANTS.body}>
              {t('onboarding:nafathByWeb')}
            </Text>
          </Button>
        </ButtonContainerSecond>
      </Layout>
    </>
  )
}

export default NafaqScreen

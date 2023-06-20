import React from 'react'
import {View, Dimensions} from 'react-native'
import {useTranslation} from 'react-i18next'
import {
  Layout,
  TCButton as Button,
  TCTextView as Text,
  Spacer,
} from '@Components'
import {SPACER_SIZES, TEXT_VARIANTS} from '@Utils'
import styled from 'styled-components/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {Cross} from '@Assets'

const isSmall = Dimensions.get('window').height < 750

const ButtonContainer = styled(View)`
  position: absolute;
  bottom: 114px;
  width: ${Dimensions.get('window').width}px;
  padding-left: 32px;
  padding-right: 32px;
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

const ButtonContainerSecond = styled(View)`
  position: absolute;
  bottom: 34px;
  width: ${Dimensions.get('window').width}px;
  padding-left: 32px;
  padding-right: 32px;
`

type Props = {
  navigation: NativeStackNavigationProp<any>
}

const PersonalIdScreen = ({navigation}: Props) => {
  const {t} = useTranslation()

  const onRedirectApp = () => {
    navigation.navigate('RedirectNafaath', {
      historyPage: 'AfterNafaath',
      type: 'app',
      redirectRef: Math.floor(Math.random() * 10000000),
    })
  }

  const onRedirectWeb = () => {
    navigation.navigate('RedirectNafaath', {
      historyPage: 'AfterNafaath',
      type: 'web',
      redirectRef: Math.floor(Math.random() * 10000000),
    })
  }

  return (
    <>
      <Layout isHeader={false} isBackground={false}>
        {isSmall ? (
          <Spacer horizontal={false} size={SPACER_SIZES.BASE * 10} />
        ) : (
          <Spacer horizontal={false} size={SPACER_SIZES.BASE * 23} />
        )}
        <Row>
          <CrossImg />
        </Row>
        {isSmall ? (
          <Spacer horizontal={false} size={SPACER_SIZES.BASE * 4} />
        ) : (
          <Spacer horizontal={false} size={SPACER_SIZES.BASE * 14} />
        )}

        <Heading variant={TEXT_VARIANTS.subheading}>
          {t('onboarding:errorMessage')}
        </Heading>

        <Spacer horizontal={false} size={SPACER_SIZES.BASE * 2} />
        <Body variant={TEXT_VARIANTS.label}>
          {t('onboarding:noNafathInfo')}
        </Body>
        <Spacer horizontal={false} size={SPACER_SIZES.BASE * 1} />
        <Body variant={TEXT_VARIANTS.label}>{t('onboarding:tryAgain')}</Body>
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
      </Layout>
    </>
  )
}

export default PersonalIdScreen

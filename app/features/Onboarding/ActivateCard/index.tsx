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
import {TravelCard} from '@Assets'

const isSmall = Dimensions.get('window').height < 750

const ButtonContainer = styled(View)`
  position: absolute;
  bottom: 50px;
  width: ${Dimensions.get('window').width}px;
  padding-left: 32px;
  padding-right: 32px;
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
  navigation: NativeStackNavigationProp<{PersonalID: undefined}>
}

const PersonalIdScreen = ({navigation}: Props) => {
  const {t} = useTranslation()
  const onComplete = () => {
    navigation.navigate('PersonalID')
  }

  return (
    <>
      <Layout isHeader={false} backgroundIndex={2}>
        {isSmall ? (
          <Spacer horizontal={false} size={SPACER_SIZES.BASE * 5} />
        ) : (
          <Spacer horizontal={false} size={SPACER_SIZES.BASE * 19} />
        )}
        <Row>
          <TravelCard />
        </Row>
        <Spacer horizontal={false} size={SPACER_SIZES.BASE * 2} />

        <Body variant={TEXT_VARIANTS.body}>
          {t('onboarding:applicationSubmitted')}
        </Body>

        <ButtonContainer>
          <Button onPress={onComplete}>
            <Text variant={TEXT_VARIANTS.body}>
              {t('onboarding:activeCard')}
            </Text>
          </Button>
        </ButtonContainer>
      </Layout>
    </>
  )
}

export default PersonalIdScreen

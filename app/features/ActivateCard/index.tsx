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
import {StackNavigationProp} from '@react-navigation/stack'
import {TravelCard} from '@Assets'

const StyledButton = styled(Button)`
  margin-left: 32px;
  margin-right: 32px;
`

const ButtonContainer = styled(View)`
  position: absolute;
  bottom: 50px;
  width: ${Dimensions.get('window').width}px;
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
  navigation: StackNavigationProp<{PersonalID: undefined}>
}

const PersonalIdScreen = ({navigation}: Props) => {
  const {t} = useTranslation()
  const onComplete = () => {
    navigation.navigate('PersonalID')
  }

  return (
    <>
      <Layout isHeader={false} backgroundIndex={2}>
        <Spacer horizontal={false} size={SPACER_SIZES.BASE * 19} />
        <Row>
          <TravelCard />
        </Row>
        <Spacer horizontal={false} size={SPACER_SIZES.BASE * 2} />

        <Body variant={TEXT_VARIANTS.body}>
          {t('onboarding:applicationSubmitted')}
        </Body>

        <ButtonContainer>
          <StyledButton onPress={onComplete}>
            <Text variant={TEXT_VARIANTS.body}>
              {t('onboarding:activeCard')}
            </Text>
          </StyledButton>
        </ButtonContainer>
      </Layout>
    </>
  )
}

export default PersonalIdScreen

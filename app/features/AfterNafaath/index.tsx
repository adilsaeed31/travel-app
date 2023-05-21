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
import {Cross} from '@Assets'

const StyledButton = styled(Button)`
  margin-left: 32px;
  margin-right: 32px;
`

const ButtonContainer = styled(View)`
  position: absolute;
  bottom: 114px;
  width: ${Dimensions.get('window').width}px;
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
`

type Props = {
  navigation: StackNavigationProp<{RedirectNafaaq: undefined}>
}

const PersonalIdScreen = ({navigation}: Props) => {
  const {t} = useTranslation()
  const onComplete = () => {
    navigation.navigate('RedirectNafaaq')
  }

  return (
    <>
      <Layout isHeader={false} isBackground={false}>
        <Spacer horizontal={false} size={SPACER_SIZES.BASE * 23} />
        <Row>
          <CrossImg />
        </Row>
        <Spacer horizontal={false} size={SPACER_SIZES.BASE * 14} />

        <Heading variant={TEXT_VARIANTS.subheading}>
          {t('Error message')}
        </Heading>

        <Spacer horizontal={false} size={SPACER_SIZES.BASE * 2} />
        <Body variant={TEXT_VARIANTS.label}>
          {t('Sorry we couldn’t manage to get the information from Nafath')}
        </Body>
        <Spacer horizontal={false} size={SPACER_SIZES.BASE * 1} />
        <Body variant={TEXT_VARIANTS.label}>{t('Please try again')}</Body>
        <ButtonContainer>
          <StyledButton onPress={onComplete}>
            <Text variant={TEXT_VARIANTS.body}>
              {t('Access by Nafath App')}
            </Text>
          </StyledButton>
        </ButtonContainer>
        <ButtonContainerSecond>
          <StyledButton onPress={onComplete} varient="transparent">
            <Text variant={TEXT_VARIANTS.body}>
              {t('Access by Nafath web portal')}
            </Text>
          </StyledButton>
        </ButtonContainerSecond>
      </Layout>
    </>
  )
}

export default PersonalIdScreen

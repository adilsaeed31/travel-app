import React, {useContext} from 'react'
import {View, Dimensions, Text as TextNumber} from 'react-native'
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
import {CheckWarning} from '@Assets'
import {AppProviderProps, AppContext} from '@Context'

const isSmall = Dimensions.get('window').height < 750

const StyledButton = styled(Button)`
  margin-left: 32px;
  margin-right: 32px;
`

const ButtonContainer = styled(View)`
  position: absolute;
  bottom: 50px;
  width: ${Dimensions.get('window').width}px;
`

const CheckWarningImg = styled(CheckWarning)`
  box-shadow: 0px 4px 12px rgba(52, 61, 69, 0.12);
`

const Row = styled(View)`
  flex-direction: row;
  justify-content: center;
`

const Bodydark = styled(Text)<{isRTL: boolean | undefined}>`
  line-height: 28px;
  text-align: center;
  color: #1c1c1c;
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
  const {isRTL} = useContext<AppProviderProps>(AppContext)
  const onComplete = () => {
    navigation.navigate('PersonalID')
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
          <CheckWarningImg />
        </Row>
        {isSmall ? (
          <Spacer horizontal={false} size={SPACER_SIZES.BASE * 4} />
        ) : (
          <Spacer horizontal={false} size={SPACER_SIZES.BASE * 14} />
        )}

        <Body variant={TEXT_VARIANTS.body}>{t('onboarding:confirmCall')}</Body>
        <Spacer size={SPACER_SIZES.BASE * 2} />
        <Bodydark variant={TEXT_VARIANTS.body} isRTL={isRTL}>
          <>
            <>{t('onboarding:ref')}</>
            <TextNumber>{' 1234-5678-9123'}</TextNumber>
          </>
        </Bodydark>
        <ButtonContainer>
          <StyledButton onPress={onComplete}>
            <Text variant={TEXT_VARIANTS.body}>
              {t('onboarding:returnLogin')}
            </Text>
          </StyledButton>
        </ButtonContainer>
      </Layout>
    </>
  )
}

export default PersonalIdScreen

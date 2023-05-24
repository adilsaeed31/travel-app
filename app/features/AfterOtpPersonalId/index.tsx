import React, {useState} from 'react'
import {View, Dimensions} from 'react-native'
import {useTranslation} from 'react-i18next'
import {
  Layout,
  TCButton as Button,
  TCTextView as Text,
  TCInput as Input,
  Spacer,
} from '@Components'
import {SPACER_SIZES, TEXT_VARIANTS} from '@Utils'
import styled from 'styled-components/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {Return, Cross} from '@Assets'
import {MobileNumberValidator} from '@Utils'

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

const ReturnImg = styled(Return)`
  box-shadow: 0px 4px 12px rgba(52, 61, 69, 0.12);
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

type Props = {
  navigation: StackNavigationProp<{RedirectNafaaq: undefined}>
}

enum STPES {
  attempts,
  identityAttempts,
  phoneAttempts,
}

const PersonalIdScreen = ({navigation}: Props) => {
  const {t} = useTranslation()
  const [state, setState] = useState({step: STPES.attempts})

  const onComplete = () => {
    if (state.step === STPES.attempts) {
      setState({...state, step: STPES.identityAttempts})
    }
    if (state.step === STPES.identityAttempts) {
      setState({...state, step: STPES.phoneAttempts})
    }
    if (state.step === STPES.phoneAttempts) {
      navigation.navigate('RedirectNafaaq')
    }
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
          {(state.step === STPES.attempts ||
            state.step === STPES.phoneAttempts) && <ReturnImg />}
          {state.step === STPES.identityAttempts && <CrossImg />}
        </Row>
        {isSmall ? (
          <Spacer horizontal={false} size={SPACER_SIZES.BASE * 4} />
        ) : (
          <Spacer horizontal={false} size={SPACER_SIZES.BASE * 14} />
        )}

        {state.step === STPES.attempts && (
          <Heading variant={TEXT_VARIANTS.subheading}>
            {t('onboarding:threeAttempts')}
          </Heading>
        )}

        {state.step === STPES.identityAttempts && (
          <Heading variant={TEXT_VARIANTS.subheading}>
            {t('onboarding:identityError')}
          </Heading>
        )}

        {state.step === STPES.phoneAttempts && (
          <Heading variant={TEXT_VARIANTS.subheading}>
            {t('onboarding:phoneError')}
          </Heading>
        )}

        <Spacer horizontal={false} size={SPACER_SIZES.BASE * 2} />
        {state.step === STPES.attempts && (
          <Body variant={TEXT_VARIANTS.label}>{t('onboarding:tryAgain')}</Body>
        )}

        {state.step === STPES.identityAttempts && (
          <Body variant={TEXT_VARIANTS.label}>
            {t('onboarding:identityAttempts')}
          </Body>
        )}

        {state.step === STPES.phoneAttempts && (
          <Body variant={TEXT_VARIANTS.label}>
            {t('onboarding:phoneAttempts')}
          </Body>
        )}
        {state.step === STPES.identityAttempts && (
          <>
            <Spacer horizontal={false} size={SPACER_SIZES.BASE * 3} />
            <Input
              label={t('onboarding:mobileNumber')}
              schema={MobileNumberValidator}
              onChangeText={text => {
                console.log(text)
              }}
            />
          </>
        )}

        <ButtonContainer>
          <StyledButton onPress={onComplete}>
            <Text variant={TEXT_VARIANTS.body}>
              {t('onboarding:backLogin')}
            </Text>
          </StyledButton>
        </ButtonContainer>
      </Layout>
    </>
  )
}

export default PersonalIdScreen

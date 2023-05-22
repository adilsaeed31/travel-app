import React, {useEffect, useState, useContext} from 'react'
import {
  TouchableOpacity,
  View,
  Keyboard,
  Dimensions,
  Platform,
} from 'react-native'
import {useTranslation} from 'react-i18next'
import {
  Layout,
  TCButton as Button,
  TCTextView as Text,
  TCInput as Input,
  TCCheckbox as Checkbox,
  Spacer,
} from '@Components'
import {SPACER_SIZES, TEXT_VARIANTS} from '@Utils'
import styled from 'styled-components/native'
import {GovtIdValidator, MobileNumberValidator} from '@Utils'
import {StackNavigationProp} from '@react-navigation/stack'
import {AppProviderProps, AppContext} from '@Context'

const StyledButton = styled(Button)`
  margin-left: 32px;
  margin-right: 32px;
`

const ButtonContainer = styled(View)`
  position: absolute;
  bottom: 107px;
  width: ${Dimensions.get('window').width}px;
`

const DisclaimerView = styled(View)<{isKeyboardVisible: boolean}>`
  position: ${props => (props.isKeyboardVisible ? 'static' : 'absolute')};
  bottom: ${props => (props.isKeyboardVisible ? '0px' : '195px')};
  margin-horizontal: ${props => (props.isKeyboardVisible ? '0px' : '32px')};
  margin-top: 16px;
`

const UnderlineText = styled(Text)`
  text-decoration-line: underline;
  color: rgba(63, 61, 54, 0.8);
  line-height: 16px;
`

const LoginText = styled(Text)`
  color: #3f3d36;
  line-height: 16px;
  font-weight: 700;
`

const TermText = styled(Text)`
  color: rgba(63, 61, 54, 0.8);
  line-height: 16px;
`

const AgreeText = styled(Text)`
  color: rgba(63, 61, 54, 0.8);
`

const Row = styled(View)`
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-top: 3px;
`

const StickyButtonContainer = styled.View<{keyboardHeight: Number}>`
  position: absolute;
  bottom: ${props =>
    Platform.OS == 'ios' ? props.keyboardHeight + 'px' : '0px'};
  left: 0;
  right: 0;
  align-items: center;
`

const StickyButton = styled.TouchableOpacity`
  background-color: #f8d03b;
  border: 1px solid #f8d03b;
  width: 100%;
  min-height: 56px;
  align-items: center;
  justify-content: center;
`

const RowCenter = styled.View<{isKeyboardVisible: boolean}>`
  position: ${props => (props.isKeyboardVisible ? 'static' : 'absolute')};
  bottom: ${props => (props.isKeyboardVisible ? '0px' : '51px')};
  flex-direction: row;

  justify-content: center;
  margin-top: ${props => (props.isKeyboardVisible ? '24px' : '0px')};
  width: ${props =>
    props.isKeyboardVisible ? '100%' : Dimensions.get('window').width + 'px'};
`

const Terms = () => {
  const {t} = useTranslation()
  const {isRTL} = useContext<AppProviderProps>(AppContext)
  return (
    <View>
      <Row>
        <TermText variant={TEXT_VARIANTS.caption}>
          {t("I've read and accept the ") + Platform.OS}
        </TermText>
        <TouchableOpacity onPress={() => {}}>
          <UnderlineText variant={TEXT_VARIANTS.caption}>
            {t('Disclaimer')}
          </UnderlineText>
        </TouchableOpacity>
        <TermText variant={TEXT_VARIANTS.caption}>{t(' and ')}</TermText>
      </Row>
      <View>
        <TouchableOpacity onPress={() => {}}>
          <UnderlineText variant={TEXT_VARIANTS.caption}>
            {t(' Terms & Conditions')}
          </UnderlineText>
        </TouchableOpacity>
      </View>
    </View>
  )
}

interface AlreadyAccountProps {
  isKeyboardVisible: boolean
}

const AlreadyAccount = ({isKeyboardVisible}: AlreadyAccountProps) => {
  const {t} = useTranslation()

  return (
    <RowCenter isKeyboardVisible={isKeyboardVisible}>
      <TermText variant={TEXT_VARIANTS.caption}>
        {t('Already have account? ')}
      </TermText>
      <TouchableOpacity onPress={() => {}}>
        <LoginText variant={TEXT_VARIANTS.caption}>{t('Login')}</LoginText>
      </TouchableOpacity>
    </RowCenter>
  )
}

type Props = {
  navigation: StackNavigationProp<{OtpPersonalId: undefined}>
}

const PersonalIdScreen = ({navigation}: Props) => {
  const {t} = useTranslation()
  const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(false)
  const [keyboardHeight, setKeyboardHeight] = useState<Number>(0)

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      e => {
        setKeyboardVisible(true)
        setKeyboardHeight(e.endCoordinates.height)
      },
    )

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false)
      },
    )

    return () => {
      keyboardDidShowListener.remove()
      keyboardDidHideListener.remove()
    }
  }, [])

  const onComplete = () => {
    navigation.navigate('OtpPersonalId')
  }

  return (
    <>
      <Layout>
        <Spacer horizontal={false} size={SPACER_SIZES.BASE * 3} />
        <Text variant={TEXT_VARIANTS.heading}>{t('Credentials')}</Text>
        <Spacer horizontal={false} size={SPACER_SIZES.BASE * 3} />
        <Input
          label={t('National ID / Iqama')}
          schema={GovtIdValidator}
          onChangeText={text => {
            console.log(text)
          }}
        />
        <Spacer horizontal={false} size={SPACER_SIZES.BASE * 4} />
        <Input
          label={t('Mobile')}
          schema={MobileNumberValidator}
          onChangeText={text => {
            console.log(text)
          }}
        />

        <DisclaimerView isKeyboardVisible={isKeyboardVisible}>
          <Checkbox
            label={
              <AgreeText variant={TEXT_VARIANTS.caption}>
                {t('I agree to receive email from SAIB')}
              </AgreeText>
            }
          />
          <Checkbox label={<Terms />} />
        </DisclaimerView>

        {!isKeyboardVisible && (
          <ButtonContainer>
            <StyledButton onPress={onComplete}>
              <Text variant={TEXT_VARIANTS.body}>{t('Continue')}</Text>
            </StyledButton>
          </ButtonContainer>
        )}
        <AlreadyAccount isKeyboardVisible={isKeyboardVisible} />
      </Layout>
      {isKeyboardVisible && (
        <StickyButtonContainer keyboardHeight={keyboardHeight}>
          <StickyButton>
            <Text variant={TEXT_VARIANTS.body}>{t('Continue')}</Text>
          </StickyButton>
        </StickyButtonContainer>
      )}
    </>
  )
}

export default PersonalIdScreen

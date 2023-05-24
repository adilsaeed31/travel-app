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

const isSmall = Dimensions.get('window').height < 750

const StyledButton = styled(Button)`
  margin-left: ${isSmall ? '0px' : '32px'};
  margin-right: ${isSmall ? '0px' : '32px'};
  margin-top: ${isSmall ? '24px' : '0px'};
  margin-bottom: ${isSmall ? '24px' : '0px'};
`

const ButtonContainer = styled(View)`
  position: ${isSmall ? 'static' : 'absolute'};
  bottom: ${isSmall ? '0px' : '107px'};
  width: ${isSmall ? '100%' : Dimensions.get('window').width + 'px'};
`

const DisclaimerView = styled(View)<{
  isKeyboardVisible: boolean
  isRTL?: boolean
}>`
  position: ${props =>
    props.isKeyboardVisible || isSmall ? 'static' : 'absolute'};
  bottom: ${props => (props.isKeyboardVisible || isSmall ? '0px' : '195px')};
  margin-left: ${props =>
    props.isKeyboardVisible || props.isRTL || isSmall ? '0px' : '32px'};
  margin-right: ${props =>
    props.isKeyboardVisible || props.isRTL || isSmall ? '0px' : '32px'};
  right: ${props => (props.isRTL ? '32px' : '0px')};
  left: ${props => (props.isRTL ? '32px' : '0px')};
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

const Row = styled(View)<{isRTL: boolean | undefined}>`
  flex-direction: ${({isRTL}) => (isRTL ? 'row-reverse' : 'row')};
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
      <Row isRTL={isRTL}>
        <TermText variant={TEXT_VARIANTS.caption}>
          {t('onboarding:readAccept')}
        </TermText>
        <TouchableOpacity onPress={() => {}}>
          <UnderlineText variant={TEXT_VARIANTS.caption}>
            {t('onboarding:disclaimer')}
          </UnderlineText>
        </TouchableOpacity>
        <TermText variant={TEXT_VARIANTS.caption}>
          {t('onboarding:and')}
        </TermText>
      </Row>
      <View>
        <TouchableOpacity onPress={() => {}}>
          <UnderlineText variant={TEXT_VARIANTS.caption}>
            {t('onboarding:termsConditions')}
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
        {t('onboarding:alreadyAccount')}
      </TermText>
      <TouchableOpacity onPress={() => {}}>
        <LoginText variant={TEXT_VARIANTS.caption}>
          {t('onboarding:login')}
        </LoginText>
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
  const {isRTL} = useContext<AppProviderProps>(AppContext)
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
        <Text variant={TEXT_VARIANTS.heading}>
          {t('onboarding:openAccount')}
        </Text>
        <Spacer horizontal={false} size={SPACER_SIZES.BASE * 3} />
        <Input
          label={t('onboarding:nationalID')}
          schema={GovtIdValidator}
          onChangeText={text => {
            console.log(text)
          }}
        />
        <Spacer horizontal={false} size={SPACER_SIZES.BASE * 4} />
        <Input
          label={t('onboarding:mobileNumber')}
          schema={MobileNumberValidator}
          onChangeText={text => {
            console.log(text)
          }}
        />

        <DisclaimerView isKeyboardVisible={isKeyboardVisible} isRTL={isRTL}>
          <Checkbox
            label={
              <AgreeText variant={TEXT_VARIANTS.caption}>
                {t('onboarding:agreeEmail')}
              </AgreeText>
            }
          />
          <Checkbox label={<Terms />} />
        </DisclaimerView>

        {!isKeyboardVisible && (
          <ButtonContainer>
            <StyledButton onPress={onComplete}>
              <Text variant={TEXT_VARIANTS.body}>
                {t('onboarding:continue')}
              </Text>
            </StyledButton>
          </ButtonContainer>
        )}
        <AlreadyAccount isKeyboardVisible={isKeyboardVisible} />
      </Layout>
      {isKeyboardVisible && (
        <StickyButtonContainer keyboardHeight={keyboardHeight}>
          <StickyButton>
            <Text variant={TEXT_VARIANTS.body}>{t('onboarding:continue')}</Text>
          </StickyButton>
        </StickyButtonContainer>
      )}
    </>
  )
}

export default PersonalIdScreen

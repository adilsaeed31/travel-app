import React, {useEffect, useState} from 'react'
import {TouchableOpacity, View, Keyboard, Dimensions} from 'react-native'
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

const StyledButton = styled(Button)`
  margin-left: 32px;
  margin-right: 32px;
`

const ButtonContainer = styled(View)`
  position: absolute;
  bottom: 34px;
  width: ${Dimensions.get('window').width}px;
`

const DisclaimerView = styled(View)<{isKeyboardVisible: boolean}>`
  position: absolute;
  bottom: ${props => (props.isKeyboardVisible ? '60px' : '122px')};
  margin-horizontal: 32px;
`

const UnderlineText = styled(Text)`
  text-decoration-line: underline;
  color: #3f3d36;
  line-height: 16px;
`

const TermText = styled(Text)`
  color: #3f3d36;
  line-height: 16px;
`

const Row = styled(View)`
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-top: 3px;
`

const Terms = () => {
  const {t} = useTranslation()

  return (
    <View>
      <Row>
        <TermText variant={TEXT_VARIANTS.caption}>
          {t("I've read and accept the ")}
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

const PersonalIdScreen = () => {
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
      'keyboardWillHide',
      () => {
        setKeyboardVisible(false)
      },
    )

    return () => {
      keyboardDidShowListener.remove()
      keyboardDidHideListener.remove()
    }
  }, [])

  return (
    <>
      <Layout>
        <Spacer horizontal={false} size={SPACER_SIZES.BASE * 3} />
        <Text variant={TEXT_VARIANTS.heading}>{t('Credentials')}</Text>
        <Spacer horizontal={false} size={SPACER_SIZES.BASE * 3} />
        <Input label={t('National ID/Iqama')} />
        <Spacer horizontal={false} size={SPACER_SIZES.BASE * 4} />
        <Input label={t('Mobile')} />

        <DisclaimerView isKeyboardVisible={isKeyboardVisible}>
          <Checkbox
            label={
              <Text variant={TEXT_VARIANTS.caption}>
                {t('I agree to receive email from SAIB')}
              </Text>
            }
          />
          <Checkbox label={<Terms />} />
        </DisclaimerView>

        {!isKeyboardVisible && (
          <ButtonContainer>
            <StyledButton>
              <Text variant={TEXT_VARIANTS.body}>{t('Continue')}</Text>
            </StyledButton>
          </ButtonContainer>
        )}
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

const StickyButtonContainer = styled.View<{keyboardHeight: Number}>`
  position: absolute;
  bottom: ${props => props.keyboardHeight + 'px'};
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

export default PersonalIdScreen

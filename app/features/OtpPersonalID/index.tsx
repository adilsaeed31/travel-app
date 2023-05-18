import React, {useEffect, useState} from 'react'
import {View, Keyboard, Dimensions, TouchableOpacity} from 'react-native'
import {useTranslation} from 'react-i18next'
import {
  Layout,
  TCButton as Button,
  TCTextView as Text,
  TCOTP as OTP,
  Spacer,
} from '@Components'
import {SPACER_SIZES, TEXT_VARIANTS} from '@Utils'
import styled from 'styled-components/native'
import {Edit} from '@Assets'

const StyledButton = styled(Button)`
  margin-left: 32px;
  margin-right: 32px;
`

const ButtonContainer = styled(View)`
  position: absolute;
  bottom: 34px;
  width: ${Dimensions.get('window').width}px;
`

const Row = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const EditIcon = styled(Edit)`
  margin-right: 6px;
`

const BottomText = styled(Text)`
  line-height: 20px;
  color: #3f3d36;
`

const OtpPersonalIdScreen = () => {
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
        <Text variant={TEXT_VARIANTS.heading}>{t('Enter OTP')}</Text>
        <Spacer size={SPACER_SIZES.BASE * 3} />
        <OTP value={'123'} />
        <Spacer size={SPACER_SIZES.XL} />
        <Row>
          <TouchableOpacity>
            <Row>
              <EditIcon />
              <BottomText variant={TEXT_VARIANTS.body}>
                {t('+966 9513247609')}
              </BottomText>
            </Row>
          </TouchableOpacity>

          <View>
            <TouchableOpacity>
              <BottomText variant={TEXT_VARIANTS.body}>
                {t('Resend OTP')}
              </BottomText>
            </TouchableOpacity>
          </View>
        </Row>
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

export default OtpPersonalIdScreen

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
import {StackNavigationProp} from '@react-navigation/stack'

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

const BottomText = styled(Text)<{disabled?: boolean}>`
  line-height: 20px;
  color: #3f3d36;
  opacity: ${props => (props.disabled ? '0.4' : '1')};
`

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

type Props = {
  navigation: StackNavigationProp<{
    AfterOtpPersonalId: undefined
    PersonalID: undefined
  }>
}

const OtpPersonalIdScreen = ({navigation}: Props) => {
  const {t} = useTranslation()
  const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(false)
  const [keyboardHeight, setKeyboardHeight] = useState<Number>(0)
  const [resendCount, setResendCount] = useState<number>(0)
  const [resendAvailable, setResendAvailable] = useState<boolean>(false)

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

  useEffect(() => {
    if (resendCount > 2) {
      navigation.navigate('AfterOtpPersonalId')
    }
    setResendAvailable(false)
  }, [resendCount, navigation])

  return (
    <>
      <Layout>
        <Spacer horizontal={false} size={SPACER_SIZES.BASE * 3} />
        <Text variant={TEXT_VARIANTS.heading}>
          {t('Enter OTP') + resendCount}
        </Text>
        <Spacer size={SPACER_SIZES.BASE * 3} />
        <OTP
          onChangeText={otp => {
            console.log(otp)
          }}
          onTimerComplete={() => {
            setResendAvailable(true)
          }}
          resetCount={resendCount}
        />
        <Spacer size={SPACER_SIZES.XL} />
        <Row>
          <TouchableOpacity onPress={() => navigation.navigate('PersonalID')}>
            <Row>
              <EditIcon />
              <BottomText variant={TEXT_VARIANTS.body}>
                {'+966 9513247609'}
              </BottomText>
            </Row>
          </TouchableOpacity>
          <View>
            {resendAvailable ? (
              <TouchableOpacity
                onPress={() => {
                  setResendCount(resendCount + 1)
                }}>
                <BottomText variant={TEXT_VARIANTS.body}>
                  {t('Resend OTP')}
                </BottomText>
              </TouchableOpacity>
            ) : (
              <BottomText variant={TEXT_VARIANTS.body} disabled={true}>
                {t('Resend OTP')}
              </BottomText>
            )}
          </View>
        </Row>
        {!isKeyboardVisible && (
          <ButtonContainer>
            <StyledButton
              onPress={() => navigation.navigate('AfterOtpPersonalId')}>
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

export default OtpPersonalIdScreen

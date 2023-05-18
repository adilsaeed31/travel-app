/* eslint-disable no-alert */
import React, {useContext, useState} from 'react'
import {AppContext, AuthContext} from '@Context'
import {SaibLogo, Bg, FaceIcon} from '@Assets'
import {useTranslation} from 'react-i18next'
import {
  TCInput as InputView,
  TCButton as Button,
  TCTextView,
  Spacer,
  TCLinkButton,
  TCMultiLinkButton,
} from '@Components'
import styled from 'styled-components/native'
import {SPACER_SIZES, TEXT_VARIANTS} from '@Utils'
import {Keyboard, TouchableWithoutFeedback} from 'react-native'

const AuthFeature = () => {
  const {t} = useTranslation()
  const {changeLanguage} = useContext(AppContext)
  const {isLoading, isError, error} = useContext(AuthContext)
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const successCall = (value: string) => {
    setInputValue(value)
  }

  const errorCall = () => {}

  const handleLogin = () => {
    // Perform login logic here
  }

  return (
    <>
      <Bg style={{position: 'absolute'}} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <TopContainer>
            <SaibLogo />
            <TCTextView variant={TEXT_VARIANTS.caption}>Ar</TCTextView>
          </TopContainer>

          <Spacer horizontal={false} size={SPACER_SIZES.XL} />
          <TCTextView variant={TEXT_VARIANTS.heading}>Login</TCTextView>
          <Spacer horizontal={false} size={SPACER_SIZES.XL} />

          <LoginForm>
            <TCInput
              label={'Username'}
              value={userName}
              onChangeText={setUserName}
            />
            <Spacer horizontal={false} size={SPACER_SIZES.LG} />
            <TCInput
              label={'Password'}
              value={password}
              onChangeText={setPassword}
            />
            <Spacer horizontal={false} size={SPACER_SIZES.LG} />
            <ViewWrapper>
              <TCLinkButton onPress={() => handleLogin()}>
                {t('auth:buttonForget')}
              </TCLinkButton>
            </ViewWrapper>
          </LoginForm>

          <Spacer horizontal={false} size={SPACER_SIZES.XXXL} />
          <MultiTextWrapper>
            <FaceIcon />
          </MultiTextWrapper>

          <Spacer horizontal={false} size={SPACER_SIZES.LG} />

          <ButtonContainer>
            <TCButton onPress={() => handleLogin()}>
              {t('auth:buttonLogin')}
            </TCButton>
          </ButtonContainer>
          <Spacer horizontal={false} size={SPACER_SIZES.XXL} />
          <MultiTextWrapper>
            <TCMultiLinkButton
              callbacks={[
                e => alert('link clicked 1'),
                e => alert('link clicked 2'),
              ]}>
              {t('auth:newToSaib')}
            </TCMultiLinkButton>
          </MultiTextWrapper>
        </Container>
      </TouchableWithoutFeedback>
    </>
  )
}

const Container = styled.View`
  flex: 1;
  margin-top: 50px;
  margin-left: 32px;
  margin-right: 32px;
`

const LoginForm = styled.View`
  width: 100%;
`

const MultiTextWrapper = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`

const ViewWrapper = styled.View`
  width: 100%;
  justify-content: flex-end;
  flex-direction: row;
`

const TCButton = styled(Button)``

const TCInput = styled(InputView)`
  width: 100%;
  margin-top: 16px;
  height: 100;
`

const ButtonContainer = styled.View`
  width: 100%;
`
const TopContainer = styled.View`
  width: 100%;
  margin-top: 16px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`
export default AuthFeature

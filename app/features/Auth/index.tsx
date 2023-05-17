/* eslint-disable no-alert */
import React, {useContext, useState} from 'react'
import {Layout} from '@ui-kitten/components'
import {AppContext, AuthContext} from '@Context'
import {SaibLogo, Bg} from '@Assets'
import {useTranslation} from 'react-i18next'
import {
  TCTextInput as Input,
  TCButton as Button,
  TCTextView,
  Spacer,
} from '@Components'
import styled from 'styled-components/native'
import {SPACER_SIZES, TEXT_VARIANTS} from '@Utils'
// import {SvgBg} from '@Assets'

export default function AuthFeature() {
  const {changeLanguage} = useContext(AppContext)
  const {t} = useTranslation()
  const {isLoading, isError, error} = useContext(AuthContext)
  const [inputValue, setInputValue] = useState('')

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

      <Container>
        <TopContainer>
          <SaibLogo />
          <TCTextView variant={TEXT_VARIANTS.caption}>Ar</TCTextView>
        </TopContainer>

        <Spacer horizontal={false} size={SPACER_SIZES.XL} />
        <TCTextView variant={TEXT_VARIANTS.heading}>Login</TCTextView>
        <Spacer horizontal={false} size={SPACER_SIZES.XL} />

        <LoginForm>
          <TCTextInput
            placeholder="UserName"
            successCall={successCall}
            errorCall={errorCall}
            isPassword={false}
            validationRegex={/^\w+$/}
          />
          <Spacer horizontal={false} size={SPACER_SIZES.LG} />
          <TCTextInput
            validationRegex={/^.{6,}$/}
            placeholder="Password"
            successCall={successCall}
            errorCall={errorCall}
            isPassword={true}
          />
          <Spacer horizontal={false} size={SPACER_SIZES.LG} />
          <ViewWrapper>
            <TCForgetButton onPress={() => handleLogin()}>
              {t('auth:buttonForget')}
            </TCForgetButton>
          </ViewWrapper>
        </LoginForm>

        <Spacer horizontal={false} size={SPACER_SIZES.XXXLL} />
        <Spacer horizontal={false} size={SPACER_SIZES.XXXL} />

        <ButtonContainer>
          <TCButton onPress={() => handleLogin()}>
            {t('auth:buttonLogin')}
          </TCButton>
        </ButtonContainer>
      </Container>
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

const ViewWrapper = styled.View`
  width: 100%;
  justify-content: flex-end;
  flex-direction: row;
`

const TCForgetButton = styled.Text`
  width: 129px;
  height: 24px;

  font-family: 'Co Text';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 24px;
  /* identical to box height, or 160% */

  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  text-align: right;
  letter-spacing: -0.4px;

  /* Color/Black-Secondary */

  color: #3f3d36;
`

const TCButton = styled(Button)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 311px;
  height: 56px;

  /* Color/Yellow */
  background: #f8d03b;
  border: 1.6px solid #ffc900;
  box-shadow: 0px 4px 12px rgba(47, 40, 15, 0.12);
  border-radius: 24px 0px;
`

const TCTextInput = styled(Input)``

const ButtonContainer = styled.View`
  width: 100%;
  margin-top: 16px;
`
const TopContainer = styled.View`
  width: 100%;
  margin-top: 16px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`

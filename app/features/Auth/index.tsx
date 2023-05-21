import React, {useContext, useEffect, useRef, useState} from 'react'
import {AppContext, AppProviderProps} from '@Context'
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
import {
  Animated,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native'

const AuthFeature = () => {
  const {t} = useTranslation()
  const {isAppReady, hasIntroSeen} = useContext<AppProviderProps>(AppContext)
  const splashAnim = useRef(new Animated.Value(0)).current
  const transAnim = useRef(
    new Animated.ValueXY({x: Dimensions.get('screen').width, y: 0}),
  ).current

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    // Perform login logic here
  }

  useEffect(() => {
    // Added the fade opacity animation for 1 sec
    Animated.parallel([
      Animated.timing(splashAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(transAnim, {
        toValue: {x: 0, y: 0},
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start()
  }, [splashAnim, transAnim, isAppReady, hasIntroSeen])

  return (
    <Animated.View
      className="flex-1"
      style={{
        opacity: splashAnim,
        transform: [...transAnim.getTranslateTransform()],
      }}>
      <Bg className="absolute" />
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
            <Spacer horizontal={false} size={SPACER_SIZES.XL} />
            <TCInput
              label={'Password'}
              value={password}
              onChangeText={setPassword}
            />
            <Spacer horizontal={false} size={SPACER_SIZES.LG} />
            <ViewWrapper>
              <TCLinkButton onPress={handleLogin}>
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
            <TCButton onPress={handleLogin}>{t('auth:buttonLogin')}</TCButton>
          </ButtonContainer>
          <Spacer horizontal={false} size={SPACER_SIZES.XXL} />
          <MultiTextWrapper>
            <TCMultiLinkButton>{t('auth:newToSaib')}</TCMultiLinkButton>
          </MultiTextWrapper>
        </Container>
      </TouchableWithoutFeedback>
    </Animated.View>
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

import React, {useContext, useEffect, useRef, useState} from 'react'
import {AppContext, AppProviderProps} from '@Context'
import {FaceIcon} from '@Assets'
import {useTranslation} from 'react-i18next'
import {
  TCInput as InputView,
  TCButton as Button,
  TCTextView,
  Spacer,
  TCLinkButton,
  TCMultiLinkButton,
  Layout,
} from '@Components'
import styled from 'styled-components/native'
import {
  SPACER_SIZES,
  TEXT_VARIANTS,
  UserNameValidator,
  passwordValidator,
} from '@Utils'
import {Animated, Dimensions} from 'react-native'
import {StackNavigationProp} from '@react-navigation/stack'
import {fetcher} from '@Api'
import {useQuery} from '@tanstack/react-query'
import {BASE_URL} from '@Utils'
import {useStore} from '@Store'

type Props = {
  navigation: StackNavigationProp<{
    AfterOtpPersonalId: undefined
    PersonalID: undefined
  }>
}

const AuthFeature = ({navigation}: Props) => {
  const {t} = useTranslation()
  const {isAppReady, hasIntroSeen} = useContext<AppProviderProps>(AppContext)
  const splashAnim = useRef(new Animated.Value(0)).current
  const transAnim = useRef(
    new Animated.ValueXY({x: Dimensions.get('screen').width, y: 0}),
  ).current
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [isUserNameValid, setIsUserNameValid] = useState(false)
  const [isPasswordValid, setIsPasswordValid] = useState(false)

  const bodyParams = {
    username: userName,
    password: password,
    os: 'IOS',
    language: useStore.getState().language,
    device_id: 'simulator', // TODO
    os_version: '16.4', // TODO
    grant_type: 'password',
    version: '0.1',
  }
  const url = `${BASE_URL}/auth/login`
  const {isFetching, data, refetch} = useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ['Login'],
    queryFn: () =>
      fetcher(url, {
        method: 'POST',
        body: bodyParams,
      }),
    refetchOnWindowFocus: false,
    enabled: false, // disable this query from automatically running
  })

  useEffect(() => {
    if (!isFetching && data) {
      // alert(JSON.stringify(data))
      if (data.type) {
        useStore.getState().setUser(data)
        navigation.navigate('OTPAuth')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isFetching])

  const handleLogin = () => {
    // Perform login logic here
    refetch()
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
      <Layout isScrollable={false}>
        <>
          <Spacer horizontal={false} size={SPACER_SIZES.XL} />
          <TCTextView variant={TEXT_VARIANTS.heading}>
            {t('auth:buttonLogin')}
          </TCTextView>
          <Spacer horizontal={false} size={SPACER_SIZES.XL} />

          <LoginForm>
            <TCInput
              label={t('auth:userName')}
              schema={UserNameValidator}
              onChangeText={setUserName}
              isValid={setIsUserNameValid}
            />
            <Spacer horizontal={false} size={SPACER_SIZES.XL} />
            <TCInput
              label={t('auth:password')}
              value={password}
              isPassword
              schema={passwordValidator}
              onChangeText={setPassword}
              isValid={setIsPasswordValid}
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
            <TCButton
              disabled={!isUserNameValid || !isPasswordValid}
              onPress={handleLogin}>
              {t('auth:buttonLogin')}
            </TCButton>
          </ButtonContainer>
          <Spacer horizontal={false} size={SPACER_SIZES.XXL} />
          <MultiTextWrapper>
            <TCMultiLinkButton
              callbacks={[
                () => {
                  navigation.navigate('PersonalID')
                },
              ]}>
              {t('auth:newToSaib')}
            </TCMultiLinkButton>
          </MultiTextWrapper>
        </>
      </Layout>
    </Animated.View>
  )
}

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
  height: 100px;
`

const ButtonContainer = styled.View`
  width: 100%;
`

export default AuthFeature

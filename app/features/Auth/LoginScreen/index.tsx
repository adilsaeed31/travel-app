import React, {useContext, useEffect, useRef, useState} from 'react'
import {AppContext, AppProviderProps} from '@Context'
import {View} from 'react-native'
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
import {Alert, Animated, Dimensions} from 'react-native'
import {StackNavigationProp} from '@react-navigation/stack'
import {fetcher} from '@Api'
import {useQuery} from '@tanstack/react-query'
import {BASE_URL} from '@Utils'
import {useStore} from '@Store'
import {useIsFocused} from '@react-navigation/native'

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
  const isFocused = useIsFocused()

  const transAnim = useRef(
    new Animated.ValueXY({x: Dimensions.get('screen').width, y: 0}),
  ).current
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [status, setstatus] = useState(0)
  const [isAuthFailed, setIsAuthFailed] = useState(false)
  const setUser = useStore((state: any) => state.setUser)

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
    queryFn: async () => {
      let res: any = await fetcher(url, {
        method: 'POST',
        body: bodyParams,
      })
      setstatus(res.status)

      if (res.status >= 200 && res.status < 300) return res.json()
      else return res.status
    },
    refetchOnWindowFocus: false,
    cacheTime: 1,
    enabled: false, // disable this query from automatically running
  })

  useEffect(() => {
    if (!isFetching && data && isFocused) {
      if (status >= 200 && status < 300) {
        if (data.is_otp_required) {
          navigation.navigate('OTPAuth', {
            user: data,
          })
          setstatus(0)
        } else {
          setUser(data)
          setIsAuthFailed(false)
        }
      } else if (status > 299 && status < 400) {
        navigation.navigate('OTPAuth')
      } else if (status > 399 && status < 500) {
        setIsAuthFailed(true)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isFetching, isFocused])

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
      <Layout isLoading={isFetching}>
        <Spacer horizontal={false} size={SPACER_SIZES.BASE} />
        <TCTextView style={{flex: 0.5}} variant={TEXT_VARIANTS.heading}>
          {t('auth:buttonLogin')}
        </TCTextView>
        <LoginForm>
          <TCInput label={t('auth:userName')} onChangeText={setUserName} />
          <TCInput
            label={t('auth:password')}
            value={password}
            isPassword
            onChangeText={setPassword}
          />
        </LoginForm>
        <ViewWrapper>
          <TCLinkButton onPress={handleLogin}>
            {t('auth:buttonForget')}
          </TCLinkButton>
        </ViewWrapper>
        {isAuthFailed && (
          <ForgetPassWrapper>
            <ForgetPassLabel>{t('auth:authFailed')}</ForgetPassLabel>
          </ForgetPassWrapper>
        )}

        <MultiTextWrapper>
          <FaceIcon />
        </MultiTextWrapper>

        <BottomView>
          <ButtonContainer>
            <TCButton onPress={handleLogin}>{t('auth:buttonLogin')}</TCButton>
          </ButtonContainer>
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
        </BottomView>
      </Layout>
    </Animated.View>
  )
}

const LoginForm = styled.View`
  width: 100%;
  flex: 1;
  justify-content: space-around;
`

const MultiTextWrapper = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  flex: 1;
`

const ForgetPassWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  background: #ffdede;
  border-radius: 16px;
  padding: 2%;
  flex: 0.5;
`

const ForgetPassLabel = styled.Text`
  font-family: 'Co Text';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 28px;
  align-self: center;
  /* or 200% */

  text-align: center;
  color: #de2e2e;
`

const ViewWrapper = styled.View`
  width: 100%;
  justify-content: flex-end;
  flex-direction: row;
  flex: 1;
`

const TCButton = styled(Button)``

const TCInput = styled(InputView)`
  width: 100%;
  flex: 1;
`

const ButtonContainer = styled.View`
  width: 100%;
  flex: 1;
  justify-content: center;
`
const BottomView = styled.View`
  width: 100%;
  flex: 1;
  justify-content: space-around;
`
export default AuthFeature

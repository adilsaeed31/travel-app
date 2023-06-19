/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react'
import {View} from 'react-native'
import {useTranslation} from 'react-i18next'
import styled from 'styled-components/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'

import {useMutation} from '@tanstack/react-query'
import {Colors, BASE_URL, getItem, UserNameValidator} from '@Utils'
import {useStore} from '@Store'
import {Layout, TCInput, TCButton, TCTextView, PassRules} from '@Components'
import {fetcher} from '@Api'

type CreateUserProps = {
  navigation: NativeStackNavigationProp<{}>
}

function CreateUser({navigation}: CreateUserProps) {
  const {t} = useTranslation()
  const isRTL = useStore(state => state.isRTL)
  const setUser = useStore((state: any) => state.setUser)
  const [state, setState] = useState<any>({
    passwordOne: false,
    passwordTwo: false,
    passwordThree: false,
    passwordFour: false,
    values: {},
  })

  const {
    isLoading: isLoading,
    data: uData,
    mutate,
    reset,
  } = useMutation({
    mutationFn: async () => {
      let journeySecrets
      let journeySecretsData = await getItem('journeySecrets')
      if (journeySecretsData) {
        journeySecrets = JSON.parse(journeySecretsData)
      }
      let req: any = await fetcher(BASE_URL + '/onboarding/register', {
        method: 'POST',
        body: {
          username: state.values.userName,
          password: state.values.password,
        },
        token: journeySecrets.access_token,
      })
      let res = await req.json()
      return res
    },
  })

  useEffect(() => {
    if (state.values.userName && state.values.password) {
      reset()
      setUser({})
    }
  }, [uData])

  const setFieldValue = (key: string, val: string) => {
    setState({...state, values: {...state.values, [key]: val}})
  }

  const handleSubmit = () => {
    mutate()
  }

  return (
    <>
      <Layout
        isBack={true}
        onBack={() => navigation.goBack()}
        isHeader={true}
        isLoading={isLoading}
        isBackground={true}>
        <View className="flex-1 justify-content">
          <Header isRTL={!!isRTL}>
            <TCTextView>{t('onboarding:createUserTitle')}</TCTextView>
          </Header>

          <View className="flex-1 mt-6 gap-6">
            <View>
              <TCInput
                maxLength={10}
                schema={UserNameValidator}
                value={state.values.userName}
                label={t('auth:userName')}
                onChangeText={val => setFieldValue('userName', val)}
              />
            </View>

            <View>
              <TCInput
                isPassword
                value={state.values.password}
                label={t('auth:password')}
                onChangeText={val => setFieldValue('password', val)}
              />
            </View>

            <View>
              <TCInput
                isPassword
                value={state.values.confirmPassword}
                label={t('auth:confirmPassword')}
                onChangeText={val => setFieldValue('confirmPassword', val)}
              />
            </View>

            <View>
              <PassRules
                passwordOne={
                  !!(
                    state.values.password &&
                    state.values.password.length > 7 &&
                    state.values.password.length < 21
                  )
                }
                passwordTwo={
                  !!(
                    state.values?.password &&
                    /[!@#$%^&*(),.?":{}|<>]/.test(state.values?.password)
                  )
                }
                passwordThree={
                  !!(
                    state.values?.password &&
                    /^(?=.*\d\D*\d).*$/.test(state.values?.password)
                  )
                }
                passwordFour={
                  !!(
                    state.values?.password &&
                    /[A-Z]/.test(state.values?.password) &&
                    /[a-z]/.test(state.values?.password)
                  )
                }
                passwordFive={
                  !!(
                    state.values?.password &&
                    state.values?.password === state.values?.confirmPassword
                  )
                }
              />
            </View>
          </View>

          <StyledButton
            disabled={
              !(
                state.values.password &&
                state.values.password.length > 7 &&
                state.values.password.length < 21 &&
                /[!@#$%^&*(),.?":{}|<>]/.test(state.values?.password) &&
                /\d/.test(state.values?.password) &&
                /[A-Z]/.test(state.values?.password) &&
                /[a-z]/.test(state.values?.password) &&
                state.values.password === state.values.confirmPassword
              )
            }
            onPress={handleSubmit}>
            <TCTextView>{t('onboarding:create')}</TCTextView>
          </StyledButton>
        </View>
      </Layout>
    </>
  )
}

const Header = styled(TCTextView)<{isRTL: boolean}>`
  font-size: 28px;
  line-height: 34px;
  color: ${Colors.SmokyBlack};
  text-align: ${props => (props.isRTL ? 'right' : 'left')};
  font-weight: 700;
  margin-top: 24px;
  margin-bottom: 32px;
`

const StyledButton = styled(TCButton)`
  margin-left: 32px;
  margin-right: 32px;
  width: 100%;
  align-self: center;
`

export default CreateUser

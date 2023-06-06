/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react'
import {View} from 'react-native'
import {useTranslation} from 'react-i18next'
import styled from 'styled-components/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {Formik} from 'formik'
import * as Yup from 'yup'

import {Colors} from '@Utils'
import {useStore} from '@Store'
import {Layout, TCInput, TCButton, TCTextView, PassRules} from '@Components'

type CreateUserProps = {
  navigation: StackNavigationProp<{}>
}

type CreateUserForm = {
  userName: string | null
  password: string | null
  confirmPassword: string | null
}

// validation for create user form
const CreateUserSchema = Yup.object().shape({
  userName: Yup.string()
    .min(3, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Please Enter a Value'),
  password: Yup.string()
    .min(8, 'Too Short!')
    .max(16, 'Too Long!')
    .required('Please Enter a Value'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please Enter a Value'),
})

const CreateUser: React.FC<CreateUserProps> = ({navigation}) => {
  const {t} = useTranslation()
  const isRTL = useStore(state => state.isRTL)
  const [isLoader, setLoader] = useState(false)
  const setUser = useStore((state: any) => state.setUser)
  const [state, setState] = useState<any>({
    passwordOne: false,
    passwordTwo: false,
    passwordThree: false,
    passwordFour: false,
    values: {},
  })
  // initial values for create user form
  const initialValues: CreateUserForm = {
    userName: '',
    password: '',
    confirmPassword: '',
  }

  useEffect(() => {
    console.log(state.values)
  }, [state.values])

  return (
    <>
      <Layout
        isBack={true}
        onBack={() => navigation.goBack()}
        isHeader={true}
        isLoading={isLoader}
        isBackground={true}>
        <View className="flex-1 justify-content">
          <Header isRTL={!!isRTL}>
            <TCTextView>{t('onboarding:createUserTitle')}</TCTextView>
          </Header>

          <Formik
            validateOnMount
            initialValues={initialValues}
            validationSchema={CreateUserSchema}
            onSubmit={(values: any) => {
              setLoader(true)
              setTimeout(() => {
                setLoader(false)
                setUser(values)
              }, 1000)
            }}>
            {({
              values,
              errors,
              isValid,
              touched,
              handleChange,
              handleSubmit,
            }) => {
              return (
                <>
                  <View className="flex-1 mt-6 gap-6">
                    <View>
                      <TCInput
                        maxLength={20}
                        value={values.userName}
                        label={t('auth:userName')}
                        onChangeText={handleChange('userName')}
                      />

                      {touched.userName && errors.userName ? (
                        <ErrorText>{errors.userName}</ErrorText>
                      ) : null}
                    </View>

                    <View>
                      <TCInput
                        isPassword
                        value={values.password}
                        label={t('auth:password')}
                        onChangeText={handleChange('password')}
                      />
                      {touched.password && errors.password ? (
                        <ErrorText>{errors.password}</ErrorText>
                      ) : null}
                    </View>

                    <View>
                      <TCInput
                        isPassword
                        value={values.confirmPassword}
                        label={t('auth:confirmPassword')}
                        onChangeText={handleChange('confirmPassword')}
                      />
                      {touched.confirmPassword && errors.confirmPassword ? (
                        <ErrorText>{errors.confirmPassword}</ErrorText>
                      ) : null}
                    </View>

                    <View>
                      <PassRules
                        passwordOne={
                          !!(
                            values.password &&
                            values.password.length > 7 &&
                            values.password.length < 17
                          )
                        }
                        passwordTwo={
                          !!(
                            values?.password &&
                            /[!@#$%^&*(),.?":{}|<>]/.test(values?.password)
                          )
                        }
                        passwordThree={
                          !!(values?.password && /\d/.test(values?.password))
                        }
                        passwordFour={
                          !!(
                            values?.password &&
                            /[A-Z]/.test(values?.password) &&
                            /[a-z]/.test(values?.password)
                          )
                        }
                      />
                    </View>
                  </View>

                  <StyledButton
                    disabled={
                      !(
                        values.password &&
                        values.password.length > 7 &&
                        values.password.length < 17 &&
                        /[!@#$%^&*(),.?":{}|<>]/.test(values?.password) &&
                        /\d/.test(values?.password) &&
                        /[A-Z]/.test(values?.password) &&
                        /[a-z]/.test(values?.password) &&
                        values.password === values.confirmPassword
                      )
                    }
                    onPress={handleSubmit}>
                    <TCTextView>{t('onboarding:create')}</TCTextView>
                  </StyledButton>
                </>
              )
            }}
          </Formik>
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

const ErrorText = styled(TCTextView)`
  font-weight: 500;
  color: #f54d3f;
  padding-left: 16px;
`

export default CreateUser

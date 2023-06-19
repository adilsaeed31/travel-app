import React, {useEffect, useState, useContext} from 'react'
import {TouchableOpacity, View, Keyboard, Platform} from 'react-native'
import * as yup from 'yup'
import {useTranslation} from 'react-i18next'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {useMutation} from '@tanstack/react-query'
import {NativeWindStyleSheet} from 'nativewind'
import cn from 'classnames'
import {
  Layout,
  TCButton as Button,
  TCTextView as Text,
  TCInput as Input,
  TCCheckbox as Checkbox,
  KeyboardStickyButton,
} from '@Components'
import {
  GovtIdValidator,
  MobileNumberValidator,
  TermsCheckvalidator,
  TEXT_VARIANTS,
  screenHeight,
} from '@Utils'
import {AppProviderProps, AppContext} from '@Context'
import {triggerOTP} from '@Api'
import {useStore} from '@Store'

const isSmall = screenHeight < 750

type Props = {
  navigation: NativeStackNavigationProp<any>
}

const PersonalIdScreen = ({navigation}: Props) => {
  const {t} = useTranslation()
  const {isRTL} = useContext<AppProviderProps>(AppContext)
  const [state, setState] = useState<any>({})
  const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(false)
  const [statusError, setStatusError] = useState<any>(false)
  const [isButtonDisabled, setButtonDisabled] = useState(true)
  const setOnboardingDetails = useStore(
    (store: any) => store.setOnboardingDetails,
  )

  const {isLoading, data, mutate, reset} = useMutation({
    mutationFn: () => triggerOTP(state),
  })

  useEffect(() => {
    try {
      yup
        .object({
          govtId: GovtIdValidator,
          mobileNumber: MobileNumberValidator,
          isTermsCheck: TermsCheckvalidator,
        })
        .validateSync(state)

      setButtonDisabled(false)
    } catch (err: any) {
      setButtonDisabled(true)
    }
  }, [state])

  useEffect(() => {
    if (data?.reference_number) {
      setOnboardingDetails(
        state.mobileNumber,
        state.govtId,
        data.reference_number,
      )
      reset()
      navigation.push('OtpPersonalId')
    } else {
      const status = data?.status
      switch (true) {
        case status === 409:
          setStatusError('OTP already Exist, Please wait for a minute')
          break
        case status === 509:
          navigation.navigate('AfterOtpPersonalId', {
            status: 'error',
            case: 'Bandwidth Limit Exceeded',
          })
          break
        case status > 399 && status <= 500:
          setStatusError('Some Error Occurred. Please try after some time')
          break
        default:
          setStatusError('')
      }
    }
  }, [
    data,
    setOnboardingDetails,
    state.govtId,
    state.mobileNumber,
    reset,
    navigation,
  ])

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => {
        setKeyboardVisible(true)
      },
    )

    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
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
      <Layout isLoading={isLoading}>
        <Text className="heading-1 my-6">{t('onboarding:openAccount')}</Text>

        <Input
          className="mb-6"
          label={t('onboarding:nationalID')}
          schema={GovtIdValidator}
          onChangeText={text => {
            setState({...state, govtId: text})
          }}
          maxLength={10}
          value={state.govtId}
          keyboardType="numeric"
        />

        <Input
          label={t('onboarding:mobileNumber')}
          schema={MobileNumberValidator}
          onChangeText={text => {
            setState({...state, mobileNumber: text})
          }}
          maxLength={9}
          value={state.mobileNumber}
          keyboardType="numeric"
          className="mb-6"
        />

        {statusError && (
          <Text className="text-center text-tc-danger font-bold">
            {statusError}
          </Text>
        )}

        <View
          className={cn({
            'mx-4': true,
            'w-full': true,
            'below-disclaimer': !(isSmall || isKeyboardVisible),
            absolute: !(isSmall || isKeyboardVisible),
          })}>
          <Checkbox
            onChange={newStatus => {
              setState({...state, isTermsCheck: newStatus})
            }}
            label={
              <View>
                <View
                  className={cn({
                    'flex-row': !isRTL,
                    'flex-row-reverse': isRTL,
                  })}>
                  <Text className="text-tc-secondary">
                    {t('onboarding:readAccept')}
                  </Text>
                  <TouchableOpacity onPress={() => {}}>
                    <Text className="text-tc-secondary">
                      {t('onboarding:disclaimer')}
                    </Text>
                  </TouchableOpacity>
                  <Text className="text-tc-secondary">
                    {t('onboarding:and')}
                  </Text>
                </View>
                <View>
                  <TouchableOpacity onPress={() => {}}>
                    <Text className="text-tc-secondary ">
                      {t('onboarding:termsConditions')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            }
          />
        </View>

        {!isKeyboardVisible && (
          <View
            className={cn({
              'mx-4': true,
              'w-full': true,
              'below-button': !(isSmall || isKeyboardVisible),
              absolute: !(isSmall || isKeyboardVisible),
            })}>
            <Button onPress={mutate} disabled={isButtonDisabled}>
              <Text variant={TEXT_VARIANTS.body}>
                {t('onboarding:continue')}
              </Text>
            </Button>
          </View>
        )}
        <View
          className={cn({
            'mx-4': true,
            'w-full': true,
            'flex-row': !isRTL,
            'justify-center': true,
            'flex-row-reverse': isRTL,
            'below-already': true,
            absolute: true,
          })}>
          <Text className="text-tc-secondary">
            {t('onboarding:alreadyAccount')}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Auth')
            }}>
            <Text className="text-tc-secondary">{t('onboarding:login')}</Text>
          </TouchableOpacity>
        </View>
      </Layout>

      <KeyboardStickyButton
        onPress={mutate}
        isDisabled={isButtonDisabled}
        value={t('onboarding:continue')}
      />
    </>
  )
}

export default PersonalIdScreen

NativeWindStyleSheet.create({
  styles: {
    'heading-1': {
      fontSize: 28,
      fontWeight: '700',
    },

    'below-disclaimer': {
      bottom: 165,
    },

    'below-button': {
      bottom: 95,
    },

    'below-already': {
      bottom: 50,
    },
  },
})

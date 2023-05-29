import React, {useEffect, useState, useContext} from 'react'
import {
  TouchableOpacity,
  View,
  Keyboard,
  Dimensions,
  Platform,
} from 'react-native'
import {useTranslation} from 'react-i18next'
import * as yup from 'yup'
import {
  Layout,
  TCButton as Button,
  TCTextView as Text,
  TCInput as Input,
  TCCheckbox as Checkbox,
  Spacer,
} from '@Components'
import {SPACER_SIZES, TEXT_VARIANTS} from '@Utils'
import styled from 'styled-components/native'
import {
  GovtIdValidator,
  MobileNumberValidator,
  TermsCheckvalidator,
} from '@Utils'
import {StackNavigationProp} from '@react-navigation/stack'
import {AppProviderProps, AppContext} from '@Context'
import {fetcher} from '@Api'
import {useMutation} from '@tanstack/react-query'
import {BASE_URL} from '@Utils'
import {useStore} from '@Store'

const isSmall = Dimensions.get('window').height < 750

const StyledButton = styled(Button)`
  margin-top: ${isSmall ? '24px' : '0px'};
  margin-bottom: ${isSmall ? '24px' : '0px'};
`

const ButtonContainer = styled(View)`
  position: ${isSmall ? 'static' : 'absolute'};
  bottom: ${isSmall ? '0px' : '107px'};
  width: ${isSmall ? '100%' : Dimensions.get('window').width + 'px'};
  padding-left: ${isSmall ? '0px' : '32px'};
  padding-right: ${isSmall ? '0px' : '32px'};
`

const DisclaimerView = styled(View)<{
  isKeyboardVisible: boolean
  isRTL?: boolean
}>`
  position: ${props =>
    props.isKeyboardVisible || isSmall ? 'static' : 'absolute'};
  bottom: ${props => (props.isKeyboardVisible || isSmall ? '0px' : '195px')};
  margin-left: ${props =>
    props.isKeyboardVisible || props.isRTL || isSmall ? '0px' : '32px'};
  margin-right: ${props =>
    props.isKeyboardVisible || props.isRTL || isSmall ? '0px' : '32px'};
  right: ${props => (props.isRTL ? '32px' : '0px')};
  left: ${props => (props.isRTL ? '32px' : '0px')};
  margin-top: 16px;
`

const UnderlineText = styled(Text)`
  text-decoration-line: underline;
  color: rgba(63, 61, 54, 0.8);
  line-height: 16px;
`

const LoginText = styled(Text)`
  color: #3f3d36;
  line-height: 16px;
  font-weight: 700;
`

const TermText = styled(Text)`
  color: rgba(63, 61, 54, 0.8);
  line-height: 16px;
`

const AgreeText = styled(Text)`
  color: rgba(63, 61, 54, 0.8);
`

const Row = styled(View)<{isRTL: boolean | undefined}>`
  flex-direction: ${({isRTL}) => (isRTL ? 'row-reverse' : 'row')};
  align-items: center;
  width: 100%;
  margin-top: 3px;
`

const StickyButtonContainer = styled.View<{keyboardHeight: Number}>`
  position: absolute;
  bottom: ${props =>
    Platform.OS === 'ios' ? props.keyboardHeight + 'px' : '0px'};
  left: 0;
  right: 0;
  align-items: center;
`

const StickyButton = styled.TouchableOpacity<{isDisabled?: boolean}>`
  background-color: ${props => (props.isDisabled ? '#E1E1E1' : '#f8d03b')};
  border: 1px solid ${props => (props.isDisabled ? '#E1E1E1' : '#f8d03b')};
  width: 100%;
  min-height: 56px;
  align-items: center;
  justify-content: center;
`

const RowCenter = styled.View<{
  isKeyboardVisible: boolean
  isRTL: boolean | undefined
}>`
  position: ${props => (props.isKeyboardVisible ? 'static' : 'absolute')};
  bottom: ${props => (props.isKeyboardVisible ? '0px' : '51px')};
  flex-direction: ${props => (props.isRTL ? 'row-reverse' : 'row')};

  justify-content: center;
  margin-top: ${props => (props.isKeyboardVisible ? '24px' : '0px')};
  width: ${props =>
    props.isKeyboardVisible ? '100%' : Dimensions.get('window').width + 'px'};
`

const ErrorText = styled(Text)`
  font-weight: 500;
  color: #f54d3f;
  padding-left: 16px;
`

const Terms = () => {
  const {t} = useTranslation()
  const {isRTL} = useContext<AppProviderProps>(AppContext)
  return (
    <View>
      <Row isRTL={isRTL}>
        <TermText variant={TEXT_VARIANTS.caption}>
          {t('onboarding:readAccept')}
        </TermText>
        <TouchableOpacity onPress={() => {}}>
          <UnderlineText variant={TEXT_VARIANTS.caption}>
            {t('onboarding:disclaimer')}
          </UnderlineText>
        </TouchableOpacity>
        <TermText variant={TEXT_VARIANTS.caption}>
          {t('onboarding:and')}
        </TermText>
      </Row>
      <View>
        <TouchableOpacity onPress={() => {}}>
          <UnderlineText variant={TEXT_VARIANTS.caption}>
            {t('onboarding:termsConditions')}
          </UnderlineText>
        </TouchableOpacity>
      </View>
    </View>
  )
}

interface AlreadyAccountProps {
  isKeyboardVisible: boolean
  navigation: StackNavigationProp<{OtpPersonalId: undefined; Auth: undefined}>
}

const AlreadyAccount = ({
  isKeyboardVisible,
  navigation,
}: AlreadyAccountProps) => {
  const {t} = useTranslation()
  const {isRTL} = useContext<AppProviderProps>(AppContext)
  return (
    <RowCenter isRTL={isRTL} isKeyboardVisible={isKeyboardVisible}>
      <TermText variant={TEXT_VARIANTS.caption}>
        {t('onboarding:alreadyAccount')}
      </TermText>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Auth')
        }}>
        <LoginText variant={TEXT_VARIANTS.caption}>
          {t('onboarding:login')}
        </LoginText>
      </TouchableOpacity>
    </RowCenter>
  )
}

type Props = {
  navigation: StackNavigationProp<{OtpPersonalId: undefined; Auth: undefined}>
}

const PersonalIdScreen = ({navigation}: Props) => {
  const {t} = useTranslation()
  const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(false)
  const [keyboardHeight, setKeyboardHeight] = useState<Number>(0)
  const {isRTL} = useContext<AppProviderProps>(AppContext)
  const [state, setState] = useState<any>({
    // mobileNumber: '0567113534',
    // govtId: '2545312932',
  })
  const [status, setStatus] = useState<any>('')
  const [isButtonDisabled, setButtonDisabled] = useState(true)
  const [termsError, setTermsError] = useState<any>(false)
  const [statusError, setStatusError] = useState<any>(false)
  const setOnboardingDetails = useStore(
    (store: any) => store.setOnboardingDetails,
  )

  const {isLoading, data, mutate, reset} = useMutation({
    mutationFn: async () => {
      let req: any = await fetcher(BASE_URL + '/auth/otp', {
        method: 'POST',
        body: {mobileNumber: state.mobileNumber, role: 'ONBOARDING'},
      })

      setStatus(req.status)

      if (req.status < 400) {
        return req.json()
      } else {
        return req.status
      }
    },
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
  }, [
    state.govtId,
    state.mobileNumber,
    state.isTermsCheck,
    state.isEmailCheck,
    state,
  ])

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardWillShow',
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

  const onComplete = () => {
    mutate()
  }

  if (data && data.referenceNumber) {
    setOnboardingDetails(state.mobileNumber, state.govtId, data.referenceNumber)
    reset()
    navigation.push('OtpPersonalId')
  }

  useEffect(() => {
    if (status > 409) {
      setStatusError('Exiting OTP already Exist, Please wait for a minute')
      return
    }
    if (status > 399 && status < 500) {
      setStatusError('Some Error Occurred. Please try after some time')
      return
    }
  }, [status])

  return (
    <>
      <Layout isLoading={isLoading}>
        <Spacer horizontal={false} size={SPACER_SIZES.BASE * 3} />
        <Text variant={TEXT_VARIANTS.heading}>
          {t('onboarding:openAccount')}
        </Text>
        <Spacer horizontal={false} size={SPACER_SIZES.BASE * 3} />
        <Input
          label={t('onboarding:nationalID')}
          schema={GovtIdValidator}
          onChangeText={text => {
            setState({...state, govtId: text})
          }}
          maxLength={12}
          value={state.govtId}
        />
        <Spacer horizontal={false} size={SPACER_SIZES.BASE * 4} />
        <Input
          label={t('onboarding:mobileNumber')}
          schema={MobileNumberValidator}
          onChangeText={text => {
            setState({...state, mobileNumber: text})
          }}
          maxLength={12}
          value={state.mobileNumber}
        />
        {statusError && <ErrorText>{statusError}</ErrorText>}
        <DisclaimerView isKeyboardVisible={isKeyboardVisible} isRTL={isRTL}>
          <Checkbox
            onChange={status => {
              setState({...state, isEmailCheck: status})
            }}
            label={
              <AgreeText variant={TEXT_VARIANTS.caption}>
                {t('onboarding:agreeEmail')}
              </AgreeText>
            }
          />
          <Checkbox
            onChange={status => {
              if (status) {
                setTermsError(false)
              }

              setState({...state, isTermsCheck: status})
            }}
            label={<Terms />}
          />
          {termsError && <ErrorText>{termsError}</ErrorText>}
        </DisclaimerView>

        {!isKeyboardVisible && (
          <ButtonContainer>
            <StyledButton onPress={onComplete} disabled={isButtonDisabled}>
              <Text variant={TEXT_VARIANTS.body}>
                {t('onboarding:continue')}
              </Text>
            </StyledButton>
          </ButtonContainer>
        )}
        <AlreadyAccount
          isKeyboardVisible={isKeyboardVisible}
          navigation={navigation}
        />
      </Layout>
      {isKeyboardVisible && (
        <StickyButtonContainer keyboardHeight={keyboardHeight}>
          <StickyButton onPress={onComplete} isDisabled={isButtonDisabled}>
            <Text variant={TEXT_VARIANTS.body}>{t('onboarding:continue')}</Text>
          </StickyButton>
        </StickyButtonContainer>
      )}
    </>
  )
}

export default PersonalIdScreen

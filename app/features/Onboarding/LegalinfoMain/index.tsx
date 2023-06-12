/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */

import React, {useContext, useState, useMemo, useEffect} from 'react'
import {View, SafeAreaView} from 'react-native'
import {useTranslation} from 'react-i18next'
import {
  Layout,
  TCButton as Button,
  TCTextView as Text,
  TCInput as Input,
  DropDown,
  RadioButton,
  Spacer,
} from '@Components'
import {TEXT_VARIANTS, Colors, SPACER_SIZES, BASE_URL, getItem} from '@Utils'
import {StackNavigationProp} from '@react-navigation/stack'
import styled from 'styled-components/native'
import {pepList, specialNeedList} from './masterData'
import {fetcher} from '@Api'
import {useMutation} from '@tanstack/react-query'
import {AppContext, AppProviderProps} from '@Context'
import {useStore} from '@Store'

type IFormTYpe = {
  notKsaResidents: boolean
  pepEnabled: boolean
  pepValue?: string | undefined
  specialNeed: boolean
  specialNeedValue?: string
  specialNeedText?: string | null
}

const FormValues = {
  notKsaResidents: false,
  pepEnabled: false,
  specialNeed: false,
  specialNeedText: null,
  pepValue: undefined,
}

type Props = {
  navigation: StackNavigationProp<any>
  route: any
}

function LegalInformation({navigation}: Props) {
  const [currentOpendIndx, setCurrentOpenedInx] = useState(-1)
  const {isRTL} = useContext<AppProviderProps>(AppContext)
  const [statusError, setStatusError] = useState<any>(false)
  const {t} = useTranslation()

  const setOnboardingProgress = useStore(
    (store: any) => store.setOnboardingProgress,
  )

  const onBoardingProgress = useStore((store: any) => store.onBoardingProgress)

  const [values, setValues] = useState<IFormTYpe>({
    ...FormValues,
  })
  const [errors, setErrors] = useState<IFormTYpe>({
    ...FormValues,
  })

  const isFormValid = useMemo(() => {
    let isValid = true

    if (values.pepEnabled) {
      if (values.pepValue) {
        return true
      } else {
        return false
      }
    }

    if (values.specialNeed) {
      if (values.specialNeedValue) {
        if (values.specialNeedValue == 'Other') {
          return false
        } else {
          return true
        }
      } else {
        return false
      }
    }

    return isValid
  }, [values])

  const ToggleSheet = (indx: number) => {
    setCurrentOpenedInx(indx)
    let err = errors
    if (indx == 0) {
      err.pepValue = ''
    }
    if (indx == 1) {
      err.specialNeedValue = ''
    }

    setErrors(err)
  }
  const createPepType = (pepValue: string | undefined) => {
    let nVal = pepValue
      ? pepValue === 'I am related to politically exposed person'
        ? 'PEP'
        : 'REP'
      : null
    return nVal
  }
  const {isLoading, data, mutate} = useMutation({
    mutationFn: async () => {
      let journeySecrets
      let journeySecretsData = await getItem('journeySecrets')
      if (journeySecretsData) {
        journeySecrets = JSON.parse(journeySecretsData)
      }
      let req: any = await fetcher(BASE_URL + '/onboarding/legal', {
        method: 'POST',
        body: {
          non_resident: values.notKsaResidents,
          is_pep: values.pepEnabled ? true : false,
          medically_disabled: values.specialNeed ? true : false,
          disability_type: values.specialNeedValue,
          disability_type_description:
            values.specialNeedValue === 'Other' ? values.specialNeedText : null,
          pep_type: createPepType(values.pepValue),
        },
        token: journeySecrets.access_token,
      })
      let res = await req.json()
      return res
    },
  })

  useEffect(() => {
    if (data && data.on_boarding_application_id) {
      setOnboardingProgress({
        ...onBoardingProgress,
        legalMain: {
          non_resident: values.notKsaResidents,
          is_pep: values.pepEnabled ? true : false,
          medically_disabled: values.specialNeed ? true : false,
          disability_type: values.specialNeedValue,
          disability_type_description:
            values.specialNeedValue === 'Other' ? values.specialNeedText : null,
          pep_type: createPepType(values.pepValue),
        },
      })
      if (values.notKsaResidents) {
        navigation.navigate('LegalInfoOther')
      } else {
        navigation.navigate('CreateUser')
      }
    } else {
      const status = data?.status
      switch (true) {
        case status > 399 && status <= 500:
          setStatusError('Some Error Occurred ')
          break
        default:
          setStatusError('')
      }
    }
  }, [data])

  return (
    <>
      <Layout
        key={1}
        isBack={true}
        onBack={() => navigation.goBack()}
        isHeader={true}
        isLoading={isLoading}
        isBackground={true}>
        <SafeAreaWrapper>
          <View>
            <Spacer size={SPACER_SIZES.BASE * 1.5} />
            <Header isRTL={!!isRTL}>{t('Legal Requirements')}</Header>

            <AdditionalInformation>
              {t(
                'Do you have residency / citizenship / immigrant visa in any country other than KSA?',
              )}
            </AdditionalInformation>
            <Spacer size={SPACER_SIZES.BASE * 1.5} />
            <RadioWrapper isRTL={!!isRTL}>
              <RadioButton
                selected={!values.notKsaResidents}
                onPress={() =>
                  setValues({
                    ...values,
                    notKsaResidents: !values.notKsaResidents,
                  })
                }>
                {t('No')}
              </RadioButton>
              <RadioButton
                selected={values.notKsaResidents}
                onPress={() =>
                  setValues({
                    ...values,
                    notKsaResidents: !values.notKsaResidents,
                  })
                }>
                {t('Yes')}
              </RadioButton>
            </RadioWrapper>
            <Spacer size={SPACER_SIZES.BASE * 6} />
            <AdditionalInformation>
              {t('Are you a PEP or REP?')}
            </AdditionalInformation>
            <Spacer size={SPACER_SIZES.BASE * 1.5} />
            <RadioWrapper isRTL={!!isRTL}>
              <RadioButton
                selected={!values.pepEnabled}
                onPress={() =>
                  setValues({
                    ...values,
                    pepEnabled: !values.pepEnabled,
                  })
                }>
                {t('No')}
              </RadioButton>
              <RadioButton
                selected={values.pepEnabled}
                onPress={() =>
                  setValues({
                    ...values,
                    pepEnabled: !values.pepEnabled,
                  })
                }>
                {t('Yes')}
              </RadioButton>
            </RadioWrapper>
            {values.pepEnabled ? (
              <>
                <Spacer size={SPACER_SIZES.BASE * 2} />
                <DropDown
                  data={pepList.map(c =>
                    isRTL ? c.levelNameAr : c.levelNameEn,
                  )}
                  label={t('Select') || ''}
                  toogleClick={() => ToggleSheet(0)}
                  onItemSelected={(val: any) => {
                    setValues({...values, pepValue: val})
                  }}
                  value={values.pepValue}
                  error={errors.pepValue}
                  isOpen={currentOpendIndx == 0}
                  title={t('Are you a PEP or REP?')}
                  onSheetClose={() => setCurrentOpenedInx(-1)}
                  hasSearch={false}
                />
              </>
            ) : null}
            <Spacer size={SPACER_SIZES.BASE * 6} />
            <AdditionalInformation>
              {t('Do you have special needs?')}
            </AdditionalInformation>
            <Spacer size={SPACER_SIZES.BASE * 1.5} />
            <RadioWrapper isRTL={!!isRTL}>
              <RadioButton
                selected={!values.specialNeed}
                onPress={() =>
                  setValues({
                    ...values,
                    specialNeed: !values.specialNeed,
                  })
                }>
                {t('No')}
              </RadioButton>
              <RadioButton
                selected={values.specialNeed}
                onPress={() =>
                  setValues({
                    ...values,
                    specialNeed: !values.specialNeed,
                  })
                }>
                {t('Yes')}
              </RadioButton>
            </RadioWrapper>
            {values.specialNeed ? (
              <>
                <Spacer size={SPACER_SIZES.BASE * 2} />
                <DropDown
                  data={specialNeedList.map(c =>
                    isRTL ? c.levelNameAr : c.levelNameEn,
                  )}
                  label={t('Select') || ''}
                  toogleClick={() => ToggleSheet(1)}
                  onItemSelected={val =>
                    setValues({...values, specialNeedValue: val})
                  }
                  value={values.specialNeedValue}
                  error={errors.specialNeedValue}
                  isOpen={currentOpendIndx == 1}
                  title={t('Do you have special needs?')}
                  onSheetClose={() => setCurrentOpenedInx(-1)}
                  hasSearch={false}
                />
                {values.specialNeedValue == 'Other' && (
                  <>
                    <Spacer size={SPACER_SIZES.BASE * 1} />
                    <Input
                      onChangeText={val => {
                        setValues({...values, specialNeedText: val})
                      }}
                      label={'Disability'}
                    />
                  </>
                )}
              </>
            ) : null}
          </View>
          {statusError ? <ErrorText>{statusError}</ErrorText> : null}
          <StyledButton disabled={!isFormValid} onPress={mutate}>
            <Text variant={TEXT_VARIANTS.body}>
              {t('onboarding:personalInformation:continue')}
            </Text>
          </StyledButton>
        </SafeAreaWrapper>
      </Layout>
    </>
  )
}

export default LegalInformation

const Header = styled(Text)<{isRTL: boolean}>`
  font-size: 28px;
  line-height: 34px;
  color: ${Colors.SmokyBlack};
  text-align: ${props => (props.isRTL ? 'right' : 'left')};
  font-weight: 700;
  margin-top: 24px;
  margin-bottom: 32px;
`
const AdditionalInformation = styled(Text)`
  font-size: 17px;
  line-height: 22px;
  color: ${Colors.SmokyBlack};
`

const StyledButton = styled(Button)`
  margin-left: 32px;
  margin-right: 32px;
  width: 100%;
  align-self: center;
`
const RadioWrapper = styled(View)<{isRTL: boolean}>`
  flex-direction: row;
`
const SafeAreaWrapper = styled(SafeAreaView)`
  flex: 1;
  justify-content: space-between;
`

const ErrorText = styled(Text)`
  font-weight: 500;
  color: #f54d3f;
  padding-left: 16px;
`

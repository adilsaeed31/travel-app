/* eslint-disable eqeqeq */

import React, {useContext, useState, useMemo} from 'react'
import {View, SafeAreaView} from 'react-native'

import {useTranslation} from 'react-i18next'
import {
  Layout,
  TCButton as Button,
  TCTextView as Text,
  RadioButton,
  DropDown,
  TCInput,
} from '@Components'
import {
  TEXT_VARIANTS,
  Educationalist,
  Colors,
  EducationalistAr,
  CounryListAr,
  CounryListEN,
  SaudiCities,
} from '@Utils'
import styled from 'styled-components/native'
import {
  MobileNumberValidator,
  BuildingNumberValidator,
  StreetNameValidator,
  districtValidator,
  PostalCodeValidator,
  CityValidator,
  ContactName,
  relationValidaor,
} from './validators'
import {AppContext, AppProviderProps} from '@Context'
type IFormTYpe = {
  city: string | null
  education: string | null
  countryOfBirth: string | null
  buldingNumber: string | null
  streetNanme: string | null
  district: string | null
  poBox: string | null
  postalCode: string | null
  phoneNumber: string | null
  contactName: string | null
  relation: string | null
  mobileNumber: string | null
}

const FormValues = {
  education: '',
  countryOfBirth: '',
  city: '',
  buldingNumber: '',
  streetNanme: '',
  district: '',
  poBox: '',
  postalCode: '',
  phoneNumber: '',
  contactName: '',
  relation: '',
  mobileNumber: '',
}

function PersonalInformation() {
  const [showAdditionalInformation, setShowAdditionalInformation] =
    useState(false)
  const [currentOpendIndx, setCurrentOpenedInx] = useState(-1)
  const {isRTL} = useContext<AppProviderProps>(AppContext)
  const {t} = useTranslation()
  const [values, setValues] = useState<IFormTYpe>({
    ...FormValues,
  })
  const [errors, setErrors] = useState({
    ...FormValues,
  })
  const IsSaudi = useMemo(() => {
    return (
      values?.countryOfBirth === 'Saudi Arabia' ||
      values?.countryOfBirth == 'المملكة العربية السعودية' ||
      !values?.countryOfBirth
    )
  }, [values.countryOfBirth])

  const ToggleSheet = (indx: number) => {
    setCurrentOpenedInx(indx)
    let err = errors
    if (indx == 0) {
      err.education = ''
    }
    if (indx == 1) {
      err.countryOfBirth = ''
    }
    if (indx == 2) {
      err.city = ''
    }
    setErrors(err)
  }
  const isFormValid = useMemo(() => {
    let isValid = false
    if (
      values.education &&
      values.countryOfBirth &&
      values.city &&
      !showAdditionalInformation
    ) {
      isValid = true
    }
    if (
      !IsSaudi &&
      values.buldingNumber &&
      values.streetNanme &&
      values.district &&
      values.poBox &&
      values.postalCode &&
      values.city &&
      values.phoneNumber
    ) {
      isValid = true
    }
    if (showAdditionalInformation) {
      if (!isValid) {
        return
      }
      !values.contactName || !values.relation || !values.phoneNumber
        ? (isValid = false)
        : (isValid = true)
    }
    return isValid
  }, [values, IsSaudi, showAdditionalInformation])
  const HandleContinuePressed = () => {
    let err = {...errors}
    if (!values.city) {
      err.city = t('common:required')
    }
    if (!values.countryOfBirth) {
      err.countryOfBirth = t('common:required')
    }
    if (!values.education) {
      err.education = t('common:required')
    }
    if (!IsSaudi) {
      err.buldingNumber = !values.buldingNumber ? t('common:required') : ''
      err.streetNanme = !values.streetNanme ? t('common:required') : ''
      err.district = !values.district ? t('common:required') : ''
      err.poBox = !values.poBox ? t('common:required') : ''
      err.postalCode = !values.postalCode ? t('common:required') : ''
      err.phoneNumber = !values.phoneNumber ? '' : t('common:required')
    }
    if (showAdditionalInformation) {
      err.contactName = !values.contactName ? t('common:required') : ''
      err.relation = !values.relation ? t('common:required') : ''
      err.phoneNumber = !values.phoneNumber ? t('common:required') : ''
    }
    setErrors(err)
  }
  return (
    <>
      <Layout isBack={true} isHeader={true} isBackground={true}>
        <ScrollerView>
          <SafeAreaWrapper>
            <FormWrapper isRTL={!!isRTL}>
              <Spacer />
              <Header isRTL={!!isRTL}>
                {t('onboarding:personalInformation:personalInformation')}
              </Header>
              <DropDown
                data={isRTL ? EducationalistAr : Educationalist}
                label={t('onboarding:personalInformation:education') || ''}
                toogleClick={() => ToggleSheet(0)}
                onItemSelected={education => setValues({...values, education})}
                value={values.education}
                error={errors.education}
                isOpen={currentOpendIndx == 0}
                title={t('onboarding:personalInformation:education')}
                subTitle={t('onboarding:personalInformation:education')}
                onSheetClose={() => setCurrentOpenedInx(-1)}
                hasSearch
              />
              <Spacer />
              <DropDown
                data={
                  isRTL
                    ? CounryListAr.map(c => c.name)
                    : CounryListEN.map(c => c.name)
                }
                toogleClick={() => {
                  ToggleSheet(1)
                  setValues({...values, city: null})
                }}
                label={t('onboarding:personalInformation:countryOfBirth') || ''}
                value={values.countryOfBirth}
                error={errors.countryOfBirth}
                title={t('onboarding:personalInformation:countryOfBirth')}
                subTitle={
                  t('onboarding:personalInformation:countryOfBirth') || ''
                }
                isOpen={currentOpendIndx == 1}
                onSheetClose={() => setCurrentOpenedInx(-1)}
                hasSearch
                onItemSelected={countryOfBirth =>
                  setValues({...values, countryOfBirth})
                }
              />
              <Spacer />
              {IsSaudi ? (
                <DropDown
                  data={SaudiCities.map(c => c[isRTL ? 'name_ar' : 'name_en'])}
                  disabled={!values.countryOfBirth}
                  toogleClick={() => {
                    if (!values.countryOfBirth) {
                      return
                    }
                    ToggleSheet(2)
                  }}
                  label={t('onboarding:personalInformation:city') || ''}
                  value={values.city}
                  error={errors.city}
                  title={t('onboarding:personalInformation:city')}
                  subTitle={t('onboarding:personalInformation:city')}
                  isOpen={currentOpendIndx == 2}
                  onSheetClose={() => setCurrentOpenedInx(-1)}
                  hasSearch
                  onItemSelected={city => setValues({...values, city})}
                />
              ) : (
                <LoginForm>
                  <TCInput
                    value={values.buldingNumber}
                    onChangeText={val =>
                      val && setValues({...values, buldingNumber: val})
                    }
                    label={t('onboarding:personalInformation:buldingNumber')}
                    errorMessage={errors.buldingNumber}
                    keyboardType="number-pad"
                    returnKeyType="done"
                    maxLength={10}
                    schema={BuildingNumberValidator}
                  />
                  <InputSpacer />
                  <TCInput
                    value={values.streetNanme}
                    onChangeText={val =>
                      val && setValues({...values, streetNanme: val})
                    }
                    label={t('onboarding:personalInformation:streetNanme')}
                    errorMessage={errors.streetNanme}
                    returnKeyType="done"
                    maxLength={10}
                    schema={StreetNameValidator}
                  />
                  <InputSpacer />
                  <TCInput
                    value={values.district}
                    onChangeText={val =>
                      val && setValues({...values, district: val})
                    }
                    label={t('onboarding:personalInformation:district')}
                    errorMessage={errors.district}
                    returnKeyType="done"
                    maxLength={10}
                    schema={districtValidator}
                  />
                  <InputSpacer />
                  <TCInput
                    value={values.poBox}
                    onChangeText={val =>
                      val && setValues({...values, poBox: val})
                    }
                    label={t('onboarding:personalInformation:poBox')}
                    errorMessage={errors.poBox}
                    returnKeyType="done"
                    maxLength={10}
                  />
                  <InputSpacer />
                  <TCInput
                    value={values.postalCode}
                    onChangeText={val =>
                      val && setValues({...values, postalCode: val})
                    }
                    label={t('onboarding:personalInformation:postalCode')}
                    errorMessage={errors.postalCode}
                    keyboardType="number-pad"
                    returnKeyType="done"
                    maxLength={10}
                    schema={PostalCodeValidator}
                  />
                  <InputSpacer />
                  <TCInput
                    value={values.city}
                    onChangeText={val =>
                      val && setValues({...values, city: val})
                    }
                    label={t('onboarding:personalInformation:city')}
                    errorMessage={errors.city}
                    returnKeyType="done"
                    maxLength={10}
                    schema={CityValidator}
                  />
                  <InputSpacer />
                  <TCInput
                    value={values.phoneNumber}
                    onChangeText={val =>
                      val && setValues({...values, phoneNumber: val})
                    }
                    label={t('onboarding:personalInformation:phoneNumber')}
                    schema={MobileNumberValidator}
                    keyboardType="number-pad"
                    returnKeyType="done"
                    maxLength={10}
                  />
                  <InputSpacer />
                </LoginForm>
              )}
              <Spacer />
              <AdditionalInformation>
                {t('onboarding:personalInformation:additionalPerson')}
              </AdditionalInformation>
              <AdditionalInformation>
                {t('onboarding:personalInformation:additionalPersonSecond')}
              </AdditionalInformation>
              <Spacer />
              <RadioWrapper isRTL={!!isRTL}>
                <RadioButton
                  selected={!showAdditionalInformation}
                  onPress={() =>
                    setShowAdditionalInformation(!showAdditionalInformation)
                  }>
                  {t('onboarding:personalInformation:no')}
                </RadioButton>
                <RadioButton
                  selected={showAdditionalInformation}
                  onPress={() =>
                    setShowAdditionalInformation(!showAdditionalInformation)
                  }>
                  {t('onboarding:personalInformation:yes')}
                </RadioButton>
              </RadioWrapper>
              <Spacer />
              {showAdditionalInformation && (
                <LoginForm>
                  <TCInput
                    value={values.contactName}
                    onChangeText={val =>
                      val && setValues({...values, contactName: val})
                    }
                    label={t(
                      'onboarding:personalInformation:addetionalContactNanme',
                    )}
                    errorMessage={errors.contactName}
                    returnKeyType="done"
                    maxLength={10}
                    schema={ContactName}
                  />
                  <Spacer />
                  <TCInput
                    value={values.relation}
                    onChangeText={val =>
                      val && setValues({...values, relation: val})
                    }
                    label={t('onboarding:personalInformation:relation')}
                    errorMessage={errors.relation}
                    returnKeyType="done"
                    maxLength={10}
                    schema={relationValidaor}
                  />
                  <Spacer />
                  <TCInput
                    value={values.phoneNumber}
                    onChangeText={val =>
                      val && setValues({...values, phoneNumber: val})
                    }
                    label={t('onboarding:personalInformation:mobileNumber')}
                    errorMessage={errors.phoneNumber}
                    schema={MobileNumberValidator}
                    returnKeyType="done"
                  />
                  <Spacer />
                </LoginForm>
              )}
            </FormWrapper>
            <StyledButton
              disabled={!isFormValid}
              onPress={HandleContinuePressed}>
              <Text variant={TEXT_VARIANTS.body700}>
                {t('onboarding:personalInformation:continue')}
              </Text>
            </StyledButton>
          </SafeAreaWrapper>
        </ScrollerView>
      </Layout>
    </>
  )
}

export default PersonalInformation

const InputSpacer = styled(View)`
  margin-bottom: 12px;
`
const Spacer = styled(View)`
  margin-bottom: 20px;
`
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
const FormWrapper = styled(SafeAreaView)<{isRTL: boolean}>`
  align-items: ${props => (props.isRTL ? 'flex-end' : 'flex-start')};
  flex: 1;
`

const LoginForm = styled.View`
  width: 100%;
  margin-top: 10px;
`
const ScrollerView = styled.ScrollView``

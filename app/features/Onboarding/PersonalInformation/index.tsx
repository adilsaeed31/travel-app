/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */

import React, {useContext, useState, useMemo, useEffect} from 'react'
import {View, SafeAreaView, ScrollView, StyleSheet} from 'react-native'
import {fetcher} from '@Api'
import {StackNavigationProp} from '@react-navigation/stack'
import {useTranslation} from 'react-i18next'
import {
  Layout,
  TCButton as Button,
  TCTextView as Text,
  RadioButton,
  DropDown,
  TCInput,
} from '@Components'
import {TEXT_VARIANTS, Colors, BASE_URL, getItem} from '@Utils'
import {useMutation} from '@tanstack/react-query'
import {countriesList, SaudiList, educationList} from './masterData'
import styled from 'styled-components/native'
import {PostalCodeValidator, CityValidator, ContactName} from './validators'
import {useStore} from '@Store'
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
const MapApiToState = (apiResponse: any, isRTL: boolean | undefined) => {
  return {
    countryOfBirth: isRTL
      ? apiResponse?.birth_country?.name_ar
      : apiResponse?.birth_country?.name_en,
    city: isRTL
      ? apiResponse?.birth_city?.name_ar || apiResponse?.offshore_address?.city
      : apiResponse?.birth_city?.name_en || apiResponse?.offshore_address?.city,
    education: isRTL
      ? apiResponse?.education?.level_name_ar
      : apiResponse?.education?.level_name_en,
    phoneNumber: apiResponse?.offshore_address?.contact_number,
    buldingNumber: apiResponse?.offshore_address?.building_number,
    postalCode: apiResponse?.offshore_address?.postal_code,
    streetNanme: apiResponse?.offshore_address?.street,
    district: apiResponse?.offshore_address?.district,
    contactName: apiResponse?.additional_contact?.name,
    relation: apiResponse?.additional_contact?.relation,
    mobileNumber: apiResponse?.additional_contact?.contact_number,
    poBox: apiResponse?.offshore_address?.po_box,
  }
}
const MapFormValuesForApi = (
  values: IFormTYpe,
  IsSaudi: boolean,
  showAdditionalInformation: boolean,
  isRTL: boolean | undefined,
) => {
  let educationOb = educationList.find(
    e => e.levelNameEn == values.education || e.levelNameAr == values.education,
  )
  let birthCountryOb = countriesList.find(
    e => e.nameAr == values.countryOfBirth || e.nameEn == values.countryOfBirth,
  )
  let birthCity = SaudiList.find(c =>
    isRTL ? c.nameAr == values.city : c.nameEn == values.city,
  )
  let education = {
    level_code: educationOb?.levelCode,
    level_name_en: educationOb?.levelNameEn,
    level_name_ar: educationOb?.levelNameAr,
  }
  let birth_country = {
    code: birthCountryOb?.code,
    name_en: birthCountryOb?.nameEn,
    name_ar: birthCountryOb?.nameAr,
  }
  let birth_city = !IsSaudi
    ? null
    : {
        code: birthCity?.code,
        name_en: birthCity?.nameEn,
        name_ar: birthCity?.nameAr,
      }
  let offshore_address = IsSaudi
    ? null
    : {
        building_number: values.buldingNumber,
        street: values.streetNanme,
        district: values.district,
        postal_code: values.postalCode,
        city: values.city,
        contact_number: values.phoneNumber,
        country: values.countryOfBirth,
      }
  let additional_contact = !showAdditionalInformation
    ? null
    : {
        name: values.contactName,
        relation: values.relation,
        contact_number: values.mobileNumber,
      }
  let po_box = values.poBox
  return {
    education,
    birth_country,
    birth_city,
    offshore_address,
    additional_contact,
    po_box,
  }
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

type Props = {
  navigation: StackNavigationProp<any>
}

function PersonalInformation({navigation}: Props) {
  const [showAdditionalInformation, setShowAdditionalInformation] =
    useState(false)
  const [currentOpendIndx, setCurrentOpenedInx] = useState(-1)
  const {isRTL} = useContext<AppProviderProps>(AppContext)
  const [disabledFields, setDisabledFields] = useState({countryOfBirth: false})
  const {t} = useTranslation()
  const [values, setValues] = useState<IFormTYpe>({
    ...FormValues,
  })
  const [errors, setErrors] = useState({
    ...FormValues,
  })

  const setOnboardingProgress = useStore(
    (store: any) => store.setOnboardingProgress,
  )

  const onBoardingProgress = useStore((store: any) => store.onBoardingProgress)

  const [systemErrorMessage, setSystemErrorMessage] = useState<any>('')
  const IsSaudi = useMemo(() => {
    const current = countriesList.findIndex(
      country =>
        country.nameAr == values?.countryOfBirth ||
        country.nameEn == values?.countryOfBirth,
    )
    const isSaudiSelected =
      current == -1 ? false : countriesList[current].code == 'SA'
    return isSaudiSelected || !values?.countryOfBirth
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
    if (values.education && values.countryOfBirth && values.city) {
      isValid = true
    }
    if (!IsSaudi) {
      if (
        values.buldingNumber &&
        values.streetNanme &&
        values.district &&
        values.postalCode &&
        values.city &&
        values.phoneNumber &&
        values.phoneNumber?.length > 3
      ) {
        isValid = true
      } else {
        return (isValid = false)
      }
    }
    if (showAdditionalInformation) {
      if (!isValid) {
        return
      }
      !values.contactName || !values.relation || !values.mobileNumber
        ? (isValid = false)
        : (isValid = true)
    }
    return isValid
  }, [values, IsSaudi, showAdditionalInformation])

  const {isLoading, data, mutate} = useMutation({
    mutationFn: async () => {
      let journeySecrets
      let journeySecretsData = await getItem('journeySecrets')
      if (journeySecretsData) {
        journeySecrets = JSON.parse(journeySecretsData)
      }

      let req: any = await fetcher(BASE_URL + '/onboarding/personal', {
        method: 'POST',
        body: MapFormValuesForApi(
          values,
          IsSaudi,
          showAdditionalInformation,
          isRTL,
        ),
        token: journeySecrets.access_token,
      })
      let res = await req.json()
      return res
    },
  })

  const {
    isLoading: isGetDataLoading,
    data: PersonalInformationData,
    mutate: GetPersonalInformationData,
  } = useMutation({
    mutationFn: async () => {
      let journeySecrets
      let journeySecretsData = await getItem('journeySecrets')
      if (journeySecretsData) {
        journeySecrets = JSON.parse(journeySecretsData)
      }
      let req: any = await fetcher(BASE_URL + '/onboarding/personal', {
        method: 'GET',
        token: journeySecrets.access_token,
      })
      let res = await req.json()
      return res
    },
  })
  useEffect(() => {
    GetPersonalInformationData()
  }, [])

  useEffect(() => {
    setValues({
      ...values,
      ...MapApiToState(PersonalInformationData, isRTL),
    })
    setShowAdditionalInformation(
      PersonalInformationData?.additional_contact?.contact_number
        ? true
        : false,
    )
    if (
      PersonalInformationData?.birth_country?.name_ar ||
      PersonalInformationData?.birth_country?.name_ar
    ) {
      setDisabledFields({...disabledFields, countryOfBirth: true})
    }
  }, [PersonalInformationData])

  useEffect(() => {
    if (data?.onboarding_application_id) {
      setOnboardingProgress({
        ...onBoardingProgress,
        personalInformation: MapFormValuesForApi(
          values,
          IsSaudi,
          showAdditionalInformation,
          isRTL,
        ),
      })
      navigation.navigate('FinicalInformation')
    }

    if (data && !data?.onboarding_application_id) {
      setSystemErrorMessage(t('common:someThingWentWrong'))
    }
  }, [data])

  const RenderCHeckbox = React.useMemo(
    () => (
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
    ),
    [showAdditionalInformation],
  )
  const handlePostPersonalInformation = () => {
    setSystemErrorMessage('')
    mutate()
  }
  return (
    <ScrollView
      keyboardShouldPersistTaps="always"
      key={String(
        showAdditionalInformation + String(values.countryOfBirth || ''),
      )}
      contentContainerStyle={styles.scrollViewContainer}>
      <Layout
        isBack={false}
        onBack={() => navigation.goBack()}
        isHeader={false}
        isLoading={isLoading || isGetDataLoading}
        isBackground={true}>
        <SafeAreaWrapper>
          <View>
            <Spacer />
            <Header isRTL={!!isRTL}>
              {t('onboarding:personalInformation:personalInformation')}
            </Header>
            <DropDown
              dynamicHeight
              data={educationList.map(c =>
                isRTL ? c.levelNameAr : c.levelNameEn,
              )}
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
              disabled={disabledFields.countryOfBirth}
              data={countriesList
                .filter(c => c.code !== 'SA')
                .map(c => (isRTL ? c.nameAr : c.nameEn))}
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
                data={SaudiList.map(c => (isRTL ? c.nameAr : c.nameEn))}
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
                    setValues({...values, buldingNumber: val})
                  }
                  label={t('onboarding:personalInformation:buldingNumber')}
                  errorMessage={errors.buldingNumber}
                  returnKeyType="done"
                  maxLength={10}
                />
                <InputSpacer />
                <TCInput
                  value={values.streetNanme}
                  onChangeText={val => setValues({...values, streetNanme: val})}
                  label={t('onboarding:personalInformation:streetNanme')}
                  errorMessage={errors.streetNanme}
                  returnKeyType="done"
                  maxLength={50}
                />
                <InputSpacer />
                <TCInput
                  value={values.district}
                  onChangeText={val => setValues({...values, district: val})}
                  label={t('onboarding:personalInformation:district')}
                  errorMessage={errors.district}
                  returnKeyType="done"
                  maxLength={50}
                />
                <InputSpacer />
                <TCInput
                  value={values.poBox}
                  onChangeText={val => setValues({...values, poBox: val})}
                  label={t('onboarding:personalInformation:poBox')}
                  errorMessage={errors.poBox}
                  returnKeyType="done"
                  maxLength={10}
                />
                <InputSpacer />
                <TCInput
                  value={values.postalCode}
                  onChangeText={val => setValues({...values, postalCode: val})}
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
                  onChangeText={val => setValues({...values, city: val})}
                  label={t('onboarding:personalInformation:city')}
                  errorMessage={errors.city}
                  returnKeyType="done"
                  maxLength={10}
                  schema={CityValidator}
                />
                <InputSpacer />
                <TCInput
                  value={values.phoneNumber}
                  onChangeText={val => setValues({...values, phoneNumber: val})}
                  label={t('onboarding:personalInformation:phoneNumber')}
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
            {RenderCHeckbox}
            <Spacer />
            {showAdditionalInformation && (
              <LoginForm>
                <TCInput
                  value={values.contactName}
                  onChangeText={val => setValues({...values, contactName: val})}
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
                  onChangeText={val => setValues({...values, relation: val})}
                  label={t('onboarding:personalInformation:relation')}
                  errorMessage={errors.relation}
                  returnKeyType="done"
                  maxLength={10}
                />
                <Spacer />
                <TCInput
                  value={values.mobileNumber}
                  onChangeText={val =>
                    setValues({...values, mobileNumber: val})
                  }
                  label={t('onboarding:personalInformation:mobileNumber')}
                  errorMessage={errors.mobileNumber}
                  returnKeyType="done"
                />
                <Spacer />
              </LoginForm>
            )}
          </View>
          <View>
            {systemErrorMessage?.length ? (
              <ErrorView>
                <Text variant={TEXT_VARIANTS.caption}>
                  {systemErrorMessage}
                </Text>
              </ErrorView>
            ) : null}
            <StyledButton
              disabled={!isFormValid}
              onPress={handlePostPersonalInformation}>
              <Text variant={TEXT_VARIANTS.bodyBold}>
                {t('onboarding:personalInformation:continue')}
              </Text>
            </StyledButton>
          </View>
        </SafeAreaWrapper>
      </Layout>
    </ScrollView>
  )
}

export default PersonalInformation

const ErrorView = styled(View)`
  padding: 14px 16px;

  background: rgba(255, 64, 0, 0.08);

  border: 0.5px solid #ff4000;
  backdrop-filter: blur(4px);
  border: 0.5px solid #ff4000;
  border-radius: 16px;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`
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

const LoginForm = styled.View`
  width: 100%;
  margin-top: 10px;
`
const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
  },
})

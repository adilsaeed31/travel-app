/* eslint-disable react-hooks/exhaustive-deps */
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
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import styled from 'styled-components/native'
import {USdocumentTypes} from '../masterData'
import {postalCodeValidator, cityValidator} from '../validators'
import {AppContext, AppProviderProps} from '@Context'
import {useStore} from '@Store'
import {fetcher} from '@Api'
import {useMutation} from '@tanstack/react-query'
import {useFocusEffect} from '@react-navigation/native'

type IFormTYpe = {
  documentType: string | null
  documentNumber: string | null
  addressOutsideKSA: boolean
  buldingNumber?: string
  streetNanme?: string
  district?: string
  poBox?: string
  postalCode?: string
  city?: string
  phoneNumber?: string
  edited?: boolean
}

const FormValues = {
  documentType: null,
  documentNumber: null,
  addressOutsideKSA: false,
}

type Props = {
  navigation: NativeStackNavigationProp<any>
  route: any
}

function Screen({navigation, route}: Props) {
  const [currentOpendIndx, setCurrentOpenedInx] = useState(-1)
  const {isRTL} = useContext<AppProviderProps>(AppContext)
  const {t} = useTranslation()

  const [values, setValues] = useState<IFormTYpe>({
    ...FormValues,
  })
  const [errors, setErrors] = useState<IFormTYpe>({
    ...FormValues,
  })
  const [statusError, setStatusError] = useState<any>(false)

  const setOnboardingProgress = useStore(
    (store: any) => store.setOnboardingProgress,
  )

  const onBoardingProgress = useStore((store: any) => store.onBoardingProgress)

  useFocusEffect(() => {
    const routeData = route.params
    if (routeData?.historyPage === 'LegalInfoFlow3' && !values.edited) {
      setValues({
        ...values,
        edited: true,
        documentType: null,
        documentNumber: null,
        addressOutsideKSA: false,
        buldingNumber: undefined,
        streetNanme: undefined,
        district: undefined,
        poBox: undefined,
        postalCode: undefined,
        city: undefined,
        phoneNumber: undefined,
      })
    } else {
    }
  })

  const ToggleSheet = (indx: number) => {
    setCurrentOpenedInx(indx)
    let err = errors
    if (indx === 0) {
      err.documentType = ''
    }

    setErrors(err)
  }

  const isFormValid = useMemo(() => {
    let isValid = false
    if (values.documentType && values.documentNumber) {
      isValid = true
    }

    if (values.addressOutsideKSA) {
      if (
        values.addressOutsideKSA &&
        values.buldingNumber &&
        values.streetNanme &&
        values.district &&
        values.postalCode &&
        values.city &&
        values.phoneNumber
      ) {
        isValid = true
      } else {
        isValid = false
      }
    }

    return isValid
  }, [
    values.documentType,
    values.documentNumber,
    values.addressOutsideKSA,
    values.buldingNumber,
    values.streetNanme,
    values.district,
    values.poBox,
    values.postalCode,
    values.city,
    values.phoneNumber,
  ])

  const {isLoading, data, mutate} = useMutation({
    mutationFn: async () => {
      let journeySecrets
      let journeySecretsData = await getItem('journeySecrets')
      if (journeySecretsData) {
        journeySecrets = JSON.parse(journeySecretsData)
      }

      let req: any = await fetcher(BASE_URL + '/onboarding/legal/foreign', {
        method: 'POST',
        body: {
          document_type: values.documentType,
          document_number: values.documentNumber,
          offshore_address: values.addressOutsideKSA
            ? {
                building_number: values.buldingNumber,
                street: values.streetNanme,
                district: values.district,
                postal_code: values.postalCode,
                city: values.city,
                contact_number: values.phoneNumber,
                country: 'USA',
                po_box: values.poBox,
              }
            : null,
        },
        token: journeySecrets.access_token,
      })
      let res = await req.json()
      return res
    },
  })

  useEffect(() => {
    try {
      if (data) {
        setOnboardingProgress({
          ...onBoardingProgress,
          legalInfoFlow1: {
            document_type: values.documentType,
            document_number: values.documentNumber,
            offshore_address: values.addressOutsideKSA
              ? {
                  building_number: values.buldingNumber,
                  street: values.streetNanme,
                  district: values.district,
                  postal_code: values.postalCode,
                  city: values.city,
                  contact_number: values.phoneNumber,
                  country: 'USA',
                  po_box: values.poBox,
                }
              : null,
          },
        })

        const routeData = route.params

        if (routeData?.historyPage === 'LegalInfoFlow3') {
          if (onBoardingProgress?.legalInfoMain?.residentOutsideKSA) {
            navigation.navigate('LegalInfoFlow4')
            return
          } else {
            navigation.navigate('CreateUser')
            return
          }
        } else {
          if (onBoardingProgress?.legalInfoMain?.taxOutsideKSA) {
            navigation.navigate('LegalInfoFlow2')
            return
          } else if (onBoardingProgress?.legalInfoMain?.moreCitizens) {
            navigation.navigate('LegalInfoFlow3')
            return
          } else if (onBoardingProgress?.legalInfoMain?.residentOutsideKSA) {
            navigation.navigate('LegalInfoFlow4')
            return
          } else {
            navigation.navigate('CreateUser')
            return
          }
        }
      }
    } catch (e) {
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
              {t('Are you a US Person?')}
            </AdditionalInformation>
            <Spacer size={SPACER_SIZES.BASE * 1.5} />
            <DropDown
              data={USdocumentTypes.map(c =>
                isRTL ? c.levelNameAr : c.levelNameEn,
              )}
              label={t('Select') || ''}
              toogleClick={() => ToggleSheet(0)}
              onItemSelected={(val: any) =>
                setValues({...values, documentType: val})
              }
              value={values.documentType}
              error={errors.documentType}
              isOpen={currentOpendIndx === 0}
              title={t('The Document Type')}
              onSheetClose={() => setCurrentOpenedInx(-1)}
              hasSearch={false}
              dynamicHeight
            />
            <Spacer size={SPACER_SIZES.BASE * 4} />
            <Input
              label={'Document number'}
              value={values.documentNumber}
              maxLength={30}
              onChangeText={text =>
                setValues({...values, documentNumber: text})
              }
            />
            <Spacer size={SPACER_SIZES.BASE * 4} />
            <AdditionalInformation>
              {t('Do you have addresss outside of KSA')}
            </AdditionalInformation>
            <Spacer size={SPACER_SIZES.BASE * 1.5} />
            <RadioWrapper isRTL={!!isRTL}>
              <RadioButton
                selected={!values.addressOutsideKSA}
                onPress={() =>
                  setValues({
                    ...values,
                    addressOutsideKSA: !values.addressOutsideKSA,
                  })
                }>
                {t('No')}
              </RadioButton>
              <RadioButton
                selected={values.addressOutsideKSA}
                onPress={() =>
                  setValues({
                    ...values,
                    addressOutsideKSA: !values.addressOutsideKSA,
                  })
                }>
                {t('Yes')}
              </RadioButton>
            </RadioWrapper>
            <Spacer size={SPACER_SIZES.SM} />
            {values.addressOutsideKSA && (
              <Row>
                <Input
                  value={values.buldingNumber}
                  onChangeText={val =>
                    setValues({...values, buldingNumber: val})
                  }
                  label={t('onboarding:personalInformation:buldingNumber')}
                  errorMessage={errors.buldingNumber}
                  returnKeyType="done"
                  maxLength={10}
                />
                <Spacer size={SPACER_SIZES.BASE * 4} />
                <Input
                  value={values.streetNanme}
                  onChangeText={val => setValues({...values, streetNanme: val})}
                  label={t('onboarding:personalInformation:streetNanme')}
                  errorMessage={errors.streetNanme}
                  returnKeyType="done"
                  maxLength={50}
                />
                <Spacer size={SPACER_SIZES.BASE * 4} />
                <Input
                  value={values.district}
                  onChangeText={val => setValues({...values, district: val})}
                  label={t('onboarding:personalInformation:district')}
                  errorMessage={errors.district}
                  returnKeyType="done"
                  maxLength={50}
                />
                <Spacer size={SPACER_SIZES.BASE * 4} />
                <Input
                  value={values.poBox}
                  onChangeText={val => setValues({...values, poBox: val})}
                  label={t('onboarding:personalInformation:poBox')}
                  errorMessage={errors.poBox}
                  returnKeyType="done"
                  maxLength={10}
                />
                <Spacer size={SPACER_SIZES.BASE * 4} />
                <Input
                  value={values.postalCode}
                  onChangeText={val => setValues({...values, postalCode: val})}
                  label={t('onboarding:personalInformation:postalCode')}
                  errorMessage={errors.postalCode}
                  returnKeyType="done"
                  maxLength={10}
                  schema={postalCodeValidator}
                />
                <Spacer size={SPACER_SIZES.BASE * 4} />
                <Input
                  value={values.city}
                  onChangeText={val => setValues({...values, city: val})}
                  label={t('onboarding:personalInformation:city')}
                  errorMessage={errors.city}
                  returnKeyType="done"
                  maxLength={30}
                  schema={cityValidator}
                />
                <Spacer size={SPACER_SIZES.BASE * 4} />
                <Input
                  value={values.phoneNumber}
                  onChangeText={val => setValues({...values, phoneNumber: val})}
                  label={t('onboarding:personalInformation:phoneNumber')}
                  keyboardType="number-pad"
                  returnKeyType="done"
                  maxLength={16}
                />
                <Spacer size={SPACER_SIZES.BASE * 4} />
              </Row>
            )}
          </View>
          {statusError ? <ErrorText>{statusError}</ErrorText> : null}
          <StyledButton disabled={!isFormValid} onPress={mutate}>
            <Text variant={TEXT_VARIANTS.body}>{t('onboarding:continue')}</Text>
          </StyledButton>
        </SafeAreaWrapper>
      </Layout>
    </>
  )
}

export default Screen

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

const SafeAreaWrapper = styled(SafeAreaView)`
  flex: 1;
  justify-content: space-between;
`

const RadioWrapper = styled(View)<{isRTL: boolean}>`
  flex-direction: row;
`
const Row = styled.View`
  width: 100%;
`
const StyledButton = styled(Button)`
  margin-left: 32px;
  margin-right: 32px;
  width: 100%;
  align-self: center;
`

const ErrorText = styled(Text)`
  font-weight: 500;
  color: #f54d3f;
  padding-left: 16px;
`

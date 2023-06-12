/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable eqeqeq */

// /* eslint-disable react/no-unstable-nested-components */
// /* eslint-disable react-native/no-inline-styles */
// /* eslint-disable eqeqeq */

import React, {useContext, useEffect, useMemo, useState} from 'react'
import {View, SafeAreaView, TouchableOpacity, StyleSheet} from 'react-native'
import {fetcher} from '@Api'
import {useMutation} from '@tanstack/react-query'
import {SheetData, SheetsIndexs} from './SheetData'
import {StackNavigationProp} from '@react-navigation/stack'
import {useTranslation} from 'react-i18next'
import {
  Layout,
  TCButton as Button,
  TCTextView as Text,
  RadioButton,
  DropDown,
  TCInput,
  DatePicker,
} from '@Components'
import {TEXT_VARIANTS, Colors, getItem, BASE_URL} from '@Utils'
import styled from 'styled-components/native'
import {AppContext, AppProviderProps} from '@Context'

function getFormattedDate(date: Date) {
  let year = date?.getFullYear()
  let month = (1 + date?.getMonth()).toString().padStart(2, '0')
  let day = date?.getDate().toString().padStart(2, '0')
  return month + '/' + day + '/' + year
}

type IFormTYpe = {
  occupation: string | null
  jobCategory: string | null
  nameOfBusiness: string | null
  jobTitle: string | null
  sector: string | null
  investmentType: string | null
  monthlyPrimaryIncomAmount: number
  primarySourceOfIncome: string | null
  dateOfJoin: string | null
  gregorian: boolean
  AddetionalSourceOfIncome: boolean
  AddetionalSourceOfIncomeSource: string | null
  AddetionalSourceOfIncomeAmount: string | null
  AnotherAddetionalSourceOfIncome: boolean
  AnotherAddetionalSourceOfIncomeSource: string | null
  AnotherAddetionalSourceOfIncomeAmount: string | null
}

const FormValues = {
  occupation: '',
  jobCategory: '',
  nameOfBusiness: '',
  jobTitle: '',
  sector: '',
  investmentType: '',
  monthlyPrimaryIncomAmount: '',
  primarySourceOfIncome: '',
  dateOfJoin: '',
  gregorian: true,
  AddetionalSourceOfIncome: false,
  AddetionalSourceOfIncomeSource: '',
  AddetionalSourceOfIncomeAmount: '',
  AnotherAddetionalSourceOfIncome: false,
  AnotherAddetionalSourceOfIncomeSource: '',
  AnotherAddetionalSourceOfIncomeAmount: '',
}

const GenerateMinMaxIncome = (code: number) => {
  //'Housewife' ||'Unemployed' ||'Not authorized to work' ||Student' >4// 'Investor' 3 //Business & Professional' 2 //  'Salary/Pension' 1
  let minIncome =
    code == 3 ? 300 : code == 2 ? 300 : code >= 4 ? 300 : code == 1 ? 300 : 3000
  let maxIncome =
    code == 3
      ? 10000000
      : code == 2
      ? 5000000
      : code >= 4
      ? 100000
      : code == 1
      ? 500000
      : 500000
  return {
    minIncome,
    maxIncome,
  }
}
const MapApiApiToState = (
  values: IFormTYpe,
  fincialInformationGetData: any,
  isRTL: boolean,
) => {
  let occupation = fincialInformationGetData?.occupation?.code
    ? SheetData.Occupation.find(
        p => p.code == fincialInformationGetData?.occupation?.code,
      )
    : null
  let jobCategory = fincialInformationGetData?.employment?.category
    ? isRTL
      ? fincialInformationGetData?.employment?.category.name_ar
      : fincialInformationGetData?.employment?.category.name_en
    : null
  let jobTitle = !fincialInformationGetData?.employment?.title
    ? null
    : isRTL
    ? fincialInformationGetData?.employment?.title?.description_ar
    : fincialInformationGetData?.employment?.title?.description_en
  let sector = fincialInformationGetData?.employment?.sector
    ? isRTL
      ? fincialInformationGetData?.employment?.sector?.description_ar
      : fincialInformationGetData?.employment?.sector?.description_en
    : null
  let dateOfJoin = fincialInformationGetData?.employment?.joining_date
  let primarySourceOfIncome = fincialInformationGetData?.primary_income?.source
    ? SheetData.primarySourceOfIncome.find(
        c => c.type_code == fincialInformationGetData?.primary_income?.source,
      )
    : null
  return {
    ...values,
    sector,
    jobCategory,
    jobTitle,
    dateOfJoin,
    primarySourceOfIncome: primarySourceOfIncome
      ? isRTL
        ? primarySourceOfIncome.description_ar
        : primarySourceOfIncome.description_en
      : null,
    occupation: occupation
      ? isRTL
        ? occupation.description_ar
        : occupation.description_en
      : null,
    nameOfBusiness: fincialInformationGetData?.business_name || null,
    monthlyPrimaryIncomAmount:
      fincialInformationGetData?.primary_income?.amount ||
      values.monthlyPrimaryIncomAmount,
    investmentType: fincialInformationGetData?.investment_type,
    AddetionalSourceOfIncome: fincialInformationGetData?.additional_income_list
      ?.length
      ? true
      : false,
    AddetionalSourceOfIncomeSource: fincialInformationGetData
      ?.additional_income_list?.length
      ? fincialInformationGetData?.additional_income_list[0]?.source
      : '',
    AddetionalSourceOfIncomeAmount: fincialInformationGetData
      ?.additional_income_list?.length
      ? fincialInformationGetData?.additional_income_list[0]?.amount
      : '',
    AnotherAddetionalSourceOfIncome:
      fincialInformationGetData?.additional_income_list?.length > 1
        ? true
        : false,
    AnotherAddetionalSourceOfIncomeSource: fincialInformationGetData
      ?.additional_income_list?.length
      ? fincialInformationGetData?.additional_income_list[0]?.source
      : '',
    AnotherAddetionalSourceOfIncomeAmount: fincialInformationGetData
      ?.additional_income_list?.length
      ? fincialInformationGetData?.additional_income_list[0]?.amount
      : '',
  }
}
const MapStateForAPi = (values: IFormTYpe) => {
  let occupation = SheetData.Occupation.find(c => c.name == values.occupation)
  let business_name = values.nameOfBusiness
  let tilte = SheetData.jobTitle.find(
    c =>
      c.descriptionAr == values.jobTitle || c.descriptionEn == values.jobTitle,
  )
  let sector = SheetData.sectors.find(
    sec =>
      sec.descriptionAr == values.sector || sec.descriptionEn == values.sector,
  )
  let category = SheetData.jobCategory.find(
    c => c.nameAr || values.jobCategory || c.nameEn == values.jobCategory,
  )
  let additional_income_list = []
  if (values.AddetionalSourceOfIncome) {
    additional_income_list.push({
      amount: values.AddetionalSourceOfIncomeAmount,
      source: values.AddetionalSourceOfIncomeSource,
    })
    if (values.AnotherAddetionalSourceOfIncome) {
      additional_income_list.push({
        amount: values.AnotherAddetionalSourceOfIncomeAmount,
        source: values.AnotherAddetionalSourceOfIncomeSource,
      })
    }
  }
  return {
    occupation: occupation,
    business_name: business_name,
    employment: {
      title: tilte || null,
      sector: sector || null,
      joining_date: values.dateOfJoin,
      joining_date_calendar: 'gregorian',
      category,
    },
    primary_income: {
      amount: values.monthlyPrimaryIncomAmount,
      source: values.primarySourceOfIncome
        ? SheetData.primarySourceOfIncome.find(
            c =>
              c.description_ar == values.primarySourceOfIncome ||
              c.description_en == values.primarySourceOfIncome,
          )?.type_code
        : null,
    },
    investment_type: values.investmentType,
    additional_income_list,
  }
}

type Props = {
  navigation: StackNavigationProp<any>
  route: any
}

function FinacialInformationScreen({navigation}: Props) {
  const [currentOpendIndx, setCurrentOpenedInx] = useState(-1)
  const {isRTL} = useContext<AppProviderProps>(AppContext)
  const [systemErrorMessage, setSystemErrorMessage] = useState('')

  const {t} = useTranslation()
  const [values, setValues] = useState<IFormTYpe>({
    ...FormValues,
  })
  const [errors, setErrors] = useState({
    ...FormValues,
  })

  const ToggleSheet = (indx: number) => {
    setCurrentOpenedInx(indx)
  }
  const {
    isLoading,
    data: FinicailInformationPostResult,
    mutate: PostFinicailInformationReques,
  } = useMutation({
    mutationFn: async () => {
      let journeySecrets
      let journeySecretsData = await getItem('journeySecrets')
      if (journeySecretsData) {
        journeySecrets = JSON.parse(journeySecretsData)
      }

      let req: any = await fetcher(BASE_URL + '/onboarding/financial', {
        method: 'POST',
        token: journeySecrets.access_token,
        body: MapStateForAPi(values),
      })
      let res = await req.json()
      return res
    },
  })
  useEffect(() => {
    if (FinicailInformationPostResult?.onboarding_application_id) {
      navigation.push('LegalinfoMain')
    }

    if (
      FinicailInformationPostResult &&
      !FinicailInformationPostResult?.onboarding_application_id
    ) {
      setSystemErrorMessage(t('common:someThingWentWrong'))
    }
  }, [FinicailInformationPostResult])

  const handelPostForm = () => {
    let currentOccupationCode =
      SheetData.Occupation.find(sheet => sheet.name === values.occupation)
        ?.code || (values.occupation ? 1 : 0)
    const {maxIncome, minIncome} = GenerateMinMaxIncome(currentOccupationCode)

    let alreadyFetchedFromGosiForSalaried =
      currentOccupationCode === 1 && GosiSuccess
    const isValideMonthlyPrimaryIncome =
      alreadyFetchedFromGosiForSalaried || !values.monthlyPrimaryIncomAmount
        ? true
        : values.monthlyPrimaryIncomAmount >= minIncome &&
          values.monthlyPrimaryIncomAmount <= maxIncome
    if (!isValideMonthlyPrimaryIncome) {
      return setErrors({
        ...errors,
        monthlyPrimaryIncomAmount: t(
          'onboarding:financialInformation:monthlyIncomeValidation',
          {min: minIncome, max: maxIncome},
        ),
      })
    } else {
      setErrors({
        ...errors,
        monthlyPrimaryIncomAmount: '',
      })
    }
    PostFinicailInformationReques()
  }
  const {
    isLoading: LoadingFincialInformation,
    data: fincialInformationGetData,
    mutate: GetFinicalInformationMutate,
  } = useMutation({
    mutationFn: async () => {
      let journeySecrets
      let journeySecretsData = await getItem('journeySecrets')
      if (journeySecretsData) {
        journeySecrets = JSON.parse(journeySecretsData)
      }
      let req: any = await fetcher(BASE_URL + '/onboarding/financial', {
        method: 'GET',
        token: journeySecrets.access_token,
      })
      let res = await req.json()
      return res
    },
  })
  useEffect(() => {
    GetFinicalInformationMutate()
  }, [])
  const GosiSuccess = fincialInformationGetData?.primary_income

  useEffect(() => {
    setValues(MapApiApiToState(values, fincialInformationGetData, !!isRTL))
  }, [fincialInformationGetData])
  const isFormValid = useMemo(() => {
    let currentOccupationCode =
      SheetData.Occupation.find(sheet => sheet.name === values.occupation)
        ?.code || 1
    let validationResult = false

    if (currentOccupationCode >= 4) {
      if (values.primarySourceOfIncome && values.monthlyPrimaryIncomAmount) {
        validationResult = true
      }
    }
    if (
      currentOccupationCode == 3 &&
      values.investmentType &&
      values.monthlyPrimaryIncomAmount
    ) {
      validationResult = true
    }
    if (
      currentOccupationCode == 1 &&
      values.jobCategory &&
      values.jobCategory &&
      values.jobTitle &&
      values.sector
    ) {
      if (!GosiSuccess) {
        values.dateOfJoin && values.monthlyPrimaryIncomAmount
          ? (validationResult = true)
          : (validationResult = false)
      } else {
        validationResult = true
      }
    }

    if (
      currentOccupationCode == 2 &&
      values.nameOfBusiness &&
      values.jobCategory &&
      values.jobTitle &&
      values.monthlyPrimaryIncomAmount
    ) {
      validationResult = true
    }
    if (values.AddetionalSourceOfIncome) {
      if (values.AnotherAddetionalSourceOfIncome) {
        !values.AnotherAddetionalSourceOfIncomeAmount ||
        !values.AnotherAddetionalSourceOfIncome
          ? (validationResult = true)
          : (validationResult = false)
        return
      }
      !values.AddetionalSourceOfIncomeSource ||
      !values.AddetionalSourceOfIncomeAmount
        ? (validationResult = false)
        : (validationResult = true)
    }
    return validationResult
  }, [values])

  const RenderCurrentForm = () => {
    let CurrentFormView = null
    let currentOccupationCode =
      SheetData.Occupation.find(sheet => sheet.name === values.occupation)
        ?.code || (values.occupation ? 1 : 0)
    console.log('currentOccupationCode', currentOccupationCode)
    if (
      //'Housewife' ||'Unemployed' ||'Not authorized to work' ||Student'
      currentOccupationCode >= 4
    ) {
      CurrentFormView = (
        <>
          <DropDown
            dynamicHeight
            data={SheetData.primarySourceOfIncome.map(income =>
              isRTL ? income.description_ar : income.description_en,
            )}
            label={'Primary source of income'}
            toogleClick={() => ToggleSheet(SheetsIndexs.primarySourceOfIncome)}
            onItemSelected={primarySourceOfIncome => {
              setValues({...values, primarySourceOfIncome})
            }}
            value={values.primarySourceOfIncome}
            error={errors.primarySourceOfIncome}
            isOpen={currentOpendIndx == SheetsIndexs.primarySourceOfIncome}
            title={t('onboarding:financialInformation:jobCategory')}
            subTitle={t('onboarding:financialInformation:jobCategory')}
            onSheetClose={() => setCurrentOpenedInx(-1)}
            hasSearch
          />
          <Spacer />
          <TCInput
            value={String(values.monthlyPrimaryIncomAmount)}
            onChangeText={val => {
              setValues({...values, monthlyPrimaryIncomAmount: val})
            }}
            label={t(
              'onboarding:financialInformation:MonthlyPrimaryIncomeAmount',
            )}
            errorMessage={errors.monthlyPrimaryIncomAmount}
            keyboardType="numeric"
            returnKeyType="done"
          />
          <Spacer />
        </>
      )
    }

    if (
      // 'Investor'
      currentOccupationCode === 3
    ) {
      CurrentFormView = (
        <>
          <TCInput
            value={values.investmentType}
            onChangeText={val => setValues({...values, investmentType: val})}
            label={t('onboarding:financialInformation:InvestmentType')}
            errorMessage={errors.investmentType}
            returnKeyType="done"
            maxLength={50}
          />
          <Spacer />
          <TCInput
            value={String(values.monthlyPrimaryIncomAmount)}
            onChangeText={val =>
              setValues({...values, monthlyPrimaryIncomAmount: val})
            }
            label={t(
              'onboarding:financialInformation:MonthlyPrimaryIncomeAmount',
            )}
            errorMessage={errors.monthlyPrimaryIncomAmount}
            keyboardType="numeric"
            returnKeyType="done"
          />
          <Spacer />
        </>
      )
    }
    if (
      //Business & Professional'
      currentOccupationCode === 2
    ) {
      CurrentFormView = (
        <>
          <TCInput
            value={values.nameOfBusiness}
            onChangeText={val => setValues({...values, nameOfBusiness: val})}
            label={t('onboarding:financialInformation:NameOfBussiness')}
            errorMessage={errors.nameOfBusiness}
            returnKeyType="done"
            maxLength={50}
          />

          <Spacer />
          <DropDown
            data={SheetData.jobCategory.map(cat =>
              !isRTL ? cat.nameEn : cat.nameAr,
            )}
            label={'Job Category'}
            toogleClick={() => ToggleSheet(SheetsIndexs.jobCategory)}
            onItemSelected={jobCategory => setValues({...values, jobCategory})}
            value={values.jobCategory}
            error={errors.jobCategory}
            isOpen={currentOpendIndx == SheetsIndexs.jobCategory}
            title={t('onboarding:financialInformation:jobCategory')}
            subTitle={t('onboarding:financialInformation:jobCategory')}
            onSheetClose={() => setCurrentOpenedInx(-1)}
            hasSearch
          />
          <Spacer />
          <DropDown
            data={SheetData.jobTitle.map(title =>
              isRTL ? title.descriptionAr : title.descriptionEn,
            )}
            label={'Job Title'}
            toogleClick={() => ToggleSheet(SheetsIndexs.jobTitle)}
            onItemSelected={jobTitle => setValues({...values, jobTitle})}
            value={values.jobTitle}
            error={errors.jobTitle}
            isOpen={currentOpendIndx == SheetsIndexs.jobTitle}
            title={t('onboarding:financialInformation:jobCategory')}
            subTitle={t('onboarding:financialInformation:jobCategory')}
            onSheetClose={() => setCurrentOpenedInx(-1)}
            hasSearch
          />
          <Spacer />
          <TCInput
            value={String(values.monthlyPrimaryIncomAmount)}
            onChangeText={val =>
              setValues({...values, monthlyPrimaryIncomAmount: val})
            }
            label={t(
              'onboarding:financialInformation:MonthlyPrimaryIncomeAmount',
            )}
            errorMessage={errors.monthlyPrimaryIncomAmount}
            keyboardType="numeric"
            returnKeyType="done"
          />
          <Spacer />
        </>
      )
    }
    if (
      //let currentOccupationCode =
      //  'Salary/Pension'
      currentOccupationCode === 1
    ) {
      CurrentFormView = (
        <>
          <DropDown
            data={SheetData.jobCategory.map(cat =>
              isRTL ? cat.nameAr : cat.nameEn,
            )}
            label={t('onboarding:financialInformation:jobCategory') || ''}
            toogleClick={() => ToggleSheet(SheetsIndexs.jobCategory)}
            onItemSelected={jobCategory => setValues({...values, jobCategory})}
            value={values.jobCategory}
            error={errors.jobCategory}
            isOpen={currentOpendIndx == SheetsIndexs.jobCategory}
            title={t('onboarding:financialInformation:jobCategory')}
            subTitle={t('onboarding:financialInformation:jobCategory')}
            onSheetClose={() => setCurrentOpenedInx(-1)}
            hasSearch
          />
          <Spacer />
          <DropDown
            data={SheetData.jobTitle.map(job =>
              isRTL ? job.descriptionAr : job.descriptionEn,
            )}
            label={t('onboarding:financialInformation:jobTitle') || ''}
            toogleClick={() => ToggleSheet(SheetsIndexs.jobTitle)}
            onItemSelected={jobTitle => setValues({...values, jobTitle})}
            value={values.jobTitle}
            error={errors.jobTitle}
            isOpen={currentOpendIndx == SheetsIndexs.jobTitle}
            title={t('onboarding:financialInformation:jobTitle')}
            subTitle={t('onboarding:financialInformation:jobTitle')}
            onSheetClose={() => setCurrentOpenedInx(-1)}
            hasSearch
          />
          <Spacer />
          <DropDown
            data={SheetData.sectors.map(sect =>
              isRTL ? sect.descriptionAr : sect.descriptionEn,
            )}
            label={t('onboarding:financialInformation:selectSector') || ''}
            toogleClick={() => ToggleSheet(SheetsIndexs.sector)}
            onItemSelected={sector => setValues({...values, sector})}
            value={values.sector}
            error={errors.sector}
            isOpen={currentOpendIndx == SheetsIndexs.sector}
            title={t('onboarding:financialInformation:selectSector')}
            subTitle={t('onboarding:financialInformation:selectSector')}
            onSheetClose={() => setCurrentOpenedInx(-1)}
            hasSearch
          />
          {!GosiSuccess && (
            <View>
              <Spacer />
              <TCInput
                value={String(values.monthlyPrimaryIncomAmount)}
                onChangeText={val =>
                  setValues({...values, monthlyPrimaryIncomAmount: val})
                }
                label={t(
                  'onboarding:financialInformation:MonthlyPrimaryIncomeAmount',
                )}
                errorMessage={errors.monthlyPrimaryIncomAmount}
                returnKeyType="done"
                keyboardType="numeric"
              />
              <Spacer />
              <DatePicker
                label={t('onboarding:financialInformation:DateOfJoin')}
                value={values.dateOfJoin}
                error={errors.occupation}
                title={t('onboarding:financialInformation:DateOfJoin')}
                subTitle={t('onboarding:financialInformation:DateOfJoin')}
                onDateSelected={date =>
                  setValues({
                    ...values,
                    dateOfJoin: getFormattedDate(new Date(date)),
                  })
                }
              />
            </View>
          )}
          <Spacer />
        </>
      )
    }
    return (
      <View style={styles.container}>
        {CurrentFormView}
        {CurrentFormView && (
          <>
            <Spacer />
            <AdditionalInformation>
              {t(
                'onboarding:financialInformation:doYouHaveAddetionalSourceOfIncome',
              )}
            </AdditionalInformation>
            <Spacer />
            <RadioWrapper isRTL={!!isRTL}>
              <RadioButton
                selected={!values.AddetionalSourceOfIncome}
                onPress={() =>
                  setValues({
                    ...values,
                    AddetionalSourceOfIncome: !values.AddetionalSourceOfIncome,
                    AnotherAddetionalSourceOfIncome: false,
                    AnotherAddetionalSourceOfIncomeSource: '',
                    AnotherAddetionalSourceOfIncomeAmount: '',
                  })
                }>
                {t('onboarding:financialInformation:no')}
              </RadioButton>
              <RadioButton
                selected={values.AddetionalSourceOfIncome}
                onPress={() =>
                  setValues({
                    ...values,
                    AddetionalSourceOfIncome: !values.AddetionalSourceOfIncome,
                  })
                }>
                {t('onboarding:financialInformation:yes')}
              </RadioButton>
            </RadioWrapper>
            <Spacer />
            {values.AddetionalSourceOfIncome && (
              <View>
                <DropDown
                  dynamicHeight
                  data={SheetData.addetionalSourceOfIncome.map(src =>
                    isRTL ? src.description_ar : src.description_en,
                  )}
                  label={t(
                    'onboarding:financialInformation:additionalIncomeSource',
                  )}
                  toogleClick={() =>
                    ToggleSheet(SheetsIndexs.addetionalSourceOfIncome)
                  }
                  onItemSelected={AddetionalSourceOfIncomeSource =>
                    setValues({...values, AddetionalSourceOfIncomeSource})
                  }
                  value={values.AddetionalSourceOfIncomeSource}
                  error={errors.AddetionalSourceOfIncomeSource}
                  isOpen={
                    currentOpendIndx == SheetsIndexs.addetionalSourceOfIncome
                  }
                  title={t('onboarding:financialInformation:selectSector')}
                  subTitle={t('onboarding:financialInformation:selectSector')}
                  onSheetClose={() => setCurrentOpenedInx(-1)}
                  hasSearch
                />
                <Spacer />
                <TCInput
                  value={values.AddetionalSourceOfIncomeAmount}
                  onChangeText={val =>
                    setValues({...values, AddetionalSourceOfIncomeAmount: val})
                  }
                  label={t(
                    'onboarding:financialInformation:MonthlyPrimaryIncomeAmount',
                  )}
                  errorMessage={errors.AddetionalSourceOfIncomeAmount}
                  returnKeyType="done"
                  keyboardType="numeric"
                />
                <Spacer />
                {!values.AnotherAddetionalSourceOfIncome && (
                  <AnotherAddetionalIconmeSourceWrapper
                    onPress={() =>
                      setValues({
                        ...values,
                        AnotherAddetionalSourceOfIncome: true,
                      })
                    }>
                    <AnotherAddetionalIconmeSource>
                      {t(
                        'onboarding:financialInformation:additionalIncomeSource',
                      )}
                    </AnotherAddetionalIconmeSource>
                  </AnotherAddetionalIconmeSourceWrapper>
                )}
                {values.AnotherAddetionalSourceOfIncome && (
                  <View>
                    <DropDown
                      data={SheetData.addetionalSourceOfIncome.map(src =>
                        isRTL ? src.description_ar : src.description_en,
                      )}
                      label={t(
                        'onboarding:financialInformation:additionalIncomeSource',
                      )}
                      toogleClick={() =>
                        ToggleSheet(
                          SheetsIndexs.anotheraddetionalSourceOfIncome,
                        )
                      }
                      onItemSelected={AnotherAddetionalSourceOfIncomeSource =>
                        setValues({
                          ...values,
                          AnotherAddetionalSourceOfIncomeSource,
                        })
                      }
                      value={values.AnotherAddetionalSourceOfIncomeSource}
                      error={errors.AnotherAddetionalSourceOfIncomeSource}
                      isOpen={
                        currentOpendIndx ==
                        SheetsIndexs.anotheraddetionalSourceOfIncome
                      }
                      title={t('onboarding:financialInformation:selectSector')}
                      subTitle={t(
                        'onboarding:financialInformation:selectSector',
                      )}
                      onSheetClose={() => setCurrentOpenedInx(-1)}
                      hasSearch
                    />
                    <Spacer />
                    <TCInput
                      value={values.AnotherAddetionalSourceOfIncomeAmount}
                      onChangeText={val =>
                        setValues({
                          ...values,
                          AnotherAddetionalSourceOfIncomeAmount: val,
                        })
                      }
                      label={t(
                        'onboarding:financialInformation:MonthlyPrimaryIncomeAmount',
                      )}
                      errorMessage={
                        errors.AnotherAddetionalSourceOfIncomeAmount
                      }
                      keyboardType="numeric"
                      returnKeyType="done"
                      maxLength={10}
                    />
                    <Spacer />
                  </View>
                )}
              </View>
            )}
          </>
        )}
      </View>
    )
  }
  return (
    <ScrollerView
      keyboardShouldPersistTaps="always"
      key={
        String(values.occupation) +
        String(values.AddetionalSourceOfIncome) +
        String(values.AnotherAddetionalSourceOfIncome)
      }
      contentContainerStyle={styles.container}>
      <Layout
        isBack={true}
        isHeader={true}
        isBackground={true}
        isLoading={isLoading || LoadingFincialInformation}
        onBack={() => navigation.goBack()}>
        <SafeAreaWrapper>
          <FormWrapper isRTL={!!isRTL}>
            <Header isRTL={!!isRTL}>
              {t('onboarding:financialInformation:financialInformation') || ''}
            </Header>
            <DropDown
              data={SheetData.Occupation.map(d => d.name)}
              label={t('onboarding:financialInformation:occupation') || ''}
              toogleClick={() => ToggleSheet(SheetsIndexs.Occupation)}
              disabled={GosiSuccess}
              onItemSelected={occupation => {
                setValues({
                  ...values,
                  occupation,
                  //   monthlyPrimaryIncomAmount: '',
                })
              }}
              value={values.occupation}
              error={errors.occupation}
              isOpen={currentOpendIndx == SheetsIndexs.Occupation}
              title={t('onboarding:financialInformation:occupation')}
              subTitle={t('onboarding:financialInformation:occupation')}
              onSheetClose={() => setCurrentOpenedInx(-1)}
              hasSearch
            />

            <Spacer />
            {RenderCurrentForm()}
          </FormWrapper>
          <View>
            {systemErrorMessage?.length ? (
              <ErrorView>
                <Text variant={TEXT_VARIANTS.caption}>
                  {systemErrorMessage}
                </Text>
              </ErrorView>
            ) : null}
            <StyledButton disabled={!isFormValid} onPress={handelPostForm}>
              <Text variant={TEXT_VARIANTS.body}>
                {t('onboarding:financialInformation:continue')}
              </Text>
            </StyledButton>
          </View>
        </SafeAreaWrapper>
      </Layout>
    </ScrollerView>
  )
}

export default FinacialInformationScreen

const Spacer = styled(View)`
  margin-bottom: 20px;
`
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
const FormWrapper = styled(SafeAreaView)<{isRTL: boolean}>``

const ScrollerView = styled.ScrollView``
const AnotherAddetionalIconmeSourceWrapper = styled(TouchableOpacity)`
  margin-top: 32px;
  margin-bottom: 32px;
  justify-content: center;
  align-items: center;
  width: 100%;
`
const AnotherAddetionalIconmeSource = styled(Text)`
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 22px;
  text-align: center;
  color: #3f3d36;
  text-align: center;
  text-decoration-line: underline;
`
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

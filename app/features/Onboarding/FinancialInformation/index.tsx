import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
  memo,
  useCallback,
} from 'react'
import {View, SafeAreaView, TouchableOpacity, StyleSheet} from 'react-native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {useMutation} from '@tanstack/react-query'
import styled from 'styled-components/native'
import {useTranslation} from 'react-i18next'
import cn from 'classnames'

import {
  Layout,
  TCButton as Button,
  TCTextView as Text,
  RadioButton,
  DropDown,
  TCInput,
  DatePicker,
} from '@Components'
import {fetcher} from '@Api'
import {PlusIcon} from '@Assets'
import {useMasterData} from '@Hooks'
import {AppContext, AppProviderProps} from '@Context'
import {TEXT_VARIANTS, Colors, getItem, BASE_URL, flexRowLayout} from '@Utils'

import {SheetData, SheetsIndexs} from './SheetData'

function getFormattedDate(date: Date) {
  let year = date?.getFullYear()
  let month = (1 + date?.getMonth()).toString().padStart(2, '0')
  let day = date?.getDate().toString().padStart(2, '0')
  return month + '/' + day + '/' + year
}

type IFormTYpe = {
  occupation: string | null
  occupationCode?: string | null
  jobCategory: string | null
  jobCategoryCode?: string | null | undefined
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
  occupationCode: '',
  jobCategory: '',
  jobCategoryCode: '',
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

type Props = {
  navigation: NativeStackNavigationProp<any>
  route: any
}

type ItemProps = {nameAr: string; nameEn: string; code?: string}

function FinancialInformation({navigation}: Props) {
  const [currentOpendIndx, setCurrentOpenedInx] = useState(-1)
  const {isRTL} = useContext<AppProviderProps>(AppContext)
  const [systemErrorMessage, setSystemErrorMessage] = useState('')

  const {t} = useTranslation()
  const [values, setValues] = useState<IFormTYpe | any>({
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
        body: MapStateForAPi(),
      })
      let res = await req.json()
      return res
    },
  })

  // below hook will fetch all master data information
  const {
    sectors,
    jobCategories,
    jobOccupations,
    additionalIncomes,
    primaryIncomeSources,
  } = useMasterData({
    job: values?.jobCategoryCode,
    occupation: values?.occupationCode,
  })

  // below function will get the code of array data of given content apis
  const getItemCode = (
    list: ItemProps[],
    selectedItem: string,
  ): string | undefined => {
    return list?.find(
      (item: ItemProps) =>
        item.nameAr === selectedItem || item.nameEn === selectedItem,
    )?.code
  }

  useEffect(() => {
    if (FinicailInformationPostResult?.onboarding_application_id) {
      navigation.push('LegalinfoMain')
    }

    if (
      FinicailInformationPostResult &&
      !FinicailInformationPostResult?.onboarding_application_id
    ) {
      setSystemErrorMessage(t('common:someThingWentWrong') as string)
    }
  }, [FinicailInformationPostResult, navigation, t])

  const handelPostForm = () => {
    let currentOccupationCode =
      jobOccupations?.data?.find(
        (item: ItemProps) =>
          item.nameAr === values.occupation ||
          item.nameEn === values.occupation,
      )?.code || (values.occupation ? 1 : 0)

    const {max: maxIncome, min: minIncome} = primaryIncomeSources?.data[0]

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
        token: journeySecrets.access_token,
      })
      let res = await req.json()
      return res
    },
  })

  useEffect(() => {
    GetFinicalInformationMutate()
  }, [GetFinicalInformationMutate])

  const GosiSuccess = fincialInformationGetData?.primary_income

  const isFormValid = useMemo(() => {
    let currentOccupationCode =
      jobOccupations?.data?.find(
        (item: ItemProps) =>
          item.nameAr === values.occupation ||
          item.nameEn === values.occupation,
      )?.code || 1

    let validationResult = false

    if (
      ['HOME', 'STDN', 'NONE', 'NOTA'].includes(currentOccupationCode) ||
      currentOccupationCode >= 4
    ) {
      if (values.primarySourceOfIncome && values.monthlyPrimaryIncomAmount) {
        validationResult = true
      } else {
        return (validationResult = false)
      }
    }
    if (currentOccupationCode === 'INVS' || currentOccupationCode === 3) {
      if (values.investmentType && values.monthlyPrimaryIncomAmount) {
        validationResult = true
      } else {
        return (validationResult = false)
      }
    }
    if (
      (currentOccupationCode === 'SLRY' || currentOccupationCode === 1) &&
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
    if (currentOccupationCode === 'PRFL' || currentOccupationCode === 2) {
      if (
        values.nameOfBusiness &&
        values.jobCategory &&
        values.jobTitle &&
        values.monthlyPrimaryIncomAmount
      ) {
        validationResult = true
      } else {
        return (validationResult = false)
      }
    }

    if (values.AddetionalSourceOfIncome) {
      if (values.AnotherAddetionalSourceOfIncome) {
        let nodValideAddetionalInformation =
          !values.AnotherAddetionalSourceOfIncomeAmount ||
          !values.AnotherAddetionalSourceOfIncome ||
          !values.AddetionalSourceOfIncomeSource ||
          !values.AddetionalSourceOfIncomeAmount
        if (nodValideAddetionalInformation) {
          return (validationResult = false)
        }
        return (validationResult = true)
      }
      !values.AddetionalSourceOfIncomeSource ||
      !values.AddetionalSourceOfIncomeAmount
        ? (validationResult = false)
        : (validationResult = true)
    }
    return validationResult
  }, [GosiSuccess, jobOccupations?.data, values])

  /**
   * below functions copied from the outer function component scope
   * there are some variables used that are pointing to static masterdata
   * file but now that has been changed with API calls so moving to the inner
   * function component scope and changing the variables from masterdata file
   * to APIs and also changing the functions arguments as per inner scope and
   * also wrapping into useMemo and useCallback functions to avoid expensive
   * calculations to avoid re-renders. And also moving useEffect to bottom
   * before render html to avoid react hook rules
   */

  const MapApiApiToState = useCallback(() => {
    let occupation = fincialInformationGetData?.occupation
    let occupationCode = fincialInformationGetData?.occupation?.code

    let jobCategory = fincialInformationGetData?.employment?.category
      ? isRTL
        ? fincialInformationGetData?.employment?.category.name_ar
        : fincialInformationGetData?.employment?.category.name_en
      : null
    let jobTitle = !fincialInformationGetData?.employment?.title
      ? ''
      : isRTL
      ? fincialInformationGetData?.employment?.title?.description_ar
      : fincialInformationGetData?.employment?.title?.description_en
    let sector = fincialInformationGetData?.employment?.sector
      ? isRTL
        ? fincialInformationGetData?.employment?.sector?.description_ar
        : fincialInformationGetData?.employment?.sector?.description_en
      : null
    let dateOfJoin = fincialInformationGetData?.employment?.joining_date
    let primarySourceOfIncome = fincialInformationGetData?.primary_income
      ?.source
      ? primaryIncomeSources?.data?.find(
          (item: {code: string}) =>
            item.code === fincialInformationGetData?.primary_income?.source,
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
          ? primarySourceOfIncome.name_ar
          : primarySourceOfIncome.name_en
        : null,
      occupation: occupation
        ? isRTL
          ? occupation.name_ar
          : occupation.name_en
        : null,
      occupationCode,
      nameOfBusiness: fincialInformationGetData?.business_name || null,
      monthlyPrimaryIncomAmount:
        fincialInformationGetData?.primary_income?.amount ||
        values.monthlyPrimaryIncomAmount,
      investmentType: fincialInformationGetData?.investment_type,
      AddetionalSourceOfIncome: fincialInformationGetData
        ?.additional_income_list?.length
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
  }, [isRTL, values, fincialInformationGetData, primaryIncomeSources?.data])

  const MapStateForAPi = () => {
    // let occupation = jobOccupations?.data?.find(
    //   (item: ItemProps) =>
    //     item.nameAr === values.occupation || item.nameEn === values.occupation,
    // )
    let occupation = fincialInformationGetData?.occupation

    let business_name = values.nameOfBusiness

    let tilte = values.jobTitle

    let sector = sectors?.data?.find(
      (item: ItemProps) =>
        item.nameAr === values.sector || item.nameEn === values.sector,
    )

    let category = jobCategories?.data?.find(
      (item: ItemProps) =>
        item.nameAr || values.jobCategory || item.nameEn === values.jobCategory,
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
                c.description_ar === values.primarySourceOfIncome ||
                c.description_en === values.primarySourceOfIncome,
            )?.type_code
          : null,
      },
      investment_type: values.investmentType,
      additional_income_list,
    }
  }

  /**
   * above functions ends here
   */

  useEffect(() => {
    setValues(MapApiApiToState())
  }, [fincialInformationGetData])

  const renderCurrentForm = () => {
    let CurrentFormView = null
    let currentOccupationCode =
      jobOccupations?.data?.find(
        (item: ItemProps) =>
          item.nameAr === values.occupation ||
          item.nameEn === values.occupation,
      )?.code || (values.occupation ? 1 : 0)

    if (
      //'Housewife' ||'Unemployed' ||'Not authorized to work' ||Student'
      ['HOME', 'STDN', 'NONE', 'NOTA'].includes(currentOccupationCode) ||
      currentOccupationCode >= 4
    ) {
      CurrentFormView = (
        <>
          <DropDown
            dynamicHeight
            data={primaryIncomeSources?.data?.map((item: ItemProps) =>
              isRTL ? item.nameAr : item?.nameEn,
            )}
            label={t('onboarding:financialInformation:primarySourceOfIncome')}
            toogleClick={() => ToggleSheet(SheetsIndexs.primarySourceOfIncome)}
            onItemSelected={primarySourceOfIncome => {
              setValues({...values, primarySourceOfIncome})
            }}
            value={values.primarySourceOfIncome}
            error={errors.primarySourceOfIncome}
            isOpen={currentOpendIndx === SheetsIndexs.primarySourceOfIncome}
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
          />
          <Spacer />
        </>
      )
    }

    if (
      // 'Investor'
      currentOccupationCode === 'INVS' ||
      currentOccupationCode === 3
    ) {
      CurrentFormView = (
        <>
          <TCInput
            value={values.investmentType}
            onChangeText={val => setValues({...values, investmentType: val})}
            label={t('onboarding:financialInformation:InvestmentType')}
            errorMessage={errors.investmentType}
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
          />
          <Spacer />
        </>
      )
    }
    if (
      //Business & Professional'
      currentOccupationCode === 'PRFL' ||
      currentOccupationCode === 2
    ) {
      CurrentFormView = (
        <>
          <TCInput
            value={values.nameOfBusiness}
            onChangeText={val => setValues({...values, nameOfBusiness: val})}
            label={t('onboarding:financialInformation:NameOfBussiness')}
            errorMessage={errors.nameOfBusiness}
            maxLength={40}
          />

          <Spacer />

          <DropDown
            data={jobCategories?.data?.map((item: ItemProps) =>
              !isRTL ? item.nameEn : item.nameAr,
            )}
            label={t('onboarding:financialInformation:jobCategory')}
            toogleClick={() => ToggleSheet(SheetsIndexs.jobCategory)}
            onItemSelected={jobCategory =>
              setValues({
                ...values,
                sector: null, // this will remove the selection of sector if job category changes
                jobCategory,
                jobCategoryCode: getItemCode(jobCategories?.data, jobCategory),
              })
            }
            value={values.jobCategory}
            error={errors.jobCategory}
            isOpen={currentOpendIndx === SheetsIndexs.jobCategory}
            title={t('onboarding:financialInformation:jobCategory')}
            subTitle={t('onboarding:financialInformation:jobCategory')}
            onSheetClose={() => setCurrentOpenedInx(-1)}
            hasSearch
          />

          <Spacer />

          <TCInput
            value={values.jobTitle}
            onChangeText={val => setValues({...values, jobTitle: val})}
            label={t('onboarding:financialInformation:jobTitle')}
            errorMessage={errors.jobTitle}
            keyboardType="default"
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
            maxLength={6}
          />

          <Spacer />
        </>
      )
    }
    if (
      //  'Salary/Pension'
      currentOccupationCode === 'SLRY' ||
      currentOccupationCode === 1
    ) {
      CurrentFormView = (
        <>
          <DropDown
            data={jobCategories?.data?.map((item: ItemProps) =>
              isRTL ? item.nameAr : item.nameEn,
            )}
            label={t('onboarding:financialInformation:jobCategory') || ''}
            toogleClick={() => ToggleSheet(SheetsIndexs.jobCategory)}
            onItemSelected={jobCategory =>
              setValues({
                ...values,
                sector: null, // this will remove the selection of sector if job category changes
                jobCategory,
                jobCategoryCode: getItemCode(jobCategories?.data, jobCategory),
              })
            }
            value={values.jobCategory}
            error={errors.jobCategory}
            isOpen={currentOpendIndx === SheetsIndexs.jobCategory}
            title={t('onboarding:financialInformation:jobCategory')}
            subTitle={t('onboarding:financialInformation:jobCategory')}
            onSheetClose={() => setCurrentOpenedInx(-1)}
            hasSearch
          />

          <Spacer />

          <TCInput
            value={values.jobTitle}
            onChangeText={val => setValues({...values, jobTitle: val})}
            label={t('onboarding:financialInformation:jobTitle')}
            errorMessage={errors.jobTitle}
            keyboardType="default"
            maxLength={50}
          />

          <Spacer />

          <DropDown
            data={sectors?.data?.map((item: ItemProps) =>
              isRTL ? item.nameAr : item.nameEn,
            )}
            label={t('onboarding:financialInformation:selectSector') || ''}
            toogleClick={() => ToggleSheet(SheetsIndexs.sector)}
            onItemSelected={sector => setValues({...values, sector})}
            value={values.sector}
            error={errors.sector}
            isOpen={currentOpendIndx === SheetsIndexs.sector}
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
                onPress={() => {
                  setValues({
                    ...values,
                    AddetionalSourceOfIncome: !values.AddetionalSourceOfIncome,
                    AnotherAddetionalSourceOfIncome: false,
                    AddetionalSourceOfIncomeSource: null,
                    AnotherAddetionalSourceOfIncomeSource: null,
                    AddetionalSourceOfIncomeAmount: null,
                    AnotherAddetionalSourceOfIncomeAmount: null,
                  })
                }}>
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
                  data={additionalIncomes?.data?.map((item: ItemProps) =>
                    isRTL ? item.nameAr : item.nameEn,
                  )}
                  label={t(
                    'onboarding:financialInformation:additionalIncomeSource',
                  )}
                  toogleClick={() =>
                    ToggleSheet(SheetsIndexs.addetionalSourceOfIncome)
                  }
                  onItemSelected={AddetionalSourceOfIncomeSource => {
                    // AddetionalSourceOfIncomeAmount
                    setValues({...values, AddetionalSourceOfIncomeSource})
                  }}
                  value={values.AddetionalSourceOfIncomeSource}
                  error={errors.AddetionalSourceOfIncomeSource}
                  isOpen={
                    currentOpendIndx === SheetsIndexs.addetionalSourceOfIncome
                  }
                  title={t(
                    'onboarding:financialInformation:additionalIncomeSource',
                  )}
                  subTitle={t(
                    'onboarding:financialInformation:additionalIncomeSource',
                  )}
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
                  keyboardType="numeric"
                  maxLength={6}
                />
                <Spacer />
                {!values.AnotherAddetionalSourceOfIncome && (
                  <AnotherAddetionalIconmeSourceWrapper
                    onPress={() => {
                      setValues({
                        ...values,
                        AnotherAddetionalSourceOfIncome: true,
                      })
                    }}>
                    <View className={cn(flexRowLayout(isRTL))}>
                      <PlusIcon className="mr-2" />
                      <AnotherAddetionalIconmeSource>
                        {t('onboarding:financialInformation:addAnotherSource')}
                      </AnotherAddetionalIconmeSource>
                    </View>
                  </AnotherAddetionalIconmeSourceWrapper>
                )}
                {values.AnotherAddetionalSourceOfIncome && (
                  <View>
                    <DropDown
                      data={additionalIncomes?.data?.map((item: ItemProps) =>
                        isRTL ? item.nameAr : item.nameEn,
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
                        currentOpendIndx ===
                        SheetsIndexs.anotheraddetionalSourceOfIncome
                      }
                      title={t(
                        'onboarding:financialInformation:additionalIncomeSource',
                      )}
                      subTitle={t(
                        'onboarding:financialInformation:additionalIncomeSource',
                      )}
                      onSheetClose={() => setCurrentOpenedInx(-1)}
                      hasSearch
                      dynamicHeight
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
                      maxLength={6}
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
              data={jobOccupations?.data?.map((item: ItemProps) =>
                isRTL ? item?.nameAr : item?.nameEn,
              )}
              label={t('onboarding:financialInformation:occupation') || ''}
              toogleClick={() => ToggleSheet(SheetsIndexs.Occupation)}
              disabled={!!fincialInformationGetData?.occupation?.code}
              onItemSelected={occupation => {
                setValues({
                  ...values,
                  occupation,
                  occupationCode: getItemCode(jobOccupations?.data, occupation),
                  monthlyPrimaryIncomAmount: '',
                })
                setErrors({
                  ...errors,
                  monthlyPrimaryIncomAmount: '',
                })
              }}
              value={values.occupation}
              error={errors.occupation}
              isOpen={currentOpendIndx === SheetsIndexs.Occupation}
              title={t('onboarding:financialInformation:occupation')}
              subTitle={t('onboarding:financialInformation:occupation')}
              onSheetClose={() => setCurrentOpenedInx(-1)}
              hasSearch
              dynamicHeight
            />

            <Spacer />
            {renderCurrentForm()}
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

export default memo(FinancialInformation)

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
  margin-top: 10px;
  margin-bottom: 32px;
  justify-content: center;
  width: 100%;
  padding: 12px 16px;
  height: 70px;

  background: #fcfcfc;
  border: 0.5px solid rgba(60, 60, 60, 0.4);
  border-radius: 12px;
  background-color: #f5f8f9;
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
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  /* identical to box height, or 120% */

  display: flex;
  align-items: center;

  /* Color/Black-Secondary */

  color: #8c8a86;
`
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable eqeqeq */
/* eslint-disable no-alert */
// /* eslint-disable react/no-unstable-nested-components */
// /* eslint-disable react-native/no-inline-styles */
// /* eslint-disable eqeqeq */

import React, {useContext, useEffect, useMemo, useState} from 'react'
import {View, SafeAreaView, TouchableOpacity} from 'react-native'
import {fetcher} from '@Api'
import {useMutation} from '@tanstack/react-query'
import {useNavigation} from '@react-navigation/native'

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
function getFormattedDate(date) {
  let year = date.getFullYear()
  let month = (1 + date.getMonth()).toString().padStart(2, '0')
  let day = date.getDate().toString().padStart(2, '0')

  return month + '/' + day + '/' + year
}
type IFormTYpe = {
  //   // start
  occupation: string | null
  jobCategory: string | null
  nameOfBusiness: string | null
  jobTitle: string | null
  sector: string | null
  investmentType: string | null
  monthlyPrimaryIncomAmount: string | null
  primarySourceOfIncome: string | null
  dateOfJoin: string | null
  gregorian: boolean
  //   //end
  //   //addetionalSourceOfIncome
  AddetionalSourceOfIncome: false
  AddetionalSourceOfIncomeSource: string | null
  AddetionalSourceOfIncomeAmount: string | null
  AnotherAddetionalSourceOfIncome: boolean
  AnotherAddetionalSourceOfIncomeSource: string | null
  AnotherAddetionalSourceOfIncomeAmount: string | null
  // endaddetionalSourceOfIncome
}

const FormValues = {
  //   // start
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
  //   //end
  //   //addetionalSourceOfIncome
  AddetionalSourceOfIncome: false,
  AddetionalSourceOfIncomeSource: '',
  AddetionalSourceOfIncomeAmount: '',
  AnotherAddetionalSourceOfIncome: false,
  AnotherAddetionalSourceOfIncomeSource: '',
  AnotherAddetionalSourceOfIncomeAmount: '',
  // endaddetionalSourceOfIncome
}

const SheetsIndexs = {
  Occupation: 0,
  jobCategory: 1,
  jobTitle: 2,
  sector: 3,
  nameOfBusiness: 4,
  investmentType: 5,
  primarySourceOfIncome: 6,
  addetionalSourceOfIncome: 7,
  anotheraddetionalSourceOfIncome: 8,
}
const SheetData = {
  Occupation: [
    {
      code: 1,
      name: 'Salaried',
      description_en: 'Salaried / Pension',
      description_ar: '',
    },
    {
      code: 2,
      name: 'Business & Professional',
      description_en: 'Salaried / Pension',
      description_ar: '',
    },
    {
      code: 3,
      name: 'Investor',
      description_en: 'Salaried / Pension',
      description_ar: '',
    },
    {
      code: 4,
      name: 'Housewife',
      description_en: 'Salaried / Pension',
      description_ar: '',
    },
    {
      code: 5,
      name: 'Student',
      description_en: 'Salaried / Pension',
      description_ar: '',
    },
    {
      code: 6,
      name: 'Unemployed',
      description_en: 'Salaried / Pension',
      description_ar: '',
    },
    {
      code: 7,
      name: 'Not authorized to work',
      description_en: 'Salaried / Pension',
      description_ar: '',
    },
  ],
  jobCategory: [
    {
      type_code: 'CONS',
      description_en: 'Consultant',
      description_ar: 'مستشار',
    },
    {
      type_code: 'CONS',
      description_en: 'Consultant2',
      description_ar: 'مستشار2',
    },
    {
      type_code: 'CONS',
      description_en: 'Consultant3',
      description_ar: 'مستشار3',
    },
    {
      type_code: 'CONS',
      description_en: 'Consultant4',
      description_ar: 'مستشار4',
    },
    {
      type_code: 'CONS',
      description_en: 'Consultant5',
      description_ar: 'مستشار5',
    },
  ],
  jobTitle: [
    {
      typeCode: 'ACCR',

      descriptionEn: 'Airlines Cabin Crew',

      descriptionAr: 'مضيفة طيران',
    },

    {
      typeCode: 'ACCT',

      descriptionEn: 'Accountant',

      descriptionAr: 'محاسب',
    },

    {
      typeCode: 'ADEM',

      descriptionEn: 'Admin Employee',

      descriptionAr: 'موظف اداري',
    },

    {
      typeCode: 'AMBS',

      descriptionEn: 'Ambassador',

      descriptionAr: 'سفير',
    },

    {
      typeCode: 'ARTT',

      descriptionEn: 'Artist',

      descriptionAr: 'فنان',
    },

    {
      typeCode: 'AUDS',

      descriptionEn: 'Auditor',

      descriptionAr: 'مفتش',
    },

    {
      typeCode: 'AUTR',

      descriptionEn: 'Author',

      descriptionAr: 'مؤلف',
    },

    {
      typeCode: 'BABR',

      descriptionEn: 'Barber',

      descriptionAr: 'حلاق',
    },

    {
      typeCode: 'BRGE',

      descriptionEn: 'Brigadier General',

      descriptionAr: 'عميد',
    },

    {
      typeCode: 'BRKR',

      descriptionEn: 'Broker',

      descriptionAr: 'وسيط',
    },

    {
      typeCode: 'CAPT',

      descriptionEn: 'Captain',

      descriptionAr: 'نقيب',
    },

    {
      typeCode: 'CARP',

      descriptionEn: 'Carpenter',

      descriptionAr: 'نجار',
    },

    {
      typeCode: 'CHSE',

      descriptionEn: 'Chief sergeant',

      descriptionAr: 'رئيس رقباء',
    },

    {
      typeCode: 'CLER',

      descriptionEn: 'Clerk',

      descriptionAr: 'كاتب',
    },

    {
      typeCode: 'CODC',

      descriptionEn: 'Consul/ Deputy consul',

      descriptionAr: 'قنصل',
    },

    {
      typeCode: 'COLO',

      descriptionEn: 'Colonel',

      descriptionAr: 'عقيد',
    },

    {
      typeCode: 'CONS',

      descriptionEn: 'Consultant',

      descriptionAr: 'مستشار',
    },

    {
      typeCode: 'COOK',

      descriptionEn: 'Cook',

      descriptionAr: 'طباخ',
    },

    {
      typeCode: 'COSU',

      descriptionEn: 'Computer Support',

      descriptionAr: 'دعم حاسب آلي',
    },

    {
      typeCode: 'CPAL',

      descriptionEn: 'Corporal',

      descriptionAr: 'عريف',
    },

    {
      typeCode: 'DMNG',

      descriptionEn: 'Deputy manager',

      descriptionAr: 'نائب مدير',
    },

    {
      typeCode: 'DOCT',

      descriptionEn: 'Doctor, dentist, physician',

      descriptionAr: 'دكتور، طبيب، طبيب أسنان',
    },

    {
      typeCode: 'DPLC',

      descriptionEn: 'Diplomatic',

      descriptionAr: 'دبلوماسي',
    },

    {
      typeCode: 'DRIR',

      descriptionEn: 'Driver',

      descriptionAr: 'سائق',
    },

    {
      typeCode: 'DSGR',

      descriptionEn: 'Designer',

      descriptionAr: 'مصمم',
    },

    {
      typeCode: 'ELCT',

      descriptionEn: 'Electrician',

      descriptionAr: 'كهربائي',
    },

    {
      typeCode: 'ENGR',

      descriptionEn: 'Engineer',

      descriptionAr: 'مهندس',
    },

    {
      typeCode: 'EXPT',

      descriptionEn: 'Expert',

      descriptionAr: 'خبير',
    },

    {
      typeCode: 'FARM',

      descriptionEn: 'Farmer',

      descriptionAr: 'مزارع',
    },

    {
      typeCode: 'FRLT',

      descriptionEn: 'First Lieutenant',

      descriptionAr: 'ملازم أول',
    },

    {
      typeCode: 'FRST',

      descriptionEn: 'First Sergeant',

      descriptionAr: 'رقيب أول',
    },

    {
      typeCode: 'GENL',

      descriptionEn: 'General',

      descriptionAr: 'فريق أول',
    },

    {
      typeCode: 'GURD',

      descriptionEn: 'Guard',

      descriptionAr: 'حارس',
    },

    {
      typeCode: 'HODU',

      descriptionEn: 'Head of Department / Unit',

      descriptionAr: 'رئيس ادارة / وحدة',
    },

    {
      typeCode: 'HOME',

      descriptionEn: 'Housewife',

      descriptionAr: 'ربة بيت',
    },

    {
      typeCode: 'HOMU',

      descriptionEn: 'Head of Municipality',

      descriptionAr: 'رئيس بلدية',
    },

    {
      typeCode: 'JEWM',

      descriptionEn: 'Jewelry Maker',

      descriptionAr: 'صائغ',
    },

    {
      typeCode: 'JRNL',

      descriptionEn: 'Journalist',

      descriptionAr: 'صحفي',
    },

    {
      typeCode: 'JUGE',

      descriptionEn: 'Judge',

      descriptionAr: 'قاضي',
    },

    {
      typeCode: 'LABO',

      descriptionEn: 'Laborer',

      descriptionAr: 'عامل',
    },

    {
      typeCode: 'LABT',

      descriptionEn: 'Laboratory Technician',

      descriptionAr: 'فني مختبرات',
    },

    {
      typeCode: 'LAWY',

      descriptionEn: 'Lawyer',

      descriptionAr: 'محامي',
    },

    {
      typeCode: 'LCPL',

      descriptionEn: 'Lance Corporal',

      descriptionAr: 'جندي أول',
    },

    {
      typeCode: 'LIBA',

      descriptionEn: 'Librarian',

      descriptionAr: 'أمين مكتبة',
    },

    {
      typeCode: 'LTCO',

      descriptionEn: 'Lieutenant Colonel',

      descriptionAr: 'مقدم',
    },

    {
      typeCode: 'LTGE',

      descriptionEn: 'Lieutenant General',

      descriptionAr: 'فريق',
    },

    {
      typeCode: 'MAGE',

      descriptionEn: 'Major General',

      descriptionAr: 'لواء',
    },

    {
      typeCode: 'MAJO',

      descriptionEn: 'Major',

      descriptionAr: 'رائد',
    },

    {
      typeCode: 'MBOA',

      descriptionEn: 'Board member',

      descriptionAr: 'عضو مجلس ادارة',
    },

    {
      typeCode: 'MDIR',

      descriptionEn: 'CEO, general manager, managing director',

      descriptionAr: 'مدير عام، رئيس تنفيذي، عضو منتدب',
    },

    {
      typeCode: 'MECH',

      descriptionEn: 'Mechanical',

      descriptionAr: 'ميكانيكي',
    },

    {
      typeCode: 'MIDE',

      descriptionEn: 'Minister/ Deputy Minister',

      descriptionAr: 'وزير/ نائب وزير',
    },

    {
      typeCode: 'MNGR',

      descriptionEn: 'Manager, senior manager',

      descriptionAr: 'مدير',
    },

    {
      typeCode: 'NONE',

      descriptionEn: 'Not employed',

      descriptionAr: 'بدون عمل',
    },

    {
      typeCode: 'NOTR',

      descriptionEn: 'Notary',

      descriptionAr: 'كاتب عدل',
    },

    {
      typeCode: 'NURS',

      descriptionEn: 'Nurse',

      descriptionAr: 'ممرض',
    },

    {
      typeCode: 'NUSE',

      descriptionEn: 'Nurse',

      descriptionAr: 'ممرض/ ممرضة',
    },

    {
      typeCode: 'OPRT',

      descriptionEn: 'Operator',

      descriptionAr: 'مشغل',
    },

    {
      typeCode: 'OTHR',

      descriptionEn: 'Other',

      descriptionAr: 'اخرى',
    },

    {
      typeCode: 'PHOT',

      descriptionEn: 'Photographer',

      descriptionAr: 'مصور',
    },

    {
      typeCode: 'PHRM',

      descriptionEn: 'Pharmacist',

      descriptionAr: 'صيدلاني',
    },

    {
      typeCode: 'PLOT',

      descriptionEn: 'Pilot',

      descriptionAr: 'طيار',
    },

    {
      typeCode: 'PRFL',

      descriptionEn: 'Professional',

      descriptionAr: 'مهني متخصص',
    },

    {
      typeCode: 'PROF',

      descriptionEn: 'Professor',

      descriptionAr: 'أستاذ جامعي',
    },

    {
      typeCode: 'PURE',

      descriptionEn: 'Public Relation',

      descriptionAr: 'علاقات عامة',
    },

    {
      typeCode: 'RECH',

      descriptionEn: 'Researcher',

      descriptionAr: 'باحث',
    },

    {
      typeCode: 'REOU',

      descriptionEn: 'Rector of University',

      descriptionAr: 'رئيس جامعة',
    },

    {
      typeCode: 'RGOV',

      descriptionEn: 'Region Governor',

      descriptionAr: 'حاكم اداري',
    },

    {
      typeCode: 'RTRD',

      descriptionEn: 'Retired',

      descriptionAr: 'متقاعد',
    },

    {
      typeCode: 'SALM',

      descriptionEn: 'Salesman',

      descriptionAr: 'بائع',
    },

    {
      typeCode: 'SECT',

      descriptionEn: 'Secretary',

      descriptionAr: 'سكرتير',
    },

    {
      typeCode: 'SECU',

      descriptionEn: 'Security',

      descriptionAr: 'حارسأمن',
    },

    {
      typeCode: 'SEGT',

      descriptionEn: 'Sergeant',

      descriptionAr: 'وكيل رقيب',
    },

    {
      typeCode: 'SELF',

      descriptionEn: 'Self-Employed',

      descriptionAr: 'عمل خاص',
    },

    {
      typeCode: 'SELT',

      descriptionEn: 'Second Lieutenant',

      descriptionAr: 'ملازم',
    },

    {
      typeCode: 'SOLD',

      descriptionEn: 'Soldier',

      descriptionAr: 'جندي',
    },

    {
      typeCode: 'SPRV',

      descriptionEn: 'Supervisor',

      descriptionAr: 'مشرف',
    },

    {
      typeCode: 'SSGT',

      descriptionEn: 'Staff Sergeant',

      descriptionAr: 'رقيب',
    },

    {
      typeCode: 'STAF',

      descriptionEn: 'Staff',

      descriptionAr: 'موظف',
    },

    {
      typeCode: 'STDN',

      descriptionEn: 'Student',

      descriptionAr: 'طالب',
    },

    {
      typeCode: 'TAIL',

      descriptionEn: 'Tailor',

      descriptionAr: 'خياط',
    },

    {
      typeCode: 'TCHR',

      descriptionEn: 'Teacher',

      descriptionAr: 'مدرس',
    },

    {
      typeCode: 'TECH',

      descriptionEn: 'Technician',

      descriptionAr: 'فني',
    },

    {
      typeCode: 'TESU',

      descriptionEn: 'Technical  Support',

      descriptionAr: 'دعم فني',
    },

    {
      typeCode: 'TRAN',

      descriptionEn: 'Translator',

      descriptionAr: 'مترجم',
    },

    {
      typeCode: 'TRAR',

      descriptionEn: 'Trainer',

      descriptionAr: 'مدرب',
    },

    {
      typeCode: 'WAOF',

      descriptionEn: 'Warrant Officer',

      descriptionAr: 'وكيل ضابط',
    },
  ],
  sectors: [
    {
      type_code: 'CNTR',
      description_en: 'Construction & Contracting1',
      description_ar: '1البناء والمقاولات',
    },
    {
      type_code: 'CNTR',
      description_en: 'Construction & Contracting2',
      description_ar: '2البناء والمقاولات',
    },
    {
      type_code: 'CNTR',
      description_en: 'Construction & Contracting3',
      description_ar: '3البناء والمقاولات',
    },
    {
      type_code: 'CNTR',
      description_en: 'Construction & Contracting4',
      description_ar: '4البناء والمقاولات',
    },
    {
      type_code: 'CNTR',
      description_en: 'Construction & Contracting5',
      description_ar: '5البناء والمقاولات',
    },
  ],
  primarySourceOfIncome: [
    {
      type_code: 'CONS',
      description_en: 'welfare',
      description_ar: 'رعاية',
    },
    {
      type_code: 'Grant',
      description_en: 'Grant',
      description_ar: 'منحة',
    },
    {
      type_code: 'Allowance',
      description_en: 'Allowance',
      description_ar: 'مخصص',
    },
  ],
  addetionalSourceOfIncome: [
    {
      type_code: 'Pension',
      description_en: 'Pension',
      description_ar: 'Pension',
    },
    {
      type_code: 'Investment',
      description_en: 'Investment',
      description_ar: 'Investment',
    },
    {
      type_code: 'Rental',
      description_en: 'Rental',
      description_ar: 'Rental',
    },
    {
      type_code: 'Other free text',
      description_en: 'Other free text',
      description_ar: 'Other free text',
    },
  ],
}
const MapStateForAPi = (values, isRTL) => {
  return {
    occupation: {
      code: 0,
      name: 'string',
      description_en: 'string',
      description_ar: 'string',
    },
    business_name: 'string',
    employment: {
      title: {
        type_code: 'string',
        description_en: 'string',
        description_ar: 'string',
      },
      sector: {
        type_code: 'string',
        description_en: 'string',
        description_ar: 'string',
      },
      joining_date: 'string',
      joining_date_calendar: 'string',
    },
    primary_income: {
      amount: 'string',
      source: 'string',
    },
    investment_type: 'string',
    additional_income_list: [
      {
        amount: 'string',
        source: 'string',
      },
    ],
  }
}
function FinacialInformationScreen() {
  const [currentOpendIndx, setCurrentOpenedInx] = useState(-1)
  const {isRTL} = useContext<AppProviderProps>(AppContext)
  const {t} = useTranslation()
  const [values, setValues] = useState<IFormTYpe>({
    ...FormValues,
  })
  const [errors, setErrors] = useState({
    ...FormValues,
  })
  const [GosiSuccess, SetGosiSuccess] = React.useState(false)
  const [postingFinacial, setPostingFincail] = useState(false)

  const handelPostForm = () => {
    setPostingFincail(true)
    setTimeout(() => {
      setPostingFincail(false)
    }, 1000)
    navigation.navigate('LegalinfoMain')
  }
  const ToggleSheet = (indx: number) => {
    setCurrentOpenedInx(indx)
  }

  const isFormValid = useMemo(() => {
    let currentOccupationCode =
      SheetData.Occupation.find(sheet => sheet.name === values.occupation)
        ?.code || 0
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
  const navigation = useNavigation()
  const {isLoading, data, mutate, reset} = useMutation({
    mutationFn: async () => {
      let journeySecrets
      let journeySecretsData = await getItem('journeySecrets')
      if (journeySecretsData) {
        journeySecrets = JSON.parse(journeySecretsData)
      }
      console.log('=================')
      console.log('journeySecrets.access_token,', journeySecrets.access_token)
      console.log('=================')
      let req: any = await fetcher(BASE_URL + '/onboarding/personal', {
        method: 'GET',
        token: journeySecrets.access_token,
      })
      let res = await req.json()
      return res
    },
  })

  const HandleContinuePressed = () => {}
  const RenderCurrentForm = () => {
    let CurrentFormView = null
    let currentOccupationCode =
      SheetData.Occupation.find(sheet => sheet.name === values.occupation)
        ?.code || 0

    if (
      //'Housewife' ||'Unemployed' ||'Not authorized to work' ||Student'
      currentOccupationCode >= 4
    ) {
      CurrentFormView = (
        <>
          <DropDown
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
            value={values.monthlyPrimaryIncomAmount}
            onChangeText={val => {
              setValues({...values, monthlyPrimaryIncomAmount: val})
            }}
            label={t(
              'onboarding:financialInformation:MonthlyPrimaryIncomeAmount',
            )}
            errorMessage={errors.monthlyPrimaryIncomAmount}
            keyboardType="numeric"
            returnKeyType="done"
            maxLength={10}
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
          />
          <Spacer />
          <TCInput
            value={values.monthlyPrimaryIncomAmount}
            onChangeText={val =>
              setValues({...values, monthlyPrimaryIncomAmount: val})
            }
            label={t(
              'onboarding:financialInformation:MonthlyPrimaryIncomeAmount',
            )}
            errorMessage={errors.monthlyPrimaryIncomAmount}
            maxLength={10}
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
            maxLength={10}
          />

          <Spacer />
          <DropDown
            data={SheetData.jobCategory.map(cat =>
              !isRTL ? cat.description_en : cat.description_ar,
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
            value={values.monthlyPrimaryIncomAmount}
            onChangeText={val =>
              setValues({...values, monthlyPrimaryIncomAmount: val})
            }
            label={t(
              'onboarding:financialInformation:MonthlyPrimaryIncomeAmount',
            )}
            errorMessage={errors.monthlyPrimaryIncomAmount}
            keyboardType="numeric"
            returnKeyType="done"
            maxLength={10}
          />
          <Spacer />
        </>
      )
    }
    if (
      //  'Salary/Pension'
      currentOccupationCode === 1
    ) {
      CurrentFormView = (
        <>
          <DropDown
            data={SheetData.jobCategory.map(cat =>
              isRTL ? cat.description_ar : cat.description_en,
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
              isRTL ? sect.description_ar : sect.description_en,
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
                value={values.monthlyPrimaryIncomAmount}
                onChangeText={val =>
                  setValues({...values, monthlyPrimaryIncomAmount: val})
                }
                label={t(
                  'onboarding:financialInformation:MonthlyPrimaryIncomeAmount',
                )}
                errorMessage={errors.monthlyPrimaryIncomAmount}
                returnKeyType="done"
                keyboardType="numeric"
                maxLength={10}
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
                    dateOfJoin: getFormattedDate(date),
                  })
                }
              />
              {/* <Spacer />
              <RadioWrapper isRTL={!!isRTL}>
                <RadioButton
                  selected={!showAdditionalInformation}
                  onPress={() =>
                    setShowAdditionalInformation(!showAdditionalInformation)
                  }>
                  {'Gregorian'}
                </RadioButton>
                <RadioButton
                  selected={showAdditionalInformation}
                  onPress={() =>
                    setShowAdditionalInformation(!showAdditionalInformation)
                  }>
                  {'hajri'}
                </RadioButton>
              </RadioWrapper> */}
            </View>
          )}
          <Spacer />
        </>
      )
    }
    return (
      <View style={{flex: 1}}>
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
                  maxLength={10}
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
      contentContainerStyle={{flex: 1}}>
      <Layout
        isBack={true}
        isHeader={true}
        isBackground={true}
        isLoading={isLoading || postingFinacial}
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
              onItemSelected={occupation => {
                setValues({
                  ...values,
                  occupation,
                  monthlyPrimaryIncomAmount: '',
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
          <StyledButton disabled={!isFormValid} onPress={handelPostForm}>
            <Text variant={TEXT_VARIANTS.body}>
              {t('onboarding:financialInformation:continue')}
            </Text>
          </StyledButton>
        </SafeAreaWrapper>
      </Layout>
    </ScrollerView>
  )
}

export default FinacialInformationScreen

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

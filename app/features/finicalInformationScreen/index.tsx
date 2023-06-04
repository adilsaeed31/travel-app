// /* eslint-disable react/no-unstable-nested-components */
// /* eslint-disable react-native/no-inline-styles */
// /* eslint-disable eqeqeq */

import React, {useContext, useEffect, useMemo, useState} from 'react'
import {View, SafeAreaView, TouchableOpacity} from 'react-native'

import {useTranslation} from 'react-i18next'
import {
  Layout,
  TCButton as Button,
  TCTextView as Text,
  RadioButton,
  DropDown,
  TCInput,
} from '@Components'
import {TEXT_VARIANTS, Colors} from '@Utils'
import styled from 'styled-components/native'
import {AppContext, AppProviderProps} from '@Context'
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

export const OccupationEn = [
  'Salary/Pension',
  'Business & Professional',
  'Investor',
  'Housewife',
  'Student',
  'Unemployed',
  'Not authorized to work',
]
export const OccupationAr = [
  'الراتب / التقاعد',
  'عمل احترافي',
  'مستثمر',
  'ربه منزل',
  'طالب',
  'غير موظف',
  'غير مصرح له بالعمل',
]
export const AddetionalSourceOfInceomEN = [
  'Pension',
  'Investment',
  'Rental',
  'Other free text',
]
export const AddetionalSourceOfInceoAr = [
  'معاش',
  'استثمار',
  'تأجير',
  'عمل حر اخر',
]
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
    'Salary/Pension',
    'Business & Professional',
    'Investor',
    'Housewife',
    'Student',
    'Unemployed',
    'Not authorized to work',
  ],
  jobCategory: ['cat1', 'cat 2', 'cat 3', 'cat 4', 'cat 5'],
  jobTitle: [
    'job title 1',
    'job title 2',
    'job title 3',
    'job title 4',
    'job title 5',
  ],
  sectors: ['sector 1', 'sector 2', 'sector 3', 'sector 4', 'sector 5'],
  businessNames: [
    'busssines1',
    'busssines2',
    'busssines3',
    'busssines4',
    'busssines5',
  ],
  investMentType: [
    'investmentType1',
    'investmentType2',
    'investmentType3',
    'investmentType4',
    'investmentType5',
  ],
  primarySourceOfIncome: [
    'primary soucre 1',
    'primary soucre 2',
    'primary soucre 3',
    'primary soucre 4',
    'primary soucre 5',
  ],
  addetionalSourceOfIncome: [
    'addetional source 1',
    'addetional source 2',
    'addetional source 3',
    'addetional source 4',
    'addetional source 5',
  ],
}
function FinacialInformationScreen() {
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
  const [GosiSuccess, GosiFaile] = React.useState(true)

  const ToggleSheet = (indx: number) => {
    setCurrentOpenedInx(indx)
  }
  useEffect(() => {
    values.occupation &&
      setValues({...FormValues, occupation: values.occupation})
  }, [values.occupation])
  const isFormValid = useMemo(() => {
    let validationResult = false

    if (
      values.occupation == SheetData.Occupation[3] ||
      values.occupation == SheetData.Occupation[4] ||
      values.occupation == SheetData.Occupation[5] ||
      values.occupation == SheetData.Occupation[6]
    ) {
      values.primarySourceOfIncome && values.monthlyPrimaryIncomAmount?.length
        ? (validationResult = true)
        : (validationResult = false)
    }
    if (
      values.occupation == SheetData.Occupation[2] &&
      values.investmentType &&
      values.monthlyPrimaryIncomAmount?.length
    ) {
      validationResult = true
    }
    if (
      values.occupation == SheetData.Occupation[0] &&
      values.jobCategory &&
      values.jobCategory &&
      values.jobTitle &&
      values.sector
    ) {
      validationResult = true
    }

    if (
      values.occupation == SheetData.Occupation[1] &&
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

  const HandleContinuePressed = () => {}
  const RenderCurrentForm = () => {
    let CurrentFormView = null

    if (
      values.occupation == 'Housewife' ||
      values.occupation == 'Unemployed' ||
      values.occupation == 'Not authorized to work' ||
      values.occupation == 'Student'
    ) {
      CurrentFormView = (
        <>
          <DropDown
            data={SheetData.primarySourceOfIncome}
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
            label={'Monthly primary income amount'}
            errorMessage={errors.monthlyPrimaryIncomAmount}
            keyboardType="numeric"
            returnKeyType="done"
            maxLength={10}
          />
          <Spacer />
        </>
      )
    }

    if (values.occupation == 'Investor') {
      CurrentFormView = (
        <>
          <DropDown
            data={SheetData.investMentType}
            label={'Investment Type'}
            toogleClick={() => ToggleSheet(SheetsIndexs.investmentType)}
            onItemSelected={investmentType =>
              setValues({...values, investmentType})
            }
            value={values.investmentType}
            error={errors.investmentType}
            isOpen={currentOpendIndx == SheetsIndexs.investmentType}
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
            label={'Monthly primary income amount'}
            errorMessage={errors.monthlyPrimaryIncomAmount}
            maxLength={10}
            keyboardType="numeric"
            returnKeyType="done"
          />
          <Spacer />
        </>
      )
    }
    if (values.occupation == 'Business & Professional') {
      CurrentFormView = (
        <>
          <DropDown
            data={SheetData.businessNames}
            label={'Name of bussiness'}
            toogleClick={() => ToggleSheet(SheetsIndexs.nameOfBusiness)}
            onItemSelected={nameOfBusiness =>
              setValues({...values, nameOfBusiness})
            }
            value={values.nameOfBusiness}
            error={errors.nameOfBusiness}
            isOpen={currentOpendIndx == SheetsIndexs.nameOfBusiness}
            title={t('onboarding:financialInformation:jobCategory')}
            subTitle={t('onboarding:financialInformation:jobCategory')}
            onSheetClose={() => setCurrentOpenedInx(-1)}
            hasSearch
          />
          <Spacer />
          <DropDown
            data={SheetData.jobCategory}
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
            data={SheetData.jobTitle}
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
            label={'Monthly primary income amount'}
            errorMessage={errors.monthlyPrimaryIncomAmount}
            keyboardType="numeric"
            returnKeyType="done"
            maxLength={10}
          />
          <Spacer />
        </>
      )
    }
    if (values.occupation == 'Salary/Pension') {
      CurrentFormView = (
        <>
          <DropDown
            data={SheetData.jobCategory}
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
            data={SheetData.jobTitle}
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
            data={SheetData.sectors}
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
                label={'Monthly primary income amount'}
                errorMessage={errors.monthlyPrimaryIncomAmount}
                returnKeyType="done"
                maxLength={10}
              />
              <Spacer />
              <DropDown
                data={isRTL ? ['11', '12'] : ['13,14']}
                label={'Date of Join'}
                toogleClick={() => alert('should toogle date picker')}
                onItemSelected={occupation =>
                  setValues({...values, occupation})
                }
                value={values.occupation}
                error={errors.occupation}
                isOpen={currentOpendIndx == 0}
                title={t('onboarding:financialInformation:selectSector')}
                subTitle={t('onboarding:financialInformation:selectSector')}
                onSheetClose={() => setCurrentOpenedInx(-1)}
                hasSearch
              />
              <Spacer />
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
              </RadioWrapper>
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
              Do you have an additional source of income?
            </AdditionalInformation>
            <Spacer />
            <RadioWrapper isRTL={!!isRTL}>
              <RadioButton
                selected={!values.AddetionalSourceOfIncome}
                onPress={() =>
                  setValues({
                    ...values,
                    AddetionalSourceOfIncome: !values.AddetionalSourceOfIncome,
                  })
                }>
                {t('onboarding:personalInformation:no')}
              </RadioButton>
              <RadioButton
                selected={values.AddetionalSourceOfIncome}
                onPress={() =>
                  setValues({
                    ...values,
                    AddetionalSourceOfIncome: !values.AddetionalSourceOfIncome,
                  })
                }>
                {t('onboarding:personalInformation:yes')}
              </RadioButton>
            </RadioWrapper>
            <Spacer />
            {values.AddetionalSourceOfIncome && (
              <View>
                <DropDown
                  data={SheetData.addetionalSourceOfIncome}
                  label={'Additional Income source'}
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
                  label={'Monthly primary income amount'}
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
                      Add additional Income Source
                    </AnotherAddetionalIconmeSource>
                  </AnotherAddetionalIconmeSourceWrapper>
                )}
                {/* // fucken */}
                {values.AnotherAddetionalSourceOfIncome && (
                  <View>
                    <DropDown
                      data={SheetData.addetionalSourceOfIncome}
                      label={'Additional Income source'}
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
                      label={'Monthly primary income amount'}
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
    <Layout
      isBack={true}
      isHeader={true}
      isBackground={true}
      key={String(
        values.AddetionalSourceOfIncome +
          values.AnotherAddetionalSourceOfIncome,
      )}>
      <SafeAreaWrapper>
        <FormWrapper isRTL={!!isRTL}>
          <Header isRTL={!!isRTL}>
            {t('onboarding:financialInformation:financialInformation') || ''}
          </Header>
          <DropDown
            data={SheetData.Occupation}
            label={t('onboarding:financialInformation:occupation') || ''}
            toogleClick={() => ToggleSheet(SheetsIndexs.Occupation)}
            onItemSelected={occupation => setValues({...values, occupation})}
            value={values.occupation}
            error={errors.occupation}
            isOpen={currentOpendIndx == SheetsIndexs.Occupation}
            title={t('onboarding:personalInformation:education')}
            subTitle={t('onboarding:personalInformation:education')}
            onSheetClose={() => setCurrentOpenedInx(-1)}
            hasSearch
          />
          <Spacer />
          {RenderCurrentForm()}
        </FormWrapper>
        <StyledButton disabled={!isFormValid} onPress={HandleContinuePressed}>
          <Text variant={TEXT_VARIANTS.body700}>
            {t('onboarding:personalInformation:continue')}
          </Text>
        </StyledButton>
      </SafeAreaWrapper>
    </Layout>
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
  border-bottom-width: 1px;
`

/* eslint-disable eqeqeq */

import React, {useContext, useState, useMemo} from 'react'
import {View, SafeAreaView} from 'react-native'

import {useNavigation} from '@react-navigation/native'

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
import {TEXT_VARIANTS, Colors, SPACER_SIZES} from '@Utils'

import styled from 'styled-components/native'
import {pepList, specialNeedList} from './masterData'

import {AppContext, AppProviderProps} from '@Context'
type IFormTYpe = {
  notKsaResidents: boolean
  pepEnabled: boolean
  pepValue?: string | null
  specialNeed: boolean
  specialNeedValue?: string | null
}
// const MapFormValues = (
//   values: IFormTYpe,
//   IsSaudi: boolean,
//   showAdditionalInformation: boolean,
//   isRTL: boolean | undefined,
// ) => {
//   return {}
// }
const FormValues = {
  notKsaResidents: false,
  pepEnabled: false,
  specialNeed: false,
}

function LegalInformation() {
  const [currentOpendIndx, setCurrentOpenedInx] = useState(-1)
  const {isRTL} = useContext<AppProviderProps>(AppContext)
  const {t} = useTranslation()
  const [values, setValues] = useState<IFormTYpe>({
    ...FormValues,
  })
  const [errors, setErrors] = useState<IFormTYpe>({
    ...FormValues,
  })

  const navigation = useNavigation()

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
        if (values.specialNeedValue == 'other') {
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

  const onComplete = () => {
    console.log(values)
  }
  return (
    <>
      <Layout
        key={1}
        isBack={true}
        onBack={() => navigation.goBack()}
        isHeader={true}
        isLoading={false}
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
                  onItemSelected={val => setValues({...values, pepValue: val})}
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

                {values.specialNeedValue == 'other' && (
                  <>
                    <Spacer size={SPACER_SIZES.BASE * 1} />
                    <Input label={'Disability'} />
                  </>
                )}
              </>
            ) : null}
          </View>
          <StyledButton disabled={!isFormValid} onPress={onComplete}>
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

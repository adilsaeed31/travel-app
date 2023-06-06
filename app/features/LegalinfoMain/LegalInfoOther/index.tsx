import React, {useContext, useState, useMemo} from 'react'
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
import {TEXT_VARIANTS, Colors, SPACER_SIZES} from '@Utils'
import {StackNavigationProp} from '@react-navigation/stack'
import styled from 'styled-components/native'
import {pepList, specialNeedList} from '../masterData'

import {AppContext, AppProviderProps} from '@Context'
type IFormTYpe = {
  notKsaResidents: boolean
  pepEnabled: boolean
  pepValue?: string
  specialNeed: boolean
  visaKSA: boolean
  specialNeedValue?: string
}

const FormValues = {
  notKsaResidents: undefined,
  pepEnabled: undefined,
  pepValue: undefined,
  specialNeed: undefined,
  visaKSA: undefined,
  specialNeedValue: undefined,
}

type Props = {
  navigation: StackNavigationProp<any>
  route: any
}

function LegalInfoOther({navigation}: Props) {
  const [currentOpendIndx, setCurrentOpenedInx] = useState(-1)
  const {isRTL} = useContext<AppProviderProps>(AppContext)
  const {t} = useTranslation()
  const [values, setValues] = useState<IFormTYpe>({
    ...FormValues,
  })
  const [errors, setErrors] = useState<IFormTYpe>({
    ...FormValues,
  })
  const [isLoader, setIsLoader] = useState<boolean>(false)

  const isFormValid = useMemo(() => {
    const {notKsaResidents, pepEnabled, specialNeed, visaKSA} = values
    return (
      notKsaResidents !== undefined &&
      pepEnabled !== undefined &&
      specialNeed !== undefined &&
      visaKSA !== undefined
    )
  }, [values])

  const ToggleSheet = (indx: number) => {
    setCurrentOpenedInx(indx)
    let err = errors
    if (indx === 0) {
      err.pepValue = ''
    }
    if (indx === 1) {
      err.specialNeedValue = ''
    }

    setErrors(err)
  }

  const onComplete = () => {
    console.log(values)
    setIsLoader(true)
    setTimeout(() => {
      setIsLoader(false)
      navigation.navigate('CreateUser')
    }, 2000)
  }

  return (
    <>
      <Layout
        key={1}
        isBack={true}
        onBack={() => navigation.goBack()}
        isHeader={true}
        isLoading={isLoader}
        isBackground={true}>
        <SafeAreaWrapper>
          <View>
            <Spacer size={SPACER_SIZES.BASE * 1.5} />
            <Header isRTL={!!isRTL}>{t('Legal Requirements')}</Header>

            <AdditionalInformation>
              {t('Are you a US Person?')}
            </AdditionalInformation>
            <Spacer size={SPACER_SIZES.BASE * 1.5} />
            <RadioWrapper isRTL={!!isRTL}>
              <RadioButton
                selected={values.notKsaResidents === false}
                onPress={() =>
                  setValues({
                    ...values,
                    notKsaResidents: false,
                  })
                }>
                {t('No')}
              </RadioButton>
              <RadioButton
                selected={values.notKsaResidents === true}
                onPress={() =>
                  setValues({
                    ...values,
                    notKsaResidents: true,
                  })
                }>
                {t('Yes')}
              </RadioButton>
            </RadioWrapper>
            <Spacer size={SPACER_SIZES.BASE * 6} />
            <AdditionalInformation>
              {t(
                'Are you are Tax resident of any country or countries outside from KSA? (No, I confirm that KSA is my sole residency for tax purposes)',
              )}
            </AdditionalInformation>
            <Spacer size={SPACER_SIZES.BASE * 1.5} />
            <RadioWrapper isRTL={!!isRTL}>
              <RadioButton
                selected={values.pepEnabled === false}
                onPress={() =>
                  setValues({
                    ...values,
                    pepEnabled: false,
                  })
                }>
                {t('No')}
              </RadioButton>
              <RadioButton
                selected={values.pepEnabled === true}
                onPress={() =>
                  setValues({
                    ...values,
                    pepEnabled: true,
                  })
                }>
                {t('Yes')}
              </RadioButton>
            </RadioWrapper>
            <Spacer size={SPACER_SIZES.BASE * 6} />
            <AdditionalInformation>
              {t('Do you have special needs?')}
            </AdditionalInformation>
            <Spacer size={SPACER_SIZES.BASE * 1.5} />
            <RadioWrapper isRTL={!!isRTL}>
              <RadioButton
                selected={values.specialNeed === false}
                onPress={() =>
                  setValues({
                    ...values,
                    specialNeed: false,
                  })
                }>
                {t('No')}
              </RadioButton>
              <RadioButton
                selected={values.specialNeed === true}
                onPress={() =>
                  setValues({
                    ...values,
                    specialNeed: true,
                  })
                }>
                {t('Yes')}
              </RadioButton>
            </RadioWrapper>
            <Spacer size={SPACER_SIZES.BASE * 6} />
            <AdditionalInformation>
              {t(
                'Do you have an immigrant visa or permanent resident status in a country other than KSA?',
              )}
            </AdditionalInformation>
            <Spacer size={SPACER_SIZES.BASE * 1.5} />
            <RadioWrapper isRTL={!!isRTL}>
              <RadioButton
                selected={values.visaKSA === false}
                onPress={() =>
                  setValues({
                    ...values,
                    visaKSA: false,
                  })
                }>
                {t('No')}
              </RadioButton>
              <RadioButton
                selected={values.visaKSA === true}
                onPress={() =>
                  setValues({
                    ...values,
                    visaKSA: true,
                  })
                }>
                {t('Yes')}
              </RadioButton>
            </RadioWrapper>
          </View>
          {isFormValid ? (
            <StyledButton onPress={onComplete}>
              <Text variant={TEXT_VARIANTS.body}>
                {t('onboarding:personalInformation:continue')}
              </Text>
            </StyledButton>
          ) : (
            <StyledButton disabled>
              <Text variant={TEXT_VARIANTS.body}>
                {t('onboarding:personalInformation:continue')}
              </Text>
            </StyledButton>
          )}
        </SafeAreaWrapper>
      </Layout>
    </>
  )
}

export default LegalInfoOther

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

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
import {documentTypes} from '../masterData'
import {postalCodeValidator, cityValidator} from '../validators'
import {AppContext, AppProviderProps} from '@Context'
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
}

const FormValues = {
  documentType: null,
  documentNumber: null,
  addressOutsideKSA: false,
  address: {},
}

type Props = {
  navigation: StackNavigationProp<any>
  route: any
}

function Screen({navigation}: Props) {
  const [currentOpendIndx, setCurrentOpenedInx] = useState(-1)
  const {isRTL} = useContext<AppProviderProps>(AppContext)
  const {t} = useTranslation()

  const [values, setValues] = useState<IFormTYpe>({
    ...FormValues,
  })
  const [errors, setErrors] = useState<IFormTYpe>({
    ...FormValues,
  })

  const ToggleSheet = (indx: number) => {
    setCurrentOpenedInx(indx)
    let err = errors
    if (indx == 0) {
      err.documentType = ''
    }

    setErrors(err)
  }

  const isFormValid = useMemo(() => {
    let isValid = false
    if (values.documentType && values.documentNumber) {
      isValid = true
    }
    console.log(isValid)
    if (
      values.addressOutsideKSA &&
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

  const onComplete = () => {
    navigation.navigate('LegalInfoFlow2')
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
              {t('Are you a US Person?')}
            </AdditionalInformation>
            <Spacer size={SPACER_SIZES.BASE * 1.5} />
            <DropDown
              data={documentTypes.map(c =>
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
            />
            <Spacer size={SPACER_SIZES.BASE * 4} />
            <Input
              label={'Document number'}
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
                  keyboardType="number-pad"
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
                  maxLength={10}
                />
                <Spacer size={SPACER_SIZES.BASE * 4} />
                <Input
                  value={values.district}
                  onChangeText={val => setValues({...values, district: val})}
                  label={t('onboarding:personalInformation:district')}
                  errorMessage={errors.district}
                  returnKeyType="done"
                  maxLength={10}
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
                  keyboardType="number-pad"
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
                  maxLength={10}
                  schema={cityValidator}
                />
                <Spacer size={SPACER_SIZES.BASE * 4} />
                <Input
                  value={values.phoneNumber}
                  onChangeText={val => setValues({...values, phoneNumber: val})}
                  label={t('onboarding:personalInformation:phoneNumber')}
                  keyboardType="number-pad"
                  returnKeyType="done"
                  maxLength={10}
                />
                <Spacer size={SPACER_SIZES.BASE * 4} />
              </Row>
            )}
          </View>
          <StyledButton disabled={!isFormValid} onPress={onComplete}>
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

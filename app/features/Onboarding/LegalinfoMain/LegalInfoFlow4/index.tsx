import React, {useContext, useState, useMemo} from 'react'
import {View, SafeAreaView} from 'react-native'
import {useTranslation} from 'react-i18next'
import {
  Layout,
  TCButton as Button,
  TCTextView as Text,
  DropDown,
  RadioButton,
  TCInput as Input,
  Spacer,
} from '@Components'
import {TEXT_VARIANTS, Colors, SPACER_SIZES} from '@Utils'
import {StackNavigationProp} from '@react-navigation/stack'
import styled from 'styled-components/native'
import {countriesList, documentTypes, prStatusList} from '../masterData'
import {postalCodeValidator, cityValidator} from '../validators'
import {AppContext, AppProviderProps} from '@Context'

type IFormTYpe = {
  countries: {
    country?: string
    docType?: string
    permanentStatus?: string
  }[]
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
  countries: [
    {
      country: '',
      docType: '',
    },
  ],
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

    setErrors(err)
  }

  const isFormValid = useMemo(() => {
    let isValid = true
    console.log(values)
    return isValid
  }, [values])

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

            <Spacer size={SPACER_SIZES.BASE * 4} />
            <AdditionalInformation>
              {t(
                'Do you have an immigrant visa or permanent resident status in a country other than KSA?',
              )}
            </AdditionalInformation>
            <Subheader isRTL={!!isRTL}>
              {t('Maximum of three countries can be selected.')}
            </Subheader>

            {values.countries &&
              !!values.countries.length &&
              values.countries.map((item, index) => {
                return (
                  <View key={index}>
                    {index != 0 ? <Hr /> : null}
                    <Spacer size={SPACER_SIZES.SM} />
                    <DropDown
                      data={countriesList.map(c =>
                        isRTL ? c.nameAr : c.nameEn,
                      )}
                      label={t('Select Country') || ''}
                      toogleClick={() => ToggleSheet(index * 3)}
                      value={values.countries[index]?.country}
                      error={undefined}
                      onItemSelected={val => {
                        let sT = JSON.parse(JSON.stringify(values))
                        sT.countries[index].country = val
                        setValues(sT)
                      }}
                      isOpen={currentOpendIndx === index * 3}
                      title={t('Select Country')}
                      onSheetClose={() => setCurrentOpenedInx(-1)}
                      hasSearch={false}
                    />
                    <Spacer size={SPACER_SIZES.SM} />
                    <DropDown
                      data={documentTypes.map(c =>
                        isRTL ? c.levelNameAr : c.levelNameEn,
                      )}
                      label={t('Select Document') || ''}
                      toogleClick={() => ToggleSheet(index * 3 + 1)}
                      value={values.countries[index].docType}
                      error={undefined}
                      onItemSelected={val => {
                        let sT = JSON.parse(JSON.stringify(values))
                        sT.countries[index].docType = val
                        setValues(sT)
                      }}
                      isOpen={currentOpendIndx === index * 3 + 1}
                      title={t('Select Document')}
                      onSheetClose={() => setCurrentOpenedInx(-1)}
                      hasSearch={false}
                    />
                    {values.countries[index].docType ===
                    'Permanent Resident' ? (
                      <>
                        <Spacer size={SPACER_SIZES.SM} />
                        <DropDown
                          data={prStatusList.map(c =>
                            isRTL ? c.levelNameAr : c.levelNameEn,
                          )}
                          label={t('Select Permanent Status') || ''}
                          toogleClick={() => ToggleSheet(index * 3 + 2)}
                          value={values.countries[index]?.permanentStatus}
                          error={undefined}
                          onItemSelected={val => {
                            let sT = JSON.parse(JSON.stringify(values))
                            sT.countries[index].permanentStatus = val
                            setValues(sT)
                          }}
                          isOpen={currentOpendIndx === index * 3 + 2}
                          title={t('Select Permanent Status')}
                          onSheetClose={() => setCurrentOpenedInx(-1)}
                          hasSearch={false}
                        />
                      </>
                    ) : null}
                  </View>
                )
              })}
            {values.countries && values.countries.length < 3 && (
              <>
                <Spacer size={SPACER_SIZES.BASE * 2} />
                <AddCountry
                  onPress={() => {
                    setValues({
                      ...values,
                      countries: [...values.countries, {}],
                    })
                  }}>
                  <AddCountryText>
                    {t('Add an additional country (Optional)')}
                  </AddCountryText>
                </AddCountry>
              </>
            )}
            <Spacer size={SPACER_SIZES.BASE * 3} />
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
          <StyledButton disabled={isFormValid} onPress={onComplete}>
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
`
const Subheader = styled(Text)<{isRTL?: boolean}>`
  font-size: 14px;
  line-height: 22px;
  color: #3f3d36;
  text-align: ${props => (props.isRTL ? 'right' : 'left')};
  font-weight: 400;
  margin-top: 4px;
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

const Row = styled.View`
  width: 100%;

  border-radius: 7px;
`
const StyledButton = styled(Button)`
  margin-left: 32px;
  margin-right: 32px;
  width: 100%;
  align-self: center;
`
const AddCountry = styled.TouchableOpacity`
  width: 100%;
  border: 1px solid #a2a2a2;
  padding: 26px 16px;
  background: #fcfcfc;
  border: 0.5px solid rgba(60, 60, 60, 0.4);
  border-radius: 12px;
  margin-bottom: 16px;
`
const AddCountryText = styled(Text)`
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #3f3d36;
  opacity: 0.5;
  text-align: center;
`
const RadioWrapper = styled(View)<{isRTL: boolean}>`
  flex-direction: row;
`

const Hr = styled(View)`
  border-bottom: 1px solid #b7b7b7;
  width: 100%;
  background-color: #b7b7b7;
  height: 1px;
  margin-top: 10px;
`

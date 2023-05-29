/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useState} from 'react'
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native'
import {useTranslation} from 'react-i18next'
import {
  Layout,
  TCButton as Button,
  TCTextView as Text,
  RadioButton,
  DropDown,
  TCInput,
} from '@Components'
import {
  TEXT_VARIANTS,
  Educationalist,
  Colors,
  EducationalistAr,
  CounryListAr,
  CounryListEN,
  SaudiCities,
} from '@Utils'
import styled from 'styled-components/native'

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

function FinacialInformation() {
  const [showAdditionalInformation, setShowAdditionalInformation] =
    React.useState(false)
  const [currentOpendIndx, setCurrentOpenedInx] = React.useState(-1)
  const [sheetOpen, setSheetOpen] = React.useState(false)
  const {isRTL} = useContext<AppProviderProps>(AppContext)
  const {t} = useTranslation()
  const [searchVaue, setSearchValue] = useState('') // TODO
  const [values, setValues] = useState<IFormTYpe>({
    ...FormValues,
  })
  const [errors, setErrors] = useState({
    ...FormValues,
  })
  const IsSaudi =
    values.countryOfBirth === 'Saudi Arabia' ||
    !values.countryOfBirth ||
    values.countryOfBirth == 'المملكة العربية السعودية'

  const sheetData = React.useMemo(
    () => [
      {
        data: isRTL ? EducationalistAr : Educationalist,
      },
      {
        data: isRTL
          ? CounryListAr.map(c => c.name)
          : CounryListEN.map(c => c.name),
      },
      {
        data: SaudiCities.map(c => c[isRTL ? 'name_ar' : 'name_en']),
      },
    ],
    [isRTL],
  )

  const SearchResult = searchVaue
    ? sheetData[currentOpendIndx]?.data?.filter(word =>
        word?.includes(searchVaue),
      )
    : sheetData[currentOpendIndx]?.data

  const ToggleSheet = (indx: number) => {
    setSheetOpen(!sheetOpen)
    setCurrentOpenedInx(indx)
    setSearchValue('')
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
  const RenderSearchListContent = () =>
    React.useMemo(
      () => (
        <View>
          <FlatList
            data={SearchResult}
            keyExtractor={(_item, i) => String(i)}
            renderItem={({item, index}) => (
              <ClickableItem
                hasBorder={SearchResult.length - 1 !== index}
                onPress={() => {
                  setSheetOpen(false)
                  setCurrentOpenedInx(-1)
                  let newValue = {...values}
                  newValue[
                    currentOpendIndx == 0
                      ? 'education'
                      : currentOpendIndx == 1
                      ? 'countryOfBirth'
                      : 'city'
                  ] = item
                  setValues(newValue)
                }}
                key={index}>
                <ClickableItemText isRTL={!!isRTL}>{item}</ClickableItemText>
              </ClickableItem>
            )}
          />
        </View>
      ),
      [searchVaue, SearchResult],
    )
  const HandleContinuePressed = () => {
    let err = {...errors}
    if (!values.city) {
      err.city = t('common:required')
    }
    if (!values.countryOfBirth) {
      err.countryOfBirth = t('common:required')
    }
    if (!values.education) {
      err.education = t('common:required')
    }
    if (!IsSaudi) {
      err.buldingNumber = !values.buldingNumber ? t('common:required') : ''
      err.streetNanme = !values.streetNanme ? t('common:required') : ''
      err.district = !values.district ? t('common:required') : ''
      err.poBox = !values.poBox ? t('common:required') : ''
      err.postalCode = !values.postalCode ? t('common:required') : ''
      err.phoneNumber = !values.phoneNumber ? '' : t('common:required')
    }
    if (showAdditionalInformation) {
      err.contactName = !values.contactName ? t('common:required') : ''
      err.relation = !values.relation ? t('common:required') : ''
      err.phoneNumber = !values.phoneNumber ? t('common:required') : ''
    }
    setErrors(err)
  }
  return (
    <>
      <Layout isBack={true} isHeader={true} isBackground={true}>
        <SafeAreaWrapper>
          <ScrollerView>
            <FormWrapper isRTL={!!isRTL}>
              <Header isRTL={!!isRTL}>
                {t('onboarding:personalInformation:personalInformation')}
              </Header>
              <DropDown
                label={t('onboarding:personalInformation:education') || ''}
                toogleClick={() => ToggleSheet(0)}
                value={values.education}
                error={errors.education}
                isOpen={currentOpendIndx == 0}
                title={t('onboarding:personalInformation:education')}
                subTitle={t('onboarding:personalInformation:education')}
                renderConten={<RenderSearchListContent />}
                onSheetClose={() => setCurrentOpenedInx(-1)}
                hasSearch
                onSearchChange={search => setSearchValue(search)}
              />
              <Spacer />
              <DropDown
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
                renderConten={<RenderSearchListContent />}
                onSheetClose={() => setCurrentOpenedInx(-1)}
                hasSearch
                onSearchChange={search => setSearchValue(search)}
              />
              <Spacer />
              {IsSaudi ? (
                <DropDown
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
                  renderConten={<RenderSearchListContent />}
                  onSheetClose={() => setCurrentOpenedInx(-1)}
                  hasSearch
                  onSearchChange={search => setSearchValue(search)}
                />
              ) : (
                <LoginForm>
                  <TCInput
                    value={values.buldingNumber}
                    onChangeText={val =>
                      val && setValues({...values, buldingNumber: val})
                    }
                    label={t('onboarding:personalInformation:buldingNumber')}
                    errorMessage={errors.buldingNumber}
                  />
                  <InputSpacer />
                  <TCInput
                    value={values.streetNanme}
                    onChangeText={val =>
                      val && setValues({...values, streetNanme: val})
                    }
                    label={t('onboarding:personalInformation:streetNanme')}
                    errorMessage={errors.streetNanme}
                  />
                  <InputSpacer />
                  <TCInput
                    value={values.district}
                    onChangeText={val =>
                      val && setValues({...values, district: val})
                    }
                    label={t('onboarding:personalInformation:district')}
                    errorMessage={errors.district}
                  />
                  <InputSpacer />
                  <TCInput
                    value={values.poBox}
                    onChangeText={val =>
                      val && setValues({...values, poBox: val})
                    }
                    label={t('onboarding:personalInformation:poBox')}
                    errorMessage={errors.poBox}
                  />
                  <InputSpacer />
                  <TCInput
                    value={values.postalCode}
                    onChangeText={val =>
                      val && setValues({...values, postalCode: val})
                    }
                    label={t('onboarding:personalInformation:postalCode')}
                    errorMessage={errors.postalCode}
                  />
                  <InputSpacer />
                  <TCInput
                    value={values.city}
                    onChangeText={val =>
                      val && setValues({...values, city: val})
                    }
                    label={t('onboarding:personalInformation:city')}
                    errorMessage={errors.city}
                  />
                  <InputSpacer />
                  <TCInput
                    value={values.phoneNumber}
                    onChangeText={val =>
                      val && setValues({...values, phoneNumber: val})
                    }
                    label={t('onboarding:personalInformation:phoneNumber')}
                    errorMessage={errors.phoneNumber}
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
              <Spacer />
              {showAdditionalInformation && (
                <LoginForm>
                  <TCInput
                    value={values.contactName}
                    onChangeText={val =>
                      val && setValues({...values, contactName: val})
                    }
                    label={t(
                      'onboarding:personalInformation:addetionalContactNanme',
                    )}
                    errorMessage={errors.contactName}
                  />
                  <Spacer />
                  <TCInput
                    value={values.relation}
                    onChangeText={val =>
                      val && setValues({...values, relation: val})
                    }
                    label={t('onboarding:personalInformation:relation')}
                    errorMessage={errors.relation}
                  />
                  <Spacer />
                  <TCInput
                    value={values.phoneNumber}
                    onChangeText={val =>
                      val && setValues({...values, phoneNumber: val})
                    }
                    label={t('onboarding:personalInformation:mobileNumber')}
                    errorMessage={errors.phoneNumber}
                  />
                  <Spacer />
                </LoginForm>
              )}
            </FormWrapper>
            <StyledButton onPress={HandleContinuePressed}>
              <Text variant={TEXT_VARIANTS.body700}>
                {t('onboarding:personalInformation:continue')}
              </Text>
            </StyledButton>
          </ScrollerView>
        </SafeAreaWrapper>
      </Layout>
    </>
  )
}

export default FinacialInformation

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
  margin-bottom: ${Dimensions.get('window').height / 7}px;
`
const FormWrapper = styled(SafeAreaView)<{isRTL: boolean}>`
  align-items: ${props => (props.isRTL ? 'flex-end' : 'flex-start')};
`

const ClickableItem = styled(TouchableOpacity)<{hasBorder: boolean}>`
  border-bottom-width: ${props => (props.hasBorder ? '1px' : '0px')};
  border-bottom-color: #e6e6e6;
  height: 40px;
  margin-top: 2px;
  justify-content: center;
`
const ClickableItemText = styled(Text)<{isRTL: boolean}>`
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #1e1e1c;
  text-align: ${props => (props.isRTL ? 'right' : 'left')};
`

const LoginForm = styled.View`
  width: 100%;
  margin-top: 10px;
`
const ScrollerView = styled.ScrollView`
  height: ${Dimensions.get('window').height * 1.4}px;
`

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
import {TCInput} from '@Components'
import {
  Layout,
  TCButton as Button,
  TCTextView as Text,
  BottomSheet,
  RadioButton,
  DropDownButton,
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
function PrsonalInformation() {
  const [showAdditionalInformation, setShowAdditionalInformation] =
    React.useState(false)
  const [currentOpendIndx, setCurrentOpenedInx] = React.useState(0)
  const [sheetOpen, setSheetOpen] = React.useState(false)
  const {isRTL} = useContext<AppProviderProps>(AppContext)
  const {t} = useTranslation()
  const [searchVaue, setSearchValue] = useState('')
  const [values, setValues] = useState<{
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
  }>({
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
        title: t('personalInformation:education'),
        subtitle: t('personalInformation:education'),
        data: isRTL ? EducationalistAr : Educationalist,
      },
      {
        title: t('personalInformation:countryOfBirth'),
        subtitle: t('personalInformation:countryOfBirth'),
        data: isRTL
          ? CounryListAr.map(c => c.name)
          : CounryListEN.map(c => c.name),
      },
      {
        title: t('personalInformation:city'),
        subtitle: t('personalInformation:city'),
        data: SaudiCities.map(c => c[isRTL ? 'name_ar' : 'name_en']),
      },
    ],
    [isRTL],
  )
  const SearchResult = searchVaue
    ? sheetData[currentOpendIndx].data.filter(word => word.includes(searchVaue))
    : sheetData[currentOpendIndx].data
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
                hasBorder={SearchResult.map(c => c.name).length - 1 !== index}
                onPress={() => {
                  setSheetOpen(false)
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
      <BottomSheet
        onItemSelect={(_item: string) => {
          setSheetOpen(false)
        }}
        hasSearch
        searchValue={searchVaue}
        onSearchChange={e => setSearchValue(e)}
        renderConten={<RenderSearchListContent />}
        isOpen={sheetOpen}
        onBackDropPressed={() => setSheetOpen(false)}
        onCloseEnd={() => setSheetOpen(false)}
        title={sheetData[currentOpendIndx].title}
        subTitle={sheetData[currentOpendIndx].subtitle}
        data={sheetData[currentOpendIndx].data}
      />
      <Layout hasBack isHeader={false} isBackground={true}>
        <SafeAreaWrapper>
          <FormWrapper isRTL={!!isRTL}>
            <Header isRTL={!!isRTL}>
              {t('personalInformation:personalInformation')}
            </Header>
            <DropDownButton
              label={t('personalInformation:education') || ''}
              toogleClick={() => ToggleSheet(0)}
              value={values.education}
              error={errors.education}
            />
            <Spacer />
            <DropDownButton
              toogleClick={() => {
                ToggleSheet(1)
                setValues({...values, city: null})
              }}
              label={t('personalInformation:countryOfBirth') || ''}
              value={values.countryOfBirth}
              error={errors.countryOfBirth}
            />
            <Spacer />
            {IsSaudi ? (
              <DropDownButton
                disabled={!values.countryOfBirth}
                toogleClick={() => {
                  if (!values.countryOfBirth) {
                    return
                  }
                  ToggleSheet(2)
                }}
                label={t('personalInformation:city') || ''}
                value={values.city}
                error={errors.city}
              />
            ) : (
              <LoginForm>
                <TCInput
                  value={values.buldingNumber}
                  onChangeText={val =>
                    val && setValues({...values, buldingNumber: val})
                  }
                  label={t('personalInformation:buldingNumber')}
                  errorMessage={errors.buldingNumber}
                />
                <InputSpacer />
                <TCInput
                  value={values.streetNanme}
                  onChangeText={val =>
                    val && setValues({...values, streetNanme: val})
                  }
                  label={t('personalInformation:streetNanme')}
                  errorMessage={errors.streetNanme}
                />
                <InputSpacer />
                <TCInput
                  value={values.district}
                  onChangeText={val =>
                    val && setValues({...values, district: val})
                  }
                  label={t('personalInformation:district')}
                  errorMessage={errors.district}
                />
                <InputSpacer />
                <TCInput
                  value={values.poBox}
                  onChangeText={val =>
                    val && setValues({...values, poBox: val})
                  }
                  label={t('personalInformation:poBox')}
                  errorMessage={errors.poBox}
                />
                <InputSpacer />
                <TCInput
                  value={values.postalCode}
                  onChangeText={val =>
                    val && setValues({...values, postalCode: val})
                  }
                  label={t('personalInformation:postalCode')}
                  errorMessage={errors.postalCode}
                />
                <InputSpacer />
                <TCInput
                  value={values.city}
                  onChangeText={val => val && setValues({...values, city: val})}
                  label={t('personalInformation:city')}
                  errorMessage={errors.city}
                />
                <InputSpacer />
                <TCInput
                  value={values.phoneNumber}
                  onChangeText={val =>
                    val && setValues({...values, phoneNumber: val})
                  }
                  label={t('personalInformation:phoneNumber')}
                  errorMessage={errors.phoneNumber}
                />
                <InputSpacer />
              </LoginForm>
            )}
            <Spacer />
            <AdditionalInformation>
              {t('personalInformation:additionalPerson')}
            </AdditionalInformation>
            <AdditionalInformation>
              {t('personalInformation:additionalPersonSecond')}
            </AdditionalInformation>
            <Spacer />
            <RadioWrapper isRTL={!!isRTL}>
              <RadioButton
                selected={!showAdditionalInformation}
                onPress={() =>
                  setShowAdditionalInformation(!showAdditionalInformation)
                }>
                {t('personalInformation:no')}
              </RadioButton>
              <RadioButton
                selected={showAdditionalInformation}
                onPress={() =>
                  setShowAdditionalInformation(!showAdditionalInformation)
                }>
                {t('personalInformation:yes')}
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
                  label={t('personalInformation:addetionalContactNanme')}
                  errorMessage={errors.contactName}
                />
                <Spacer />
                <TCInput
                  value={values.relation}
                  onChangeText={val =>
                    val && setValues({...values, relation: val})
                  }
                  label={t('personalInformation:relation')}
                  errorMessage={errors.relation}
                />
                <Spacer />
                <TCInput
                  value={values.phoneNumber}
                  onChangeText={val =>
                    val && setValues({...values, phoneNumber: val})
                  }
                  label={t('personalInformation:mobileNumber')}
                  errorMessage={errors.phoneNumber}
                />
                <Spacer />
              </LoginForm>
            )}
          </FormWrapper>
          <StyledButton onPress={HandleContinuePressed}>
            <Text variant={TEXT_VARIANTS.body700}>
              {t('personalInformation:continue')}
            </Text>
          </StyledButton>
        </SafeAreaWrapper>
      </Layout>
    </>
  )
}

export default PrsonalInformation

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
  margin-bottom: ${Dimensions.get('window').height / 7};
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

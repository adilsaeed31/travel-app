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
import {countriesList} from '../masterData'
import {AppContext, AppProviderProps} from '@Context'
type IFormTYpe = {
  countries: {
    buldingNumber: string
    streetNanme: string
    district: string
    poBox: string
    postalCode: string
    city: string
    phoneNumber: string
    country: string
    isTin?: boolean
    tinNumber?: string
    noTinReason?: string
  }[]
}

const FormValues = {
  countries: [],
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
    navigation.navigate('LegalInfoFlow3')
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
            <Subheader isRTL={!!isRTL}>
              {t('Please, select your obligations outside KSA')}
            </Subheader>
            <Spacer size={SPACER_SIZES.BASE * 4} />
            <AdditionalInformation>
              {t(
                'Are you are Tax resident of any country or countries outside of Saudi Arabia?',
              )}
            </AdditionalInformation>
            <Subheader isRTL={!!isRTL}>
              {t('Maximum of three countries can be selected.')}
            </Subheader>
            {!values.countries.length && (
              <>
                <Spacer size={SPACER_SIZES.BASE * 1.5} />

                <DropDown
                  data={countriesList.map(c => (isRTL ? c.nameAr : c.nameEn))}
                  label={t('Select Country') || ''}
                  toogleClick={() => ToggleSheet(0)}
                  value={undefined}
                  error={undefined}
                  onItemSelected={val =>
                    setValues({
                      ...values,
                      countries: [
                        ...values.countries,
                        {
                          buldingNumber: '',
                          streetNanme: '',
                          district: '',
                          poBox: '',
                          postalCode: '',
                          city: '',
                          isTin: true,
                          tinNumber: '',
                          noTinReason: '',
                          phoneNumber: '',
                          country: val,
                        },
                      ],
                    })
                  }
                  isOpen={currentOpendIndx === 0}
                  title={t('Select Country')}
                  onSheetClose={() => setCurrentOpenedInx(-1)}
                  hasSearch={false}
                />
              </>
            )}
            <Spacer size={SPACER_SIZES.BASE * 4} />
            {values.countries &&
              !!values.countries.length &&
              values.countries.map((item, index) => {
                return (
                  <Row key={index}>
                    <View>
                      <Subheader>{t('Country')}</Subheader>
                      <Spacer size={SPACER_SIZES.BASE * 3} />
                    </View>
                    <DropDown
                      data={countriesList.map(c =>
                        isRTL ? c.nameAr : c.nameEn,
                      )}
                      label={t('Country') || ''}
                      toogleClick={() => ToggleSheet(0)}
                      value={item.country}
                      error={undefined}
                      onItemSelected={() =>
                        setValues({
                          ...values,
                          countries: [
                            ...values.countries,
                            {
                              buldingNumber: '',
                              streetNanme: '',
                              district: '',
                              poBox: '',
                              postalCode: '',
                              city: '',
                              isTin: true,
                              tinNumber: '',
                              noTinReason: '',
                              phoneNumber: '',
                              country: '',
                            },
                          ],
                        })
                      }
                      isOpen={currentOpendIndx === 0}
                      title={t('Select Country')}
                      onSheetClose={() => setCurrentOpenedInx(-1)}
                      hasSearch={false}
                    />
                    <Spacer size={SPACER_SIZES.BASE * 2} />

                    <AdditionalInformation>
                      {t('Do you have a TIN or functional equivalents?')}
                    </AdditionalInformation>
                    <Spacer size={SPACER_SIZES.BASE * 1.5} />
                    <RadioWrapper isRTL={!!isRTL}>
                      <RadioButton
                        selected={!values.countries[index].isTin}
                        onPress={() => {
                          let sT = JSON.parse(JSON.stringify(values))
                          sT.countries[index].isTin =
                            !values.countries[index].isTin

                          setValues(sT)
                        }}>
                        {t('No')}
                      </RadioButton>

                      <RadioButton
                        selected={!!values.countries[index].isTin}
                        onPress={() => {
                          let sT = JSON.parse(JSON.stringify(values))
                          sT.countries[index].isTin =
                            !values.countries[index].isTin
                          setValues(sT)
                        }}>
                        {t('Yes')}
                      </RadioButton>
                    </RadioWrapper>
                    <Spacer size={SPACER_SIZES.SM} />
                    {values.countries[index].isTin ? (
                      <Input
                        value={item.tinNumber}
                        onChangeText={val => {
                          let sT = JSON.parse(JSON.stringify(values))
                          sT.countries[index].tinNumber = val
                          setValues(sT)
                        }}
                        label={t('TIN Number or functional equivalents')}
                        returnKeyType="done"
                      />
                    ) : (
                      <Input
                        value={item.noTinReason}
                        onChangeText={val => {
                          let sT = JSON.parse(JSON.stringify(values))
                          sT.countries[index].noTinReason = val
                          setValues(sT)
                        }}
                        label={t('Reason for not having a TIN')}
                        returnKeyType="done"
                      />
                    )}
                    <Spacer size={SPACER_SIZES.SM} />
                    <Subheader>{t('Address')}</Subheader>
                    <Spacer size={SPACER_SIZES.BASE * 3} />
                    <Input
                      value={item.buldingNumber}
                      onChangeText={val => {
                        let sT = JSON.parse(JSON.stringify(values))
                        sT.countries[index].buldingNumber = val
                        setValues(sT)
                      }}
                      label={t('onboarding:personalInformation:buldingNumber')}
                      keyboardType="number-pad"
                      returnKeyType="done"
                      maxLength={10}
                    />
                    <Spacer size={SPACER_SIZES.SM} />
                    <Input
                      value={item.buldingNumber}
                      onChangeText={val => {
                        let sT = JSON.parse(JSON.stringify(values))
                        sT.countries[index].buldingNumber = val
                        setValues(sT)
                      }}
                      label={t('onboarding:personalInformation:streetNanme')}
                      returnKeyType="done"
                      maxLength={30}
                    />
                    <Spacer size={SPACER_SIZES.SM} />
                    <Input
                      value={item.streetNanme}
                      onChangeText={val => {
                        let sT = JSON.parse(JSON.stringify(values))
                        sT.countries[index].streetNanme = val
                        setValues(sT)
                      }}
                      label={t('onboarding:personalInformation:district')}
                      returnKeyType="done"
                      maxLength={10}
                    />
                    <Spacer size={SPACER_SIZES.SM} />
                    <Input
                      value={item.poBox}
                      onChangeText={val => {
                        let sT = JSON.parse(JSON.stringify(values))
                        sT.countries[index].poBox = val
                        setValues(sT)
                      }}
                      label={t('onboarding:personalInformation:poBox')}
                      keyboardType="number-pad"
                      returnKeyType="done"
                      maxLength={10}
                    />
                    <Spacer size={SPACER_SIZES.SM} />
                    <Input
                      value={item.postalCode}
                      onChangeText={val => {
                        let sT = JSON.parse(JSON.stringify(values))
                        sT.countries[index].postalCode = val
                        setValues(sT)
                      }}
                      label={t('onboarding:personalInformation:postalCode')}
                      keyboardType="number-pad"
                      returnKeyType="done"
                      maxLength={10}
                    />
                    <Spacer size={SPACER_SIZES.SM} />
                    <Input
                      value={item.city}
                      onChangeText={val => {
                        let sT = JSON.parse(JSON.stringify(values))
                        sT.countries[index].city = val
                        setValues(sT)
                      }}
                      label={t('onboarding:personalInformation:city')}
                      returnKeyType="done"
                      maxLength={10}
                    />
                    <Spacer size={SPACER_SIZES.SM} />
                    <Input
                      value={item.phoneNumber}
                      onChangeText={val => {
                        let sT = JSON.parse(JSON.stringify(values))
                        sT.countries[index].phoneNumber = val
                        setValues(sT)
                      }}
                      label={t('onboarding:personalInformation:phoneNumber')}
                      keyboardType="number-pad"
                      returnKeyType="done"
                      maxLength={10}
                    />
                    <Spacer size={SPACER_SIZES.SM} />
                  </Row>
                )
              })}
            {values.countries &&
              values.countries.length > 0 &&
              values.countries.length < 3 && (
                <AddCountry
                  onPress={() => {
                    setValues({
                      ...values,
                      countries: [
                        ...values.countries,
                        {
                          buldingNumber: '',
                          streetNanme: '',
                          district: '',
                          poBox: '',
                          postalCode: '',
                          city: '',
                          phoneNumber: '',
                          isTin: true,
                          tinNumber: '',
                          noTinReason: '',
                          country: '',
                        },
                      ],
                    })
                  }}>
                  <AddCountryText>
                    {t('Add an additional country (Optional)')}
                  </AddCountryText>
                </AddCountry>
              )}
          </View>
          <StyledButton disabled={false && isFormValid} onPress={onComplete}>
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
  border: 1px solid #a2a2a2;
  padding: 16px;
  border-radius: 7px;
  margin-bottom: 16px;
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

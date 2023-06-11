/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useState, useMemo, useEffect} from 'react'
import {View, SafeAreaView} from 'react-native'
import {useTranslation} from 'react-i18next'
import {
  Layout,
  TCButton as Button,
  TCTextView as Text,
  RadioButton,
  Spacer,
} from '@Components'
import {TEXT_VARIANTS, Colors, SPACER_SIZES, BASE_URL, getItem} from '@Utils'
import {StackNavigationProp} from '@react-navigation/stack'
import styled from 'styled-components/native'
import {AppContext, AppProviderProps} from '@Context'
import {useStore} from '@Store'
import {fetcher} from '@Api'
import {useMutation} from '@tanstack/react-query'

type IFormTYpe = {
  isUsPerson?: boolean
  taxOutsideKSA?: boolean
  moreCitizens?: boolean
  residentOutsideKSA?: boolean
}

const FormValues = {
  isUsPerson: undefined,
  taxOutsideKSA: undefined,
  moreCitizens: undefined,
  residentOutsideKSA: undefined,
}

type Props = {
  navigation: StackNavigationProp<any>
  route: any
}

function LegalInfoOther({navigation}: Props) {
  const {isRTL} = useContext<AppProviderProps>(AppContext)
  const {t} = useTranslation()
  const [statusError, setStatusError] = useState<any>(false)
  const [values, setValues] = useState<IFormTYpe>({
    ...FormValues,
  })

  const setOnboardingProgress = useStore(
    (store: any) => store.setOnboardingProgress,
  )

  const onBoardingProgress = useStore((store: any) => store.onBoardingProgress)

  const isFormValid = useMemo(() => {
    const {isUsPerson, taxOutsideKSA, moreCitizens, residentOutsideKSA} = values
    return (
      isUsPerson !== undefined &&
      taxOutsideKSA !== undefined &&
      moreCitizens !== undefined &&
      residentOutsideKSA !== undefined
    )
  }, [values])

  const {isLoading, data, mutate} = useMutation({
    mutationFn: async () => {
      let journeySecrets
      let journeySecretsData = await getItem('journeySecrets')
      if (journeySecretsData) {
        journeySecrets = JSON.parse(journeySecretsData)
      }
      let {isUsPerson, taxOutsideKSA, moreCitizens, residentOutsideKSA} = values
      let req: any = await fetcher(BASE_URL + '/onboarding/legal/foreign', {
        method: 'POST',
        body: {
          isUsa: isUsPerson,
          offshore_tax_resident: taxOutsideKSA,
          offshore_citizen: moreCitizens,
          offshore_permanent_resident: residentOutsideKSA,
        },
        token: journeySecrets.access_token,
      })
      let res = await req.json()
      return res
    },
  })

  useEffect(() => {
    try {
      if (
        data ||
        data.isUsPerson ||
        data.taxOutsideKSA ||
        data.moreCitizens ||
        data.residentOutsideKSA ||
        (data.isUsPerson === false &&
          data.taxOutsideKSA === false &&
          data.moreCitizens === false &&
          data.residentOutsideKSA === false)
      ) {
        let {isUsPerson, taxOutsideKSA, moreCitizens, residentOutsideKSA} =
          values
        setOnboardingProgress({
          ...onBoardingProgress,
          legalInfoMain: {
            isUsPerson,
            taxOutsideKSA,
            moreCitizens,
            residentOutsideKSA,
          },
        })
        if (values.isUsPerson) {
          navigation.navigate('LegalInfoFlow1')
          return
        } else if (values.taxOutsideKSA) {
          navigation.navigate('LegalInfoFlow2')
          return
        } else if (values.moreCitizens) {
          navigation.navigate('LegalInfoFlow3')
          return
        } else if (values.residentOutsideKSA) {
          navigation.navigate('LegalInfoFlow4')
          return
        } else {
          navigation.navigate('CreateUser')
          return
        }
      }
    } catch (e) {
      const status = data?.status
      switch (true) {
        case status > 399 && status <= 500:
          setStatusError('Some Error Occurred ')
          break
        default:
          setStatusError('')
      }
    }
  }, [data])

  return (
    <>
      <Layout
        key={1}
        isBack={true}
        onBack={() => navigation.goBack()}
        isHeader={true}
        isLoading={isLoading}
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
                selected={values.isUsPerson === false}
                onPress={() =>
                  setValues({
                    ...values,
                    isUsPerson: false,
                  })
                }>
                {t('No')}
              </RadioButton>
              <RadioButton
                selected={values.isUsPerson === true}
                onPress={() =>
                  setValues({
                    ...values,
                    isUsPerson: true,
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
                selected={values.taxOutsideKSA === false}
                onPress={() =>
                  setValues({
                    ...values,
                    taxOutsideKSA: false,
                  })
                }>
                {t('No')}
              </RadioButton>
              <RadioButton
                selected={values.taxOutsideKSA === true}
                onPress={() =>
                  setValues({
                    ...values,
                    taxOutsideKSA: true,
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
                selected={values.moreCitizens === false}
                onPress={() =>
                  setValues({
                    ...values,
                    moreCitizens: false,
                  })
                }>
                {t('No')}
              </RadioButton>
              <RadioButton
                selected={values.moreCitizens === true}
                onPress={() =>
                  setValues({
                    ...values,
                    moreCitizens: true,
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
                selected={values.residentOutsideKSA === false}
                onPress={() =>
                  setValues({
                    ...values,
                    residentOutsideKSA: false,
                  })
                }>
                {t('No')}
              </RadioButton>
              <RadioButton
                selected={values.residentOutsideKSA === true}
                onPress={() =>
                  setValues({
                    ...values,
                    residentOutsideKSA: true,
                  })
                }>
                {t('Yes')}
              </RadioButton>
            </RadioWrapper>
          </View>
          {statusError ? <ErrorText>{statusError}</ErrorText> : null}
          <StyledButton disabled={!isFormValid} onPress={mutate}>
            <Text variant={TEXT_VARIANTS.body}>
              {t('onboarding:personalInformation:continue')}
            </Text>
          </StyledButton>
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

const ErrorText = styled(Text)`
  font-weight: 500;
  color: #f54d3f;
  padding-left: 16px;
`

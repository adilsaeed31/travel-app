/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from 'react'
import {View, SafeAreaView} from 'react-native'

import {useTranslation} from 'react-i18next'
import {
  Layout,
  TCButton as Button,
  TCTextView as Text,
  TCInput,
} from '@Components'
import {TEXT_VARIANTS, Colors, BASE_URL, getItem} from '@Utils'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import styled from 'styled-components/native'
import {AppContext, AppProviderProps} from '@Context'
import {useStore} from '@Store'
import {fetcher} from '@Api'
import {useMutation} from '@tanstack/react-query'

type Props = {
  navigation: NativeStackNavigationProp<any>
  route: any
}

function Screen({navigation}: Props) {
  const {t} = useTranslation()
  const {isRTL} = useContext<AppProviderProps>(AppContext)
  const [state, setState] = useState({
    first_name_ar: '',
    first_name_en: '',
    second_name_ar: '',
    second_name_en: '',
    third_name_ar: '',
    third_name_en: '',
    last_name_ar: '',
    last_name_en: '',
  })

  const setOnboardingProgress = useStore(
    (store: any) => store.setOnboardingProgress,
  )

  const onBoardingProgress = useStore((store: any) => store.onBoardingProgress)
  useEffect(() => {
    console.log(isRTL)
    setState({
      ...state,
      first_name_ar: onBoardingProgress?.kycData?.first_name_ar,
      first_name_en: onBoardingProgress?.kycData?.first_name_en,
      second_name_ar: onBoardingProgress?.kycData?.second_name_ar,
      second_name_en: onBoardingProgress?.kycData?.second_name_en,
      third_name_ar: onBoardingProgress?.kycData?.third_name_ar,
      third_name_en: onBoardingProgress?.kycData?.third_name_en,
      last_name_ar: onBoardingProgress?.kycData?.last_name_ar,
      last_name_en: onBoardingProgress?.kycData?.last_name_en,
    })
  }, [onBoardingProgress])

  const {isLoading, data, mutate, reset} = useMutation({
    mutationFn: async () => {
      let journeySecrets
      let journeySecretsData = await getItem('journeySecrets')
      if (journeySecretsData) {
        journeySecrets = JSON.parse(journeySecretsData)
      }
      let req: any = await fetcher(BASE_URL + '/onboarding/personal/names', {
        method: 'POST',
        body: {
          first_name_ar: state.first_name_ar,
          first_name_en: state.first_name_en,
          second_name_ar: state.second_name_ar,
          second_name_en: state.second_name_en,
          third_name_ar: state.third_name_ar,
          third_name_en: state.third_name_en,
          last_name_ar: state.last_name_ar,
          last_name_en: state.last_name_en,
        },
        token: journeySecrets.access_token,
      })
      let res = await req.json()

      return res
    },
  })

  useEffect(() => {
    if (data) {
      setOnboardingProgress({
        ...onBoardingProgress,
        updatedkycData: {
          first_name_ar: state.first_name_ar,
          first_name_en: state.first_name_en,
          second_name_ar: state.second_name_ar,
          second_name_en: state.second_name_en,
          third_name_ar: state.third_name_ar,
          third_name_en: state.third_name_en,
          last_name_ar: state.last_name_ar,
          last_name_en: state.last_name_en,
        },
      })
      reset()
      navigation.navigate('personalInfo')
    } else {
    }
  }, [data])

  const onComplete = () => {
    mutate()
  }

  return (
    <>
      <Layout
        isBack={true}
        key={1}
        isLoading={isLoading}
        onBack={() => navigation.goBack()}
        isBackground={true}>
        <SafeAreaWrapper>
          <View>
            <Header>
              {t(
                'Before we go any further, let’s make sure the info we got is right.',
              )}
            </Header>

            <View>
              <Label variant={TEXT_VARIANTS.body}>{t('First Name')}</Label>
              <Row>
                <RightPad>
                  <TCInput
                    value={state.first_name_en}
                    isDisabled={!!state.first_name_en}
                    label="First name"
                    onChangeText={text => {
                      setState({...state, first_name_en: text})
                    }}
                  />
                </RightPad>
                <LeftPad>
                  <TCInput
                    label="الاسم الأول"
                    value={state.first_name_ar}
                    isDisabled={!!state.first_name_ar}
                    onChangeText={text => {
                      setState({...state, first_name_ar: text})
                    }}
                  />
                </LeftPad>
              </Row>
            </View>
            <View>
              <Label variant={TEXT_VARIANTS.body}>{t('Second Name')}</Label>
              <Row>
                <RightPad>
                  <TCInput
                    label="Second name"
                    value={state.second_name_en}
                    isDisabled={!!state.second_name_en}
                    onChangeText={text => {
                      setState({...state, second_name_en: text})
                    }}
                  />
                </RightPad>
                <LeftPad>
                  <TCInput
                    label="الاسم الثاني"
                    value={state.second_name_ar}
                    isDisabled={!!state.second_name_ar}
                    onChangeText={text => {
                      setState({...state, second_name_ar: text})
                    }}
                  />
                </LeftPad>
              </Row>
            </View>
            <View>
              <Label variant={TEXT_VARIANTS.body}>{t('Third Name')}</Label>
              <Row>
                <RightPad>
                  <TCInput
                    label="Third name"
                    value={state.third_name_en}
                    isDisabled={!!state.third_name_en}
                    onChangeText={text => {
                      setState({...state, third_name_en: text})
                    }}
                  />
                </RightPad>
                <LeftPad>
                  <TCInput
                    label="الاسم الثالث"
                    value={state.third_name_en}
                    isDisabled={!!state.third_name_en}
                    onChangeText={text => {
                      setState({...state, third_name_en: text})
                    }}
                  />
                </LeftPad>
              </Row>
            </View>
            <View>
              <Label variant={TEXT_VARIANTS.body}>{t('Fourth Name')}</Label>
              <Row>
                <RightPad>
                  <TCInput
                    label="Fourth name"
                    value={state.last_name_en}
                    isDisabled={!!state.last_name_en}
                    onChangeText={text => {
                      setState({...state, last_name_en: text})
                    }}
                  />
                </RightPad>
                <LeftPad>
                  <TCInput
                    label="الاسم الرابع"
                    value={state.last_name_ar}
                    isDisabled={!!state.last_name_ar}
                    onChangeText={text => {
                      setState({...state, last_name_ar: text})
                    }}
                  />
                </LeftPad>
              </Row>
            </View>
          </View>
          <StyledButton disabled={false} onPress={onComplete}>
            <Text variant={TEXT_VARIANTS.body}>
              {t('onboarding:personalInformation:continue')}
            </Text>
          </StyledButton>
        </SafeAreaWrapper>
      </Layout>
    </>
  )
}

export default Screen

const Header = styled(Text)<{isRTL?: boolean | null}>`
  font-size: 28px;
  line-height: 34px;
  color: ${Colors.SmokyBlack};
  text-align: ${props => (props.isRTL ? 'right' : 'left')};
  font-weight: 700;
  margin-top: 24px;
  margin-bottom: 19px;
`
const Label = styled(Text)`
  margin-bottom: 8px;
`

const StyledButton = styled(Button)`
  margin-left: 32px;
  margin-right: 32px;
  width: 100%;
  align-self: center;
`

const SafeAreaWrapper = styled(SafeAreaView)`
  flex: 1;
  justify-content: space-between;
`

const Row = styled(View)`
  flex-direction: row;
  margin-bottom: 20px;
  justify-content: space-between;
`

const RightPad = styled(View)`
  margin-right: 8px;
  flex: 1;
`

const LeftPad = styled(View)`
  margin-left: 8px;
  flex: 1;
`

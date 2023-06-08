import React, {useContext, useState} from 'react'
import {View, SafeAreaView} from 'react-native'

import {useTranslation} from 'react-i18next'
import {
  Layout,
  TCButton as Button,
  TCTextView as Text,
  TCInput,
} from '@Components'
import {TEXT_VARIANTS, Colors} from '@Utils'
import {StackNavigationProp} from '@react-navigation/stack'
import styled from 'styled-components/native'
import {AppContext, AppProviderProps} from '@Context'

type Props = {
  navigation: StackNavigationProp<any>
  route: any
}

function Screen({navigation}: Props) {
  const {t} = useTranslation()
  const {isRTL} = useContext<AppProviderProps>(AppContext)
  const [state, setState] = useState({})

  const onComplete = () => {
    console.log(isRTL)
    //    alert(JSON.stringify(state))
  }

  return (
    <>
      <Layout
        isBack={true}
        key={1}
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
                    label="First name"
                    onChangeText={text => {
                      setState({...state, first_en_name: text})
                    }}
                  />
                </RightPad>
                <LeftPad>
                  <TCInput
                    label="الاسم الأول"
                    onChangeText={text => {
                      setState({...state, first_ab_name: text})
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
                    onChangeText={text => {
                      setState({...state, second_en_name: text})
                    }}
                  />
                </RightPad>
                <LeftPad>
                  <TCInput
                    label="الاسم الثاني"
                    onChangeText={text => {
                      setState({...state, second_ab_name: text})
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
                    onChangeText={text => {
                      setState({...state, third_en_name: text})
                    }}
                  />
                </RightPad>
                <LeftPad>
                  <TCInput
                    label="الاسم الثالث"
                    onChangeText={text => {
                      setState({...state, third_ab_name: text})
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
                    onChangeText={text => {
                      setState({...state, fourth_en_name: text})
                    }}
                  />
                </RightPad>
                <LeftPad>
                  <TCInput
                    label="الاسم الرابع"
                    onChangeText={text => {
                      setState({...state, fourth_ab_name: text})
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
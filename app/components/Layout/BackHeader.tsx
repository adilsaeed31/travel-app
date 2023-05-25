import React from 'react'
import {StatusBar, View, TouchableOpacity, SafeAreaView} from 'react-native'
import styled from 'styled-components/native'
import {Back} from '@Assets'
// import the module like below if its in the same alias folder
import {default as Text} from '../TextView'
import {useNavigation} from '@react-navigation/native'
import {useTranslation} from 'react-i18next'

const Container = styled(View)`
  padding-top: 50px;
  padding-bottom: 0;
`
const BackWrapper = styled(TouchableOpacity)`
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom: 20;
`

const BackText = styled(Text)`
  color: '#4F4F4F';
  font-size: 17px;
  line-height: 22px;
  margin-right: 10px;
  margin-left: 10px;

  letter-spacing: -0.41px;
`

type PropsType = {
  canLanguageChange?: boolean
}

const TopNavigationSimpleUsageShowcase: React.FC<PropsType> = ({...props}) => {
  const navigation = useNavigation()
  const {t} = useTranslation()

  return (
    <SafeAreaView>
      <Container {...props}>
        <BackWrapper onPress={() => navigation.goBack()}>
          <Back />
        </BackWrapper>
      </Container>
    </SafeAreaView>
  )
}

export default TopNavigationSimpleUsageShowcase

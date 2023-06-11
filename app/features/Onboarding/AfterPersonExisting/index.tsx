import React from 'react'
import {View, Text} from 'react-native'
import {useTranslation} from 'react-i18next'
import {StackNavigationProp} from '@react-navigation/stack'
import styled from 'styled-components/native'

import {Layout, TCButton as Button} from '@Components'
import {WarnIcon} from '@Assets'

const WarningIconWithShadow = styled(WarnIcon)`
  box-shadow: 0px 4px 12px rgba(52, 61, 69, 0.12);
`

type ExistingScreenProps = {
  navigation: StackNavigationProp<any>
}

function AfterPersonExisting({navigation}: ExistingScreenProps) {
  const {t} = useTranslation()

  const backToLogin = () => {
    navigation.navigate('Auth')
  }

  return (
    <Layout isHeader={false} isBackground={false} isScrollable={false}>
      <View className="flex-1 gap-6 items-center justify-center">
        <WarningIconWithShadow />

        <Text className="text-2xl font-bold tc-primary text-tc-black text-center">
          {t('onboarding:accountExist')}
        </Text>

        <Text className="tc-primary text-tc-secondary text-center">
          {t('onboarding:saibACText')}
        </Text>
      </View>

      <View className="flex-1 justify-end pb-6">
        <Button onPress={backToLogin}>
          <Text className="text-base text-tc-black-btn">
            {t('onboarding:goBackToLogin')}
          </Text>
        </Button>
      </View>
    </Layout>
  )
}

export default AfterPersonExisting

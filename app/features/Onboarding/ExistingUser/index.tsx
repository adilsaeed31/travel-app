import React from 'react'
import {View, Text, Image} from 'react-native'
import {useTranslation} from 'react-i18next'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'

import {Layout, TCButton as Button} from '@Components'
import {WarnIconImg} from '@Assets'

type ExistingScreenProps = {
  navigation: NativeStackNavigationProp<{Auth: undefined}>
}

function ExistingScreen({navigation}: ExistingScreenProps) {
  const {t} = useTranslation()

  const backToLogin = () => {
    navigation.navigate('Auth')
  }

  return (
    <Layout isHeader={false} isBackground={false} isScrollable={false}>
      <View className="flex-1 gap-6 items-center justify-center">
        <Image source={WarnIconImg} />

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

export default ExistingScreen

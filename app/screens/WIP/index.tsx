import React from 'react'
import {View, Text} from 'react-native'
import {useTranslation} from 'react-i18next'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import LottieView from 'lottie-react-native'

import {wipAnimation} from '@Assets'
import {Layout, TCButton as Button} from '@Components'

type ExistingScreenProps = {
  navigation: NativeStackNavigationProp<{Auth: undefined}>
}

function WIPScreen({navigation}: ExistingScreenProps) {
  const {t} = useTranslation()

  const backToLogin = () => {
    navigation.goBack()
  }

  return (
    <Layout isHeader={false} isBackground={false} isScrollable={false}>
      <View className="flex-1 items-center justify-center">
        <LottieView
          autoPlay
          loop={true}
          resizeMode="cover"
          source={wipAnimation}
        />
      </View>

      <Text className="tc-primary text-tc-secondary text-center mt-20">
        Please bear with us few more sprints
      </Text>

      <View className="flex-1 justify-end pb-6">
        <Button onPress={backToLogin}>
          <Text className="text-base text-tc-black-btn">{t('Go Back')}</Text>
        </Button>
      </View>
    </Layout>
  )
}

export default WIPScreen

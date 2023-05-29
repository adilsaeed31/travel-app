import React, {useContext, useEffect} from 'react'
import LottieView from 'lottie-react-native'
import Splash from 'react-native-splash-screen'
import {StackNavigationProp} from '@react-navigation/stack'

import {splashAnimationJson} from '@Assets'
import {AppContext, AppProviderProps} from '@Context'
import {getIntro} from '@Utils'
import {useStore} from '@Store'

type SplashScreenProps = {
  navigation: StackNavigationProp<any>
}

const SplashScreen: React.FC<SplashScreenProps> = ({navigation}) => {
  const introHasBeenSeen = useStore(state => state.introHasBeenSeen)
  const {hasIntroSeen, setAppReady} = useContext<AppProviderProps>(AppContext)

  const gotToNextFeature = () => {
    if (!hasIntroSeen) {
      navigation.push('Intro')
    } else {
      setAppReady?.()
    }
  }

  useEffect(() => {
    // check on splash screen if the introFlag set
    ;(async () => {
      const introFlag = Boolean(await getIntro())

      if (introFlag) {
        introHasBeenSeen()
      }
    })()

    // hiding the splash screen below
    Splash.hide()
  }, [introHasBeenSeen])

  return (
    <LottieView
      autoPlay
      loop={false}
      resizeMode="cover"
      source={splashAnimationJson}
      // changing the next animation with state
      onAnimationFinish={gotToNextFeature}
    />
  )
}

export default SplashScreen

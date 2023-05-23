import React, {useContext, useEffect, useRef} from 'react'
import {Animated, Easing} from 'react-native'
import LottieView from 'lottie-react-native'
import Splash from 'react-native-splash-screen'

import {splashAnimationJson} from '@Assets'
import {AppContext, AppProviderProps} from '@Context'
import {getIntro} from '@Utils'
import {useStore} from '@Store'

type SplashScreenProps = {
  navigation: any
}

const SplashScreen: React.FC<SplashScreenProps> = ({navigation}) => {
  const {introHasBeenSeen} = useStore()
  const {hasIntroSeen, setAppReady} = useContext<AppProviderProps>(AppContext)
  const splashAnim = useRef(new Animated.Value(0)).current

  const gotToNextFeature = () => {
    if (!hasIntroSeen) {
      navigation.replace('Intro')
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

    // Added the fade opacity animation for 1 sec
    Animated.timing(splashAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.elastic(1),
      useNativeDriver: true,
    }).start()
  }, [introHasBeenSeen, splashAnim])

  return (
    <Animated.View style={{opacity: splashAnim}} className="flex-1">
      <LottieView
        autoPlay
        loop={false}
        resizeMode="cover"
        source={splashAnimationJson}
        // changing the next animation with state
        onAnimationFinish={() => gotToNextFeature()}
      />
    </Animated.View>
  )
}

export default SplashScreen

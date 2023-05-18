import React, {useEffect, useRef} from 'react'
import {Animated, Easing} from 'react-native'
import LottieView from 'lottie-react-native'
import Splash from 'react-native-splash-screen'

import {introAnimation} from '@Assets'

type SplashScreenProps = {
  onCompleteAnimation: () => void
}

const SplashScreen: React.FC<SplashScreenProps> = ({onCompleteAnimation}) => {
  const splashAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    // hiding the splash screen below
    Splash.hide()

    // Added the fade opacity animation for 1 sec
    Animated.timing(splashAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.elastic(1),
      useNativeDriver: true,
    }).start()
  }, [splashAnim])

  return (
    <Animated.View style={{opacity: splashAnim}} className="flex-1">
      <LottieView
        autoPlay
        loop={false}
        resizeMode="cover"
        source={introAnimation}
        onAnimationFinish={() => onCompleteAnimation()}
      />
    </Animated.View>
  )
}

export default SplashScreen

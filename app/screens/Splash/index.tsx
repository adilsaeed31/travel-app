import React, {useEffect, useRef, useState} from 'react'
import {Animated, Easing} from 'react-native'
import LottieView from 'lottie-react-native'
import Splash from 'react-native-splash-screen'

import {splashAnimationJson, introAnimation} from '@Assets'

type SplashScreenProps = {
  onCompleteAnimation: () => void
}

const SplashScreen: React.FC<SplashScreenProps> = ({onCompleteAnimation}) => {
  const [showFirst, setShowFirst] = useState<boolean>(true)

  const nextAnimRef = useRef<LottieView>(null)
  const splashAnim = useRef(new Animated.Value(0)).current
  const nextAnim = useRef(new Animated.Value(0)).current

  const fadeIn = () => {
    Animated.timing(nextAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      nextAnimRef.current?.play()
    })
  }

  useEffect(() => {
    // hiding the splash screen below
    Splash.hide()

    // Added the fade opacity animation for 1 sec
    Animated.timing(splashAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.elastic(1),
      useNativeDriver: true,
    }).start()
  }, [splashAnim])

  return showFirst ? (
    <Animated.View style={{opacity: splashAnim}} className="flex-1">
      <LottieView
        autoPlay
        loop={false}
        resizeMode="cover"
        source={splashAnimationJson}
        onAnimationFinish={() => {
          // changing the next animation with state
          setShowFirst(false)
          // starting fadeIn effect to land the next animation
          fadeIn()
        }}
      />
    </Animated.View>
  ) : (
    <Animated.View style={{opacity: nextAnim}} className="flex-1">
      <LottieView
        loop={false}
        autoPlay={false}
        resizeMode="cover"
        ref={nextAnimRef}
        source={introAnimation}
        onLayout={() => console.log('rendered')}
        onAnimationFinish={() => onCompleteAnimation()}
      />
    </Animated.View>
  )
}

export default SplashScreen

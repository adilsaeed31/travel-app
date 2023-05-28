import React, {useEffect, useRef, useState, useContext} from 'react'
import {View, TouchableOpacity, AppState, BackHandler} from 'react-native'
import LottieView from 'lottie-react-native'
import Animated, {
  FadeInLeft,
  FadeInRight,
  BounceInUp,
} from 'react-native-reanimated'
import Splash from 'react-native-splash-screen'
import {useTranslation} from 'react-i18next'
import cn from 'classnames'

import {flexRowLayout, m2} from '@Utils'
import {introAnimation, SaibLogo} from '@Assets'
import {AppContext, AppProviderProps} from '@Context'
import {TCButton, TCTextView, TCDot} from '@Components'

// each slide frame of intro animation
const FirstSlideFrame = 238
const MiddleSlideFrame = 476
const LastSlideFrame = 714

// enter animation
const EnterAnimationRight = FadeInRight.duration(1000).delay(50)
const EnterAnimationLeft = FadeInLeft.duration(1000).delay(50)
const EnterAnimationBounceInUp = BounceInUp.duration(1000).delay(50)

const IntroFeature: React.FC = () => {
  const {t} = useTranslation()

  // below code is for to check the if the animation rendering or not
  const appState = useRef(AppState.currentState)
  const [appStateVisible, setAppStateVisible] = useState(appState.current)

  const {setAppReady, changeLanguage, isRTL} =
    useContext<AppProviderProps>(AppContext)

  const [currentValue, setCurrentValue] = useState<number>(FirstSlideFrame)
  const updatedValue = useRef(currentValue)

  const nextAnimRef = useRef<LottieView>(null)

  const startNextAnimation = (): void => {
    if (updatedValue.current >= LastSlideFrame) {
      setAppReady?.()
      return
    }

    nextAnimRef.current?.play(currentValue, currentValue + FirstSlideFrame)
    setCurrentValue(currentValue + FirstSlideFrame)
  }

  const onLayoutRender = () => {
    nextAnimRef.current!.play(0, FirstSlideFrame)
  }

  useEffect(() => {
    // hiding the splash screen below
    Splash.hide()

    // back handler to stop back functionality on intro
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    )

    // updating the currentValue with updatedValue
    updatedValue.current = currentValue

    return () => {
      backHandler.remove()
    }
  }, [currentValue, updatedValue])

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      appState.current = nextAppState

      setAppStateVisible(appState.current)

      if (appState.current === 'active') {
        if (updatedValue.current === FirstSlideFrame) {
          nextAnimRef.current?.play(0, FirstSlideFrame)
        } else if (updatedValue.current === MiddleSlideFrame) {
          nextAnimRef.current?.play(FirstSlideFrame, MiddleSlideFrame)
        } else if (updatedValue.current >= LastSlideFrame) {
          nextAnimRef.current?.play(MiddleSlideFrame, LastSlideFrame)
        }
      }
    })

    return () => {
      subscription.remove()
    }
  }, [appStateVisible])

  return (
    <>
      <View className="absolute left-0 right-0 bottom-0 top-0">
        <LottieView
          loop={false}
          autoPlay={false}
          resizeMode="cover"
          ref={nextAnimRef}
          source={introAnimation}
          onLayout={onLayoutRender}
        />

        <View className="flex-1 p-8 ios:pt-20">
          <View
            className={cn(
              flexRowLayout(isRTL),
              'justify-between items-center',
            )}>
            <Animated.View entering={EnterAnimationBounceInUp}>
              <SaibLogo />
            </Animated.View>

            <Animated.View entering={EnterAnimationRight}>
              <TouchableOpacity
                className="p-4 justify-center items-center"
                onPress={changeLanguage}>
                <TCTextView className="text-tc-secondary">
                  {t('onboarding:lang')}
                </TCTextView>
              </TouchableOpacity>
            </Animated.View>
          </View>

          {currentValue === FirstSlideFrame && (
            <Animated.View
              entering={EnterAnimationRight}
              className="flex-1 justify-end pb-20">
              <TCTextView className="text-4xl text-tc-black">
                {t('intro:future1')}
              </TCTextView>
              <TCTextView className="text-4xl text-tc-black font-tc-bold">
                {t('intro:future2')}
              </TCTextView>
            </Animated.View>
          )}

          {currentValue === MiddleSlideFrame && (
            <Animated.View
              entering={EnterAnimationRight}
              className="flex-1 justify-end pb-20">
              <TCTextView className="text-4xl text-tc-black">
                {t('intro:currency1')}
              </TCTextView>
              <TCTextView className="text-4xl text-tc-black font-tc-bold">
                {t('intro:currency2')}
              </TCTextView>
            </Animated.View>
          )}

          {currentValue >= LastSlideFrame && (
            <Animated.View
              entering={EnterAnimationRight}
              className="flex-1 justify-end pb-20">
              <TCTextView className="text-4xl text-tc-black">
                {t('intro:additional1')}
              </TCTextView>
              <TCTextView className="text-4xl text-tc-black font-tc-bold">
                {t('intro:additional2')}
              </TCTextView>
            </Animated.View>
          )}

          <View
            className={cn(
              flexRowLayout(isRTL),
              'items-center justify-between',
            )}>
            <Animated.View
              entering={EnterAnimationLeft}
              className={cn(
                flexRowLayout(isRTL),
                'gap-2 items-center justify-center',
              )}>
              <View className={cn(flexRowLayout(isRTL), 'gap-2')}>
                <TCDot isActive={currentValue === FirstSlideFrame} />

                <TCDot isActive={currentValue === MiddleSlideFrame} />

                <TCDot isActive={currentValue >= LastSlideFrame} />
              </View>

              {currentValue !== LastSlideFrame && (
                <TouchableOpacity onPress={setAppReady}>
                  <TCTextView
                    className={cn(
                      m2(isRTL),
                      'text-base text-tc-secondary font-tc-bold',
                    )}>
                    {t('intro:skip')}
                  </TCTextView>
                </TouchableOpacity>
              )}
            </Animated.View>

            <Animated.View entering={EnterAnimationRight}>
              <TCButton onPress={startNextAnimation} className="font-tc-bold">
                {currentValue >= LastSlideFrame
                  ? (t('auth:buttonLogin') as string)
                  : (t('intro:next') as string)}
              </TCButton>
            </Animated.View>
          </View>
        </View>
      </View>
    </>
  )
}

export default IntroFeature

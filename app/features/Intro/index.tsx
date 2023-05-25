import React, {useEffect, useRef, useState, useContext} from 'react'
import {
  Animated as RNAnimated,
  View,
  Easing,
  TouchableOpacity,
  AppState,
  BackHandler,
} from 'react-native'
import LottieView from 'lottie-react-native'
import {useTranslation} from 'react-i18next'
import Animated, {FadeInRight} from 'react-native-reanimated'
import Splash from 'react-native-splash-screen'
import cn from 'classnames'

import {flexRowLayout, m2} from '@Utils'
import {introAnimation} from '@Assets'
import {AppContext, AppProviderProps} from '@Context'
import {TCButton, TCTextView, TCDot} from '@Components'

type IntroFeatureProps = {
  navigation: any
}

// each slide frame of intro animation
const FirstSlideFrame = 238
const MiddleSlideFrame = 476
const LastSlideFrame = 714

// enter animation
const EnterAnimation = FadeInRight.duration(1000).delay(250)

const IntroFeature: React.FC<IntroFeatureProps> = () => {
  const {t} = useTranslation()

  // below code is for to check the if the animation rendering or not
  const appState = useRef(AppState.currentState)
  const [appStateVisible, setAppStateVisible] = useState(appState.current)

  const {setAppReady, changeLanguage, isRTL} =
    useContext<AppProviderProps>(AppContext)

  const [currentValue, setCurrentValue] = useState<number>(FirstSlideFrame)
  const updatedValue = useRef(currentValue)

  const nextAnimRef = useRef<LottieView>(null)
  const splashAnim = useRef(new RNAnimated.Value(0)).current

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

    // added the fade opacity animation for 1 sec
    RNAnimated.timing(splashAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.elastic(1),
      useNativeDriver: true,
    }).start()

    // updating the currentValue with updatedValue
    updatedValue.current = currentValue

    return () => {
      backHandler.remove()
    }
  }, [currentValue, splashAnim, updatedValue])

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

        <RNAnimated.View
          style={{opacity: splashAnim}}
          className="flex-1 p-8 ios:pt-16">
          <View className="flex-1 items-end">
            <TouchableOpacity className="p-4 ios:mt-8" onPress={changeLanguage}>
              <TCTextView className="text-tc-secondary dark:text-tc-primary">
                {t('onboarding:lang')}
              </TCTextView>
            </TouchableOpacity>
          </View>

          {currentValue === FirstSlideFrame && (
            <Animated.View
              entering={EnterAnimation}
              className="flex-1 justify-end pb-20">
              <TCTextView className="text-4xl text-tc-black font-tc-primary">
                {t('intro:future1')}
              </TCTextView>
              <TCTextView className="text-4xl text-tc-black font-bold font-tc-primary">
                {t('intro:future2')}
              </TCTextView>
            </Animated.View>
          )}

          {currentValue === MiddleSlideFrame && (
            <Animated.View
              entering={EnterAnimation}
              className="flex-1 justify-end pb-20">
              <TCTextView className="text-4xl text-tc-black font-tc-primary">
                {t('intro:currency1')}
              </TCTextView>
              <TCTextView className="text-4xl text-tc-black font-bold font-tc-primary">
                {t('intro:currency2')}
              </TCTextView>
            </Animated.View>
          )}

          {currentValue >= LastSlideFrame && (
            <Animated.View
              entering={EnterAnimation}
              className="flex-1 justify-end pb-20">
              <TCTextView className="text-4xl text-tc-black font-tc-primary">
                {t('intro:additional1')}
              </TCTextView>
              <TCTextView className="text-4xl text-tc-black font-bold font-tc-primary">
                {t('intro:additional2')}
              </TCTextView>
            </Animated.View>
          )}

          <View
            className={cn(
              flexRowLayout(isRTL),
              'items-center justify-between',
            )}>
            <View
              className={cn(
                flexRowLayout(isRTL),
                'gap-2 items-center justify-center',
              )}>
              <Animated.View
                className={cn(flexRowLayout(isRTL), 'gap-2')}
                entering={EnterAnimation}>
                <TCDot isActive={currentValue === FirstSlideFrame} />

                <TCDot isActive={currentValue === MiddleSlideFrame} />

                <TCDot isActive={currentValue >= LastSlideFrame} />
              </Animated.View>

              {currentValue !== LastSlideFrame && (
                <TouchableOpacity onPress={setAppReady}>
                  <TCTextView
                    className={cn(
                      m2(isRTL),
                      'text-base txt-tc-seconedary dark:text-tc-primary font-tc-primary',
                    )}>
                    {t('intro:skip')}
                  </TCTextView>
                </TouchableOpacity>
              )}
            </View>

            <TCButton onPress={startNextAnimation}>
              {currentValue >= LastSlideFrame
                ? (t('auth:buttonLogin') as string)
                : (t('intro:next') as string)}
            </TCButton>
          </View>
        </RNAnimated.View>
      </View>
    </>
  )
}

export default IntroFeature

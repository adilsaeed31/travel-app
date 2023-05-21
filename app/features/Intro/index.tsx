import React, {useEffect, useRef, useState, useContext} from 'react'
import {
  Animated as RNAnimated,
  View,
  Easing,
  TouchableOpacity,
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
const FirstSlideFrame = 240
const MiddleSlideFrame = 480
const LastSlideFrame = 720

const IntroFeature: React.FC<IntroFeatureProps> = () => {
  const {t} = useTranslation()

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
    nextAnimRef.current?.play(0, FirstSlideFrame)
  }

  useEffect(() => {
    // hiding the splash screen below
    Splash.hide()

    // added the fade opacity animation for 1 sec
    RNAnimated.timing(splashAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.elastic(1),
      useNativeDriver: true,
    }).start()

    // updating the currentValue with updatedValue
    updatedValue.current = currentValue
  }, [currentValue, splashAnim, updatedValue])

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
          <TouchableOpacity className="mt-4 ios:mt-10" onPress={changeLanguage}>
            <TCTextView className="text-right">
              {t('onboarding:lang')}
            </TCTextView>
          </TouchableOpacity>

          {currentValue === FirstSlideFrame && (
            <Animated.View
              entering={FadeInRight.duration(1000).delay(250)}
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
              entering={FadeInRight.duration(1000).delay(250)}
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
              entering={FadeInRight.duration(1000).delay(250)}
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
                entering={FadeInRight.duration(1000).delay(250)}>
                <TCDot isActive={currentValue === FirstSlideFrame} />

                <TCDot isActive={currentValue === MiddleSlideFrame} />

                <TCDot isActive={currentValue >= LastSlideFrame} />
              </Animated.View>

              <TouchableOpacity onPress={setAppReady}>
                <TCTextView
                  className={cn(
                    m2(isRTL),
                    'text-base txt-tc-seconedary font-tc-primary',
                  )}>
                  {t('intro:skip')}
                </TCTextView>
              </TouchableOpacity>
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

import React, {useEffect, useRef, useState, useContext} from 'react'
import {View, TouchableOpacity, BackHandler} from 'react-native'
import LottieView from 'lottie-react-native'
import Animated, {
  FadeInLeft,
  FadeInRight,
  FadeInDown,
  BounceInUp,
} from 'react-native-reanimated'
import {useTranslation} from 'react-i18next'
import cn from 'classnames'
import {StackNavigationProp} from '@react-navigation/stack'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

import {flexRowLayout, m2, vw, vh} from '@Utils'
import {introAnimation, SaibLogo} from '@Assets'
import {AppContext, AppProviderProps} from '@Context'
import {TCButton, TCTextView, TCDot} from '@Components'
import {useAppState} from '@Hooks'

// each slide frame of intro animation
const FirstSlideFrame = 238
const MiddleSlideFrame = 476
const LastSlideFrame = 714

// enter animation
const EnterAnimationDown = FadeInDown.duration(1000).delay(50)
const EnterAnimationRight = FadeInRight.duration(1000).delay(50)
const EnterAnimationLeft = FadeInLeft.duration(1000).delay(50)
const EnterAnimationBounceInUp = BounceInUp.duration(1000).delay(50)

const IntroFeature: React.FC<{
  navigation: StackNavigationProp<{Auth: undefined}>
}> = ({navigation}) => {
  const {t} = useTranslation()
  const {appStateVisible} = useAppState()
  const insetEdges = useSafeAreaInsets()

  const {isAppReady, setAppReady, hasIntroSeen, changeLanguage, isRTL} =
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
    // below code is for to check the if the animation
    // rendering or not on the app background|inactive
    if (appStateVisible === 'active') {
      if (updatedValue.current === FirstSlideFrame) {
        nextAnimRef.current?.play(0, FirstSlideFrame)
      } else if (updatedValue.current === MiddleSlideFrame) {
        nextAnimRef.current?.play(FirstSlideFrame, MiddleSlideFrame)
      } else if (updatedValue.current >= LastSlideFrame) {
        nextAnimRef.current?.play(MiddleSlideFrame, LastSlideFrame)
      }
    }

    // back handler to stop back functionality on intro
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    )

    // updating the currentValue with updatedValue
    updatedValue.current = currentValue

    // navigation to login if app is ready
    if (isAppReady || hasIntroSeen) {
      navigation.navigate('Auth')
    }

    return () => {
      backHandler.remove()
    }
  }, [
    isAppReady,
    navigation,
    updatedValue,
    currentValue,
    hasIntroSeen,
    appStateVisible,
  ])

  return (
    <View
      className="flex-1"
      style={{
        // do not remove this below style props below will
        // adjust the padding/spacing on ios and android
        paddingTop: vh(insetEdges.top),
        paddingLeft: vw(insetEdges.left),
        paddingRight: vw(insetEdges.right),
        paddingBottom: vh(insetEdges.bottom),
      }}>
      <LottieView
        loop={false}
        autoPlay={false}
        ref={nextAnimRef}
        resizeMode="cover"
        source={introAnimation}
        onLayout={onLayoutRender}
      />

      <View className="flex-1 p-8">
        <View
          className={cn(
            flexRowLayout(isRTL),
            'flex-1 justify-between items-start',
          )}>
          <Animated.View entering={EnterAnimationBounceInUp}>
            <SaibLogo />
          </Animated.View>

          <Animated.View entering={EnterAnimationRight}>
            <TouchableOpacity
              className="p-4 justify-center items-center"
              onPress={changeLanguage}>
              <TCTextView className="text-tc-secondary font-tc-bold">
                {t('onboarding:lang')}
              </TCTextView>
            </TouchableOpacity>
          </Animated.View>
        </View>

        {currentValue === FirstSlideFrame && (
          <View className="flex-1 justify-center items-center pb-10">
            <Animated.View entering={EnterAnimationDown}>
              <TCTextView className="text-3xl text-tc-black text-center">
                {t('intro:future1')}
              </TCTextView>

              <TCTextView className="text-3xl text-tc-black font-tc-bold text-center">
                {t('intro:future2')}
              </TCTextView>
            </Animated.View>
          </View>
        )}

        {currentValue === MiddleSlideFrame && (
          <View className="flex-1 justify-center items-center pb-10">
            <Animated.View entering={EnterAnimationDown}>
              <TCTextView className="text-3xl text-tc-black text-center">
                {t('intro:currency1')}
              </TCTextView>

              <TCTextView className="text-3xl text-tc-black font-tc-bold text-center">
                {t('intro:currency2')}
              </TCTextView>
            </Animated.View>
          </View>
        )}

        {currentValue >= LastSlideFrame && (
          <View className="flex-1 justify-center items-center pb-10">
            <Animated.View entering={EnterAnimationDown}>
              <TCTextView className="text-3xl text-tc-black text-center">
                {t('intro:additional1')}
              </TCTextView>

              <TCTextView className="text-3xl text-tc-black font-tc-bold text-center">
                {t('intro:additional2')}
              </TCTextView>
            </Animated.View>
          </View>
        )}

        <View
          className={cn(flexRowLayout(isRTL), 'items-center justify-between')}>
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
                  className={cn(m2(isRTL), 'text-base text-tc-secondary')}>
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
  )
}

export default IntroFeature

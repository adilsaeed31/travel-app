import React, {useEffect, useRef, useState, useContext} from 'react'
import {View, BackHandler} from 'react-native'
import LottieView from 'lottie-react-native'
import Animated, {
  FadeInLeft,
  FadeInRight,
  BounceInUp,
} from 'react-native-reanimated'
import {useTranslation} from 'react-i18next'
import {StackNavigationProp} from '@react-navigation/stack'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import cn from 'classnames'

import {useStore} from '@Store'
import {useAppState} from '@Hooks'
import {vw, vh, flexRowLayout} from '@Utils'
import {introAnimation, SaibLogo} from '@Assets'
import {AppContext, AppProviderProps} from '@Context'
import {TCButton, IntroDot, IntroText, IntroLang, IntroSkip} from '@Components'

// each slide frame of intro animation
const FirstSlideFrame = 238
const MiddleSlideFrame = 476
const LastSlideFrame = 714

// enter animation
const EnterAnimationRight = FadeInRight.duration(1000).delay(50)
const EnterAnimationLeft = FadeInLeft.duration(1000).delay(50)
const EnterAnimationBounceInUp = BounceInUp.duration(1000).delay(50)

const IntroFeature: React.FC<{
  navigation: StackNavigationProp<{Auth?: undefined}>
}> = ({navigation}) => {
  const {t} = useTranslation()
  const {appStateVisible} = useAppState()
  const insetEdges = useSafeAreaInsets()
  const isRTL = useStore(state => state.isRTL)

  const direction = isRTL ? 'rtl' : 'ltr'

  const {isAppReady, setAppReady, hasIntroSeen} =
    useContext<AppProviderProps>(AppContext)

  const [currentValue, setCurrentValue] = useState<number>(FirstSlideFrame)
  const updatedValue = useRef(currentValue)

  const nextAnimRef = useRef<LottieView>(null)

  const startNextAnimation = () => {
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
  }, [appStateVisible])

  useEffect(() => {
    // back handler to stop back functionality on intro
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    )

    return () => {
      backHandler.remove()
    }
  }, [])

  useEffect(() => {
    // updating the currentValue with updatedValue
    updatedValue.current = currentValue

    // navigation to login if app is ready
    if (isAppReady || hasIntroSeen) {
      navigation.navigate('Auth')
    }
  }, [isAppReady, navigation, updatedValue, currentValue, hasIntroSeen])

  return (
    <View
      className="flex-1"
      style={{
        // changing the layout direction if isRTL true
        direction: direction,
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
          className={cn(flexRowLayout(isRTL), 'justify-between items-center')}>
          <Animated.View entering={EnterAnimationBounceInUp}>
            <SaibLogo />
          </Animated.View>

          <Animated.View entering={EnterAnimationRight}>
            <IntroLang />
          </Animated.View>
        </View>

        {currentValue === FirstSlideFrame && (
          <IntroText one={t('intro:future1')} two={t('intro:future2')} />
        )}

        {currentValue === MiddleSlideFrame && (
          <IntroText one={t('intro:currency1')} two={t('intro:currency2')} />
        )}

        {currentValue >= LastSlideFrame && (
          <IntroText
            one={t('intro:additional1')}
            two={t('intro:additional2')}
          />
        )}

        <View
          className={cn(flexRowLayout(isRTL), 'items-center justify-between')}>
          <Animated.View
            entering={EnterAnimationLeft}
            className={cn(flexRowLayout(isRTL), 'items-center justify-center')}>
            <View className={cn(flexRowLayout(isRTL))}>
              <IntroDot isActive={currentValue === FirstSlideFrame} />

              <IntroDot isActive={currentValue === MiddleSlideFrame} />

              <IntroDot isActive={currentValue >= LastSlideFrame} />
            </View>

            {currentValue !== LastSlideFrame && <IntroSkip />}
          </Animated.View>

          <Animated.View entering={EnterAnimationRight}>
            <TCButton
              onPress={startNextAnimation}
              textcls="text-tc-secondary font-tc-primary">
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

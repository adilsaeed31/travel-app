import React, {useCallback, useMemo, useRef, useState} from 'react'
import {Text, View} from 'react-native'
import BSheet from '@gorhom/bottom-sheet'
import Ripple from 'react-native-material-ripple'
import Animated, {
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated'
import {useQuery} from '@tanstack/react-query'
import {useTranslation} from 'react-i18next'

import {Colors} from '@Utils'
import {useStore} from '@Store'
import {ChevronUp} from '@Assets'
import {getTransData} from '@Api'

import BottomSheetBody from './BottomSheetBody'

const SNAP_POINT_SMALL = '4%'
const SNAP_POINT_LARGE = '70%'

const BottomSheet = () => {
  const {t} = useTranslation()
  const scaleY = useSharedValue(1)
  const bottomSheetRef = useRef<BSheet>(null)

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [hasDisplay, setDisplay] = useState<boolean>(false)

  const enableBottomSheet = useStore(state => state.enableBottomSheet)

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{scaleY: withTiming(scaleY.value)}],
    }
  })

  const snapPoints = useMemo(() => [SNAP_POINT_SMALL, SNAP_POINT_LARGE], [])

  const handleSheetChanges = useCallback(
    (index: number) => {
      scaleY.value = index === 1 ? -1 : 1
      setIsOpen(index === 1)
      setDisplay(index === 1)
    },
    [scaleY],
  )

  const onPress = useCallback(() => {
    isOpen
      ? bottomSheetRef.current?.collapse()
      : bottomSheetRef.current?.expand()
  }, [isOpen])

  const handleComponent = () => {
    return (
      <Animated.View
        style={animatedStyles}
        className="absolute -bottom-6 right-0 left-0">
        <Ripple
          onPress={onPress}
          className="self-center"
          rippleColor={Colors.Supernova}
          rippleContainerBorderRadius={16}>
          <ChevronUp />
        </Ripple>
      </Animated.View>
    )
  }

  return enableBottomSheet ? (
    <BSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      handleComponent={handleComponent}>
      <View className="p-3">
        <Text className="text-sm font-tc-regular text-slate-400 text-left">
          {t('TravelCard:recentTrans')}
        </Text>
      </View>
    </BSheet>
  ) : null
}

export default BottomSheet

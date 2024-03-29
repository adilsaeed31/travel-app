import React, {memo, useEffect, useRef, useState, lazy, Suspense} from 'react'
import {
  View,
  StyleSheet,
  Animated as AnimatedRN,
  ActivityIndicator,
} from 'react-native'
import Animated, {SlideInRight} from 'react-native-reanimated'
import {useTranslation} from 'react-i18next'
import Ripple from 'react-native-material-ripple'
import cn from 'classnames'

import {useStore} from '@Store'
import {ProfileIcon} from '@Assets'
import {Colors, flexRowLayout, screenWidth as width} from '@Utils'

import TCTextView from '../../TextView'

const TravelCard = lazy(() => import('../../../features/Dashboard/TravelCard'))
const Account = lazy(() => import('../../../features/Dashboard/Account'))

const TCTabBar: React.FC = () => {
  const {t} = useTranslation()

  const isRTL = useStore(state => state.isRTL)
  const toggleLanguage = useStore(state => state.toggleLanguage)
  const setActiveIndex = useStore(state => state.setActiveIndex)
  const toggleBottomSheet = useStore(state => state.toggleBottomSheet)

  const [active, setActive] = useState(0)
  const [headerWidths, setWidths] = useState([0])

  const barTranslate = useRef(new AnimatedRN.Value(0)).current

  const headers = [t('Dashboard:tabTitle'), t('Dashboard:tabTitle2')]

  useEffect(() => {
    let leftOffset = 0

    for (let i = 0; i < active; i += 1) {
      if (isRTL) {
        leftOffset -= headerWidths[i]
      } else {
        leftOffset += headerWidths[i]
      }
    }

    AnimatedRN.spring(barTranslate, {
      toValue: leftOffset,
      useNativeDriver: true,
    }).start()
  }, [active, barTranslate, headerWidths, isRTL])

  const onPressHeader = (index: React.SetStateAction<number>) => {
    if (active !== index) {
      setActive(index)
      setActiveIndex(active)
      toggleBottomSheet()
    }
  }

  const onHeaderLayout = (_width: number, index: number) => {
    let newWidths: any = [...headerWidths]
    newWidths[index] = _width
    setWidths(newWidths)
  }

  return (
    <View className="bg-white pt-4">
      <View
        className={cn(
          flexRowLayout(isRTL),
          'justify-center items-center mb-6',
        )}>
        <View className="flex-1 w-20" />

        <View
          style={styles.headerStyle}
          className={cn(flexRowLayout(isRTL), 'bg-tc-bottom-tab')}>
          {headers?.map((item, index) => (
            <Ripple
              key={item}
              style={styles.headerItem}
              rippleColor={Colors.Supernova}
              rippleContainerBorderRadius={16}
              onPress={() => onPressHeader(index)}
              onLayout={e => onHeaderLayout(e.nativeEvent.layout.width, index)}>
              <TCTextView className="text-tc-ios-base leading-3 text-tc-tab-text">
                {item}
              </TCTextView>
            </Ripple>
          ))}

          <AnimatedRN.View
            style={[
              styles.headerBar,
              {
                // do not change below 32 value its fixed for top tabbar animated border
                width: Math.round(headerWidths[active] - 32),
                transform: [{translateX: barTranslate}],
              },
            ]}
          />
        </View>

        <Animated.View
          style={styles.profileIcon}
          entering={SlideInRight.duration(1000).delay(200)}>
          <Ripple onPress={toggleLanguage} rippleColor={Colors.Supernova}>
            <ProfileIcon />
          </Ripple>
        </Animated.View>
      </View>

      {active === 0 ? (
        <Suspense
          fallback={
            <ActivityIndicator size="large" color={Colors.Supernova} />
          }>
          <TravelCard />
        </Suspense>
      ) : null}
      {active === 1 ? (
        <Suspense
          fallback={
            <ActivityIndicator size="large" color={Colors.Supernova} />
          }>
          <Account />
        </Suspense>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  profileIcon: {
    flex: 1,
    paddingRight: 16,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  headerStyle: {
    height: 40,
    borderWidth: 0.5,
    borderRadius: 24,
    overflow: 'hidden',
    borderColor: Colors.TabBorder,
  },
  headerItem: {
    height: 40,
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  mainItem: {
    width: width,
  },
  headerBar: {
    height: 4,
    bottom: 0,
    // do not change below margin it's fixed for animated border
    marginStart: 16,
    position: 'absolute',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: Colors.Supernova,
  },
})

export default memo(TCTabBar)

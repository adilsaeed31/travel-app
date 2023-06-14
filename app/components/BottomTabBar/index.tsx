import React, {memo, useRef, useState} from 'react'
import {View, StyleSheet, Animated as AnimatedRN} from 'react-native'
import {BottomTabBarProps} from '@react-navigation/bottom-tabs'
import Animated, {ZoomInDown} from 'react-native-reanimated'
import Ripple from 'react-native-material-ripple'
import {NativeWindStyleSheet} from 'nativewind'
import {useTranslation} from 'react-i18next'
import cn from 'classnames'

import {
  HomeIcon,
  MenuIcon,
  LoyaltyIcon,
  MenuIconActive,
  HomeIconActive,
  LoyaltyIconActive,
} from '@Assets'
import {useStore} from '@Store'
import {Colors, flexRowLayout, vw, screenWidth as width} from '@Utils'

import {default as TCTextView} from '../TextView'
import {default as BottomSheet} from '../BottomSheet'

const BottomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
  ...rest
}) => {
  const {t} = useTranslation()
  const isRTL = useStore(zState => zState.isRTL)

  const direction = isRTL ? 'rtl' : 'ltr'

  const [headerWidths, setWidths] = useState<number[]>([])
  const [originWidths, setOriginWidths] = useState<string[]>([])

  const barTranslate = useRef(new AnimatedRN.ValueXY()).current

  const renderIcon = (name: string, active: boolean) => {
    if (name === 'home') {
      if (active) {
        return <HomeIconActive />
      }
      return <HomeIcon />
    }

    if (name === 'loyalty') {
      if (active) {
        return <LoyaltyIconActive />
      }
      return <LoyaltyIcon />
    }

    if (name === 'menu') {
      if (active) {
        return <MenuIconActive />
      }
      return <MenuIcon />
    }
  }

  const onLayout = ({e, index}: {e: any; index: number}) => {
    const _x = e.nativeEvent.layout.x

    let newWidths: any = [...headerWidths]
    let rtlWidths: any = [...originWidths]

    newWidths[index] = _x
    rtlWidths[index] = '-' + _x
    setOriginWidths(rtlWidths)
    setWidths(newWidths)
  }

  return (
    <>
      <BottomSheet />

      <Animated.View entering={ZoomInDown.duration(1200).delay(250)}>
        <View
          style={{direction: direction}}
          {...rest}
          className={cn(
            flexRowLayout(isRTL),
            'bar-width-05 border-tc-tab h-16 m-5 rounded-3xl bg-tc-bottom-tab overflow-hidden',
          )}>
          {state.routes.map((route, index) => {
            const {options} = descriptors[route.key]
            const label: any =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name

            const isFocused = state.index === index

            const onPress = () => {
              let revArr: string[] | number[]

              if (isRTL) {
                revArr = originWidths
              } else {
                revArr = headerWidths
              }

              AnimatedRN.spring(barTranslate, {
                toValue: {
                  x: Number(revArr[index]),
                  y: 0,
                },
                useNativeDriver: true,
                bounciness: 0,
              }).start()

              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              })

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate({name: route.name, merge: true} as any)
              }
            }

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              })
            }

            return (
              <Ripple
                onPress={onPress}
                key={label.toLowerCase()}
                onLongPress={onLongPress}
                accessibilityRole="button"
                testID={options.tabBarTestID}
                rippleColor={Colors.Supernova}
                className={cn(
                  'flex-1',
                  flexRowLayout(isRTL),
                  'justify-center items-center',
                )}
                onLayout={e => onLayout({e, index})}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                accessibilityState={isFocused ? {selected: true} : {}}>
                <View className="justify-center items-center">
                  {renderIcon(label.toLowerCase(), isFocused)}
                  <TCTextView
                    className={cn(
                      'mt-2 text-tc-ios-base',
                      isFocused
                        ? 'text-tc-bottom-tab-text'
                        : 'text-tc-bottom-tab-text-inactive',
                    )}>
                    {t(`common:${label.toLowerCase()}`)}
                  </TCTextView>
                </View>
                {isFocused && (
                  <AnimatedRN.View
                    style={[
                      styles.headerBar,
                      {
                        width: vw(32),
                        transform: [...barTranslate.getTranslateTransform()],
                      },
                    ]}
                  />
                )}
              </Ripple>
            )
          })}
        </View>
      </Animated.View>
    </>
  )
}

NativeWindStyleSheet.create({
  styles: {
    'bar-width-05': {
      borderWidth: 0.5,
    },
  },
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerStyle: {
    borderWidth: 0.5,
    borderRadius: 24,
    borderColor: Colors.TabBorder,
  },
  headerItem: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainItem: {
    width: width,
  },
  headerBar: {
    flex: 1,
    height: 4,
    bottom: 0,
    marginLeft: 40,
    position: 'absolute',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: Colors.Supernova,
  },
})

export default memo(BottomTabBar)

import React, {memo, useEffect, useRef, useState} from 'react'
import {View, StyleSheet, Animated as AnimatedRN, Text} from 'react-native'
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
const BottomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
  ...rest
}) => {
  const {t} = useTranslation()
  const isRTL = useStore(zState => zState.isRTL)

  const direction = isRTL ? 'rtl' : 'ltr'

  const [active, setActive] = useState(0)
  const [headerWidths, setWidths] = useState([0])

  const barTranslate = useRef(new AnimatedRN.Value(0)).current

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

  const renderIcon = (name: string, index: boolean) => {
    if (name === 'home') {
      if (index) {
        return <HomeIconActive />
      }
      return <HomeIcon />
    }

    if (name === 'loyalty') {
      if (index) {
        return <LoyaltyIconActive />
      }
      return <LoyaltyIcon />
    }

    if (name === 'menu') {
      if (index) {
        return <MenuIconActive />
      }
      return <MenuIcon />
    }
  }

  const onLayout = (_width: number, index: number) => {
    let newWidths: any = [...headerWidths]
    newWidths[index] = _width
    setWidths(newWidths)
  }

  return (
    <Animated.View
      entering={ZoomInDown.duration(1200).delay(250)}
      className="justify-end pb-4 bg-white">
      <View
        style={{direction: direction}}
        {...rest}
        className={cn(
          flexRowLayout(isRTL),
          'bar-width-05 border-tc-tab h-16 m-5 rounded-3xl bg-tc-bottom-tab overflow-hidden ',
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

          const onPress = (activeIndex: number) => {
            if (active !== activeIndex) {
              setActive(activeIndex)
            }

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
              onPress={() => onPress(index)}
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
              onLayout={e => onLayout(e.nativeEvent.layout.width, index)}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              accessibilityState={isFocused ? {selected: true} : {}}>
              <View className="justify-center items-center">
                {renderIcon(label.toLowerCase(), isFocused)}
                <Text
                  className={cn(
                    'mt-2 text-tc-ios-base font-tc-regular',
                    isFocused
                      ? 'text-tc-bottom-tab-text'
                      : 'text-tc-bottom-tab-text-inactive',
                  )}>
                  {t(`common:${label.toLowerCase()}`)}
                </Text>
              </View>
            </Ripple>
          )
        })}

        <AnimatedRN.View
          style={[
            styles.headerBar,
            {
              width: vw(32),
              transform: [{translateX: barTranslate}],
            },
          ]}
        />
      </View>
    </Animated.View>
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

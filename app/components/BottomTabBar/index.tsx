import React, {memo, useRef} from 'react'
import {View, StyleSheet, Animated as AnimatedRN} from 'react-native'
import {BottomTabBarProps} from '@react-navigation/bottom-tabs'
import Animated, {ZoomInDown} from 'react-native-reanimated'
import {NativeWindStyleSheet} from 'nativewind'
import {useTranslation} from 'react-i18next'
import Ripple from 'react-native-material-ripple'
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
import {TCTextView} from '@Components'
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

  const scrollX = useRef(new AnimatedRN.Value(0)).current
  const barTranslate = AnimatedRN.multiply(scrollX, -1)
  const barTranslate1 = useRef(new AnimatedRN.Value(0)).current

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

  return (
    <Animated.View entering={ZoomInDown.duration(1000).delay(200)}>
      <View
        style={{direction: direction}}
        {...rest}
        className={cn(
          flexRowLayout(isRTL),
          'bar-width-05 border-tc-tab h-16 m-5 rounded-2xl bg-tc-bottom-tab',
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
                      width: vw(50),
                      transform: [
                        {translateX: barTranslate},
                        {translateX: barTranslate1},
                      ],
                    },
                  ]}
                />
              )}
            </Ripple>
          )
        })}
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
    height: 4,
    bottom: 0,
    overflow: 'hidden',
    marginLeft: 18,
    position: 'absolute',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: Colors.Supernova,
  },
})

export default memo(BottomTabBar)

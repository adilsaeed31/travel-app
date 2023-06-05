import React from 'react'
import {View, StyleSheet, LogBox, TouchableOpacity} from 'react-native'
import {BottomTabBarProps} from '@react-navigation/bottom-tabs'
import Animated, {ZoomInDown} from 'react-native-reanimated'
import cn from 'classnames'
import {useTranslation} from 'react-i18next'
import {useNavigation} from '@react-navigation/native'

import {useStore} from '@Store'
import {TCTextView} from '@Components'
import {Colors, flexRowLayout} from '@Utils'
import {HomeIcon, LoyaltyIcon, MenuIcon} from '@Assets'

// remove this ignoreLog line after fixing it
LogBox.ignoreLogs(['ViewPropTypes will be removed from React Native'])

const BottomTabBar: React.FC<BottomTabBarProps> = props => {
  const {t} = useTranslation()
  const isRTL = useStore(state => state.isRTL)
  const reset = useStore(state => state.reset)
  const navigation = useNavigation<any>()

  console.log(props, 'props')

  return (
    <Animated.View entering={ZoomInDown.duration(1000).delay(50)}>
      <View
        {...props}
        style={styles.barStyle}
        className={cn(
          flexRowLayout(isRTL),
          'h-16 m-5 rounded-2xl bg-tc-bottom-tab justify-between items-center px-9',
        )}>
        <TouchableOpacity
          className="justify-center items-center"
          onPress={() => navigation.navigate('Dashboard')}>
          <HomeIcon />
          <TCTextView className="mt-2 text-tc-ios-base text-tc-bottom-tab-text">
            {t('common:home')}
          </TCTextView>
        </TouchableOpacity>

        <TouchableOpacity
          className="justify-center items-center"
          onPress={() => navigation.navigate('Loyalty')}>
          <LoyaltyIcon />
          <TCTextView className="mt-2 text-tc-ios-base text-tc-bottom-tab-text">
            {t('common:loyalty')}
          </TCTextView>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={reset}
          className="justify-center items-center">
          <MenuIcon />
          <TCTextView className="mt-2 text-tc-ios-base text-tc-bottom-tab-text">
            {t('common:menu')}
          </TCTextView>
        </TouchableOpacity>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  barStyle: {
    borderWidth: 0.5,
    borderColor: Colors.TabBorder,
  },
})

export default BottomTabBar

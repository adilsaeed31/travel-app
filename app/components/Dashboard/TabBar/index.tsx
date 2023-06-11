import React, {memo, useEffect, useRef, useState} from 'react'
import {
  View,
  Animated as AnimatedRN,
  FlatList,
  LayoutAnimation,
  StyleSheet,
} from 'react-native'
import Animated, {SlideInRight} from 'react-native-reanimated'
import {useTranslation} from 'react-i18next'
import Ripple from 'react-native-material-ripple'

import {useStore} from '@Store'
import {ProfileIcon} from '@Assets'
import {Colors, screenWidth as width} from '@Utils'
import {TCTextView} from '@Components'

let animationActive = true
let animationActiveRef: number

type TCTabBarProps = {
  left: React.JSX.Element
  right?: React.JSX.Element
}

const TCTabBar: React.FC<TCTabBarProps> = ({left, right}) => {
  const {t} = useTranslation()
  const toggleLanguage = useStore(state => state.toggleLanguage)

  const [headerWidths, setWidths] = useState([0])
  const [active, setActive] = useState(0)
  const scrollX = useRef(new AnimatedRN.Value(0)).current
  const barTranslate = AnimatedRN.multiply(scrollX, -1)
  const barTranslate1 = useRef(new AnimatedRN.Value(0)).current
  const headerScrollView = useRef<any>()
  const itemScrollView = useRef<any>()

  const headers = [t('Dashboard:tabTitle'), t('Dashboard:tabTitle2')]

  useEffect(() => {
    let leftOffset = 0
    for (let i = 0; i < active; i += 1) {
      leftOffset += headerWidths[i]
    }
    headerScrollView.current?.scrollToIndex({index: active, viewPosition: 0.5})
    AnimatedRN.spring(barTranslate1, {
      toValue: leftOffset,
      useNativeDriver: true,
      bounciness: 0,
    }).start()
  }, [active, barTranslate1, headerWidths])

  const onPressHeader = (index: React.SetStateAction<number>) => {
    if (animationActiveRef) {
      clearTimeout(animationActiveRef)
    }
    if (active !== index) {
      animationActive = false
      animationActiveRef = setTimeout(() => {
        animationActive = true
      }, 400)
      itemScrollView.current?.scrollToIndex({index})
      LayoutAnimation.easeInEaseOut()
      setActive(index)
    }
  }

  const onScroll = (e: {nativeEvent: {contentOffset: {x: any}}}) => {
    const x = e.nativeEvent.contentOffset.x
    let newIndex = Math.floor(x / width + 0.5)
    if (active !== newIndex && animationActive) {
      LayoutAnimation.easeInEaseOut()
      setActive(newIndex)
    }
  }

  const onHeaderLayout = (_width: number, index: number) => {
    let newWidths: any = [...headerWidths]
    newWidths[index] = _width
    setWidths(newWidths)
  }

  const footerComponent = () => {
    return <View style={styles.headerBar} />
  }

  return (
    <View className="bg-white pt-4">
      <View className="flex-row justify-center items-center mb-6">
        <View className="flex-1 w-20" />
        <View className="overflow-hidden bg-tc-bottom-tab">
          <FlatList
            horizontal
            data={headers}
            scrollEnabled={false}
            style={styles.headerStyle}
            keyExtractor={item => item}
            ref={headerScrollView as any}
            ListFooterComponent={footerComponent}
            showsHorizontalScrollIndicator={false}
            onScroll={AnimatedRN.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: false},
            )}
            renderItem={({item, index}) => (
              <View className="overflow-hidden" key={item}>
                <Ripple
                  rippleColor={Colors.Supernova}
                  rippleContainerBorderRadius={16}
                  onPress={() => onPressHeader(index)}
                  onLayout={e =>
                    onHeaderLayout(e.nativeEvent.layout.width, index)
                  }
                  style={styles.headerItem}>
                  <TCTextView className="text-tc-ios-base text-tc-tab-text">
                    {item}
                  </TCTextView>
                </Ripple>
              </View>
            )}
          />

          <AnimatedRN.View
            style={[
              styles.headerBar,
              {
                // do not change below 32 value its fixed for top tabbar animated border
                width: Math.round(headerWidths[active] - 32),
                transform: [
                  {translateX: barTranslate},
                  {translateX: barTranslate1},
                ],
              },
            ]}
          />
        </View>

        <Animated.View
          className="flex-1 items-end mr-4"
          entering={SlideInRight.duration(1000).delay(200)}>
          <Ripple onPress={toggleLanguage} rippleColor={Colors.Supernova}>
            <ProfileIcon />
          </Ripple>
        </Animated.View>
      </View>

      <FlatList
        horizontal
        pagingEnabled
        nestedScrollEnabled
        scrollEnabled={false}
        data={[left, right]}
        onScroll={onScroll}
        decelerationRate="fast"
        ref={itemScrollView as any}
        showsHorizontalScrollIndicator={false}
        viewabilityConfig={{viewAreaCoveragePercentThreshold: 50}}
        renderItem={({item, index}) => (
          <View key={index} style={styles.mainItem}>
            {item}
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  headerStyle: {
    height: 40,
    borderWidth: 0.5,
    borderRadius: 24,
    overflow: 'hidden',
    borderColor: Colors.TabBorder,
  },
  headerItem: {
    flex: 1,
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
    marginLeft: 18,
    position: 'absolute',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: Colors.Supernova,
  },
})

export default memo(TCTabBar)

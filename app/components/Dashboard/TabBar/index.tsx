import React, {memo, useEffect, useRef, useState} from 'react'
import {
  View,
  Animated as AnimatedRN,
  FlatList,
  LayoutAnimation,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import cn from 'classnames'

import {useStore} from '@Store'
import {ProfileIcon} from '@Assets'
import {Colors, flexRowLayout, itemPos, vw, screenWidth as width} from '@Utils'
import {TCTextView} from '@Components'
import Animated, {SlideInRight} from 'react-native-reanimated'
import {useTranslation} from 'react-i18next'

let animationActive = true
let animationActiveRef: number

const TCTabBar = ({left, right}: any) => {
  const {t} = useTranslation()
  const isRTL = useStore(state => state.isRTL)
  const toggleLanguage = useStore(state => state.toggleLanguage)

  const [headerWidths, setWidths] = useState([])
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
    return <View style={[styles.headerBar, {}]} />
  }

  return (
    <View className="flex-1 bg-white pt-4">
      <View className={cn(flexRowLayout(isRTL), 'justify-center items-center')}>
        <View className="flex-1 w-20" />
        <View className="overflow-hidden">
          <FlatList
            horizontal
            data={headers}
            scrollEnabled={false}
            style={styles.headerStyle}
            keyExtractor={item => item}
            ref={headerScrollView as any}
            onScroll={AnimatedRN.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: false},
            )}
            ListFooterComponent={footerComponent}
            contentContainerStyle={{justifyContent: 'center'}}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => (
              <View className="overflow-hidden">
                <TouchableOpacity
                  key={item}
                  onPress={() => onPressHeader(index)}
                  onLayout={e =>
                    onHeaderLayout(e.nativeEvent.layout.width, index)
                  }
                  style={[
                    styles.headerItem,
                    {
                      backgroundColor: Colors.TabBGColor,
                    },
                  ]}>
                  <TCTextView key={index}>{item}</TCTextView>
                </TouchableOpacity>
              </View>
            )}
          />

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
        </View>

        <Animated.View
          className={cn('flex-1 px-4 items-end')}
          entering={SlideInRight.duration(1000).delay(200)}>
          <TouchableOpacity onPress={toggleLanguage}>
            <ProfileIcon />
          </TouchableOpacity>
        </Animated.View>
      </View>

      <FlatList
        horizontal
        pagingEnabled
        data={[left, right]}
        onScroll={onScroll}
        decelerationRate="fast"
        keyExtractor={item => item}
        ref={itemScrollView as any}
        showsHorizontalScrollIndicator={false}
        viewabilityConfig={{viewAreaCoveragePercentThreshold: 50}}
        renderItem={({item}) => (
          <View key={item} style={styles.mainItem}>
            {item}
          </View>
        )}
      />
    </View>
  )
}

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
    bottom: 1,
    overflow: 'hidden',
    marginLeft: 20,
    position: 'absolute',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: Colors.Supernova,
  },
})

export default memo(TCTabBar)

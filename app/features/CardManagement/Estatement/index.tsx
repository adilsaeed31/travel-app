import React, {useContext, useState, useMemo} from 'react'
import {View, FlatList, TouchableOpacity} from 'react-native'
import {Layout, TCTextView as Text, Spacer, Switch} from '@Components'
import {StackNavigationProp} from '@react-navigation/stack'
import {SPACER_SIZES} from '@Utils'
import {useTranslation} from 'react-i18next'
import {AppContext, AppProviderProps} from '@Context'
import {ArrowDown, Download} from '@Assets'
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated'
import {useStore} from '@Store'
import cn from 'classnames'

type Props = {
  navigation: StackNavigationProp<any>
  route: any
}

const RenderEstatement = ({
  onClick = () => {},
  isOpen = false,
  onDownloadPress = () => {},
}) => {
  const {isRTL} = useContext<AppProviderProps>(AppContext)
  const numberOfMonths = 5
  const style = useAnimatedStyle(() => {
    return {
      height: withTiming(isOpen ? (64 + 17) * numberOfMonths : 64, {
        duration: 750,
      }),
      marginBottom: 10,
    }
  }, [isOpen])
  const FlatListSylte = useAnimatedStyle(() => {
    return {
      height: withTiming(isOpen ? (64 + 15) * numberOfMonths : 0, {
        duration: 750,
      }),
      opacity: withTiming(isOpen ? 1 : 0, {duration: 750}),
    }
  }, [isOpen])
  return (
    <Animated.View style={style}>
      <TouchableOpacity
        className={cn(
          isRTL ? 'flex flex-row-reverse' : 'flex flex-row',
          'flex bg-tc-secondary  rounded-b-[16] rounded-t-[16] w-[100%] h-[64] p-3 items-center	justify-between	',
        )}
        onPress={onClick}>
        <Text className="text-[#171725] text-base">2023</Text>
        <TouchableOpacity
          className={cn(
            isOpen ? 'rotate-[180deg]' : 'rotate-[360deg]',
            'justify-center',
          )}>
          <ArrowDown />
        </TouchableOpacity>
      </TouchableOpacity>
      <Animated.FlatList
        style={FlatListSylte}
        data={[1, 2, 3, 4, 5]}
        keyExtractor={(item, i) => String(i)}
        renderItem={({item, index}) => {
          return (
            <View
              className={cn(
                isRTL ? 'flex flex-row-reverse' : 'flex flex-row',
                'justify-between	items-center p-3 mb-[10] w-[100%] h-[64] rounded-b-[16] rounded-t-[16] ',
              )}>
              <Text className="text-[#171725] text-base">April</Text>
              <TouchableOpacity onPress={onDownloadPress}>
                <Download />
              </TouchableOpacity>
            </View>
          )
        }}
      />
    </Animated.View>
  )
}
const Estatement = ({navigation}: Props) => {
  const {t} = useTranslation()
  const isRTL = useStore.getState().isRTL
  const [openIndex, setOpenIndex] = useState(-1)

  return (
    <Layout
      isBackground={false}
      isBack={true}
      onBack={() => navigation.goBack()}>
      <Spacer size={SPACER_SIZES.BASE * 1.5} />
      <View className="flex flex-1">
        <FlatList
          className="grow-0"
          data={[1, 2, 3, 4, 5, 6]}
          keyExtractor={(_, i) => String(i)}
          renderItem={({item, index}) => (
            <RenderEstatement
              onClick={() => setOpenIndex(openIndex == index ? -1 : index)}
              isOpen={openIndex == index}
              onDownloadPress={() => navigation.navigate('PdfViewer')}
            />
          )}
        />
      </View>
    </Layout>
  )
}

export default Estatement

import React, {useContext} from 'react'
import {View, TouchableOpacity} from 'react-native'
import {TCTextView as Text, TCButton as Button} from '@Components'
import {AppContext, AppProviderProps} from '@Context'
import {NavigationItem} from '@Assets'
import {useNavigation} from '@react-navigation/native'
import cn from 'classnames'

export interface IRenderOption {
  icon: React.ReactNode
  title: string
  route: string
  onPress: () => void
}

const RenderOption = ({icon, title, route, onPress}: IRenderOption) => {
  const {isRTL} = useContext<AppProviderProps>(AppContext)
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      onPress={onPress}
      className={cn(
        isRTL ? 'flex flex-row-reverse' : 'flex flex-row',
        'h-[38] mr-4 ml-4 mb-[26] justify-between	items-center',
      )}>
      <View
        className={cn(
          isRTL ? 'flex flex-row-reverse' : 'flex flex-row',
          'items-center',
        )}>
        <View className=" bg-[#ffdd45] w-10 h-10 rounded-b-[140] rounded-t-[140] justify-center	items-center border-[#FFFFFF] border-x[4] ">
          {icon}
        </View>
        <Text className="mr-4 ml-4 text-l text-[#586067]">{title}</Text>
      </View>
      <TouchableOpacity
        className={cn(
          'justify-center',
          isRTL ? 'rotate-[180deg]' : 'rotate-[360deg]',
        )}
        onPress={() => navigation.navigate(route)}>
        <NavigationItem />
      </TouchableOpacity>
    </TouchableOpacity>
  )
}
export default RenderOption

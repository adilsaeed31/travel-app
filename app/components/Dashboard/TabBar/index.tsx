import React, {useState, memo, Dispatch, SetStateAction} from 'react'
import {View, TouchableOpacity} from 'react-native'
import {Tab, TabBar, ViewPager} from '@ui-kitten/components'
import cn from 'classnames'

import {useStore} from '@Store'
import {ProfileIcon} from '@Assets'
import {Colors, vh, vw, flexRowLayout} from '@Utils'
import {TravelTitle, AccountTitle} from '@Components'

type TabBarProps = {
  left: React.JSX.Element
  right: React.JSX.Element
  selectedIndex?: number
  onSelect?: Dispatch<SetStateAction<number>>
  onLogout?: () => void
}

const indicatorStyle = {
  backgroundColor: Colors.TabIndicatorColor,
}

const tabStyle = {
  height: vh(30),
  backgroundColor: Colors.TabBGColor,
  paddingVertical: 0,
}

const TabWrapperViewStyle = {
  width: vw(200),
  borderWidth: 0.5,
  paddingVertical: 0,
  borderColor: Colors.TabBorder,
  backgroundColor: Colors.TabBGColor,
}

const useTabBarState = (initialState = 0): Partial<TabBarProps> => {
  const [selectedIndex, setSelectedIndex] = useState(initialState)
  return {selectedIndex, onSelect: setSelectedIndex}
}

export const TCTabBar: React.FC<TabBarProps> = ({left, right, onLogout}) => {
  const isRTL = useStore(state => state.isRTL)
  const {selectedIndex, onSelect} = useTabBarState()

  return (
    <View className="flex-1 bg-white pt-4">
      <View
        className={cn(flexRowLayout(isRTL), 'justify-between items-center')}>
        <View className="flex-1 w-24 self-stretch" />

        <View className="px-7 rounded-2xl" style={TabWrapperViewStyle}>
          <TabBar
            onSelect={onSelect}
            selectedIndex={selectedIndex}
            indicatorStyle={indicatorStyle}>
            <Tab style={tabStyle} title={TravelTitle} />
            <Tab style={tabStyle} title={AccountTitle} />
          </TabBar>
        </View>

        <View className="flex-1 px-4 items-end">
          <TouchableOpacity onPress={onLogout}>
            <ProfileIcon />
          </TouchableOpacity>
        </View>
      </View>

      <ViewPager
        selectedIndex={selectedIndex}
        onSelect={onSelect}
        swipeEnabled={false}>
        <View>{left}</View>
        <View>{right}</View>
      </ViewPager>
    </View>
  )
}

export default memo(TCTabBar)

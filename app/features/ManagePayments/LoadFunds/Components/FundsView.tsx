import React from 'react'
import {TextInput, View} from 'react-native'
import {ArrowDown, CurrentAccountMiniCard} from '@Assets'
import {useTranslation} from 'react-i18next'

import {TCTextView} from '@Components'
import {TouchableOpacity} from 'react-native-gesture-handler'

type FundsViewProps = {
  showDropDown?: boolean
  title: string
  currency: string
  Icon: React.ComponentType
  onPress: () => {}
}

const FundsView: React.FC<FundsViewProps> = ({
  showDropDown,
  title,
  currency,
  Icon,
  onPress,
}) => {
  const {t} = useTranslation()

  return (
    <>
      <View className="flex-row rounded-lg justify-between p-3 bg-tc-load-card">
        <View className="flex-1 flex-grow-[0.2] flex-row items-center self-center justify-between">
          <CurrentAccountMiniCard />
        </View>
        <View className="flex-1 justify-between">
          <TCTextView className="tab-text font-bold text-base">
            {title}
          </TCTextView>
          <TCTextView className="tab-text text-sm  text-tc-load-card-text">
            2,689,54 {currency}
          </TCTextView>
        </View>
      </View>

      <View className=" mt-[20] flex-row justify-between border border-slate-300 rounded-lg p-3 bg-tc-load-input-card">
        <View className="flex-1  flex-row justify-between">
          <TextInput className="flex-1 rounded-lg" />
        </View>
        <View className="flex-1 flex-grow-[0.4] self-center items-center flex-row justify-around">
          {Icon}
          <TCTextView className="text-black text-lg px-2">
            {currency}
          </TCTextView>
          {showDropDown && (
            <TouchableOpacity onPress={onPress}>
              <ArrowDown />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </>
  )
}

export default FundsView

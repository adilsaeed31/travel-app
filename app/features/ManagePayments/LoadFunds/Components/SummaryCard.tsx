import React from 'react'
import {View} from 'react-native'
import {EurLogo, SarLogo} from '@Assets'
import {useTranslation} from 'react-i18next'

import {TCTextView as Text} from '@Components'

type SubItem = {
  name: string
  value: string
}

type Props = {
  summaryType: string
  currencyFlagUrl: string
  subItems: SubItem[]
}

const SummaryCard = ({summaryType, subItems, currencyFlagUrl}: Props) => {
  const {t} = useTranslation()

  return (
    <>
      <View className="bg-white rounded-lg border border-gray-300 p-4 mb-6">
        <View className="flex flex-row items-center">
          <Text className="font-bold text-base text-right text-tc-tab-text">
            {summaryType}
          </Text>
          <View className="flex-grow border-dotted border-b border-gray-300 ml-4" />
          {summaryType === 'Source' ? <SarLogo /> : <EurLogo />}
        </View>
        <View className="left-0 border-0.5 border-dashed border-gray-400 right-0 w-full my-4" />

        {subItems &&
          subItems.map((item, index) => (
            <View className="flex flex-row items-center mt-2">
              <Text className="tab-text text-sm  text-tc-load-card-text">
                {item.name}
              </Text>
              <View className="flex-grow border-dotted border-b border-gray-300 ml-4" />
              <Text className="text-tc-tab-text text-right text-sm">
                {item.value}
              </Text>
            </View>
          ))}
      </View>
    </>
  )
}

export default SummaryCard

import React from 'react'
import {View} from 'react-native'
import {useTranslation} from 'react-i18next'

import {TCButton as Button, TCTextView as Text, Layout} from '@Components'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import SummaryCard from './Components/SummaryCard'

type Props = {
  navigation: NativeStackNavigationProp<{}>
}

const FundsSummary = ({navigation}: Props) => {
  // TODO: this will be replaced with api data
  const sourceItems = [
    {name: 'Current Account', value: '0101 D94093 001'},
    {name: 'currency', value: 'Saudi Riyal'},
    {name: 'Amount', value: '400.00 SAR'},
  ]
  // TODO: this will be replaced with api data
  const destinationItems = [
    {name: 'Current Account', value: '**** 4801'},
    {name: 'currency', value: 'EURO'},
    {name: 'Amount', value: '400.00 EUR'},
  ]

  const {t} = useTranslation()

  return (
    <>
      <Layout
        isBackground={false}
        isBack={true}
        onBack={navigation.goBack}
        isScrollable={false}
        isLoading={false}>
        <View className="flex-1 flex-grow-0 justify-between mb-8 mt-2">
          <Text className="text-black text-xl font-bold pt-3">Summary</Text>
          <Text className="text-tc-sub-title text-tc-sub-text">
            Review the information before confirmation
          </Text>
        </View>

        <View className="flex-1">
          <SummaryCard
            summaryType="Source"
            subItems={sourceItems}
            currencyFlagUrl=""
          />
          <SummaryCard
            summaryType="Destination"
            subItems={destinationItems}
            currencyFlagUrl=""
          />
        </View>

        <View className="flex-1 justify-center flex-grow-0.5">
          <Button onPress={() => {}}>{t('common:confirm')}</Button>
        </View>
      </Layout>
    </>
  )
}

export default FundsSummary

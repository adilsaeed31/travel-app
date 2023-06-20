import React, {useEffect, useState} from 'react'
import {TextInput, View} from 'react-native'
import {EurLogo, SarLogo} from '@Assets'
import {useTranslation} from 'react-i18next'

import {TCButton as Button, TCTextView, Layout} from '@Components'
import {SPACER_SIZES, TEXT_VARIANTS, UserNameValidator} from '@Utils'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import FundsView from './FundsView'

type Props = {
  navigation: NativeStackNavigationProp<{
    AfterOtpPersonalId: undefined
    PersonalID: undefined
    Existing: undefined
    OTPAuth?: {
      user: undefined
    }
  }>
}

const LoadFundsScreen = ({navigation}: Props) => {
  const {t} = useTranslation()

  return (
    <>
      <Layout
        isBackground={false}
        isBack={true}
        isScrollable={false}
        isLoading={false}>
        <View className="flex flex-row justify-between">
          <TCTextView className="text-black text-xl font-bold pt-3">
            Load
          </TCTextView>
        </View>
        <View className="flex flex-row justify-between pb-3 pt-9">
          <TCTextView className="text-xl font-bold pt-8">Source</TCTextView>
        </View>

        <FundsView
          title={'Current Account - 3001'}
          Icon={<SarLogo />}
          currency={'SAR'}
        />
        <View className="left-0 right-0 w-full h-px bg-gray-300 mt-10" />
        <View className="flex-row justify-between pb-3 ">
          <TCTextView className="text-xl font-bold pt-8">
            Destination
          </TCTextView>
        </View>

        <FundsView
          title={'Travel Card - 4801'}
          Icon={<EurLogo />}
          currency={'EUR'}
        />
        <View className="flex justify-between pb-3 pt-10">
          <Button onPress={() => {}}>{t('onboarding:continue')}</Button>
        </View>
      </Layout>
    </>
  )
}

export default LoadFundsScreen

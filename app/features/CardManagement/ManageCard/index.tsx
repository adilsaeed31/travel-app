import React, {useContext, useState} from 'react'
import {View, FlatList} from 'react-native'
import {Layout, TCTextView as Text, Spacer, Switch, Modal} from '@Components'
import {StackNavigationProp} from '@react-navigation/stack'
import styled from 'styled-components/native'
import {TEXT_VARIANTS, Colors, SPACER_SIZES} from '@Utils'
import {useTranslation} from 'react-i18next'
import {AppContext, AppProviderProps} from '@Context'
import {Card, AppleWallet} from '@Assets'
import {MangeCardList} from './mangeCardList'
import RenderOption, {IRenderOption} from './components/RenderMangeCardOption'
import TemporaryStopCard from './components/StopOrActivateSheetContent'
import CardStopedOrActivatedSuccess from './components/CardStopedOrActivatedSuccess'
import cn from 'classnames'

type Props = {
  navigation: StackNavigationProp<any>
  route: any
}

const MangeCard = ({navigation}: Props) => {
  const {t} = useTranslation()
  const {isRTL} = useContext<AppProviderProps>(AppContext)
  const [showConfirmationSheet, setShowConfirmationSheet] = useState({
    acivate: false,
    stop: false,
  })
  const [isEnabled, setIsEnabled] = useState(false)
  const [cardState, setCardState] = useState({
    stopSuccess: false,
    activatedSuccess: false,
    load: false,
  })
  const toggleSwitch = () => setIsEnabled(previousState => !previousState)
  const isCardStoped = true

  const handleSheetConfirmationButton = () => {
    setShowConfirmationSheet({acivate: false, stop: false})
    setCardState({...cardState, load: true})
    setTimeout(() => {
      setCardState({...cardState, load: false})
    }, 1000)
  }
  const handleCardOptionClicked = (item: any) => {
    if (item.key == 'stop') {
      return setShowConfirmationSheet({acivate: false, stop: true})
    }
    if (item.key == 'activate') {
      return setShowConfirmationSheet({acivate: true, stop: false})
    }
    navigation.navigate(item.route)
  }
  return (
    <Layout
      isLoading={cardState.load}
      isBackground={false}
      isBack={true}
      onBack={() => navigation.goBack()}>
      <Text
        className={cn(
          'font-bold text-3xl mt-6 mb-8',
          isRTL ? 'text-right' : 'text-left',
        )}>
        {t('ManageCard:manageCard')}
      </Text>
      <Spacer size={SPACER_SIZES.BASE * 1.5} />
      <View className="flex-1">
        <View
          className={cn(
            'w-full flex-row py-4 px-3 items-center h-[72] rounded-xl bg-[#f8f9fd]',
            isCardStoped ? 'opacity-[0.4]' : 'opacity-[1]',
            isRTL ? 'flex-row-reverse' : 'flex-row',
          )}>
          <Card />

          <View className={cn(isRTL ? 'mr-4' : 'ml-4')}>
            <Text variant={TEXT_VARIANTS.body}>Travel Card - 4801</Text>
            <Text
              className={cn(
                'text-[14] color[#72788e] mt-1',
                isRTL ? 'text-right' : 'text-left',
              )}>
              5690.00 EUR
            </Text>
          </View>
        </View>
        {isCardStoped && (
          <View
            className={
              'h-[32] items-center justify-center rounded-full[10] mt-5 mb-1 bg-[#ff670014]  rounded[6] text-center rounded-b-[6] rounded-t-[6]'
            }>
            <Text className="text-[12] text-center text-[#ff6700]">
              {t('ManageCard:yourCardIsBloacked')}
            </Text>
          </View>
        )}
        <View className="flex-row justify-center items-center p-3 mt-4 bg-[#000000]  rounded-b-[8] rounded-t-[8]">
          <AppleWallet />
          <Text
            className="text-[#FFFFFF] mr-1 ml-1 "
            variant={TEXT_VARIANTS.body}>
            {t('ManageCard:addToAppleWallet')}
          </Text>
        </View>
        <FlatList
          className="mt-8"
          data={MangeCardList(t, isCardStoped)}
          keyExtractor={(_, i) => String(i)}
          renderItem={({item, index}: any) => (
            <RenderOption
              icon={item?.icon}
              title={item?.title}
              key={String(index)}
              route={item.route}
              onPress={() => handleCardOptionClicked(item)}
            />
          )}
        />
        <View className="w[100] border-[#d2d5d7] border-0.5  " />
        <View
          className={cn(
            'bg-[#fafafb] mt-4 justify-between items-center pr-2 pl-2 h-16 rounded-b-[16] rounded-t-[16]',
            isRTL ? 'flex-row-reverse' : 'flex-row',
          )}>
          <Text className="text-[16]  text-[#586067]">
            {t('ManageCard:enableEcommerce')}
          </Text>
          <Switch onValueChange={toggleSwitch} value={isEnabled} />
        </View>
      </View>
      <Modal
        title={
          showConfirmationSheet.stop
            ? t('ManageCard:sopCardCard')
            : t('ManageCard:reactiveCard')
        }
        isOpen={showConfirmationSheet.acivate || showConfirmationSheet.stop}
        onSheetClose={() =>
          setShowConfirmationSheet({acivate: false, stop: false})
        }
        SheetContent={
          <TemporaryStopCard
            activate={showConfirmationSheet.acivate}
            onClick={handleSheetConfirmationButton}
          />
        }
      />
      <Modal
        title={''}
        isOpen={cardState.activatedSuccess || cardState.stopSuccess}
        onSheetClose={() =>
          setCardState({
            ...cardState,
            stopSuccess: false,
            activatedSuccess: false,
          })
        }
        SheetContent={
          <CardStopedOrActivatedSuccess
            activateCard={cardState.activatedSuccess}
          />
        }
      />
    </Layout>
  )
}

export default MangeCard

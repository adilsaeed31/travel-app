import React, {useContext, useState} from 'react'
import {View} from 'react-native'
import {Layout, TCButton as Button, TCTextView as Text} from '@Components'
import {StackNavigationProp} from '@react-navigation/stack'
import {TEXT_VARIANTS, Colors} from '@Utils'
import {useTranslation} from 'react-i18next'
import {AppContext, AppProviderProps} from '@Context'
import RenderPin from './components/RenderPin'
import cn from 'classnames'

type Props = {
  navigation: StackNavigationProp<any>
  route: any
}

const ViewPinScreen = ({navigation}: Props) => {
  const {isRTL} = useContext<AppProviderProps>(AppContext)
  const {t} = useTranslation()
  const [didFinishAutoPlay, setDidFinshAutoPlay] = useState(false)
  const [showPin, setShowPin] = useState(false)
  const [pins, setPins] = useState(['1', '2', '3', '4'])
  const handleShowClicked = () => {
    setShowPin(true)
  }
  return (
    <Layout
      isBackground={false}
      isBack={true}
      onBack={() => navigation.goBack()}>
      <Text
        className={cn(
          'mt-7 mb-8 font-semibold text-2xl',
          isRTL ? 'text-right' : 'text-left',
        )}>
        {t('ManageCard:ViewPin')}
      </Text>
      <View className="flex flex-1 justify-between">
        <View>
          <View className="flex items-center justify-center w-[100%] h-[92] bg-[#f9f9fb] rounded-b-[6] rounded-t-[6] mr-6 ml-6 mt-11 self-center">
            <View>
              <Text className="mt-4 text-center text-[#acacac] text-[13]">
                {t('ManageCard:CardPin')}
              </Text>
            </View>
            <RenderPin
              values={pins}
              onCompleteAutoDisplay={() => {
                setDidFinshAutoPlay(true)
                if (showPin) {
                  navigation.navigate('MangeCard')
                }
              }}
              showPin={showPin}
            />
          </View>
          <Text className="mt-3 text-[#93989d] text-center text-ls">
            {t('ManageCard:pinAutoPlayed')}
          </Text>
        </View>
        <Button
          className="ml-8 mr-8 w-[100%] self-center"
          disabled={!didFinishAutoPlay}
          onPress={handleShowClicked}>
          <Text variant={TEXT_VARIANTS.bodyBold}>
            {t('onboarding:personalInformation:continue')}
          </Text>
        </Button>
      </View>
    </Layout>
  )
}

export default ViewPinScreen

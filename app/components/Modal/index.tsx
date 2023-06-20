import React, {useContext} from 'react'
import {View, TouchableOpacity, StyleSheet} from 'react-native'
import styled from 'styled-components/native'
import {AppContext, AppProviderProps} from '@Context'
import Modal from 'react-native-modal'
import {Close, CloseVector} from '@Assets'
import Text from '../TextView'
import cn from 'classnames'

interface IModalProps {
  isOpen?: boolean
  title?: string | null
  onSheetClose: () => void
  dynamicHeight?: boolean
  SheetContent: React.ReactNode
}
const ModalComponent = ({
  isOpen = false,
  title = '',
  onSheetClose = () => {},
  dynamicHeight = false,
  SheetContent,
}: IModalProps) => {
  const {isRTL} = useContext<AppProviderProps>(AppContext)
  const TitelWrapper = styled(View)<{isRTL: boolean; hasTitle: boolean}>`
    flex-direction: ${props => (props.isRTL ? 'row-reverse' : 'row')};
    margin-top: ${props => (props.hasTitle ? '24px' : '5px')};
    justify-content: space-between;
    align-items: center;
  `

  const renderContent = () => {
    return (
      <View className={cn('bg-[#FFFFFF] p-[16] rounded-t-[20] pl-8 pr-8 ')}>
        <View className="flex flex-1">
          <View className="w-[40] h-[5] bg-[#e6e6e6] rounded-b-[6] rounded-t-[6] self-center	" />
          <View
            className={cn(
              isRTL ? 'flexflex-row-reverse' : 'flex flex-row',
              !!title?.length ? 'mt-6' : 'mt-1',
              'justify-between	items-center	',
            )}>
            <Text
              className={cn(
                isRTL ? 'text-right' : 'text-left',
                'text-xl font-semibold',
              )}>
              {title}
            </Text>
            <TouchableOpacity
              hitSlop={{top: 30, right: 20, bottom: 20, left: 20}}
              onPress={() => onSheetClose()}>
              <CloseVector />
            </TouchableOpacity>
          </View>
          {SheetContent}
        </View>
      </View>
    )
  }
  return (
    <Modal
      onSwipeComplete={({swipingDirection}) =>
        swipingDirection === 'down' && onSheetClose()
      }
      propagateSwipe={true}
      swipeDirection={'down'}
      animationIn="fadeInUpBig"
      backdropOpacity={0.3}
      onBackdropPress={onSheetClose}
      avoidKeyboard={true}
      className="m-0"
      isVisible={isOpen}>
      <View className="absolute right-0 left-0 bottom-0 z-50">
        {renderContent()}
      </View>
    </Modal>
  )
}
export default ModalComponent

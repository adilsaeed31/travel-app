import React, {useContext, useState} from 'react'
import {
  View,
  Pressable,
  Dimensions,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import Modal from 'react-native-modal'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import styled from 'styled-components/native'
import {AppContext, AppProviderProps} from '@Context'
import {Forward, Search} from '@Assets'
import {TEXT_VARIANTS} from '@Utils'
import TCTextView from '../TextView'

interface IDropDownProps {
  data: string[]
  label: string
  toogleClick: () => void
  value: string | null
  error: string
  isOpen?: boolean
  disabled?: boolean
  title?: string | null
  subTitle?: string | null
  hasSearch?: boolean
  onSheetClose: () => void
  onItemSelected: (item: string) => void
}
const SheetHeight = Dimensions.get('window').height / 2

export default function DropDown({
  data = [],
  label = '',
  toogleClick,
  value,
  error = '',
  disabled = false,
  isOpen = false,
  title = '',
  subTitle = '',
  hasSearch,
  onSheetClose,
  onItemSelected,
}: IDropDownProps) {
  const {isRTL} = useContext<AppProviderProps>(AppContext)
  const [searchVaue, setSearchValue] = useState('')
  const SearchResult = searchVaue
    ? data?.filter(word =>
        String(word).toLowerCase().includes(String(searchVaue).toLowerCase()),
      )
    : data
  const renderContent = () => {
    return (
      <SheetContentWrapper>
        <OneFlexView>
          <ToNotch />
          <Title isRTL={!!isRTL}>{title}</Title>
          <Subtitle isRTL={!!isRTL}>{subTitle}</Subtitle>
          {hasSearch && (
            <InputWrapper>
              <Search />
              <InputView
                selectionColor={'black'}
                value={searchVaue}
                onChangeText={(e: React.SetStateAction<string>) => {
                  setSearchValue(e)
                }}
              />
            </InputWrapper>
          )}
          <View style={{height: Dimensions.get('window').height / 3}}>
            <FlatList
              keyboardShouldPersistTaps="always"
              data={SearchResult}
              keyExtractor={(_item, i) => String(i)}
              renderItem={({item, index}) => (
                <ClickableItem
                  hasBorder={SearchResult.length - 1 !== index}
                  onPress={() => {
                    onItemSelected(item)
                    setSearchValue('')
                    onSheetClose()
                  }}
                  key={index}>
                  <ClickableItemText isRTL={!!isRTL}>{item}</ClickableItemText>
                </ClickableItem>
              )}
            />
          </View>
        </OneFlexView>
      </SheetContentWrapper>
    )
  }

  return (
    <>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="never">
        <Modal
          onSwipeComplete={({swipingDirection}) =>
            swipingDirection === 'down' && onSheetClose()
          }
          swipeDirection="down"
          animationIn="fadeInUpBig"
          animationOut="fadeOutDownBig"
          onBackdropPress={onSheetClose}
          avoidKeyboard={true}
          style={Styles.noMargin}
          isVisible={isOpen}>
          <ModalWrapper>{renderContent()}</ModalWrapper>
        </Modal>
      </KeyboardAwareScrollView>

      <ConfirmButton
        disabled={disabled}
        hasError={!!error?.length}
        isRTL={!!isRTL}
        onPress={() => {
          setSearchValue('')
          toogleClick()
        }}>
        <LabelValueWrapper hasValue={!!value}>
          <Label>{label}</Label>
          {value && (
            <Value variant={TEXT_VARIANTS.caption} isRTL={!!isRTL}>
              {value}
            </Value>
          )}
        </LabelValueWrapper>
        <ArrowIconWrapper isRTL={!!isRTL}>
          <Forward />
        </ArrowIconWrapper>
      </ConfirmButton>
      {error?.length ? <ErrorText>{error}</ErrorText> : null}
    </>
  )
}

const Styles = StyleSheet.create({
  noMargin: {
    margin: 0,
  },
})

const Title = styled(TCTextView)<{isRTL: boolean}>`
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
  text-align: ${props => (props.isRTL ? 'right' : 'left')};
  margin-top: 24px;
`
const Subtitle = styled(TCTextView)<{isRTL: boolean}>`
  font-weight: 400;
  font-size: 12px;
  line-height: 21px;

  color: #9f9fa7;
  text-align: ${props => (props.isRTL ? 'right' : 'left')};
  margin-bottom: 16px;
`
const ToNotch = styled(View)`
  width: 40px;
  height: 5px;
  align-self: center;

  background: #e6e6e6;
  border-radius: 100px;
`

const SheetContentWrapper = styled(View)`
  background-color: white;
  padding: 16px;
  height: ${SheetHeight};
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
`
const OneFlexView = styled(View)`
  flex: 1;
`
const InputWrapper = styled(View)`
  height: 48px;
  background: #ffffff;
  border: 1px solid #e6e6e6;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  padding-right: 10px;
  padding-left: 10px;
  flex-direction: row;
`
const InputView = styled(TextInput)`
  flex: 1;
  padding-right: 5px;
  padding-left: 5px;
`
const ModalWrapper = styled(View)`
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 1000;
`
const ClickableItem = styled(TouchableOpacity)<{hasBorder: boolean}>`
  border-bottom-width: ${props => (props.hasBorder ? '1px' : '0px')};
  border-bottom-color: #e6e6e6;
  height: 40px;
  margin-top: 2px;
  justify-content: center;
`
const ClickableItemText = styled(TCTextView)<{isRTL: boolean}>`
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #1e1e1c;
  text-align: ${props => (props.isRTL ? 'right' : 'left')};
`

const ConfirmButton = styled(Pressable)<{
  isRTL: boolean
  hasError: boolean
  disabled: boolean
}>`
  height: 70px;
  width: 100%;
  margin-right: 32px;
  margin-left: 32px;
  align-self: center;
  border-radius: 12px;
  justify-content: center;
  padding: 12px 16px;
  border: 0.5px solid
    ${props => (props.hasError ? '#F54D3F' : 'rgba(60, 60, 60, 0.4)')};
  border-color: ${props => (props.hasError ? 'red' : 'rgba(60, 60, 60, 0.4)')};
  flex-direction: ${props => (props.isRTL ? 'row-reverse' : 'row')};
  justify-content: space-between;
  background: ${props => (props.disabled ? '#f5f8f9' : '#f5f8f9')};
`
const ArrowIconWrapper = styled(View)<{isRTL: boolean}>`
  justify-content: center;
  transform: rotate(180deg);
  transform: ${props => (!props.isRTL ? 'rotate(360deg)' : 'rotate(180deg)')};
`
const Label = styled(TCTextView)`
  color: #8c8a86;
  font-weight: 400;
  font-size: 13px;
  font-weight: 400;
  line-height: 18px;
`
const Value = styled(TCTextView)<{isRTL: boolean}>`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  text-align: ${props => (props.isRTL ? 'right' : 'left')};
  color: #333333;
`
const ErrorText = styled(TCTextView)`
  color: #f85e5e;
  font-weight: 400;
  font-size: 14px;
  margin-top: 5px;
  margin-left: 5px;
  margin-right: 5px;
`
const LabelValueWrapper = styled(View)<{hasValue: boolean}>`
  justify-content: ${props => (props.hasValue ? 'center' : 'center')};
`

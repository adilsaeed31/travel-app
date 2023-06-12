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
import styled from 'styled-components/native'
import {AppContext, AppProviderProps} from '@Context'
import {Forward} from '@Assets'
import {TEXT_VARIANTS} from '@Utils'
import {Search} from '@Assets'
import Modal from 'react-native-modal'
import Text from '../TextView'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {Close} from '@Assets'

const DropDownInput = styled(Pressable)<{
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
const Label = styled(Text)`
  color: #8c8a86;
  font-weight: 400;
  font-size: 13px;
  font-weight: 400;
  line-height: 18px;
`
const Value = styled(Text)<{isRTL: boolean}>`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  text-align: ${props => (props.isRTL ? 'right' : 'left')};
  color: #333333;
`
const ErrorText = styled(Text)`
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
interface IDropDownProps {
  data: string[]
  label: string
  toogleClick: () => void
  value?: string | null | undefined
  error?: string | null | undefined
  isOpen?: boolean
  disabled?: boolean
  title?: string | null
  subTitle?: string | null
  hasSearch?: boolean
  onSheetClose: () => void
  onItemSelected: (item: string) => void
  dynamicHeight?: boolean
}
const SheetHeight = Dimensions.get('window').height / 1.8

export default function DropDown({
  data = [],
  label = '',
  toogleClick,
  value,
  error = '',
  disabled = false,
  isOpen = false,
  title = '',
  hasSearch,
  onSheetClose,
  onItemSelected,
  dynamicHeight = false,
}: IDropDownProps) {
  const {isRTL} = useContext<AppProviderProps>(AppContext)
  const [searchVaue, setSearchValue] = useState('')
  const SearchResult = searchVaue
    ? data?.filter(word =>
        word?.toLowerCase()?.includes(searchVaue?.toLowerCase()),
      )
    : data
  const renderContent = () => {
    return (
      <SheetContentWrapper dynamicHeight={dynamicHeight} key={10}>
        <OneFlexView>
          <ToNotch onPress={onSheetClose} />
          <TitelWrapper isRTL={!!isRTL}>
            <Title isRTL={!!isRTL}>{title}</Title>
            <TouchableOpacity
              hitSlop={{top: 30, right: 20, bottom: 20, left: 20}}
              onPress={() => onSheetClose()}>
              <Close />
            </TouchableOpacity>
          </TitelWrapper>
          {/* <Subtitle isRTL={!!isRTL}>{subTitle}</Subtitle> */}
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
          <FlatListWrapper>
            <FlatList
              style={{marginBottom: dynamicHeight ? undefined : 100}}
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
          </FlatListWrapper>
        </OneFlexView>
      </SheetContentWrapper>
    )
  }

  return (
    <>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
        <Modal
          onSwipeComplete={({swipingDirection}) =>
            swipingDirection === 'down' && onSheetClose()
          }
          propagateSwipe={true}
          // swipeDirection={!Platform.OS === 'android' ? 'down' : undefined}
          animationIn="fadeInUpBig"
          animationOut="fadeOutDownBig"
          onBackdropPress={onSheetClose}
          avoidKeyboard={true}
          style={styles.noMargin}
          isVisible={isOpen}>
          <ModalWrapper>{renderContent()}</ModalWrapper>
        </Modal>
      </KeyboardAwareScrollView>

      <DropDownInput
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
      </DropDownInput>
      {error?.length ? <ErrorText>{error}</ErrorText> : null}
    </>
  )
}

const Title = styled(Text)<{isRTL: boolean}>`
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
  text-align: ${props => (props.isRTL ? 'right' : 'left')};
`

const ToNotch = styled(TouchableOpacity)`
  width: 40px;
  height: 5px;
  align-self: center;

  background: #e6e6e6;
  border-radius: 100px;
`

const SheetContentWrapper = styled(View)<{dynamicHeight: boolean}>`
  background-color: white;
  padding: 16px;
  height: ${props => (props.dynamicHeight ? 'auto' : SheetHeight)};
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  padding-left: 32px;
  padding-right: 32px;
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
  margin-top: 15px;
  margin-bottom: 10px;
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
const ClickableItemText = styled(Text)<{isRTL: boolean}>`
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #1e1e1c;
  text-align: ${props => (props.isRTL ? 'right' : 'left')};
`
const styles = StyleSheet.create({
  noMargin: {margin: 0},
})
const FlatListWrapper = styled(View)`
  padding-bottom: 20px;
`
const TitelWrapper = styled(View)<{isRTL: boolean}>`
  flex-direction: ${props => (props.isRTL ? 'row-reverse' : 'row')};
  margin-top: 24px;
  justify-content: space-between;
  align-items: center;
`

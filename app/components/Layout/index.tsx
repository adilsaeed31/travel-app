import React from 'react'
import {
  View,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native'
import styled from 'styled-components/native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {ActivityIndicator} from 'react-native'

import {BottomBg, FlightPath} from '@Assets'
import {useStore} from '@Store'
import {vh, vw} from '@Utils'

import Header from './Header'

type LayoutProps = {
  isHeader?: boolean
  isBack?: boolean
  onBack?: () => void
  isBackground?: boolean
  children: React.ReactNode
  className?: string
  backgroundIndex?: Number
  isScrollable?: boolean
  isLoading?: boolean
  onScroll?: () => void
  hasDashboardLayout?: boolean
}

const Container = styled(View)`
  flex: 1;
  min-height: ${Dimensions.get('window').height}px;
  background-color: #fff;
`

const BackgroundImage1 = styled(FlightPath)`
  position: absolute;
  top: ${vh(116)}px;
  align-self: center;
  z-index: -1;
  transform: ${() => (useStore.getState().isRTL ? 'scaleX(-1)' : 'scaleX(1)')};
`

const BackgroundImage2 = styled(BottomBg)`
  position: absolute;
  bottom: 0;
  z-index: -1;

  align-self: center;
`

const ContentWrapper = styled(View)<any>`
  flex: 1;
`

const Loader = styled(View)`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`

const AppLayout: React.FC<LayoutProps> = ({
  isHeader = true,
  isBack = false,
  backgroundIndex = 1,
  isBackground = true,
  className = '',
  isScrollable = true,
  isLoading = false,
  onScroll = () => {},
  onBack = () => {},
  children,
  hasDashboardLayout = false,
  ...rest
}) => {
  const insetEdges = useSafeAreaInsets()
  const isRTL = useStore(state => state.isRTL)
  const direction = isRTL ? 'rtl' : 'ltr'

  // below is the flag to return the dashboard layout without
  // scrollview and keyboard avoidingview and others flag
  if (hasDashboardLayout) {
    return (
      <View
        style={{
          direction: direction,
          // do not remove this below style props below will
          // adjust the padding/spacing on ios and android
          paddingTop: insetEdges.top,
        }}>
        {children}
      </View>
    )
  }

  return (
    <KeyboardAvoidingView
      enabled
      style={{
        // do not remove this below style props below will
        // adjust the padding/spacing on ios and android
        paddingTop: insetEdges.top,
      }}
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        scrollEventThrottle={16}
        scrollEnabled={isScrollable}
        keyboardShouldPersistTaps="handled"
        onScroll={onScroll}>
        <TouchableOpacity onPress={Keyboard.dismiss} activeOpacity={1}>
          <Container className={className} {...rest}>
            {isLoading ? (
              <Loader>
                <ActivityIndicator size="large" color="#F8D03B" />
              </Loader>
            ) : null}
            {isBackground && (
              <>
                {backgroundIndex === 2 ? (
                  <BackgroundImage1 preserveAspectRatio="none" />
                ) : null}

                <BackgroundImage2 />
              </>
            )}
            <ContentWrapper
              style={{
                // do not remove this below style props below will
                // adjust the padding/spacing on ios and android
                marginBottom: isHeader && vh(insetEdges.top),
                paddingLeft: vw(insetEdges.left) + vw(16),
                paddingRight: vw(insetEdges.right) + vw(16),
                paddingBottom: vh(insetEdges.bottom),
              }}>
              {isHeader && <Header isBack={isBack} onBack={onBack} />}

              {children}
            </ContentWrapper>
          </Container>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default AppLayout

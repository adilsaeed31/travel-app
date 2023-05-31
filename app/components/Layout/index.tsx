import React from 'react'
import {
  View,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native'
import styled from 'styled-components/native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {ActivityIndicator} from 'react-native'

import {Background1, Background2} from '@Assets'
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
}

const statusBarHeight = StatusBar.currentHeight as number

const Container = styled(View)`
  flex: 1;
  min-height: ${Dimensions.get('window').height - statusBarHeight}px;
  background-color: #fff;
`

const BackgroundImage1 = styled(Background1)`
  position: absolute;
  z-index: -1;
  elevation: -1;
  transform: ${() => (useStore.getState().isRTL ? 'scaleX(-1)' : 'scaleX(1)')};
`

const BackgroundImage2 = styled(Background2)`
  position: absolute;
  z-index: -1;
  elevation: -1;
  transform: ${() => (useStore.getState().isRTL ? 'scaleX(-1)' : 'scaleX(1)')};
`

const ContentWrapper = styled(View)`
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

  ...rest
}) => {
  const insetEdges = useSafeAreaInsets()
  return (
    <KeyboardAvoidingView
      enabled
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
                {backgroundIndex === 1 ? (
                  <BackgroundImage1
                    preserveAspectRatio="none"
                    width="100%"
                    height="100%"
                  />
                ) : null}

                {backgroundIndex === 2 ? (
                  <BackgroundImage2
                    preserveAspectRatio="none"
                    width="100%"
                    height="100%"
                  />
                ) : null}
              </>
            )}
            <ContentWrapper
              style={{
                // do not remove this below style props below will
                // adjust the padding/spacing on ios and android
                paddingTop: vh(insetEdges.top),
                paddingLeft: vw(insetEdges.left) + vw(32),
                paddingRight: vw(insetEdges.right) + vw(32),
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

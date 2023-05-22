import React from 'react'
import {
  View,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import styled from 'styled-components/native'

import Header from './Header'
import {Background} from '@Assets'
import {useStore} from '@Store'

type LayoutProps = {
  isHeader?: boolean
  isBackground?: boolean
  children: React.ReactNode
  className?: string
  isScrollable?: boolean
  onScroll?: () => void
}

const Container = styled(View)`
  flex: 1;
  min-height: ${Dimensions.get('window').height}px;
`

const BackgroundImage = styled(Background)`
  position: absolute;
  z-index: -1;
  elevation: -1;
  transform: ${() => (useStore.getState().isRTL ? 'scaleX(-1)' : 'scaleX(1)')};
`

const ContentWrapper = styled(View)`
  flex: 1;
  padding: 0px 32px;
`

const AppLayout: React.FC<LayoutProps> = ({
  isHeader = true,
  isBackground = true,
  className = '',
  isScrollable = true,
  onScroll = () => {},
  children,
  ...rest
}) => {
  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="padding" enabled>
      <ScrollView
        scrollEventThrottle={16}
        scrollEnabled={isScrollable}
        keyboardShouldPersistTaps="handled"
        onScroll={onScroll}>
        <TouchableOpacity onPress={() => Keyboard.dismiss()} activeOpacity={1}>
          <Container className={className} {...rest}>
            {isBackground && (
              <BackgroundImage
                preserveAspectRatio="none"
                width="100%"
                height="100%"
              />
            )}
            <ContentWrapper>
              {isHeader && <Header />}
              {children}
            </ContentWrapper>
          </Container>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default AppLayout

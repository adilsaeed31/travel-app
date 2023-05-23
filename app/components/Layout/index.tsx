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

import Header from './Header'
import {Background1, Background2} from '@Assets'
import {useStore} from '@Store'

type LayoutProps = {
  isHeader?: boolean
  isBack?: boolean
  onBack?: () => void
  isBackground?: boolean
  children: React.ReactNode
  className?: string
  backgroundIndex?: Number
  isScrollable?: boolean
  onScroll?: () => void
}

const Container = styled(View)`
  flex: 1;
  min-height: ${Dimensions.get('window').height}px;
  background-color: #fff;
`

const BackgroundImage1 = styled(Background1)`
  position: absolute;
  z-index: -1;
  elevation: -1;
`

const BackgroundImage2 = styled(Background2)`
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
  isBack = false,
  backgroundIndex = 1,
  isBackground = true,
  className = '',
  isScrollable = true,
  onScroll = () => {},
  onBack = () => {},
  children,
  ...rest
}) => {
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled>
      <ScrollView
        scrollEventThrottle={16}
        scrollEnabled={isScrollable}
        keyboardShouldPersistTaps="handled"
        onScroll={onScroll}>
        <TouchableOpacity onPress={() => Keyboard.dismiss()} activeOpacity={1}>
          <Container className={className} {...rest}>
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
            <ContentWrapper>
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

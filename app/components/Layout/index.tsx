import React from 'react'
import {View, Dimensions, KeyboardAvoidingView} from 'react-native'
import styled from 'styled-components/native'

import Header from './Header'
import {Background} from '@Assets'
import {ScrollView} from 'react-native-gesture-handler'

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
        scrollEnabled={isScrollable}
        keyboardShouldPersistTaps="always"
        onScroll={onScroll}>
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
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default AppLayout

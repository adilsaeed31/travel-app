import React from 'react'
import {View} from 'react-native'
import styled from 'styled-components/native'

import Header from './Header'
import {Background} from '@Assets'

type LayoutProps = {
  title?: string
  isHeader?: boolean
  className?: string
  isBackground?: boolean
  children: React.ReactNode
}

const Container = styled(View)`
  flex: 1;
`

const BackgroundImage = styled(Background)`
  position: absolute;
  z-index: -1;
  elevation: -1;
`

const ContentWrapper = styled(View)`
  flex: 1;
`

const AppLayout: React.FC<LayoutProps> = ({
  isHeader = true,
  isBackground = true,
  children,
  ...rest
}) => {
  return (
    <Container {...rest}>
      {isBackground && (
        <BackgroundImage
          preserveAspectRatio="none"
          width="100%"
          height="100%"
        />
      )}
      <ContentWrapper>
        {isHeader && <Header canLanguageChange={true} />}
        {children}
      </ContentWrapper>
    </Container>
  )
}

export default AppLayout

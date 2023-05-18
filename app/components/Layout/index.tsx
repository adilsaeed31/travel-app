import React from 'react'
import {View} from 'react-native'
import styled from 'styled-components/native'

import Header from './Header'
import {Background} from '@Assets'

type LayoutProps = {
  isHeader?: boolean
  isBackground?: boolean
  children: React.ReactNode
  className?: string
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
  padding: 0px 32px;
`

const AppLayout: React.FC<LayoutProps> = ({
  isHeader = true,
  isBackground = true,
  className = '',
  children,
  ...rest
}) => {
  return (
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
  )
}

export default AppLayout

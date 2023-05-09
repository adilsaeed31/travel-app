import React, {useContext} from 'react'
import {Layout, Text, Button} from '@ui-kitten/components'
import {styled} from 'nativewind'

import {AppContextButtons} from '@Components'
import {AppContext, AuthContext, AuthProviderProps} from '@Context'

const primaryColor = {
  color: '#F8D03B',
}

// Black : #1C1C1C
// Yellow: #F8D03B

// Below is the UI kitten component Layout
const SBLayoutView = styled(Layout)
const SBText = styled(Text)

export default function AuthFeature() {
  const {
    mode,
    language,
    direction,
    changeMode,
    changeLanguage,
    changeDirection,
  } = useContext(AppContext)

  const {login, isLoading, isError, error} =
    useContext<AuthProviderProps>(AuthContext)

  return (
    <SBLayoutView className="flex-1 px-5 pt-20 pb-8">
      <Text>Authentication Screen</Text>

      <SBLayoutView className="flex-1 items-center justify-center">
        <SBText style={primaryColor} className="font-thin text-5xl">
          Travel Card App
        </SBText>
      </SBLayoutView>

      <AppContextButtons
        mode={mode}
        language={language}
        direction={direction}
        changeMode={changeMode}
        changeLanguage={changeLanguage}
        changeDirection={changeDirection}
      />

      {isLoading && <SBText className="py-5">Loading ...</SBText>}
      {isError && <SBText className="py-5">Error: {error}</SBText>}

      <Button
        disabled={isLoading}
        onPress={() =>
          login({username: 'w157mumo@saib.com.sa', password: 'Pass@123'})
        }>
        Sign In
      </Button>
    </SBLayoutView>
  )
}

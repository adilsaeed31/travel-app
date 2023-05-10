import React, {useContext} from 'react'
import {Layout, Text, Button} from '@ui-kitten/components'
import {styled} from 'nativewind'
import {TextView} from '@Components'
import {AppContext, AuthContext, AuthProviderProps} from '@Context'
import SvgSaibLogo from '../../assets/icons/SaibLogo'

// Below is the UI kitten component Layout
const SBLayoutView = styled(Layout)
const SBText = styled(Text)

export default function AuthFeature() {
  const {changeLanguage} = useContext(AppContext)

  const {isLoading, isError, error} = useContext<AuthProviderProps>(AuthContext)

  return (
    <SBLayoutView className="flex-1 px-5 pt-20 pb-8">
      <SBLayoutView className="flex-1 items-center justify-center">
        <SvgSaibLogo />
      </SBLayoutView>

      <TextView>My RTL</TextView>

      {isLoading && <SBText className="py-5">Loading ...</SBText>}
      {isError && <SBText className="py-5">Error: {error}</SBText>}

      <Button disabled={isLoading} onPress={() => changeLanguage?.()}>
        Sign In
      </Button>
    </SBLayoutView>
  )
}

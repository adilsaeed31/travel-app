import React, {useContext} from 'react'
import {Layout, Text, Button} from '@ui-kitten/components'
import {styled} from 'nativewind'
import {TextView} from '@Components'
import {AppContext, AuthContext, AuthProviderProps} from '@Context'
import SvgSaibLogo from '../../assets/icons/SaibLogo'
import {useStore} from '@Store'
import {getLanguage, isRTL} from '@Utils'

const primaryColor = {
  color: '#F8D03B',
  fontFamily: 'Co Text',
  fontWeight: '500',
}

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
  const setIsRTL = useStore(state => state.setIsRTL)
  const isRTLs = useStore(state => state.isRTL)

  return (
    <SBLayoutView className="flex-1 px-5 pt-20 pb-8">
      <SBLayoutView className="flex-1 items-center justify-center">
        <SvgSaibLogo />
      </SBLayoutView>

      <TextView>My RTL</TextView>

      {isLoading && <SBText className="py-5">Loading ...</SBText>}
      {isError && <SBText className="py-5">Error: {error}</SBText>}

      <Button
        disabled={isLoading}
        onPress={
          () => {
            setIsRTL(!isRTLs)
          }
          // login({username: 'w157mumo@saib.com.sa', password: 'Pass@123'})
        }>
        Sign In
      </Button>
    </SBLayoutView>
  )
}

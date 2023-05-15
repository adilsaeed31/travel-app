import React, {useState, useContext} from 'react'
import {Layout, Text, Button} from '@ui-kitten/components'
import {styled} from 'nativewind'
import {TextView} from '@Components'
import {AppContext, AuthContext} from '@Context'
import {SaibLogo} from '@Assets'
import {useTranslation} from 'react-i18next'
import SvgLoginSvg from '../../assets/illustrations/LoginSvg'
import Svg3 from '../../assets/illustrations/3'
import Svg4 from '../../assets/illustrations/4'
import Svg5 from '../../assets/illustrations/5'
// import Svg1 from '../../assets/illustrations/1'

// Below is the UI kitten component Layout
const SBLayoutView = styled(Layout)
const SBText = styled(Text)

export default function IntroFeature() {
  // const {changeLanguage} = useContext(AppContext)
  // const {t} = useTranslation()
  // const {isLoading, isError, error} = useContext(AuthContext)
  const [next, setNext] = useState<any>(1)

  return (
    <>
      {next === 1 && <Svg3 onPress={() => setNext(2)} />}
      {next === 2 && <Svg4 onPress={() => setNext(3)} />}
      {next === 3 && <Svg5 onPress={() => setNext(4)} />}
      {next === 4 && <SvgLoginSvg onPress={() => setNext(1)} />}
    </>
  )
}

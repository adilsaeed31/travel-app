import React from 'react'
import {TCTextView, TCButton} from '@Components'

import {useStore} from '@Store'

const HelpScreen: React.FC = () => {
  const reset = useStore(state => state?.reset)
  const setUser = useStore(state => state?.setUser)

  return (
    <>
      <TCTextView>Help Screen</TCTextView>
      <TCButton
        onPress={() => {
          reset()
          setUser(null)
        }}>
        <TCTextView>Logout</TCTextView>
      </TCButton>
    </>
  )
}

export default HelpScreen

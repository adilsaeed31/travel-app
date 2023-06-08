import styled from 'styled-components/native'
import {vh, vw} from '@Utils'

interface SpacerProps {
  horizontal?: boolean
  size: number
}

const Spacer = styled.View<SpacerProps>`
  ${({horizontal, size}) => {
    if (horizontal) {
      return `
        margin-left: ${vw(size)}px;
      `
    } else {
      return `
        margin-top: ${vh(size)}px;
      `
    }
  }};
`

export default Spacer

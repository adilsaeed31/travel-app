import styled from 'styled-components/native'

interface SpacerProps {
  horizontal: boolean
  size: number
}

const Spacer = styled.View<SpacerProps>`
  ${({horizontal, size}) => {
    if (horizontal) {
      return `
        margin-left: ${size}px;
      `
    } else {
      return `
        margin-top: ${size}px;
      `
    }
  }};
`

export default Spacer

import * as React from 'react'
import Svg, {Path} from 'react-native-svg'
const SvgBar = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={63}
    height={4}
    fill="none"
    {...props}>
    <Path fill="#FFD900" d="M0 4a4 4 0 0 1 4-4h55a4 4 0 0 1 4 4H0Z" />
  </Svg>
)
export default SvgBar

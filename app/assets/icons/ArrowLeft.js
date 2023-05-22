import * as React from 'react'
import Svg, {Path} from 'react-native-svg'
const SvgArrowLeft = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={21}
    fill="none"
    {...props}>
    <Path
      fill="#4F4F4F"
      fillRule="evenodd"
      d="M9.537 20.083.292 10.946a.975.975 0 0 1 0-1.392L9.537.417a1.456 1.456 0 0 1 2.04 0c.563.557.563 1.46 0 2.016L3.67 10.251l7.909 7.815c.562.557.562 1.46 0 2.017a1.456 1.456 0 0 1-2.04 0Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default SvgArrowLeft

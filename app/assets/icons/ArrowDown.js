import * as React from 'react'
import Svg, {Path} from 'react-native-svg'
const SvgArrowDown = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={10}
    fill="none"
    {...props}>
    <Path
      fill="#586067"
      d="M0 1.673 1.365.327 8 6.962 14.635.327 16 1.673l-8 8-8-8Z"
    />
  </Svg>
)
export default SvgArrowDown

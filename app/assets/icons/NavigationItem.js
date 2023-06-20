import * as React from 'react'
import Svg, {Path} from 'react-native-svg'
const SvgNavigationItem = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={10}
    height={16}
    fill="none"
    {...props}>
    <Path
      fill="#586067"
      d="M1.673 16 .327 14.635 6.962 8 .327 1.365 1.673 0l8 8-8 8Z"
    />
  </Svg>
)
export default SvgNavigationItem

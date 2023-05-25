import * as React from 'react'
import Svg, {Path} from 'react-native-svg'
const SvgSearch = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}>
    <Path
      fill="#9F9FA7"
      fillRule="evenodd"
      d="M6 1.333A4.672 4.672 0 0 1 10.667 6 4.673 4.673 0 0 1 6 10.667 4.672 4.672 0 0 1 1.333 6 4.672 4.672 0 0 1 6 1.333ZM6 12c1.42 0 2.726-.5 3.755-1.328l5.106 5.132a.666.666 0 1 0 .945-.941l-5.112-5.138A5.963 5.963 0 0 0 12 6C12 2.69 9.31 0 6 0S0 2.69 0 6c0 3.308 2.691 6 6 6Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default SvgSearch

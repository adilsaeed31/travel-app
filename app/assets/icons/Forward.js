import * as React from 'react'
import Svg, {Path} from 'react-native-svg'
const SvgForward = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={8}
    height={14}
    fill="none"
    {...props}>
    <Path
      fill="#9A9A9A"
      fillRule="evenodd"
      d="M.234.228a.816.816 0 0 1 1.132 0l6.4 6.222a.763.763 0 0 1 0 1.1l-6.4 6.222a.816.816 0 0 1-1.132 0 .763.763 0 0 1 0-1.1L6.07 7 .234 1.328a.763.763 0 0 1 0-1.1Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default SvgForward

import * as React from 'react'
import Svg, {Path} from 'react-native-svg'
const SvgPlusIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={18}
    fill="none"
    {...props}>
    <Path
      fill="#9D9C99"
      d="M9.375 2.125c0-.691-.559-1.25-1.25-1.25s-1.25.559-1.25 1.25V7.75H1.25C.559 7.75 0 8.309 0 9s.559 1.25 1.25 1.25h5.625v5.625c0 .691.559 1.25 1.25 1.25s1.25-.559 1.25-1.25V10.25H15c.691 0 1.25-.559 1.25-1.25S15.691 7.75 15 7.75H9.375V2.125Z"
    />
  </Svg>
)
export default SvgPlusIcon

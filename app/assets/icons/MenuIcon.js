import * as React from 'react'
import Svg, {Path} from 'react-native-svg'
const SvgMenuIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}>
    <Path
      fill="#646464"
      fillRule="evenodd"
      d="M1.25 2.5A.75.75 0 0 1 2 1.75h8.5a.75.75 0 0 1 .75.75v8a.75.75 0 0 1-.75.75H2a.75.75 0 0 1-.75-.75v-8Zm1.5.75v6.5h7v-6.5h-7ZM1.25 13.5a.75.75 0 0 1 .75-.75h8.5a.75.75 0 0 1 .75.75v8a.75.75 0 0 1-.75.75H2a.75.75 0 0 1-.75-.75v-8Zm1.5.75v6.5h7v-6.5h-7ZM12.75 2.5a.75.75 0 0 1 .75-.75H22a.75.75 0 0 1 .75.75v8a.75.75 0 0 1-.75.75h-8.5a.75.75 0 0 1-.75-.75v-8Zm1.5.75v6.5h7v-6.5h-7ZM12.75 21.5c0 .414.336.75.75.75H16a.75.75 0 0 0 0-1.5h-1.75v-6.5h7v6.5H20a.75.75 0 0 0 0 1.5h2a.75.75 0 0 0 .75-.75v-8a.75.75 0 0 0-.75-.75h-8.5a.75.75 0 0 0-.75.75v8Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default SvgMenuIcon

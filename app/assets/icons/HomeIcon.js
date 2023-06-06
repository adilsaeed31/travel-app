import * as React from 'react'
import Svg, {Path} from 'react-native-svg'
const SvgHomeIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={21}
    height={20}
    fill="none"
    {...props}>
    <Path
      fill="#393939"
      fillRule="evenodd"
      d="M11.313 2.013a1.25 1.25 0 0 0-1.626 0l-5 4.286a1.25 1.25 0 0 0-.437.949v9.08c0 .69.56 1.25 1.25 1.25h5a.75.75 0 1 1 0 1.5h-5a2.75 2.75 0 0 1-2.75-2.75v-9.08c0-.803.35-1.566.96-2.088l5-4.286a2.75 2.75 0 0 1 3.58 0l5 4.286c.61.522.96 1.285.96 2.088v9.08a2.75 2.75 0 0 1-2.75 2.75h-1a.75.75 0 0 1 0-1.5h1c.69 0 1.25-.56 1.25-1.25v-9.08c0-.365-.16-.712-.436-.95l-5-4.285Z"
      clipRule="evenodd"
    />
    <Path
      fill="#393939"
      fillRule="evenodd"
      d="M11.305 1.794a1.25 1.25 0 0 0-1.61 0L1.483 8.709a.75.75 0 1 1-.966-1.147L8.729.646a2.75 2.75 0 0 1 3.542 0l8.212 6.916a.75.75 0 1 1-.966 1.147l-8.212-6.915ZM10 11.078c-.69 0-1.25.56-1.25 1.25v4h-1.5v-4A2.75 2.75 0 0 1 10 9.578h1a2.75 2.75 0 0 1 2.75 2.75v4h-1.5v-4c0-.69-.56-1.25-1.25-1.25h-1Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default SvgHomeIcon

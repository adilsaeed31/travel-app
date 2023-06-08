import * as React from 'react'
import Svg, {Path} from 'react-native-svg'
const SvgClose = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}>
    <Path
      fill="#4F4F4F"
      fillRule="evenodd"
      d="M15.95 14.821a1.143 1.143 0 0 0-.333-.842l-4.962-4.836-1.163-1.119 6.125-5.955A1.169 1.169 0 0 0 16 1.215c0-.168-.026-.325-.1-.47a1.238 1.238 0 0 0-.26-.396 1.478 1.478 0 0 0-.408-.265A1.315 1.315 0 0 0 14.751 0c-.161 0-.322.036-.483.096-.149.06-.285.157-.396.265L8.019 6.05 2.129.326a1.267 1.267 0 0 0-1.72.024 1.14 1.14 0 0 0-.36.83c-.012.313.112.614.335.842l4.961 4.836 1.163 1.119L.384 13.93a1.17 1.17 0 0 0-.384.854c0 .168.025.325.099.47.062.143.148.288.26.396.124.108.26.205.408.265.149.06.322.084.483.084.16 0 .321-.036.482-.096.149-.06.285-.157.396-.265l5.854-5.69 5.89 5.726a1.267 1.267 0 0 0 1.72-.024 1.14 1.14 0 0 0 .359-.83Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default SvgClose
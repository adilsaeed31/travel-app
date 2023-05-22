import * as React from 'react'
import Svg, {Path} from 'react-native-svg'
const SvgEye = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}>
    <Path
      fill="#1E1E1E"
      fillOpacity={0.3}
      fillRule="evenodd"
      d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-1.414 2.586a2 2 0 1 1 2.828 2.828 2 2 0 0 1-2.828-2.828Z"
      clipRule="evenodd"
    />
    <Path
      fill="#1E1E1E"
      fillOpacity={0.3}
      fillRule="evenodd"
      d="M12 4c-4.71 0-8.645 3.28-9.959 7.716a1 1 0 0 0 0 .568C3.355 16.721 7.29 20 12 20c4.712 0 8.645-3.28 9.959-7.716a1 1 0 0 0 0-.568C20.645 7.279 16.712 4 12 4Zm0 14c-3.638 0-6.785-2.473-7.952-6C5.215 8.473 8.362 6 12 6c3.639 0 6.785 2.473 7.952 6-1.167 3.527-4.313 6-7.952 6Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default SvgEye

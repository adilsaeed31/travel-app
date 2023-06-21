import * as React from 'react'
import Svg, {Path} from 'react-native-svg'
const SvgArrowDown = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={24}
    fill="none"
    {...props}>
    <Path
      fill="#93989D"
      fillRule="evenodd"
      d="M20.087 7.413a1.412 1.412 0 0 1 0 1.997l-6.589 6.588a1.412 1.412 0 0 1-1.996 0l-3.294-3.294a1.412 1.412 0 0 1 1.996-1.996l2.296 2.296 5.59-5.59a1.412 1.412 0 0 1 1.997 0Zm-12.353 2.82a1.412 1.412 0 0 1-1.997 0l-.824-.823A1.412 1.412 0 1 1 6.91 7.413l.824.824a1.412 1.412 0 0 1 0 1.997Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default SvgArrowDown

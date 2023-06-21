import * as React from 'react'
import Svg, {Path} from 'react-native-svg'
const SvgArrowLeft = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}>
    <Path
      fill="#0E1215"
      fillRule="evenodd"
      d="M15.586 19.587a1.412 1.412 0 0 1-1.996 0l-6.588-6.589a1.412 1.412 0 0 1 0-1.996l3.294-3.294a1.412 1.412 0 0 1 1.996 1.996L9.997 12l5.59 5.59a1.412 1.412 0 0 1 0 1.997Zm-2.82-12.353a1.412 1.412 0 0 1 0-1.997l.824-.824a1.412 1.412 0 1 1 1.996 1.997l-.823.824a1.412 1.412 0 0 1-1.997 0Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default SvgArrowLeft

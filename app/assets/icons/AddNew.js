import * as React from 'react'
import Svg, {Rect, Path} from 'react-native-svg'
const SvgAddNew = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={52}
    height={52}
    fill="none"
    {...props}>
    <Rect width={48} height={48} x={2} y={2} fill="#FFDD45" rx={24} />
    <Path
      fill="#343D45"
      fillRule="evenodd"
      d="M26 15.674c1.08 0 2.121.166 3.098.473a.837.837 0 0 0 .502-1.597A11.997 11.997 0 0 0 26 14c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12c0-3.357-1.38-6.393-3.6-8.57a.837.837 0 1 0-1.172 1.196A10.292 10.292 0 0 1 36.326 26c0 5.703-4.623 10.326-10.326 10.326S15.674 31.703 15.674 26 20.297 15.674 26 15.674Z"
      clipRule="evenodd"
    />
    <Path
      fill="#343D45"
      fillRule="evenodd"
      d="M26 18.465c.462 0 .837.375.837.837v13.395a.837.837 0 0 1-1.674 0V19.302c0-.462.375-.837.837-.837Z"
      clipRule="evenodd"
    />
    <Path
      fill="#343D45"
      fillRule="evenodd"
      d="M18.465 26c0-.463.375-.837.837-.837h13.396a.837.837 0 1 1 0 1.674H19.302a.837.837 0 0 1-.837-.837Z"
      clipRule="evenodd"
    />
    <Rect
      width={48}
      height={48}
      x={2}
      y={2}
      stroke="#F0F0F0"
      strokeWidth={4}
      rx={24}
    />
  </Svg>
)
export default SvgAddNew

import * as React from 'react'
import Svg, {Rect, Path} from 'react-native-svg'
const SvgAddCurrencyIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={46}
    height={46}
    fill="none"
    {...props}>
    <Rect width={42} height={42} x={2} y={2} fill="#FFDD45" rx={21} />
    <Path
      fill="#343D45"
      fillRule="evenodd"
      d="M23 15.465c.462 0 .837.375.837.837v13.395a.837.837 0 0 1-1.674 0V16.302c0-.462.375-.837.837-.837Z"
      clipRule="evenodd"
    />
    <Path
      fill="#343D45"
      fillRule="evenodd"
      d="M15.465 23c0-.463.375-.837.837-.837h13.396a.837.837 0 1 1 0 1.674H16.302a.837.837 0 0 1-.837-.837Z"
      clipRule="evenodd"
    />
    <Path fill="#FFDD45" d="M10 18h4v2.5h-4z" />
    <Rect
      width={42}
      height={42}
      x={2}
      y={2}
      stroke="#FFF8DD"
      strokeWidth={4}
      rx={21}
    />
  </Svg>
)
export default SvgAddCurrencyIcon

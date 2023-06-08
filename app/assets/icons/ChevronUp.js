import * as React from 'react'
import Svg, {Rect, Path} from 'react-native-svg'
const SvgChevronUp = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={42}
    height={42}
    fill="none"
    {...props}>
    <Rect width={39} height={39} x={1.5} y={1.5} fill="#FDEFBA" rx={19.5} />
    <Path
      fill="#6B7278"
      fillRule="evenodd"
      d="M15.31 16.69a1.059 1.059 0 0 1 0-1.498l4.941-4.94a1.059 1.059 0 0 1 1.498 0l2.47 2.47a1.059 1.059 0 1 1-1.497 1.497L21 12.497l-4.192 4.193a1.059 1.059 0 0 1-1.498 0Zm9.265-2.115a1.059 1.059 0 0 1 1.497 0l.618.618a1.059 1.059 0 1 1-1.498 1.497l-.617-.618a1.059 1.059 0 0 1 0-1.497Z"
      clipRule="evenodd"
    />
    <Path
      fill="#A8ACB0"
      fillRule="evenodd"
      d="M16.258 22.742a.883.883 0 0 1 0-1.248l4.118-4.118a.882.882 0 0 1 1.248 0l2.059 2.059a.882.882 0 1 1-1.248 1.248L21 19.248l-3.494 3.494a.883.883 0 0 1-1.248 0Zm7.721-1.763a.882.882 0 0 1 1.248 0l.515.515a.883.883 0 0 1-1.248 1.248l-.515-.515a.882.882 0 0 1 0-1.248Z"
      clipRule="evenodd"
      opacity={0.75}
    />
    <Path
      fill="#A8ACB0"
      fillRule="evenodd"
      d="M16.258 29.742a.883.883 0 0 1 0-1.248l4.118-4.118a.882.882 0 0 1 1.248 0l2.059 2.059a.882.882 0 1 1-1.248 1.248L21 26.248l-3.494 3.494a.883.883 0 0 1-1.248 0Zm7.721-1.763a.882.882 0 0 1 1.248 0l.515.515a.883.883 0 0 1-1.248 1.248l-.515-.515a.882.882 0 0 1 0-1.248Z"
      clipRule="evenodd"
      opacity={0.3}
    />
    <Rect
      width={39}
      height={39}
      x={1.5}
      y={1.5}
      stroke="#fff"
      strokeWidth={3}
      rx={19.5}
    />
  </Svg>
)
export default SvgChevronUp

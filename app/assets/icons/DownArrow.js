import * as React from 'react'
import Svg, {Rect, Path} from 'react-native-svg'
const SvgDownArrow = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    fill="none"
    {...props}>
    <Rect width={27} height={27} x={1.5} y={1.5} fill="#FFDD45" rx={13.5} />
    <Path
      fill="#393939"
      fillRule="evenodd"
      d="M19.742 13.258a.883.883 0 0 1 0 1.248l-4.118 4.118a.882.882 0 0 1-1.248 0l-2.059-2.059a.882.882 0 1 1 1.248-1.248L15 16.752l3.494-3.494a.883.883 0 0 1 1.248 0Zm-7.721 1.763a.882.882 0 0 1-1.248 0l-.515-.515a.882.882 0 0 1 1.248-1.248l.515.515a.882.882 0 0 1 0 1.248Z"
      clipRule="evenodd"
    />
    <Rect
      width={27}
      height={27}
      x={1.5}
      y={1.5}
      stroke="#fff"
      strokeWidth={3}
      rx={13.5}
    />
  </Svg>
)
export default SvgDownArrow

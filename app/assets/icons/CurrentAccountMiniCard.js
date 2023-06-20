import * as React from 'react'
import Svg, {Rect, Path} from 'react-native-svg'
const SvgCurrentAccountMiniCard = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={48}
    height={32}
    fill="none"
    {...props}>
    <Rect width={46.059} height={31} x={0.5} y={0.5} fill="#fff" rx={7.5} />
    <Path fill="#424242" d="M28 6h12v8H28z" />
    <Rect
      width={46.059}
      height={31}
      x={0.5}
      y={0.5}
      stroke="#2B2B2B"
      rx={7.5}
    />
  </Svg>
)
export default SvgCurrentAccountMiniCard

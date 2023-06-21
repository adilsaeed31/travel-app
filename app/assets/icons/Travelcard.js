import * as React from 'react'
import Svg, {Rect, Path} from 'react-native-svg'
const SvgTravelcard = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={48}
    height={32}
    fill="none"
    {...props}>
    <Rect width={47.059} height={32} fill="#586067" rx={8} />
    <Path fill="#FFD900" d="M28 6h12v8H28z" />
  </Svg>
)
export default SvgTravelcard

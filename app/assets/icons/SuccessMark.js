import * as React from 'react'
import Svg, {G, Circle, Path, Defs} from 'react-native-svg'
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const SvgSuccessMark = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={164}
    height={164}
    fill="none"
    {...props}>
    <G filter="url(#successMark_svg__a)">
      <Circle cx={82} cy={78} r={70} fill="#fff" />
    </G>
    <Circle cx={82} cy={78} r={70} fill="#fff" />
    <Circle
      cx={82}
      cy={78}
      r={59.195}
      fill="#2ECC71"
      fillOpacity={0.04}
      stroke="#2ECC71"
      strokeWidth={4}
    />
    <Path
      fill="#2ECC71"
      stroke="#fff"
      strokeWidth={2}
      d="m75.26 86.364.701.69.702-.69 25.207-24.796a3.208 3.208 0 0 1 4.479 0 3.046 3.046 0 0 1 0 4.361L75.961 95.822l-17.43-17.147a3.045 3.045 0 0 1 0-4.361 3.208 3.208 0 0 1 4.48 0l12.25 12.05Z"
    />
    <Defs></Defs>
  </Svg>
)
export default SvgSuccessMark

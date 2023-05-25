import * as React from 'react'
import Svg, {G, Circle, Path, Defs} from 'react-native-svg'
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const SvgWarningIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={164}
    height={164}
    fill="none"
    {...props}>
    <G filter="url(#WarningIcon_svg__a)">
      <Circle cx={82} cy={78} r={70} fill="#fff" />
    </G>
    <Circle cx={82} cy={78} r={70} fill="#fff" />
    <Circle cx={82} cy={78} r={59.195} stroke="#F1C40F" strokeWidth={4} />
    <Path
      fill="#F1C40F"
      stroke="#fff"
      strokeWidth={2}
      d="m75.26 86.364.702.69.701-.69 25.207-24.797a3.208 3.208 0 0 1 4.479 0 3.046 3.046 0 0 1 0 4.362L75.962 95.822l-17.43-17.147a3.046 3.046 0 0 1 0-4.361 3.208 3.208 0 0 1 4.479 0l12.25 12.05Z"
    />
    <Circle cx={82.195} cy={78.195} r={59.195} fill="#fff" />
    <Circle
      cx={82.195}
      cy={78.195}
      r={59.195}
      fill="#F1C40F"
      fillOpacity={0.04}
    />
    <Circle
      cx={82.195}
      cy={78.195}
      r={59.195}
      stroke="#F1C40F"
      strokeWidth={4}
    />
    <Path
      fill="#F1C40F"
      d="M79.696 86.946v-31.94h5.607v31.94h-5.607Zm0 15.048v-5.606h5.607v5.606h-5.607Z"
    />
    <Defs></Defs>
  </Svg>
)
export default SvgWarningIcon

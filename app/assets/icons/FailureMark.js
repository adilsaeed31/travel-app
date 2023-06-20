import * as React from 'react'
import Svg, {G, Circle, Path, Defs} from 'react-native-svg'
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const SvgFailureMark = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={164}
    height={164}
    fill="none"
    {...props}>
    <G filter="url(#failureMark_svg__a)">
      <Circle cx={82} cy={78} r={70} fill="#fff" />
    </G>
    <Circle cx={82} cy={78} r={70} fill="#fff" />
    <Circle
      cx={82}
      cy={78}
      r={59.195}
      fill="#F8D03B"
      fillOpacity={0.04}
      stroke="#F8D03B"
      strokeWidth={4}
    />
    <Path
      fill="#F8D03B"
      stroke="#fff"
      strokeWidth={2}
      d="m75.26 86.364.701.69.702-.69 25.207-24.796a3.208 3.208 0 0 1 4.479 0 3.046 3.046 0 0 1 0 4.361L75.961 95.822l-17.43-17.147a3.045 3.045 0 0 1 0-4.36 3.208 3.208 0 0 1 4.48 0l12.25 12.05Z"
    />
    <Circle cx={82.195} cy={78.195} r={59.195} fill="#fff" />
    <Circle
      cx={82.195}
      cy={78.195}
      r={59.195}
      fill="#F54D3F"
      fillOpacity={0.04}
    />
    <Circle
      cx={82.195}
      cy={78.195}
      r={59.195}
      stroke="#E74C3C"
      strokeWidth={4}
    />
    <Path
      fill="#E74C3C"
      stroke="#fff"
      strokeWidth={1.4}
      d="M88.047 76.993a1.7 1.7 0 0 0 0 2.404l12.946 12.946a.3.3 0 0 1 0 .424l-4.226 4.226a.3.3 0 0 1-.424 0L83.397 84.047a1.7 1.7 0 0 0-2.404 0L68.047 96.993l.495.495-.495-.495a.3.3 0 0 1-.424 0l-.495.495.495-.495-4.226-4.226a.3.3 0 0 1 0-.424l12.946-12.946a1.7 1.7 0 0 0 0-2.404L63.397 64.047l-.48.48.48-.48a.3.3 0 0 1 0-.424l4.226-4.226-.495-.495.495.495a.3.3 0 0 1 .424 0l12.946 12.946a1.7 1.7 0 0 0 2.404 0l12.946-12.946a.3.3 0 0 1 .424 0l4.226 4.226.495-.495-.495.495a.3.3 0 0 1 0 .424l.495.495-.495-.495-12.946 12.946Z"
    />
    <Defs></Defs>
  </Svg>
)
export default SvgFailureMark

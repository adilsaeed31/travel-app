import * as React from 'react'
import Svg, {Circle, Path} from 'react-native-svg'
const SvgCheckWarning = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={140}
    height={140}
    fill="none"
    {...props}>
    <Circle cx={70} cy={70} r={70} fill="#fff" />
    <Circle
      cx={70}
      cy={70}
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
      d="m63.26 78.364.702.69.701-.69L89.87 53.567a3.208 3.208 0 0 1 4.479 0 3.045 3.045 0 0 1 0 4.362L63.962 87.82l-17.43-17.146a3.045 3.045 0 0 1 0-4.361 3.208 3.208 0 0 1 4.479 0l12.25 12.05Z"
    />
  </Svg>
)
export default SvgCheckWarning

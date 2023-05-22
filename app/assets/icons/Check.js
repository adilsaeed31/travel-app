import * as React from 'react'
import Svg, {Path} from 'react-native-svg'
const SvgCheck = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={11}
    height={8}
    fill="none"
    {...props}>
    <Path
      fill="#131109"
      d="M3.915 5.682 8.754.843a.745.745 0 1 1 1.053 1.053L3.915 7.788.493 4.366a.745.745 0 0 1 1.054-1.053l2.368 2.369Z"
    />
  </Svg>
)
export default SvgCheck

import * as React from 'react'
import Svg, {Path} from 'react-native-svg'
const SvgStop = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={21}
    height={21}
    fill="none"
    {...props}>
    <Path
      fill="#343D45"
      d="M9.25 20.31v-4.634l-3.57 3.556-1.3-1.276 4.87-4.871V11.06H7.226l-4.77 4.77-1.327-1.25 3.506-3.52H0V9.25h4.635l-3.58-3.595 1.3-1.3L7.226 9.25H9.25V7.187L4.48 2.43l1.275-1.326L9.25 4.61V0h1.81v4.61l3.595-3.58 1.277 1.3-4.871 4.857V9.25h2.063l4.781-4.796 1.301 1.276-3.505 3.52h4.61v1.81H15.7l3.53 3.57-1.25 1.302-4.857-4.871H11.06v2.024l4.87 4.895-1.25 1.302-3.62-3.606v4.635H9.25Z"
    />
  </Svg>
)
export default SvgStop

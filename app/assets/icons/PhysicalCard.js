import * as React from 'react'
import Svg, {Path} from 'react-native-svg'
const SvgPhysicalCard = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}>
    <Path
      fill="#000"
      stroke="#fff"
      strokeWidth={0.3}
      d="M.69 10.294c-.774.443-.702 1.627.124 1.97l5.481 2.285.092.039v4.135a1.125 1.125 0 0 0 1.993.72l2.422-2.902.07-.085.103.042 4.84 2.016a1.11 1.11 0 0 0 1.508-.85l2.5-16.25A1.096 1.096 0 0 0 19.36.343a1.104 1.104 0 0 0-1.17-.049l-17.5 10Zm0 0 17.5-10-17.5 10Zm1.887.736-.265.151.282.118 4.808 2.004.074-.122.049.044 8.578-9.586-.186-.23-13.34 7.621Zm13.107 5.726.176.074.03-.19 1.855-12.062.077-.5-.337.377-8.363 9.348-.141.157.195.08 6.508 2.716Z"
    />
  </Svg>
)
export default SvgPhysicalCard

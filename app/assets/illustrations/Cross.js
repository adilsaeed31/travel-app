import * as React from 'react'
import Svg, {Circle, Path} from 'react-native-svg'
const SvgCross = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={140}
    height={140}
    fill="none"
    {...props}>
    <Circle cx={70} cy={70} r={59.195} fill="#fff" />
    <Circle cx={70} cy={70} r={59.195} fill="#F54D3F" fillOpacity={0.08} />
    <Circle cx={70} cy={70} r={59.195} stroke="#F54D3F" strokeWidth={4} />
    <Path
      fill="#F54D3F"
      stroke="#fff"
      strokeWidth={1.4}
      d="M75.852 68.798a1.7 1.7 0 0 0 0 2.404l12.946 12.946a.3.3 0 0 1 0 .424l-4.226 4.226a.3.3 0 0 1-.424 0L71.202 75.852a1.7 1.7 0 0 0-2.404 0L55.852 88.798l.495.495-.495-.495a.3.3 0 0 1-.424 0l-.495.495.495-.495-4.226-4.226a.3.3 0 0 1 0-.424l12.946-12.946a1.7 1.7 0 0 0 0-2.404L51.202 55.852l-.48.48.48-.48a.3.3 0 0 1 0-.424l4.226-4.226-.495-.495.495.495a.3.3 0 0 1 .424 0l12.946 12.946a1.7 1.7 0 0 0 2.404 0l12.946-12.946a.3.3 0 0 1 .424 0l4.226 4.226.495-.495-.495.495a.3.3 0 0 1 0 .424l.495.495-.495-.495-12.946 12.946Z"
    />
  </Svg>
)
export default SvgCross

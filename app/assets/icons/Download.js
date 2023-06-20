import * as React from 'react'
import Svg, {Path} from 'react-native-svg'
const SvgDownload = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}>
    <Path
      fill="#B7B7B7"
      d="M1.933 16c-.49 0-.912-.178-1.264-.533a1.747 1.747 0 0 1-.528-1.274v-3.808h1.792v3.81h12.134v-3.81h1.792v3.804c0 .494-.178.92-.535 1.276a1.72 1.72 0 0 1-1.257.535H1.933Zm6.073-4.344L3.18 6.843l1.292-1.28 2.638 2.65V0h1.792v8.214l2.638-2.65 1.293 1.279-4.827 4.813Z"
    />
  </Svg>
)
export default SvgDownload

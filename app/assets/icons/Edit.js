import * as React from 'react'
import Svg, {Path} from 'react-native-svg'
const SvgEdit = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={24}
    fill="none"
    {...props}>
    <Path
      fill="#3F3D36"
      fillRule="evenodd"
      d="M24.496 2.198a.596.596 0 0 0-.178-.423l-.604-.598a.617.617 0 0 0-.867.002l-.427.429 1.469 1.453c.105-.107.256-.26.426-.43a.608.608 0 0 0 .181-.433ZM5.5 5.262v12.463A2.274 2.274 0 0 0 7.766 20h12.418a2.273 2.273 0 0 0 2.265-2.276V7.343l-1.221 1.216v9.165c0 .58-.469 1.05-1.044 1.05H7.766c-.576 0-1.045-.47-1.045-1.05V5.262c0-.578.469-1.048 1.045-1.048h9.326l1.232-1.227H7.766A2.274 2.274 0 0 0 5.5 5.262Zm7.572 5.658-.529 1.969 1.998-.519 8.917-8.886-1.466-1.454-8.92 8.89Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default SvgEdit

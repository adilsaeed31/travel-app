import * as React from 'react'
import Svg, {Path} from 'react-native-svg'
const SvgStatement = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={22}
    fill="none"
    {...props}>
    <Path
      fill="#000"
      d="M4.974 16.762h8.05v-1.566h-8.05v1.566Zm0-4.25h8.05v-1.566h-8.05v1.566ZM2.553 21.15c-.46 0-.859-.17-1.197-.507a1.636 1.636 0 0 1-.506-1.197V2.554c0-.462.168-.862.506-1.2a1.634 1.634 0 0 1 1.197-.51h9.037l5.564 5.565v13.037c0 .46-.169.86-.508 1.197-.339.338-.74.507-1.2.507H2.552ZM10.72 7.204v-4.65H2.553v16.892h12.892V7.204H10.72Z"
    />
  </Svg>
)
export default SvgStatement

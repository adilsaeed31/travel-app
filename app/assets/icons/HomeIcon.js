import * as React from 'react'
import Svg, {Path} from 'react-native-svg'
const SvgHomeIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}>
    <Path
      fill="#93989D"
      fillRule="evenodd"
      d="m2.493 11.13 1.328-1.118v9.105A2.883 2.883 0 0 0 6.704 22h5.241a.786.786 0 0 0 0-1.573H6.704a1.31 1.31 0 0 1-1.31-1.31V9.598c0-.383.167-.746.457-.995l5.242-4.493a1.31 1.31 0 0 1 1.705 0l5.242 4.493c.29.249.458.612.458.995v9.52a1.31 1.31 0 0 1-1.31 1.31h-1.05a.786.786 0 1 0 0 1.572h1.05a2.883 2.883 0 0 0 2.882-2.883v-9.105l1.328 1.118a.786.786 0 1 0 1.013-1.203l-8.609-7.25a2.883 2.883 0 0 0-3.713 0l-8.61 7.25a.786.786 0 1 0 1.014 1.203Zm7.618 3.794c0-.724.587-1.31 1.31-1.31h1.049c.723 0 1.31.586 1.31 1.31v4.193h1.573v-4.193a2.883 2.883 0 0 0-2.883-2.883H11.42a2.883 2.883 0 0 0-2.883 2.883v4.193h1.573v-4.193Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default SvgHomeIcon

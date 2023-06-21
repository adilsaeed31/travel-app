import * as React from 'react'
import Svg, {Path, Defs, Pattern, Use, Image} from 'react-native-svg'
const SvgTemporaryStop = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={311}
    height={182}
    fill="none"
    {...props}>
    <Path fill="url(#temporaryStop_svg__a)" d="M.85 0h309.3v181.941H.85z" />
    <Defs>
      <Pattern
        id="temporaryStop_svg__a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox">
        <Use
          xlinkHref="#temporaryStop_svg__b"
          transform="matrix(.00036 0 0 .00056 -.008 -.007)"
        />
      </Pattern>
      <Image
        id="temporaryStop_svg__b"
        width={2792}
        height={1806}
      />
    </Defs>
  </Svg>
)
export default SvgTemporaryStop
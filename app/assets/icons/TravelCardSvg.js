import * as React from 'react'
import Svg, {Path, Defs, Pattern, Use, Image} from 'react-native-svg'
const SvgTravelCardSvg = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={255}
    height={150}
    fill="none"
    {...props}>
    <Path fill="url(#travelCardSVG_svg__a)" d="M0 0h255v150H0z" />
    <Defs>
      <Pattern
        id="travelCardSVG_svg__a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox">
        <Use
          xlinkHref="#travelCardSVG_svg__b"
          transform="matrix(.00036 0 0 .00056 -.008 -.007)"
        />
      </Pattern>
      <Image
        id="travelCardSVG_svg__b"
        width={2792}
        height={1806}
      />
    </Defs>
  </Svg>
)
export default SvgTravelCardSvg
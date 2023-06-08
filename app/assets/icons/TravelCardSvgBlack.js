import * as React from 'react'
import Svg, {Path, Defs, Pattern, Use, Image} from 'react-native-svg'
const SvgTravelCardSvgBlack = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={255}
    height={150}
    fill="none"
    {...props}>
    <Path fill="url(#travelCardSVGBlack_svg__a)" d="M0 0h255v150H0z" />
    <Defs>
      <Pattern
        id="travelCardSVGBlack_svg__a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox">
        <Use
          xlinkHref="#travelCardSVGBlack_svg__b"
          transform="matrix(.00034 0 0 .00052 -.005 -.007)"
        />
      </Pattern>
      <Image
        id="travelCardSVGBlack_svg__b"
        width={2988}
        height={1932}
      />
    </Defs>
  </Svg>
)
export default SvgTravelCardSvgBlack
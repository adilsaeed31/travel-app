import * as React from 'react'
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg'
const SvgEurLogo = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
    {...props}>
    <G clipPath="url(#EURLogo_svg__a)" opacity={0.85}>
      <Path
        fill="#0052B4"
        d="M16 32c8.837 0 16-7.163 16-16S24.837 0 16 0 0 7.163 0 16s7.163 16 16 16Z"
      />
      <Path
        fill="#FFDA44"
        d="m15.998 6.262.518 1.594h1.676l-1.356.985.518 1.595-1.356-.986-1.356.986.518-1.595-1.356-.985h1.676l.518-1.594ZM9.112 9.114l1.493.76 1.186-1.185-.263 1.656 1.494.761-1.656.262-.262 1.656-.76-1.493-1.656.262 1.185-1.185-.761-1.494ZM6.26 16.001l1.594-.518v-1.676l.985 1.356 1.595-.518L9.448 16l.986 1.356-1.595-.518-.985 1.356V16.52l-1.594-.518ZM9.112 22.887l.76-1.494-1.184-1.185 1.655.262.761-1.493.262 1.655 1.656.262-1.493.762.262 1.655-1.186-1.185-1.493.76ZM15.998 25.74l-.518-1.594h-1.676l1.356-.985-.518-1.595 1.356.986 1.356-.986-.518 1.595 1.356.985h-1.676l-.518 1.594ZM22.886 22.887l-1.494-.761-1.185 1.185.262-1.655-1.493-.761 1.655-.263.262-1.655.761 1.493 1.656-.262-1.185 1.185.76 1.494ZM25.738 16.001l-1.594.518v1.676l-.985-1.356-1.595.518.986-1.356-.986-1.356 1.595.518.985-1.356v1.676l1.594.518ZM22.886 9.114l-.761 1.493 1.185 1.186-1.656-.263-.76 1.494-.263-1.656-1.655-.262 1.493-.761-.262-1.656 1.185 1.186 1.494-.761Z"
      />
    </G>
    <Defs>
      <ClipPath id="EURLogo_svg__a">
        <Path fill="#fff" d="M0 0h32v32H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default SvgEurLogo

import * as React from 'react'
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg'
const SvgAccountsBg = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={326}
    height={87}
    fill="none"
    {...props}>
    <G clipPath="url(#accountsBg_svg__a)">
      <Path fill="#FAFAFA" d="M0 0h326v86.549H0z" />
      <G opacity={0.08}>
        <Path
          fill="#F8D03B"
          d="M208.812 101.688a36.157 36.157 0 0 0 6.073 20.056 36.047 36.047 0 0 0 16.166 13.294 35.946 35.946 0 0 0 20.811 2.051 36 36 0 0 0 18.44-9.883 36.127 36.127 0 0 0 9.854-18.486 36.178 36.178 0 0 0-2.053-20.858 36.08 36.08 0 0 0-13.268-16.2 35.96 35.96 0 0 0-45.48 4.496 36.1 36.1 0 0 0-7.805 11.714 36.16 36.16 0 0 0-2.738 13.816Z"
        />
        <Path
          fill="#393939"
          d="m280.254 41.213 1.178 1.184a39.33 39.33 0 0 0-1.178-1.184ZM281.374 64.907l-1.069 1.098c.377-.346.733-.713 1.069-1.098Z"
        />
        <Path
          fill="#393939"
          d="m325.039 86.125-29.223-29.309-17.684 17.725 15.573 15.592 11.523 11.561s-55.567 55.695-56.588 56.73c-3.679 3.676-3.759 10.32-3.759 10.32s-.069-6.644-3.691-10.291l-56.65-56.765 27.016-27.056-17.684-17.724-31.505 31.578a20.977 20.977 0 0 0-4.655 13.379 20.976 20.976 0 0 0 4.906 13.288l82.251 82.46 79.942-80.127s6.988-6.072 7.142-15.746c.143-9.24-6.914-15.615-6.914-15.615Z"
        />
        <Path
          fill="#393939"
          d="m214.733 71.442 2.413 2.43a4.81 4.81 0 0 1-.77-2.453 3.53 3.53 0 0 1 .348-1.555c.22-.474.51-.912.861-1.298l.77-.778 26.514-26.58 26.948 27.01a4.901 4.901 0 0 1 1.42 3.173 4.064 4.064 0 0 1-.935 2.624l7.986-8.005 1.067-1.098a16.6 16.6 0 0 0 4.375-11.269 16.772 16.772 0 0 0-4.318-11.24l-1.175-1.184-35.368-35.45-37.073 37.188c-2.726 2.733-3.993 6.895-3.993 10.732a16.643 16.643 0 0 0 3.725 10.537l7.205 7.216Z"
        />
      </G>
    </G>
    <Defs>
      <ClipPath id="accountsBg_svg__a">
        <Path fill="#fff" d="M0 0h326v86.549H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default SvgAccountsBg

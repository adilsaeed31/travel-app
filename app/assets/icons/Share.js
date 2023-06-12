import * as React from 'react'
import Svg, {Circle, G, Path, Defs, ClipPath} from 'react-native-svg'
const SvgShare = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={33}
    height={33}
    fill="none"
    {...props}>
    <Circle
      cx={16.15}
      cy={16.304}
      r={15.627}
      fill="#FFFCEE"
      stroke="#FFF5CB"
      strokeWidth={0.481}
    />
    <G clipPath="url(#share_svg__a)">
      <Path
        fill="#000"
        d="M17.278 8.312a1.084 1.084 0 0 0-1.52 0l-4.297 4.25a1.056 1.056 0 0 0 0 1.504c.42.415 1.1.415 1.52 0l2.464-2.437v6.996c0 .588.48 1.063 1.074 1.063.594 0 1.074-.475 1.074-1.063V11.63l2.464 2.437c.42.415 1.101.415 1.52 0 .42-.415.42-1.089 0-1.504l-4.296-4.25h-.003Zm-6.13 11.376c0-.588-.48-1.063-1.074-1.063C9.48 18.625 9 19.1 9 19.688v2.125C9 23.573 10.443 25 12.223 25h8.593c1.779 0 3.223-1.428 3.223-3.187v-2.125c0-.588-.48-1.063-1.075-1.063-.594 0-1.074.475-1.074 1.063v2.125c0 .587-.48 1.062-1.074 1.062h-8.593a1.067 1.067 0 0 1-1.075-1.062v-2.125Z"
      />
    </G>
    <Defs>
      <ClipPath id="share_svg__a">
        <Path fill="#fff" d="M9 8h15.039v17H9z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default SvgShare

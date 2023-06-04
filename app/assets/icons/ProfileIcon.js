import * as React from 'react'
import Svg, {Circle, Path} from 'react-native-svg'
const SvgProfileIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={38}
    height={38}
    fill="none"
    {...props}>
    <Circle
      cx={19}
      cy={19}
      r={18.75}
      fill="#FCFCFA"
      stroke="#D2D5D7"
      strokeWidth={0.5}
    />
    <Path
      fill="#6B7278"
      fillRule="evenodd"
      d="M14.964 14.91a4.49 4.49 0 0 1 8.981 0c0 2.48-2.01 4.09-4.49 4.09-2.48 0-4.491-1.61-4.491-4.09ZM19.454 9a5.91 5.91 0 0 0-5.909 5.91c0 1.958.954 3.55 2.421 4.51-3.416.971-6.087 3.542-6.897 6.806C8.674 27.82 10.048 29 11.422 29H19c.392 0 .71-.32.71-.714a.712.712 0 0 0-.71-.715h-7.578c-.717 0-1.086-.55-.975-.999.862-3.47 4.323-6.143 8.553-6.143s7.691 2.673 8.552 6.143c.112.448-.257 1-.974 1h-2.842c-.392 0-.71.32-.71.714 0 .394.318.714.71.714h2.841c1.375 0 2.75-1.18 2.354-2.774-.762-3.07-3.171-5.528-6.298-6.617 1.642-.932 2.73-2.606 2.73-4.7A5.91 5.91 0 0 0 19.455 9Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default SvgProfileIcon

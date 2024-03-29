import * as React from 'react'
import Svg, {Circle, Path} from 'react-native-svg'
const SvgReturn = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={140}
    height={140}
    fill="none"
    {...props}>
    <Circle cx={70} cy={70} r={59.195} fill="#fff" />
    <Circle cx={70} cy={70} r={59.195} fill="#F54D3F" fillOpacity={0.08} />
    <Circle cx={70} cy={70} r={59.195} stroke="#F54D3F" strokeWidth={4} />
    <Path
      fill="#F54D3F"
      d="M84.38 79.457a1 1 0 0 1 0-1.414l6.663-6.663a1 1 0 0 0 0-1.415l-1.758-1.758a1 1 0 0 0-1.415 0l-6.663 6.663a1 1 0 0 1-1.414 0l-6.663-6.663a1 1 0 0 0-1.415 0l-1.758 1.758a1 1 0 0 0 0 1.415l6.663 6.663a1 1 0 0 1 0 1.414l-6.663 6.663a1 1 0 0 0 0 1.415l1.758 1.758a1 1 0 0 0 1.415 0l6.663-6.663a1 1 0 0 1 1.414 0l6.663 6.663a1 1 0 0 0 1.415 0l1.758-1.758a1 1 0 0 0 0-1.415l-6.663-6.663Z"
    />
    <Path
      fill="#F54D3F"
      stroke="#F54D3F"
      d="M66.183 49.5h-.003a16.911 16.911 0 0 0-16.862 16.862v7.249l-4.055-4.056-.354-.353-.353.353-1.91 1.91-.353.353.353.354 8.182 8.182.354.353.353-.353 8.182-8.182.354-.354-.354-.353-1.909-1.91-.353-.353-.354.353-4.056 4.056v-7.247a13.137 13.137 0 0 1 26.273 0v4.59h3.728v-4.592A16.91 16.91 0 0 0 66.182 49.5Z"
    />
  </Svg>
)
export default SvgReturn

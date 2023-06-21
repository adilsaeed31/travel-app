import * as React from 'react'
import Svg, {Path} from 'react-native-svg'
const SvgViewPin = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={22}
    fill="none"
    {...props}>
    <Path
      fill="#000"
      d="M1.98 7.037h9.298V4.951c0-.833-.281-1.534-.845-2.103-.563-.569-1.254-.853-2.073-.853-.82 0-1.513.284-2.08.853-.568.57-.852 1.27-.852 2.1h-1.98c0-1.377.476-2.545 1.429-3.506C5.83.48 6.988 0 8.353 0c1.364 0 2.523.481 3.476 1.444.953.962 1.43 2.13 1.43 3.504v2.089h1.467a1.92 1.92 0 0 1 1.409.586c.39.39.586.86.586 1.409v10.595a1.9 1.9 0 0 1-.586 1.399c-.39.388-.86.582-1.409.582H1.98c-.544 0-1.01-.194-1.398-.582A1.907 1.907 0 0 1 0 19.627V9.032c0-.549.194-1.019.582-1.41a1.9 1.9 0 0 1 1.398-.585Zm0 12.59h12.746V9.032H1.98v10.595Zm6.377-3.373c.531 0 .984-.183 1.359-.55.375-.368.562-.809.562-1.325 0-.5-.189-.954-.566-1.362-.378-.409-.832-.613-1.363-.613-.53 0-.983.204-1.358.613-.375.408-.563.867-.563 1.375s.19.946.567 1.312c.378.367.832.55 1.362.55Z"
    />
  </Svg>
)
export default SvgViewPin
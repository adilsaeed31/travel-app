import * as React from 'react'
import Svg, {Rect, G, Path, Defs, ClipPath} from 'react-native-svg'
const SvgLoadCard = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={36}
    height={36}
    fill="none"
    {...props}>
    <Rect width={36} height={36} fill="#FFEEA6" rx={18} />
    <G
      fill="#343D45"
      fillRule="evenodd"
      clipPath="url(#LoadCard_svg__a)"
      clipRule="evenodd">
      <Path d="M7 13.667c0-.368.314-.667.702-.667h20.596c.388 0 .702.299.702.667v14.666c0 .369-.314.667-.702.667H7.702C7.314 29 7 28.701 7 28.333V19c0-.368.314-.667.702-.667.388 0 .702.299.702.667v7.333c0 .491.41 1.334.917 1.334h16.441c1.013 0 1.834-.796 1.834-1.778l.027-10.61a.944.944 0 0 0-.944-.946H9.293a.889.889 0 0 0-.889.89v.221c0 .369-.314.667-.702.667-.388 0-.702-.298-.702-.667v-1.777Z" />
      <Path d="M29 13H7v16h22V13Zm-18.5 1.5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h15a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-15Z" />
      <Path d="M16 24.75a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1 0-1.5h4.5a.75.75 0 0 1 .75.75ZM25 20.75a.75.75 0 0 1-.75.75h-13.5a.75.75 0 0 1 0-1.5h13.5a.75.75 0 0 1 .75.75Z" />
    </G>
    <Path fill="#FFEEA6" d="M12 9h12v10H12z" />
    <Path
      fill="#343D45"
      fillRule="evenodd"
      d="M18.25 7c.414 0 .75.305.75.682V9.84c0 .377-.336.682-.75.682s-.75-.306-.75-.682V7.68c0-.376.336-.681.75-.681Zm0 4.318c.414 0 .75.305.75.682v4.318c0 .377-.336.682-.75.682s-.75-.305-.75-.682V12c0-.377.336-.682.75-.682Z"
      clipRule="evenodd"
    />
    <Path
      fill="#343D45"
      fillRule="evenodd"
      d="M22.28 13.22a.75.75 0 0 1 0 1.06l-3.5 3.5a.75.75 0 0 1-1.06 0l-3.5-3.5a.75.75 0 0 1 1.06-1.06l2.97 2.97 2.97-2.97a.75.75 0 0 1 1.06 0Z"
      clipRule="evenodd"
    />
    <Defs>
      <ClipPath id="LoadCard_svg__a">
        <Rect width={22} height={16} x={7} y={13} fill="#fff" rx={3} />
      </ClipPath>
    </Defs>
  </Svg>
)
export default SvgLoadCard

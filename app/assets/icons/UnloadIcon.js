import * as React from 'react'
import Svg, {Rect, G, Path, Defs, ClipPath} from 'react-native-svg'
const SvgUnloadIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={46}
    height={46}
    fill="none"
    {...props}>
    <Rect width={42} height={42} x={2} y={2} fill="#FFDD45" rx={21} />
    <G
      fill="#343D45"
      fillRule="evenodd"
      clipPath="url(#unloadIcon_svg__a)"
      clipRule="evenodd">
      <Path d="M12 16.667c0-.369.314-.667.702-.667h20.596c.388 0 .702.299.702.667v14.666c0 .369-.314.667-.702.667H12.702c-.388 0-.702-.299-.702-.667V22c0-.368.314-.667.702-.667.388 0 .702.299.702.667v7.333c0 .491.41 1.334.917 1.334h16.441c1.013 0 1.834-.796 1.834-1.778l.027-10.61a.944.944 0 0 0-.944-.946H14.293a.889.889 0 0 0-.889.89v.221c0 .369-.314.667-.702.667-.388 0-.702-.298-.702-.667v-1.777Z" />
      <Path d="M34 16H12v16h22V16Zm-18.5 1.5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h15a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-15Z" />
      <Path d="M21 27.75a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1 0-1.5h4.5a.75.75 0 0 1 .75.75ZM30 23.75a.75.75 0 0 1-.75.75h-13.5a.75.75 0 0 1 0-1.5h13.5a.75.75 0 0 1 .75.75Z" />
    </G>
    <Path fill="#FFDD45" d="M18 12h10v10H18z" />
    <Path
      fill="#343D45"
      fillRule="evenodd"
      d="M23.25 20c-.414 0-.75-.305-.75-.682V17.16c0-.377.336-.682.75-.682s.75.305.75.682v2.16c0 .376-.336.681-.75.681Zm0-4.318c-.414 0-.75-.306-.75-.682v-4.318c0-.377.336-.682.75-.682s.75.305.75.682V15c0 .377-.336.682-.75.682Z"
      clipRule="evenodd"
    />
    <Path
      fill="#343D45"
      fillRule="evenodd"
      d="M19.22 13.78a.75.75 0 0 1 0-1.06l3.5-3.5a.75.75 0 0 1 1.06 0l3.5 3.5a.75.75 0 1 1-1.06 1.06l-2.97-2.97-2.97 2.97a.75.75 0 0 1-1.06 0Z"
      clipRule="evenodd"
    />
    <Rect
      width={42}
      height={42}
      x={2}
      y={2}
      stroke="#FFF8DD"
      strokeWidth={4}
      rx={21}
    />
    <Defs>
      <ClipPath id="unloadIcon_svg__a">
        <Rect width={22} height={16} x={12} y={16} fill="#fff" rx={3} />
      </ClipPath>
    </Defs>
  </Svg>
)
export default SvgUnloadIcon

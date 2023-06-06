import {Dimensions, PixelRatio} from 'react-native'

export const screenWidth = Dimensions.get('window').width
export const screenHeight = Dimensions.get('window').height

export const DesignWidth = 375
export const DesignHeight = 812

// It is based on the screen width of your design layouts e.g Height 812 x Width 375
const scale = screenWidth / 375

export function normalize(size: number) {
  return Math.round(PixelRatio.roundToNearestPixel(size * scale))
}

export const vw = (width: number) => {
  // Parse string percentage input and convert it to number.
  const percent = (width / DesignWidth) * 100
  const elemWidth = parseFloat(`${percent}%`)
  // Use PixelRatio.roundToNearestPixel method in order to round the layout
  // size (dp) to the nearest one that corresponds to an integer number of pixels.
  return Math.round(
    PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100),
  )
}

export const vh = (height: number) => {
  // Parse string percentage input and convert it to number.
  const percent = (height / DesignHeight) * 100
  const elemHeight = parseFloat(`${percent}%`)

  // Use PixelRatio.roundToNearestPixel method in order to round the layout
  // size (dp) to the nearest one that corresponds to an integer number of pixels.
  return Math.round(
    PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100),
  )
}

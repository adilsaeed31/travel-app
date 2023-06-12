import {Platform} from 'react-native'

export function flexRowLayout(dir: boolean = false): string {
  if (Platform.OS === 'android') {
    return dir ? 'flex-row-reverse' : 'flex-row'
  }

  return 'flex-row'
}

export function ml(dir: boolean = false, n: number = 2): string {
  if (Platform.OS === 'android') {
    return dir ? 'mr-' + n.toString() : 'ml-' + n.toString()
  }
  return 'ml-' + n.toString()
}

export function mr(dir: boolean = false, n: number = 2): string {
  if (Platform.OS === 'android') {
    return dir ? 'ml-' + n.toString() : 'mr-' + n.toString()
  }
  return 'mr-' + n.toString()
}

export function itemPos(dir: boolean = false): string {
  return dir ? 'items-start' : 'items-end'
}

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
  const cls = 'ml-' + n.toString()
  return cls
}

export function mr(dir: boolean = false, n: number = 2): string {
  if (Platform.OS === 'android') {
    return dir ? 'ml-' + n.toString() : 'mr-' + n.toString()
  }
  const cls = 'mr-' + n.toString()
  return cls
}

export function itemPos(dir: boolean = false): string {
  return dir ? 'items-start' : 'items-end'
}

export function currencyFormat(value: number): string[] {
  try {
    const currency = new Intl.NumberFormat('en-US')

    const leftUnit = value.toString().slice(0, value.toString().length - 2)
    const rightUnit = value.toString().slice(-2)

    const formattedCurrency = currency.format(Number(leftUnit))

    return [formattedCurrency, rightUnit]
  } catch (e: any) {
    console.log('Error in currencyFormat', e.message)
    return ['000', '00']
  }
}

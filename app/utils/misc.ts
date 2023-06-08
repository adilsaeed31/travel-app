export function flexRowLayout(dir: boolean = false): string {
  return dir ? 'flex-row-reverse' : 'flex-row'
}

export function m2(dir: boolean = false): string {
  return dir ? 'mr-2' : 'ml-2'
}

export function itemPos(dir: boolean = false): string {
  return dir ? 'items-start' : 'items-end'
}

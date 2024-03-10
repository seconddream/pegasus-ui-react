export const wait = (ms: number) => new Promise((res) => setTimeout(res, ms))

export const paddArray = (middle: number, expand: number, step = 1) => {
  const paddings = Array.from(Array(expand + 1).keys())
  paddings.shift()
  const negPaddings = paddings.reverse()
  return [
    ...negPaddings.map((i) => middle - i * step),
    middle,
    ...paddings.reverse().map((i) => middle + i * step),
  ]
}

export const range = (start: number, end: number) => {
  return Array.from(Array(end - start).keys()).map((i) => i + start)
}

export const get = (obj: any, key: string) => {
  const keyPath = key.split('.')
  let target = obj
  for (const _key in keyPath) {
    target = target[_key]
    if (target === undefined) {
      return undefined
    }
  }
  return target
}

export const set = (obj: any, key: string, value: any) => {
  const keyPath = key.split('.')
  let target = obj
  for (let i = 0; i < keyPath.length; i++) {
    const key = keyPath[i]
    if (i === keyPath.length - 1) {
      target[key] = value
    }else{
      if(target[key] === undefined){
        target[key] = {}
      }
      target = target[key]
    }
  }
}

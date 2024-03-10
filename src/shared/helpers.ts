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

export const range = (start: number, end:number)=>{
  return Array.from(Array(end-start).keys()).map(i=>i+start)
}

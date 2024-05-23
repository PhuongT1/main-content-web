export function debounce(fn: (data?: any) => any, time: number) {
  let timeoutId: NodeJS.Timeout | null
  return wrapper
  function wrapper(...args: any[]) {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      timeoutId = null
      fn(...args)
    }, time)
  }
}

export const delay = (delayInms: number) => {
  return new Promise((resolve) => setTimeout(resolve, delayInms))
}

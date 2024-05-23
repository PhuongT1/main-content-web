export const sendEvent = <T>(eventName: string, detail: T) => {
  document.dispatchEvent(new CustomEvent(eventName, { detail }))
}
export const listenEvent = (eventName: string, handler: EventListenerOrEventListenerObject, context = document) => {
  context.addEventListener(eventName, handler)
  return () => {
    context.removeEventListener(eventName, handler)
  }
}

export const requestIdleCallbackCustom = (callback: VoidFunction, options?: { timeout: number }) => {
  if (!('requestIdleCallback' in window)) {
    setTimeout(callback, options?.timeout ?? 0)
  } else {
    requestIdleCallback(callback, options)
  }
}

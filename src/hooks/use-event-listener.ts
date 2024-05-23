import { isServer } from '@/utils/types'
import { useEffect, useRef } from 'react'

export const useEventListener = <K extends keyof WindowEventMap>(
  eventType: K,
  callback: (event: WindowEventMap[K]) => void,
  element: HTMLElement | Window | undefined = isServer() ? undefined : window,
  options?: boolean | AddEventListenerOptions
  //once: fire one time | signal:
) => {
  // Register callback to ref
  const callbackRef = useRef(callback)

  // Updating ref current when callback is changed
  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  // register and remove the event listener
  useEffect(() => {
    if (!element) return

    // Creating handler to call the callback ref
    const handler: EventListener = (e: Event) => {
      callbackRef.current(e as WindowEventMap[K])
    }

    // Register event
    element.addEventListener(eventType, handler, options)

    // Cleanup: Only clean when the component is unmounted or eventType, element are changed
    return () => {
      element.removeEventListener(eventType, handler, options)
    }
  }, [eventType, element])
}

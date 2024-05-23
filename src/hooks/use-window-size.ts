import { isServer } from '@/utils/types'
import { useState } from 'react'
import { useEventListener } from './use-event-listener'

export default function useWindowSize() {
  const wd = isServer() ? undefined : window
  const [windowSize, setWindowSize] = useState({
    width: wd?.innerWidth || 0,
    height: wd?.innerHeight || 0
  })

  useEventListener('resize', () => {
    setWindowSize({ width: wd?.innerWidth || 0, height: wd?.innerHeight || 0 })
  })

  return windowSize
}

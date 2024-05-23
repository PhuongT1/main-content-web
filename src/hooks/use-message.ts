import { EventNameTBuidlding } from '@/constants/teambuilding/teambuilding.constant'
import { listenEvent } from '@/utils/events'
import { useEffect, useState } from 'react'

export const useMessage = <T>() => {
  const [msg, setMsg] = useState<T | null>(null)

  useEffect(() => {
    listenEvent(EventNameTBuidlding.CLEAR_ERROR_MSG, () => {
      setMsg(null)
    })
  }, [])
  return [msg, setMsg]
}

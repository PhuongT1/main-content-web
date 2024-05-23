import { useEffect, useState } from 'react'

export const useInactivityTimeout = (maxInactiveMinutes: number, onTimeout: () => void) => {
  const [minute, setMinute] = useState(maxInactiveMinutes)

  useEffect(() => {
    const interval = setInterval(() => {
      setMinute((prevMinute) => {
        if (prevMinute <= 1) {
          onTimeout()
          return maxInactiveMinutes
        }
        return prevMinute - 1
      })
    }, 1000 * 60)

    const resetInactiveTime = () => {
      setMinute(maxInactiveMinutes)
    }

    window.addEventListener('click', resetInactiveTime)

    return () => {
      clearInterval(interval)
      window.removeEventListener('click', resetInactiveTime)
    }
  }, [maxInactiveMinutes, onTimeout])

  return minute // trả về thời gian không hoạt động hiện tại nếu bạn muốn sử dụng nó
}

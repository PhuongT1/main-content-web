import { useEffect, useState } from 'react'

interface UseDebounceOptions<T> {
  value: T
  delay: number
}

export default function useDebounce<T>({ value, delay }: UseDebounceOptions<T>) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(
    () => {
      const handler = setTimeout(() => {
        setDebouncedValue(value)
      }, delay)
      return () => {
        clearTimeout(handler)
      }
    },
    [JSON.stringify(value), delay] // Only re-call effect if value or delay changes
  )

  return debouncedValue
}

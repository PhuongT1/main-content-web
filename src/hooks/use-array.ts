import { groupBy } from '@/utils/array'
import { useEffect, useState } from 'react'

export const useArray = <T>(defaultValue: T[], opts?: { groupKey?: keyof T }) => {
  const [array, setArray] = useState(defaultValue || [])
  const [groupArr, setGroupArr] = useState<Record<string | number, T[]>>()

  const push = (element: T) => {
    setArray((a) => [...a, element])
  }

  const merge = (arr: T[]) => {
    const newArr = array.concat(arr)
    setArray(newArr)
  }

  const filter = (callback: (value: T) => T) => {
    setArray((a) => a.filter(callback))
  }

  const update = (index: number, newElement: T) => {
    const newArr = array.with(index, newElement)
    setArray(newArr)
  }

  const remove = (index: number) => {
    setArray((a) => [...a.slice(0, index), ...a.slice(index + 1, a.length)])
  }

  const clear = () => {
    setArray([])
  }

  useEffect(() => {
    if (opts?.groupKey) {
      const result = groupBy(array, opts.groupKey)
      setGroupArr(result)
    }
  }, [opts?.groupKey, array])

  return { array, groupArr, set: setArray, push, filter, update, remove, clear, merge }
}

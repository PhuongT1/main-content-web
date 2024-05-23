import { objectsAreEqual } from '@/utils/object'

export const removeFalsy = <T>(arr: T[]) => arr.filter(Boolean)

export const shuffleArray = <T>(array: T[]) => {
  const newArr = [...array]
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = newArr[i]
    newArr[i] = newArr[j]
    newArr[j] = temp
  }
  return newArr
}

export const groupBy = <T>(arr: T[], key: keyof T) => {
  return arr.reduce((result, obj) => {
    const keyValue = obj[key] as string | number
    ;(result[keyValue] = result[keyValue] || []).push(obj)
    return result
  }, {} as Record<string | number, T[]>)
}

export const removeDuplicate = <T>(arr: T[]) => {
  return Array.from(new Set(arr))
}

export const convertArrToObjectStateByKey = (arr: any[], state: boolean = false) => {
  const myObject: { [k: number]: boolean } = arr.reduce((obj, _, idx) => {
    obj[idx] = state
    return obj
  }, {})

  return myObject
}

export const arraysAreEqual = <T>(array1: T[], array2: T[]): boolean => {
  // Check array lengths first
  if (array1?.length !== array2?.length) {
    return false
  }

  // Check each element in the arrays
  for (let i = 0; i < array1?.length; i++) {
    // Deep comparison for objects or nested arrays
    // Use the objectsAreEqual function for deep object comparison
    if (!objectsAreEqual(array1[i], array2[i])) {
      return false
    }
  }

  // If all elements are equal, return true
  return true
}

export const generateLabelFromMap = <T, K>(map: Map<T[], K>) => {
  const list: { label: K; value: T }[] = []
  map.forEach((value, key) => {
    const obj = {
      label: value,
      value: key[0]
    }
    list.push(obj)
  })
  return list
}

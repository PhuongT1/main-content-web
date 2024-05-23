import { isServer } from './types'

type FormDataToObject<T> = {
  [P in keyof T]: T[P]
}

export function convertFormData<T>(formData: FormData): FormDataToObject<T> {
  const result: Partial<FormDataToObject<T>> = {}

  formData.forEach((value, key) => {
    // Here we can add more specific type conversions if needed
    ;(result as any)[key] = value
  })
  return result as FormDataToObject<T>
}

export function createFormData<T extends Record<string, any>>(dataObject: T): FormData {
  const formData = new FormData()

  Object.entries(dataObject).forEach(([key, value]) => {
    if (!isServer()) {
      if (value instanceof File) {
        formData.append(key, value, value.name)
      } else if (Array.isArray(value)) {
        // Handling array values: append each element with the same key
        value.forEach((item) => {
          formData.append(key, item)
        })
      } else if (typeof value === 'object' && value !== null) {
        // Handling nested objects
        formData.append(key, JSON.stringify(value))
      } else {
        // Handling other value types
        formData.append(key, value)
      }
    } else {
      if (Array.isArray(value)) {
        // Handling array values: append each element with the same key
        value.forEach((item) => {
          formData.append(key, item)
        })
      } else if (typeof value === 'object' && value !== null) {
        // Handling nested objects
        formData.append(key, JSON.stringify(value))
      } else {
        // Handling other value types
        formData.append(key, value)
      }
    }
  })

  return formData
}

export function objectToFormData<T extends object>(obj: T) {
  const formData = new FormData()

  Object.entries(obj).forEach(([key, value]) => {
    formData.append(key, value)
  })

  return formData
}

export const isEmpty = <T extends object>(obj?: T) => {
  if (typeof obj !== 'object') return true
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false
    }
  }
  return true
}

export const objectsAreEqual = <T>(obj1: T, obj2: T): boolean => {
  // Check if both objects are null or undefined
  if (obj1 == null && obj2 == null) {
    return true
  }

  // Check if either one of the objects is null or undefined
  if (obj1 == null || obj2 == null) {
    return false
  }

  // Get the keys of the objects
  const keys1 = Object.keys(obj1) as (keyof T)[]
  const keys2 = Object.keys(obj2) as (keyof T)[]

  // Check if the number of keys is the same
  if (keys1?.length !== keys2?.length) {
    return false
  }

  // Check if each property is equal
  for (const key of keys1) {
    const value1 = obj1[key]
    const value2 = obj2[key]

    // Recursively check nested objects or arrays
    if (typeof value1 === 'object' && typeof value2 === 'object' && !objectsAreEqual(value1, value2)) {
      return false
    }

    // Simple comparison for other types
    if (value1 !== value2) {
      return false
    }
  }

  // If all properties are equal, return true
  return true
}

export const generateObjectFromN = <T>(n: number, defaultData: T) => {
  const result = {} as { [k: number]: T } // Initialize an empty object
  for (let i = 1; i <= n; i++) {
    result[i] = defaultData // Assign each key from 1 to N an empty object
  }
  return result
}

export const getEnumKey = <E extends Record<string, any>, V extends E[keyof E]>(
  enumObj: E,
  value: V
): keyof E | undefined => {
  const index = Object.values(enumObj).indexOf(value)
  if (index === -1) {
    return undefined
  }
  return Object.keys(enumObj)[index] as keyof E
}

export function cloneDeep<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => cloneDeep(item)) as any
  }

  const clonedObj = {} as T
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      clonedObj[key] = cloneDeep(obj[key])
    }
  }

  return clonedObj
}

export const isValidJSON = (obj: string): boolean => {
  try {
    const value = JSON.parse(obj)
    return typeof value === 'object'
  } catch (e) {
    return false
  }
}
export const parseString = <T>(item: T) => JSON.stringify(item)
export const parseJson = <T = string>(item = '{}') => JSON.parse(item) as T

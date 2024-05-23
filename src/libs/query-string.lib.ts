import queryString, { StringifyOptions } from 'query-string'

const defaultOptions = {
  arrayFormat: 'comma' as const
}
// Apply your global configurations here
const customStringify = <T extends Record<string, unknown>>(object: T, options?: StringifyOptions): string => {
  return queryString.stringify(object, { ...defaultOptions, ...options })
}

const customQueryString = {
  ...queryString,
  stringify: customStringify
}

export default customQueryString

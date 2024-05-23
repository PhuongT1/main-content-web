export const formatScale = (value: string) => {
  let newValue = value.indexOf('0') === 0 ? value.substring(1, value.length) : value
  if (newValue.includes('-')) return newValue.replace('-', '')
  return newValue
}

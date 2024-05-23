export const trimAll = (txt: string) => txt.replace(/ /g, '')

export const formatCurrency = (
  num: number,
  locales: string | string[] = 'en-US',
  options: Intl.NumberFormatOptions = { currency: 'USD' }
) => {
  return new Intl.NumberFormat(locales, options).format(num) + '원'
}

export const isOnlySpace = (txt: string) => {
  return txt.trim().length === 0
}

export const formatNumberWithText = (value: string | number, text: string = ''): string => {
  let number = Number(value)
  if (isNaN(number)) return ''
  return number.toLocaleString() + text
}

export const parseNumber = (value: string) => {
  return parseInt(value?.replace(/\D/g, '')) || 0
}

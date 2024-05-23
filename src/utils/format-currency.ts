export const formatCurrency = (value: any) => {
  if (!value) return
  let cuttedValue = value.toString().indexOf('0') === 0 ? value.substring(1, value.length) : value
  let newValue = cuttedValue.toString().split(',').join('').replace('-', '')
  if (Number(newValue) < 0) return ''
  return newValue?.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
}

export const formatCurrencyKorean = (value: number, unit: string = '원') => {
  if (!value) return ''

  let newValue = value
  if (typeof newValue === 'string') {
    newValue = Number((newValue as string).replace(/[^0-9.]/g, ''))
  }

  if (Number.isNaN(newValue)) return ''
  const units = ['', '만', '억', '조', '경', '해', '자', '양', '구', '간']
  let unitIndex = 0
  let result = ''

  while (newValue > 0) {
    const remainder = newValue % 10000
    if (remainder !== 0) {
      result = remainder.toLocaleString() + units[unitIndex] + ' ' + result
    }
    newValue = Math.floor(newValue / 10000)
    unitIndex++
  }

  return result.trim() === '' ? `0${unit}` : `${result.trim()}${unit}`
}

export const formatCurrencyEnglish = (value: number, unit: string = 'won') => {
  if (!value) return ''

  const suffixes = ['', 'thousand', 'million', 'billion', 'trillion']
  const suffixIndex = Math.floor((value.toString().length - 1) / 3)
  if (!suffixes[suffixIndex]) return value?.toLocaleString() + ' ' + unit

  const truncatedNumber = value / Math.pow(1000, suffixIndex)
  let formattedNumber = truncatedNumber.toFixed(2).toString()
  if (formattedNumber.includes('.00')) formattedNumber = formattedNumber.replace('.00', '')
  return formattedNumber + ' ' + suffixes[suffixIndex] + ' ' + unit
}

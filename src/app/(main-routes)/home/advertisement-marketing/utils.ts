import { convertToRem } from '@/utils/convert-to-rem'

export function getBrowserName() {
  if (typeof window === 'undefined') return
  const agent = window.navigator.userAgent.toLowerCase()

  switch (true) {
    case agent.indexOf('edge') > -1:
      return 'MS Edge (EdgeHtml)'
    case agent.indexOf('edg') > -1:
      return 'MS Edge Chromium'
    case agent.indexOf('opr') > -1 && !!window.opr:
      return 'opera'
    case agent.indexOf('chrome') > -1 && !!window.chrome:
      return 'chrome'
    case agent.indexOf('trident') > -1:
      return 'Internet Explorer'
    case agent.indexOf('firefox') > -1:
      return 'firefox'
    case agent.indexOf('safari') > -1:
      return 'safari'
    default:
      return 'other'
  }
}

export const DATA_DATETIME = [
  {
    label: '지난 1일',
    value: 'now 1-d'
  },
  {
    label: '지난 7일',
    value: 'now 7-d'
  },
  {
    label: '지난 30일',
    value: 'today 1-m'
  },
  {
    label: '지난 12개월',
    value: 'today 12-m'
  }
]

export const sxInputGoogleTrendingCustom = {
  height: convertToRem(128) + '!important',
  background: 'transparent !important',
  borderColor: '#e3e3e3 !important',
  borderRadius: convertToRem(10) + '!important',
  '&.Mui-focused': {
    background: 'transparent !important',
    borderColor: '#e3e3e3 !important'
  },

  '.MuiInputBase-input': {
    padding: '0 !important',
    fontSize: '20px !important',
    fontWeight: '500 !important',
    color: 'black',
    '&::placeholder': {
      color: '#9498A3',
      fontWeight: '500 !important',
      fontSize: '20px !important'
    }
  }
}

export const generateMonthList = (startMonth = 1, monthsInYear = 12): number[] => {
  const months = Array.from({ length: monthsInYear }, (_, index) => index + 1)
  const result: number[] = []

  for (let i = 0; i < monthsInYear; i++) {
    const monthIndex = ((startMonth || 1) + i - 1) % monthsInYear
    result.push(months[monthIndex])
  }

  return result
}

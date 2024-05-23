import moment from 'moment'
import { TIME_REMAIN_ERROR } from '../domain'

export const getLastUpdateTimestamp = (date: Date | string) => {
  const now = moment()
  const update = moment(date)
  if (!update.isValid()) {
    return 'Invalid date'
  }

  const diffMinutes = now.diff(update, 'minutes')
  const diffHours = now.diff(update, 'hours')

  if (diffMinutes < 1) {
    return '방금'
  } else if (diffHours < 1) {
    return `${diffMinutes} 분 전`
  } else if (diffHours < 24) {
    return `${diffHours} 시간 전`
  } else {
    return update.format('YYYY.MM.DD')
  }
}

interface TTimeRemainingResponse {
  daysLeft: number
  timeLeft: number
  timeAlert: number
  error: TIME_REMAIN_ERROR | null
}
export const calculateTimeRemaining = (packageExpire: Date | string): TTimeRemainingResponse => {
  const expireDate = new Date(packageExpire)
  const currentDate = new Date()
  const oneDay = 1000 * 60 * 60 * 24
  const timeAlert = oneDay * 7 // 7 days left

  if (isNaN(expireDate.getTime())) {
    return { daysLeft: 0, timeLeft: 0, timeAlert, error: TIME_REMAIN_ERROR.INVALID_DATE }
  }

  const timeDifference = expireDate.getTime() - currentDate.getTime()
  if (timeDifference <= 0) {
    return { daysLeft: 0, timeLeft: 0, timeAlert, error: TIME_REMAIN_ERROR.EXPIRED }
  }

  const daysLeft = Math.floor(timeDifference / oneDay)
  const timeLeft = timeDifference

  return { daysLeft, timeLeft, timeAlert, error: null }
}

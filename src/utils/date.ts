import { DATE_FORMAT } from '@/constants/common.constant'
import moment from 'moment'

export const res2ui = (value: string, format = DATE_FORMAT.DOT_REV) => {
  if (value) {
    return moment(value).format(format)
  }
}

export const formatDateTime = (value: any, format: DATE_FORMAT = DATE_FORMAT.DOT_REV) => {
  if (value) {
    return moment(value).format(format)
  }
}

export const secondsToHours = (seconds: number) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  // If there are hours, format with hours. Otherwise, format without hours.
  return hours > 0
    ? `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds
        .toString()
        .padStart(2, '0')}`
    : `00:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}

export const getRemainDays = (
  from: moment.Moment,
  to: moment.Moment = moment(),
  unitOfTime: moment.unitOfTime.Diff = 'days',
  precise?: boolean | undefined
) => {
  return moment(to).diff(from, unitOfTime, precise)
}

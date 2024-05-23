import moment from 'moment-timezone'

export const getTimeDiff = (dataStartDate?: string, dataEndDate?: string, tz?: boolean) => {
  if (dataStartDate && dataEndDate) {
    const startDate = tz ? moment(dataStartDate).tz('Asia/Seoul') : moment(dataStartDate)
    const endDate = tz ? moment(dataEndDate).tz('Asia/Seoul') : moment(dataEndDate)
    return `${startDate.format('YY-MM-DD')} ~ ${endDate.format('YY-MM-DD')} (${endDate.diff(startDate, 'days') + 1}일)`
  }
  return ''
}

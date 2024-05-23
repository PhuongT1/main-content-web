import moment from 'moment'
import 'moment/locale/ko'
moment().locale('ko')

export const displayTimeDiff = (time: string | Date) => {
  if (time === '') {
    return moment(time).format('YYYY.MM.DD')
  }
  const timeParse = moment(time)
  const second = moment().diff(timeParse, 'second')
  const minute = moment().diff(timeParse, 'minute')
  const hour = moment().diff(timeParse, 'hour')
  const day = moment().diff(timeParse, 'day')
  const month = moment().diff(timeParse, 'month')
  const year = moment().diff(timeParse, 'year')

  if (second <= 59) {
    return '방금 전'
  }

  if (second > 59 && minute <= 59) {
    return minute + '분전'
  }

  if (minute > 59 && hour <= 24) {
    return hour + '시간 전'
  }

  if (hour > 24) {
    const dayinMonth = timeParse.daysInMonth()

    if (day <= dayinMonth) {
      return day + '일전'
    }

    if (day > dayinMonth && month <= 12) {
      return month + '개월 전'
    }

    if (month > 12) {
      return year + '년 전'
    }
  }
  // if (moment().diff(timeParse, 'hours') < 24) {
  //   return moment().diff(timeParse, 'hours') + ' 시간전'
  // } else if (moment().diff(timeParse, 'hours') < 48) {
  //   return '1일전'
  // } else {
  //   return moment(time).format('YYYY.MM.DD')
  // }
}

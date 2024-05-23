import { Grid, Paper, useMediaQuery, useTheme } from '@mui/material'
import { endOfWeek, format, getDate, isEqual, isSameMonth, isToday, isWithinInterval, startOfWeek } from 'date-fns'
import React from 'react'
import { chunks, getDaysInMonth, inDateRange, isEndOfRange, isRangeSameDay, isStartOfRange } from '../utils'
import Day from './Day'
import Header from '../../../datepicker/Header'
import Typography from '@/elements/typography'
import { convertToRem } from '@/utils/convert-to-rem'
import moment from 'moment'
import { DateRange, NavigationAction } from '../types'
import { useLanguage } from '@/hooks/use-language'
import { LANG } from '@/constants/common.constant'

interface MonthProps {
  value: Date
  marker: symbol
  dateRange: DateRange
  minDate: Date
  maxDate: Date
  navState: [boolean, boolean]
  // eslint-disable-next-line no-unused-vars
  setValue: (date: Date) => void
  helpers: {
    // eslint-disable-next-line no-unused-vars
    inHoverRange: (day: Date) => boolean
  }
  handlers: {
    // eslint-disable-next-line no-unused-vars
    onDayClick: (day: Date) => void
    // eslint-disable-next-line no-unused-vars
    onDayHover: (day: Date) => void
    // eslint-disable-next-line no-unused-vars
    onMonthNavigate: (marker: symbol, action: NavigationAction) => void
  }
  locale?: Locale
  curHoverDay?: Date
}

const Month: React.FunctionComponent<MonthProps> = (props: MonthProps) => {
  const { lang } = useLanguage()
  const {
    helpers,
    handlers,
    value: date,
    dateRange,
    marker,
    setValue: setDate,
    minDate,
    maxDate,
    locale,
    curHoverDay
  } = props

  const weekStartsOn = locale?.options?.weekStartsOn || 0
  const WEEK_DAYS =
    typeof locale !== 'undefined'
      ? [0, 1, 2, 3, 4, 5, 6, 7].map((d) =>
          locale.localize?.day((d + weekStartsOn) % 7, {
            width: 'short',
            context: 'standalone'
          })
        )
      : lang === LANG.KR
      ? ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
      : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const [back, forward] = props.navState
  const theme = useTheme()
  const mdMatches = useMediaQuery(theme.breakpoints.down('md'))
  return (
    <Paper square elevation={0} sx={{ width: convertToRem(424), background: theme.palette.main.gray60 }}>
      <Grid container>
        <Header
          date={date}
          setDate={setDate}
          nextDisabled={!forward}
          prevDisabled={!back}
          onClickPrevious={() => handlers.onMonthNavigate(marker, NavigationAction.Previous)}
          onClickNext={() => handlers.onMonthNavigate(marker, NavigationAction.Next)}
          locale={locale}
        />

        <Grid
          item
          container
          direction='row'
          sx={{
            marginTop: '10px',
            justifyContent: 'center'
            // paddingLeft: '24px',
            // paddingRight: '24px',
          }}
        >
          {WEEK_DAYS.map((day, index) => (
            <Typography
              sx={{
                width: '40px',
                height: 'auto',
                pt: {
                  xs: '20px',
                  md: 0
                }
              }}
              cate={'caption_2_semibold'}
              textAlign={'center'}
              color={
                index === 0
                  ? theme.palette.sub.red500
                  : index === WEEK_DAYS.length - 1
                  ? theme.palette.main.primary_light
                  : theme.palette.main.gray10
              }
              key={index}
            >
              {day}
            </Typography>
          ))}
        </Grid>

        <Grid
          item
          container
          direction='column'
          justifyContent='space-between'
          rowGap={1}
          sx={{
            px: {
              xs: 0,
              md: '15px'
            },
            marginTop: '15px',
            marginBottom: '20px'
          }}
        >
          {chunks(getDaysInMonth(date, locale), 7).map((week, idx) => (
            <Grid
              key={idx}
              container
              direction='row'
              sx={{
                justifyContent: {
                  xs: 'center',
                  md: 'center'
                }
              }}
            >
              {week.map((day) => {
                const isStart = isStartOfRange(dateRange, day)
                const isEnd = isEndOfRange(dateRange, day)
                const isEndOfWeek = moment(endOfWeek(day)).format('YYYY.MM.DD') === moment(day).format('YYYY.MM.DD')
                const isStartOfWeek = moment(startOfWeek(day)).format('YYYY.MM.DD') === moment(day).format('YYYY.MM.DD')
                const isRangeOneDay = isRangeSameDay(dateRange)
                const highlighted = inDateRange(dateRange, day) || helpers.inHoverRange(day)
                const isSamedayWithHover = isEqual(curHoverDay!, day)
                return (
                  <Day
                    key={format(day, 'dd-MM-yyyy')}
                    filled={isStart || isEnd}
                    outlined={isToday(day)}
                    highlighted={highlighted && !isRangeOneDay}
                    disabled={!isSameMonth(date, day) || !isWithinInterval(day, { start: minDate, end: maxDate })}
                    startOfRange={isStart && !isRangeOneDay}
                    endOfRange={isEnd && !isRangeOneDay}
                    isEndOfWeek={isEndOfWeek}
                    isStartOfWeek={isStartOfWeek}
                    onClick={() => handlers.onDayClick(day)}
                    onHover={() => handlers.onDayHover(day)}
                    value={getDate(day)}
                    isCurDayHover={isSamedayWithHover}
                  />
                )
              })}
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Month

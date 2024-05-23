import { Box, Grid, Paper, useTheme } from '@mui/material'
import { endOfWeek, format, getDate, isEqual, isSameMonth, isToday, isWithinInterval, startOfWeek } from 'date-fns'
import React from 'react'
import { chunks, getDaysInMonth } from '../mui-daterange-picker/src/utils'
import Header from './Header'
import Typography from '@/elements/typography'
import moment from 'moment'
import DateDay from './Day'
import { NavigationAction } from '../mui-daterange-picker/src/types'
import { useLanguage } from '@/hooks/use-language'
import styles from './datepicker.module.scss'
import { LANG } from '@/constants/common.constant'

interface MonthProps {
  value: Date
  onDayClick: (date: Date) => void
  minDate: Date
  maxDate: Date
  navState: [boolean, boolean]
  setValue: (date: Date) => void
  onMonthNavigate: (value: NavigationAction) => void
  locale?: Locale
  curHoverDay?: Date
}

const DateMonth: React.FunctionComponent<MonthProps> = (props: MonthProps) => {
  const { lang } = useLanguage()
  const { value: date, onDayClick, onMonthNavigate, setValue: setDate, minDate, maxDate, locale, curHoverDay } = props

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
  return (
    <Paper square elevation={0} className={styles.datepicker_paper}>
      <Grid container>
        <Header
          date={date}
          setDate={setDate}
          nextDisabled={!forward}
          prevDisabled={!back}
          onClickPrevious={() => {
            onMonthNavigate(NavigationAction.Previous)
          }}
          onClickNext={() => {
            onMonthNavigate(NavigationAction.Next)
          }}
          locale={locale}
        />

        <Grid
          item
          container
          gap={'8px'}
          direction='row'
          sx={{
            marginTop: '10px',
            justifyContent: 'center',
            paddingLeft: '24px',
            paddingRight: '24px'
          }}
        >
          <Box display='flex' justifyContent={'center'} alignItems='center' gap={'16px'}>
            {WEEK_DAYS.map((day, index) => (
              <Typography
                className={styles.number_box}
                sx={{
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
          </Box>
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
                const isEndOfWeek = moment(endOfWeek(day)).format('YYYY.MM.DD') === moment(day).format('YYYY.MM.DD')
                const isStartOfWeek = moment(startOfWeek(day)).format('YYYY.MM.DD') === moment(day).format('YYYY.MM.DD')
                const isSamedayWithHover = isEqual(curHoverDay!, day)
                return (
                  <DateDay
                    key={format(day, 'dd-MM-yyyy')}
                    outlined={isToday(day)}
                    highlighted={isSamedayWithHover}
                    disabled={!isSameMonth(date, day) || !isWithinInterval(day, { start: minDate, end: maxDate })}
                    isEndOfWeek={isEndOfWeek}
                    isStartOfWeek={isStartOfWeek}
                    onClick={() => onDayClick(day)}
                    value={getDate(day)}
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

export default DateMonth

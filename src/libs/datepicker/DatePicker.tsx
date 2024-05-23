'use client'

import CalendarIcon from '@/assets/icons/calendar'
import { Box, BoxProps, Button, Menu, SxProps, Typography, useTheme } from '@mui/material'
import { addMonths, addYears } from 'date-fns'
import * as React from 'react'
import { NavigationAction } from '../mui-daterange-picker/src/types'
import { parseOptionalDate } from '../mui-daterange-picker/src/utils'
import DateMonth from './Month'

import { DATE_FORMAT } from '@/constants/common.constant'
import moment from 'moment'
import styles from './datepicker.module.scss'

type DatePickerProps = {
  minDate?: Date | string
  maxDate?: Date | string
  onDateChange: (date: Date) => void
  value: Date | string
  locale?: Locale
  labelProps: {
    required?: boolean
    label: string
  }
  containerSx?: SxProps
  style?: React.CSSProperties
  disabled?: boolean
  menuSx?: SxProps
  format?: string
  placeholder?: string
  error?: boolean
} & BoxProps

const DatePicker = React.forwardRef(
  ({
    minDate,
    maxDate,
    locale,
    labelProps,
    onDateChange,
    value,
    containerSx,
    style,
    error,
    disabled,
    menuSx,
    format = DATE_FORMAT.DASH_REV,
    placeholder = '',
    ...rest
  }: DatePickerProps) => {
    const {
      palette: { home }
    } = useTheme()
    const today = new Date()
    // const { minDate, maxDate, locale, labelProps, onChange, value, placeholder = null } = props

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
    const minDateValid = parseOptionalDate(minDate, addYears(today, -10))
    const maxDateValid = parseOptionalDate(maxDate, addYears(today, 10))

    const [hoverDay, setHoverDay] = React.useState<Date>()

    const [currentMonth, setCurrentMonth] = React.useState<Date>(today)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) {
        event.preventDefault()
        event.stopPropagation()
      } else {
        setAnchorEl(event.currentTarget)
      }
    }

    const handleClose = () => {
      setAnchorEl(null)
      hoverDay && onDateChange(hoverDay)
    }

    const onDayClick = (day: Date) => {
      setHoverDay(day)
    }

    const onMonthNavigate = (action: NavigationAction) => {
      const newMonth = addMonths(currentMonth, action)
      setCurrentMonth(newMonth)
    }

    React.useEffect(() => {
      if (placeholder && !value) return
      const day = moment(value, format).toString()
      setHoverDay(value ? new Date(day) : new Date())
    }, [value])

    return (
      <Box width={1} component={'div'} {...rest}>
        {labelProps?.label && (
          <Typography sx={{ mb: '10px', fontWeight: 600, color: home.gray50 }}>
            {labelProps?.required && <span style={{ color: '#44BDBD' }}>* </span>}
            {labelProps?.label}
          </Typography>
        )}
        <Button
          style={{
            backgroundColor: home.gray300,
            borderColor: error ? home.red500 : home.gray200,
            color: home.gray100,
            ...style
          }}
          id={styles.button_display_date}
          onClick={handleClick}
          endIcon={<CalendarIcon />}
          sx={{ ...containerSx }}
        >
          {placeholder && !hoverDay ? placeholder : moment(hoverDay).format(format)}
        </Button>
        <Menu
          id={styles.datepicker_menu}
          disableEscapeKeyDown
          disableScrollLock
          anchorEl={anchorEl}
          sx={{
            '& .MuiList-root': {
              borderRadius: '10px',
              p: 1
            },
            '& .MuiPaper-root': {
              borderRadius: '10px'
            },
            ...menuSx
          }}
          open={open}
          MenuListProps={{
            'aria-labelledby': 'basic-button'
          }}
        >
          <DateMonth
            value={currentMonth}
            setValue={setCurrentMonth}
            navState={[true, true]}
            locale={locale}
            curHoverDay={hoverDay}
            minDate={minDateValid}
            maxDate={maxDateValid}
            onDayClick={onDayClick}
            onMonthNavigate={onMonthNavigate}
          />
          <Box display='flex' justifyContent='space-between' alignItems='center' gap={2} width='100%' p={1}>
            <Typography>{moment(hoverDay).format(DATE_FORMAT.DASH_REV)}</Typography>
            <Button onClick={handleClose} type='button' variant='contained' id={styles.btn_datepicker_confirm}>
              확인
            </Button>
          </Box>
        </Menu>
      </Box>
    )
  }
)

export default DatePicker

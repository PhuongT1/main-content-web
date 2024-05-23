import { ChevronLeftIcon, ChevronRightIcon } from '@/assets/icons'
import { SecondaryButton } from '@/elements'
import RangeDatepicker from '@/elements/range-date-picker'
import Select from '@/elements/select'
import Typography from '@/elements/typography'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, Grid, SelectProps, Stack, useTheme } from '@mui/material'
import moment from 'moment'
import { forwardRef, Ref, useEffect, useImperativeHandle, useState } from 'react'
import Calendar from 'react-calendar'
import { View } from '../../../../../../../node_modules/react-calendar/dist/cjs/shared/types'
import styles from './date-select.module.scss'

type DatePickerSelectProps<T> = {
  type: View
  onSelectDate: Function
  currentlyWorking?: boolean
  placeholder?: string
  customRef?: Ref<T>
  currentlyWorkingPlaceholder?: string
} & Partial<SelectProps>

type DatePickerRefProps = {
  resetDatePicker: () => void
}

const DatePickerSelect = forwardRef<DatePickerRefProps, DatePickerSelectProps<any>>(
  (
    {
      type,
      onSelectDate,
      currentlyWorking,
      placeholder,
      customRef,
      currentlyWorkingPlaceholder = '재직중',
      variant,
      ...rest
    },
    ref
  ) => {
    const [selectOpen, setSelectOpen] = useState<boolean>(false)
    const theme = useTheme()
    const [displayValue, setDisplayValue] = useState<string>('')
    const [datePickerChange, setDatePickerChange] = useState<boolean>(false)
    const [startValue, setStartValue] = useState<Date | undefined>(new Date())
    const [endValue, setEndValue] = useState<Date | undefined>(new Date())

    useImperativeHandle(ref, () => ({
      resetDatePicker: () => {
        setDisplayValue('')
        setStartValue(new Date())
        setEndValue(new Date())
      }
    }))

    const onStartValueChange = (e: any) => {
      setDatePickerChange(true)
      setStartValue(e)
    }

    const onEndValueChange = (e: any) => {
      setDatePickerChange(true)
      setEndValue(e)
    }

    const [state, setState] = useState([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
      }
    ])

    const handleOnChange = (ranges: any) => {
      const { selection } = ranges
      // onChange(selection);
      setState([selection])
    }

    useEffect(() => {
      if (!datePickerChange) return
      if (currentlyWorking === true) {
        setDisplayValue(`${moment(startValue).format('YYYY.MM')} ~ ${currentlyWorkingPlaceholder}`)
      } else {
        setDisplayValue(`${moment(startValue).format('YYYY.MM')} ~ ${moment(endValue).format('YYYY.MM')}`)
      }
    }, [currentlyWorking, currentlyWorkingPlaceholder])

    return (
      <Select
        variant={variant || 'filled'}
        ref={customRef}
        placeholder={!!placeholder ? placeholder : '근무기간 선택'}
        MenuProps={{
          sx: {
            '& .MuiPaper-root': {
              borderRadius: 2
            }
          }
          //setting variant to menu makes it appear below the element
        }}
        displayEmpty
        fullWidth
        sx={{
          height: convertToRem(56) + ' !important',
          borderRadius: convertToRem(8)
        }}
        className='dropbox-monthpicker'
        id='selectWrapper'
        defaultOpen={false}
        open={selectOpen}
        onOpen={() => {
          setSelectOpen(true)
        }}
        onClose={(e: any) => {
          if (
            !!e?.target?.className &&
            typeof e?.target?.className === 'string' &&
            !e?.target?.className?.includes('dropbox-monthpicker') &&
            !e?.target?.parentNode.className?.includes('dropbox-monthpicker') &&
            !e?.target?.className?.includes('react-calendar__navigation') &&
            !e?.target?.parentNode.className?.includes('react-calendar__navigation') &&
            !e?.target?.className?.includes('react-calendar__viewContainer') &&
            !e?.target?.parentNode.className?.includes('react-calendar__viewContainer') &&
            !e?.target?.className?.includes('react-calendar__year-view') &&
            !e?.target?.parentNode.className?.includes('react-calendar__year-view')
          ) {
            setSelectOpen(false)
          }
        }}
        renderValue={(value) => {
          return (
            <Typography cate='body_3' color={theme.palette.main_grey.gray300}>
              {!!displayValue ? displayValue : !!placeholder ? placeholder : '근무기간 선택'}
            </Typography>
          )
        }}
        {...rest}
      >
        <Stack direction='column' p={2} className='dropbox-monthpicker'>
          {type === 'month' ? (
            <RangeDatepicker
              onDateRangeChange={(range) => {
                setStartValue(range.startDate)
                setEndValue(range.endDate)
              }}
              dateRange={{ startDate: startValue, endDate: endValue }}
            />
          ) : (
            <Grid
              container
              spacing={type === 'year' ? 2 : 0}
              className='dropbox-monthpicker'
              direction={{ lg: 'row', md: 'row', sm: 'column' }}
            >
              <Grid item md={6} sm={12} className={'dark_mode_' + type + ' dropbox-monthpicker'}>
                <Calendar
                  onChange={onStartValueChange}
                  defaultView={type}
                  className={'dropbox-monthpicker'}
                  tileClassName={'dropbox-monthpicker'}
                  maxDate={new Date()}
                  maxDetail={type}
                  locale={type === 'year' ? 'ko' : 'en'}
                  value={startValue}
                  calendarType='gregory'
                  view={type}
                  nextLabel={
                    <ChevronRightIcon
                      svgProps={{ className: 'dropbox-monthpicker', stroke: theme.palette.main_grey.gray100 }}
                    />
                  }
                  prevLabel={
                    <ChevronLeftIcon
                      svgProps={{ className: 'dropbox-monthpicker' }}
                      pathProps={{
                        stroke: theme.palette.main_grey.gray100
                      }}
                    />
                  }
                />
              </Grid>
              <Grid item md={6} sm={12} className={'dark_mode_' + type + ' dropbox-monthpicker'}>
                <Calendar
                  onChange={onEndValueChange}
                  defaultView={type}
                  maxDetail={type}
                  className={`dropbox-monthpicker ${currentlyWorking ? styles.disabled : ''}`}
                  minDate={startValue}
                  maxDate={new Date()}
                  value={endValue}
                  tileClassName={`dropbox-monthpicker`}
                  calendarType='gregory'
                  locale={type === 'year' ? 'ko' : 'en'}
                  view={type}
                  nextLabel={
                    <ChevronRightIcon
                      svgProps={{ className: 'dropbox-monthpicker', stroke: theme.palette.main_grey.gray100 }}
                    />
                  }
                  prevLabel={
                    <ChevronLeftIcon
                      svgProps={{
                        className: 'dropbox-monthpicker'
                      }}
                      pathProps={{
                        stroke: theme.palette.main_grey.gray100
                      }}
                    />
                  }
                />
              </Grid>
            </Grid>
          )}
          <Box
            display='flex'
            justifyContent={'space-between'}
            className='dropbox-monthpicker'
            alignItems={'center'}
            mt={2}
          >
            <Typography cate='body_3' color={theme.palette.main_grey.gray100} className='dropbox-monthpicker'>
              {moment(startValue).format(type === 'year' ? 'YYYY.MM' : 'YYYY.MM.DD')} ~{' '}
              {currentlyWorking
                ? currentlyWorkingPlaceholder
                : moment(endValue).format(type === 'year' ? 'YYYY.MM' : 'YYYY.MM.DD')}
            </Typography>
            <SecondaryButton
              btnSize='sm-np'
              sx={{
                borderRadius: convertToRem(1000) + ' !important',
                borderColor: 'main_primary.blue300',
                bgcolor: 'main_primary.colors_overlay_blue'
              }}
              onClick={() => {
                onSelectDate(startValue, endValue)
                setDisplayValue(
                  `${moment(startValue).format('YYYY.MM')} ~ ${
                    currentlyWorking ? currentlyWorkingPlaceholder : moment(endValue).format('YYYY.MM')
                  }`
                )
                setSelectOpen(false)
              }}
            >
              <Typography cate='button_20'>적용</Typography>
            </SecondaryButton>
          </Box>
        </Stack>
      </Select>
    )
  }
)

DatePickerSelect.displayName = 'DatePickerSelect'
export default DatePickerSelect

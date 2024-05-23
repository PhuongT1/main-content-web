import { DateRange, DateRangePicker } from '@/libs/mui-daterange-picker/src'
import styles from './date-range-picker.module.scss'

export type RangeDatepickerSize = 'md' | 'lg'
export type RangeDatepickerCate = 'solid' | 'ghost'
export type RangeDatepickerStyles = {
  rangeDatepickerSize?: RangeDatepickerSize
  rangeDatepickerCate?: RangeDatepickerCate
}
export type AdditionalRangeDatepickerProps = {
  className?: string
  disabled?: boolean
} & RangeDatepickerStyles

type DateRangePickerProps = {
  dateRange: DateRange
  onDateRangeChange: (dateRange: DateRange) => void
} & AdditionalRangeDatepickerProps

const RangeDatepicker = ({
  dateRange = { startDate: undefined, endDate: undefined },
  onDateRangeChange,
  rangeDatepickerCate = 'solid',
  rangeDatepickerSize = 'md',
  className,
  disabled,
  ...rest
}: DateRangePickerProps) => {
  const handleClose = () => {}
  return (
    <>
      <DateRangePicker
        wrapperClassName={styles.custom}
        definedRanges={[]}
        initialDateRange={dateRange}
        open={true}
        toggle={handleClose}
        onChange={(range: any) => {
          onDateRangeChange(range)
        }}
      />
    </>
  )
}

export default RangeDatepicker

'use client'
import { CalendarIcon } from '@/assets/icons'
import { DATE_FORMAT } from '@/constants/common.constant'
import { DesignedSecondaryButton, Typography } from '@/elements'
import { DateRange, DateRangePicker } from '@/libs/mui-daterange-picker/src'
import { Box, SxProps, useTheme } from '@mui/material'
import Popover from '@mui/material/Popover'
import moment from 'moment'
import React, { useState } from 'react'
import CustomInput, { InputProps } from '../input/custom-input'

type DateRangePickerProps = {
  value: DateRange
  onChange: (dateRange: DateRange) => void
  placeholder?: string
  disabled?: boolean
  disablePast?: boolean
  minDate?: string | Date | undefined
  containerSx?: SxProps
  showIcon?: boolean
  inputProps?: Omit<InputProps, 'ref' | 'name'>
}

const RangeDatepicker = ({
  value = { startDate: undefined, endDate: undefined },
  onChange,
  disabled,
  placeholder,
  disablePast,
  containerSx,
  showIcon = false,
  inputProps,
  minDate
}: DateRangePickerProps) => {
  const theme = useTheme()
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)
  const [selecting, setSelecting] = useState<DateRange>()
  const handleClose = () => setAnchorEl(null)

  const getDisplayDateRange = (start?: Date, end?: Date, connector: '-' | '~' = '-'): string => {
    const startDate = start ? moment(start).format(DATE_FORMAT.DOT_REV) : undefined
    const endDate = end ? moment(end).format(DATE_FORMAT.DOT_REV) : undefined
    return startDate && endDate ? `${startDate || ''} ${connector} ${endDate || ''}` : ''
  }

  const handleSetAnchorEl = (e: any) => {
    if (e.target.classList.contains('clear-icon') || e.target.classList.length === 0) {
      // Clear input if clicks clear icon
      onChange({
        endDate: undefined,
        startDate: undefined
      })
    } else {
      setAnchorEl(e.currentTarget)
    }
  }

  return (
    <>
      <Box
        sx={{
          borderColor: disabled ? '#f1f2f3 !important' : undefined,
          width: '100%',
          ...containerSx
        }}
        onClick={disabled ? undefined : handleSetAnchorEl}
      >
        <CustomInput
          inputProps={{
            readOnly: true,
            style: {
              height: '100%',
              fontSize: '0.875rem',
              cursor: 'pointer'
            }
          }}
          endAdornment={showIcon && <CalendarIcon />}
          value={getDisplayDateRange(value?.startDate, value?.endDate, '~')}
          fullWidth
          placeholder={placeholder || 'YYYY.MM.DD'}
          name=''
          {...inputProps}
        />
      </Box>

      <Popover
        open={Boolean(anchorEl)}
        onClose={(_e, reason) => {
          if (reason === 'backdropClick') {
            setSelecting(undefined)
          }
          handleClose()
        }}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        slotProps={{
          paper: {
            sx: {
              borderRadius: 3,
              p: 2,
              bgcolor: 'main_grey.gray700',
              backgroundImage: 'unset',
              '& .MuiDivider-root': {
                backgroundColor: 'unset',
                display: 'none',
                border: 0,
                height: 0
              },
              '& .MuiGrid-root': {
                '& .MuiGrid-root': {
                  '& .MuiGrid-root': {
                    '& .MuiDivider-vertical': {
                      borderColor: 'main_grey.gray600',
                      height: 'auto',
                      borderWidth: '0.5px'
                    }
                  }
                }
              },
              '& .MuiGrid-container': {
                '& .MuiBox-root': {
                  '& .MuiButtonBase-root': {
                    '& p': {
                      height: '100%',
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }
                  },
                  '&:hover': {
                    '& .MuiButtonBase-root': {
                      bgcolor: 'main_primary.blue500'
                    }
                  }
                }
              },
              '& .MuiPaper-root': {
                width: '100%',
                maxWidth: 650
              },
              '& hr': {}
            }
          }
        }}
        sx={{ mt: 1 }}
      >
        <DateRangePicker
          minDate={disablePast ? new Date() : minDate}
          definedRanges={[]}
          initialDateRange={value}
          open={true}
          toggle={handleClose}
          onChange={(range: any) => {
            setSelecting(range)
          }}
          closeOnClickOutside={false}
        />
        <Box display={'flex'} justifyContent={'space-between'} mt={2} alignItems={'center'}>
          <Typography plainColor='main_grey.gray100' cate='body_30'>
            {getDisplayDateRange(selecting?.startDate, selecting?.endDate, '~')}
          </Typography>
          <DesignedSecondaryButton
            onClick={() => {
              onChange(selecting!)
              handleClose()
            }}
            disabled={!(selecting?.startDate && selecting?.endDate)}
            btnSize='designed-sm'
            btnBorder='pill'
          >
            적용
          </DesignedSecondaryButton>
        </Box>
      </Popover>
    </>
  )
}

export default RangeDatepicker

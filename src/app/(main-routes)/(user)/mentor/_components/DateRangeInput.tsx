'use client'
import CalendarIcon from '@/assets/icons/calendar'
import ChevronDownIcon from '@/assets/icons/chevrons/chevron-down'
import { DATE_FORMAT } from '@/constants/common.constant'
import { SecondaryButton, Typography } from '@/elements'
import CustomInput from '@/elements/custom-input'
import { DateRange, DateRangePicker } from '@/libs/mui-daterange-picker/src'
import { convertToRem } from '@/utils/convert-to-rem'
import { CalendarMonthOutlined } from '@mui/icons-material'
import { Box, SxProps, useTheme } from '@mui/material'
import Popover from '@mui/material/Popover'
import moment from 'moment'
import React, { useState } from 'react'

type DateRangePickerProps = {
  value: DateRange
  onChange: (dateRange: DateRange) => void
  placeholder?: string
  disabled?: boolean
  inputSx?: SxProps
  inputContainerSx?: SxProps
}

const RangeDatepicker = ({
  value = { startDate: undefined, endDate: undefined },
  onChange,
  disabled,
  placeholder,
  inputSx,
  inputContainerSx
}: DateRangePickerProps) => {
  const theme = useTheme()
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)
  const [selecting, setSelecting] = useState<DateRange>()
  const handleClose = () => setAnchorEl(null)

  const getDisplayDate = (date?: Date): string => {
    const displayDate = value ? moment(date).format(DATE_FORMAT.DASH) : undefined
    return `${displayDate || ''} `
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
      <Box display={'flex'} alignItems={'center'} gap={0.5}>
        <CustomInput
          containerSx={{
            height: convertToRem(44),
            ...inputContainerSx
          }}
          inputProps={{
            readOnly: true,
            style: {
              height: '100%',
              padding: 0,
              fontSize: '0.875rem'
            }
          }}
          onClick={disabled ? undefined : handleSetAnchorEl}
          endAdornment={
            <Box sx={{ marginRight: '8px', display: 'flex' }}>
              <CalendarIcon />
            </Box>
          }
          value={getDisplayDate(value?.startDate)}
          fullWidth
          placeholder={placeholder || 'YYYY.MM.DD'}
          name=''
          sx={{ ...inputSx }}
        />
        <Typography cate='title_3'>~</Typography>
        <CustomInput
          containerSx={{
            height: convertToRem(44),
            ...inputContainerSx
          }}
          inputProps={{
            readOnly: true,
            style: {
              height: '100%',
              padding: 0,
              fontSize: '0.875rem'
            }
          }}
          onClick={disabled ? undefined : handleSetAnchorEl}
          endAdornment={
            <Box sx={{ marginRight: '8px', display: 'flex' }}>
              <CalendarIcon />
            </Box>
          }
          value={getDisplayDate(value?.endDate)}
          fullWidth
          placeholder={placeholder || 'YYYY.MM.DD'}
          name=''
          sx={{ ...inputSx }}
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
              '& .MuiDivider-root': {
                backgroundColor: 'unset',
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
                maxWidth: 848
              },
              '& hr': {}
            }
          }
        }}
        sx={{ mt: 1 }}
      >
        <DateRangePicker
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
            {getDisplayDate(selecting?.startDate)} ~ {getDisplayDate(selecting?.endDate)}
          </Typography>
          <Box width={73} height={44}>
            <SecondaryButton
              onClick={() => {
                onChange(selecting!)
                handleClose()
              }}
              disabled={!(selecting?.startDate && selecting?.endDate)}
              btnSize='md'
              fullWidth
              fullHeight
              active
              sx={{
                px: '12px',
                py: '13px',
                borderRadius: '1000px !important'
              }}
            >
              <Typography cate='button_20' plainColor='main_grey.gray200'>
                적용
              </Typography>
            </SecondaryButton>
          </Box>
        </Box>
      </Popover>
    </>
  )
}

export default RangeDatepicker

import Typography from '@/elements/typography'
import { Box, IconButton, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'

interface DayProps {
  outlined?: boolean
  highlighted?: boolean
  disabled?: boolean
  startOfRange?: boolean
  isStartOfWeek?: boolean
  isEndOfWeek?: boolean
  onClick?: () => void
  value: number | string
}

const DateDay: React.FunctionComponent<DayProps> = ({
  disabled,
  highlighted,
  outlined,
  isStartOfWeek,
  isEndOfWeek,
  onClick,
  value
}: DayProps) => {
  const theme = useTheme()
  const mdMatches = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        margin: '8px'
      }}
    >
      <IconButton
        sx={{
          height: '40px',
          width: '40px',
          padding: 0,
          border: (theme) => (!disabled && outlined ? `1px solid #E1E2E5` : undefined),
          backgroundColor: (theme) => (highlighted ? '#3C82F9' : undefined),
          '&:hover': {
            backgroundColor: highlighted ? '#3C82F9' : undefined
          }
        }}
        disabled={disabled}
        onClick={onClick}
      >
        <Typography
          color={
            !disabled
              ? isEndOfWeek
                ? theme.palette.main.primary_light
                : isStartOfWeek
                ? theme.palette.sub.red500
                : theme.palette.main.gray10
              : isEndOfWeek
              ? 'rgba(114, 154, 254, 0.5)'
              : isStartOfWeek
              ? 'rgba(239, 43, 42, 0.5)'
              : theme.palette.main.gray30
          }
          cate='body_3'
        >
          {value}
        </Typography>
      </IconButton>
    </Box>
  )
}

export default DateDay

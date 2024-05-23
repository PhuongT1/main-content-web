import Typography from '@/elements/typography'
import { Box, IconButton, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'

interface DayProps {
  filled?: boolean
  outlined?: boolean
  highlighted?: boolean
  disabled?: boolean
  startOfRange?: boolean
  isStartOfWeek?: boolean
  isEndOfWeek?: boolean
  endOfRange?: boolean
  onClick?: () => void
  onHover?: () => void
  value: number | string
  isCurDayHover: boolean
}

const Day: React.FunctionComponent<DayProps> = ({
  startOfRange,
  endOfRange,
  disabled,
  highlighted,
  outlined,
  isStartOfWeek,
  isEndOfWeek,
  filled,
  onClick,
  onHover,
  value,
  isCurDayHover
}: DayProps) => {
  const theme = useTheme()
  const mdMatches = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Box
      sx={{
        display: 'flex',
        // eslint-disable-next-line no-nested-ternary
        borderRadius:
          startOfRange || (isStartOfWeek && !isCurDayHover)
            ? '50% 0 0 50%'
            : endOfRange || isEndOfWeek || isCurDayHover
            ? '0 50% 50% 0'
            : undefined,
        backgroundColor: (theme) => (highlighted ? theme.palette.main.gray80 : undefined),
        justifyContent: 'center'
      }}
    >
      <IconButton
        sx={{
          height: '40px',
          width: '40px',
          padding: 0,
          border: (theme) => (!disabled && outlined ? `1px solid #E1E2E5` : undefined),
          ...(!disabled && filled
            ? {
                '&:hover': {
                  backgroundColor: theme.palette.main.primary
                },
                backgroundColor: theme.palette.main.primary
              }
            : {})
        }}
        disabled={disabled}
        onClick={onClick}
        onMouseOver={onHover}
        // size="large"
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

export default Day

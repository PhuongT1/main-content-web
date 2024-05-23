'use client'
import { Switch as MSwitch, SwitchProps as MSwitchProps, useTheme } from '@mui/material'
import { ChangeEvent } from 'react'

type SwitchProps = {
  action?: (e: ChangeEvent<HTMLInputElement>, checked: boolean) => void
} & Omit<MSwitchProps, 'action'>

const Switch = ({ sx, action, onChange, ...rest }: SwitchProps) => {
  const theme = useTheme()
  return (
    <MSwitch
      onChange={(e, checked) => {
        onChange?.(e, checked)
        action?.(e, checked)
      }}
      sx={{
        width: 42,
        height: 26,
        padding: 0,
        '& .MuiSwitch-switchBase': {
          padding: 0,
          transitionDuration: '300ms',
          '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
              backgroundColor: theme.palette.mode === 'dark' ? 'main_primary.blue500' : 'main_primary.blue500',
              opacity: 1,
              border: 0
            },
            '&.Mui-disabled + .MuiSwitch-track': {
              opacity: 0.5
            }
          },
          '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff'
          },
          '&.Mui-disabled .MuiSwitch-thumb': {
            color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600]
          },
          '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3
          }
        },
        '& .MuiSwitch-thumb': {
          boxSizing: 'border-box',
          width: 26,
          height: 26
        },
        '& .MuiSwitch-track': {
          borderRadius: 26 / 2,
          bgcolor: theme.palette.mode === 'light' ? 'main_grey.gray950' : 'main_grey.gray950',
          opacity: 1,
          transition: theme.transitions.create(['background-color'], {
            duration: 500
          })
        },
        ...sx
      }}
      {...rest}
    />
  )
}

const PrimarySwitch = ({ sx, ...rest }: SwitchProps) => {
  return <Switch sx={{ ...sx }} {...rest} />
}

export { PrimarySwitch }

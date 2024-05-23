'use client'
import { CheckRoundIcon, PrimaryCheckedIcon, PrimaryUncheckIcon, UnCheckRoundIcon } from '@/assets/icons'
import CheckIcon from '@/assets/icons/check'
import CheckRoundFilledIcon from '@/assets/icons/check-round-filled'
import { Typography } from '@/elements'
import { Box, Checkbox as MCheckbox, CheckboxProps as MCheckboxProps, SxProps, useTheme } from '@mui/material'
import { ReactNode } from 'react'

type CheckBoxProps = { ariaLabel?: string; label?: ReactNode; containerSx?: SxProps } & MCheckboxProps

const Checkbox = ({ ariaLabel = '', label, containerSx, ...rest }: CheckBoxProps) => {
  const key = Math.random().toString()
  return (
    <Box display={'flex'} alignItems={'center'} sx={{ ...containerSx }}>
      <MCheckbox inputProps={{ 'aria-label': ariaLabel, id: key }} {...rest} />
      {label && (
        <Typography component={'label'} htmlFor={key}>
          {label}
        </Typography>
      )}
    </Box>
  )
}

const PrimaryCheckbox = ({ ...rest }: CheckBoxProps) => {
  return (
    <Checkbox
      sx={{
        '&:hover': {
          background: 'transparent'
        }
      }}
      checkedIcon={<PrimaryCheckedIcon />}
      icon={<PrimaryUncheckIcon />}
      {...rest}
    />
  )
}

const RoundedCheckbox = ({ ...rest }: CheckBoxProps) => {
  const theme = useTheme()
  return (
    <Checkbox
      checkedIcon={<CheckRoundFilledIcon />}
      icon={
        <CheckRoundIcon
          rectProps={{
            fill: theme.palette.checkbox.bg
          }}
        />
      }
      sx={{
        borderRadius: '250rem'
      }}
      {...rest}
    />
  )
}

const CirclePrimaryCheckbox = ({ ...rest }: CheckBoxProps) => {
  return (
    <Checkbox
      sx={{
        borderRadius: 999
      }}
      checkedIcon={<CheckRoundIcon />}
      icon={<UnCheckRoundIcon />}
      {...rest}
    />
  )
}

const BorderlessPrimaryCheckbox = ({ ...rest }: CheckBoxProps) => {
  const theme = useTheme()
  return (
    <Checkbox
      sx={{
        borderRadius: 999,
        '&:hover': {
          background: 'transparent'
        }
      }}
      checkedIcon={<CheckIcon pathProps={{ stroke: theme.palette.main.primary }} />}
      icon={<CheckIcon pathProps={{ stroke: theme.palette.main_grey.gray400 }} />}
      {...rest}
    />
  )
}

export { BorderlessPrimaryCheckbox, Checkbox, CirclePrimaryCheckbox, PrimaryCheckbox, RoundedCheckbox }

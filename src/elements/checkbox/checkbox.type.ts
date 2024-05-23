import { CheckboxProps as MCheckboxProps, SxProps } from '@mui/material'
import { ElementType } from 'react'
import { TypographyProps } from '../typography/typography.type'

const checkboxtype = {
  default: 'default',
  borderless: 'borderless',
}

export type CheckboxType = keyof typeof checkboxtype

export type CheckboxProps = MCheckboxProps &
{
  component?: ElementType
  rounded?: boolean
  type?: CheckboxType,
  label?: string
  labelProps?: TypographyProps
}

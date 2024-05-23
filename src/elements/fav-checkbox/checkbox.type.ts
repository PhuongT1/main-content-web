import { CheckboxProps as MCheckboxProps } from '@mui/material'
import { ElementType } from 'react'

const checkboxtype = {
  default: 'default',
  borderless: 'borderless',
}

export type CheckboxType = keyof typeof checkboxtype

export type CheckboxProps = MCheckboxProps &
{
  component?: ElementType
  rounded?: boolean
  type?: CheckboxType
}

import { BreakpointKeys, ColorPalette, TypoCategoriesType } from '@/themes/get-design-tokens'
import { TypographyProps as MTypographyProps } from '@mui/material'
import { ElementType } from 'react'

export type TypographyProps = MTypographyProps & {
  component?: ElementType
  cate?: TypoCategoriesType
  plainColor?: ColorPalette
  htmlFor?: string
  breakpoints?: {
    [K in BreakpointKeys]?: TypoCategoriesType
  }
  lines?: number
}

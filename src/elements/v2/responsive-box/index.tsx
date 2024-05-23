'use client'
import { BreakpointKeys } from '@/themes/get-design-tokens'
import { Box, BoxProps, SxProps } from '@mui/material'
import { ReactNode } from 'react'

type Breakpoints = {
  [K in BreakpointKeys]?: SxProps
}

export type ResponsiveBlockProps = {
  breakpoints?: Breakpoints
  children?: ReactNode
} & BoxProps

const ResponsiveBox = ({ sx, breakpoints, children, ref, ...rest }: ResponsiveBlockProps) => {
  const smSx = breakpoints?.sm || {}
  const mdSx = breakpoints?.md || {}
  return (
    <Box
      sx={(theme) => ({
        [theme.breakpoints.down('sm')]: smSx,
        [theme.breakpoints.down('md')]: mdSx,
        ...sx
      })}
      {...rest}
    >
      {children}
    </Box>
  )
}

export default ResponsiveBox

'use client'
import { Divider as MDivider, DividerProps as MDividerProps, useTheme } from '@mui/material'

export type DividerCate = 'horizontal' | 'vertical'

export type AdditionalDividerProps = {
  cate?: DividerCate
} & MDividerProps

export type DividerProps = AdditionalDividerProps

// Button Component
const Divider = ({ cate = 'horizontal', sx, ...rest }: DividerProps) => {
  const {
    palette: { home }
  } = useTheme()
  const cateSx =
    cate === 'horizontal' ? { borderBottomWidth: '1px' } : { height: 'auto', width: '1px', borderWidth: '1px' }
  return <MDivider sx={{ background: home.gray200, borderColor: home.gray200, ...cateSx, ...sx }} {...rest} />
}

export default Divider

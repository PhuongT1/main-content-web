import { Box, useTheme } from '@mui/material'
import styles from './card-option.module.scss'
import { FC, ReactNode } from 'react'

export interface Props {
  active: boolean
  children?: ReactNode
  backgroundColorDefault: string
  backgroundColorActive: string
  boxShadowWidth?: string
  boxShadowDefault?: string
}

const CardOption: FC<Props> = ({
  active,
  children,
  backgroundColorActive,
  backgroundColorDefault,
  boxShadowWidth,
  boxShadowDefault
}) => {
  const {
    palette: { home }
  } = useTheme()

  return (
    <Box
      component='div'
      style={{
        background: active ? backgroundColorActive : backgroundColorDefault,
        boxShadow: active
          ? `0px 0px 0px ${boxShadowWidth ? boxShadowWidth : '1px'} ${home.blue500} inset`
          : boxShadowDefault || ''
      }}
      className={`${styles.cardOption} ${active ? styles.cardOptionActive : ''}`}
    >
      {children}
    </Box>
  )
}

export default CardOption

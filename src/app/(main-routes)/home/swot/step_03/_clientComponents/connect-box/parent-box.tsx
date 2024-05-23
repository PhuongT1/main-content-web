'use client'
import Box from '@mui/material/Box'
import React from 'react'
import styles from './connect-box.module.scss'
import { Typography } from '@/elements'
import { convertToRem } from '@/utils/styles'
import { SxProps, useMediaQuery, useTheme } from '@mui/material'
import { useLanguage } from '@/hooks/use-language'

type TTypeParentBoxProps = {
  handleCircleClick?: (value: any) => void
  text: string
  sub: string | any
  id?: any
  color: string
  isActive?: boolean
  width?: number | string
  height?: number | string
  key?: string
  sx?: SxProps
  isResponsive?: boolean
}
const ParentBox = ({
  handleCircleClick,
  text,
  sub,
  id,
  color,
  width = '300px',
  height = '300px',
  isActive = false,
  key,
  sx,
  isResponsive = false
}: TTypeParentBoxProps) => {
  const classActive = isActive ? styles['active'] : ''
  const smDown = useMediaQuery('(max-width: 1500px)')
  const {
    palette: { home }
  } = useTheme()

  return (
    <Box sx={{ display: 'flex', gap: convertToRem(10), alignItems: 'center' }}>
      {id && <Box className={`${styles['dot']} ${classActive}`} id={id} sx={{ background: home.gray200 }}></Box>}
      <Box
        key={id ?? key}
        className={`${styles['parent-box']} ${classActive}`}
        onClick={handleCircleClick}
        sx={{
          width: smDown && isResponsive ? convertToRem(250) : width,
          height: smDown && isResponsive ? convertToRem(250) : height,
          background: home.gray400,
          ...sx
        }}
      >
        <Box className={styles['box-text']}>
          <Box className={styles['tag']} sx={{ background: color }}>
            <Typography cate='body_3' plainColor='home.gray500'>
              {text}
            </Typography>
          </Box>
          <Typography cate='body_3' plainColor='home.gray50' sx={{ textAlign: 'center' }}>
            {sub}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default ParentBox

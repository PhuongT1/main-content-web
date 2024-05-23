'use client'

import { BoxProps, useTheme, Box as MBox, Card, CardHeader, CardContent, CardProps } from '@mui/material'
import React, { ReactPortal } from 'react'

import styles from './box-custom.module.scss'
import { convertToRem, remConvert } from '@/utils/convert-to-rem'

type IBoxProps = BoxProps & {
  children: React.ReactElement | React.ReactNode
}

function BoxLayout({ children, className, ...rest }: IBoxProps) {
  const {
    palette: { home }
  } = useTheme()
  return (
    <MBox
      component={'div'}
      sx={{
        backgroundColor: home.gray300
      }}
      className={`${styles.box} ${className}`}
      {...rest}
    >
      {children}
    </MBox>
  )
}

type TBoxLayoutOulinedProps = Omit<CardProps, 'sx'> & {
  children: React.ReactElement | React.ReactNode
  header?: React.ReactElement | React.ReactNode | string
}

function BoxLayoutOulined({ children, header, className, ...rest }: TBoxLayoutOulinedProps) {
  const {
    palette: { home }
  } = useTheme()
  return (
    <Card
      elevation={0}
      component={'div'}
      sx={{
        borderColor: home.gray200,
        backgroundColor: home.gray500,
        borderRadius: convertToRem(10)
      }}
      className={`${styles.box_oulined} ${className}`}
      {...rest}
    >
      {header ? <CardHeader sx={{ p: 0, mb: '20px' }} title={header} /> : null}
      <CardContent sx={{ p: 0, m: 0, paddingBottom: '0px!important' }}>{children}</CardContent>
    </Card>
  )
}

export { BoxLayout, BoxLayoutOulined }
